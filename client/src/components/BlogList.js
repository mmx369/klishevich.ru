import React, { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import GridList from '@material-ui/core/GridList'
import Blog from '../components/Blog'
import useStyles from '../style'


const BlogList = () => {

  const dispatch = useDispatch()
  const classes = useStyles()

  const blogs = useSelector((state) => state.blogR)

  blogs.sort((a, b) => new Date(b.date) - new Date(a.date))

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch])


  return (
    <div className={classes.containerBlog}>
      <GridList className={classes.gridListShop}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </GridList>
    </div>
  )
};

export default BlogList
