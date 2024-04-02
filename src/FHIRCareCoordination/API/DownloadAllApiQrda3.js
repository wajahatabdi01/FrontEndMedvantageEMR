async function DownloadAllApiQrda3(formdata){
//     const formdata = new FormData();
// formdata.append("doctype", "ccda");
// formdata.append("combination", "29001");
// formdata.append("components", "allergies|medications|problems|immunizations|procedures|results|plan_of_care|vitals|social_history|encounters|functional_status|referral|instructions|medical_devices|goals");
// formdata.append("downloadccda", "download_ccda");

const requestOptions = {
  method: "POST",
  body: formdata,
  responseType: 'blob',
  redirect: "follow"
};

const response = await fetch("http://172.16.19.96/open/apis/default/api/ExportService", requestOptions);
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
    // const url = "http://172.16.19.96/open/apis/default/api/ExportService";
    // // const url = window.AppbaseUrl + '/api/ParseDocument/ParseDocument';
    // // const head = { accept : '*/*'};
    // let data1 = data == null ? [] : data;
    // const response = await fetch(url, {
    //     method:'POST',
    //     // headers: head,
    //     body:data
    // });
    const blob = await response.blob(); // Get the response as a blob

    // Extract filename from Content-Disposition header
    const contentDisposition = response.headers.get('content-disposition');
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);
    const filename = matches && matches[1] ? matches[1].replace(/['"]/g, '') : 'selected_patient.xml';

    // Create a URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a hidden anchor element
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = filename; // Set the filename extracted from the response headers
    anchor.style.display = 'none';

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger a click event on the anchor to start the download
    anchor.click();

    // Remove the anchor from the body
    document.body.removeChild(anchor);

    // Revoke the blob URL to free up memory
    window.URL.revokeObjectURL(blobUrl);

    return "";
}

export default DownloadAllApiQrda3;
