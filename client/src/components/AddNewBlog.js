import React from 'react'
import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { createNewMsg } from "../reducers/newMsgReducer";
import { addBlog } from "../reducers/blogReducer";

function AddNewBlog({ author }) {

  const classes = {
    input: {
      margin: '1rem',
      marginRight: '1rem',
      marhinLeft: '1rem',
    },
    textarea: {
      margin: '1rem',
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
      author,
      content,
    };
    console.log(1111, blogObject);

    dispatch(addBlog(blogObject));
    dispatch(createNewMsg(`A new blog ${titleInput.value} added`));
    setTimeout(() => {
      dispatch(createNewMsg(null));
    }, 3000);
  };

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleAddNewBlog}>
        <div>
          title
          <input
            style={classes.input}
            type={titleInput.type}
            value={titleInput.value}
            name={titleInput.name}
            onChange={titleInput.onChange}
          />
        </div>
        <div>
          content
          <textarea style={classes.textarea} id='textarea' cols='50' row='400'>
          </textarea>
        </div>
        <button
          type="submit"          >
          add new blog
      </button>
      </form>
    </div>
  )
}

export default AddNewBlog
