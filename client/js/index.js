/**
 * Takes a date as a string and returns a nice human-readable string like '2 days ago'
 * @param dateString A date string representing the time the comment was created.
 * @returns {string}
 */
function timeSince(dateString) {
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
    return sanitize('second', Math.floor(interval));
}

/**
 * Creates and returns a comment element.
 *
 * @param commentData An object representing a comment.
 * @returns {HTMLDivElement}
 */
const createCommentElement = (commentData) => {
    const comment = document.createElement('div');
    comment.classList.add("comment");
    comment.innerHTML = `
            <img src="https://avatars.dicebear.com/v2/avataaars/${commentData.userId}.svg"
                 alt="Current User Avatar Image"
                 class="comment__avatar">
            <div class="comment__main">
                <div class="comment__comment-meta">
                    <div class="comment__author-name">${commentData.username}</div>
                    <span class="comment__meta-seperator">·</span>
                    <div class="comment__time-since-published">${timeSince(commentData.createdAt)}</div>
                </div>
                <div class="comment__body">
                    ${commentData.content}
                </div>
                <div class="comment__actions">
                    <button class="comment__action-button">
                        <img src="./assets/icons/upvote.svg" alt="Upvote arrow icon"
                             class="comment__upvote-arrow-icon">
                        Upvote
                    </button>
                    <button class="comment__action-button">Reply</button>
                </div>
            </div>`;

    return comment;
}

const sortCommentData = (commentData) => {
    return commentData.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        return 0;
    })
}

const renderComments = (commentData) => {
    const layout = document.querySelector('.discussion__comment-list');
    for (let i in sortCommentData(commentData)) {
        const newCommentElement = createCommentElement(commentData[i]);
        layout.append(newCommentElement);
    }
}

const getLatestComments = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/comment_data');
    xhr.responseType = 'json';
    xhr.onload = () => {
        const commentData = xhr.response;
        renderComments(commentData);
    }
    xhr.send();
}

getLatestComments();
