import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading'
import BoxContainer from '../../Component/BoxContainer'
import TableContainer from '../../Component/TableContainer'
import Toster from '../../Component/Toster'
import TosterUnderProcess from '../../Component/TosterUnderProcess'
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster'
import PostAddRule from '../API/AddRule/PostAddRule'
import GetAddRule from '../API/AddRule/GetAddRule'
export default function AddRule() {
    let [updateBool, setUpdateBool] = useState(0)
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')
    let [sendForm, setSendForm] = useState({
        "userId": window.userId,
        "clientId": window.clientId,
        title: '',
        active: 0,
        passive: 0,
        patientReminder: 0,
        bibliographicCitation: '',
        developer: '',
        fundingSource: '',
        release: '',
        webReference: '',
        referentialCDS: '',
    })

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    let [content, setContent] = useState('');
    const { t } = useTranslation();

    let [makeData, setMakeData] = useState([]);
    let [getData, setgetData] = useState([]);
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    const [PopUpId, setPopUpId] = useState('');
    const customStyle = { marginLeft: '0px' };

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleOpenModal = (modalID) => {
        setIsShowPopUp(1);
        setPopUpId(modalID);
    }

    const handleCloseModal = () => {
        setIsShowPopUp(0);
        setPopUpId('');
    }

    let SelectedData = (data, modalID) => {
        let t = {
            moduleId: modalID,
            data: data
        }
        setgetData(t);
        setMakeData([...makeData, t])
        let temp = ""
        for (var i = 0; i < data.length; i++) {
            temp += " " + data[i].code
        }
        
        document.getElementById(modalID).value = temp
       
    }

    //Handle Change
    let handleChange = async (e) => {
        const { name, value, checked } = e.target;

        if (name === "active") {
            setSendForm((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        }
        else if (name === "passive") {
            setSendForm((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        }
        else if (name === "patientReminder") {
            setSendForm((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        }
        else {
            setSendForm((prevData) => ({
                ...prevData,
                [name]: value,
                "userId": window.userId,
                "clientId": window.clientId
            }));
        }
    }

    const dataMaker = async(param) => {
       
        const lastIndexMap = {};
        var jsonData = param;
        jsonData.forEach((item, index, array) =>{
          const moduleId = item.moduleId;
          lastIndexMap[moduleId] = array[index];        
          });
        const dataArray = Object.values(lastIndexMap);
               
         return dataArray;
    }
  

    //Handle Save 
    const handlerSave = async () => {
        //let tempArrList = [];
       
        const getresponse = await dataMaker(makeData);
        
        const codeArr = getresponse[0].data;
        
        var maker="";
       var codeTextMaker= "";
       for(var j=0; j < codeArr.length; j++)
       { maker=maker.length === 0 ? codeArr[j].dropdownName +':'+codeArr[j].code  : maker +';'+codeArr[j].dropdownName +':'+codeArr[j].code;
        codeTextMaker =  codeTextMaker.length === 0 ? (codeArr[j].codeText  ? codeArr[j].codeText : '') : codeTextMaker +'|'+(codeArr[j].codeText  ? codeArr[j].codeText : '');}

        // tempArrList.push({          
        //     codeType: maker,
        //     codeText: codeTextMaker,          
        //   });                               
       
        const colabDataOfMakerAndCodeText = maker + ' ' + codeTextMaker;
       
        const activeData = document.getElementById("active").checked ? 1 : 0;
        const passiveData = document.getElementById("passive").checked ? 1 : 0;
        const patientReminderData = document.getElementById("patientReminder").checked ? 1 : 0;
        if (sendForm.title === '' || sendForm.title === null || sendForm.title === undefined) {
            document.getElementById('errTitle').innerHTML = "Title is Required";
            document.getElementById('errTitle').style.display = "block";
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                "title": sendForm.title,
                "active": activeData,
                "passive": passiveData,
                "patientReminder": patientReminderData,
                "bibliographicCitation": sendForm.bibliographicCitation,
                "developer": sendForm.developer,
                "fundingSource": sendForm.fundingSource,
                "release": sendForm.release,
                "webReference": sendForm.webReference,
                "referentialCDS" : colabDataOfMakerAndCodeText,
                "userId": window.userId
            }
           
            const response = await PostAddRule(obj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully.!");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear();
                }, 1500)
            }
            else {
                setShowUnderProcess(0);
                setTosterValue(1);
                setShowToster(1);
                setTosterMessage(response.responseValue);
                setTimeout(() => {
                    setShowToster(0);
                }, 1500)
            }
        }
    }


    //Handel Clear
    const handleClear = () => {
        setUpdateBool(0);
        document.getElementById("title").value = "";
        document.getElementById("bibliographicCitation").value = "";
        document.getElementById("developer").value = "";
        document.getElementById("fundingSource").value = "";
        document.getElementById("release").value = "";
        document.getElementById("webReference").value = "";
        document.getElementById("referentialCDS").value = "";
        document.getElementById('errTitle').style.display = "none";
        setSendForm({ "userId": window.userId, "clientId": window.clientId })
        document.getElementById("active").checked = 0;
        document.getElementById("passive").checked = 0;
        document.getElementById("patientReminder").checked = 0;
    }


    useEffect(() => {
    }, [])
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className='whitebg'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Add Rule")}</span>

                                        <div className='row px-1 py-3'>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="title" className="form-label">Title <span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" id="title" name='title' onChange={handleChange} placeholder={t("Enter Title")} />
                                                    <small id="errTitle" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Type </label>
                                                    <div className='d-flex gap-3 flex-wrap checklabel'>
                                                        <div className="form-check ps-0">
                                                            <input className="form-check-input" type="checkbox" id="active" name="active" />
                                                            <label className="form-check-label" htmlFor="active" >
                                                                Active Alert
                                                            </label>
                                                        </div>
                                                        <div className="form-check ps-0">
                                                            <input className="form-check-input" type="checkbox" id="passive" name="passive" />
                                                            <label className="form-check-label" htmlFor="passive" >
                                                                Passive Alert
                                                            </label>
                                                        </div>
                                                        <div className="form-check ps-0">
                                                            <input className="form-check-input" type="checkbox" id="patientReminder" name="patientReminder" />
                                                            <label className="form-check-label" htmlFor="patientReminder">
                                                                Patient Reminder
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="bibliographicCitation" className="form-label">Bibliographic Citation</label>
                                                    <input type="text" className="form-control form-control-sm" id="bibliographicCitation" name='bibliographicCitation' onChange={handleChange} placeholder={t("Enter Bibliographic Citation")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="developer" className="form-label">Developer</label>
                                                    <input type="text" className="form-control form-control-sm" id="developer" name='developer' onChange={handleChange} placeholder={t("Enter Developer")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="fundingSource" className="form-label">Funding Source</label>
                                                    <input type="text" className="form-control form-control-sm" id="fundingSource" name='fundingSource' onChange={handleChange} placeholder={t("Enter Funding Source")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="release" className="form-label">Release</label>
                                                    <input type="text" className="form-control form-control-sm" id="release" name='release' onChange={handleChange} placeholder={t("Enter Release")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="webReference" className="form-label">Web Reference</label>
                                                    <input type="text" className="form-control form-control-sm" id="webReference" name='webReference' onChange={handleChange} placeholder={t("Enter Web Reference")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="referentialCDS" className="form-label">Referential CDS</label>
                                                    {/* <input type="text" className="form-control form-control-sm" id="referentialCDS" name='referentialCDS' placeholder={t("Enter Referential CDS")} onClick={() => { handleOpenModal('referentialCDS') }} /> */}
                                                    <input  id="referentialCDS" type="text" className="form-control form-control-sm" name="referentialCDS" placeholder= "Enter Code" onClick={()=> {handleOpenModal('referentialCDS')}} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
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
                                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1">{t("UPDATE")}</button>
                                                                                <button type="button" className="btn btn-clear btn-sm mb-1">{t("Cancel")}</button>
                                                                            </>
                                                                        }
                                                                    </div>}
                                                            </>
                                                        }
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

                {/* -------------------------Table Section-------------------------------- */}


                {/* ------------------------------------------ Code Master popUp Start------------------------------------ */}
                {isShowPopUp === 1 ?

                    <div className={`modal d-${isShowPopUp === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static" >
                        <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
                            <div className="modal-content" >
                                {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>


                                <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={true} />
                                {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                            </div>
                        </div>
                    </div>
                    : ''}
                {/* ------------------------------------------ Code Master popUp End------------------------------------ */}
            </section>

        </>
    )
}
