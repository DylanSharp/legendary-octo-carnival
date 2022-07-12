import React from 'react';

import '../discussion.css';
import Comment from "./Comment";


const CommentList = props => {

    return (
        <section className="discussion__comment-list">
            <Comment
                username={'Dylan Sharp'}
                createdAt={new Date()}
                content={'Content Content Content Content '}
                upvoteCount={3}
            />
        </section>
    )
};

export default CommentList;
