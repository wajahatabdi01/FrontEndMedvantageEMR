import React, { useEffect, useState } from 'react'
// import GetBloodList from '../../../../API/IPD/DischargeCard/GetBloodList';
import GetDischargeType from '../../../../API/IPD/DischargeCard/GetDischargeType';
import GetDischargePatientList from '../../../../API/IPD/GetDischargePatientList';
import GetPatientList from '../../../../API/IPD/GetPatientList';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function IPDBottomButtons(props) {
  const {t} = useTranslation();
  document.body.dir = i18n.dir()

  let [bloodList, setBloodList] = useState();
  let [dischargeTypeList, setDischargeTypeList] = useState();
  let [bloodId, setBloodId] = useState([])
  let [followUpDate, setFollowUpDate] = useState('')


  // let getBloodList =async()=>{
  //   let bloodList= await GetBloodList();
  //   if (bloodList.status === 1){
  //     setBloodList(bloodList.responseValue);
  //   }
  // }

  let getDischargeTypeList=async()=>{
    let dischargeTypeList = await GetDischargeType();
    if(dischargeTypeList.status === 1){
      setDischargeTypeList(dischargeTypeList.responseValue)
    }
  }

  let getDischargePatient = async () => {
    let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let response = await GetDischargePatientList()
    if (response.status === 1) {
      response.responseValue.map((val, ind)=>{    
         if(val.uhId === uhid)
        {
          //setBloodId(val.bloodGroupId)
          setFollowUpDate(val.followUpDate)
          props.followUpDate(val.followUpDate)
        }
    })
    
    }
}

let getAdmitedPatient = async () => {
  let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
  let response = await GetPatientList()
  if (response.status === 1) {
    response.responseValue.map((val, ind)=>{    
       if(val.uhId === uhid)
      {
        setBloodId(val.bloodGroupId)
        
      }
  })
   
  }
}

  let handleChange = (e) => {
    if(e.target.name === "followUpDate"){
      // props.sendAllBtnData(e.target.value)
      props.followUpDate(e.target.value)
      setFollowUpDate(e.target.value)
    }

    if(e.target.name === "dischargeType"){
      // props.sendAllBtnData(e.target.value)
      
      props.dischargeType(document.getElementById('ddlDischargeType').value)

    }
  }

  useEffect(() => {
    // getBloodList();
    getDischargeTypeList();
    getDischargePatient();
    getAdmitedPatient();
  }, [])
  return (
    <>
      <div className={`mt-1 boxs disrt `} style={{'background':'#fff'}}>
        <div className='d-flex flex-wrap align-items-center gap-2'>
            <div className=" heading mb-2 ipdbb">
              <label htmlFor="followUpDate" className="form-label position-relative"> Follow-Up Date<span className="starMandatory">*</span></label>
              <input type="date" value={followUpDate} className="form-control form-control-sm" id="followUpDate" name="followUpDate" onChange={handleChange} />
            </div>
            {/* <div className=" heading mb-2 ipdbb">
              <label htmlFor="roleIDFrom" className="form-label"> {" "} Blood Group{" "} <span className="starMandatory">*</span>
              </label>
              <select name="id" id="id" className="form-select form-select-sm" aria-label=".form-select-sm example">
                <option value="0">{t("SELECT")}</option> 
                {bloodList &&
                    bloodList.map((val, index) => {
                      if(val.id ===bloodId )
                      {
                        return (
                        <option value={val.id}  selected>{val.groupName}</option>
                      );
                      }else{
                        return (
                        <option value={val.id} >{val.groupName}</option>
                      );
                      }
                    
                    })}
              </select>
            </div> */}
            <div className="heading mb-2 ipdbb">
              <label htmlFor="roleIDFrom" className="form-label position-relative"> {" "} {t("Discharge_Type")}{" "} <span className="starMandatory">*</span>
              </label>
              <select name="dischargeType" id="ddlDischargeType" className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleChange}>
                <option value="0">{t("SELECT")}</option> 
                    {dischargeTypeList &&
                    dischargeTypeList.map((val, index) => {
                      if(val.id === 2)
                      {
                        return (
                        <option value={val.id}  selected>{val.dischargeType}</option>
                      );
                      }else{
                        return (
                        <option value={val.id} >{val.dischargeType}</option>
                      );
                      }
                    })}
              </select>
            </div>
        </div>
      </div>
    </>
  )
}
