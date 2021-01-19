import blogService from "../services/blog";
import { NEW_BLOG, INIT_BLOGS, DELETE_BLOG, UPDATED_BLOG } from './types'


const blogReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_BLOG: {
      return [...state, action.data];
    }

    case INIT_BLOGS: {
      return action.data;
    }

    case UPDATED_BLOG: {
      return action.data
    }

    case DELETE_BLOG: {
      return action.data
    }

    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    });
  };
};

export const addLike = (id) => {
  return async (dispatch) => {
    try {
      const listOfBlogsToLike = await blogService.getAll();
      const blogToAddLike = listOfBlogsToLike.find((n) => n.id === id);
      const addedLike = {
        ...blogToAddLike,
        likes: blogToAddLike.likes + 1,
      }
      await blogService.addLike(id, addedLike);
      const updatedListOfBlogs = await blogService.getAll()
      dispatch({
        type: UPDATED_BLOG,
        data: updatedListOfBlogs,
      });
    } catch (e) {
      console.log('Error', e);
    }
  };
};

export const addDislike = (id) => {
  return async (dispatch) => {
    try {
      const listOfBlogsToDislike = await blogService.getAll();
      const blogToAddDislike = listOfBlogsToDislike.find((n) => n.id === id);
      const addedDislike = {
        ...blogToAddDislike,
        likes: blogToAddDislike.likes - 1,
      };
      await blogService.addLike(id, addedDislike);
      const updatedListOfBlogs = await blogService.getAll()
      dispatch({
        type: UPDATED_BLOG,
        data: updatedListOfBlogs,
      });
    } catch (e) {
      console.log('Error', e);
    }
  };
};

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService
      .create(blogObject)
      .then((returnedBlog) => returnedBlog);
    dispatch({ type: NEW_BLOG, data: blog });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService
      .deleteBlog(id)
      .then((response) => response.data);
    const updatedListOfBlogs = await blogService.getAll()
    dispatch({ type: DELETE_BLOG, data: updatedListOfBlogs });
  };
};

export default blogReducer;
