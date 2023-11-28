// function ValidationUserTestCategoryAsign(testCategoryID = "", labUserID = "") {
//     if (testCategoryID !== "" && testCategoryID.trim().length !== 0 && labUserID !== "" && labUserID.trim().length !== 0) {
//         return true
//     }
//     else {
//         return false
//     }
// }

function ValidationUserTestCategoryAsign(testCategoryID = "", labUserID = "") {
    // Use parseInt to convert the values to integers and check if they are not NaN.
    const parsedTestCategoryID = parseInt(testCategoryID, 10);
    const parsedLabUserID = parseInt(labUserID, 10);
 
    if (!isNaN(parsedTestCategoryID) && !isNaN(parsedLabUserID)) {
        return true;
    } else {
        return false;
    }
}

export default ValidationUserTestCategoryAsign;

