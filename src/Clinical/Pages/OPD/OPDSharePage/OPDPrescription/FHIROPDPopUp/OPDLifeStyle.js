import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import Heading from '../../../../../../Component/Heading';
import TableContainer from '../../../../../../Component/TableContainer';
import GetAllSmokingStatus from '../../../../../API/OPDLifestyle/GetAllSmokingStatus';
import InsertLifeStyleData from '../../../../../API/OPDLifestyle/InsertLifeStyleData';
import GetFamilyHistoryData from '../../../../../API/OPDLifestyle/GetFamilyHistoryData';
function OPDLifeStyle({ setShowToster }) {
    let [showLifeStyle, setShowLifestyle] = useState(1);
    let [smokingList, setSmokingList] = useState([]);
    let [familyHistoryList, setFamilyHistoryList] = useState([]);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)
    let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid :
        window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let [tobaccoDetails, setTobaccoDetails] = useState({
        name: '',
        tobaccoId: '',
        tobaccoStatus: '',
        code: "",
        date: '',
        status: '',
    })

    let getAllSmokingStatus = async () => {
        const response = await GetAllSmokingStatus();
        if (response.status === 1) {
            setSmokingList(response.responseValue);
        }
    }
    let getFamilyHistoryData = async () => {
        const response = await GetFamilyHistoryData(activeUHID);
        if (response.status === 1) {
            setFamilyHistoryList(response.responseValue);
        }
        console.log("getFamilyHistoryData", response)
    }
    const handleTobacco = (e) => {
        const selectTobaccoId = document.getElementById("ddlTobaccoId").value;
        const selectTobacco = document.getElementById("ddlTobaccoId");
        const selectedTobacco = selectTobacco.options[selectTobacco.selectedIndex].text;
        console.log("selectedTobacco", selectedTobacco);

        const { name, value } = e.target;
        let temData = "";
        for (var i = 0; i < smokingList.length; i++) {
            if (smokingList[i].id == value) {
                temData = smokingList[i].code;
                break;
            }
        }

        if (name === "tobaccoId") {
            console.log('temData', name)
            setTobaccoDetails((prev) => ({
                ...prev,
                [name]: value,
                "code": temData,
                "tobaccoStatus": selectedTobacco,
            }))
        }
        else {
            setTobaccoDetails((prev) => ({
                ...prev,
                [name]: value,
            }))
        }

        console.log('smokingList', smokingList);
    }

    let handleEdit = () => {
        setShowLifestyle(0);
    }
    let handleSave = async () => {
        // setShowLifestyle(1);
        const jsonTobaccoData = JSON.stringify([tobaccoDetails])
        console.log("jsonTobaccoData", jsonTobaccoData)
        const parsedTobaccoData = JSON.parse(jsonTobaccoData);
        const { name, tobaccoId, tobaccoStatus, code, date } = parsedTobaccoData[0];
        const tobaccoData = `${name}|${tobaccoId}|${tobaccoStatus}|${code}|${date}`;
        console.log("tobaccoData", tobaccoData);
        let sendData = {
            "jsonData": "",
            "rowId": 0,
            "uhid": activeUHID,
            "tobaccoData": tobaccoData,
            "coffeeData": "",
            "alcoholData": "",
            "reactionalDrugsData": "",
            "counsellingData": "",
            "excercisePatternData": "",
            "hazardousActivitiesData": "",
            "sleepPatternsData": "",
            "seatbeltUseData": "",
            "clientId": window.clientId,
            "userId": window.userId
        }
        console.log("sendData", sendData)
        return
        const response = await InsertLifeStyleData(sendData);
        if (response.status === 1) {
            setShowUnderProcess(0);
            setShowToster(8)
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
            // handleClear();
        }
        else {
            setShowUnderProcess(0)
            setShowAlertToster(1)
            setShowMessage(response.responseValue)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }


    let handleCancel = () => {
        setShowLifestyle(1);
    }

    useEffect(() => {
        getAllSmokingStatus();
        getFamilyHistoryData();
    }, [])
    return (
        <>
            {showLifeStyle === 1 ?
                <div className='lifestylelist'>
                    <div className="col-12 mt-2">
                        <div className='handlser'>
                            <Heading text="Lifestyle List" />
                            <div style={{ position: 'relative' }}>
                                <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={"handleSearch"} />
                                <span className="tblsericon"><i class="fas fa-search"></i></span>
                            </div>
                        </div>
                        <div className="med-table-section mt-2" style={{ "height": "35vh" }}>
                            <TableContainer>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Status & Code</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {familyHistoryList && familyHistoryList.map((item, index) => {
                                        const tobaccoListItem = item.tobacco.split('|');
                                        return (
                                            <>
                                                <tr>
                                                    <td>Tobacco</td>
                                                    <td>{tobaccoListItem[0]}</td>
                                                    <td>{`${tobaccoListItem[2]} (${tobaccoListItem[3]})`}</td>
                                                    <td>{tobaccoListItem[4]}</td>
                                                </tr>
                                                <tr>
                                                    <td>Coffee</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Alcohol</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Recreational Drugs</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Counseling</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Exercise Patterns</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Hazardous Activities</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </>
                                        )
                                    })}


                                </tbody>
                            </TableContainer>
                            <div class="modal-footer">
                                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleEdit}><img src={saveButtonIcon} className='icnn' alt='' /> Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='lifestylesbmt'>
                    <div className='whitebg_'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Tobacco")}</span>
                                        <div className='ModalFields'>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Name<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" value={tobaccoDetails.name} className="form-control form-control-sm" placeholder={t("Enter Name")} onChange={handleTobacco} />
                                                <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="code" className="form-label">Tobacco Status<span className="starMandatory"></span></label>
                                                <select className="form-select form-select-sm" id="ddlTobaccoId" aria-label=".form-select-sm example" name='tobaccoId' onChange={handleTobacco} style={{ maxWidth: '180px' }}>
                                                    <option value="0" selected>Select</option>
                                                    {smokingList && smokingList.map((list) => {
                                                        return (
                                                            <option value={list.id} >{list.name}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                <div className='lifestyleStatus'>

                                                <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1" />
                                                        <label class="form-check-label" for="inlineRadio2">Current </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label class="form-check-label" for="inlineRadio2">Quit </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" />
                                                        <label class="form-check-label" for="inlineRadio2">Never  </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" />
                                                        <label class="form-check-label" for="inlineRadio2">N/A </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Code<span className="starMandatory"></span></label>
                                                <input type="text" name="code" value={tobaccoDetails.code} id="code" className="lifestylecode form-control form-control-sm" placeholder={t("Code")} readOnly />
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                <input type="date" name="date" id="date" className="form-control form-control-sm" onChange={handleTobacco} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------------------------------------------------------------Coffee----------------------------------------------- */}
                    <div className='whitebg_'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Coffee")}</span>
                                        <div className='ModalFields'>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Name<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="form-control form-control-sm" placeholder={t("Enter Name")} />
                                                <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                <div className='lifestyleStatus'>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                        <label class="form-check-label" for="inlineRadio1">Current </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label class="form-check-label" for="inlineRadio2">Quit </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" />
                                                        <label class="form-check-label" for="inlineRadio2">Never  </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" />
                                                        <label class="form-check-label" for="inlineRadio2">N/A </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Code<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="lifestylecode form-control form-control-sm" placeholder={t("Code")} readOnly />
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                <input type="date" name="name" id="name" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------------------------------------Alcohol----------------------------------------------- */}
                    <div className='whitebg_'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Alcohol")}</span>
                                        <div className='ModalFields'>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Name<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="form-control form-control-sm" placeholder={t("Enter Name")} />
                                                <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                <div className='lifestyleStatus'>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                        <label class="form-check-label" for="inlineRadio1">Current </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label class="form-check-label" for="inlineRadio2">Quit </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" />
                                                        <label class="form-check-label" for="inlineRadio2">Never  </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" />
                                                        <label class="form-check-label" for="inlineRadio2">N/A </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Code<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="lifestylecode form-control form-control-sm" placeholder={t("Code")} readOnly />
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                <input type="date" name="name" id="name" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------------------------------------Recreational Drugs----------------------------------------------- */}
                    <div className='whitebg_'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Recreational Drugs")}</span>
                                        <div className='ModalFields'>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Name<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="form-control form-control-sm" placeholder={t("Enter Name")} />
                                                <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                <div className='lifestyleStatus'>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                        <label class="form-check-label" for="inlineRadio1">Current </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label class="form-check-label" for="inlineRadio2">Quit </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" />
                                                        <label class="form-check-label" for="inlineRadio2">Never  </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" />
                                                        <label class="form-check-label" for="inlineRadio2">N/A </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Code<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="lifestylecode form-control form-control-sm" placeholder={t("Code")} readOnly />
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                <input type="date" name="name" id="name" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------------------------------------Counseling----------------------------------------------- */}
                    <div className='whitebg_'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Counseling")}</span>
                                        <div className='ModalFields'>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Name<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="form-control form-control-sm" placeholder={t("Enter Name")} />
                                                <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                <div className='lifestyleStatus'>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                        <label class="form-check-label" for="inlineRadio1">Current </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label class="form-check-label" for="inlineRadio2">Quit </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" />
                                                        <label class="form-check-label" for="inlineRadio2">Never  </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" />
                                                        <label class="form-check-label" for="inlineRadio2">N/A </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Code<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="lifestylecode form-control form-control-sm" placeholder={t("Code")} readOnly />
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                <input type="date" name="name" id="name" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------------------------------------Exercise Patterns----------------------------------------------- */}
                    <div className='whitebg_'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Exercise Patterns")}</span>
                                        <div className='ModalFields'>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Name<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="form-control form-control-sm" placeholder={t("Enter Name")} />
                                                <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                <div className='lifestyleStatus'>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                        <label class="form-check-label" for="inlineRadio1">Current </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label class="form-check-label" for="inlineRadio2">Quit </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" />
                                                        <label class="form-check-label" for="inlineRadio2">Never  </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" />
                                                        <label class="form-check-label" for="inlineRadio2">N/A </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Code<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="lifestylecode form-control form-control-sm" placeholder={t("Code")} readOnly />
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                <input type="date" name="name" id="name" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------------------------------------Hazardous Activities----------------------------------------------- */}
                    <div className='whitebg_'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Hazardous Activities")}</span>
                                        <div className='ModalFields'>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Name<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="form-control form-control-sm" placeholder={t("Enter Name")} />
                                                <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                <div className='lifestyleStatus'>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                        <label class="form-check-label" for="inlineRadio1">Current </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                        <label class="form-check-label" for="inlineRadio2">Quit </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" />
                                                        <label class="form-check-label" for="inlineRadio2">Never  </label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" />
                                                        <label class="form-check-label" for="inlineRadio2">N/A </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Code<span className="starMandatory"></span></label>
                                                <input type="text" name="name" id="name" className="lifestylecode form-control form-control-sm" placeholder={t("Code")} readOnly />
                                            </div>
                                            <div className="ModalFields-inn">
                                                <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                <input type="date" name="name" id="name" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel}><img src={clearIcon} className='icnn' alt='' /> Cancel</button>
                        </div>
                    </div>
                </div>}



        </>
    )
}

export default OPDLifeStyle
