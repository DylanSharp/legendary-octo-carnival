import {useState} from "react";
import API from "../helpers/api";

const NewComment = (props) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (content.length > 1) {
            await setLoading(true);
            await API.addComment(content).then((newComment) => {
                props.appendNewComment(newComment);
            });
            await setContent("");
            setLoading(false);
        }
    };

    return (
            <form className="discussion__new-comment-panel" onSubmit={submitHandler}>
                <img src="https://avatars.dicebear.com/v2/avataaars/7e44f46752b1e128513221184161.svg"
                     alt="Current User Avatar Image"
                     className="discussion__avatar"></img>
                <input type="text"
                       className="discussion__new-comment-input"
                       placeholder="What are your thoughts?"
                       onChange={contentChangeHandler}
                       disabled={loading}
                       value={content}></input>
                <button
                    className={`discussion__new-comment-button ${loading ? 'discussion__new-comment-button--disabled' : ''}`}
                    type='submit'
                    disabled={loading}>Comment
                </button>
            </form>
    );
}
export default NewComment;
