import '../styles/discussion.css';
import Comment from "./Comment";

const CommentList = (props) => {
    return (
        <section className="discussion__comment-list">
            {props.comments ? props.comments.map(comment => {
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                    />
                )
            }) : null}
        </section>
    )
};

export default CommentList;