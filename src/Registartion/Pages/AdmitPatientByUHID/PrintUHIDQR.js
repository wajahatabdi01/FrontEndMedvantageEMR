import React, { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import '../../../assets/css/CertificateCard.css'
import Eralogo from "../../../assets/images/CardIcons/ERAlogo.png";
// import medLogo from "../../../assets/images/Navbar/NavbarLogo.png";
import cardBgImg from "../../../assets/images/CardIcons/CardBackground.png";
import mainlogo from '../../../assets/images/Navbar/blankLogo.svg'


export default function PrintUHIDQR(props) {
  let [data, setData] = useState(
    JSON.parse(window.sessionStorage.getItem("UHIDQRData"))
  );
  let [dataNew, setDataNew] = useState(
    JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata

  );

  useEffect(() => {
    //get data from lop
    JsBarcode("#barcode", data.patientData.uhID, {
      height: "24px",
      displayValue: true,
    });
    console.log('dataNew',dataNew)
    window.print("");
  }, []);
  return (
    <>
      <div className="healthCardContainer">
        <div className="healthCardContainerInner">
          <div className="header">
            <div className="cardLogo">
              {/* <img src={medLogo} /> */}
              {dataNew.logoUrl == null ? <img src={mainlogo} alt='Brand Logo' title='Brand Logo'/> : <img src={dataNew.logoUrl} alt='Brand Logo' title='Brand Logo'/>}
              </div>
            <div className="headerText">
              <div><b>{dataNew.clientName}</b> </div>
              <div>{dataNew.address}</div>
              <div>
                <b>{dataNew.emailID}</b>
              </div>
            </div>
          </div>

          <div className="cardTitleBarcodeContainer">
            <div style={{ color: "red" }}>Health Card</div>
            <div>
              <svg id="barcode"></svg>
            </div>
          </div>

          <table className="tableHealthCard">
            <tr>
              <td className="noPadding">Name : </td>
              <td className="noPaddingRight">
                {data && data.patientData.patientName}
              </td>
            </tr>
            <tr>
              <td className=" noPadding">Gender : </td>
              <td className="noPaddingRight">{data && data.patientData.gender}</td>
            </tr>
            <tr>
              <td className=" noPadding">DOB : </td>
              <td className="noPaddingRight">{data && data.patientData.dob}</td>
            </tr>
            <tr>
              <td className="noPadding">Mob.No : </td>
              <td className="noPaddingRight">
                {data && data.patientData.mobileNo}
              </td>
            </tr>
            <tr>
              <td className="noPadding" style={{}}>
                Reg.Date :{" "}
              </td>
              <td className="noPaddingRight">
                {data && data.patientData.registrationDate}
              </td>
            </tr>
            <tr>
              <td className="noPadding" style={{}}>
                Address :
              </td>
              <td className="noPaddingRight">{data && data.patientData.address}</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
