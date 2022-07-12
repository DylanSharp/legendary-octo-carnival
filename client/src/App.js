import CommentList from "./components/CommentList";
import InputHeader from "./components/InputHeader";
import {useEffect, useState} from "react";
import API from "./api";
import commentList from "./components/CommentList";

const App = () => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        API.getLatestComments().then((result) => {
            setComments(result);
        })
    }, [])


    const appendNewComment = (newComment) => {
        setComments(prevState => ([newComment, ...prevState]));
    }

    return (
        <div className="discussion">
            <InputHeader appendNewComment={appendNewComment}/>
            <CommentList comments={comments}/>
        </div>
    );
}

export default App;


// useEffect(() => {
//     (async () => {
//         const comments = await API.getLatestComments();
//         setComments(comments);
//     })()
// }, [])
//
// const addNewComment = async (content) => {
//     const newComment = await API.addComment(content);
//     const updatedCommentList = comments.push(newComment)
// };