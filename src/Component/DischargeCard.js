import React, { useEffect } from "react";
// import mainlogo from "../../src/assets/images/Navbar/offcanvas-logo.png";
import mainlogo from '../../src/assets/images/Navbar/blankLogo.svg'
import "../assets/css/CertificateCard.css";
import { useState } from "react";
// import GetPatientPersonalDashboardByUHID from "../Registration/API/GET/GetPatientPersonalDashboardByUHID";
// import l from "@linways/table-to-excel";

export default function DischargeCard() {
  let [patientDetails, setPatientDetails] = useState([]);
  let [patientDischargeDeatils, setPatientDischargeDeatils] = useState([]);
  let [dateTime, setDateTime] = useState();
  let [loginData, setLoginData] = useState([]);
  let date = new Date()
  let pDeatails = "Demo Patient - 100000";
  let getPrintDetails = async () => {
    let test = JSON.parse(window.sessionStorage.getItem("PrintDischarge"));
    setPatientDischargeDeatils(test);
    let getPatientDeatils = JSON.parse(
      window.sessionStorage.getItem("IPDpatientList")
    );
    getPatientDeatils.map((val, ind) => {
      let test = JSON.parse(window.sessionStorage.getItem("PrintDischarge"));
      if (val.uhId === test.uhID) {
        setPatientDetails(val);
      }
    });
  };
  let functionGetLoginData = ()=> {      
    let response = JSON.parse(window.sessionStorage.getItem("LoginData"));            
    let getLoginData = response.clientdata        
    setLoginData(getLoginData)        
   }


  useEffect(() => {
    functionGetLoginData();
    getPrintDetails();
    document.title = `Disacharge Card: ${pDeatails}`; // Set the desired title here
    setDateTime(date.toLocaleDateString() + " " + date.toLocaleTimeString());
    setTimeout(() => {
      window.print();
      window.close();
    }, 1000);
  }, []);

  return (
    <>
      <div className="card-wrapper">
        <div className="quater-border right-top"></div>
        <div className="quater-border left-bottom"></div>
        <div className='water-mark'>               
          <div className='clientText'>{loginData.clientName}</div>
        </div>
        {/* ----------------Header Sec-------------- */}
        {/* <div className="dis-hed">
          <div className="discharge-logo">
            <div className="logo-main">
              <img src={mainlogo} />
            </div>
          </div>
          <div className="address-section">
            <div className="address">
              K.No-3, Sarfarazganj, Hardoi road, Lucknow, UP-226003
            </div>
            <div className="email">info@medvantage.com</div>
            <div className="phone">+91-7795688088</div>
          </div>
        </div> */}

                   <div className="dis-hed">
                    <div className="discharge-logo">
                        <div className="logo-main">
                            {/* <img src={mainlogo} /> */}
                            {loginData.logoUrl == null ? <img src={mainlogo} alt='Brand Logo' title='Brand Logo'/> : <img src={loginData.logoUrl} alt='Brand Logo' title='Brand Logo'/>}                            
                        </div>
                    </div>
                    <div className="address-section">                       
                        <div className='organizationName'>{loginData.clientName}</div> 
                        <div className='organizationAddress'>{loginData.address}</div> 
                        {loginData.emailID == null ? '' : <div className='email'>Email: {loginData.emailID}</div>}                        
                        {loginData.mobileNo == null ? '' : <div className='organizationContact'>Phone: +{loginData.countryCode} {loginData.mobileNo}</div>}                           
                    </div>

                    <div className="address-section">  
                    <div className='phone text-right'> {dateTime}</div>                        
                    </div>
                </div>

        {/* -----------------------Patient's Details------------------- */}

        <div className="pat-dtls">
          <div className="document1-title"> Discharge Card</div>
        </div>
        {/* <div className="pat-dtls">
          <div className="document-title"> Discharge Summary</div>
        </div> */}
        <div className="pat-dtls">
          <table className="table-certificate cert-top1">
            <tr>
              <td>Patient Name</td>
              <td className="value">{patientDetails.patientName}</td>
              <td>UHID</td>
              <td>{patientDetails.uhId}</td>
            </tr>
            <tr>
              <td>Age/ DOB</td>
              <td>
                {patientDetails.age} / {patientDetails.dob}
              </td>
              <td>CRNo</td>
              <td>{patientDetails.crNo}</td>
            </tr>
            <tr>
              <td>Sex</td>
              <td>{patientDetails.gender}</td>
              <td>IPNo</td>
              <td>{patientDetails.ipNo}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{patientDetails.address}</td>
              <td>Admission Date</td>
              <td>{patientDetails.admitDateTime}{patientDetails.admittedDate}</td>
            </tr>
            <tr>
              <td>Mobile No.</td>
              <td>{patientDetails.mobileNo}</td>
              <td>Discharge</td>
              <td>{patientDischargeDeatils.followUpDate}</td>
            </tr>
            <tr>
              <td>
                <b>Consultant Name</b>
              </td>
              <td colSpan={3}>
                <b>{patientDetails.doctorName}{patientDetails.name}</b>
              </td>
            </tr>
          </table>
        </div>

        {/* <div className="cert-title cert-top1">Result</div> */}
        {/* <table className="table-certificate">
          <tr>
            <td>ATT 2/5/23</td>
            <td>BODY WEIGHT 47 KG</td>
          </tr>
        </table> */}

        {/* <div className="cert-title cert-top1">
          Patient History/Present Illness & Hospital Course
        </div>
        <div className="cert-title-details">
          PULMONARY KOCH (MICROBIOLOGICALLY CONFIRMED) WITH TYPE 2 DIABETES
          MELLITIUS WITH GENERALISED MACULOPAPULAR RASH CAUSE DRUG REACTION (TAB
          . PCM)
        </div> */}

        <div className="pat-dtls">
          <div className="cert-title cert-top1 fs-6">
            Patient complaint/ Signs & Symptoms
          </div>
          <div className="cert-title-details">
            {/* PATIENT HANUMAN 45 YEARS MALE CAME TO THE HOSPITAL WITH COMPLAINTS
            OF : */}
            {patientDetails.patientName} {patientDetails.age} YEARS CAME TO THE
            HOSPITAL WITH COMPLAINTS OF :
          </div>

          <ol className="cert-ol cert-top1">
            {patientDischargeDeatils.allComplain &&
              patientDischargeDeatils.allComplain.map((list, ind) => {
                if (list.pdmId === 2) {
                  return <li key={ind}>{list.problemName}</li>;
                } else {
                  return null; // If the condition isn't met, you can return null or something else if needed.
                }
              })}
          </ol>

          {/* <li>FEVER SINCE 4 DAYS</li>
            <li>RASHES OVER BODY SINCE 4 DAYS</li>
            <li>ITCHING Al OVER BODY SINCE 4 DAYS</li> */}

          {/* <div className="cert-title-details cert-top1">
            <b>
              K/C/O TYPE 2 DIABETES MELLITUS SINCE 6 YEARS (ON IRREGULAR
              MEDICATION )<br /> PULMONARY TB SINCE 15 DAYS (ON ATT SINCE 10
              DAYS )
            </b>
          </div> */}

          {/* <table className="table-certificate border-bottom cert-top2">
            <thead>
              <tr>
                <th>Vitals</th>
                <th>Admission</th>
                <th>Discharge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GC</td>
                <td>SICK</td>
                <td>STABLE</td>
              </tr>
              <tr>
                <td>RR</td>
                <td>20/MlN</td>
                <td>98BPM</td>
              </tr>
              <tr>
                <td>TEMP</td>
                <td>98.2F</td>
                <td>97.4F</td>
              </tr>
              <tr>
                <td>SP02</td>
                <td>98%@RA</td>
                <td>98%@RA</td>
              </tr>
              <tr>
                <td>RBS</td>
                <td>261MG/DL</td>
                <td>123MG/DL</td>
              </tr>
            </tbody>
          </table> */}
        </div>

        <div className="pat-dtls">
          <div className="cert-title cert-top1 fs-6">Consultant Diagnosis</div>
          <div className="cert-title-details">
            {/* PATIENT HANUMAN 45 YEARS MALE CAME TO THE HOSPITAL WITH COMPLAINTS
            OF : */}
            {patientDetails.patientName} {patientDetails.age} YEARS CAME TO THE
            HOSPITAL WITH Diagnosis OF :
          </div>
          <ol className="cert-ol cert-top1">
            {patientDischargeDeatils.allComplain &&
              patientDischargeDeatils.allComplain.map((list, ind) => {
                if (list.pdmId === 4) {
                  return <li key={ind}>{list.problemName}</li>;
                } else {
                  return null; // If the condition isn't met, you can return null or something else if needed.
                }
              })}
          </ol>

          {/* <li>FEVER SINCE 4 DAYS</li>
            <li>RASHES OVER BODY SINCE 4 DAYS</li>
            <li>ITCHING Al OVER BODY SINCE 4 DAYS</li> */}

          {/* <div className="cert-title-details cert-top1">
            <b>
              K/C/O TYPE 2 DIABETES MELLITUS SINCE 6 YEARS (ON IRREGULAR
              MEDICATION )<br /> PULMONARY TB SINCE 15 DAYS (ON ATT SINCE 10
              DAYS )
            </b>
          </div> */}
          <div className="cert-title cert-top1 fs-6">Medication Details</div>
          <table className="table-certificate border-bottom">
            <thead>
              <tr>
                <th>#</th>
                <th>Drug Name</th>
                <th>Dose Frequency</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {patientDischargeDeatils.allMedication &&
                patientDischargeDeatils.allMedication.map((list, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{ind + 1}</td>
                      <td>{list.drugName}</td>
                      <td>{list.doseFrequency}</td>
                      <td>{list.duration}</td>
                    </tr>
                  );
                })}

              {/* <tr>
                <td>RR</td>
                <td>20/MlN</td>
                <td>98BPM</td>
              </tr>
              <tr>
                <td>TEMP</td>
                <td>98.2F</td>
                <td>97.4F</td>
              </tr>
              <tr>
                <td>SP02</td>
                <td>98%@RA</td>
                <td>98%@RA</td>
              </tr>
              <tr>
                <td>RBS</td>
                <td>261MG/DL</td>
                <td>123MG/DL</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        {/* ---------------------------Examination---------------------- */}
        {/* 
        <table className="table-certificate cert-top2">
          <thead>
            <tr>
              <th>GENERAL EXAMINATION</th>
              <th>SYSTEMIC EXAMINATION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>
                <div>PALLOR ABSENT</div>
                <div>ICTERUS ABSENT</div>
                <div>CLUBBING ABSENT</div>
                <div>CYANOSIS ABSENT</div>
                <div>LYMPHADENOPATHY-ABSENT</div>
                <div>EDEMA • ABSENT</div>
              </td>
              <td>
                <ol className="cert-ol cert-top1">
                  <li>
                    P/A : SOFT, FLAT , NON TENDER , NO PALPABLE ORGANOMEGALY
                  </li>
                  <li>R/S : B/L SYMMETRICAL, B/L WBS+</li>
                  <li>CVS: SIS2 +, NO MURMUR HEARD.</li>
                  <li>
                    CNS: WELL ORIENTED CONSCIOUS TO TIME , PLACE AND PERSON .NO
                    NEUROLOGICAL DEFICIT.
                  </li>
                </ol>
              </td>
            </tr>
          </tbody>
        </table> */}

        <div
          class="d-flex justify-content-between"
          style={{ marginTop: "30px" }}
        >
          <div class="text-center">
            {/* <div> <img src="http://172.16.61.31:7095/MediaFiles/tecnicianSign.png" alt="" style="width: 125px; margin-top: 2px;"/></div> */}
            <div>
              <b>Resident Sign</b>
            </div>
          </div>
          <div class="text-center">
            {/* <div> <img src="http://172.16.61.31:7095/MediaFiles/doctorSign.png" alt="" style="width: 125px; margin-top: 2px;"/></div> */}
            <div>
              <b>Consultant Incharge Sign</b>
            </div>
          </div>
        </div>
        {/* <div className='cert-title cert-top1'>Patient History/Present Illness & Hospital Course</div>
                    <div className="cert-title-details">PULMONARY KOCH (MICROBIOLOGICALLY CONFIRMED) WITH TYPE 2 DIABETES MELLITIUS WITH GENERALISED MACULOPAPULAR RASH CAUSE DRUG REACTION (TAB . PCM). 
                    PULMONARY KOCH (MICROBIOLOGICALLY CONFIRMED) WITH TYPE 2 DIABETES MELLITIUS WITH GENERALISED MACULOPAPULAR RASH CAUSE DRUG REACTION (TAB . PCM).
                    PULMONARY KOCH (MICROBIOLOGICALLY CONFIRMED) WITH TYPE 2 DIABETES MELLITIUS WITH GENERALISED MACULOPAPULAR RASH CAUSE DRUG REACTION (TAB . PCM).
                    PULMONARY KOCH (MICROBIOLOGICALLY CONFIRMED) WITH TYPE 2 DIABETES MELLITIUS WITH GENERALISED MACULOPAPULAR RASH CAUSE DRUG REACTION (TAB . PCM).
                    PULMONARY KOCH (MICROBIOLOGICALLY CONFIRMED) WITH TYPE 2 DIABETES MELLITIUS WITH GENERALISED MACULOPAPULAR RASH CAUSE DRUG REACTION (TAB . PCM).
                    PULMONARY KOCH (MICROBIOLOGICALLY CONFIRMED) WITH TYPE 2 DIABETES MELLITIUS WITH GENERALISED MACULOPAPULAR RASH CAUSE DRUG REACTION (TAB . PCM).
                    PULMONARY KOCH (MICROBIOLOGICALLY CONFIRMED) WITH TYPE 2 DIABETES MELLITIUS WITH GENERALISED MACULOPAPULAR RASH CAUSE DRUG REACTION (TAB . PCM).
                    </div> */}
      </div>
    </>
  );
}
