import '../styles/discussion.css';
import Comment from "./Comment";

const CommentList = (props) => {

    const sortCommentData = (commentData) => {
        return commentData.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
        })
    }

    const generateComments = () => {
        return sortCommentData(props.comments).map(comment => {
            let comments = [];
            comments.push(
                <Comment
                    key={comment.id}
                    isReply={false}
                    comment={comment}
                    upvoteCount={comment.upvoteCount}
                    incrementUpvote={props.incrementUpvote}
                    appendNewComment={props.appendNewComment}
                />)

            if (!!comment.replies) {
                sortCommentData(comment.replies)
                    .forEach(reply => {
                        comments.push(
                            <Comment
                                key={reply.id}
                                isReply={true}
                                comment={reply}
                                upvoteCount={reply.upvoteCount}
                                incrementUpvote={reply.incrementUpvote}
                            />)
                    })
            }

            return (<div key={comment.id}>{comments}</div>)
        })
    }


    return (
        <section className="discussion__comment-list">
            {generateComments()}
        </section>
    )
};

export default CommentList;