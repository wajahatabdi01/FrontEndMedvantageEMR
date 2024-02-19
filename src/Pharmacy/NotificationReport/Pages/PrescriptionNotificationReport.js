import React, { useState } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import visible from '../../../assets/images/icons/visible.svg'
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import BoxContainer from '../../../Component/BoxContainer';
import Search from '../../../Code/Serach';
import GetPrescriptionRecord from '../API/GetPrescriptionRecord';
import { useEffect } from 'react';
import PostPrescriptionRecord from '../API/PostPrescriptionRecord';
import GetPrescriptionRecordForPopUp from '../API/GetPrescriptionRecordForPopUp';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function PrescriptionNotificationReport() {
  let [notificationList, setNotificationList] = useState([]);
  let [notificationListSearch, setNotificationListSearch] = useState([]);
  let [medData, setMedData] = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let notifyme = useSelector((state) => state.Notifications)
  let [tosterValue, setTosterValue] = useState(0);
  let [notificationId, setNotificationId] = useState(0);
  const {t} = useTranslation();


  const getData = async () => {
    const resp = await GetPrescriptionRecord();
    if (resp.status === 1) {
      setNotificationList(resp.responseValue);
      setNotificationListSearch(resp.responseValue);

    }
  };

  let showPopUp = (param) => {
    const dataRes = JSON.parse(param.prescriptionDetails);
    let dataParser = [];
    dataParser.push(dataRes);
   
    setMedData(dataParser[0]);
    setNotificationId(param.id);
  };

  // Handle Search
  const handleSearch = (e) => {
    let resp = Search(notificationList, e.target.value)
    if (e.target.value !== "") {
      if (resp.length !== 0) {
        setNotificationListSearch(resp)
      }
      else {
        setNotificationListSearch([])

      }
    }
    else {
      setNotificationListSearch(notificationList)
    }
  };

  const HandleAllCheckCheckBoxes = () => {
    const data = medData.medicineData;
    for (var i = 0; i < data.length; i++) {
      const findID = "check" + data[i].id + data[i].drugName;
      document.getElementById(findID).checked = true;
    }
  };

  const handleSave = async () => {
    const patientDetails = [];
    const medicineDetails = [];
    const data = medData.medicineData;
    for (var i = 0; i < data.length; i++) {
      const findID = "check" + data[i].id + data[i].drugName;
      const getCBValue = document.getElementById(findID).checked;
      const findAltID = "alternativeTxt" + data[i].id + data[i].drugName;
      const getALTValue = document.getElementById(findAltID).value;
      if (getCBValue) {
        medicineDetails.push({
          medID: data[i].id,
          isAvailable: 1,
          alternative: getALTValue,
          drugName: data[i].drugName
        })
      }
      else if (getALTValue !== "" && getALTValue !== null && getALTValue.trim() !== '' && getALTValue !== undefined) {
        medicineDetails.push({
          medID: data[i].id,
          isAvailable: 0,
          alternative: getALTValue,
          drugName: data[i].drugName
        })
      }
    }
    if (medicineDetails.length < 1) {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage('Blank fileds cannot be insert.')
      setTosterValue(1)

      getData()
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
    else {
      let patientDetails = {
        Uhid: medData.Uhid,
        DoctorName: medData.doctorName,
        medicineData: JSON.stringify(medicineDetails),
        PatientName: medData.patientName,
        UserId: window.userId
      }

      const obj = {
        prescriptionNotificationId: notificationId,
        actionTaken: JSON.stringify(patientDetails),
        senderId: window.userId,
        recieverId: medData.userId,
        userId: window.userId,
      }



      let finalData = await PostPrescriptionRecord(obj);
      if (finalData.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");


        setTimeout(() => {
          setShowToster(0);
        }, 2000);
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(finalData.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
  };

  const handleClear = () => {
    document.getElementById('AllChecked').checked = false;
    const data = medData.medicineData;
    for (var i = 0; i < data.length; i++) {
      const findID = "check" + data[i].id + data[i].drugName;
      document.getElementById(findID).checked = false;
      const findAltID = "alternativeTxt" + data[i].id + data[i].drugName;
      const getALTValue = document.getElementById(findAltID).value = '';
    }
  };

  useEffect(() => {
    getData();
  }, [notifyme]);
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mt-2">
              <div className='handlser'>
                <Heading text={t("Prescription_Notification_Report")} />

                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer >
                  <thead>
                    <tr>
                      <th className="" style={{ "width": "5%" }}>{t("S.No.")}</th>
                      <th>{t("Date Time")}</th>
                      <th>{t("Coming_From")}</th>
                      <th>{t("Send_By")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>

                    </tr>
                  </thead>

                  <tbody>
                    {notificationListSearch && notificationListSearch.map((val, ind) => {
                     
                      return (
                        <tr>
                          <td>{ind + 1}</td>
                          <td>{val.date}</td>
                          <td>{val.comingFrom}</td>
                          <td>{JSON.parse(val.prescriptionDetails).doctorName}</td>
                          <td className=''>
                            <div className='action-button '>
                              {val.isSent === 0 ? <div data-bs-toggle='modal' className='btn-sm' data-bs-placement='bottom' data-bs-target="#ViewPrescriptionModal" title='View Prescription' onClick={() => { showPopUp(val) }}>
                                <a href='#top'> <img src={visible} style={{ 'width': '20px', 'border-radius': '5px' }} alt='' />
                                </a></div>
                                :
                                <div className='btn-sm' title='Prescription sent' >
                                  <a href='#top'> <img src={visible} style={{ 'width': '20px', 'border-radius': '5px', 'opacity': 0.3 }} alt='' />
                                  </a></div>
                              }

                            </div>
                          </td>

                        </tr>
                      )
                    })}

                  </tbody>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------Modal For view Prescription------------------------------- */}
        <div className="modal fade" id="ViewPrescriptionModal" data-bs-backdrop="static">
          <div className="modal-dialog modal-xl">
            <div className="modal-content p-0">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Pharmacy Order</h1>
                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window">
                  <i className="bi bi-x-octagon"></i>
                </button>
              </div>
              <div className="whitebg modal-body p-0">
                <div className="row">
                  <div className="col-12">
                    <div className="med-box"> <div className="title">Medicine/Item Details</div>

                      <div className='d-flex gap-3 justify-content-end me-2 mb-1 fst-italic text-primary-emphasis'>
                        <div>
                          <b>{t("Uhid")}:</b> {medData.Uhid}
                        </div>
                        <div><b>{t("Patient_Name")} :</b> {medData.patientName}</div>
                      </div>
                      <div className="inner-content">
                        <div className='row'>
                          <div className="col-md-12 mb-2">
                            <div className="med-table-section" style={{ height: '32vh' }}>
                              <TableContainer>
                                <thead>
                                  <tr>
                                    <th><input type='checkbox' id='AllChecked' onClick={HandleAllCheckCheckBoxes} /></th>
                                    <th>Item Details</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                    <th>Remark</th>
                                    <th>Alternate</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* {medData.medicineData && console.log("data", medData.medicineData)} */}
                                  {medData.medicineData && medData.medicineData.map((list, index) => {
                                    return (
                                      <tr>
                                        <td><input type='checkbox' id={'check' + list.id + list.drugName} /></td>
                                        <td>{list.drugName}</td>
                                        <td>{list.doseFrequency}</td>
                                        <td>{list.duration}</td>
                                        <td>{list.remark}</td>
                                        <td><input type='text' className='form-control form-control-sm ' id={'alternativeTxt' + list.id + list.drugName} /></td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </TableContainer>

                            </div>
                          </div>

                          <div className="col-12 d-flex column-gap-2 justify-content-end">

                            {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                              showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                :
                                <>
                                  <button type="button" className="btn btn-save btn-sm mb-1" onClick={handleSave}>Save</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => handleClear()}>Clear</button>
                                </>
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
        {/* ------------------------------------------End view Prescription------------------------------- */}

      </section>

      {/* {
        showAlertToster === 1 ? <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
      } */}

    </>
  )
}
