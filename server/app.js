const express = require("express");
const Upvote = require('./models/Upvote')
const Comment = require('./models/Comment')
const User = require('./models/User')

require('./connection');

const app = express();
app.use(express.json());

app.get("/comments", async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const allComments = await Comment.findAll()

    res.end(JSON.stringify(allComments));
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
    const allUsers = await User.findAll();
    const userCount = await User.count();
    if (userCount === 0) {
        res.end('No users. Please create at least one user before adding a comment.')
    } else {
        const randomUserIndex = Math.floor(Math.random() * userCount);
        const randomUser = allUsers[randomUserIndex];

        await Comment.create({
            userId: randomUser.id,
            content: req.body['content'],
        })
        res.end();
    }
});

app.listen(3000, () => {
    console.log("Listening...");
});
