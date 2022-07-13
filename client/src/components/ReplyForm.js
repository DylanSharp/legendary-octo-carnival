import React, {useState} from 'react';
import '../styles/discussion.css';
import API from "../helpers/api";

const ReplyForm = props => {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (content.length > 1) {
            await setLoading(true);
            await API.addComment(content, true, props.parentCommentId)
                .then((newComment) => {
                    props.appendNewReply(newComment);
                });
            await (setContent(""));
            await setLoading(false);
            props.dismissReply();
        }
    };

    return (
        <form className='reply'>
            <input type="text"
                   className='reply__input'
                   onChange={contentChangeHandler}
                   value={content}
                   disabled={loading}/>
            <button className={`reply__submit-button ${loading ? 'reply__submit-button--disabled' : ''}`}
                    onClick={submitHandler}
                    disabled={loading}>Reply
            </button>
        </form>
    );
};

export default ReplyForm;
