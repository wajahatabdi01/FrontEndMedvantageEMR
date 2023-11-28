import React, { useEffect, useRef, useState } from 'react'
import calender from '../../../../../assets/images/icons/calender.svg'
import clock from '../../../../../assets/images/icons/clock.svg'
import BoxContainer from '../../../../../Components/BoxContainer'
import upDownIcon from '../../../../../assets/images/icons/upDownIcon.svg'
import IconEdit from '../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../assets/images/icons/IconDelete.svg'
import notes from '../../../../../assets/images/icons/PatientHistory1.svg'
import GetPatientNotes from '../../../../Api/IPD/PatientsNotes/GetPatientNotes'
import PutPatientNotes from '../../../../Api/IPD/PatientsNotes/PutPatientNotes'
import PostPatientNotes from '../../../../Api/IPD/PatientsNotes/PostPatientNotes'
import DeletePatientNotes from '../../../../Api/IPD/PatientsNotes/DeletePatientNotes'
import Toster from '../../../../../Components/Toster'
import TosterUnderProcess from '../../../../../Components/TosterUnderProcess'
import ValidationPatientNotes from '../../../../../Validations/IPD/ValidationPatientNotes'
import savewhite from '../../../../../assets/images/icons/save.svg'
import clearIcon from '../../../../../assets/images/icons/clear.svg'
import Search, { FindByQuery, SearchIndex } from '../../../../../Code/Serach'
import ExistingComplain from "../../../../../assets/images/OPD/existingComplain.svg"
import OPDSymptomsPopUp from '../../../OPD/OPDSharePage/OPDPrescription/OPDSymptomsPopUp'
import GetProblemList from '../../../../Api/OPD/Prescription/KnowMedsAPI/GetProblemList'

export default function PatientNotes() {

  let [patientNotesList, setPatientNotesList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [problemList, setProblemList] = useState()
  let [problemListTemp, setProblemListTemp] = useState()
  let [symptomsData, setSymptomsData] = useState([])
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');
  let [showSearchBoxProblem, setShowSearchBoxProblem] = useState(-1)
  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [disable, setDisable] = useState(0)
  let [symptomsPopUp, setSymptomsPopUp] = useState(0)
  let [sendData, setSendData] = useState([])
  let liSelected = useRef()
  let index = useRef(-1)
  let next = useRef()
  let oldData = useRef(0)
  let row = { "problemId": 0, "problemName": "" }
  

    
  
  //Handle Save
  let saveForm = async (key) => {
    console.log('key-->>>>>>',key);
    sendForm["pdmID"] = key;
    sendForm["detailsDate"] =sendForm.detailsDate+' '+ sendForm.detailsTime;
    console.log('sendForm222',sendForm);
   
    // let valresponse = ValidationPatientNotes(sendForm.details)
    
    let valresponse = true
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostPatientNotes(sendForm);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Save SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000);
        console.log('key',key)
        getdata(key)
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

  //Get data
  let getdata = async (id) => {
    sendForm["pdmID"] = id
    // let pmId = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).uhID : []
    let getResponse = await GetPatientNotes(id);
    let getProblem = await GetProblemList()

    if (getResponse.status === 1) {
      // setLoder(0)
      setPatientNotesList(getResponse.responseValue)
      setProblemList(getProblem.responseValue)
      console.log("---------------------->",getResponse.responseValue)

    }

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

  

  let handleSearch = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let data = [...sendData].filter(n => n)
    
    try {
      liSelected.current = ""
      index.current = -1
      next.current = ""
      if (value != "") {
        if (name === "symptomsData") {
          let response = FindByQuery(problemList, value, "problemName")
          if (response.length != 0) {
            setProblemListTemp(response)
            setShowSearchBoxProblem(1)
          }
          else {

            setShowSearchBoxProblem(-1)


          }

        }
      }
    }
    catch (e) {

    }


  }

  let handleClick = (boxname, id, name) => {
    let data = [...sendData].filter(n => n)
    try {
      if (boxname === "symptomsData") {
        let t = 0
        sendForm["details"] =  name
        row["problemId"] = id
        row["problemName"] = name
        row["pdmId"] = 2
        setShowSearchBoxProblem(-1)
        let flag = 0
        symptomsData.map((v, i) => {
          if (v.problemId === id) {
            flag = 1
            return
          }
        })
        if (flag === 0) {
          setSendData([...data, row])
          setSymptomsData([...symptomsData, row])
        }
        let r = SearchIndex(problemList, "problemName", name)
        let tt = [...problemList]
        tt.splice(r, 1)
        setProblemList(tt)

        let temp = [...data]
        data.map((val, ind) => {
          if (val.pdmId === 2 && val.problemId === 0) {
            delete temp[ind]
          }
        })
        setSendData([...temp.filter(n => n), row])

        document.getElementById("symptomsData").focus()


        document.getElementById("symptomsData").value = "";
      }

    }
    catch (e) { }


  }

  let handleRemove = (ind, problemId) => {
    let tempsymptomsData = [...symptomsData]
    let tempSenddata = [...sendData]
    try {
      sendData.map((val, ind) => {

        if (val.pdmId === 2 && val.problemId === problemId) {

          tempSenddata.splice(ind, 1)
          setSendData(tempSenddata)
          symptomsData.map((val, ind) => {
            if (val.pdmId === 2 && val.problemId === problemId) {
              tempsymptomsData.splice(ind, 1)
              setSymptomsData(tempsymptomsData)
            }
          })

        }
      })
    }


    catch (e) { }
    

  }

  let handleKeyPress = (e) => {
    let value = e.target.value;
    let name = e.target.name
    let ul = ""
    if (e.keyCode === 13) {
      if (name === "symptomsData") {
        if (showSearchBoxProblem === -1) {
          row["problemId"] = 0
          row["problemName"] = value
          row["pdmId"] = 2
        }
        else {
          ul = document.getElementById('symptomsDataList');
          row["problemId"] = ul.getElementsByTagName('li')[index.current].value
          row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
          row["pdmId"] = 2
          setShowSearchBoxProblem(-1)
          liSelected.current = ""
          index.current = -1
          next.current = ""
          oldData.current = 0
        }

        setSymptomsData([...symptomsData, row])
        setSendData([...sendData, row])

        document.getElementById(name).value = ""
        document.getElementById(name).focus()
      }
    }
  }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let obj = {
      id: rowId
    }
    let response = await DeletePatientNotes(obj)
    if (response.status === 1) {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage("Data Deleted SuccessFully!")
      setTosterValue(0)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
      getdata()
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
  }





  //Handle Button Change
  let handleUpdate = async (id, pmID, pdmID, detailsDate, detailsTime, details, userId, dateId = "", timeId = "", noteId = "") => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "pmID": pmID,
      "pdmID": pdmID,
      "detailsDate": detailsDate,
      "detailsTime": detailsTime,
      "details": details,
      "userId": userId

    }))

    document.getElementById(dateId).value = detailsDate;
    document.getElementById(timeId).value = detailsTime;
    document.getElementById(noteId).value = details;
  }

  let pagehandleSearch = (e) => {
    if (e.target.value !== "") {
      let result = Search(patientNotesList, e.target.value)
        if (result.length != 0) {
          setPatientNotesList(result)
        }
      //   else {
      //     setPatientNotesList([])
      // }
    }
  else {

      setPatientNotesList(patientNotesList)
    }
}


  // Handle Update
  let saveUpdate = async (key) => {
    console.log('key-->>>>>>',key);
    sendForm["pdmID"] = key;
    sendForm["detailsDate"] =sendForm.detailsDate+' '+ sendForm.detailsTime;
    let valresponse = ValidationPatientNotes(sendForm.details)
    // console.log("valresponse", valresponse);
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutPatientNotes(sendForm)
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Updated SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

        handleClear();
        setUpdateBool(0)
        getdata(key)
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


  //Handle Clear Progress Note
  let handleClear = (dateId = "", timeId = "", noteId = "") => {
    setSendForm({ "userId": window.userId })
    document.getElementById(dateId).value = '';
    document.getElementById(timeId).value = '';
    document.getElementById(noteId).value = '';
    setUpdateBool(0)
  }


  useEffect(() => {
    getdata(2)
  }, [])

  
  return (
    <>
      <div className="med-box py-1 px-2">
        <nav>
          <div className="nav nav-tabs customeTab" id="nav-tab" role="tablist">
            <button onClick={() => { getdata(1) }} className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-ProgressNote" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Progress Note</button>
            <button onClick={() => { getdata(2) }} className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-Complaint" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Complaint/S & SX</button>
            <button onClick={() => { getdata(3) }} className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-PatientHistory" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Patient History</button>
            <button onClick={() => { getdata(6) }} className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-PhysicalExamination" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Physical Examination</button>
            <button onClick={() => { getdata(5) }} className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-ProcedureNote" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Procedure Note</button>
            <button onClick={() => { getdata(14) }} className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-Goals" type="button" role="tab" aria-controls="nav-Goals" aria-selected="false">Goals</button>
          </div>
        </nav>
      </div>

      {/* ---- Progress Notes Tab Start------ */}

      <div className="tab-content mt-2" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-ProgressNote" role="tabpanel" aria-labelledby="nav-ProgressNote-tab" tabIndex="0">

          <div className="container-fluid">
            <div className="row">
              <div className="col-12 p-0">

                <div className="fieldsett-in">
                  <div className="fieldsett">
                    <span className='fieldse'>Patient Notes</span>
                    <BoxContainer>

                      <div className="mb-2 col-md-2 me-2">
                        <img src={calender} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Date</label>
                        <input type="date" className="form-control form-control-sm" id="detailsDateProgress" name="detailsDate" onChange={handleChange} placeholder="Enter Date" />
                        {/* <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 col-md-2 me-2">
                        <img src={clock} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Time</label>
                        <input type="time" className="form-control form-control-sm" id="detailsTimeProgress" name="detailsTime" onChange={handleChange} placeholder="Enter Time" />
                        {/* <small id='errTime' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>

                      <div className="mb-2 col-md-2 me-5">
                        <img src={notes} className='icnn' /> <label htmlFor="details" className="form-label">Progress Note</label>
                        <input type="text" className="form-control form-control-sm" id="detailsProgress" name="details" onChange={handleChange} placeholder="Enter Progress Note" />
                        {/* <small id='errQuantity' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>



                      <div className="mb-2 relative">
                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                        <div>
                          {showUnderProcess === 1 ? <TosterUnderProcess /> :
                            <>
                              {showToster === 1 ?
                                <Toster value={tosterValue} message={tosterMessage} />

                                : <div>
                                  {updateBool === 0 ?
                                    <>
                                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={()=>{saveForm(1)}}><img src={savewhite} className='icnn' />Save</button>
                                      <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" onClick={() => { handleClear("detailsDateProgress", "detailsTimeProgress", "detailsProgress") }}>
                                        <img src={clearIcon} className='icnn' />Clear</button>

                                    </>
                                    :
                                    <>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={()=>{saveUpdate(1)}}>Update</button>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { setUpdateBool(0); handleClear("detailsDateProgress", "detailsTimeProgress", "detailsProgress") }}>Cancel</button>
                                    </>
                                  }
                                </div>}
                            </>
                          }
                        </div>
                      </div>

                    </BoxContainer>
                  </div>

                </div>

              </div>



            </div>


          </div>
          <div className="col-12 mt-2">

            <div className="med-box">

              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <label className="labelPageIndex" >Showing <span className="pageIndex">1-3 </span> of  <span className="pageIndex">21</span> entries</label>
                </div>
                <div className='listdetailsct-in'>
                   <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." onChange={pagehandleSearch} />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                </div>
              </div>


              <div className="med-table-section" style={{ "height": "560px" }}>
                <table className='med-table border_ striped'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Date <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Progress Note <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patientNotesList && patientNotesList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.detailsDate}</td>
                          <td>{val.detailsTime}</td>
                          <td>{val.details}</td>
                          <td>
                            <div className="action-button">
                              {/* <div className="actionItem" title="View"><img src={IconPrint} alt="IconPrint" /></div> */}
                              <div className="actionItem" title="Edit"><img src={IconEdit} alt="Edit" onClick={() => { handleUpdate(val.id, val.pmID, val.pdmID, val.detailsDate, val.detailsTime, val.details, val.userId, "detailsDateProgress", "detailsTimeProgress", "detailsProgress") }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" ><img src={IconDelete} alt="Delete" onClick={() => { setRowId(val.id) }} /></div>

                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


        {/* ----------------------------------- Complaint tab start--------------------------------------------------- */}


        <div className="tab-pane fade" id="nav-Complaint" role="tabpanel" aria-labelledby="nav-Complaint-tab" tabIndex="0">
          <div className="container-fluid">
            <div className="row">

              <div className="col-12 p-0">

                <div className="fieldsett-in">
                  <div className="fieldsett">
                    <span className='fieldse'>Patient Notes</span>
                    <BoxContainer>

                      <div className="mb-2 col-md-2 me-2">
                        <img src={calender} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Date</label>
                        <input type="date" className="form-control form-control-sm" id="detailsDateComplaint" name="detailsDate" onChange={handleChange} placeholder="Enter Date" />
                        {/* <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 col-md-2 me-2">
                        <img src={clock} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Time</label>
                        <input type="time" className="form-control form-control-sm" id="detailsTimeComplaint" name="detailsTime" onChange={handleChange} placeholder="Enter Time" />
                        {/* <small id='errTime' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>

                      {/* <div className="mb-2 col-md-2 me-5">
                        <img src={notes} className='icnn' /> <label htmlFor="details" className="form-label">Complaint/S & SX</label>
                        <input type="text" className="form-control form-control-sm" id="detailsComplaint" name="details" onChange={handleChange} placeholder="Enter Complaints" />
                        </div> */}


                      <div className={`row p-0 m-0 opd-prescription-box `} >
                        <div className='p-3 m-0  col-sm-3 col-12 img-text-box-back-opd'>
                          <div className='d-flex flex-row gap-2  m-0 pdata' onClick={() => { }}>
                            <img src={ExistingComplain} className='ps-3_' />
                            <label>Patient complaint/ Signs & Symptoms</label>
                          </div>
                        </div>
                        <div className='p-2 m-0 col-sm-9 col-12'>

                          <input type="text" className='text-box-opd ' placeholder='Enter Sign & Symptoms Details' name="symptomsData" id="symptomsData" onChange={(e) => {handleSearch(e) }} onKeyDown={handleKeyPress} disabled={disable === 1 ? true : false} />
                          {showSearchBoxProblem === 1 ?
                            <div id="symptomsDataListdiv" className='position-absolute opdmedicationsearchbox'>
                              <ul id="symptomsDataList">
                                {problemListTemp && problemListTemp.map((val, ind) => {
                                  return (
                                    [6, 7].map((id, index) => {
                                      if (val.problemTypeID === id) {
                                        return (

                                          <li className='pointer'   onClick={(e) => { handleClick("symptomsData", val.id, val.problemName) }}>{val.problemName}</li>
                                        )
                                      }
                                    })
                                  )
                                })}
                              </ul>
                            </div>
                            : ""}

                          <div className='d-flex flex-wrap gap-2' style={{ overflowX: "auto", height: '40px' }}>

                            {
                              symptomsData && symptomsData.map((val, ind) => {
                                return (
                                  <div className='d-flex flex-row justify-content-center align-items-center gap-2 ps-2 pe-2 opdcancletab'>
                                    <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                    <i className="fa-solid fa-xmark" onClick={() => { handleRemove(ind, val.problemId) }}></i>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>


                      <div className="mb-2 relative">
                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                        <div>
                          {showUnderProcess === 1 ? <TosterUnderProcess /> :
                            <>
                              {showToster === 1 ?
                                <Toster value={tosterValue} message={tosterMessage} />

                                : <div>
                                  {updateBool === 0 ?
                                    <>
                                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={()=>{saveForm(2)}}><img src={savewhite} className='icnn' />Save</button>
                                      <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" onClick={() => { handleClear("detailsDateComplaint", "detailsTimeComplaint", "symptomsData") }}><img src={clearIcon} className='icnn' />Clear</button>
                                    </>
                                    :
                                    <>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={()=>{saveUpdate(2)}}>Update</button>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { setUpdateBool(0); handleClear("detailsDateComplaint", "detailsTimeComplaint", "symptomsData") }}>Cancel</button>
                                    </>
                                  }
                                </div>}
                            </>
                          }
                        </div>
                      </div>
                    </BoxContainer>
                  </div>
                </div>

              </div>



            </div>


          </div>

          <div className="col-12 mt-2">

            <div className="med-box">

              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <label className="labelPageIndex" >Showing <span className="pageIndex">1-3 </span> of  <span className="pageIndex">21</span> entries</label>
                </div>
                <div className='listdetailsct-in'>
                   <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." onChange={pagehandleSearch} />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                </div>
              </div>


              <div className="med-table-section" style={{ "height": "560px" }}>
                <table className='med-table border_ striped'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Date <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Complaint/S & SX <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patientNotesList && patientNotesList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.detailsDate}</td>
                          <td>{val.detailsTime}</td>
                          <td>{val.details}</td>
                          <td>
                            <div className="action-button">
                              {/* <div className="actionItem" title="View"><img src={IconPrint} alt="IconPrint" /></div> */}
                              <div className="actionItem" title="Edit"><img src={IconEdit} alt="Edit" onClick={() => { handleUpdate(val.id, val.pmID, val.pdmID, val.detailsDate, val.detailsTime, val.details, val.userId, "detailsDateComplaint", "detailsTimeComplaint", "symptomsData") }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt="Delete" onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

              </div>

            </div>
          </div>
        </div>

        {/* --------------------- Patient History Tab start-------------------------- */}


        <div className="tab-pane fade" id="nav-PatientHistory" role="tabpanel" aria-labelledby="nav-PatientHistory-tab" tabIndex="0">

          <div className="container-fluid">
            <div className="row">

              <div className="col-12  p-0">

                <div className="fieldsett-in">
                  <div className="fieldsett">
                    <span className='fieldse'>Patient Notes</span>
                    <BoxContainer>

                      <div className="mb-2 col-md-2 me-2">
                        <img src={calender} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Date</label>
                        <input type="date" className="form-control form-control-sm" id="detailsDateHistory" name="detailsDate" onChange={handleChange} placeholder="Enter Date" />
                        {/* <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 col-md-2 me-2">
                        <img src={clock} className='icnn' /> <label htmlFor="detailsTime" className="form-label">Time</label>
                        <input type="time" className="form-control form-control-sm" id="detailsTimeHistory" name="detailsTime" onChange={handleChange} placeholder="Enter Time" />
                        {/* <small id='errTime' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>

                      <div className="mb-2 col-md-2 me-5">
                        <img src={notes} className='icnn' /> <label htmlFor="details" className="form-label">Patient History</label>
                        <input type="text" className="form-control form-control-sm" id="detailsHistory" name="details" onChange={handleChange} placeholder="Enter Patient History" />
                        {/* <small id='errQuantity' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 relative">
                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                        <div>
                          {showUnderProcess === 1 ? <TosterUnderProcess /> :
                            <>
                              {showToster === 1 ?
                                <Toster value={tosterValue} message={tosterMessage} />

                                : <div>
                                  {updateBool === 0 ?
                                    <>
                                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={()=>{saveForm(3)}}><img src={savewhite} className='icnn' />Save</button>
                                      <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" onClick={() => { handleClear("detailsDateHistory", "detailsTimeHistory", "detailsHistory") }}><img src={clearIcon} className='icnn' />Clear</button>
                                    </>
                                    :
                                    <>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={()=>{saveUpdate(3)}}>Update</button>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { setUpdateBool(0); handleClear("detailsDateHistory", "detailsTimeHistory", "detailsHistory") }}>Cancel</button>
                                    </>
                                  }
                                </div>}
                            </>
                          }
                        </div>
                      </div>
                    </BoxContainer>
                  </div>
                </div>

              </div>



            </div>


          </div>
          <div className="col-12 mt-2">

            <div className="med-box">

              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <label className="labelPageIndex" >Showing <span className="pageIndex">1-3 </span> of  <span className="pageIndex">21</span> entries</label>
                </div>
                <div className='listdetailsct-in'>
                   <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." onChange={pagehandleSearch} />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                </div>
              </div>


              <div className="med-table-section" style={{ "height": "560px" }}>
                <table className='med-table border_ striped'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Date <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Patient History <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {patientNotesList && patientNotesList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.detailsDate}</td>
                          <td>{val.detailsTime}</td>
                          <td>{val.details}</td>
                          <td>
                            <div className="action-button">
                              {/* <div className="actionItem" title="View"><img src={IconPrint} alt="IconPrint" /></div> */}
                              <div className="actionItem" title="Edit"><img src={IconEdit} alt="Edit" onClick={() => { handleUpdate(val.id, val.pmID, val.pdmID, val.detailsDate, val.detailsTime, val.details, val.userId, "detailsDateHistory", "detailsTimeHistory", "detailsHistory") }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt="Delete" onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

              </div>

            </div>
          </div>
        </div>

        {/* ------------------------------------------ Physical Examination Tab start--------------------------------- */}


        <div className="tab-pane fade" id="nav-PhysicalExamination" role="tabpanel" aria-labelledby="nav-PhysicalExamination-tab" tabIndex="0">

          <div className="container-fluid">
            <div className="row">

              <div className="col-12  p-0">

                <div className="fieldsett-in">
                  <div className="fieldsett">
                    <span className='fieldse'>Patient Notes</span>
                    <BoxContainer>

                      <div className="mb-2 col-md-2 me-2">
                        <img src={calender} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Date</label>
                        <input type="date" className="form-control form-control-sm" id="detailsDateExamination" name="detailsDate" onChange={handleChange} placeholder="Enter Date" />
                        {/* <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 col-md-2 me-2">
                        <img src={clock} className='icnn' /> <label htmlFor="detailsTime" className="form-label">Time</label>
                        <input type="time" className="form-control form-control-sm" id="detailsTimeExamination" name="detailsTime" onChange={handleChange} placeholder="Enter Time" />
                        {/* <small id='errTime' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>

                      <div className="mb-2 col-md-2 me-5">
                        <img src={notes} className='icnn' /> <label htmlFor="details" className="form-label">Physical Examination</label>
                        <input type="text" className="form-control form-control-sm" id="detailsExamination" name="details" onChange={handleChange} placeholder="Enter Physical Examination" />
                        {/* <small id='errQuantity' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 relative">
                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                        <div>
                          {showUnderProcess === 1 ? <TosterUnderProcess /> :
                            <>
                              {showToster === 1 ?
                                <Toster value={tosterValue} message={tosterMessage} />

                                : <div>
                                  {updateBool === 0 ?
                                    <>
                                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={()=>{saveForm(6)}}><img src={savewhite} className='icnn' />Save</button>
                                      <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" onClick={() => { handleClear("detailsDateExamination", "detailsTimeExamination", "detailsExamination") }}><img src={clearIcon} className='icnn' />Clear</button>
                                    </>
                                    :
                                    <>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={()=>{saveUpdate(6)}}>Update</button>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { setUpdateBool(0); handleClear("detailsDateExamination", "detailsTimeExamination", "detailsExamination") }}>Cancel</button>
                                    </>
                                  }
                                </div>}
                            </>
                          }
                        </div>
                      </div>
                    </BoxContainer>
                  </div>

                </div>

              </div>



            </div>


          </div>
          <div className="col-12 mt-2">

            <div className="med-box">

              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <label className="labelPageIndex" >Showing <span className="pageIndex">1-3 </span> of  <span className="pageIndex">21</span> entries</label>
                </div>
                <div className='listdetailsct-in'>
                   <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." onChange={pagehandleSearch} />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                </div>
              </div>


              <div className="med-table-section" style={{ "height": "560px" }}>
                <table className='med-table border_ striped'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Date <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Physical Examination <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patientNotesList && patientNotesList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.detailsDate}</td>
                          <td>{val.detailsTime}</td>
                          <td>{val.details}</td>
                          <td>
                            <div className="action-button">
                              {/* <div className="actionItem" title="View"><img src={IconPrint} alt="IconPrint" /></div> */}
                              <div className="actionItem" title="Edit"><img src={IconEdit} alt="Edit" onClick={() => { handleUpdate(val.id, val.pmID, val.pdmID, val.detailsDate, val.detailsTime, val.details, val.userId, "detailsDateExamination", "detailsTimeExamination", "detailsExamination") }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt="Delete" onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

              </div>

            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- Procedure Note Tab start------------------------------- */}


        <div className="tab-pane fade" id="nav-ProcedureNote" role="tabpanel" aria-labelledby="nav-ProcedureNote-tab" tabIndex="0">
          {/* <h1>Completed</h1> */}
          <div className="container-fluid">
            <div className="row">

              <div className="col-12 p-0">

                <div className="fieldsett-in">
                  <div className="fieldsett">
                    <span className='fieldse'>Patient Notes</span>
                    <BoxContainer>

                      <div className="mb-2 col-md-2 me-2">
                        <img src={calender} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Date</label>
                        <input type="date" className="form-control form-control-sm" id="detailsDateProcedure" name="detailsDate" onChange={handleChange} placeholder="Enter Date" />
                        {/* <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 col-md-2 me-2">
                        <img src={clock} className='icnn' /> <label htmlFor="detailsTime" className="form-label">Time</label>
                        <input type="time" className="form-control form-control-sm" id="detailsTimeProcedure" name="detailsTime" onChange={handleChange} placeholder="Enter Time" />
                        {/* <small id='errTime' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>

                      <div className="mb-2 col-md-2 me-5">
                        <img src={notes} className='icnn' /> <label htmlFor="details" className="form-label">Procedure Note</label>
                        <input type="text" className="form-control form-control-sm" id="detailsProcedure" name="details" onChange={handleChange} placeholder="Enter Procedure Note" />
                        {/* <small id='errQuantity' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 relative">
                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                        <div>
                          {showUnderProcess === 1 ? <TosterUnderProcess /> :
                            <>
                              {showToster === 1 ?
                                <Toster value={tosterValue} message={tosterMessage} />

                                : <div>
                                  {updateBool === 0 ?
                                    <>
                                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={()=>{saveForm(5)}}><img src={savewhite} className='icnn' />Save</button>
                                      <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" onClick={() => { handleClear("detailsDateProcedure", "detailsTimeProcedure", "detailsProcedure") }}><img src={clearIcon} className='icnn' />Clear</button>
                                    </>
                                    :
                                    <>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={()=>{saveUpdate(5)}}>Update</button>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { setUpdateBool(0); handleClear("detailsDateProcedure", "detailsTimeProcedure", "detailsProcedure") }}>Cancel</button>
                                    </>
                                  }
                                </div>}
                            </>
                          }
                        </div>
                      </div>
                    </BoxContainer>
                  </div>
                </div>

              </div>



            </div>


          </div>
          <div className="col-12 mt-2">

            <div className="med-box">

              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <label className="labelPageIndex" >Showing <span className="pageIndex">1-3 </span> of  <span className="pageIndex">21</span> entries</label>
                </div>
                <div className='listdetailsct-in'>
                   <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." onChange={pagehandleSearch} />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                </div>
              </div>


              <div className="med-table-section" style={{ "height": "560px" }}>
                <table className='med-table border_ striped'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Date <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Procedure Note <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patientNotesList && patientNotesList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.detailsDate}</td>
                          <td>{val.detailsTime}</td>
                          <td>{val.details}</td>
                          <td>
                            <div className="action-button">
                              {/* <div className="actionItem" title="View"><img src={IconPrint} alt="IconPrint" /></div> */}
                              <div className="actionItem" title="Edit"><img src={IconEdit} alt="Edit" onClick={() => { handleUpdate(val.id, val.pmID, val.pdmID, val.detailsDate, val.detailsTime, val.details, val.userId, "detailsDateProcedure", "detailsTimeProcedure", "detailsProcedure") }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt="Delete" onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* ---------------------------------------------------- Goals Note Tab start------------------------------- */}
        <div className="tab-pane fade" id="nav-Goals" role="tabpanel" aria-labelledby="nav-Goals-tab" tabIndex="0">
          {/* <h1>Completed</h1> */}
          <div className="container-fluid">
            <div className="row">

              <div className="col-12 p-0">

                <div className="fieldsett-in">
                  <div className="fieldsett">
                    <span className='fieldse'>Patient Notes</span>
                    <BoxContainer>

                      <div className="mb-2 col-md-2 me-2">
                        <img src={calender} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Date</label>
                        <input type="date" className="form-control form-control-sm" id="detailsDateGoals" name="detailsDate" onChange={handleChange} placeholder="Enter Date" />
                        {/* <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 col-md-2 me-2">
                        <img src={clock} className='icnn' /> <label htmlFor="detailsTime" className="form-label">Time</label>
                        <input type="time" className="form-control form-control-sm" id="detailsTimeGoals" name="detailsTime" onChange={handleChange} placeholder="Enter Time" />
                        {/* <small id='errTime' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>

                      <div className="mb-2 col-md-2 me-5">
                        <img src={notes} className='icnn' /> <label htmlFor="details" className="form-label">Goals Note</label>
                        <input type="text" className="form-control form-control-sm" id="detailsGoals" name="details" onChange={handleChange} placeholder="Enter Goals Note" />
                        {/* <small id='errQuantity' className='form-text text-danger' style={{ display: 'none' }}></small> */}
                      </div>
                      <div className="mb-2 relative">
                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                        <div>
                          {showUnderProcess === 1 ? <TosterUnderProcess /> :
                            <>
                              {showToster === 1 ?
                                <Toster value={tosterValue} message={tosterMessage} />

                                : <div>
                                  {updateBool === 0 ?
                                    <>
                                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={()=>{saveForm(14)}}><img src={savewhite} className='icnn' />Save</button>
                                      <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" onClick={() => { handleClear("detailsDateGoals", "detailsTimeGoals", "detailsGoals") }}><img src={clearIcon} className='icnn' />Clear</button>
                                    </>
                                    :
                                    <>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={()=>{saveUpdate(14)}}>Update</button>
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { setUpdateBool(0); handleClear("detailsDateGoals", "detailsTimeGoals", "detailsGoals") }}>Cancel</button>
                                    </>
                                  }
                                </div>}
                            </>
                          }
                        </div>
                      </div>
                    </BoxContainer>
                  </div>
                </div>

              </div>



            </div>


          </div>
          <div className="col-12 mt-2">

            <div className="med-box">

              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <label className="labelPageIndex" >Showing <span className="pageIndex">1-3 </span> of  <span className="pageIndex">21</span> entries</label>
                </div>
                <div className='listdetailsct-in'>
                   <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." onChange={pagehandleSearch} />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                </div>
              </div>


              <div className="med-table-section" style={{ "height": "560px" }}>
                <table className='med-table border_ striped'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Date <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>Goals Note <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patientNotesList && patientNotesList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.detailsDate}</td>
                          <td>{val.detailsTime}</td>
                          <td>{val.details}</td>
                          <td>
                            <div className="action-button">
                              {/* <div className="actionItem" title="View"><img src={IconPrint} alt="IconPrint" /></div> */}
                              <div className="actionItem" title="Edit"><img src={IconEdit} alt="Edit" onClick={() => { handleUpdate(val.id, val.pmID, val.pdmID, val.detailsDate, val.detailsTime, val.details, val.userId, "detailsDateGoals", "detailsTimeGoals", "detailsGoals") }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt="Delete" onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* ---------------------------------- Pagination ----------------------------------- */}


        <div className="pagginationSection">
          <div className="paginationItemContainer">
            <div className="d-flex gap-2 align-items-center">
              <span className="spanText" style={{ minWidth: '125px' }}>The page you're on</span>
              <select name="" id="" className="form-select form-select-sm pagginationDrp">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="d-flex gap-2 align-items-center"> <span className="spanText">Previous</span> <i className="bi bi-arrow-left"></i> <i className="bi bi-arrow-right"></i> <span className="spanText">Next</span></div>
          </div>
        </div>

        {

          symptomsPopUp ? <OPDSymptomsPopUp val={symptomsPopUp} fun={setSymptomsPopUp} /> : ""
        }

        {/*  <!--  Delete Pop-Up Modal -->  */}

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
          <div className="modal-dialog modalDelete">
            <div className="modal-content">

              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                <div className='popDeleteTitle mt-3'> Delete?</div>
                <div className='popDeleteContent'> Are you sure you want to delete?</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
