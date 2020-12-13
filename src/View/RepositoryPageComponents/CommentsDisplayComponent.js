import React from "react";

function CommentsDisplayComponent(props) {
    const comments = props.comments;

    let comment_elements = [];
    if (comments) {
        comment_elements = comments.map((comment, key) =>
            <div style={{padding: '10px'}} className={'comment #' + key}>
                <h3>{comment.username} comments:</h3>
                <p>{comment.text}</p>
            </div>
        )
    }
    return (
        <div>
            {comment_elements}
        </div>
    );
}

export default CommentsDisplayComponent;