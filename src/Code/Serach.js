export default function Search(objectArray, serachData) {
   let quickResult = objectArray.filter(obj => Object.values(obj).some(val => val ? val.toString().toLowerCase().replace(/ /g, '').includes(serachData.toString().toLowerCase().replace(/ /g, '')) : false));
   return quickResult;

}



const SearchIndex = (obj, parName, value) => {
   let ind = ""
   obj.map((val, index) => {
      if (val[parName].toString().toLowerCase() === value.toString().toLowerCase()) {
         ind = index
      }
   })
   return ind
}

const SearchIndexAll = (obj, parName, value) => {
   let ind = ""

   ind = obj.map((val, index) => {
      if (val[parName].toString().toLowerCase() === value.toString().toLowerCase()) {
         return index
      }
   })

   return ind.filter((v) => { return v !== undefined })
}

const FindByQuery = (obj, query, keys) => {

   try {


      const filteredNames = obj
         .filter((item) => item[keys].toString().replaceAll(" ", "").toLowerCase().replaceAll("-", "").includes(query.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "")))
         .sort((a, b) => {
            const key = query.toString().toLowerCase();
            if (a[keys] != undefined) {
               const isGoodMatchA = a[keys].toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "").startsWith(key);
               const isGoodMatchB = b[keys].toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "").startsWith(key);
               if (isGoodMatchA ^ isGoodMatchB) { // XOR
                  return isGoodMatchA ? -1 : 1;
               }
               return a[keys].toString().localeCompare(b[keys].toString());
            }
         });
      return filteredNames
   }
   catch (e) {

      return e.message
   }
};
export { FindByQuery, SearchIndex, SearchIndexAll }