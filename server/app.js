const express = require("express");
const sequelize = require('./connection')
const cors = require('cors')
const {WebSocketServer, WebSocket} = require('ws')

const Upvote = require('./models/Upvote')
const Comment = require('./models/Comment')
const User = require('./models/User')

require('./connection');

const PORT = 80;
const app = express();
app.use(express.json());

const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: isBinary});
            }
        });
    });
});

app.use(express.json());
app.use(cors())

app.get("/comments", async (req, res) => {
    const allComments = await Comment.findAll()

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(allComments));
});

app.get("/comment_data", async (req, res) => {
    // Get all comments and some associated user meta data.
    const [topLevelComments] = await sequelize.query(
        `SELECT c.*,
                u.username,
                COUNT(uv.commentId) as upvoteCount
         FROM comments c
                  JOIN users u on c.userId = u.id
                  LEFT JOIN upvotes uv ON c.id = uv.commentId
         WHERE c.parentCommentId IS NULL
         GROUP BY c.id;`
    );
    const [replies] = await sequelize.query(
        `SELECT c.*,
                u.username,
                COUNT(uv.commentId) as upvoteCount
         FROM comments c
                  JOIN users u on c.userId = u.id
                  LEFT JOIN upvotes uv ON c.id = uv.commentId
         WHERE c.parentCommentId IS NOT NULL
         GROUP BY c.id;`
    );

    // Nest replies. Ideally this should be doing at the DB level as a JOIN.
    replies.forEach(reply => {
        topLevelComments.forEach(comment => {
            if (!comment.replies) comment.replies = [];
            if (reply.parentCommentId === comment.id) {
                comment.replies.push(reply);
            }
        })
    })


    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(topLevelComments));
});

app.post("/upvote/:commentId", async (req, res) => {
    const commentId = req.params.commentId;

    // Ensure the commentId is valid.
    const comment = await Comment.findOne({
        where: {
            id: commentId
        }
    });
    if (!comment) {
        res.status(400).end('Invalid comment ID');
    } else {
        await Upvote.create({
            commentId: commentId
        })
        res.end(commentId);
    }
});

app.post("/comment", async (req, res) => {
    // Get a random user to assign the comment to.
    const userCount = await User.count();
    if (userCount === 0) {
        res.status(400);
        res.end('No users. Please create at least one user before adding a comment.')
    } else {
        const allUsers = await User.findAll();
        // Generate a random number between 0 and
        const randomUserIndex = Math.floor(Math.random() * userCount);
        const randomUser = allUsers[randomUserIndex];
        await Comment.create({
            userId: randomUser.id,
            content: req.body['content'],
            isReply: req.body['isReply'],
            parentCommentId: req.body['parentCommentId'],
        });

        // Fetch new comment again with metadata.
        // Because UUID is defined with a literal, Sequelize doesn't return the new object from the create() method.
        // This is why the new comment is fetched in such a hacky way. Not really a viable solution.
        const [results, metadata] = await sequelize.query(
            `SELECT c.*,
                    u.username,
                    COUNT(uv.commentId) AS upvoteCount
             FROM comments c
                      JOIN users u ON c.userId = u.id
                      LEFT JOIN upvotes uv ON c.id = uv.commentId
             WHERE c.userId = '${randomUser.id}'
               AND c.content = '${req.body['content']}'`
        );
        const newCommentData = results[0];
        res.end(JSON.stringify(newCommentData));
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
