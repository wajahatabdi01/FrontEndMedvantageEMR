import React, { useEffect, useState } from "react";
import plus from "../../assets/images/icons/icons8-plus-30.png";
import editIcon from "../../assets/images/icons/icons8-pencil-30.png";
import deleteIcon from "../../assets/images/icons/icons8-delete-30.png";
import FHIRGetAllPrescriptionListByUHID from "../API/GET/FHIRGetAllPrescriptionListByUHID";
import FHIRAddPrescription from "./FHIRAddPrescription";
import FHIRDeletePrescriptionList from "../API/DELETE/FHIRDeletePrescriptionList";

export default function FHIRPrescreptionList(props) {
  const [prescreptionList, setPrescreptionList] = useState([]);
  let [showToster, setShowToster] = useState("");
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const funGetAllList = async () => {
    let activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid:[]
    const listRes = await FHIRGetAllPrescriptionListByUHID(activeUHID, clientID);
    if (listRes.status === 1) {
      console.log("calllllllllllllllleedddddddddddddddddd : ");
      console.log("listRes : ", listRes);
      setPrescreptionList(listRes.responseValue);
    }
  };

  const handleDelete = async (rowId) => {
    const deleteRes = await FHIRDeletePrescriptionList(rowId);
    if(deleteRes.status === 1){
      funGetAllList();
    }
  }
  useEffect(() => {
    // console.log('activeUhid : ', activeUhid)
    funGetAllList();
    console.log("Changesss", )
  }, [props]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div className="inner-content">
                <div className="row">
                  <div className="fieldsett-in col-md-12">
                    <div className="fieldsett">
                      <div className="fieldse">
                        <span className="fieldse">Prescription List</span>
                        <div className="col-12 mt-2">
                          <div
                            className="med-table-section"
                            style={{ maxHeight: "75vh" }}
                          >
                            <table
                              className="med-table striped"
                              style={{ borderBottom: "1px solid #dddddd" }}
                            >
                              <thead style={{ zIndex: "0" }}>
                                <tr>
                                  <th style={{ width: "5%" }}>#</th>
                                  <th>Drug</th>
                                  <th>RxNorm</th>
                                  <th>Created Date</th>
                                  <th>Changed Date</th>
                                  <th>Dosage</th>
                                  <th>Qty.</th>
                                  <th>Unit</th>
                                  <th>Refills </th>
                                  <th>Provider</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {prescreptionList &&
                                  prescreptionList.map((list, ind) => {
                                    return (
                                      <tr>
                                        <td>{ind + 1}</td>
                                        <td>{list.drug}</td>
                                        <td>{list.rxnormDrugCode}</td>
                                        <td>{list.startingDate}</td>
                                        <td>{list.startingDate}</td>
                                        <td>{list.dosage}</td>
                                        <td>{list.quantity}</td>
                                        <td>{list.unit}</td>
                                        <td>{list.refills}</td>
                                        <td>{list.providerId}</td>
                                        <td>
                                          <button
                                            type="button"
                                            className="btn btn-danger btn-sm btn-danger-fill mb-1 me-1" onClick={() => {
                                              handleDelete(list.id)
                                            }}
                                          >
                                            <img
                                              src={deleteIcon}
                                              className="icnn"
                                              alt=""
                                            />{" "}
                                            Delete
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-save btn-save-fill btn-sm mb-1 me-1"
                                            onClick={""}
                                          >
                                            <img
                                              src={editIcon}
                                              className="icnn"
                                              alt=""
                                            />{" "}
                                            Edit
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-save btn-save-fill btn-sm mb-1 me-1 mt-2"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal2"
                              onClick={()=>{props.setPrecription(0)}}
                            >
                              <img src={plus} className="icnn" alt="" />
                              Add
                            </button>
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
      </div>
    </>
  );
}
