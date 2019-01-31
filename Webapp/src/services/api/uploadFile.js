import axios from 'axios'

export default{
  uploadFile (id, type, file) {
    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('id', id);
    formData.append('type', type);
    console.log(formData.get('image'));
    return axios.post("/api/file_upload", formData);
  },

  checkIfFileExists(url)
  {
    return axios.get(url);
  }
}