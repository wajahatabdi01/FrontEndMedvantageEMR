
import axios from 'axios';
async function FileUpload(Imageurl) {

    const url = window.AppbaseUrl+'/api/FileUpload/SaveFile';
    const formData = new FormData();
    formData.append('file', Imageurl)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData, config)
    
}
export default FileUpload;