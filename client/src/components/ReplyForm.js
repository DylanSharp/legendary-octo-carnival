import React, {useState} from 'react';
import '../styles/discussion.css';
import API from "../helpers/api";

const ReplyForm = props => {
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
            await setContent("");
            setLoading(false);
        }
    };

    return (
        <form className='reply'>
            <input type="text"
                   className='reply__input'
                   onChange={contentChangeHandler}
                   value={content}/>
            <button className='reply__submit-button'
                    onClick={submitHandler}>Reply
            </button>
        </form>
    );
};

export default ReplyForm;
