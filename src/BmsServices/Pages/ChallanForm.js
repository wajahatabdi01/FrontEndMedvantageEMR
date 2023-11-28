import React from "react";
import { useState, useEffect } from "react";
import imgReset from "../../assets/images/icons/reset.svg";
import saveButtonIcon from "../../assets/images/icons/saveButton.svg";
import SuccessToster from "../../Component/SuccessToster";
import AlertToster from "../../Component/AlertToster";
import PostChallan from "../API/ChallanForm/PostChallan";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function ChallanForm() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [inputValues, setInputValues] = useState({ userId: window.userId });
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showMessage, setShowMeassage] = useState("");
  let [showSuccessToster, setShowSuccessToster] = useState(0);
  const [rows, setRows] = useState([{ id: 1 }]);
  let [userID, setUserID] = useState(
    JSON.parse(sessionStorage.getItem("LoginData")).userId
  );
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const handleInputChange = (event) => {
    document.getElementById('errsendTo').style.display = 'none';
    document.getElementById('errReceivedby').style.display = 'none';
    const { name, value } = event.target;
    setInputValues((inputValues) => ({
      ...inputValues,
      [name]: value,
    }));
  };
  const isRowFilled = (row) => {
    const requiredFields = ["discription", "serialNo", "quantity"];

    return requiredFields.every((field) => !!row[field]);
  };
  const addRow = () => {
    const previousRow = rows[rows.length - 1];
    if (isRowFilled(previousRow)) {
      const newRow = {
        id: rows.length + 1,
        name: `Row ${rows.length + 1}`,
      };

      setRows([...rows, newRow]);
    } else {     
      setShowAlertToster(1);
      setShowMeassage("Previous row is not filled completely");
    }
  };

  const handleRowInputChange = (event, rowId) => {
    const { name, value } = event.target;

    const updatedRows = [...rows];
    console.log("ddd", rows);
    const rowIndex = updatedRows.findIndex((row) => row.id === rowId);
    if (name === "discription" || name === "serianNo") {
      updatedRows[rowIndex][name] = value;
    } else {
      updatedRows[rowIndex][name] = value;
    }
    updatedRows[rowIndex][name] = value;
    if (name === "quantity") {
      const { price, quantity } = updatedRows[rowIndex];
      const netAmount = price * quantity;
      updatedRows[rowIndex].netAmount = netAmount;
    }
    setRows(updatedRows);
  };
  const removeRow = (id) => {
    if (id !== 1) {
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    }
  };

  const resetForm = () => {
    setInputValues({
      uhId: "",
      grossAmount: "",
      discount: "",
      netAmount: "",
      userId: window.userId,
    });

    

    const updatedRows = rows.map((row) => {
      if (row.id === 1) {
        return {
          ...row,

          discription: (document.getElementById(`discription_${row.id}`).value =
            ""),
          quantity: (document.getElementById(`quantity_${row.id}`).value = ""),
          SerialNo: (document.getElementById(`serialNo_${row.id}`).value = ""),
          sendTo: (document.getElementById("sendTo").value = ""),
          receivedby: (document.getElementById("Receivedby").value = ""),
          signature: (document.getElementById("signature").value = ""),
          remark: (document.getElementById("remark").value = ""),
        };
      }
      return row;
    });
    setRows(updatedRows);
    setRows([{ id: 1 }]);
  };

  const handleAddData = async () => {
    let sendTo = document.getElementById("sendTo").value
    let receivedBy = document.getElementById("Receivedby").value
    let signature = document.getElementById("signature").value
    if(sendTo.trim() === ""){
        document.getElementById('errsendTo').innerHTML = 'Please  Enter Send To';
        document.getElementById('errsendTo').style.display = 'block';
        return;
    }
    else if (receivedBy.trim() === ""){
        document.getElementById('errReceivedby').innerHTML = 'Please  Enter Received By';
        document.getElementById('errReceivedby').style.display = 'block';
        return;
    }
    
    else{
          
      const collectedData = rows.map((row) => ({
        descripation: document.getElementById(`discription_${row.id}`).value,
        qty: document.getElementById(`quantity_${row.id}`).value,
        serialNumber: document.getElementById(`serialNo_${row.id}`).value,
        userId: userID,
      }));

      const isEmpty = collectedData.some((item) =>
      Object.values(item).some((value) => value === null || value === "")
    );

    if (isEmpty) {
      setShowAlertToster(1);
      setShowMeassage("Previous row is not filled completely");
    }
    else if (signature.trim() === ""){
      document.getElementById('errsignature').innerHTML = 'Please Enter signature ';
        document.getElementById('errsignature').style.display = 'block';
    }
    else{
      console.log("collectedData", collectedData);

      const filteredData = collectedData.filter((item) =>
        Object.values(item).some((value) => value !== null && value !== "")
      );

      const Challandata = {
        clientId: clientID,
        sendto: inputValues.sendTo,
        destination: inputValues.Destination,
        recivedto: inputValues.Receivedby,
        signature: inputValues.signature,
        remark: inputValues.remark,
        userId: userID,
        jsonchallan: JSON.stringify(filteredData),
      };

      console.log("Challandata", Challandata);

      let response = await PostChallan(Challandata);
      if (response.status === 1) {
        setShowMeassage("Data Saved Successfully!!");
        setShowSuccessToster(1);
        resetForm();
      } else {
        setShowMeassage(JSON.stringify(response.responseValue));
        setShowAlertToster(1);
         setShowAlertToster(1);
        setShowMeassage(JSON.stringify());
      }
    } 
    
    
  };
    }
  
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className="fieldse">{t("Challan_Form")}</span>
                  <div className="row mt-2 px-2">
                    <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6">
                      <div className="mb-2">
                        <label htmlFor="discount" className="form-label">
                          {t("Send_To")}<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          name="sendTo"
                          value={inputValues.sendTo}
                          className="form-control form-control-sm"
                          id="sendTo"
                          onChange={handleInputChange}
                          placeholder={t("Enter_Send_To")}
                        />
                      </div>
                      <small id="errsendTo" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6">
                      <div className="mb-2">
                        <label htmlFor="netAmount" className="form-label">
                         {t("Received_By")}<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          name="Receivedby"
                          value={inputValues.Receivedby}
                          className="form-control form-control-sm"
                          id="Receivedby"
                          onChange={handleInputChange}
                          placeholder={t("Enter_Received_By")}
                        />
                      </div>
                      <small id="errReceivedby" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6">
                      <div className="mb-2">
                        <label htmlFor="netAmount" className="form-label">
                         {t("Destination")}<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          name="Destination"
                          value={inputValues.Destination}
                          className="form-control form-control-sm"
                          id="Destination"
                          onChange={handleInputChange}
                          placeholder={t("Enter_Destination")}
                        />
                      </div>
                      <small id="errDestination" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <div className="med-box">
                <div
                  className="med-table-section"
                  style={{ minHeight: "195px" }}
                >
                  <table className="med-table border_ striped billingTable">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>{t("Discription")}</th>
                        <th>{t("Item_Serial_No")}</th>
                        <th>{t("Quantity")}</th>
                        <th className="text-center">{t("Status")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => {
                        return (
                          <tr key={row.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                              <input
                                type="text"
                                id={`discription_${row.id}`}
                                name="discription"
                                value={row.discription}
                                onChange={(event) =>
                                  handleRowInputChange(event, row.id)
                                }
                                placeholder={t("Enter_Discription")}
                              />
                              
                            </td>

                            <td>
                              <input
                                type="text"
                                id={`serialNo_${row.id}`}
                                name="serialNo"
                                value={row.serialNo}
                                onChange={(event) =>
                                  handleRowInputChange(event, row.id)
                                }
                                placeholder={t("Enter_Serial_No")}
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                id={`quantity_${row.id}`}
                                name="quantity"
                                value={row.quantity}
                                onChange={(event) =>
                                  handleRowInputChange(event, row.id)
                                }
                                placeholder={t("Enter_Quantity")}
                              />
                            </td>
                            <td>
                              <div className="action-button">
                                <i class="bi bi-plus" onClick={addRow}></i>{" "}
                                &nbsp;
                                <i
                                  class="bi bi-trash3"
                                  onClick={() => removeRow(row.id)}
                                ></i>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-3">
              <div className="med-box">
                <div className="inner-content">
                  <div className="mb-2">
                    <label htmlFor="PaymentMode" className="form-label">
                      {t("Signature")} <span className="starMandatory">*</span>
                    </label>
                    <input
                      type="text"
                      name="signature"
                      id="signature"
                      value={inputValues.signature}
                      className="form-control form-control-sm"
                      onChange={handleInputChange}
                      placeholder={t("Signature")}
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    />
                     <small id="errsignature" className="form-text text-danger" style={{ display: 'none' }}></small>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="cardNo" className="form-label">
                      {t("Remark")}<span className="starMandatory"></span>
                    </label>
                    <input
                      type="text"
                      id="remark"
                      name="remark"
                      className="form-control form-control-sm"
                      value={inputValues.remark}
                      placeholder={t("Remark")}
                      onChange={handleInputChange}
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {showAlertToster === 1 ? (
              <AlertToster message={showMessage} handle={setShowAlertToster} />
            ) : (
              ""
            )}
            {showSuccessToster === 1 ? (
              <SuccessToster
                message={showMessage}
                handle={setShowSuccessToster}
              />
            ) : (
              ""
            )}
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="med-box">
                <div className="inner-content ">
                  <div className="mb-2 mt-2 relative">
                    <div>
                      <button
                        type="button"
                        className="btn btn-save btn-save-fill btn-sm mb-1_ me-1"
                        onClick={handleAddData}
                      >
                        <img src={saveButtonIcon} className="icnn" alt="" />
                        {t("Save")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-save btn-sm mb-1_ me-1"
                        onClick={resetForm}
                      >
                        <img src={imgReset} alt="" /> {t("Reset")}
                      </button>
                      {/* <button type="button" className="btn btn-save btn-sm mb-1_ me-1"><img src={imgPrint}/> Print</button>  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
