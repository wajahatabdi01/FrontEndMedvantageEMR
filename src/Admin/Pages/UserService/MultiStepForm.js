// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react'


import Heading from "../../../Component/Heading";
import CheckboxToggle from "./CheckboxToggle";
import BoxContainer from "../../../Component/BoxContainer";
import UserIcon from "../../../assets/images/icons/UserIcon.svg";
import IconPassword from "../../../assets/images/icons/IconPassword.svg";
import IconMobile from "../../../assets/images/icons/IconMobile.svg";
import IconUserType from "../../../assets/images/icons/IconUserType.svg";
import IconUserId from "../../../assets/images/icons/IconUserId.svg";
import IconRole from "../../../assets/images/icons/IconRole.svg";
import IconEmail from "../../../assets/images/icons/IconEmail.svg";
import IconLogin from "../../../assets/images/icons/IconLogin.svg";
import IconShowOTP from "../../../assets/images/icons/IconShowOTP.svg";
import IconDepartment from "../../../assets/images/icons/IconDepartment.svg";
import savebtn from "../../../assets/images/icons/savebtn.svg";
import deletebtn from "../../../assets/images/icons/deletebtn.svg";
import editbtn1 from "../../../assets/images/icons/editbtn1.svg";
 


function MultiStepForm() {


  
  const [checkMenu, setCheckMenu] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
 

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleToggle = (e) => {
    const { name } = e.target;
    let status = checkMenu.some((item) => item.itemName === name);
    if (!status) {
      checkMenu.push({ itemName: name });

      setCheckMenu([...checkMenu]);
    } else {
      let newCheckMenu = checkMenu.filter((item) => item.itemName !== name);

      setCheckMenu(newCheckMenu);
    }
  };


  return (
    <div className="App">
       
       {/* <FontAwesomeIcon icon={icons} onClick={() => {setIcon('faTimes')}}/> */}

      {step === 1 && (
        <div>
        {/* ---------------------------------------------User Details Section------------------------------------------------------- */}
          {/* <h2>Step 1: Name</h2> */}
          <div className="col-12">
              {/* <Heading text="User Master" /> */}
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className="fieldse">User Master</span>
                  <div className="row mt-2 px-2">
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={UserIcon} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Employee Number<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter employee number"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={UserIcon} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          User Name<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter user name"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconPassword} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Password<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter password"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={UserIcon} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Display Name<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter name"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconMobile} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Mobile Number<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter mobile number"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconMobile} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          OTP Mobile Number<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter OTP mobile number"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconUserType} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          User Type<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter User Type"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconUserId} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Designation<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter employee number"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconUserType} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Active<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter employee number"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconRole} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Role<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter employee number"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconEmail} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Email ID<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter email id"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconLogin} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Login Status<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Enter login status"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconShowOTP} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Login OTP Status<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Login otp status"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                      <div className="mb-2">
                        <img src={IconDepartment} className="icnn" alt="" />
                        <label htmlFor="empID*" className="form-label">
                          Department<span className="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="empID"
                          name="empID"
                          placeholder="Select Department"
                        />
                        <small
                          id=""
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}

      {step === 2 && (
        
        <div>
          {/* <h2>Step 2:</h2> */}
          {/* ---------------------------------------------Assign Head Section------------------------------------------------------- */}
          <div className="col-12">
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className="fieldse">Assign Head</span>
                  <div className="row mt-2 px-2">
                    <div className="col-sm-10">
                      <ul className="headList">
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="All"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="All">Select All</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row mt-2 px-2">
                    <div className="col-sm-12">
                      <ul className="headList">
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin1"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin1">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin2"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin2">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin3"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin3">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin4"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin4">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin5"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin5">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin6"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin6">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin7"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin7">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin8"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin8">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin9"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin9">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin10"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin10">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin11"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin11">Admin</label>
                        </li>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="admin12"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="admin12">Admin</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}

      {step === 3 && (
        <div>
          {/* <h2>Step 3:</h2> */}
          {/* ---------------------------------------------Assign Department Section------------------------------------------------------- */}

          <div className="col-12">
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className="fieldse">Assign Department</span>
                  <div className="row mt-2 px-2">
                    <div className="col-sm-10">
                      <ul className="headList">
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="All"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="All">Select All</label>
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-2" style={{ float: "right" }}>
                      <div className="mb-2 me-2">
                        <select
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>Select Head</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 px-2">
                    <div className="col-sm-12">

                      <ul id="myUL" className="userIdMasterUl headList">
                        <li className="multi Headlist-in regularCheck d-flex gap-1">
                          <span className="caret"></span>{" "}
                          <input type="checkbox" id="Admin" value="Admin" />{" "}
                          <label for="Admin">Admin</label>
                          <ul className="nested">
                            <li className="crud">
                              <div className="form-check">
                                <input type="checkbox" id="Save" value="Save" />
                              </div>{" "}
                              <label for="Save">Save</label>
                            </li>
                            <li className="crud">
                              <div className="form-check">
                                <input type="checkbox" id="Edit" value="Edit" />
                              </div>{" "}
                              <label for="Edit">Edit</label>
                            </li>
                            <li className="crud">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  id="Delete"
                                  value="Delete"
                                />
                              </div>{" "}
                              <label for="Delete">Delete</label>
                            </li>
                          </ul>
                        </li>

                        <li className="multi">
                          <div className='orangechk'>
                          <label for="BedCensus"><span className="caret"></span>{" "}</label>
                          <input
                            type="checkbox"
                            id="BedCensus"
                            value="BedCensus"
                            onChange={handleToggle}
                            name="a"
                          />{" "}
                          <label for="BedCensus">Bed Census</label>
                          </div>
                          <div className='graycheckbox'>
                          <ul
                            className={`nested ${
                              checkMenu.some((item) => item.itemName === "a")
                                ? "active"
                                : ""
                            }`}
                          >
                            <li className="crudP">
                              <input
                                type="checkbox"
                                id="BioChemistry"
                                value="BioChemistry"
                              />{" "}
                              <label for="BioChemistry">Bio Chemistry</label>
                            </li>
                            <li className="crud">
                              <input type="checkbox" id="Save" value="Save" />{" "}
                              <label for="Save"> <img src={savebtn} className="icnnchk" alt="" /> Save</label>
                            </li>
                            <li className="crud">
                              <input type="checkbox" id="Edit" value="Edit" />{" "}
                              <label for="Edit"><img src={editbtn1} className="icnnchk" alt="" /> Edit</label>
                            </li>
                            <li className="crud">
                              <input
                                type="checkbox"
                                id="Delete"
                                value="Delete"
                              />{" "}
                              <label for="Delete"><img src={deletebtn} className="icnnchk" alt="" />Delete</label>
                            </li>

                            <li className="crudP">
                              <input
                                type="checkbox"
                                id="BioChemistry2"
                                value="BioChemistry2"
                              />{" "}
                              <label for="BioChemistry">Bio Chemistry 2</label>
                            </li>
                            <li className="crud">
                              <input type="checkbox" id="Save" value="Save" />{" "}
                              <label for="Save"><img src={savebtn} className="icnnchk" alt="" />Save</label>
                            </li>
                            <li className="crud">
                              <input type="checkbox" id="Edit" value="Edit" />{" "}
                              <label for="Edit"><img src={editbtn1} className="icnnchk" alt="" />Edit</label>
                            </li>
                            <li className="crud">
                              <input
                                type="checkbox"
                                id="Delete"
                                value="Delete"
                              />{" "}
                              <label for="Delete"><img src={deletebtn} className="icnnchk" alt="" />Delete</label>
                            </li>
                          </ul>
                          </div>
                        </li>

                        <li className="multi">
                          <div className='orangechk'>
                          <label for="BedCensus1"><span className="caret"></span>{" "}</label>
                          <input
                            type="checkbox"
                            id="BedCensus1"
                            value="BedCensus1"
                            onChange={handleToggle}
                            name="b"
                          />{" "}
                          <label for="BedCensus">Bed Census</label>
                          </div>
                          <div className='graycheckbox'>
                          <ul
                            className={`nested ${
                              checkMenu.some((item) => item.itemName === "b")
                                ? "active"
                                : ""
                            }`}
                          >
                            <li className="crudP">
                              <input
                                type="checkbox"
                                id="BioChemistry"
                                value="BioChemistry"
                              />{" "}
                              <label for="BioChemistry">Bio Chemistry2</label>
                            </li>
                            <li className="crud">
                              <input type="checkbox" id="Save" value="Save" />{" "}
                              <label for="Save"> <img src={savebtn} className="icnnchk" alt="" /> Save</label>
                            </li>
                            <li className="crud">
                              <input type="checkbox" id="Edit" value="Edit" />{" "}
                              <label for="Edit"><img src={editbtn1} className="icnnchk" alt="" /> Edit</label>
                            </li>
                            <li className="crud">
                              <input
                                type="checkbox"
                                id="Delete"
                                value="Delete"
                              />{" "}
                              <label for="Delete"><img src={deletebtn} className="icnnchk" alt="" />Delete</label>
                            </li>

                            <li className="crudP">
                              <input
                                type="checkbox"
                                id="BioChemistry2"
                                value="BioChemistry2"
                              />{" "}
                              <label for="BioChemistry">Bio Chemistry 2</label>
                            </li>
                            <li className="crud">
                              <input type="checkbox" id="Save" value="Save" />{" "}
                              <label for="Save"><img src={savebtn} className="icnnchk" alt="" />Save</label>
                            </li>
                            <li className="crud">
                              <input type="checkbox" id="Edit" value="Edit" />{" "}
                              <label for="Edit"><img src={editbtn1} className="icnnchk" alt="" />Edit</label>
                            </li>
                            <li className="crud">
                              <input
                                type="checkbox"
                                id="Delete"
                                value="Delete"
                              />{" "}
                              <label for="Delete"><img src={deletebtn} className="icnnchk" alt="" />Delete</label>
                            </li>
                          </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}

     {step === 4 && (
        <div>
          {/* <h2>Step 4:</h2> */}
          {/* ---------------------------------------------Assign Menu Section------------------------------------------------------- */}

          <div className="col-12">
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className="fieldse">Assign Menu</span>
                  <div className="row mt-2 px-2">
                    <div className="col-sm-10">
                      <ul className="headList">
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="All"
                              name="863"
                              value="true"
                            />
                          </div>
                          <label htmlFor="All">Select All</label>
                        </li>
                      </ul>
                    </div>
                  
                  </div>
                  <div className="row mt-2 px-2">
                    <div className="col-sm-12">
                     <CheckboxToggle/>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
          {/* ---------------------------------------------Button Section------------------------------------------------------- */}

      <div>
        <div className="rt-btns">
        <button  type="button" className="btn btn-save btn-sm mb-1 me-1"><i className="far fa-save me-1"></i>Save</button>

          {step > 1 && (
            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlePrevious}><i className="fas fa-angle-double-left me-1"></i> Previous</button>
          )}
          {step < 4 && ( 
            <button  type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleNext}><i className="fas fa-angle-double-right me-1"></i> Next</button>
          )}
          
        </div>
      </div>
    </div>
  );
}


export default MultiStepForm;