import React, { useContext, useState } from 'react'
import { useField } from '../hooks/useField';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createNewMsg } from '../reducers/newMsgReducer';
import { addBlog } from '../reducers/blogReducer'
import { AuthContext } from '../context/AuthContext'
import Button from '@material-ui/core/Button'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import blogService from '../services/blog'
import Notification from '../components/Notification'
import { useTranslation } from 'react-i18next'
import useStyles from '../style'
import uploadService from '../services/upload'

function AddNewBlog() {

  const auth = useContext(AuthContext)
  const { t } = useTranslation()

  //upload image - begin-----------

  const [selectedFile, setSelectedFile] = useState(null)

  const fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0])
  }

  const fileUploadHandler = () => {
    const fd = new FormData()
    fd.append('image', selectedFile, selectedFile.name)
    uploadService.uploadImageShop(fd).then(res => {
      console.log(res)
    })
  }

  //upload image -end-------------

  const classes = useStyles()

  const history = useHistory()

  const titleInput = useField('title');

  const dispatch = useDispatch();

  const handleAddNewBlog = (event) => {
    event.preventDefault();
    const content = document.getElementById('textarea').value

    const blogObject = {
      title: titleInput.value,
      author: auth.userName,
      content,
    };

    blogService.setToken(auth.token)

    dispatch(addBlog(blogObject));
    dispatch(createNewMsg({ message: `${t('A_new_blog')} ${titleInput.value} ${t('has_been_added')}`, msgType: 'success' }))

    setTimeout(() => {
      dispatch(createNewMsg([]))
    }, 3000);

    setTimeout(() => {
      history.push('/blog')
    }, 4000);
  };

  return (
    <>
      <div className={classes.container} style={{ border: 'solid' }}>
        <Notification />
        <h2>{t('add_new_blog')}</h2>
        <form onSubmit={handleAddNewBlog}>
          <div>
            <strong>{t('title')}</strong><br />
            <input
              className={classes.input}
              type={titleInput.type}
              value={titleInput.value}
              name={titleInput.name}
              onChange={titleInput.onChange}
            />
          </div>
          <div>
            <strong>{t('content')}</strong><br />
            <TextareaAutosize
              rowsMin={6}
              id='textarea'
              placeholder={t('place_your_text_here')}
            />
          </div>
          <Button
            className={classes.buttonMain}
            type='submit'
            variant='outlined'
            color='primary'
          >
            {t('add_new_blog')}
          </Button>
        </form>
      </div>
      <div style={{ border: 'solid' }}>

        <h2>Upload file</h2>
        <input
          type='file'
          name='image'
          onChange={fileSelectedHandler}
        />
        <button onClick={fileUploadHandler}>Upload</button>
      </div>

      <div>
        <p><img src="http://localhost:4000/api/uploads/6012e0cfe0d73e03d8e1d0c5" alt="" style={{ width: '300px' }} /></p>
      </div>


    </>
  )
}

export default AddNewBlog
