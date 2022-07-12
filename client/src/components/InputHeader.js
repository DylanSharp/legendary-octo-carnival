import {useState} from "react";
import API from "../api";

const InputHeader = (props) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (content.length > 1) {
            await API.addComment(content).then((newComment) => {
                props.appendNewComment(newComment);
            });
            await setContent("");
            await setLoading(true);
            setLoading(false);
        }
    };

    return (
        <header className="discussion__header">
            <h1>Discussion</h1>
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
                <button className="discussion__new-comment-button"
                        type='submit'
                        disabled={loading}>Comment
                </button>
            </form>
        </header>
    );
}
export default InputHeader;
