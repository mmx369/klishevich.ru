import React, { useContext, useState } from 'react';
import { useField } from '../hooks/useField';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewMsg } from '../reducers/newMsgReducer';
import { addBlog } from '../reducers/blogReducer';
import { AuthContext } from '../context/AuthContext';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import blogService from '../services/blog';
import Notification from '../components/Notification';
import { useTranslation } from 'react-i18next';
import { InputBase } from '@material-ui/core';
import uploadService from '../services/upload';
import { makeStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    marginTop: 70,
    padding: 5,
    border: 'solid 1px',
  },

  button: {
    borderRadius: 13,
    boxShadow: '0 3px 2px 2px',
    padding: '0 10px',
    margin: '10px 0',
  },

  inputStyle: {
    borderRadius: 13,
    boxShadow: '0 3px 2px 2px',
    padding: '5px 10px',
    margin: '10px 0',
    color: teal[500],
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.22s',
    fontWeight: 500,
  },
});

function AddNewBlog() {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  //upload image - begin-----------

  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    uploadService.uploadImageBlog(fd).then((res) => {
      console.log(res);
    });
  };

  //upload image -end-------------

  const classes = useStyles();

  const history = useHistory();

  const titleInput = useField('title');

  const dispatch = useDispatch();

  const handleAddNewBlog = (event) => {
    console.log(111111);
    event.preventDefault();
    const content = document.getElementById('textarea').value;

    if (selectedFile) {
      fileUploadHandler();
    }

    const blogObject = {
      title: titleInput.value,
      author: auth.userName,
      imgPath: !!selectedFile ? selectedFile.name : null,
      content,
    };

    console.log('blogObject', blogObject);

    blogService.setToken(auth.token);

    dispatch(addBlog(blogObject));
    dispatch(
      createNewMsg({
        message: `${t('A_new_blog')} ${titleInput.value} ${t(
          'has_been_added'
        )}`,
        msgType: 'success',
      })
    );

    setTimeout(() => {
      dispatch(createNewMsg([]));
    }, 3000);

    setTimeout(() => {
      history.push('/blog');
    }, 4000);
  };

  return (
    <>
      <div className={classes.root}>
        <Notification />
        <h2>{t('add_new_blog')}</h2>
        <form onSubmit={handleAddNewBlog}>
          <div>
            <strong>{t('title')}</strong>
            <br />
            <input
              type={titleInput.type}
              value={titleInput.value}
              name={titleInput.name}
              onChange={titleInput.onChange}
            />
          </div>
          <div>
            <strong>{t('content')}</strong>
            <br />
            <TextareaAutosize
              rowsMin={6}
              id="textarea"
              placeholder={t('place_your_text_here')}
            />
          </div>
          <div>
            <label htmlFor="files" className={classes.inputStyle}>
              {t('select_image')}
            </label>
            <InputBase
              id="files"
              style={{ visibility: 'hidden' }}
              type="file"
              name="image"
              onChange={fileSelectedHandler}
            />
          </div>
          <Button
            className={classes.button}
            type="submit"
            variant="outlined"
            color="secondary"
          >
            {t('add_new_blog')}
          </Button>
        </form>
      </div>

      {/* <div>
        <p><img src="http://localhost:4000/api/uploads/6012e0cfe0d73e03d8e1d0c5" alt="" style={{ width: '300px' }} /></p>
      </div> */}
    </>
  );
}

export default AddNewBlog;
