import React, { useEffect, useState } from "react";
// import BoxContainer from '../../Components/BoxContainer';



//Icons
import ChangePassword from "./OPDRegistration/UserProfile/ChangePassword";
import UserProfile from "./OPDRegistration/UserProfile/UserProfile";
import UpdateProfile from "./OPDRegistration/UserProfile/UpdateProfile";
import HandleLanguage from '../../../src/Code/LanguageManage';
import languageIcon from "../../assets/images/icons/languageIcon.png";
import GetAllLanguageMaster from "./OPDRegistration/UserProfile/API/GetAllLanguageMaster";
import GetHeadListByUserId from "../../Dashboard/API/GetHeadListByUserId";
import { useNavigate } from "react-router-dom";
import GetMenuAndDeptByHeadId from "../../Dashboard/API/GetMenuAndDeptByHeadId";



export default function Profile() {
  const storedLanguageId = JSON.parse(window.sessionStorage.getItem('languageId'))?.languageId;
  const [LanguageList, setLanguagelist] = useState([]);
  const [Languageselect, setLanguageselect] = useState('1'); // Initialize with English (ID 1)
  const [selectedValue, setSelectedValue] = useState("0");  
  const navigate = useNavigate();
  const GetLanguageList = async () => {
    let langList = await GetAllLanguageMaster();
    if (langList.status === 1) {
      window.sessionStorage.setItem("LanguageData", JSON.stringify(langList.responseValue));
      setLanguagelist(langList.responseValue);
    }
  };
  
  const handleOnchange = async(e) => {
    const selectedLanguageId = e.target.value;
      console.log("data", selectedLanguageId)
      window.languageId  = selectedLanguageId
    setLanguageselect(selectedLanguageId);
    const selectedOption = LanguageList.find(val => val.id == selectedLanguageId);
    let res = await GetHeadListByUserId(selectedLanguageId)
    let wardId = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
    let respDepMenu = await GetMenuAndDeptByHeadId(wardId, selectedLanguageId)
    if(respDepMenu.status === 1)
    {
    console.log("sdasfs", respDepMenu)
      let data = JSON.parse(window.sessionStorage.getItem("departmentmenu"))
      data.departmentList = respDepMenu.responseValue.departmentList
      data.menuList = respDepMenu.responseValue.menuList
      window.sessionStorage.removeItem("departmentmenu")
      window.sessionStorage.setItem("departmentmenu",  JSON.stringify(data))
      window.location.reload()

    }
    if (res.status === 1) {
      let headData = JSON.parse(window.sessionStorage.getItem("LoginData"))
      headData.headList = res.responseValue
      window.sessionStorage.removeItem("LoginData")
      window.sessionStorage.setItem("LoginData",  JSON.stringify(headData))
      // window.location.reload()


    }
    if (selectedOption) {
      const abbreviation = selectedOption.abbrivation;
      const languageName = selectedOption.languageName;
      setSelectedValue(selectedOption);  
      HandleLanguage(abbreviation);
      const languageData = {
        languageId: selectedLanguageId,
        languageName: languageName,
      };
     
      const languageDataJSON = JSON.stringify(languageData);
      window.sessionStorage.setItem("languageId", languageDataJSON); 
      navigate(-1)

    }
  };
  
  useEffect(() => {
    if (!LanguageList.length) {
      GetLanguageList();
    }
  
    if (!storedLanguageId) {
      setLanguageselect('1');
    } else {
      setLanguageselect(storedLanguageId); 
      const selectedOption = LanguageList.find(val => val.id == storedLanguageId);
      if (selectedOption) {
        HandleLanguage(selectedOption.abbrivation);
      }
    }
  }, [LanguageList, storedLanguageId]);
  
  return (
    <div className="main-content mt-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 mt-2">

            <div className="tab-sec">
              <div className="tabbtnn">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">User Profile</button>
                  </li>
                  <li classNameass="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Change Password</button>
                  </li>
                </ul>
              </div>

              <div className="laguagesect mb-1">
                <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="Exit"></span>
                <div class="dropdown profile_dd-cnt">
                  <label htmlFor="ddlitemmaster" className="form-label selang"><img src={languageIcon} className="me-1" alt="" />Select Language</label><br />
                  <select className="selanghj" value={Languageselect} onChange={handleOnchange}>
                    {LanguageList && LanguageList.map((val, index) => {
                      return (
                        <option key={index} value={val.id}>{val.languageName}</option>
                        
                      )
                    })}
                  </select>
                  

                </div>
              </div>
            </div>

            <div className="tab-content customtabcontent" id="myTabContent">
              <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <UserProfile />
              </div>

              <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                <ChangePassword />
              </div>
            </div>




          </div>
        </div>
      </div>
    </div>

 

  );
}
