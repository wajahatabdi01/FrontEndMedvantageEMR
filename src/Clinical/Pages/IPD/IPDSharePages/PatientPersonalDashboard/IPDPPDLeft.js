import React, { useEffect, useState } from 'react'
// import Heading from '../../../../../Components/Heading'
// import BoxHeading from '../../../../PatientMonitorDashboard/Components/BoxHeading'
import { useSelector } from 'react-redux'
import GetPatientPersonalDashboard from '../../../../API/IPD/PersonalDashboard/GetPatientPersonalDashboard'
import GetPatientDetailsForPersonalDashboard from '../../../../API/IPD/PersonalDashboard/GetPatientDetailsForPersonalDashboard'
import GetPatientIPDHistory from '../../../../API/IPD/PersonalDashboard/GetPatientIPDHistory'
import GetPatientIntakeFoodList from '../../../../API/IPD/PersonalDashboard/GetPatientIntakeFoodList'
import userImg from '../../../../../../src/assets/images/Navbar/user.svg'
import med from '../../../../../../src/assets/images/icons/med.svg'
import frequency from '../../../../../../src/assets/images/icons/frequency.svg'
import Layer from '../../../../../../src/assets/images/icons/Layer 2.svg'
import prescription from '../../../../../../src/assets/images/icons/prescription (1).svg'
import underlineButton from '../../../../../../src/assets/images/icons/underline-button.svg'
import WheatBag from '../../../../../../src/assets/images/icons/WheatBag.svg'
import Loader from '../../../../../Component/Loader';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function IPDPPDLeft() {

    document.body.dir = i18n.dir();
    const { t } = useTranslation();

    let [patientData, setPatientData] = useState();
    let [medicationList, setMedicationList] = useState([]);
    let [patientComplainHistory, setPatientComplainHistory] = useState([]);
    let [patientDietList, setPatientDietList] = useState([]);
    let IPDUHIDChange = useSelector((state) => state.IPDUHIDChange)
    let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let [showLoder, setShowLoder] = useState(0);
    const getPreviousDate=()=>{
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return date;

    }
    let getdata = async () => {
        // let response = await GetPatientPersonalDashboard(uhid)
        let response = await GetPatientDetailsForPersonalDashboard(uhid);
        if (response.status === 1) {
            setPatientData(response.responseValue[0])
        }   
    }
    let getPatientIPDHistory= async()=>{
        setShowLoder(1);
         let response = await GetPatientIPDHistory(uhid);
        if(response.status === 1){
            setMedicationList(response.responseValue.runningPrescription);
            setPatientComplainHistory(response.responseValue.patientComplainHistory);
            setShowLoder(0);
        }
    }
    let getPatientFoodIntake=async()=>{
        const currentDate=getPreviousDate();
        let response = await GetPatientIntakeFoodList(uhid,currentDate);
        if(response.status === 1){
            setPatientDietList(response.foodIntakeList);
        }
    }
    useEffect(() => {
        getdata();
        getPatientIPDHistory();
        getPatientFoodIntake();
    }, [IPDUHIDChange])

    return (
        <>
       
            {/* top */}
            <div className='pdashboard'>
                <div className='pdashboard-in'>
                    {patientData &&
                   <div className="med-box1">  
                    <div className='row'> 
                        <div className='col-md-5 d-flex flex-column p-2  justify-content-center border-right-verticle text-center'>
                           <div className='text-center'><img src={userImg} className='patientDP'/></div> 
                            <div className='d-flex flex-column'>
                                <span className='pdPName'>{patientData.patientName}</span>
                                <span className='pdPEmail'>{patientData.emailID}</span>
                            </div>
                            <div className='d-flex flex-row gap-2 text-center justify-content-between px-3 mt-2'>
                                <div className='d-flex flex-column '>
                                    <span className='hWVal'>{patientData.height !== 0?patientData.height:"-"}</span>
                                    <span className='font-13'>{t("Height")}</span>
                                </div>
                                <div className='border-right-verticle'></div>
                                <div className='d-flex flex-column'>
                                    <span className='hWVal'>{patientData.weight !== 0?patientData.weight:"-"}</span>
                                    <span className='font-13'>{t("Weight")}</span>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-7'>
                            <div className='pdDeatailsContainer px-2'>

                                <div>
                                <label className="form-label_">{t("Uhid")}</label>
                                <span className="pdPtDetailsVal">{patientData.uhID}</span>
                                </div>

                                <div>
                                <label className="form-label_">{t("Age-Gendar")}</label>
                                <span className="pdPtDetailsVal">{patientData.age}{patientData.agetype}/{patientData.gender}</span>
                                </div>

                                <div>
                                <label className="form-label_">{t("Guardian")}</label>
                                <span className="pdPtDetailsVal"></span>
                                </div>

                                <div>
                                <label className="form-label_">{t("Contact Number")}</label>
                                <span className="pdPtDetailsVal">{patientData.mobileNo}</span>
                                </div>

                                <div>
                                <label className="form-label_">{t("Address")}</label>
                                <span className="pdPtDetailsVal">{patientData.address}</span>
                            </div>

                            </div> 
                            
                        </div>
                    </div>
                    </div>
                        }

                </div>
                <div className='pdashboard-in'>
                    <div className="med-box1" style={{minHeight:'163px'}}>
                    {/* <div className="title">Hypertension</div>
                     <div className='sub-title'>Diagnosis</div>                    
                    <div className='border-b mt-1'></div> */}
                    <div className="title font-15">{t("Diagnosis")}</div>
                    <div style={{'max-height':'254px', 'overflow':'auto'}}>
                    {/* {patientComplainHistory && patientComplainHistory.map((val)=>{return(
                        <span>{val.problemName}</span>
                    )})} */}
                    
                    <div className='d-flex flex-wrap column-gap-2 row-gap-1 complaint px-1'>
                        {/* <span className='medBage'>Headaches</span>
                        <span className='medBage'>Shortness of breath</span>
                        <span className='medBage'>Nosebleeds</span>
                        <span className='medBage'>Lightheadedness</span> */}
                        {patientComplainHistory && patientComplainHistory.map((val)=>{return(
                        
                             <>{val.pdmId === 4 ? 
                                <span className='medBage'>{val.problemName}</span>
                              : ''}</>
                           
                           
                    )})}
                    </div>

                    <div className='d-flex flex-wrap column-gap-2 row-gap-1 symptops mt-2 px-1'>
                        {/* <span className='medBage'><i className="bi bi-circle-fill"></i> Blurry or double vision</span>
                        <span className='medBage'><i className="bi bi-circle-fill"></i> Nausea</span>*/}
                        {patientComplainHistory && patientComplainHistory.map((val)=>{return(
                        
                        <>{val.pdmId === 2 ? 
                            <span className='medBage'><i className="bi bi-circle-fill"></i> {val.problemName}</span>         
                          
                         : ''}</>
                      
                      
                        )})}
                                     
                    </div>
               </div>

                </div>

                </div>
            </div>

            {/* middle */}
            <div className='row mt-2'>
                <div className="col-12 mb-2">
                    <div className="med-box1">
                        <div className="title">{t("Rx")}</div>
                        <div className="med-table-section" style={{'min-height':'240px','max-height':'240px','overflow':'auto', 'box-shadow':'none'}}>
                            <table className='med-table border_ striped'>
                                <thead>
                                    <th>#</th>
                                    <th style={{width:""}}><img src={med} alt="med" /> {t("Drug Name")}</th>
                                    <th><img src={frequency} alt="frequency" /> {t("Frequency")}</th>
                                    <th><img src={Layer} alt="Layer" /> {t("Duration")}</th>
                                    <th><img src={prescription} alt="prescription" /> {t("RATIONALE")}</th>
                                    <th><img src={underlineButton} alt="underlineButton" /> {t("Remark")}</th>
                                </thead>
                                <tbody>
                                {console.log('medicationList',medicationList)}
                                {medicationList && medicationList.map((val,index)=>{return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{val.drugName.length !==0?val.drugName:"abs"}</td>
                                        <td>{val.doseFrequency  === "" ? '--' : val.doseFrequency}</td>
                                        <td>{val.duration  === "" ? '--' : val.duration}</td>
                                        <td></td>
                                        <td>{val.remark === "" ? '--' : val.remark}</td>
                                    </tr>

                                )})}                      
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>              
            </div> 

            {/* bottom */}
            <div className='pdashboard mb-2'>

                <div className="pdashboard-in">
                   <div className="med-box1">
                   <div className="title">{t("Nutrition Diet")}</div>
                        <div className="med-table-section" style={{'max-height':'260px','overflow':'auto','box-shadow':'none'}}>               
                        <div className="d-flex flex-wrap px-2 mt-3">
                        {patientDietList && patientDietList.map((val)=>{return(
                        <div style={{flex: '50%', borderBottom:'1px solid #9f9f9f59' }}>
                            <div style={{fontSize:'14px', color:'#546788', fontWeight:'500'}}> <img src={WheatBag} alt="WheatBag" /> {val.foodName}</div>
                            {/* <div>...</div> */}
                        </div>
                        )})}
                        </div>
                        
                        </div>
                   </div> 
                </div>

                <div className="pdashboard-in">
                    <div className="med-box1">
                    <div className="title">{t("Food Supplement Suggestion")}</div>
                    <div className="med-table-section" style={{height:'270px'}}>
                    <table className='med-table border_ striped'>
                        <thead>
                            <tr>
                                <th>{t("Supplement")}</th>
                                <th>{t("Found In")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{t("Potassium")}</td>
                                <td>{t("Bananas")}, {t("avocados")}, {t("spinach")} & {t("sweet")}{t("potatoes")}</td>
                            </tr>
                            <tr>
                                <td>{t("Magnesium")}</td>
                                <td>{t("Leafy green vegetables")}, {t("nuts")}, {t("seeds")}</td>
                            </tr>
                            <tr>
                                <td>{t("Omega-3")}</td>
                                <td>{t("Flaxseeds")}, {t("chia seeds")}, {t("and walnuts")}</td>
                            </tr>
                            <tr>
                                <td>{t("Coenzyme Q10")}</td>
                                <td>{t("B6")}, {t("B12")}, {t("niacin and organ")} {t("meats and peanut")}.</td>
                            </tr>
                            <tr>
                            <td>{t("Potassium")}</td>
                                <td>{t("Bananas")}, {t("avocados")}, {t("spinach")} & {t("sweet")}{t("potatoes")}</td>
                            </tr>
                            <tr>
                            <td>{t("Potassium")}</td>
                                <td>{t("Bananas")}, {t("avocados")}, {t("spinach")} & {t("sweet")}{t("potatoes")}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    </div>
                </div>                
                {
                    showLoder === 1 ? <Loader val={showLoder} /> : ""
                }
            </div>
       
        </>
    )
}
