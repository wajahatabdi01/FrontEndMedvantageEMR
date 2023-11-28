import React, { useEffect, useState } from 'react';
import GetActivityList from './API/GetActivityList';
import InsertPatientPhysicalActivity from './API/InsertPatientPhysicalActivity';
import Heading from '../../../../../Component/Heading';
import BoxContainer from '../../../../../Component/BoxContainer';
import DropdownWithSearch from '../../../../../Component/DropdownWithSearch';
import TosterUnderProcess from '../../../../../Component/TosterUnderProcess';
import Toster from '../../../../../Component/Toster';
import TableContainer from '../../../../../Component/TableContainer';
import { useTranslation } from 'react-i18next';
import saveButtonIcon from "../../../../../../src/assets/images/icons/saveButton.svg"
import clearIcon from "../../../../../../src/assets/images/icons/clear.svg"
import i18n from "i18next";
import GetAllPhysicalActivityTracker from './API/GetAllPhysicalActivityTracker';


export default function PatientPhysicalActivity() {
    const [activityList, setActivityList] = useState([]);
    const [allPhysicalActivityTracker, setAllPhysicalActivityTracker] = useState();
    const [getTableData, setGetTableData] = useState([]);
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [fromDate, setfromDate] = useState("")
    let [toDate, settoDate] = useState("")
    let [totalTimeInMinutes, setTotalTimeInMinutes] = useState("")
    let [getUhid, setUhid] = useState(JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid);
    let [getClientId, setClientId] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).clientId); 
    const [selectedDate, setSelectedDate] = useState(null);
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    const { t } = useTranslation();





    const getData = async () => {
        const activityListResp = await GetActivityList();
        const allPhysicalActivityTrackerResp = await GetAllPhysicalActivityTracker(getUhid);
       
        if (activityListResp.status === 1) {
            setActivityList(activityListResp.responseValue);
            //setAllPhysicalActivityTracker(allPhysicalActivityTrackerResp.responseValue);

        }
        if (allPhysicalActivityTrackerResp.status === 1) {
            setAllPhysicalActivityTracker(allPhysicalActivityTrackerResp.responseValue);
        }

    };

   
    //Handle Save
    let saveForm = async () => {
        // Parse the input date string
    const parsedDate = new Date(fromDate);

     // Format the date to your desired string format
    const formattedDate = `${parsedDate.toISOString().slice(0, 10)} ${parsedDate.toISOString().slice(11, 16)}`;
   
        
        let valresponse = 1
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await InsertPatientPhysicalActivity(sendForm,formattedDate,getUhid,getClientId);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear();
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
            getData()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }

    }
    //Handle Clear
    let handleClear = (value) => {
        document.getElementById('fromDateTime').value = '';
        document.getElementById('toDateTime').value = '';
        document.getElementById('remark').value = '';
        setClearDropdown(value)

        setSendForm({ "userId": window.userId })
        //document.getElementById("code").value = "";
        setUpdateBool(0)
    }
   

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }
    
    // let handleDateChange = (e) => {
    //     // let name = e.target.name;
    //     // let value = e.target.value;

    //     // setSendForm(sendForm => ({
    //     //     ...sendForm,
    //     //     [name]: value
    //     // }))
    //     if(e.target.name==='fromDateTime'){
             
    //       setfromDate(e.target.value);
           
    //     }
    //     else if(e.target.name==='toDateTime'){
    //         settoDate(e.target.value);
    //     }
    // }
    let handleDateChange = (e) => {
        if (e.target.name === 'fromDateTime') {
            setfromDate(e.target.value);
   
        } else if (e.target.name === 'toDateTime') {
            settoDate(e.target.value);
          
        }
    }
    

    useEffect(() => {
        getData();
    }, []);
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className='col-md-12'>
                        <Heading text="Patient Physical Activity" />
                    </div>
                </div>

                <div className='med-box'>
                    <div className='inner-content'>
                        <div className='row m-0'>
                            <div className='col-md-2 mb-2'>
                                <label htmlFor="activityId" className="form-label">Activity List</label>
                                <div>
                                    {activityList && <DropdownWithSearch defaulNname="Select activity" name="activityId" list={activityList} valueName="id" displayName="activityName" editdata=""  getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>

                            </div>

                            <div className='col-md-2 mb-2'>
                                <label for="fromDateTime" className="form-label"> From Date Time  </label>
                                <input type="datetime-local" class="form-control form-control-sm" id="fromDateTime" placeholder="Enter Start Date and Time" name="fromDateTime" onChange={handleDateChange} />
                            </div>
                            <div className='col-md-2 mb-2'>
                                <label for="totalTimeInMinutes" className="form-label">Total time In Minutes </label>
                                <input type="text" class="form-control form-control-sm" id="toDateTime" placeholder="Enter Total Time In Minutes" name="totalTimeInMinutes" onChange={handleChange}/>

                            </div>

                            {/* <div className='col-md-2 mb-2'>
                                <label for="toDateTime" className="form-label"> To Date Time </label>
                                <input type="datetime-local" class="form-control form-control-sm" id="toDateTime" placeholder="Enter Bed Name" name="toDateTime" onChange={handleDateChange}/>

                            </div> */}

                            <div className='col-md-2 mb-2'>
                                <label htmlFor="remark" className="form-label">Remark </label>
                                <input type="text" className="form-control form-control-sm" id="remark" name='remark' onChange={handleChange} placeholder="Enter Remark" />
                            </div>

                            <div className='col-md-2 mb-2'>
                                <div className="relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                            <>
                                                {showToster === 1 ?
                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                    : <div>

                                                        <>
                                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                        </>


                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <div className='handlser'>
                            <Heading text="Patient Physical Activity List" />
                            {/* <div style={{ position: 'relative' }}>
                            <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={handleSearch} />
                            <span className="tblsericon"><i class="fas fa-search"></i></span>
                        </div> */}
                        </div>
                        <div className="med-table-section" style={{ height: "calc(100vh - 290px)" }}>
                            <TableContainer>
                                <thead>
                                    <tr>
                                        <th className="text-center" style={{ "width": "5%" }}>#</th>
                                        <th>Activity Name</th>
                                        <th>From Time</th>
                                        <th>To Time</th>
                                        <th>Total Time in Minutes</th>
                                        <th>Remark</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {allPhysicalActivityTracker && allPhysicalActivityTracker.map((val, ind) => {
                                        
                                        return (
                                            <tr key={val.id}>
                                                <td className="text-center">{ind + 1}</td>
                                                <td>{val.activityName}</td>
                                                <td>{val.timeFrom}</td>
                                                <td>{val.timeTo}</td>
                                                <td>{val.totalTimeInMinutes}</td>
                                                <td>{val.remark}</td>
                                                <td>
                                                    {/* <div className="action-button">
                                                    <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.wardId, val.bedId, val.code, val.userId,val.wardName,val.bedName) }}></i></div>
                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                                                    </div>
                                                </div> */}


                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </TableContainer>

                        </div>

                    </div>
                </div>





            </div>


        </>
    );
}



