import React, { useContext } from 'react'
import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createNewMsg } from "../reducers/newMsgReducer";
import { addBlog } from "../reducers/blogReducer";
import { AuthContext } from '../context/AuthContext';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import blogService from '../services/blog'
import Notification from '../components/Notification'

function AddNewBlog() {

  const auth = useContext(AuthContext)

  const history = useHistory()

  const classes = {
    input: {
      marginRight: '1rem',
      marhinLeft: '1rem',
    },
    textarea: {
      marginRight: '1rem',
      marhinLeft: '1rem',
    },
  }

  const titleInput = useField("title");

  const dispatch = useDispatch();

  const handleAddNewBlog = (event) => {
    event.preventDefault();
    const content = document.getElementById('textarea').value

    const blogObject = {
      title: titleInput.value,
      author: auth.userName,
      content,
    };
    console.log('Blogobject', blogObject);

    blogService.setToken(auth.token)

    dispatch(addBlog(blogObject));
    dispatch(createNewMsg(`A new blog ${titleInput.value} added`));
    setTimeout(() => {
      history.push('/blog')
    }, 5000);
  };

  return (
    <div>
      <Notification />
      <h2>Create new blog</h2>
      <form onSubmit={handleAddNewBlog}>
        <div>
          <strong>Title</strong><br />
          <input
            style={classes.input}
            type={titleInput.type}
            value={titleInput.value}
            name={titleInput.name}
            onChange={titleInput.onChange}
          />
        </div>
        <div>
          <strong>Content</strong><br />
          <TextareaAutosize
            rowsMin={6}
            id='textarea'
            placeholder='Place your text here'
          />
        </div>
        <Button
          type='submit'
          variant="outlined"
          color="primary">
          add new blog
        </Button>
      </form>
    </div>
  )
}

export default AddNewBlog
