import React, {useEffect, useState} from 'react';
import '../styles/discussion.css';
import upvoteIcon from '../assets/icons/upvote.svg';
import API from "../helpers/api";

const timeSince = (dateString) => {
    const date = new Date(dateString)
    let secondsSince = Math.floor((new Date() - date) / 1000);

    const sanitize = (intervalName, interval) => {
        intervalName = interval > 1 ? intervalName + 's' : intervalName
        return interval + ' ' + intervalName + ' ago'
    }

    let interval = secondsSince / 31536000;
    if (interval > 1) {
        return sanitize('year', Math.floor(interval));
    }
    interval = secondsSince / 2592000;
    if (interval > 1) {
        return sanitize('month', Math.floor(interval));
    }
    interval = secondsSince / 86400;
    if (interval > 1) {
        return sanitize('day', Math.floor(interval));
    }

    let now = new Date();
    let then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    const secondsSinceYesterday = Math.floor((now.getTime() - then.getTime()) / 1000);

    interval = secondsSince / secondsSinceYesterday;
    if (interval > 1) {
        return "Yesterday";
    }

    interval = secondsSince / 3600;
    if (interval > 1) {
        return sanitize('hour', Math.floor(interval));
    }
    interval = secondsSince / 60;
    if (interval > 1) {
        return sanitize('minute', Math.floor(interval));
    }
    return 'A moment ago'
}

const Comment = props => {
    const [loading, setLoading] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState();


    useEffect(() => {
        setUpvoteCount(props.comment.upvoteCount)
    }, [])

    const handleUpvote = async () => {
        await setLoading(true);
        await API.addUpvote(props.comment.id);
        await setUpvoteCount(prevState => {
            return prevState + 1
        })
        setLoading(false);

    }

    return (
        <div className="comment">
            <img src={`https://avatars.dicebear.com/v2/avataaars/${props.comment.userId}.svg`}
                 alt="Current User Avatar Image"
                 className="comment__avatar"></img>
            <div className="comment__main">
                <div className="comment__comment-meta">
                    <div className="comment__author-name">{props.comment.username}</div>
                    <span className="comment__meta-seperator">·</span>
                    <div className="comment__time-since-published">{timeSince(props.comment.createdAt)}</div>
                </div>
                <div className="comment__body">
                    {props.comment.content}
                </div>
                <div className="comment__actions">
                    <button className={`comment__upvote-button ${loading ? 'comment__actions--disabled' : ''}`}
                            onClick={handleUpvote}>
                        <img src={upvoteIcon} alt="Upvote arrow icon"
                             className="comment__upvote-arrow-icon"></img>
                        Upvote
                    </button>
                    <div className="comment__upvote-count">
                        {upvoteCount}
                    </div>
                    <button className="comment__reply-button">Reply</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
