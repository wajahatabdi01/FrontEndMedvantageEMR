import React , { useState, useEffect }from 'react';
import zipCodeIcon from '../../../../assets/images/icons/zipCodeIcon.svg';
import stateIcon from '../../../../assets/images/icons/stateIcon.svg';
import city from '../../../../assets/images/icons/city.svg';
import smartphone from '../../../../assets/images/icons/smartphone.svg';
import emailIcon from '../../../../assets/images/icons/email.svg';
import { useTranslation } from 'react-i18next';
import GetStateList from '../../../API/GET/GetStateList'
import GetCityList from '../../../API/GET/GetCityList';
import GetCountryList from '../../../API/GET/GetCountryList';
const ContactDetails = ({ initialContactDetails,onContactDetailsChange }) => {
    let [cityList, setCityList] = useState([]);
    let [cityListAdd, setCityListAdd] = useState([]);
    let [stateList, setStateList] = useState([]);
    let [stateListAdd, setStateListAdd] = useState({});
    let [countryList, setCountryList] = useState([]);
    const [inputCount, setInputCount] = useState(0);
    const [inputValues, setInputValues] = useState(Array.from({ length: inputCount }, () => ''));
    const [contactDetails, setContactDetails] = useState({
        street: '',
        streetLine2: '',
        zipCode: '',
        motherName: '',
        emergencyContact: '',
        emergencyPhone: '',
        homePhone: '',
        workPhone: '',
        mobileNumber: '',
        email: '',
        emailDirect: ''
       
      });
    
      useEffect(() => {
        getCountryList();
        if (initialContactDetails) {
            setContactDetails(initialContactDetails);
        }
      }, [initialContactDetails]);
      let getCountryList = async()=>{
        console.log('fetch country');
        let response = await GetCountryList();
        console.log('fetch country',response);
        if(response.status === 1){
            setCountryList(response.responseValue);
            //getStateList(countryID);
            
           
        }
    }
    let onChangeCountry = async()=>{
        let countryID = document.getElementById('ddlCountry').value;
        getStateList(countryID);
    };
    let getStateList = async (val) => {
        let data = await GetStateList(val);
        setStateList(data.responseValue);
    }
  
    // Used to Get Value From Dropdown
   
      let getCityListByState = async () => {
        // clearErrorMessages();
        const stateID = document.getElementById('ddlState').value;
        if (stateID === "0" || stateID === undefined || stateID === null) {
            setCityList([]);
        }
        else {
            let data = await GetCityList(stateID);
            setCityList(data.responseValue);

        }


    }
    let onChangeCountryAdditional = async(index)=>{
        let countryID = document.getElementById('ddlCountry'+index).value;
        getStateListAdditional(index,countryID);
    };
    let getStateListAdditional = async (index,val) => {
        let data = await GetStateList(val);
        console.log(data);
        setStateListAdd({[index] : data.responseValue});
        console.log(stateListAdd);
    }
  
    // Used to Get Value From Dropdown
   
      let getCityListByStateAdditional = async (index) => {
        // clearErrorMessages();
        const stateID = document.getElementById('ddlState'+index).value;
        console.log(stateID)
        if (stateID === "0" || stateID === undefined || stateID === null) {
            setCityListAdd({[index]: []});
        }
        else {
            let data = await GetCityList(stateID);
            setCityListAdd({[index]: data.responseValue});
            

        }


    }
    
  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    onContactDetailsChange(name, value);
  };
  const handleAddInput = () => {
    setInputCount(prevCount => prevCount + 1);
    setInputValues(prevValues => [...prevValues, '']);
  };

  const handleInputChange = (index, value) => {
    setInputValues(prevValues => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleDeleteInput = (index) => {
    setInputCount(prevCount => prevCount - 1);
    setInputValues(prevValues => prevValues.filter((_, i) => i !== index));
  };
  const {t} = useTranslation();
  return (
   
    <><div className="col-2 mb-2">
          <label htmlFor="txtStreet" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Street")}</label>
          <input type="text" className="form-control form-control-sm" id="txtStreet" placeholder={t("Enter_Street")} name='street' value={contactDetails.street} onChange={handleContactDetailsChange} />
          <small id="errStreet" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div><div className="col-2 mb-2">
              <label htmlFor="txtStreetLine2" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("StreetLine2")}</label>
              <input type="text" className="form-control form-control-sm" id="txtStreetLine2" placeholder={t("Enter_StreetLine2")} name='streetLine2' value={contactDetails.streetLine2} onChange={handleContactDetailsChange} />
              <small id="errStreetLine2" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div>
          <div className="col-2 mb-2">
                                                    <label htmlFor="ddlCountry" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Country")}</label>
                                                    <select className="form-select form-select-sm" id="ddlCountry" aria-label=".form-select-sm example" onChange={onChangeCountry}>
                                                        <option value="0">{t("Select_Country")}</option>
                                                        {countryList && countryList.map((list) => {
                                                            
                                                                return (
                                                                    <option value={list.id}>{list.countryName}</option>
                                                                )
                                                            
                                                        })}
                                                    </select>
                                                    <small id="errCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-2 mb-2">
                                                <label htmlFor="ddlEmpty" className="form-label"></label>
          <button type="button" class="form-control form-control-sm" id="addCountry" >Add</button>
          </div>
          <div className="col-2 mb-2">
              <label htmlFor="ddlState" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("State")}</label><sup style={{ color: "red" }}>*</sup>
              <select className="form-select form-select-sm" id="ddlState" aria-label=".form-select-sm example" name='state' onChange={() => { getCityListByState(); } }>
                  <option value="0">{t("Select_State")}</option>
                  {stateList && stateList.map((list, index) => {

                      return (
                          <option value={list.id}>{list.stateName}</option>
                      );

                  })}

              </select>
              <small id="errState" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div>
          <div className="col-2 mb-2">
          <label htmlFor="ddlEmpty" className="form-label"></label>
          <button type="button" class="form-control form-control-sm" id="addState" >Add</button>
          </div>
          <div className="col-2 mb-2">
              <label htmlFor="ddlCity" className="form-label"><img src={city} className='icnn' alt='' />{t("City_Name")}</label><sup style={{ color: "red" }}>*</sup>
              <select className="form-select form-select-sm" id="ddlCity" aria-label=".form-select-sm example" onChange={handleContactDetailsChange}>
                  <option value="0">{t("Select_City_Name")}</option>
                  {cityList && cityList.map((list) => {

                      return (
                          <option value={list.id}>{list.name}</option>
                      );

                  })}
              </select>
              <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div>
          <div className="col-2 mb-2">
          <label htmlFor="ddlEmpty" className="form-label"></label>
          <button type="button" class="form-control form-control-sm" id="addCity" >Add</button>
          </div>
          <div className="col-2 mb-2">
              <label htmlFor="txtZip" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Zip")}</label>
              <input type="number" className="form-control form-control-sm" id="txtZip" placeholder={t("Enter_Zip_Code")} name='zipCode' value={contactDetails.zipCode} onChange={handleContactDetailsChange} />
              <small id="errZip" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div><div className="col-2 mb-2">
              <label htmlFor="txtMotherName" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Mother_Name")}</label>
              <input type="text" className="form-control form-control-sm" id="txtMotherName" placeholder={t("Enter_MotherName")} name='motherName' value={contactDetails.motherName} onChange={handleContactDetailsChange} />
              <small id="errMotherName" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div><div className="col-2 mb-2">
              <label htmlFor="txtEmergencyContact" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Emergency_Contact")}</label>
              <input type="text" className="form-control form-control-sm" id="txtEmergencyContact" placeholder={t("Enter_Emergency_Contact")} name='emergencyContact' value={contactDetails.emergencyContact} onChange={handleContactDetailsChange} />
              <small id="errEmergencyContact" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div><div className="col-2 mb-2">
              <label htmlFor="txtEmergencyPhone" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Emergency_Phone")}</label>
              <input type="text" className="form-control form-control-sm" id="txtEmergencyPhone" placeholder={t("Enter_Emergency_Phone")} name='emergencyPhone' value={contactDetails.emergencyPhone} onChange={handleContactDetailsChange} />
              <small id="errEmergencyPhone" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div><div className="col-2 mb-2">
              <label htmlFor="txtHomePhone" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Home_Phone")}</label>
              <input type="text" className="form-control form-control-sm" id="txtHomePhone" placeholder={t("Enter_Home_Phone")} name='homePhone' value={contactDetails.homePhone} onChange={handleContactDetailsChange} />
              <small id="errHomePhone" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div><div className="col-2 mb-2">
              <label htmlFor="txtWorkPhone" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Work_Phone")}</label>
              <input type="text" className="form-control form-control-sm" id="txtWorkPhone" placeholder={t("Enter_Work_Phone")} name='workPhone' value={contactDetails.workPhone} onChange={handleContactDetailsChange} />
              <small id="errWorkPhone" className="form-text text-danger" style={{ display: 'none' }}></small>
          </div><div className="col-2 mb-2">
              <label htmlFor="txtMobileNo" className="form-label">
                  <img src={smartphone} className='icnn' alt='' />
                  {t("MOBILE_NUMBER")}</label><sup style={{ color: "red" }}>*</sup>
              <div className='lft'>
                  <select className="form-select form-select-sm" id='ddlCountryCode' aria-label=".form-select-sm example"  style={{ borderRight: 'transparent', borderTopRightRadius: '0px', borderBottomRightRadius: '0px', width: '80px', padding: '0 5px 0 5px' }}>
                      {/* <option value='0'>+91</option> */}
                      {countryList && countryList.map((list, index) => {
                          if (list.id === 1) {
                              return (<option value={list.id} selected>{list.countryCode}</option>);
                          }
                          else {
                              return (
                                  <option value={list.id}>{list.countryCode}</option>
                              );

                          }

                      })}
                  </select>
                  <input type="number" className="form-control form-control-sm" id="txtMobileNo" placeholder={t("Mobile_Number")} name='mobileNumber' value={contactDetails.mobileNumber} onChange={handleContactDetailsChange} style={{ borderLeft: 'transparent', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} />
              </div>
              {/* <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalSetting"><i className="bi bi-gear-fill"></i></button> */}

              <small id="errMobile" className="form-text text-danger" style={{ display: 'none' }}>
              </small>
          </div><div className="col-2 mb-2">
              <label htmlFor="txtEmailAddress" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("EMAIL_ID")}</label>
              <input type="email" className="form-control form-control-sm" id="txtEmailAddress" placeholder={t("ENTER_EMAIL_ID")} name='email' value={contactDetails.email} onChange={handleContactDetailsChange} />
          </div><div className="col-2 mb-2">
              <label htmlFor="txtEmailDirect" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("EMAIL_ID_Email_Direct")}</label>
              <input type="email" className="form-control form-control-sm" id="txtEmailDirect" placeholder={t("ENTER_EMAIL_ID_Email_Direct")} name='emailDirect' value={contactDetails.emailDirect} onChange={handleContactDetailsChange} />
          </div>
          <div className="dflex">
          <div className="col-2 mb-2">
          <label htmlFor="ddlEmpty" className="form-label"></label>
          <button type="button" class="form-control form-control-sm" id="addCity" onClick={handleAddInput}>Additonal Address<img src={emailIcon} className='icnn' alt='' /></button>
          </div>
          
            </div>
             {/* Render existing input textboxes with delete buttons */}
      {inputValues.map((value, index) => (
        <><hr /><div className="dflex" key={index}>

              <div className="col-2 mb-2">
                  <label htmlFor={"ddlAddressUse" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Address_Use")}</label><sup style={{ color: "red" }}>*</sup>
                  <select className="form-select form-select-sm" id={"ddlAddressUse" + index} aria-label=".form-select-sm example" name={"addressUse" + index}>
                      <option value="0">{t("Address_Use")}</option>
                      {stateList && stateList.map((list, index) => {

                          return (
                              <option value={list.id}>{list.stateName}</option>
                          );

                      })}

                  </select>

              </div>

              <div className="col-2 mb-2">
                  <label htmlFor={"ddlAddressType" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Address_Type")}</label>

                  <select className="form-select form-select-sm" id={"ddlAddressType" + index} aria-label=".form-select-sm example" name={"addressType" + index}>
                      <option value="0">{t("Address_Type")}</option>
                      {stateList && stateList.map((list, index) => {

                          return (
                              <option value={list.id}>{list.stateName}</option>
                          );

                      })}

                  </select>


              </div>
              <div className="col-2 mb-2">
                  <label htmlFor={"txtStartDate" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Start_Date")}</label>
                  <input
                      type="date"
                      value={value}
                      id={"txtStartDate" + index}
                      className="form-control form-control-sm"
                      onChange={(e) => handleInputChange(index, e.target.value)} />

              </div>


              <div className="col-2 mb-2">
                  <label htmlFor={"txtEndDate" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("End_Date")}</label>
                  <input
                      type="date"
                      value={value}
                      id={"txtEndDate" + index}
                      className="form-control form-control-sm"
                      onChange={(e) => handleInputChange(index, e.target.value)} />

              </div>

              <div className="col-2 mb-2">
                  <label htmlFor={"txtEndDate" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("End_Date")}</label>
                  <input
                      type="date"
                      value={value}
                      id={"txtEndDate" + index}
                      className="form-control form-control-sm"
                      onChange={(e) => handleInputChange(index, e.target.value)} />

              </div>

              <div className="col-2 mb-2">
                  <label htmlFor={"txtStreet" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Street")}</label>
                  <input
                      type="text"
                      value={value}
                      id={"txtStreet" + index}
                      className="form-control form-control-sm"
                      onChange={(e) => handleInputChange(index, e.target.value)} />

              </div>

              <div className="col-2 mb-2">
                  <label htmlFor={"txtStreetLine2" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Street_Line2")}</label>
                  <input
                      type="text"
                      value={value}
                      id={"txtStreetLine2" + index}
                      className="form-control form-control-sm"
                      onChange={(e) => handleInputChange(index, e.target.value)} />

              </div>
              <div className="col-2 mb-2">
                  <label htmlFor={"ddlCountry" + index} className="form-label"><img src={city} className='icnn' alt='' />{t("Country")}</label>
                  <select className="form-select form-select-sm" id={"ddlCountry" + index} aria-label=".form-select-sm example" onChange={() => { onChangeCountryAdditional(index); } }>
                      <option value="0">{t("Select_Country")}</option>
                      {countryList && countryList.map((list) => {

                          return (
                              <option value={list.id}>{list.countryName}</option>
                          );

                      })}
                  </select>
                  <small id="errCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
              <div className="col-2 mb-2">
                  <label htmlFor="ddlEmpty" className="form-label"></label>
                  <button type="button" class="form-control form-control-sm" id="addCountryAdd">Add</button>
              </div>
              <div className="col-2 mb-2">
                  <label htmlFor={"ddlState" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("State")}</label><sup style={{ color: "red" }}>*</sup>
                  <select className="form-select form-select-sm" id={"ddlState" + index} aria-label=".form-select-sm example" name={'state' + index} onChange={() => { getCityListByStateAdditional(index); } }>
                      <option value="0">{t("Select_State")}</option>
                      {stateListAdd[index] && stateListAdd[index].map((list, index2) => {

                          return (
                              <option value={list.id}>{list.stateName}</option>
                          );

                      })}

                  </select>
                  <small id="errState" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
              <div className="col-2 mb-2">
                  <label htmlFor="ddlEmpty" className="form-label"></label>
                  <button type="button" class="form-control form-control-sm" id="addStateAdd">Add</button>
              </div>
              <div className="col-2 mb-2">
                  <label htmlFor={"ddlCity" + index} className="form-label"><img src={city} className='icnn' alt='' />{t("City_Name")}</label><sup style={{ color: "red" }}>*</sup>
                  <select className="form-select form-select-sm" id={"ddlCity" + index} aria-label=".form-select-sm example">
                      <option value="0">{t("Select_City_Name")}</option>
                      {cityListAdd[index] && cityListAdd[index].map((list) => {

                          return (
                              <option value={list.id}>{list.name}</option>
                          );

                      })}
                  </select>
                  <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
              <div className="col-2 mb-2">
                  <label htmlFor="ddlEmpty" className="form-label"></label>
                  <button type="button" class="form-control form-control-sm" id="addCityAdd">Add</button>
              </div>
              <div className="col-2 mb-2">
                  <label htmlFor="txtZip" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Zip")}</label>
                  <input type="number" className="form-control form-control-sm" id="txtZip" placeholder={t("Enter_Zip_Code")} name='zipCode' value={contactDetails.zipCode} onChange={handleContactDetailsChange} />
                  <small id="errZip" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>

          </div></>
      ))}
          
          </>

  );
};

export default ContactDetails;