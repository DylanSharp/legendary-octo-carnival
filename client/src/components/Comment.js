import React from 'react';
import '../discussion.css';
import {timeSince} from "../helpers";

const Comment = props => {
    const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${props.userId}.svg`;
    return (
        <div className="comment">
            <img src={avatarUrl}
                 alt="Current User Avatar Image"
                 className="comment__avatar"></img>
            <div className="comment__main">
                <div className="comment__comment-meta">
                    <div className="comment__author-name">{props.username}</div>
                    <span className="comment__meta-seperator">·</span>
                    <div className="comment__time-since-published">{timeSince(props.createdAt)}</div>
                </div>
                <div className="comment__body">
                    {props.content}
                </div>
                <div className="comment__actions">
                    <button className="comment__upvote-button">
                        <img src="./assets/icons/upvote.svg" alt="Upvote arrow icon"
                             className="comment__upvote-arrow-icon"></img>
                        Upvote
                    </button>
                    <div className="comment__upvote-count">
                        {props.upvoteCount}
                    </div>
                    <button className="comment__reply-button">Reply</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
