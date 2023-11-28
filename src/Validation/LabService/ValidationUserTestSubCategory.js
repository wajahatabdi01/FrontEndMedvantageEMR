// function ValidationUserTestSubCategory(subCategoryID = "", labuserId = "") {
//     if (subCategoryID !== "" && subCategoryID.trim().length !== 0 && labuserId !== "" && labuserId.trim().length !== 0) {
//         return true
//     }
//     else {
//         return false
//     }
// }

function ValidationUserTestSubCategory(subCategoryID = "", labuserId = "") {
    // Use parseInt to convert the values to integers and check if they are not NaN.
    const parsedsubCategoryID = parseInt(subCategoryID, 10);
    const parsedlabuserId = parseInt(labuserId, 10);
 
    if (!isNaN(parsedsubCategoryID) && !isNaN(parsedlabuserId)) {
        return true;
    } else {
        return false;
    }
}

export default ValidationUserTestSubCategory;