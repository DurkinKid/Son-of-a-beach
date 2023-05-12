import { useState } from "react";
import { Button, Form, Header, Comment, Icon } from 'semantic-ui-react'

export default function CommentsPage({post, loggedUser, addComment, removeComment}){

  const [comment, setComment] = useState({
    photoUrl: loggedUser.photoUrl,
    comment: ""
  })

  function handleChange(e){
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    }
    )
  }

  function handleSubmit(e){
    e.preventDefault();
    addComment(post._id, comment)
    setComment("")
    document.getElementById(`p${post._id}`).style.display = "none"
}

    return (
       <div id={`p${post._id}`} style={{width: "100%", height: "80%", zIndex: 3, position: "absolute", display: "none", backgroundColor: "white"}}>
         <Comment.Group style={{overflow: "scroll", height: "50%"}}>
    <Header as='h4' dividing>
      Comments
    </Header>
{post.comments.map((comment) => {
  return (
  <Comment
  key={comment._id} >
      <Comment.Content>
        <Comment.Avatar
        src={comment.photoUrl}
        />
        <Comment.Author as='a'>{comment.username}</Comment.Author>
        <Comment.Text>{comment.comment}</Comment.Text>
        <Icon 
        name="delete"
        onClick= {() => {
          removeComment(comment._id)
        }}
        />
      </Comment.Content>
    </Comment>
  
 )})} 
    </Comment.Group>

    <Form onSubmit={handleSubmit} reply>
      <Form.TextArea
      rows={5}
      name="comment" 
      onChange={handleChange}
      value={comment.comment}
      />
      <Button type="submit" content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  
       </div>
  
    )
}