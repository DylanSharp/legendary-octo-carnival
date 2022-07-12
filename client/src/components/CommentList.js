import '../styles/discussion.css';
import Comment from "./Comment";

const CommentList = (props) => {

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

    return (
        <section className="discussion__comment-list">
            {props.comments ? sortCommentData(props.comments).map(comment => {
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        upvoteCount={comment.upvoteCount}
                        incrementUpvote={props.incrementUpvote}
                    />
                )
            }) : null}
        </section>
    )
};

export default CommentList;