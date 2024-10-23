import axios from "axios"

export const uploadFiles = async (token, form) => {
  // code 
  // console.log('form api frontent', form)
  return axios.post('http://localhost:5000/api/images', {
      image: form
  }, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
}

export const removeFiles = async (token, public_id) => {
  // code 
  // console.log('form api frontent', form)
  return axios.post('http://localhost:5000/api/removeimages', {
      public_id
  }, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
}


