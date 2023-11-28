export default function RemoveDuplicateData(arr, checkName) {

    const uniqueIds = [];
    const unique = arr.filter(element => {
        const isDuplicate = uniqueIds.includes(element[checkName]);
      
        if (!isDuplicate) {
          uniqueIds.push(element[checkName]);
      
          return true;
        }
      
        return false;
      });
    
    return unique
}
 