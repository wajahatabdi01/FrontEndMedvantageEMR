 function EncryptUrl(data) {
    const CryptoJS = require("crypto-js");
    let text = data;
    var key = "Criteriontech@786";
    var ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    return ciphertext;
}
function encodeQuery(data) {
    let query = "";
    for (let d in data) {
      query += d + "=" + data[d] + "&";
    }
    return query.slice(0, -1);
  }
export default function EncryptQueryData(data) {
    let objects = Object.keys(data);
    objects.map((val, ind) => {
      data[val] = EncryptUrl(val);
    });
    let finalresult = encodeQuery(data);
    return finalresult
}