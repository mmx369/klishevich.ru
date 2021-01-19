import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { deleteBlog, addLike, addDislike } from '../reducers/blogReducer'
import blogService from '../services/blog'
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button'


const Blog = ({ blog }) => {

  const auth = useContext(AuthContext)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = (id) => {
    dispatch(addLike(id))
  }

  const handleDislike = (id) => {
    dispatch(addDislike(id))
  }

  const handleDelete = (id) => {
    blogService.setToken(auth.token)
    dispatch(deleteBlog(id))
  }

  return (
    <div style={blogStyle}>
      <strong>{blog.title}</strong>&nbsp;<br />
      <small>{new Date(blog.date).toLocaleDateString()} by</small>&nbsp;<em style={{ color: "blue" }}>{blog.author}</em>
      <p>
        {blog.content}
      </p>
      <IconButton
        onClick={() => handleLike(blog.id)}
        color="inherit"
        aria-label="like">
        <ThumbUpIcon />
      </IconButton>
      <IconButton
        onClick={() => handleDislike(blog.id)}
        color="inherit"
        edge="start"
        aria-label="dislike">
        <ThumbDownIcon />
      </IconButton>       {blog.likes} liked &nbsp;
      {auth.userName === 'maximus' ? <Button color='secondary' onClick={() => handleDelete(blog.id)}>delete blog</Button> : null}

    </div>
  );
};

export default Blog
