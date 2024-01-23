import React from 'react'

import editbtn from '../../../../../assets/images/icons/editbtn.svg'
import delbtn from '../../../../../assets/images/icons/delbtn.svg'
import heart from '../../../../../assets/images/vitalsicons/heart.svg'
import spo2 from '../../../../../assets/images/icons/spo2.svg'
import BP from '../../../../../assets/images/icons/BP.svg'
import PR from '../../../../../assets/images/icons/PR.svg'
import RR from '../../../../../assets/images/icons/RR.svg'
import weight from '../../../../../assets/images/icons/weight.svg'
import height from '../../../../../assets/images/icons/height.svg'
import temperature from '../../../../../assets/images/icons/temperature.svg'
import rbs from '../../../../../assets/images/vitalsicons/rbs.svg'
import time from '../../../../../assets/images/icons/time.svg'
import takenby from '../../../../../assets/images/icons/takenby.svg'
import action from '../../../../../assets/images/icons/action.svg'
import TableContainer from '../../../../../Component/TableContainer'
import Heading from '../../../../../Component/Heading'
import GetAllPatientVital from '../../../../API/OPD/Vitals/GetAllPatientVital'
import { useEffect } from 'react'
import getvitaldata from './VitalsCode'
import { useState } from 'react'
import GetAllPatientVitalsHourly from '../../../../API/OPD/Vitals/GetAllPatientVitalsHourly'
import Loder from '../../../../../Component/Loader'
import { FindByQuery } from '../../../../../Code/Serach'
import GetVentilatorDetails from '../../../IPD/IPDSharePages/VentilatorDetails/GetVentilatorDetails'
import DeleteVentilatorDetails from '../../../IPD/IPDSharePages/VentilatorDetails/DeleteVentilatorDetails'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function OPDVRight(props) {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();
  let [patientViatlsData, setPatientViatlsData] = useState([]);
  let [vitalsDate, setVitalsDate] = useState([]);
  let [respLen, setRespLen] = useState(0);
  const [loader, setLoader] = useState(1);
  let vitalImg = [{ icon: BP, name: "BP" }, { icon: RR, name: "RR" }, { icon: spo2, name: "spo2" }, { icon: PR, name: "PR" }, { icon: temperature, name: "Temp." }, { icon: heart, name: 'HR' }, { icon: BP, name: "RBS" }, { icon: height, name: "Ht." }, { icon: weight, name: "Wt." }]
  let uhid = ""
  if (props.callingpage === 0) {
    uhid = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : ""
  }
  else if (props.callingpage === 1) {
    uhid = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : ""
  }
  let [ventilatorList, setVentilatorList] = useState([]);
  let [rowID, setRowID] = useState('');
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let curdate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  let getVitalDatas = async () => {

    // let response = await GetAllPatientVital(uhid)
    let response = await GetAllPatientVitalsHourly(curdate(), uhid);
    //let response = await GetAllPatientVitalsHourly('2023-01-11', 2597700);

    if (response.status === 1 && response.responseValue.length !== 0) {
      setLoader(0);

     
      // let data = getvitaldata(response.responseValue)
      setPatientViatlsData(response.responseValue);
      makeData(response.responseValue)
      props.setGetData(0)
      setVitalsDate(response.responseValue[0].date);
      setRespLen(response.responseValue.length);
    }
    else {
      setLoader(0);
    }

    // let len = response.responseValue.length;
    // if (len > 0) {
    // }
  }

  let [testVitals, setTestVitals] = useState()
  // let [vitalNumber, setVitalNumber] = useState([4, 7, 56, 3, 5, 10, 1, 2, 6])
  let [vitalNumber, setVitalNumber] = useState([4, 7, 56, 3, 5, 74, 10, 6,])

  let makeData = (data) => {

    let temp = []
    let main = []
    let flag = -1
    data.map((val, ind) => {
      

      vitalNumber.map((vv, ii) => {

        // let resp = FindByQuery(JSON.parse(val.json), vv.toString(), "vmId")
        let resp = JSON.parse(val.json).filter(vals => vals.vmId.toString() === vv.toString())
        
        if (resp.length !== 0) {
          
          if (resp.length !== 0 && resp[0].vmId !== 6 && resp[0].vmId !== 4) {

            temp.push(resp[0].vmValue)

          }
          else if (resp.length !== 0 && resp[0].vmId === 4) {
            if (flag !== -1) {
              temp[flag] = temp[flag] + resp[0].vmValue.toString()
            }
            else {
              temp.push(resp[0].vmValue)
              flag = temp.length - 1
            }
          }
          else if (resp.length !== 0 && resp[0].vmId === 6) {
            if (flag !== -1) {
              temp[flag] = temp[flag] + "/" + resp[0].vmValue.toString()
            }
            else {
              temp.push(resp[0].vmValue)
              flag = temp.length - 1
            }
          }
        }
        else {
          temp.push("-")

        }

      })
     
      main.push(temp)
      temp = []
      flag = -1

    })

    function transpose(a) {
      return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) { return r[c]; });
      });
    }
    
    setTestVitals(transpose(main))
  }
  let getVentilatorDetails = async () => {
    let getPmID = "";
    const getActiveUhid = JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
    const getpatientList = JSON.parse(sessionStorage.getItem("IPDpatientList"));
    getpatientList.map((val, i) => {
      if (val.uhId === getActiveUhid) {
        getPmID = val.pmId;
        return;
      }
    });
    const response = await GetVentilatorDetails(getPmID, userID);
    if (response.status === 1) {
      setVentilatorList(response.responseValue[0]);
    }
    else {

    }
  }
  let handleDeleteVentiDetails = async () => {
    let getPmID = "";
    const getActiveUhid = JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
    const getpatientList = JSON.parse(sessionStorage.getItem("IPDpatientList"));
    getpatientList.map((val, i) => {
      if (val.uhId === getActiveUhid) {
        getPmID = val.pmId;
        return;
      }
    });
    if (rowID === '' || rowID === undefined || getPmID === "" || getPmID === null) {

    }
    else {
      const obj = {
        id: rowID,
        pmId: getPmID,
        userId: userID,
        pid: 0,
        peep: 0,
        fiO2: 0,
        isFromMachine: false,
        ventiMode: 0
      }
      const response = await DeleteVentilatorDetails(obj);
      // if (response.status === 1) {
      //   // console.log('success deleted')
      //   // getVentilatorDetails();
      // }
      // else {
      //   console.log('error ')
      // }
    }

  }
  useEffect(() => {
    getVitalDatas()
    getVentilatorDetails();
  }, [props.getData]);

  return (
    <div className=' italrt'>
      <div className="boxcontainer whitebackgroundnopad wb">
        <div className='tblheading'>{t("Vital Chart History")}</div>
        <div className='wb45'>
          <div className="med-table-section noshadow" style={{ "height": "30vh" }}>
            <table className='med-table border striped' >

              <tbody>
                <tr style={{ flexWrap: 'nowrap' }}>
                  <td><b>{vitalsDate}</b></td>
                  <td className='text-center' colspan={respLen} > <b>{t("Hours")}</b></td>
                </tr>
                <tr style={{ flexWrap: 'nowrap' }}>
                  <td>{t("Vitals /Time")}</td>
                  {patientViatlsData && patientViatlsData.map((list, index) => {
                    
                    return (
                      <td ><b>{list.showVitalTime}</b></td>
                    )
                  })}
                </tr>
                {
                  patientViatlsData && vitalNumber.map((val, ind) => {
                    
                    return (
                      <tr>
                        <td>
                          <div className='d-flex align-items-center '>
                            {val !== 6 ? <img src={vitalImg[ind].icon} className='icnn' alt=''/> : ""}
                            {val !== 6 ? <span>{vitalImg[ind].name}</span> : ""}
                          </div>
                        </td>
                        {
                          val !== 6 ? testVitals && testVitals[ind].map((v, i) => { return (<td>{v}</td>) }) : ""
                        }
                      </tr>
                    )
                  })



                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="boxcontainer whitebackgroundnopad wb">
        <div className='tblheading'>Ventilator Details List</div>
        <div className="med-table-section noshadow" style={{ "height": "48vh", overflow: "auto" }}>
          <TableContainer>
            <thead>
              <tr>
                <th className="text-center" style={{ "width": "5%" }}>#</th>
                <th><span className='picivon'>FIO2</span></th>
                <th><span className='picivon'>PEEP</span></th>
                <th><span className='picivon'>Date Time</span></th>
                <th><span className='picivon'>Taken By</span></th>
                <th style={{ "width": "10%" }} className="text-center"> <span className='picivon'> Action</span></th>
              </tr>
            </thead>

            <tbody>
              {ventilatorList && ventilatorList.map((list, ind) => {
                return (
                  <tr>
                    <td>{ind + 1}</td>
                    <td>{list.fiO2}</td>
                    <td>{list.peep}</td>
                    <td>{list.createddate}</td>
                    <td>{list.name}</td>
                    <td>
                      <div className="action-button">
                        <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><span className='btnbg' style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn' onClick={() => { setRowID(list.id) }} /></span></div>
                      </div>
                    </td>
                  </tr>

                )
              })}

            </tbody>
          </TableContainer>
        </div>
      </div>
      {/* -----------------------Start Delete Modal Popup-------------------    */}

      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modalDelete">
          <div className="modal-content">
            <div className="modal-body modelbdy text-center">
              <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
              <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
              <div className='popDeleteContent'> {t("Are you sure you want to delete?")}</div>
            </div>
            <div className="modal-footer1 text-center">

              <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
              <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteVentiDetails} data-bs-dismiss="modal">{t("Delete")}</button>
            </div>
          </div>
        </div>
      </div>
      <Loder val={loader} />
    </div>
  )
}

