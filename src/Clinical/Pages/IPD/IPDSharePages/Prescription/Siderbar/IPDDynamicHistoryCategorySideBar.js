import React, { useEffect, useState } from 'react'

import SaveOPDData from '../../../../../../Code/SaveOPDData'

import { useSelector } from 'react-redux'

import GetHistorySubCategoryMasterById from '../../../../../API/OPD/Prescription/GetHistorySubCategoryMasterById'

import BoxHeading from '../../../../../../Component/BoxHeading'

import Heading from '../../../../../../Component/Heading'

import SaveIPDData from '../../../../../../Code/SaveIPDData'

import DropdownWithSearch from '../../../../../../Component/DropdownWithSearch'


import GetVaccineList from '../../../../../API/IPD/Prescription/GetVaccineList'

import GetProblemList from '../../../../../API/KnowMedsAPI/GetProblemList'



export default function IPDDynamicHistoryCategorySideBar(props) {



    let [subCategory, setSubCategory] = useState([])

    let [testName, setTestName] = useState([])

    let [sendData, setSendData] = useState([])

    let [patientHistoryResult, setPatientHistoryResult] = useState([])

    let [clearDropdown, setClearDropdown] = useState(0)

    let [getVaccineList, setGetVaccineList] = useState([]);

    let [getProblemList, setGetProblemList] = useState([]);

    let [dob, setDob] = useState("");

    let [arrCheckBoxes, setArrCheckBoxes] = useState([]);

    let [ageUnit, setAgeUnit] = useState("")

    let [isSelected, setIsSelected] = useState(0)





    let getdata = async () => {

        let response = await GetHistorySubCategoryMasterById(props.id)



        let vaccineListResp = await GetVaccineList();

        let problemListResp = await GetProblemList();

        console.log('vaccineListResp', vaccineListResp);

        // console.log("response", response)

        if (response.status === 1) {

            // setSubCategory(response.responseValue)

            console.log('response.responseValue', response.responseValue);



            let tempparamentername = []

            let checksubCategoryId = (value) => {

                let tr = 0

                let index

                tempparamentername.map((val, ind) => {

                    if (val.subCategoryId === value.subCategoryId) {

                        tr = 1

                        index = ind

                    }

                })

                if (tr !== 0) {

                    return [true, index]

                }

                else {



                    return [false, -1]

                }

            }



            response.responseValue.map((value, index) => {

                let check = checksubCategoryId(value)

                if (check[0]) {

                    tempparamentername[check[1]].repeaterData.push({
                        "subCategoryParameterIdAssignId": value.historyParameterAssignId,
                        "parameterId": value.parameterId,
                        "parameterName": value.parameterName,
                        "inspectedAs": value.inspectedAs,
                        "dataType": value.dataType,
                        "isTaken": value.isTaken,
                        "clinicalDataType": value.clinicalDataType,
                        "isDateShow" : value.isDateShow,
                        "status": value.status
                    })
                }

                else {

                    let t = {
                        subCategoryId: value.subCategoryId,
                        subCategoryName: value.subCategoryName,
                        categoryId: value.categoryId,
                        categoryName: value.categoryName,
                        remark: value.remark,
                        createdDate: value.createdDate,
                        userId: value.userId,
                        repeaterData: [{
                            "subCategoryParameterIdAssignId": value.historyParameterAssignId,
                            "parameterId": value.parameterId,
                            "parameterName": value.parameterName,
                            "inspectedAs": value.inspectedAs,
                            "dataType": value.dataType,
                            "isTaken": value.isTaken,
                            "clinicalDataType": value.clinicalDataType,
                            "isDateShow" : value.isDateShow,
                            "status": value.status
                        }]
                    }
                    tempparamentername.push(t)
                }
            })



            // let tempsetResult = [...tempparamentername]

            // tempparamentername.map((val, ind) => {

            //     val.repeaterData.map((v, i) => {

            //         if (v.historyParameterAssignId === v.historyParameterAssignId) {



            //         }

            //     })

            // })

            console.log('tempparamentername', tempparamentername);
            setSubCategory(tempparamentername)
            setData(tempparamentername)
        }
        if (vaccineListResp.status === 1) {
            setGetVaccineList(vaccineListResp.responseValue);
        }

        if (problemListResp.status === 1) {
            setGetProblemList(problemListResp.responseValue);
        }

    }



    // console.log('getVaccineList', getVaccineList);



    let handleOnChange = (historyParameterAssignId, id, remark) => {
        console.log('radio')
        let flag = 0
        let temp = [...sendData]
        if (sendData.length !== 0) {
            setIsSelected(1)
            sendData.map((val, ind) => {
                // console.log("csdcsc", val.subCategoryParameterIdAssignId, historyParameterAssignId, val.parameterValueId, id)
                if (val.subCategoryParameterIdAssignId === historyParameterAssignId) {
                    console.log("e")
                    if (val.parameterValueId === id) {
                        console.log("enter")
                        flag = 1
                    }

                    else {
                        temp.splice(ind, 1)
                    }

                    //  temp[ind]

                    return
                }
            })
        }

        else {
            setIsSelected(0)
        }

        if (temp.length === 0) {
            setIsSelected(0)
        }



        console.log("scsd", temp.length)



        // if()

        console.log("flag value", historyParameterAssignId)
        if (flag === 0) {
            let jsonHistory = {
                subCategoryParameterIdAssignId: historyParameterAssignId,
                parameterValueId: id,
                parameterStatement: remark,
                clinicalDataTypeId: null,
                clinicalDataTypeRowId: null,            
                date: null
            }



            setIsSelected(1)





            setSendData([...sendData, jsonHistory])
            SaveIPDData([...sendData, jsonHistory], "patientHistoryCategoryResult")
        }
    }



    let patientsendData = useSelector((state) => state.IPDPatientSendData)

    let setData = (val) => {
        let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        let tempGetData = []
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "patientHistoryCategoryResult") {
                        console.log("History", val.patientHistoryCategoryResult)
                        setPatientHistoryResult(val.patientHistoryCategoryResult)
                        tempGetData = [...val.patientHistoryCategoryResult]
                        setSendData(val.patientHistoryCategoryResult)
                        if (val.patientHistoryCategoryResult.length !== 0) {
                            setIsSelected(1)
                        }
                    }
                }
            })
        })


        console.log("data ", val)
        let tempsub = [...val]
        val.map((val, ind) => {
            val.repeaterData.map((va, inn) => {
                va.status.map((vs, ia) => {
                    tempGetData.map((v, i) => {
                        if (v.subCategoryParameterIdAssignId === va.subCategoryParameterIdAssignId && v.parameterValueId === vs.id) {
                            tempsub[ind].repeaterData[inn].status[ia]["checked"] = true
                            // console.log("dataaa", v)
                            tempsub[ind].repeaterData[inn]["date"] = v.date
                        }
                        else {
                            if (tempsub[ind].repeaterData[inn].status[ia]["checked"] !== true) {
                                tempsub[ind].repeaterData[inn].status[ia]["checked"] = false
                            }
                        }
                    })
                })
            })
        })

        setSubCategory(tempsub)
    }



    // useEffect(() => {

    //     SaveOPDData(sendData, "patientHistoryCategoryResult")

    // }, [sendData])

    let handleTextChange = (e, ind) => {
        // let name = 1

        console.log("dscsdcs",)
        let name = e.target.name.split(",")[0]
        // console.log("name ", e.target.name)
        let value = e.target
        console.log("sendData", sendData)
        let jsonHistory = {}
        if (parseInt(name) === 1) {
            // console.log("sendData", sendData)
            let indexValue = sendData.map((val, i) => {
                console.log("1val.historyParameterAssignId", val.subCategoryParameterIdAssignId, "e.target.name.split(", ")[1].toString()", e.target.name.split(",")[1].toString(), sendData)

                if (val.subCategoryParameterIdAssignId !== null) {


                    if (val.subCategoryParameterIdAssignId.toString() === e.target.name.split(",")[2].toString()) { return i }

                }

            })

            console.log("cscscsc", indexValue)

            indexValue = indexValue.filter(val => undefined !== val)

            if (indexValue.length !== 0) {

                indexValue.map((val) => {

                    let tempData = [...sendData]



                    tempData[val].clinicalDataTypeId = 1;

                    tempData[val].clinicalDataTypeRowId = value.allValue.id;

                    tempData[val].date = "";

                    console.log("senbddata", tempData)

                    setSendData([...tempData])

                    SaveIPDData([...tempData], "patientHistoryCategoryResult")

                })

            }

            else {



                jsonHistory = {

                    subCategoryParameterIdAssignId: null,

                    parameterValueId: null,

                    parameterStatement: null,

                    clinicalDataTypeId: 1,

                    clinicalDataTypeRowId: value.allValue.id,

                    date: ""

                }

                setSendData([...sendData, jsonHistory])

                SaveIPDData([...sendData, jsonHistory], "patientHistoryCategoryResult")

            }









            // console.log("e")

        }

        else if (parseInt(name) === 2) {

            let indexValue = sendData.map((val, i) => {

                if (val.subCategoryParameterIdAssignId !== null) {

                    if (val.subCategoryParameterIdAssignId.toString() === e.target.name.split(",")[2].toString()) { return i }

                }

            })

            indexValue = indexValue.filter(val => undefined !== val)

            if (indexValue.length !== 0) {

                indexValue.map((val) => {

                    let tempData = [...sendData]



                    tempData[val].clinicalDataTypeId = 2;

                    tempData[val].clinicalDataTypeRowId = value.allValue.id;

                    tempData[val].date = "";

                    console.log("senbddata", tempData)

                    setSendData([...tempData])

                    SaveIPDData([...tempData], "patientHistoryCategoryResult")

                })



            }

            else {



                jsonHistory = {

                    subCategoryParameterIdAssignId: null,

                    parameterValueId: null,

                    parameterStatement: null,

                    clinicalDataTypeId: 2,

                    clinicalDataTypeRowId: value.allValue.id,

                    date: ""

                }

                setSendData([...sendData, jsonHistory])

                SaveIPDData([...sendData, jsonHistory], "patientHistoryCategoryResult")

            }

        }

        else if (name === "age" || name === "AgeCal" || name === "ddlAgeUnit") {

            if (document.getElementById("txtDob#" + ind).value !== undefined) {

                let date = document.getElementById("txtDob#" + ind).value



                let indexValue = sendData.map((val, i) => {

                    console.log("dttt", e.target.name)

                    console.log("val.historyParameterAssignId.toString()", val.subCategoryParameterIdAssignId.toString(), "e.target.name.split(", ")[2].toString()", e.target.name.split(",")[2].toString())

                    if (val.subCategoryParameterIdAssignId !== null) {

                        if (val.subCategoryParameterIdAssignId.toString() === e.target.name.split(",")[2].toString()) { return i }

                    }

                })

                indexValue = indexValue.filter(val => undefined !== val)

                // console.log("indexvalue", indexValue)

                let tempData = [...sendData]

                indexValue.map((val) => {

                    tempData[val].date = date

                    console.log("tempData", tempData)



                    setSendData([...tempData])

                    SaveIPDData([...tempData], "patientHistoryCategoryResult")

                })



            }





        }





    }

    let handleClear = (value) => {

        setClearDropdown(value);

        setGetVaccineList('')

    }



    //age calculate

    let handlerChangeUnit = (key) => {

        const ageUnit = document.getElementById('ddlAgeUnit#' + key).value;

        if (ageUnit === "1") {

            setAgeUnit("Years")

        }

        else if (ageUnit === "2") {

            setAgeUnit("Months")

        }

        else if (ageUnit === "3") {

            setAgeUnit("Days")

        }

        handleAgeUnit(ageUnit, key)

    }

    let getPatientAge = (key) => {

        console.log('txtDob#', key)

        document.getElementById("ddlAgeUnit#" + key).value = "1";

        const val = document.getElementById('txtDob#' + key).value;

        // setDob(val);

        let today = new Date();

        let birthDate = new Date(val);

        let getAge = today.getFullYear() - birthDate.getFullYear();

        let getMonth = today.getMonth() - birthDate.getMonth();

        if (getMonth < 0 || (getMonth === 0 && today.getDate() - birthDate.getDate())) {

            getAge--;

        }

        // setPatientAge(getAge);

        document.getElementById("txtAge#" + key).value = getAge > 0 ? getAge : "0";

        console.log('getAge', getAge);

    }

    let getPatientDobByAge = (key) => {

        const values = document.getElementById('txtAge#' + key).value;

        console.log('value', values)

        if (values > 0) {



            // setPatientAge(e.target.value);

            const slctdUnit = document.getElementById("ddlAgeUnit#" + key).value;

            // document.getElementById("txtAge#"+key).value=values;

            handleAgeUnit(slctdUnit, key)



        }

        // else{

        //     setPatientAge("");

        //     setDob('')

        // }

    }

    let handleAgeUnit = (value, key) => {

        let age = document.getElementById('txtAge#' + key).value;

        var DOB = "";

        var month = "";

        var day = "";

        var year = "";

        var now = new Date();

        var nowMonth = now.getUTCMonth() + 1;

        var nowDay = now.getUTCDate();

        var nowYear = now.getUTCFullYear();

        if (value === "1") {             //Year

            year = nowYear - age;

            // DOB = year  + "-" + nowMonth + "-" + nowDay;

            var yyyy = year;

            var mm = nowMonth.toString().length === 2 ? nowMonth : '0' + nowMonth;

            var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;

            var getDob = yyyy + '-' + mm + '-' + dd;

            DOB = getDob;

            console.log('DOB', DOB)

            // setDob(DOB)

            document.getElementById("txtDob#" + key).value = DOB;

        }

        else if (value === "2") {      //Month

            if ((age > nowMonth)) {

                if ((age / 12) >= 1) {

                    year = nowYear - parseInt((age / 12));

                    if (((age % 12) < nowMonth)) {

                        month = nowMonth - (age % 12);

                        // DOB = year + "-" + month + "-" + nowDay;

                        var yyyy = year;

                        var mm = month.toString().length === 2 ? month : '0' + month;

                        var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;

                        var getDob = yyyy + '-' + mm + '-' + dd;

                        DOB = getDob;



                        // setDob(DOB)

                        document.getElementById("txtDob#" + key).value = DOB;

                    }

                    else {

                        month = (nowMonth + 12) - (age % 12);

                        // DOB =  parseInt(year - 1)+ "-" + month + "-" +nowDay ;

                        var yyyy = parseInt(year - 1);

                        var mm = month.toString().length === 2 ? month : '0' + month;

                        var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;

                        var getDob = yyyy + '-' + mm + '-' + dd;

                        DOB = getDob;

                        //   setDob(DOB)

                        document.getElementById("txtDob#" + key).value = DOB;

                        // setDob(DOB)

                    }

                }

                else {

                    year = nowYear - 1;

                    month = (nowMonth + 12) - age;

                    // DOB = year + "-" + month + "-" + nowDay;

                    var yyyy = year;

                    var mm = month.toString().length === 2 ? month : '0' + month;

                    var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;

                    var getDob = yyyy + '-' + mm + '-' + dd;

                    DOB = getDob;

                    // setDob(DOB)

                }

            }

            else {

                month = nowMonth - age;

                var yyyy = nowYear;

                var mm = month.toString().length === 2 ? month : month.toString() === '0' ? '01' : '0' + month;

                var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;

                var getDob = yyyy + '-' + mm + '-' + dd;

                DOB = getDob;

                // DOB = nowYear + "-" + month + "-" + nowDay;



                // setDob(DOB)

            }

        }

        else if (value === "3") {  //Day

            now.setDate(now.getDate() - age);

            var a = now.toLocaleDateString().split("/");

            var yyyy = a[2];

            var mm = a[0].length === 2 ? a[0] : '0' + a[0];

            var dd = a[1].length === 2 ? a[1] : '0' + a[1];

            var getDob = yyyy + '-' + mm + '-' + dd;

            // var b = a[2] + '-' + a[0].length === 2 ? a[0]: '0'+a[0]+ '-' + a[1].length === 2 ? a[1]: '0'+a[1];

            DOB = getDob;

            // setDob(DOB)

            document.getElementById("txtDob#" + key).value = DOB;

        }



    }





    useEffect(() => {

        console.log("cdscsdcscsd")

        setData([])

        getdata()

    }, [props])

    return (

        <div className={`${props.val === 0 ? 'offcanvas' : "offcanvas show"}   offcanvas-end`} style={{ width: "400px" }} data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="allergies" aria-labelledby="allergiesLabel">
            <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" onClick={() => { props.fun(0) }} aria-label="Close"><i className='fa fa-close ' ></i></div>
                <h5 className="offcanvas-title text-white" id="allergiesLabel" >{props.name}</h5>
           </div>

            <div className="offcanvas-body" >
                {subCategory && subCategory.map((val, index) => {
                    
                    return (
                        <>
                            <div className='row_'>
                                {/* <BoxHeading title={val.subCategoryName} /> */}
                                <div className='boxheading hpad'>{val.subCategoryName} </div>
                            </div>

                            <div className='d-flex  flex-column gap-2 pb-2'>

                                {subCategory && val.repeaterData.map((val, inde) => {

                                    return (<>
                                        <div className='d-flex flex-column subhh'>
                                            <Heading text={val.parameterName} />
                                           <div className='ipd-chkk-int'>
                                                {val.status && val.status.map((v, i) => {
                                                    return (
                                                        <>

                                                            {/* <div className='ipd-chkk'><input type={val.dataType === "checkbox" ? 'checkbox' : 'radio'}

                                                          style={{cursor:'pointer'}} name={val.parameterName} onChange={() => { handleOnChange(val.examParameterAssignId, v.id, v.remark) }} defaultChecked={v.checked} /> {v.remark} </div>                                                            */}

                                                            <div className='ipd-chkk'><input type={val.dataType === "checkbox" ? 'checkbox' : 'radio'}

                                                                // style={{ cursor: 'pointer' }} name={val.parameterName} onChange={() => { val.dataType === "checkbox" ? handlerCheckbox(val.historyParameterAssignId, val.clinicalDataType, val.parameterId, v.id, v.remark) : handleOnChange(val.examParameterAssignId, v.id, v.remark) }} defaultChecked={v.checked} /> {v.remark} </div>

                                                                style={{ cursor: 'pointer' }} name={val.parameterName} onChange={() => { handleOnChange(val.subCategoryParameterIdAssignId, v.id, v.remark) }} defaultChecked={v.checked} /> {v.remark} </div>

                                                        </>

                                                    )

                                                })}

                                            </div>

                                            <div className='dropd-in'>
                                                {val.isTaken === 1 ?
                                                    <div className='dropd'>
                                                        {val.clinicalDataType === 2 ?
                                                            <>
                                                                <label>Select Vaccine</label>
                                                                <DropdownWithSearch defaulNname="Select Vaccine" name={2 + "," + val.parameterName + "," + val.subCategoryParameterIdAssignId} list={getVaccineList} valueName="id" displayName="vaccineName" editdata={""} getvalue={(e) => handleTextChange(e, inde)} clear={clearDropdown} clearFun={handleClear} />
                                                            </>
                                                            :
                                                            val.clinicalDataType === 1 ?
                                                            <>
                                                                <label>Select Disease</label>
                                                                <DropdownWithSearch defaulNname="select" name={1 + "," + val.parameterName + "," + val.subCategoryParameterIdAssignId} list={getProblemList} valueName="id" displayName="problemName" editdata={""} getvalue={(e) => handleTextChange(e, inde)} clear={clearDropdown} clearFun={handleClear} />
                                                            </> : <></>
                                                        }

                                                        </div> : <></>}    

                                                        {/* ---- */}
                                                        {console.log('val', val)}
                                                        {val.isDateShow === 1 ?  
                                                            <div className="d-flex align-items-center gap-1">
                                                            <div className="datecnt" style={{ width: '140px' }}>
                                                                <label htmlFor="txtDob" className="form-label"><img src='' className='icnn' alt='' />Date</label>
                                                                <input type="date" className="form-control form-control-sm" id={"txtDob#" + inde} value={val.date} name={"AgeCal" + "," + val.parameterName + "," + val.subCategoryParameterIdAssignId} onChange={(e) => { getPatientAge(inde); handleTextChange(e, inde) }} />
                                                            </div>
                                                            <div className="agecnt_" style={{ marginTop: '20px' }}>
                                                                <div className="form-text1 pt-1">OR</div>
                                                            </div>
                                                            <div className="agecnt-in">
                                                                <div className="agecnt">
                                                                    <div className='agecnt-1'>
                                                                        <label htmlFor="txtAge" className="form-label"><img src='' className='icnn' alt='' />How Many</label>
                                                                        <input type="number" className="form-control form-control-sm" id={"txtAge#" + inde} placeholder="E.g., 2" name={"age" + "," + val.parameterName + "," + val.subCategoryParameterIdAssignId} onChange={(e) => { getPatientDobByAge(inde); handleTextChange(e, inde) }} />
                                                                    </div>
                                                                </div>
                                                                <div className="agecnt">
                                                                    <label htmlFor="ddlAgeUnit" className="form-label"><img src='' className='icnn' alt='' />Unit</label>
                                                                    <select className="form-select form-select-sm" id={"ddlAgeUnit#" + inde} aria-label=".form-select-sm example" name={"ddlAgeUnit" + "," + val.parameterName + "," + val.subCategoryParameterIdAssignId} onChange={(e) => { handlerChangeUnit(inde); handleTextChange(e, inde) }}>
                                                                        <option value="1" >Year</option>
                                                                        <option value="2">Month</option>
                                                                        <option value="3" selected>Day</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <></>
                                                    }                                                   
                                                                                                          

                                            </div>

                                        </div>

                                    </>)

                                })}

                            </div>

                        </>

                    )

                })}

            </div>

        </div>

    )

}