import CommentList from "./components/CommentList";

function App() {

    return (
        <div className="discussion">
            <header className="discussion__header">
                <h1>Discussion</h1>
                <div className="discussion__new-comment-panel">
                    <img src="https://avatars.dicebear.com/v2/avataaars/7e44f46752b1e128513221184161.svg"
                         alt="Current User Avatar Image"
                         className="discussion__avatar"></img>
                    <input type="text" className="discussion__new-comment-input"
                           placeholder="What are your thoughts?"></input>
                    <button className="discussion__new-comment-button">Comment</button>
                </div>
            </header>
            <CommentList />
        </div>
    );
}

export default App;
