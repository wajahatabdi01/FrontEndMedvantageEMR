import React, { useEffect, useState } from 'react'
// import BoxHeading from './BoxHeading'
// import BoxHeading from '../../../../Components/BoxHeading'
import alertsRecommendationsTitleIcon from "../../assets/images/icons/alertsRecommendationsTitleIcon.svg"
// import checkAlertRecoIcon from "../../../assets/images/icons/checkAlertRecoIcon.svg"
import cloudGraphIcon from "../../assets/images/icons/cloudGraphIcon.svg"
// import notCheckAlertRecoIcon from "../../../assets/images/icons/notCheckAlertRecoIcon.svg"
import animationLj2khvep from "../../assets/images/icons/animationLj2khvep.png"
// import pulseHeartIcon from "../../../assets/images/icons/pulseHeartIcon.svg"
// import SubtractionIcon from "../../../assets/images/icons/SubtractionIcon.svg"
import PostADRClinicalNotification from '../../Clinical/API/RemotePatientMonitorDashboard/PostADRClinicalNotification'
import Loder from '../../Component/Loader';
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'

export default function ClinicalNotification(props) {
    let [clinicalNotification, setClinicalNotification] = useState([]);
    const [loader, setLoader] = useState(1);

    let getData = async () => {
        let patientVitals = [];
        let patientInvestigation = [];
        let patientPrescription = [];
        let patientSymptom = [];

        if (props.patientdata.VitalParametersList !== null) {
            for (let i = 0; i < props.patientdata.VitalParametersList.length; i++) {
                patientVitals.push(
                    {
                        vmId: props.patientdata.VitalParametersList[i].VitalID,
                        vmValue: props.patientdata.VitalParametersList[i].VitalValue,
                        vitalName: props.patientdata.VitalParametersList[i].VitalName
                    }
                )
            };
        };
        if (props.patientdata.InvestigationParameterList !== null) {
            console.log('props.patientdata.InvestigationParameterList',props.patientdata.InvestigationParameterList)
            for (let i = 0; i < props.patientdata.InvestigationParameterList.length; i++) {
                patientInvestigation.push(
                    {
                        SubTestID: props.patientdata.InvestigationParameterList[i].SubTestID,
                        SubTestValue: props.patientdata.InvestigationParameterList[i].SubTestValue,
                        SubTestName: props.patientdata.InvestigationParameterList[i].SubTestName
                    }
                )
            };
        };
        if (props.patientdata.DiagonsisList !== null) {
            for (let i = 0; i < props.patientdata.DiagonsisList.length; i++) {
                patientSymptom.push(
                    {
                        problemID: props.patientdata.DiagonsisList[i].ProblemId
                    }
                )
            };
        };

        if (props.patientdata.PrescreptionParameterListMedvantage !== null) {
            for (let i = 0; i < props.patientdata.PrescreptionParameterListMedvantage.length; i++) {
                patientPrescription.push(
                    {
                        drugID: props.patientdata.PrescreptionParameterListMedvantage[i].BrandId,
                        drugName: props.patientdata.PrescreptionParameterListMedvantage[i].DrugName
                    }
                )
            };
        }
        else {
            if (props.patientdata.PrescreptionParameterList !== null) {
                for (let i = 0; i < props.patientdata.PrescreptionParameterList.length; i++) {
                    patientPrescription.push(
                        {
                            drugID: props.patientdata.PrescreptionParameterList[i].DrugId,
                            drugName: props.patientdata.PrescreptionParameterListMedvantage[i].DrugName
                        }
                    )
                }
            }
        }
        let obj = {
            age: props.patientdata.PntAge,
            gender: props.patientdata.PntGender === 'Male' ? 'M' : props.patientdata.PntGender === 'Female' ? 'F' : 'Other',
            jsonVitalDetails: patientVitals,
            jsonInvestigationDetails: patientInvestigation,
            jsonPrescriptionDetails: patientPrescription,
            jsonSymptomDetails: patientSymptom
        };

        let clinicalNotificationResp = await PostADRClinicalNotification(obj);
        console.log('clinicalNotificationResp: ', clinicalNotificationResp);
        if (clinicalNotificationResp.status === 1) {
            setClinicalNotification(clinicalNotificationResp.responseValue)
        }
        // if(clinicalNotificationResp.responseValue.length>0){
        //     setLoader(0);
        // }
        
        console.log('patientData', props.patientdata);
        // console.log('clinicalNotificationResp.responseValue.length',clinicalNotificationResp.responseValue.length);
        
    };


    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {/* new clinical Modal Pop */}
            <div className={`modal d-${props.clinicalnotificationpopup === 0 ? 'none' : 'block'}`}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content p-0">
                        {/* <div className="modal-header">
                        <div className='d-flex justify-content-between align-items-center px-3 w-100'>
                            <h1 className="modal-title fs-5 text-white d-flex column-gap-1 py-1" id="exampleModalLabel">
                                <img src={alertsRecommendationsTitleIcon} alt="ADR Report" title='ADR Report' style={{ width: '25px', height: '25px' }} />
                                <label htmlFor="">Alerts & Recommendations</label>
                            </h1>
                            <label>{props.patientdata.PntName} {props.patientdata.UhId}</label>
                       </div>                            

                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className="bi bi-x-octagon"></i></button>
                        </div> */}

                        <span className="closee" onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>
                        <div className='p-profile'>
                         <div className='p-profile-h'>Alerts & Recommendations</div>
                            <div className='p-profile-h'>
                            <div className='pname'><span>{props.patientdata.PntName} </span></div>
                            <div className='pname'>- {props.patientdata.UhId}</div>
                         </div>
                       </div>

                        <div className="modal-body p-1">
                            <div className="row">
                                <div className="col-12">
                                    <div className="alertsRecommendationsSection" style={{ height: 'calc(100vh - 400px)', overflow: 'auto' }}>
                                    {clinicalNotification.length > 0 ?
                                        <table className='tableAdrReport'>
                                            <thead>
                                                <tr>
                                                    <th className='text-center' style={{width:'3%'}}>#</th>
                                                    <th>Derange Result</th>
                                                    <th>Trouble Shooting</th>
                                                    <th>Dietary Recommendations</th>
                                                    {/* <th>Recommended by Control Room</th>
                                                    <th>Action Taken in the Ward</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clinicalNotification && clinicalNotification.map((list, index) => {
                                                    return (
                                                        <tr>
                                                            <td className='text-center'>{index+1}</td>
                                                            <td>
                                                            {JSON.parse(list.vitalData).map((val,ind) =>{
                                                                return(
                                                                    <div className='dias mb-1'>
                                                                        <div className='d-flex column-gap-1'>
                                                                            {/* <img src={pulseHeartIcon} alt="pulseHeartIcon" /> */}

                                                                            <div className='wt-500'>{val.vitalName}</div>
                                                                            <div className='substituteTextGray'>{val.inputRange}</div>
                                                                        </div>
                                                                        <div className='d-flex column-gap-1'><img src={cloudGraphIcon} alt="cloudGraphIcon" /> <div className='substituteTextGreen wt-500' style={{ color: list.bgColor }}>{val.currentVital}</div></div>
                                                                    </div>
                                                                    
                                                                    )
                                                                })}
                                                            
                                                           
                                                            </td>
                                                            <td>
                                                            {list.troubleShoot === 'Please Check BP Cuff' ? <img src={animationLj2khvep} className='imageBlink' alt="" style={{width:'12px', marginRight:'1px'}}/>:''}  {list.troubleShoot}
                                                            </td>
                                                            <td>
                                                                {/* <label className='wt-500'>Alkaline</label>  <i className="bi bi-circle-fill bulletGreen"></i>
                                                                <div className='substituteTextGray'>To give alkaline diet</div> */}
                                                                <td><div dangerouslySetInnerHTML={{__html: list.reference }} /></td>
                                                            </td>
                                                            {/* <td></td>
                                                            <td>
                                                                <div className='d-flex justify-content-center'><img src={checkAlertRecoIcon} alt="checkAlertRecoIcon" /></div>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        
                                     : <img className='imageNoDataFound' src={NoDataFound} alt='' />}


                                        

                                    </div>
                                </div>
                            </div>
                            {/* <Loder val={loader} /> */}

                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}


