import React, { useEffect, useState } from 'react'
import GetExaminationSubCategory from '../../../../../API/OPD/Prescription/GetExaminationSubCategory'
import { useSelector } from 'react-redux'
import SaveIPDData from '../../../../../../Code/SaveIPDData'
import BoxHeading from '../../../../../../Component/BoxHeading'
import Heading from '../../../../../../Component/Heading'
import GetVaccineList from '../../../../../API/OPD/Prescription/GetVaccineList'
import GetProblemList from '../../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import DropdownWithSearch from '../../../../../../Component/DropdownWithSearch';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function IPDDynamicExaminationSideBar(props) {
    const {t} = useTranslation();

    document.body.dir = i18n.dir()
    let [subCategory, setSubCategory] = useState([])
    let [testName, setTestName] = useState([])
    let [sendData, setSendData] = useState([])
    let [patientExaminationResult, setPatientExaminationResult] = useState([])
    let [clearDropdown, setClearDropdown] = useState(0)
    let [getVaccineList, setGetVaccineList] = useState([]);
    let [getProblemList, setGetProblemList] = useState([]);
    let [dob, setDob] = useState("");
    let [patientAge, setPatientAge] = useState("");
    let [changeText, setChangeText] = useState("");


    let getdata = async () => {
        let response = await GetExaminationSubCategory(props.id)
        let vaccineListResp = await GetVaccineList();
        let problemListResp = await GetProblemList();
        if (response.status === 1) {
            // setSubCategory(response.responseValue)

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
                        "examParameterAssignId": value.examParameterAssignId,
                        "parameterId": value.parameterId,
                        "parameterName": value.parameterName,
                        "inspectedAs": value.inspectedAs,
                        "dataType" : value.dataType,
                        "isTaken" : value.isTaken,
                        "clinicalDataType": value.clinicalDataType,
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
                            "examParameterAssignId": value.examParameterAssignId,
                            "parameterId": value.parameterId,
                            "parameterName": value.parameterName,
                            "inspectedAs": value.inspectedAs,
                            "dataType" : value.dataType,
                            "isTaken" : value.isTaken,
                            "clinicalDataType": value.clinicalDataType,
                            "status": value.status
                        }]
                    }
                    tempparamentername.push(t)
                }
            })

            // let tempsetResult = [...tempparamentername]
            // tempparamentername.map((val, ind) => {
            //     val.repeaterData.map((v, i) => {
            //         if (v.subCategoryParameterIdAssignId === v.examParameterAssignId) {

            //         }
            //     })
            // })

            setSubCategory(tempparamentername)
            setData(tempparamentername)
        }
        if(vaccineListResp.status === 1){         
            setGetVaccineList(vaccineListResp.responseValue);
        }
        if(problemListResp.status === 1){         
            setGetProblemList(problemListResp.responseValue);
        }
    }

    let handleOnChange = (examParameterAssignId, id, remark) => {
        let flag = 0
        let temp = [...sendData]

        sendData.map((val, ind) => {
            if (val.subCategoryParameterIdAssignId === examParameterAssignId) {
                if (val.parameterValueId === id) {
                    flag = 1
                }
                else {
                    temp.splice(ind, 1)
                }
                return
            }
        })
        if (flag === 0) {
            let jsonExamination = {
                subCategoryParameterIdAssignId: examParameterAssignId,
                parameterValueId: id,
                parameterStatement: remark
            }
            setSendData([...sendData, jsonExamination])
            SaveIPDData([...sendData, jsonExamination], "patientExaminationResult")
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
                    if (key[0] === "patientExaminationResult") {
                        console.log("sdcs", val.patientExaminationResult)
                        setPatientExaminationResult(val.patientExaminationResult)
                        tempGetData = [...val.patientExaminationResult]
                        setSendData(val.patientExaminationResult)

                    }
                }
            })
        })
        let tempsub = [...val]
        console.log("dataa", val)
        val.map((val, ind) => {
            val.repeaterData.map((va, inn) => {
                va.status.map((vs, ia) => {
                    tempGetData.map((v, i) => {
                        if (v.subCategoryParameterIdAssignId === va.examParameterAssignId && v.parameterValueId === vs.id) {
                            tempsub[ind].repeaterData[inn].status[ia]["checked"] = true
                            
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
    let handleTextChange = () =>{

    }

    let handleClear = (value) => {
        setClearDropdown(value);
        setGetVaccineList('')
    }

   

   //age calculate

   let handlerChangeUnit=(key)=>{
    const ageUnit = document.getElementById('ddlAgeUnit#'+key).value;
    handleAgeUnit(ageUnit,key)
   }

    let getPatientAge = (key) => {  

        console.log('txtDob#',key)
        document.getElementById("ddlAgeUnit#"+key).value = "1";
        const val = document.getElementById('txtDob#'+key).value;
        // setDob(val);

        let today = new Date();
        let birthDate = new Date(val);
        let getAge = today.getFullYear() - birthDate.getFullYear();
        let getMonth = today.getMonth() - birthDate.getMonth();
        if (getMonth < 0 || (getMonth === 0 && today.getDate() - birthDate.getDate())) {
            getAge--;
        }

    // setPatientAge(getAge);

    document.getElementById("txtAge#"+key).value=getAge;
    console.log('getAge',getAge);
    }

    let getPatientDobByAge = (key) => {
    const values=document.getElementById('txtAge#'+key).value;
    console.log('value',values)
        if(values > 0){ 

        // setPatientAge(e.target.value);
            const slctdUnit = document.getElementById("ddlAgeUnit#"+key).value;
        // document.getElementById("txtAge#"+key).value=values;
            handleAgeUnit(slctdUnit,key)          
        }

        // else{
        //     setPatientAge("");
        //     setDob('')
        // }

    }
    let handleAgeUnit = (value,key) => {
        let age = document.getElementById('txtAge#'+key).value
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
        // setDob(DOB)

        document.getElementById("txtDob#"+key).value=DOB;
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
                        document.getElementById("txtDob#"+key).value=DOB;
                    }

                    else {
                        month = (nowMonth + 12) - (age % 12);
                        // DOB =  parseInt(year - 1)+ "-" + month + "-" +nowDay ;
                        var yyyy = parseInt(year - 1);
                        var mm = month.toString().length === 2 ? month : '0' + month;
                        var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;
                        var getDob = yyyy + '-' + mm + '-' + dd;
                        DOB = getDob;
                        setDob(DOB)
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
                    setDob(DOB)
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

                setDob(DOB)
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
            document.getElementById("txtDob#"+key).value=DOB;
        }
    }

    // useEffect(() => {
    //     SaveIPDData(sendData, "patientExaminationResult")
    // }, [sendData])
    useEffect(() => {
        console.log("csdcs", "dscsdcs")
        getdata()
        setData([])
    }, [props])
    return (
        <div className={`${props.val === 0 ? 'offcanvas' : "offcanvas show"}   offcanvas-end`} style={{ width: "400px" }} data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="allergies" aria-labelledby="allergiesLabel">
            <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" onClick={() => { props.fun(0) }} aria-label="Close"><i className='fa fa-close ' ></i></div>
                <h5 className="offcanvas-title text-white" id="allergiesLabel" >{props.name}</h5>
            </div>
            <div className="offcanvas-body pe-3" >
                {subCategory && subCategory.map((val, index) => {

                    return (
                        <>
                            {/* <BoxHeading title={val.subCategoryName} /> */}
                            <div className='boxheading hpad'>{val.subCategoryName}</div>
                            <div className='d-flex  flex-column gap-2 pb-2'>

                                {subCategory && val.repeaterData.map((val, inde) => {
                                    return (<>
                                        <div className='d-flex flex-column subhh'>
                                            <Heading text={val.parameterName} />
                                            <div className='ipd-chkk-int'>

                                                {val.status && val.status.map((v, i) => {
                                                    return (
                                                        <>
                                                         {/* <div className='ipd-chkk rdodiv'>
                                                         <label class="rdocnt">
                                                           <input type='radio' name={val.parameterName} onChange={() => { handleOnChange(val.examParameterAssignId, v.id, v.remark) }} defaultChecked={v.checked} /> {v.remark}  
                                                         <span class="checkmarkrdo"></span>
                                                         </label>
                                                         </div> */}
                                                        
                                                          <div className='ipd-chkk'><input type={val.dataType === "checkbox" ? 'checkbox' : 'radio'} style={{cursor:'pointer'}} name={val.parameterName} onChange={() => { handleOnChange(val.examParameterAssignId, v.id, v.remark) }} defaultChecked={v.checked} /> {v.remark} </div>                                                          
                                                        
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <div  className='dropd-in'>
                                                {val.isTaken === 1 ?
                                             <div className='dropd'>                                                    
                                                    {val.clinicalDataType === 2 ?
                                                    <>
                                                        <label>Select Vaccine</label>
                                                        <DropdownWithSearch defaulNname={t("SELECT")} name="id" list={getVaccineList} valueName="id" displayName="vaccineName" editdata={""} getvalue={handleTextChange} clear={clearDropdown} clearFun={handleClear} />
                                                    </>                                                   
                                                    :
                                                    <>
                                                        <label>Select Disease</label>
                                                        <DropdownWithSearch defaulNname={t("SELECT")} name="id" list={getProblemList} valueName="id" displayName="problemName" editdata={""} getvalue={handleTextChange} clear={clearDropdown} clearFun={handleClear} />
                                                    </>                                                   
                                                    }

                                                       

                                                    <div className="datecnt">
                                                            <label htmlFor="txtDob" className="form-label"><img src='' className='icnn' alt='' />{t("Date")}</label>
                                                            <input type="date" className="form-control form-control-sm"id={"txtDob#"+inde} name='dob'  onChange={()=>{getPatientAge(inde)}} />                                                    
                                                    </div>

                                                    <div className="agecnt-in">
                                                        <div className="agecnt">
                                                            <div className='agecnt-1'>
                                                                <label htmlFor="txtAge" className="form-label"><img src='' className='icnn' alt='' />{t("Age")}</label>
                                                                <input type="number" className="form-control form-control-sm" id={"txtAge#"+inde} placeholder={t("Enter Age")} name='age' onChange={()=>{getPatientDobByAge(inde)}} />                                               

                                                            </div>
                                                        </div>
                                                        <div className="agecnt">
                                                          <div className="form-text1">{t("OR")}</div>
                                                        </div> 

                                                        <div className="agecnt">
                                                            <label htmlFor="ddlAgeUnit" className="form-label"><img src='' className='icnn' alt=''/>{t("Unit")}</label>
                                                            <select className="form-select form-select-sm" id={"ddlAgeUnit#"+inde} aria-label=".form-select-sm example" name='ddlAgeUnit'onChange={()=>{handlerChangeUnit(inde)}}>
                                                                <option value="1" selected>{t("Year")}</option>
                                                                <option value="2">{t("Month")}</option>
                                                                <option value="3">{t("Day")}</option>
                                                            </select>                                             
                                                        </div>
                                                    </div>
                                            </div> : ""}
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
