import axios from 'axios'

const baseUrl = "/api/uploads";
const shopUrl = "/api/goods"

const uploadImage = async (newImage) => {
  const response = await axios.post(baseUrl, newImage, {
    onUploadProgress: progressEvent => {
      console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
    }
  }
  )
  return response.data
}

const uploadImageShop = async (newImage) => {
  const response = await axios.post(`${shopUrl}/img`, newImage, {
    onUploadProgress: progressEvent => {
      console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
    }
  }
  )
  return response.data
}


const uploadService = { uploadImage, uploadImageShop }

export default uploadService

