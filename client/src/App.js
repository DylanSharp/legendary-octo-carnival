import CommentList from "./components/CommentList";
import NewComment from "./components/NewComment";
import {useEffect, useState} from "react";
import API from "./helpers/api";
import socket from "./connections";

const App = () => {
    const [comments, setComments] = useState([])

    const incrementUpvote = (commentId) => {
        setComments(prevState => {
            return prevState.map(comment => {
                if (comment.id === commentId) {
                    comment = {...comment, upvoteCount: comment.upvoteCount + 1}
                }
                return comment
            });
        });
    }

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.eventType === 'newUpvote') {
            incrementUpvote(data.commentId);
        }
    })

    useEffect(() => {
        API.getLatestComments()
            .then((result) => {
                setComments(result);
            })
    }, [])

    const appendNewComment = (newComment) => {
        setComments(prevState => ([newComment, ...prevState]));
    }

    return (
        <div className="discussion">
            <header className="discussion__header">
                <h1>Discussion</h1>
                <NewComment appendNewComment={appendNewComment}/>
            </header>
            <CommentList comments={comments} incrementUpvote={incrementUpvote}/>
        </div>
    );
}

export default App;