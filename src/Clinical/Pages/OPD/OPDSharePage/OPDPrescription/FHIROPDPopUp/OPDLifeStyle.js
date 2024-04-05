import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import Heading from '../../../../../../Component/Heading';
import TableContainer from '../../../../../../Component/TableContainer';
import GetAllSmokingStatus from '../../../../../API/OPDLifestyle/GetAllSmokingStatus';
import InsertLifeStyleData from '../../../../../API/OPDLifestyle/InsertLifeStyleData';
import GetFamilyHistoryData from '../../../../../API/OPDLifestyle/GetFamilyHistoryData';
import SuccessToster from '../../../../../../Component/SuccessToster';
function OPDLifeStyle({ theEncounterId, showLifeStyle, setShowLifestyle }) {
    console.log("param===========>", theEncounterId)
    // let [showLifeStyle, setShowLifestyle] = useState(1);
    let [encounterId, setEncounterId] = useState(0);
    let [smokingList, setSmokingList] = useState([]);
    let [familyHistoryList, setFamilyHistoryList] = useState([]);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0)
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)
    let [rowId, setRowId] = useState(0);
    const [isShow, setisShow] = useState('');

    let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid :
        window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];
    const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

    const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

    let [tobaccoDetails, setTobaccoDetails] = useState({ name: '', tobaccoId: '', tobaccoStatus: '', code: "", date: '', lifestylestatus: '', });

    let [coffeDetails, setCoffeDetails] = useState({ coffeeName: '', Coffeelifestylestatus: '', coffeedate: '', });
    let [alcoholDetails, setAlcoholDetails] = useState({ alcoholName: '', alcohollifestylestatus: '', alcoholdate: '', });
    let [recreationalDetails, setRecreationalDetails] = useState({ recreationalName: '', recreationallifestylestatus: '', recreationaldate: '', });
    let [counselingDetails, setCounselingDetails] = useState({ counselingName: '', counselinglifestylestatus: '', counselingdate: '', });
    let [exerciseDetails, setExerciseDetails] = useState({ exerciseName: '', exerciselifestylestatus: '', exercisedate: '', });
    let [hazardousDetails, setHazardousDetails] = useState({ hazardousName: '', hazardouslifestylestatus: '', hazardousdate: '', });


    let getAllSmokingStatus = async () => {
        const response = await GetAllSmokingStatus();
        if (response.status === 1) {
            setSmokingList(response.responseValue);
        }
    }
    console.log("encounterId", encounterId)
    let getFamilyHistoryData = async () => {
        const param = {
            Uhid: activeUHID,
            HistoryType: 2,
            clientID: clientID,
            encounterId: theEncounterId || 0
        }
        const response = await GetFamilyHistoryData(param);
        if (response.status === 1) {
            setFamilyHistoryList(response.responseValue);
        }
        // let tt = response.responseValue.map((item, index) => {
        //     const tobaccoListItem = item.tobacco.split('|');
        //     return tobaccoListItem;
        // });
    }
    const handleTobacco = (e) => {
        const { name, value } = e.target;
        if (parseInt(value) === 1 || parseInt(value) === 2 || parseInt(value) === 7 || parseInt(value) === 8) {
            setisShow('Current');
        }
        else if (parseInt(value) === 3) {
            setisShow('Quit');
        }
        else if (parseInt(value) === 4) {
            setisShow('Never');
        }
        else if (parseInt(value) === 5 || parseInt(value) === 6) {
            setisShow('N/A');
        }
        else {
            setisShow('')
        }
        const selectTobacco = document.getElementById("ddlTobaccoId");
        const selectedTobacco = selectTobacco.options[selectTobacco.selectedIndex].text;
        // const checkedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');
        // const getRadio = checkedRadio ? checkedRadio.value : '';
        let temData = "";
        for (var i = 0; i < smokingList.length; i++) {
            if (smokingList[i].id == value) {
                temData = smokingList[i].code;
                break;
            }
        }

        if (name === "tobaccoId") {

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
                "lifestylestatus": isShow
            }))
        }

    }
    const handleRadioTobacco = (param, key) => {

        let temDataNew = "";
        document.getElementById("ddlTobaccoId").value = key;
        const selectTobacco = document.getElementById("ddlTobaccoId");
        const selectedTobacco = selectTobacco.options[selectTobacco.selectedIndex].text;
        setisShow(param);
        for (var i = 0; i < smokingList.length; i++) {
            if (smokingList[i].id == key) {
                temDataNew = smokingList[i].code;
                break;
            }
        }
        setTobaccoDetails((prev) => ({
            ...prev,
            "tobaccoId": key,
            "code": temDataNew,
            "tobaccoStatus": selectedTobacco,
            "lifestylestatus": param
        }))

    }
    let handleCoffe = (e) => {
        const { name, value } = e.target;
        setCoffeDetails((prev) => ({
            ...prev,
            [name]: value,
            "lifestylestatus": value
        }))
    }
    let handleAlcohol = (e) => {
        const { name, value } = e.target;
        setAlcoholDetails((prev) => ({
            ...prev,
            [name]: value,
            "lifestylestatus": value
        }))
    }
    let handleRecreational = (e) => {
        const { name, value } = e.target;
        setRecreationalDetails((prev) => ({
            ...prev,
            [name]: value,
            "lifestylestatus": value
        }))
    }
    let handleCounseling = (e) => {
        const { name, value } = e.target;
        setCounselingDetails((prev) => ({
            ...prev,
            [name]: value,
            "lifestylestatus": value
        }))
    }
    let handleExercise = (e) => {
        const { name, value } = e.target;
        setExerciseDetails((prev) => ({
            ...prev,
            [name]: value,
            "lifestylestatus": value
        }))
    }
    let handleHazardous = (e) => {
        const { name, value } = e.target;
        setHazardousDetails((prev) => ({
            ...prev,
            [name]: value,
            "lifestylestatus": value
        }))
    }
    // const handleCommon = (param,type)=>{
    //     if(type === 'Coffe'){
    //         console.log('param',param,key);
    //         let temDataNew="";
    //         setisShowCoffe(param);
    //         for (var i = 0; i < smokingList.length; i++) {
    //             if (smokingList[i].id == key) {
    //                 temDataNew = smokingList[i].code;
    //                 break;
    //             }
    //         }
    //         setTobaccoDetails((prev) => ({
    //             ...prev,
    //             "tobaccoId": key,
    //             "code": param,
    //             "tobaccoStatus": selectedTobacco,
    //         }))
    //     }
    //     else if(type === 'hhdsfd'){

    //     }


    // } 
    // Function to format date as "yyyy-MM-dd"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    let handleEdit = async () => {
        const param = {
            Uhid: activeUHID,
            HistoryType: 2,
            clientID: clientID,
            encounterId: theEncounterId || 0
        }
        console.log('param', param)
        setShowLifestyle(0);
        const response = await GetFamilyHistoryData(param);
        if (response.status === 1 && response.responseValue && response.responseValue.length > 0) {
            const tobaccoData = response.responseValue.map((item, index) => {
                console.log("item", item.id)
                if (item.tobacco) { // Check if item.tobacco is not null
                    const tobaccoListItem = item.tobacco.split('|');
                    setRowId(item.id);
                    return tobaccoListItem;
                } else {
                    return null; // Handle the case where item.tobacco is null
                }
            });
            const coffeeData = response.responseValue.map((item, index) => {
                if (item.coffee) { // Check if item.coffee is not null
                    const coffeeListItem = item.coffee.split('|');
                    setRowId(item.id);
                    return coffeeListItem;
                }
                else {
                    return null; // Handle the case where item.coffee is null
                }
            });
            const alcoholData = response.responseValue.map((item, index) => {
                if (item.alcohol) { // Check if item.alcohol is not null
                    const alcoholListItem = item.alcohol.split('|');
                    setRowId(item.id);
                    return alcoholListItem;
                }
                else {
                    return null; // Handle the case where item.tobacco is null
                }
            });
            const recreationalData = response.responseValue.map((item, index) => {
                if (item.recreational_drugs) { // Check if item.recreational_drugs is not null
                    const recreationaldrugsListItem = item.recreational_drugs.split('|');
                    setRowId(item.id);
                    return recreationaldrugsListItem;
                }

                else {
                    return null; // Handle the case where item.recreational_drugs is null
                }
            });
            const counselingData = response.responseValue.map((item, index) => {
                if (item.counseling) { // Check if item.counseling is not null
                    const counselingListItem = item.counseling.split('|');
                    setRowId(item.id);
                    return counselingListItem;
                }
                else {
                    return null; // Handle the case where item.counseling is null
                }
            });
            const exerciseData = response.responseValue.map((item, index) => {
                if (item.exercise_patterns) { // Check if item.exercise_patterns is not null
                    const exerciseListItem = item.exercise_patterns.split('|');
                    setRowId(item.id);
                    return exerciseListItem;
                }
                else {
                    return null; // Handle the case where item.exercise_patterns is null
                }
            });
            const hazardousData = response.responseValue.map((item, index) => {
                if (item.hazardous_activities) { // Check if item.hazardous_activities is not null
                    const hazardousListItem = item.hazardous_activities.split('|');
                    setRowId(item.id);
                    return hazardousListItem;
                }
                else {
                    return null; // Handle the case where item.hazardous_activities is null
                }
            });

            const validTobaccoData = tobaccoData.filter(item => item !== null); // Filter out null items
            const validCoffeeData = coffeeData.filter(item => item !== null); // Filter out null items
            const validAlcoholData = alcoholData.filter(item => item !== null); // Filter out null items
            const validRecreationalData = recreationalData.filter(item => item !== null); // Filter out null items
            const validCounselingData = counselingData.filter(item => item !== null); // Filter out null items
            const validExerciseData = exerciseData.filter(item => item !== null); // Filter out null items
            const validHazardousData = hazardousData.filter(item => item !== null); // Filter out null items

            if (validTobaccoData.length > 0) {
                const firstTobaccoItem = validTobaccoData[0];
                console.log("firstTobaccoItem", firstTobaccoItem)
                const dateValue = firstTobaccoItem[4] ? formatDate(firstTobaccoItem[4]) : '';
                const lifestyleStatus = firstTobaccoItem[5];
                setisShow(lifestyleStatus)
                document.getElementById("ddlTobaccoId").value = firstTobaccoItem[1];
                setTobaccoDetails((prev) => ({
                    ...prev,
                    "name": firstTobaccoItem[0],
                    "tobaccoId": firstTobaccoItem[1],
                    "code": firstTobaccoItem[3],
                    "date": dateValue,
                    "lifestylestatus": isShow,
                }));
            }
            if (validCoffeeData.length > 0) {
                const firstCoffeeItem = validCoffeeData[0];

                const dateValue = firstCoffeeItem[2] ? formatDate(firstCoffeeItem[2]) : '';
                setCoffeDetails((prev) => ({
                    ...prev,
                    "coffeeName": firstCoffeeItem[0],
                    "Coffeelifestylestatus": firstCoffeeItem[1],
                    "coffeedate": dateValue,
                }));
            }
            if (validAlcoholData.length > 0) {
                const firstAlcoholItem = validAlcoholData[0];

                const dateValue = firstAlcoholItem[2] ? formatDate(firstAlcoholItem[2]) : '';
                setAlcoholDetails((prev) => ({
                    ...prev,
                    "alcoholName": firstAlcoholItem[0],
                    "alcohollifestylestatus": firstAlcoholItem[1],
                    "alcoholdate": dateValue,
                }));
            }
            if (validRecreationalData.length > 0) {
                const firstRecreationalItem = validRecreationalData[0];

                const dateValue = firstRecreationalItem[2] ? formatDate(firstRecreationalItem[2]) : '';
                setRecreationalDetails((prev) => ({
                    ...prev,
                    "recreationalName": firstRecreationalItem[0],
                    "recreationallifestylestatus": firstRecreationalItem[1],
                    "recreationaldate": dateValue,
                }));
            }
            if (validCounselingData.length > 0) {
                const firstCounselingItem = validCounselingData[0];

                const dateValue = firstCounselingItem[2] ? formatDate(firstCounselingItem[2]) : '';
                setCounselingDetails((prev) => ({
                    ...prev,
                    "counselingName": firstCounselingItem[0],
                    "counselinglifestylestatus": firstCounselingItem[1],
                    "counselingdate": dateValue,
                }));
            }
            if (validExerciseData.length > 0) {
                const firstExerciseItem = validExerciseData[0];

                const dateValue = firstExerciseItem[2] ? formatDate(firstExerciseItem[2]) : '';
                setExerciseDetails((prev) => ({
                    ...prev,
                    "exerciseName": firstExerciseItem[0],
                    "exerciselifestylestatus": firstExerciseItem[1],
                    "exercisedate": dateValue,
                }));
            }
            if (validHazardousData.length > 0) {
                const firsthazardousItem = validHazardousData[0];

                const dateValue = firsthazardousItem[2] ? formatDate(firsthazardousItem[2]) : '';
                setHazardousDetails((prev) => ({
                    ...prev,
                    "hazardousName": firsthazardousItem[0],
                    "hazardouslifestylestatus": firsthazardousItem[1],
                    "hazardousdate": dateValue,
                }));
            }
            else {
                console.log("No valid data found");
            }
        }
    }


    let handleSave = async () => {

        setShowLifestyle(1);
        const jsonTobaccoData = JSON.stringify([tobaccoDetails])
        const jsonCoffeData = JSON.stringify([coffeDetails])
        const jsonAlcoholData = JSON.stringify([alcoholDetails])
        const jsonRecreationalData = JSON.stringify([recreationalDetails])
        const jsonCounselingData = JSON.stringify([counselingDetails])
        const jsonExerciseData = JSON.stringify([exerciseDetails])
        const jsonHazardousData = JSON.stringify([hazardousDetails])

        const parsedTobaccoData = JSON.parse(jsonTobaccoData);
        const parsedCoffeData = JSON.parse(jsonCoffeData);
        const parsedAlcoholData = JSON.parse(jsonAlcoholData);
        const parsedRecreationalData = JSON.parse(jsonRecreationalData);
        const parsedCounselingData = JSON.parse(jsonCounselingData);
        const parsedExerciseData = JSON.parse(jsonExerciseData);
        const parsedHazardousData = JSON.parse(jsonHazardousData);

        const { name, tobaccoId, tobaccoStatus, code, date, lifestylestatus } = parsedTobaccoData[0];
        const { coffeeName, Coffeelifestylestatus, coffeedate } = parsedCoffeData[0];
        const { alcoholName, alcohollifestylestatus, alcoholdate } = parsedAlcoholData[0];
        const { recreationalName, recreationallifestylestatus, recreationaldate } = parsedRecreationalData[0];
        const { counselingName, counselinglifestylestatus, counselingdate } = parsedCounselingData[0];
        const { exerciseName, exerciselifestylestatus, exercisedate } = parsedExerciseData[0];
        const { hazardousName, hazardouslifestylestatus, hazardousdate } = parsedHazardousData[0];

        const tobaccoData = `${name}|${tobaccoId}|${tobaccoStatus}|${code}|${date}|${lifestylestatus}`;
        const coffeeData = `${coffeeName}|${Coffeelifestylestatus}|${coffeedate}`;
        const alcoholData = `${alcoholName}|${alcohollifestylestatus}|${alcoholdate}`;
        const recreationalData = `${recreationalName}|${recreationallifestylestatus}|${recreationaldate}`;
        const councelingData = `${counselingName}|${counselinglifestylestatus}|${counselingdate}`;
        const exerciseData = `${exerciseName}|${exerciselifestylestatus}|${exercisedate}`;
        const hazardousData = `${hazardousName}|${hazardouslifestylestatus}|${hazardousdate}`;

        let sendData = {
            "jsonData": "",
            "rowId": rowId,
            "uhid": activeUHID,
            "tobaccoData": tobaccoData,
            "coffeeData": coffeeData,
            "alcoholData": alcoholData,
            "reactionalDrugsData": recreationalData,
            "counsellingData": councelingData,
            "excercisePatternData": exerciseData,
            "hazardousActivitiesData": hazardousData,
            "sleepPatternsData": "",
            "seatbeltUseData": "",
            "clientId": window.clientId,
            "userId": window.userId,
            doctorId: activeDocID,
            departmentId: activeDeptID
        }


        // return;
        const response = await InsertLifeStyleData(sendData);
        if (response.status === 1) {
            setShowUnderProcess(0);
            getFamilyHistoryData();
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
        setEncounterId(theEncounterId);
        getAllSmokingStatus();
        getFamilyHistoryData();
    }, [])
    return (
        <>
            {
                showLifeStyle === 1 ?
                    <div className='lifestylelist'>
                        <div className="col-12 mt-2">
                            <div className='handlser'>
                                <Heading text="Lifestyle List" />
                                {/* <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={"handleSearch"} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div> */}
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
                                            if (item.tobacco || item.coffee || item.alcohol || item.recreational_drugs || item.counseling || item.exercise_patterns || item.hazardous_activities) {
                                                const tobaccoListItem = item.tobacco.split('|');
                                                const coffeeListItem = item.coffee.split('|');
                                                const alcoholListItem = item.alcohol.split('|');
                                                const recreationalListItem = item.recreational_drugs.split('|');
                                                const counselingListItem = item.counseling.split('|');
                                                const exerciseListItem = item.exercise_patterns.split('|');
                                                const hazardousListItem = item.hazardous_activities.split('|');
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>Tobacco</td>
                                                            <td>{tobaccoListItem[0]}</td>
                                                            <td>{`${tobaccoListItem[2]} (${tobaccoListItem[3]})`}</td>
                                                            <td>{tobaccoListItem[5]}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Coffee</td>
                                                            <td>{coffeeListItem[0]}</td>
                                                            <td style={{ paddingLeft: '50px' }}>-------</td>
                                                            <td>{coffeeListItem[1]}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Alcohol</td>
                                                            <td>{alcoholListItem[0]}</td>
                                                            <td style={{ paddingLeft: '50px' }}>-------</td>
                                                            <td>{alcoholListItem[1]}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Recreational Drugs</td>
                                                            <td>{recreationalListItem[0]}</td>
                                                            <td style={{ paddingLeft: '50px' }}>-------</td>
                                                            <td>{recreationalListItem[1]}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Counseling</td>
                                                            <td>{counselingListItem[0]}</td>
                                                            <td style={{ paddingLeft: '50px' }}>-------</td>
                                                            <td>{counselingListItem[1]}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Exercise Patterns</td>
                                                            <td>{exerciseListItem[0]}</td>
                                                            <td style={{ paddingLeft: '50px' }}>-------</td>
                                                            <td>{exerciseListItem[1]}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Hazardous Activities</td>
                                                            <td>{hazardousListItem[0]}</td>
                                                            <td style={{ paddingLeft: '50px' }}>-------</td>
                                                            <td>{hazardousListItem[1]}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                            return null; // Return null if item.tobacco is null or undefined
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
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value='Current' checked={isShow === 'Current' ? true : false} onClick={() => { handleRadioTobacco('Current', 1) }} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Current</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value='Quit' checked={isShow === 'Quit' ? true : false} onClick={() => { handleRadioTobacco('Quit', 3) }} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">Quit</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value='Never' checked={isShow === 'Never' ? true : false} onClick={() => { handleRadioTobacco('Never', 4) }} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">Never</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" value='N/A' checked={isShow === 'N/A' ? true : false} onClick={() => { handleRadioTobacco('N/A', 5) }} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault4">N/A</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Code<span className="starMandatory"></span></label>
                                                    <input type="text" name="code" value={tobaccoDetails.code} id="code" className="lifestylecode form-control form-control-sm" placeholder={t("Code")} readOnly />
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                    <input type="date" value={tobaccoDetails.date} name="date" id="date" className="form-control form-control-sm" onChange={handleTobacco} />
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
                                                    <input type="text" name="coffeeName" id="name" value={coffeDetails.coffeeName} className="form-control form-control-sm" placeholder={t("Enter Name")} onChange={handleCoffe} />
                                                    <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                    <div className='lifestyleStatus'>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="Coffeelifestylestatus" value='Current' onChange={handleCoffe} checked={coffeDetails.Coffeelifestylestatus === 'Current'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Current</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="Coffeelifestylestatus" value='Quit' onChange={handleCoffe} checked={coffeDetails.Coffeelifestylestatus === 'Quit'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">Quit</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="Coffeelifestylestatus" value='Never' onChange={handleCoffe} checked={coffeDetails.Coffeelifestylestatus === 'Never'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">Never</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="Coffeelifestylestatus" value='N/A' onChange={handleCoffe} checked={coffeDetails.Coffeelifestylestatus === 'N/A'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault4">N/A</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="ModalFields-inn">
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
                                            </div> */}

                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                    <input type="date" name="coffeedate" value={coffeDetails.coffeedate} id="date" className="form-control form-control-sm" onChange={handleCoffe} />
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
                                                    <input type="text" name="alcoholName" id="name" value={alcoholDetails.alcoholName} className="form-control form-control-sm" placeholder={t("Enter Name")} onChange={handleAlcohol} />
                                                    <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                    <div className='lifestyleStatus'>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="alcohollifestylestatus" value='Current' onChange={handleAlcohol} checked={alcoholDetails.alcohollifestylestatus === 'Current'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Current</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="alcohollifestylestatus" value='Quit' onChange={handleAlcohol} checked={alcoholDetails.alcohollifestylestatus === 'Quit'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">Quit</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="alcohollifestylestatus" value='Never' onChange={handleAlcohol} checked={alcoholDetails.alcohollifestylestatus === 'Never'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">Never</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="alcohollifestylestatus" value='N/A' onChange={handleAlcohol} checked={alcoholDetails.alcohollifestylestatus === 'N/A'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault4">N/A</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                    <input type="date" name="alcoholdate" value={alcoholDetails.alcoholdate} id="date" className="form-control form-control-sm" onChange={handleAlcohol} />
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
                                                    <input type="text" name="recreationalName" id="name" value={recreationalDetails.recreationalName} className="form-control form-control-sm" placeholder={t("Enter Name")} onChange={handleRecreational} />
                                                    <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                    <div className='lifestyleStatus'>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="recreationallifestylestatus" value='Current' onChange={handleRecreational} checked={recreationalDetails.recreationallifestylestatus === 'Current'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Current</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="recreationallifestylestatus" value='Quit' onChange={handleRecreational} checked={recreationalDetails.recreationallifestylestatus === 'Quit'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">Quit</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="recreationallifestylestatus" value='Never' onChange={handleRecreational} checked={recreationalDetails.recreationallifestylestatus === 'Never'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">Never</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="recreationallifestylestatus" value='N/A' onChange={handleRecreational} checked={recreationalDetails.recreationallifestylestatus === 'N/A'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault4">N/A</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                    <input type="date" name="recreationaldate" value={recreationalDetails.recreationaldate} id="date" className="form-control form-control-sm" onChange={handleRecreational} />
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
                                                    <input type="text" name="counselingName" id="name" value={counselingDetails.counselingName} className="form-control form-control-sm" placeholder={t("Enter Name")} onChange={handleCounseling} />
                                                    <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                    <div className='lifestyleStatus'>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="counselinglifestylestatus" value='Current' onChange={handleCounseling} checked={counselingDetails.counselinglifestylestatus === 'Current'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Current</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="counselinglifestylestatus" value='Quit' onChange={handleCounseling} checked={counselingDetails.counselinglifestylestatus === 'Quit'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">Quit</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="counselinglifestylestatus" value='Never' onChange={handleCounseling} checked={counselingDetails.counselinglifestylestatus === 'Never'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">Never</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="counselinglifestylestatus" value='N/A' onChange={handleCounseling} checked={counselingDetails.counselinglifestylestatus === 'N/A'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault4">N/A</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                    <input type="date" name="counselingdate" value={counselingDetails.counselingdate} id="date" className="form-control form-control-sm" onChange={handleCounseling} />
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
                                                    <input type="text" name="exerciseName" id="name" value={exerciseDetails.exerciseName} className="form-control form-control-sm" placeholder={t("Enter Name")} onChange={handleExercise} />
                                                    <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                    <div className='lifestyleStatus'>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="exerciselifestylestatus" value='Current' onChange={handleExercise} checked={exerciseDetails.exerciselifestylestatus === 'Current'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Current</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="exerciselifestylestatus" value='Quit' onChange={handleExercise} checked={exerciseDetails.exerciselifestylestatus === 'Quit'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">Quit</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="exerciselifestylestatus" value='Never' onChange={handleExercise} checked={exerciseDetails.exerciselifestylestatus === 'Never'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">Never</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="exerciselifestylestatus" value='N/A' onChange={handleExercise} checked={exerciseDetails.exerciselifestylestatus === 'N/A'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault4">N/A</label>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                    <input type="date" name="exercisedate" value={exerciseDetails.exercisedate} id="date" className="form-control form-control-sm" onChange={handleExercise} />
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
                                                    <input type="text" name="hazardousName" id="name" value={hazardousDetails.hazardousName} className="form-control form-control-sm" placeholder={t("Enter Name")} onChange={handleHazardous} />
                                                    <small id="errName" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Status<span className="starMandatory"></span></label>
                                                    <div className='lifestyleStatus'>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="hazardouslifestylestatus" value='Current' onChange={handleHazardous} checked={hazardousDetails.hazardouslifestylestatus === 'Current'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Current</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="hazardouslifestylestatus" value='Quit' onChange={handleHazardous} checked={hazardousDetails.hazardouslifestylestatus === 'Quit'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">Quit</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="hazardouslifestylestatus" value='Never' onChange={handleHazardous} checked={hazardousDetails.hazardouslifestylestatus === 'Never'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">Never</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="hazardouslifestylestatus" value='N/A' onChange={handleHazardous} checked={hazardousDetails.hazardouslifestylestatus === 'N/A'} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault4">N/A</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ModalFields-inn">
                                                    <label htmlFor="name" className="form-label">Date<span className="starMandatory"></span></label>
                                                    <input type="date" name="hazardousdate" value={hazardousDetails.hazardousdate} id="date" className="form-control form-control-sm" onChange={handleHazardous} />
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
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel}><i class="bi bi-x-lg" ></i> Cancel</button>
                            </div>
                        </div>
                    </div>
            }


            {showToster === 8 ? (<SuccessToster handle={setShowToster} message="Lifestyle saved successfully !!" />) : ("")}

        </>
    )
}

export default OPDLifeStyle
