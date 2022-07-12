import React, {useEffect, useState} from 'react';

import '../discussion.css';
import Comment from "./Comment";
import API from "../api";


const CommentList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            console.log('Fetching comments...')
            const comments = await API.getLatestComments();
            console.log(comments);
            setComments(comments);
        })()
    }, [])

    return (
        <section className="discussion__comment-list">
            {comments.map(comment => {
                return <Comment
                    key={comment.id}
                    comment={comment}
                />
            })}
        </section>
    )
};

export default CommentList;
