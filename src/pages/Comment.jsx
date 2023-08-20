import React from 'react'

const Comment = (props) => {
  console.log(props.comments)
  const comments = props.comments
  console.log(comments)
  return (
    <div>
       {comments.map((comment, index) => (
                    <li key={index}>
                      <span>User: {comment.username}</span>
                      <span>Comment: {comment.comment}</span>
                    </li>
                  ))} 

      {/* {comments.map((comment,index)=>{
      return(
      <>
        <li>{comment.username}</li>
      </>)
     })} */}
    </div>
  );
}

export default Comment
