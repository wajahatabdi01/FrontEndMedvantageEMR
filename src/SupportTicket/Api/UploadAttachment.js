import { error } from "highcharts";

let UploadAttachment = async (file)=>{
const url = window.supportTicketUploadMediaBaseUrl +"/api/FileUpload/SaveFile";
let response = await fetch(url,{
    method:"POST",
    body:file
});
if(response.ok){
 return response.text();
}
else{
 throw new Error(`HTTP error! Status: ${response.status}`);
}

}
export default UploadAttachment;