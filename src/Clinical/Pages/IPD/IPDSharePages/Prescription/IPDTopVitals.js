import React, { useEffect, useState } from 'react'
import Height from "../../../../../assets/images/OPD/height.svg"
import Weight from "../../../../../assets/images/OPD/weight.svg"
import BloodPressure from "../../../../../assets/images/OPD/bloodpressure.svg"
import PulseRate from "../../../../../assets/images/OPD/pulse.svg"
import RespiratoryRate from "../../../../../assets/images/OPD/ChestPain.svg"
import SaveIPDData from '../../../../../Code/SaveIPDData'
import { useSelector } from 'react-redux'
import store from '../../../../../Store'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import OPDTOPBottom from '../../../OPD/OPDSharePage/OPDPrescription/OPDTOPBottom'
import Heading from '../../../../../Component/Heading'
import addIcon from '../../../../../assets/images/icons/icons8-plus-30.png';
import NoDataFound from '../../../../../assets/images/icons/No data-rafiki.svg'
import FHIRGetEncounterByUHIDandIssueID from '../../../../API/FHIRApi/GET/FHIRGetEncounterByUHIDandIssueID'
import OPDProblemPopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDProblemPopUp'
import SuccessToster from '../../../../../Component/SuccessToster'
import OPDAllergyPopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDAllergyPopUp'
import OPDMedicationPopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDMedicationPopUp'
import OPDDevicePopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDDevicePopUp'
import OPDSurgeryPopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDSurgeryPopUp'
import OPDInvestigationProcedure from '../../../OPD/OPDSharePage/OPDPrescription/OPDInvestigationProcedure'


export default function IPDTopVitals(props) {
    const { t } = useTranslation();
    document.body.dir = i18n.dir()
    let [showToster, setShowToster] = useState(0)
    const [getHeadingName, setHeadingName] = useState('');
    let [activeComponent, setActiveComponent] = useState('');
    let [showTheButton, setShowTheButton] = useState(false);
    let [getIssueID, setIssueID] = useState('');
    let [getD, setGetD] = useState(0)
    let [showImage,setShowImage]=useState(0); 
    let [sendVitals, setSendVitals] = useState(
        [
            {
                "vmId": 56,
                "vmValue": "",
                "name": "spo2",
                "img": Height,
                "unit": "%",
                "shortname": t("SPO2"),
                "maxLimit": 100,

            },
            {
                "vmId": 4,
                "vmValue": "",
                "name": "BP_Sys",
                "img": BloodPressure,
                "unit": "mmHg",
                "shortname": t("BPS"),
                "maxLimit": 500

            },
            {
                "vmId": 6,
                "vmValue": "",
                "name": "BP_Dias",
                "img": BloodPressure,
                "unit": "mmHg",
                "shortname": t("BPD"),
                "maxLimit": 1000

            },
            {
                "vmId": 3,
                "vmValue": "",
                "name": "Pulse",
                "img": PulseRate,
                "unit": "bpm",
                "shortname": t("PR"),
                "maxLimit": 170

            },
            {
                "vmId": 7,
                "vmValue": "",
                "name": "respRate",
                "img": RespiratoryRate,
                "unit": "bpm",
                "shortname": t("RR"),
                "maxLimit": 2300

            },
            {
                "vmId": 5,
                "vmValue": "",
                "name": "Temperature",
                "img": Height,
                "unit": "°F",
                "shortname": t("Temp"),
                "maxLimit": 109

            },
            {
                "vmId": 2,
                "vmValue": "",
                "name": "Weight",
                "img": Weight,
                "unit": "kg",
                "shortname": t("Wt"),
                "maxLimit": 500

            },
            {
                "vmId": 1,
                "vmValue": "",
                "name": "Height",
                "img": Height,
                "unit": "CM",
                "shortname": t("Ht"),
                "maxLimit": 272
            }]
    );
    const [getEncounterList, setEncounterList] = useState([]);
    let activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid:[]
    let handleOnchange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let temp = [...sendVitals]

        if (value !== "" && parseFloat(value) < 0) {
            // Prevent negative values
            // You can show an error message, set the input to 0, or handle it as you prefer
            // For example, setting it to 0:
            value = "0";
        }

        if (value !== "") {
            sendVitals.map(((val, ind) => {
                if (val.vmId === parseInt(name)) {

                    if ((val.maxLimit && parseInt(value) > val.maxLimit)) {
                        document.getElementById('vitalId' + parseInt(name)).style.border = "2px solid red";
                        document.getElementById('vitalLabel' + parseInt(name)).style.color = "red";
                        //temp[ind].vmValue = parseFloat(value);
                    } else {
                        temp[ind].vmValue = parseFloat(value);
                        document.getElementById('vitalId' + parseInt(name)).style.border = "1px solid #e5e5e5";
                        document.getElementById('vitalLabel' + parseInt(name)).style.color = "#1d4999";
                    }
                }
            }))
        }
        else {
            sendVitals.map(((val, ind) => {
                if (val.vmId === parseInt(name)) {
                    temp[ind].vmValue = ""
                }
            }))
        }


        setSendVitals(temp)
        SaveIPDData(temp, "jsonVital")
    }

    let patientsendDataChange = useSelector((state) => state.IPDPatientSendData)


    let setData = () => {
        let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        let tempVital = [...sendVitals]
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonVital") {
                        if (val.jsonVital.length != 0) {
                            val.jsonVital.map((val, ind) => {
                                sendVitals.map((v, i) => {
                                    if (val.vmId === v.vmId) {
                                        tempVital[i]["vmValue"] = val.vmValue
                                    }
                                })
                            })
                            setSendVitals(tempVital)
                        }
                        else {
                            setSendVitals([
                                {
                                    "vmId": 56,
                                    "vmValue": "",
                                    "name": "spo2",
                                    "img": Height,
                                    "unit": "%",
                                    "shortname": t("SPO2")

                                },
                                {
                                    "vmId": 4,
                                    "vmValue": "",
                                    "name": "BP_Sys",
                                    "img": BloodPressure,
                                    "unit": "mmHg",
                                    "shortname": t("BPS")

                                },
                                {
                                    "vmId": 6,
                                    "vmValue": "",
                                    "name": "BP_Dias",
                                    "img": BloodPressure,
                                    "unit": "mmHg",
                                    "shortname": t("BPD")

                                },
                                {
                                    "vmId": 3,
                                    "vmValue": "",
                                    "name": "Pulse",
                                    "img": PulseRate,
                                    "unit": "bpm",
                                    "shortname": t("PR")

                                },
                                {
                                    "vmId": 7,
                                    "vmValue": "",
                                    "name": "respRate",
                                    "img": RespiratoryRate,
                                    "unit": "bpm",
                                    "shortname": t("RR")

                                },
                                {
                                    "vmId": 5,
                                    "vmValue": "",
                                    "name": "Temperature",
                                    "img": Height,
                                    "unit": "(°F)",
                                    "shortname": t("Temp")

                                },
                                {
                                    "vmId": 2,
                                    "vmValue": "",
                                    "name": "Weight",
                                    "img": Weight,
                                    "unit": "kg",
                                    "shortname": t("Wt")

                                },
                                {
                                    "vmId": 1,
                                    "vmValue": "",
                                    "name": "Height",
                                    "img": Height,
                                    "unit": "CM",
                                    "shortname": t("Ht")
                                }])
                        }
                    }
                }
            })
        })
        // SaveIPDData(tempVital, "jsonVital")

    }

    // useEffect(() => {
    //     if (props.loader === 1) {
    //         SaveIPDData(sendVitals, "jsonVital")
    //     }
    // }, [sendVitals])

    const getAllEncoutersAsPerIssueID = async () =>{
        const getRes = await FHIRGetEncounterByUHIDandIssueID(activeUHID, getIssueID);
        
            if(getRes.status === 1){
                setEncounterList(getRes.responseValue);
                setShowImage(0)
            }
            else{
                setShowImage(1)
            }
        
    }

    useEffect(() => {
        setData()
    }, [patientsendDataChange])
    useEffect(() => {
        if (showTheButton === true) {
            
            getAllEncoutersAsPerIssueID();
        }
    }, [showTheButton, getIssueID]);

    return (
        <div className='roww'>
                {/* <div className={`col-12 d-flex flex-wrap  gap-1 ps-3 pt-2 pb-2 boxcontainer pe-3 boxs`}>

                    {sendVitals && sendVitals.map((val, ind) => {
                        if (val.vmId === 4) {
                            return (
                                <div className=' d-flex flex-row didd' style={{ width: "250px", border: "1px solid #E5E5E5", borderRadius: "5px", 'margin-bottom': '10px' }} >
                                    <div className="did-floating-label-content pe-2 ">
                                        <input autoComplete="off" className="did-floating-input" type="number" id={'vitalId' + val.vmId} style={{ maxWidth: "108px", border: "none" }} name={val.vmId} placeholder=" " value={val.vmValue != "" ? val.vmValue : ""} onChange={handleOnchange} />
                                        <label className={`${(val.vmValue === "") || (val.vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + val.vmId}> <img src={val.img} className='pe-1' />{val.shortname} <span className='vitalUnit'>{val.unit}</span></label>
                                    </div>
                                    <div className='pt-2'>/&nbsp;</div>
                                    <div className="did-floating-label-content pe-2 didd">
                                        <input autoComplete="off" className="did-floating-input" id={'vitalId' + 6} type="number" style={{ maxWidth: "108px", border: "none" }} name={6} placeholder=" " value={sendVitals[2].vmValue != "" ? sendVitals[2].vmValue : ""} onChange={handleOnchange} />
                                        <label className={`${(sendVitals[2].vmValue === "") || (sendVitals[2].vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + 6}> <img src={val.img} className='pe-1' />{sendVitals[2].shortname} <span className='vitalUnit'>{sendVitals[2].unit}</span></label>
                                    </div>

                                </div>
                            )
                        }
                        else if (val.vmId !== 6) {
                            return (

                                <div className="did-floating-label-content pe-2 didd">
                                    <input autoComplete="off" className="did-floating-input" type="number" id={'vitalId' + val.vmId} style={{ maxWidth: "108px" }} name={val.vmId} placeholder=" " value={val.vmValue != "" ? val.vmValue : ""} onChange={handleOnchange} />
                                    <label className={`${(val.vmValue === "") || (val.vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + val.vmId}> <img src={val.img} className='pe-1' />{val.shortname} <span className='vitalUnit'>{val.unit}</span></label>
                                </div>
                            )
                        }
                    })}

                    
                </div> */}
                
            {/* <div className={`d-flex gap-1 boxcontainer mt-2 `} style={{ padding: "7px", overflowX: "auto" }}>

                
                <div>

                <OPDTOPBottom values={getD} funh={setGetD} setActiveComponent={setActiveComponent} setShowTheButton = {setShowTheButton} setIssueID = {setIssueID} setHeadingName = {setHeadingName} />
                </div>
                {showTheButton && (
                <div className={`d-flex justify-content-between align-items-center boxcontainer mt-2`} style={{ padding: "7px", overflowX: "auto" }}>
                    <Heading text={getHeadingName} />
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-toggle="modal" data-bs-target={'#'+activeComponent}>
                        <img src={addIcon} className='icnn' alt='' />
                        Add
                    </button>
                </div>
                )}
            </div> */}
            <div className='col-md-9 col-sm-12 plt1'>
                            {/* <OPDPatientInputData values={getD} funh={setGetD} setFoodData={setFoodData} /> */}
                            <div className={`d-flex gap-1 boxcontainer mt-2 `} style={{ padding: "7px", overflowX: "auto" }}>
                                 <OPDTOPBottom values={getD} funh={setGetD} setActiveComponent={setActiveComponent} setShowTheButton = {setShowTheButton} setIssueID = {setIssueID} setHeadingName = {setHeadingName}/>
                            </div>
                            {showTheButton && (
                            <div className={`d-flex justify-content-between align-items-center boxcontainer mt-2`} style={{ padding: "7px", overflowX: "auto" }}>
                                <Heading text={getHeadingName} />
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-toggle="modal" data-bs-target={'#'+activeComponent}>
                                    <img src={addIcon} className='icnn' alt='' />
                                    Add
                                </button>
                            </div>
                        )}
                        <div className="med-table-section" style={{minHeight: '40vh',maxHeight: "73vh", position:'relative' }}>
                                <table className="med-table border striped">
                                {showImage === 1 ? (
                                    <div className='imageNoDataFound'>
                                        <img src={NoDataFound} alt="imageNoDataFound" />
                                    </div>
                                ) : (
                                    <>
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ "width": "5%" }}>#</th>
                                                <th>Title</th>
                                                <th>Coding</th>
                                                <th>Begin Date</th>
                                                <th>End Date</th>
                                                <th>Referred By</th>
                                                <th>Comments</th>
                                                <th>Destination</th>
                                                <th>Classification Name</th>
                                                <th>Occurance Name</th>
                                                <th>Verification Name</th>
                                                <th>Outcome Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getEncounterList && getEncounterList.map((list, ind) => (
                                                <tr className="text-center" key={ind + 1}>
                                                    <td>{ind + 1}</td>
                                                    <td>{list.encounterTitle}</td>
                                                    <td>{list.encounterCoding}</td>
                                                    <td>{list.encounterBeginDate}</td>
                                                    <td>{list.encounterEndDate}</td>
                                                    <td>{list.encounterReferredBy}</td>
                                                    <td>{list.encounterComments}</td>
                                                    <td>{list.encounterDestination}</td>
                                                    <td>{list.classificationName}</td>
                                                    <td>{list.occuranceName}</td>
                                                    <td>{list.verificationName}</td>
                                                    <td>{list.outComeName}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </>
                                )}
                            </table>
                        </div>



                        <div className="modal fade" id="problemId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                        <div className="modal-content ">
                            <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                                Problem
                            </h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() =>{ getAllEncoutersAsPerIssueID()}}>
                                <i className="fa fa-times"></i>
                            </button>
                            {/* <button type="button" className="btn-close_ btnModalClose" aria-label="Close" onClick={() => { 
                                    getAllEncoutersAsPerIssueID();
                                    // Close the modal manually
                                    document.getElementById('problem').classList.remove('show');console.log('gggggggg')
                                }}>
                                <i className="fa fa-times"></i>
                            </button> */}

                            </div>
                            <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                <OPDProblemPopUp setShowToster={setShowToster} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div> 

                    {/* --------------------------------------------------------------Allergy PopUp Begin--------------------------------------------------- */}
      <div className="modal fade" id="allergyId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Allergy
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() =>{ getAllEncoutersAsPerIssueID()}}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                <div class="tab-pane fade show active" id="allergy" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                  <OPDAllergyPopUp setShowToster={setShowToster} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------Allergy PopUp End--------------------------------------------------- */}

      {/* --------------------------------------------------------------Medication PopUp Begin--------------------------------------------------- */}
      <div className="modal fade" id="medicationId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Medication
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() =>{ getAllEncoutersAsPerIssueID()}}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                <div class="tab-pane fade show active" id="medication" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                  <OPDMedicationPopUp setShowToster={setShowToster} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------Medication PopUp End--------------------------------------------------- */}

      {/* --------------------------------------------------------------Device PopUp Begin--------------------------------------------------- */}
      <div className="modal fade" id="deviceId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Device
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() =>{ getAllEncoutersAsPerIssueID()}}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                <div class="tab-pane fade show active" id="device" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                  <OPDDevicePopUp setShowToster={setShowToster} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------Device PopUp End--------------------------------------------------- */}
      {/* --------------------------------------------------------------Surgery PopUp Begin--------------------------------------------------- */}
      <div className="modal fade" id="surgeryId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Surgery
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() =>{ getAllEncoutersAsPerIssueID()}}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                <div class="tab-pane fade show active" id="surgery" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                  <OPDSurgeryPopUp setShowToster={setShowToster} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------Surgery PopUp End--------------------------------------------------- */}

    </div>
                        

                        {showToster === 1 ? (
                            <SuccessToster
                            handle={setShowToster}
                            message="Problem Saved SuccessFully !!"
                            />
                        ) : (
                            ""
                        )}
                        {showToster === 2 ? (
                            <SuccessToster
                            handle={setShowToster}
                            message="Allergy Saved SuccessFully !!"
                            />
                        ) : (
                            ""
                        )}
                        {showToster === 3 ? (
                            <SuccessToster
                            handle={setShowToster}
                            message="Medication Saved SuccessFully !!"
                            />
                        ) : (
                            ""
                        )}
                        {showToster === 4 ? (
                            <SuccessToster
                            handle={setShowToster}
                            message="Device Saved SuccessFully !!"
                            />
                        ) : (
                            ""
                        )}
                        {showToster === 5 ? (
                            <SuccessToster
                            handle={setShowToster}
                            message="Surgery Saved SuccessFully !!"
                            />
                        ) : (
                            ""
                        )}
</div>
    )
}

