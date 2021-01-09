import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, addLike, addDislike } from '../reducers/blogReducer'


const Blog = ({ blog }) => {

  const [isTester, setIsTester] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setIsTester(user.name === 'tester')
    }
  }, [isTester]);

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
      <strong>{blog.title}</strong>&nbsp;author: {blog.author}&nbsp;{blog.date.toString()}
      <p>
        {blog.content}
      </p>
        likes: {blog.likes}
      <button onClick={() => handleLike(blog.id)}>like</button>
      <button onClick={() => handleDislike(blog.id)}>dislike</button>


      {isTester ? <button onClick={() => handleDelete(blog.id)}>delete blog</button> : null}

    </div>
  );
};

export default Blog
