let sortList = (obj) => {
    let arr = obj.sort((a, b) => {
        return b.sortOrderIndex - a.sortOrderIndex;
    });
    return arr;
}

let handleSearchs = (e, tempFullPatientDataList, setFullPatientDataList) => {
    // console.log("type",  e)
    if (typeof e === "object") {

        let serachData = e.target.value
        if (serachData != 1) {
            let serachResult = tempFullPatientDataList.filter((patientData) => {
                let isFiltered = false;
                Object.entries(patientData).forEach(([key, val]) => {

                    if (val.toString().toLowerCase().includes(serachData.toLowerCase())) {
                        isFiltered = true
                    }
                })
                return isFiltered;
            })
            let arr = sortList(serachResult)

            if (setFullPatientDataList != null) {

                setFullPatientDataList(arr)
            }
            console.log("resutl", arr)

            return arr
        }
        // else if (e === -10) {
        //     let serachData = -10;
        //     let serachResult = tempFullPatientDataList.filter((patientData) => {
        //         let isFiltered = false;
        //         Object.entries(patientData).forEach(([key, val]) => {
        //             // console.log("val.toString().toLowerCase()", val.toString().toLowerCase())
        //             if (!val.toString().toLowerCase().includes(serachData.toLowerCase())) {
        //                 isFiltered = true
        //             }
        //         })
        //         return isFiltered;
        //     })
        //     let arr = sortList(serachResult)

        //     if (setFullPatientDataList != null) {

        //         setFullPatientDataList(arr)
        //     }
        //     console.log("resutl", arr)
        //     setFullPatientDataList(arr)

        //     return arr
        //     // return tempFullPatientDataList
        // }


        else {

            let serachData = ["ICCU", "ICU CC", "HDUI"]
            let temp = [];
            let tt = []
            serachData.map((valdata) => {
                let serachResult = tempFullPatientDataList.filter((patientData) => {

                    let tempdata = valdata;
                    let isFiltered = false;
                    Object.entries(patientData).forEach(([key, val]) => {
                        console.log("type",tempdata, val)

                        if (val.toString().toLowerCase().includes(tempdata.toLowerCase())) {
                            isFiltered = true
                        }
                    })
                    return isFiltered;
                })
                temp = [...temp, ...serachResult]
                let arr = sortList(temp)

                if (setFullPatientDataList != null) {
                    setFullPatientDataList(arr)
                }

                tt = [...tt, ...arr]
            })
            return [...tt]
        }


    }


    else {
        if (typeof e === "number") {
            console.log("data", e)
            if (e === 1) {
                // console.log("enter 1", tempFullPatientDataList)
                let serachData = ["ICCU", "ICU CC", "HDUI"]
                let temp = [];
                let tt = []
                serachData.map((valdata) => {
                    let serachResult = tempFullPatientDataList.filter((patientData) => {

                        let tempdata = valdata;
                        let isFiltered = false;
                        Object.entries(patientData).forEach(([key, val]) => {
                            if (val != null) {
                                if (val.toString().toLowerCase().includes(tempdata.toLowerCase())) {
                                    isFiltered = true
                                }
                            }
                        })
                        return isFiltered;
                    })
                    temp = [...temp, ...serachResult]
                    let arr = sortList(temp)

                    if (setFullPatientDataList != null) {
                        setFullPatientDataList(arr)
                    }

                    tt = [...tt, ...arr]
                })

                return [...tt]
            }
            else if (e === 2) {

                return tempFullPatientDataList
            }
            // else if (e === -10) {
            //     console.log("search =", e)
            //     let serachData = -10;
            //     let serachResult = tempFullPatientDataList.filter((patientData) => {
            //         let isFiltered = false;
            //         Object.entries(patientData).forEach(([key, val]) => {

            //             if (!val.toString().toLowerCase().includes(serachData.toLowerCase())) {
            //                 isFiltered = true
            //             }
            //         })
            //         return isFiltered;
            //     })
            //     let arr = sortList(serachResult)

            //     if (setFullPatientDataList != null) {

            //         setFullPatientDataList(arr)
            //     }
            //     console.log("resutl", arr)
            //     return arr
            //     // return tempFullPatientDataList
            // }

        }
        else {
            let serachData = e;
            let serachResult = tempFullPatientDataList.filter((patientData) => {
                let isFiltered = false;
                Object.entries(patientData).forEach(([key, val]) => {

                    if (val.toString().toLowerCase().includes(serachData.toLowerCase())) {
                        isFiltered = true
                    }
                })
                return isFiltered;
            })
            let arr = sortList(serachResult)

            if (setFullPatientDataList != null) {

                setFullPatientDataList(arr)
            }
            console.log("resutl", arr)
            return arr
        }


    }
}


export default handleSearchs;