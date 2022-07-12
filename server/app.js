const express = require("express");
const sequelize = require('./connection')
const cors = require('cors')

const Upvote = require('./models/Upvote')
const Comment = require('./models/Comment')
const User = require('./models/User')

require('./connection');

const app = express();
app.use(express.json());
app.use(cors())

app.get("/comments", async (req, res) => {
    const allComments = await Comment.findAll()

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(allComments));
});

app.get("/comment_data", async (req, res) => {
    // Get all comments and some associated user meta data.
    const [results, metadata] = await sequelize.query(
        `SELECT comments.*, users.username
         FROM comments
                  JOIN users ON comments.userId = users.id`
    );

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
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
    console.log('req.body', req.body);
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

        const newComment = await Comment.create({
            userId: randomUser.id,
            content: req.body['content'],
        });

        // Fetch new comment again with metadata.
        // Because UUID is defined with a literal, Sequelize doesn't return the new object from the create() method.
        // This is why the new comment is fetched in such a hacky way. Not really a viable solution.

        const [results, metadata] = await sequelize.query(
            `SELECT comments.*, users.username
             FROM comments
                      JOIN users ON comments.userId = users.id
             WHERE comments.userId = '${randomUser.id}'
               AND comments.content = '${req.body['content']}'`
        );
        const newCommentData = results[0];
        res.end(JSON.stringify(newCommentData));
    }
});

app.listen(80, () => {
    console.log("Listening...");
});
