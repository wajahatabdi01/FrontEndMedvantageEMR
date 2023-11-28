import React from 'react'
import { useState, useEffect } from 'react'
import imgPrint from '../../assets/images/icons/imgPrint.svg'
import Loder from '../../Component/Loader'
import commenticon from '../../assets/images/icons/commenticon.png';
import Send from '../../assets/images/icons/send.png';
import Ellipse from '../../assets/images/icons/Ellipse.png';
import Cross from '../../assets/images/icons/Cross.png';
import GetAllChallan from '../API/ChallanForm/GetAllChallan';
import GetAllChallanPrint from '../API/ChallanForm/GetAllChallanPrint';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { useNavigate } from "react-router-dom";




export default function ChallanReport() {
 
  const navigate = useNavigate();


  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  const [ChallanReportChart, setChallanReportChart] = useState([])
  const [showLoder, setShowLoder] = useState(0);
  const [selectDepartmentTable, setSelectDepartmentTable] = useState([])
  const [selectDepartment, setselectDepartment] = useState('')
  const [showReply, setShowReply] = useState(false);
  const [showTransfer, setshowTransfer] = useState(false)
  const [ComplaintDetails, setComplaintDetails] = useState('')
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [ComplaintChartReply, setComplaintChartReply] = useState([])
  const [responseTextValues, setResponseTextValues] = useState({});
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);



const getChallanReport = async()=>{
    let challanReport = await GetAllChallan()
    if(challanReport.status === 1){
        setChallanReportChart(challanReport.responseValue)
        console.log("challanReport" , challanReport.responseValue)
    }
}
  useEffect(() => {
    getChallanReport();
  }, [])


const handleOnPrint= async(rowData)=>{
  let ID = rowData.id
  let Printdata = await GetAllChallanPrint(ID)
  console.log(ID)
  if(Printdata.status === 1){
   
    sessionStorage.setItem('ChallanReceiptdata', JSON.stringify(Printdata.responseValue));
    console.log(Printdata.responseValue)
    
  }

  window.open("/challanreceipt/", "noopener,noreferrer");


}

  return (
    <section className="main-content pt-3 mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-2">
            <div className="med-box">
              <div class="title mx-2">{t("Challan_Report")}</div>
            </div>
          </div>


          <div className="col-12">
            <div className="med-box">
              <div class="title mx-2">{t("Challan_List")}</div>
              <div className="med-table-section mt-4" style={{ height: '788px' }}>
                <table className="med-table border_ striped">
                  <thead>
                    <tr className='table-primary' style={{ color: 'black' }}>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Challan_Number")}</th>
                      <th>{t("Send_To")}</th>
                      <th>{t("Received_By")}</th>
                      <th>{t("Remark")} </th>
                      <th>{t("Signature")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ChallanReportChart && ChallanReportChart.map((data, index) => {

                      return (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.challannumber}</td>
                          <td>{data.sendto}</td>
                          <td>{data.recivedto}</td>
                          <td>{data.remark}</td>
                          <td>{data.signature}</td>
   


                          <td>
                            <div className="action-button">
                              <div>
                            
                                <span className={data.isRead === 1 ? "unreadColor" : "readColor"} title={data.isRead === 1 ? "Message Read" : "Message Unread"}><img src={imgPrint} alt='' onClick={() => handleOnPrint(data)} style={{width: '19px'}}/></span>
                              </div>


                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="col-12 mt-4">

      </div>


      {/* -----------------------Start Delete Modal Popup-------------------    */}


      {/* -----------------------End Delete Modal Popup---------------------  */}
      {
        showLoder === 1 ? <Loder val={showLoder} /> : ""
      }


    </section>


  )
}
