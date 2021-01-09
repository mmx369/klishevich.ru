import React, { useEffect } from "react";
import { initializeBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'


const BlogList = () => {

  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogR);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch])


  return (
    <div>
      <h2>my blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
};

export default BlogList
