/**
 * Creates and returns a comment element.
 *
 * @param commentData An object representing a comment.
 * @returns {HTMLDivElement}
 */
const createCommentElement = (commentData) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
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

    return commentElement;
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
