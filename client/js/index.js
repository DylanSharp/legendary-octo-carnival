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
                    <button class="comment__upvote-button">
                        <img src="./assets/icons/upvote.svg" alt="Upvote arrow icon"
                             class="comment__upvote-arrow-icon">
                        Upvote
                    </button>
                    <button class="comment__reply-button">Reply</button>
                </div>
            </div>`;

    // Add event listeners
    const upvoteButton = commentElement.querySelector('.comment__upvote-button');
    upvoteButton.addEventListener("click", API.addUpvote.bind(this, commentData.id));

    return commentElement;
}

const renderComments = (commentData) => {
    const layout = document.querySelector('.discussion__comment-list');
    for (let i in sortCommentData(commentData)) {
        const newCommentElement = createCommentElement(commentData[i]);
        layout.append(newCommentElement);
    }
}

const loadComments = async () => {
    const commentData = await API.getLatestComments();
    renderComments(commentData);
};


const addNewComment = async () => {
    const newCommentInput = document.querySelector('.discussion__new-comment-input');
    const newCommentButton = document.querySelector('.discussion__new-comment-button');

    // Disable input while posting.
    newCommentInput.disabled = true;
    newCommentButton.disabled = true;
    const newCommentData = await API.addComment(newCommentInput.value)
    // Todo: Check that post was successful then clear input field.
    newCommentInput.value = "";
    newCommentInput.disabled = false;
    newCommentButton.disabled = false;

    const newCommentElement = createCommentElement(newCommentData)
    const layout = document.querySelector('.discussion__comment-list');
    layout.prepend(newCommentElement);

}


/*
Add event listeners.
 */
const newCommentButton = document.querySelector('.discussion__new-comment-button');
newCommentButton.addEventListener("click", addNewComment);

loadComments();