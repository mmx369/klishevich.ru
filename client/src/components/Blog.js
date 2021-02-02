import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { AuthContext } from '../context/AuthContext'
import { deleteBlog, addLike, addDislike } from '../reducers/blogReducer'
import blogService from '../services/blog'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    marginTop: 70,
    padding: 5,
  },
  imgBlog: {
    margin: 0,
    maxWidth: 450,
  },

  button: {
    borderRadius: 13,
    boxShadow: "0 3px 2px 2px",
    padding: "0 10px",
    margin: 10
  },

  blog: {
    padding: "5px",
    border: 'solid',
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 3,
  },
})

const Blog = ({ blog }) => {

  const auth = useContext(AuthContext)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()

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
    <div className={classes.root}>
      <div className={classes.blog}>
        <strong>{blog.title}</strong>&nbsp;<br />
        <small>{new Date(blog.date).toLocaleDateString()} by</small>&nbsp;<em style={{ color: 'blue' }}>{blog.author}</em>
        <div>
          {(blog.imgPath) ? <div className={classes.wrapper}><img className={classes.imgBlog} src={`/static/img_blog/${blog.imgPath}`} alt='' /></div> : null}
          <div className={classes.wrapperBlogText}>
            {blog.content}
          </div>
        </div>
        <IconButton
          onClick={() => handleLike(blog.id)}
          color='inherit'
          aria-label='like'>
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDislike(blog.id)}
          color='inherit'
          edge='start'
          aria-label='dislike'>
          <ThumbDownIcon />
        </IconButton>       {blog.likes} {t('liked')} &nbsp;
      {auth.userName === 'maximus' ?
          <Button
            className={classes.button}
            color='secondary'
            onClick={() => handleDelete(blog.id)}>{t('delete_blog')}
          </Button> : null}
      </div>
    </div >
  );
};

export default Blog
