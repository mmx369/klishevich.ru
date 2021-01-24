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
import useStyles from '../style'

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
    <div className={classes.container}>
      <div className={classes.blog}>
        <strong>{blog.title}</strong>&nbsp;<br />
        <small>{new Date(blog.date).toLocaleDateString()} by</small>&nbsp;<em style={{ color: 'blue' }}>{blog.author}</em>
        <p>
          {blog.content}
        </p>
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
            className={classes.buttonMain}
            onClick={() => handleDelete(blog.id)}>{t('delete_blog')}
          </Button> : null}
      </div>
    </div>
  );
};

export default Blog
