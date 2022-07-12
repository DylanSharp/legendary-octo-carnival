import CommentList from "./components/CommentList";
import InputHeader from "./components/InputHeader";
import {useEffect, useState} from "react";
import API from "./helpers/api";

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