import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { deleteBlog, addLike, addDislike } from '../reducers/blogReducer'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const Blog = ({ blog }) => {

  const auth = useContext(AuthContext)

  console.log(11111, auth);
  // const [isTester, setIsTester] = useState(false)

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setIsTester(user.name === 'tester')
  //   }
  // }, [isTester]);

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
    dispatch(deleteBlog(id))
  }

  return (
    <div style={blogStyle}>
      <strong>{blog.title}</strong>&nbsp;author: {blog.author}&nbsp;{new Date(blog.date).toLocaleDateString()}
      <p>
        {blog.content}
      </p>
        likes: {blog.likes}
      <button onClick={() => handleLike(blog.id)}>like</button>
      <button onClick={() => handleDislike(blog.id)}>dislike</button>


      {auth.userName === 'maximus' ? <button onClick={() => handleDelete(blog.id)}>delete blog</button> : null}

    </div>
  );
};

export default Blog
