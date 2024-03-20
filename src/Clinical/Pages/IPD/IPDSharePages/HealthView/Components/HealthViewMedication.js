import React, { useEffect, useState } from 'react'
import injection from '../../../../../../assets/images/icons/injection.svg'
import capsule from '../../../../../../assets/images/icons/capsule.svg'
import fluid from '../../../../../../assets/images/icons/fluid.svg'
import upcoming from '../../../../../../assets/images/icons/upcoming.svg'
import stopped from '../../../../../../assets/images/icons/stopped.svg'
import check from '../../../../../../assets/images/icons/check.svg'
import exclamation from '../../../../../../assets/images/icons/exclamation.svg'
import late from '../../../../../../assets/images/icons/late.svg'

import TosterUnderProcess from '../../../../../../Component/TosterUnderProcess'
import Toster from '../../../../../../Component/Toster'
import PostIntakeMedication from '../../../../../API/IPD/HealthView/PostIntakeMedication'
import GetPatientMedication from '../../../../../API/IPD/HealthView/GetPatientMedication';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function HealthViewMedication() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

    // Patient Medication
let [ptMedDate, setPtMedDate] = useState([]);
let [ptMedDrugName, setPtMedDrugName] = useState([]);
let [ptMedTime, setPtMedTime] = useState([]);
let [ptdosageForm, setPtdosageForm] = useState([]);
let [date, setDate] = useState('');
let [time, setTime] = useState('');
let [rowID, setRowID] = useState('');
let [pmID, setPmID] = useState('');
const [showUnderProcess, setShowUnderProcess] = useState(0);
const [showToster, setShowToster] = useState(0);
const [tosterMessage, setTosterMessage] = useState("");
const [tosterValue, setTosterValue] = useState(0);
// let [corncallUrl, setCorncallUrl] = useState("")
let uhID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;

const handleDateTimeClick = (popUpDate, popUpTime, rowID) => {
    setRowID(rowID);
    setTime(convert12to24(popUpTime));
    setDate(popUpDate);
    
  };

  const handleChange = (e) => {
    if (e.target.name === 'date') {  
      setDate(e.target.value);
    }
  
    if (e.target.name === 'time') {
      setTime(e.target.value);
    }
  };

  const handleSave = async () => {
    const obj = {
      intakeDateAndTime: date + ' ' + time,
      pmID: pmID,
      prescriptionID: rowID,
      userID: window.userId
    }
   
  
    let data = await PostIntakeMedication(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage(t("Data Saved Successfully"));
      getPatientMedicationData();
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage(data.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
  };

  const getPatientMedicationData = async () => {
    let PtMedResponse = await GetPatientMedication(uhID);
   
    if (PtMedResponse.status === 1) {
      setPtMedDate(PtMedResponse.responseValue.date);
      setPtMedDrugName(PtMedResponse.responseValue.drugName);
      setPtMedTime(PtMedResponse.responseValue.medicationNameAndDate);
    if(PtMedResponse.responseValue.medicationNameAndDate.length > 0 ){ setPmID(PtMedResponse.responseValue.medicationNameAndDate[0].pmId)};
      setPtdosageForm(PtMedResponse.responseValue.dosageForm);
    }
};

  const handleClear = () => {
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
  };
  
  let convert12to24 = (time12) => {
    const [time, modifier] = time12.split(' ');
  
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);
  
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
    const time24 = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return time24;
  };


  useEffect(() => {
    getPatientMedicationData();
   
}, []);

  return (
   <>
<div className='gridb'>
                      <div className='listdetailsct pac'>
                        <div className='listdetailsct-in'>
                          <div className='listd-in showing'>{t("MEDICATION")}</div>
                        </div>
                      </div>

                      <div className="med-table-section histry_view subb">
  
        <table className="med-table border striped_ mb-2">
          <thead>
        
          
          
          <tr>
              {/* <th style={{width:'30px'}}>{ddlist.dosageForm === 'tab'? 'Drugname' : ddlist.dosageForm === 'injection'?  'Injection' : ddlist.dosageForm === 'fluid'?  'Fluid' : 'Syrup'}</th> */}
              <th></th>
              {ptMedDate.length > 0 ? 
                (ptMedDate.map((list, index2) => {
                 
                    return <><th className="text-center" style={{width:'30px'}}>{list.date} &nbsp;</th></>
                 
                 
                  
                  
                }) ) : <th colSpan={ptMedDate.length + 1} className="text-center" style={{ fontWeight: 'bold' }}>
                        {t("No Record Found")}
                      </th>}
            </tr>
          </thead>
          {ptdosageForm &&
    ptdosageForm.map((ddlist, index) => {     
      return  (
          <tbody>
          <tr>
          <div className="p-2" style={{color:'#546788', letterSpacing:'1px', fontSize:'14px'}}>
         <b> 
          {/* {ddlist.dosageForm === 'tab' ? 'Tablet' : ddlist.dosageForm === 'injection'?  'Injection' : ddlist.dosageForm === 'fluid'?  'Fluid' : 'Syrup'} */}
          {ddlist.dosageForm}
          </b>
          </div>
          
          </tr>
            {ptMedDrugName &&
              ptMedDrugName.map((dList, index3) => {
                if (dList.dosageForm === ddlist.dosageForm){
                  return (
                  <tr>
                    
                    <td>
                      <div
                        className="d-flex flex-nowrap gap-1 align-items-center">
                        <img src={dList.dosageForm === 'tab' ? capsule : dList.dosageForm === 'injection' ? injection : dList.dosageForm === 'fluid' ? fluid : ''} className="icnn" alt=''/>
                        <span style={{width: '120px'}}> {dList.dosageForm === ddlist.dosageForm ? dList.drugName : ''}</span>
                      </div>
                    </td>
                    {ptMedDate &&
                      ptMedDate.map((li, index4) => {
                        return (
                          <td style={{width:'30px'}}>
                            {ptMedTime &&
                              ptMedTime.map((dfList, index5) => {
                                if (
                                  dfList.drugName === dList.drugName &&
                                  dfList.date === li.date  && dfList.dosageForm === ddlist.dosageForm )
                                  {
                                        return (
                                    <>
                                      {
                                        dfList.jsonTime !== null ? JSON.parse(dfList.jsonTime).map(
                                        (val) => (
                                          <div
                                            key={val.time}
                                            data-bs-toggle="modal"
                                            data-bs-target="#medicineIntake"
                                            className="pointer d-flex flex-nowrap gap-1 align-items-center"
                                            style={{ minWidth: '75px' }}
                                            onClick={() =>
                                              handleDateTimeClick(
                                                li.date,
                                                val.time,
                                                dfList.prescriptionRowID
                                              )
                                            }
                                          >
                                            <img
                                            alt = ''
                                              src={
                                                val.icon === 'check'
                                                  ? check
                                                  : val.icon === 'late'
                                                  ? late
                                                  : val.icon === 'exclamation'
                                                  ? exclamation
                                                  : val.icon === 'isStop'
                                                  ? stopped
                                                  : upcoming
                                              }
                                              className="icnn"
                                            />
                                            
                                          {val.time}
                                         
                                          </div>
                                        )
                                      ): ''}
                                      {'\n'}
                                    </>
                                  );
                                    
                                 
                                }
                                
                              })}
                          </td>
                        );
                      })}
                  </tr>
                );
                }
                
              })}
          </tbody>
          )
    })}
    
        </table>
      
                      </div>
                    </div>

                       {/* new date & time Modal Pop */}
       <div className='modal fade' id="medicineIntake" data-bs-backdrop="static">
                    <div className="modal-dialog modal-md" style={{ margin: '30px auto' }}>
                        <div className="modal-content p-0">
                            <div className="modal-header">                               
                                    <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">
                                        <label htmlFor="">{t("MEDICINE_INTAKE")}</label>
                                    </h1>                                    
                                
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' ><i className="bi bi-x-octagon"></i></button>
                            </div>
                            <div className="modal-body p-0">
                                <div className="row">
                                    <div className="col-12">

                                    <div className="med-box">
                                      <div className="inner-content">
                                        <div className="d-flex flex-wrap align-content-end flex-wrap">
                                        <div className="mb-2 me-2">
                                        <label for="date" className="form-label"> {t("DATE")}  </label>
                                        <input type="date" name='date' id='date' value={date} onChange={handleChange} className="form-control form-control-sm"/>                                        
                                        </div>

                                        <div className="ms-1 mb-2 me-4">
                                        <label for="time" className="form-label"> {t("TIME")}  </label>                                        
                                        <input type="time" name='time' id='time' value={time} onChange={handleChange} className="form-control form-control-sm"/>                                   
                                        </div>
                                        <div className="mb-2 me-2">
                                        <label for="time" className="form-label"> &nbsp;</label>                                        
                                        {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                    :
                                                    <div>
                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSave}> {t("Save")} </button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}> {t("Clear")}</button>
                                                    </div>
                                            }                                   
                                        </div>
                                        </div>
                                      </div>
                                    </div>                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
   </>
  )
}
