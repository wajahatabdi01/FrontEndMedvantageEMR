import { React, useEffect, handlePrint, useState, useRef } from 'react'

import vaccineCheck from '../../../../../../src/assets/images/icons/vaccineCheck.svg'
import vaccineDues from '../../../../../../src/assets/images/icons/vaccineDues.svg'
import imgPrinter from '../../../../../../src/assets/images/icons/imgPrinter.svg'
// import '../../assets/css/CertificateCard.css'
import '../../../../../assets/css/CertificateCard.css'
import GetVaccinationChartData from '../../../../API/OPD/VaccinationChart/GetVaccinationChartData'
import TosterUnderProcess from '../../../../../Component/TosterUnderProcess'
import Toster from '../../../../../Component/Toster'
import DropdownWithSearch from '../../../../../Component/DropdownWithSearch'
import GetDoctorList from '../../../../../Registartion/API/GET/GetDoctorList'
import PostVaccinationData from '../../../../API/OPD/VaccinationChart/PostVaccinationData';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function VaccinationChart() {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    let uhID = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid;

    // const navigate= new useNavigate();
    let [storeDur, setStoreDur] = useState([]);
    let [storeVacName, setStoreVacName] = useState([]);
    let [storeAllData, setStoreAllData] = useState([]);
    let [doctorID, setDoctorID] = useState('');
    let [doctorList, setDoctorList] = useState([]);
    let [date, setDate] = useState('');
    let [vaccine, setVaccine] = useState('');
    let [duration, setDuration] = useState('');
    let [doseTerm, setDoseTerm] = useState('');
    let [remark, setRemark] = useState('');
    let [scheduleID, setScheduleID] = useState('');
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let storeDuration = [];
    let distinctSoreDuration = [];
    let storeVaccineName = [];
    let [clearDropdown, setClearDropdown] = useState(0);


    let getvaccinationChartData = async () => {
        let resp = await GetVaccinationChartData(uhID);
        let docRes = await GetDoctorList();
        if (resp.status === 1) {
            console.log('resp', resp.responseValue);
            for (let i = 0; i < resp.responseValue.length; i++) {
                storeDuration.push({ 'duration': resp.responseValue[i].duration, 'sno': resp.responseValue[i].sNum });
                storeVaccineName.push(resp.responseValue[i].vaccineName);
            };

            setStoreAllData(resp.responseValue);
            setStoreVacName([...new Set(storeVaccineName)]);
            distinctSoreDuration = [...new Set(storeDuration.map(JSON.stringify))].map(JSON.parse);
            setStoreDur(distinctSoreDuration.sort((a, b) => a.sno - b.sno));
            storeDuration = [];
            storeVaccineName = [];
            distinctSoreDuration = [];
        }
        console.log('reponse', resp.responseValue);

        if (docRes.status === 1) {
            setDoctorList(docRes.responseValue);
        }
    };


    // Get current date
    let curDate = new Date().toJSON().slice(0, 10);

    // Get Values in modal when click on the dues image
    const handleClick = (list) => {
        setDate(curDate);
        setVaccine(list.vaccineName);
        setDoseTerm(list.doseSNo);
        setDuration(list.duration);
        setScheduleID(list.scheduleID);
    };

    //Handle change
    const handleChange = (e) => {
        if (e.target.name === 'date') {
            setDate(e.target.value);
        }
        if (e.target.name === 'doctorId') {
            setDoctorID(e.target.value);
            document.getElementById('errddlDoctorID').style.display = 'none';
        }

        if (e.target.name === 'remark') {
            setRemark(e.target.value);
        }
    };

    //Save Values
    const handleSave = async () => {
        const obj = {
            uhid: uhID,
            vaccineScheduleId: scheduleID,
            doseDate: date,
            doctorId: doctorID,
            remark: remark,
            userID: window.userId
        };
        if (doctorID !== "") {
            let data = await PostVaccinationData(obj);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully!");
                getvaccinationChartData();
                handleClear(1)
                setTimeout(() => {
                    setShowToster(0);
                }, 2000);
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(data.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
        }
        else {
            document.getElementById('errddlDoctorID').innerHTML = 'Please select Doctor!!';
            document.getElementById('errddlDoctorID').style.display = 'block';
        }

    };

    //Clear Function
    const handleClear = (value) => {
        setDate(curDate);
        setDoctorID("")
        setClearDropdown(value);
        setRemark('');
    };


    //show data onload
    useEffect(() => {
        getvaccinationChartData();        

    }, []);



    // const handlePrint = () => {      
    //     window.print();
    
    // };


  const  handlePrint = () => {
        // const printContents = document.getElementById('divPrintContent').innerHTML;
        // const printWindow = window.open('', '_blank');
        // printWindow.document.write('<html><head><title>Print</title></head><body>');
        // ///Inject the external CSS file for printing
        // printWindow.document.write('<link rel="stylesheet" type="text/css" href="src/assets/css/CertificateCard.css">');
        // printWindow.document.write(printContents);
        // printWindow.document.write('</body></html>');
        // // printWindow.document.close();

        // // E:\medvantagenew\src\assets\css\CertificateCard.css

        // var printContents = document.getElementById('divPrintContent').innerHTML;
        // var originalContents = document.body.innerHTML;

        // document.body.innerHTML = printContents;
        //window.print();

        // document.body.innerHTML = originalContents;

        // window.onload = function() {
        //     window.print();
        //     window.close();
        // };

        document.getElementById("navbar").style.display = "none";
        document.getElementById("divPrintContent").style.marginTop = "-60px";
        document.getElementById("divPrintContent").style.marginBottom = "-120px";
        window.print();
        window.close();
        document.getElementById("navbar").style.display = "block";
        document.getElementById("divPrintContent").style.marginTop = "0px";
        document.getElementById("divPrintContent").style.marginBottom = "0px";
    }
    

    return (
        <>
 
        <div className='row'>
            <div className='col-12'>
                <div className='med-box'>

                    <div className='col-12'  id="divPrintContent">
                        <div className='d-flex flex-wrap justify-content-between'>
                            <div className="title">{t("vaccinationChartTitle")}</div>
                            <div className='d-flex flex-wrap justify-content-between column-gap-4 pt-2 me-2'>
                                <div><img src={vaccineCheck} /> <span className='vaccinatedIndicators'>{t("vaccinatedIndicator")}</span></div>
                                <div><img src={vaccineDues} /> <span className='vaccinatedIndicators'>{t("dueIndicator")}</span></div>
                                <div className='printIcon hideOnprint' title={t("printIconTitle")} id='printIcon' onClick={handlePrint}><img src={imgPrinter} /></div>
                            </div>
                        </div>
                        <div className='med-table-section mt-1 p-2' style={{ minHeight: '850px' }} >
                            <div className="title" style={{ display: 'none' }}>{t("vaccinationChartTitle")}</div>
                            <table className='table-certificate border tableVaccination'>
                                <thead>
                                    <tr>
                                        <th className='bgDCE7FF color1D4999'>{t("vaccinationChartTitle")}</th>
                                        {storeDur && storeDur.map((list, index) => {
                                            return (
                                                <th className='bgDCE7FF color1D4999 text-center'>{list.duration}</th>
                                            )
                                        })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeVacName && storeVacName.map((list1, index1) => {
                                        return (
                                            <tr>
                                                <td className='bgDCE7FF color1D4999'><b>{list1}</b></td>
                                                {storeDur && storeDur.map((list2, index2) => {
                                                    return (
                                                        <td className='text-center bglight-g'>
                                                            {storeAllData && storeAllData.map((list3, index3) => {
                                                                if (list1 === list3.vaccineName && list2.duration === list3.duration) {
                                                                    return (
                                                                        list3.scheduleColor === 'vaccineDues' ?
                                                                            <div style={{ cursor: 'pointer' }} data-bs-toggle="modal"
                                                                                data-bs-target="#vaccinationChart" onClick={() => handleClick(list3)}>
                                                                                <img src={vaccineDues} />
                                                                            </div>
                                                                            :
                                                                            <div><img src={vaccineCheck} /></div>
                                                                    )
                                                                }
                                                            })
                                                            }
                                                        </td>
                                                    )
                                                })
                                                }
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
        {/* Modal for Save Vaccination */}
        <div className='modal fade' id="vaccinationChart" data-bs-backdrop="static">
            <div className="modal-dialog modal-md" style={{ margin: '30px auto' }}>
                <div className="modal-content p-0">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">
                            <label htmlFor="">{t("Vaccination Input")}</label>
                        </h1>

                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' ><i className="bi bi-x-octagon"></i></button>
                    </div>
                    <div className="modal-body p-0">
                        <div className="row">
                            <div className="col-12">

                                <div className="med-box">
                                    <div className="inner-content">
                                        <div className="row">
                                            <div className="col-md-6 mb-2">
                                                <label for="date" className="form-label"> {t("Select Doctor")} </label>
                                                <DropdownWithSearch defaulNname={t("Select Doctor")} name="doctorId" list={doctorList} valueName="id" displayName="name" editdata={""} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                                                <small id="errddlDoctorID" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>


                                            <div className="col-md-6 mb-2">
                                                <label for="date" className="form-label"> {t("Select_Date")} </label>
                                                <input type="date" name='date' id='date' value={date} onChange={handleChange} placeholder='dd/mm/yyyy' className="form-control form-control-sm" />

                                            </div>

                                            <div className="col-md-4 mb-2">
                                                <label for="vaccine" className="form-label"> {t("vaccine")} </label>
                                                <input type="text" name='vaccine' id='vaccine' value={vaccine} onChange={handleChange} placeholder={t("'vaccine'")} className="form-control form-control-sm" disabled={true} />
                                            </div>

                                            <div className="col-md-4 mb-2">
                                                <label for="duration" className="form-label"> {t("Duration")} </label>
                                                <input type="text" name='duration' id='duration' value={duration} onChange={handleChange} placeholder={t('Duration')} className="form-control form-control-sm" disabled={true} />
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <label for="doseTerm" className="form-label"> {t("Dose Term")} </label>
                                                <input type="text" name='doseTerm' id='doseTerm' value={doseTerm} onChange={handleChange} placeholder={t("doseTerm")} className="form-control form-control-sm" disabled={true} />
                                            </div>

                                            <div className="col-md-12 mb-2">
                                                <label className="form-label"> {t("Remark")} </label>
                                                <textarea name='remark' id='remark' value={remark} onChange={handleChange} placeholder={t("Remarks")} className="form-control"></textarea>
                                                {/* <input type="text" name='remark' id='remark' value={remark} onChange={handleChange} placeholder='Please Enter Remark'  className="form-control form-control-md" /> */}
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                {/* <label for="time" className="form-label"> &nbsp;</label> */}
                                                {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                    showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                        :
                                                        <div className='d-flex column-gap-2 justify-content-end'>
                                                            <button type="button" className="btn btn-save btn-sm mb-1" onClick={handleSave}>{t("Save")}</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => handleClear(1)}>{t("Clear")}</button>
                                                        </div>
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
        </>
    )
}



