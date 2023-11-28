import React, { useEffect, useState } from 'react'


import editbtn from '../../../../../assets/images/icons/editbtn.svg'
import delbtn from '../../../../../assets/images/icons/delbtn.svg'

import spo2 from '../../../../../assets/images/icons/spo2.svg'
import BP from '../../../../../assets/images/icons/BP.svg'
import PR from '../../../../../assets/images/icons/PR.svg'
import RR from '../../../../../assets/images/icons/RR.svg'
import weight from '../../../../../assets/images/icons/weight.svg'
import height from '../../../../../assets/images/icons/height.svg'
import temperature from '../../../../../assets/images/icons/temperature.svg'
import time from '../../../../../assets/images/icons/time.svg'
import takenby from '../../../../../assets/images/icons/takenby.svg'
import action from '../../../../../assets/images/icons/action.svg'
import save from '../../../../../assets/images/icons/save.svg'
import clear from '../../../../../assets/images/icons/clear.svg'
import GetData from '../../../../../assets/images/icons/GetData.svg'
import microphone from '../../../../../assets/images/icons/microphone.svg'

import BPSystolic from '../../../../../assets/images/vitalsicons/BPSystolic.svg'
import bp from '../../../../../assets/images/vitalsicons/bp.svg'
import temprature from '../../../../../assets/images/vitalsicons/temprature.svg'
import lungs from '../../../../../assets/images/vitalsicons/lungs.svg'
import heart from '../../../../../assets/images/vitalsicons/heart.svg'
import pulse from '../../../../../assets/images/vitalsicons/pulse.svg'
import spo from '../../../../../assets/images/vitalsicons/spo.svg'
import height1 from '../../../../../assets/images/vitalsicons/height1.svg'
import weight1 from '../../../../../assets/images/vitalsicons/weight1.svg'
import rbs from '../../../../../assets/images/vitalsicons/rbs.svg'
import heart2 from '../../../../../assets/images/vitalsicons/heart2.svg'
import plat from '../../../../../assets/images/vitalsicons/plat.svg'
import liver from '../../../../../assets/images/vitalsicons/liver.svg'
import fungus from '../../../../../assets/images/vitalsicons/fungus.svg'

import Pallor from '../../../../../assets/images/vitalsicons/Pallor.svg'
import Icterus from '../../../../../assets/images/vitalsicons/Icterus.svg'
import Cyanosis from '../../../../../assets/images/vitalsicons/Cyanosis.svg'
import Clubbing from '../../../../../assets/images/vitalsicons/Clubbing.svg'
import Lymphadenopathy from '../../../../../assets/images/vitalsicons/Lymphadenopathy.svg'
import Skin from '../../../../../assets/images/vitalsicons/Skin.svg'
import Tongue from '../../../../../assets/images/vitalsicons/Tongue.svg'
import Throat from '../../../../../assets/images/vitalsicons/Throat.svg'
import Conjunctivae from '../../../../../assets/images/vitalsicons/Conjunctivae.svg'
import Pupils from '../../../../../assets/images/vitalsicons/Pupils.svg'
import Nails from '../../../../../assets/images/vitalsicons/Nails.svg'
import IdentificationMarks from '../../../../../assets/images/vitalsicons/IdentificationMarks.svg'

import Lips from '../../../../../assets/images/vitalsicons/Lips.svg'
import Teeth from '../../../../../assets/images/vitalsicons/Teeth.svg'
import Gums from '../../../../../assets/images/vitalsicons/Gums.svg'

import lungs1 from '../../../../../assets/images/vitalsicons/lungs1.svg'
import PeripheralPulses from '../../../../../assets/images/vitalsicons/PeripheralPulses.svg'
import PAP from '../../../../../assets/images/vitalsicons/PAP.svg'
import CI from '../../../../../assets/images/vitalsicons/CI.svg'
import SVR from '../../../../../assets/images/vitalsicons/SVR.svg'
import PVR from '../../../../../assets/images/vitalsicons/PVR.svg'
import SvO2 from '../../../../../assets/images/vitalsicons/SvO2.svg'


import Deformity from '../../../../../assets/images/vitalsicons/Deformity.svg'
import LIMB from '../../../../../assets/images/vitalsicons/LIMB.svg'

import FIO2 from '../../../../../assets/images/vitalsicons/FIO2.svg'
import PEEP from '../../../../../assets/images/vitalsicons/PEEP.svg'
import BoxContainer from '../../../../../Component/BoxContainer'
import Heading from '../../../../../Component/Heading'
import POSTInsertPatientVital from '../../../../API/OPD/Vitals/POSTInsertPatientVital'
import TosterUnderProcess from '../../../../../Component/TosterUnderProcess'
import Toster from '../../../../../Component/Toster'
import PostVentilatorDetails from '../../../IPD/IPDSharePages/VentilatorDetails/PostVentilatorDetails';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function OPDVLeft(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    
    let [sendForm, setSendForm] = useState("")
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [currentTime, setCurrentTime] = useState(new Date());
    let [showVentiUnderProcess, setShowVentiUnderProcess] = useState(0)
    let [showVentiToster, setShowVentiToster] = useState(0)
    let [ventiTosterMessage, setVentiTosterMessage] = useState("")
    let [ventiTosterValue, setVentiTosterValue] = useState(0)
    let [peepVal, setPeepVal] = useState('')
    let [fiotow, setFiotow] = useState('')
    let [userID,setUserID]=useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
    let saveData = async () => {
        if (props.callingpage === 0) {
            sendForm["uhid"] = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : ""
        }
        else if (props.callingpage === 1) {
            sendForm["uhid"] = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : ""

        }
        // sendForm["uhid"] = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        sendForm["userId"] = window.userId
        sendForm["vitalDate"] = document.getElementById('vitalDate').value
        sendForm["vitalTime"] = document.getElementById('vitalTime').value
        let dateVal = document.getElementById('vitalDate').value;
        let timeVal = document.getElementById('vitalTime').value;
        let bpsVal = document.getElementById('vmValueBPSys').value;
        let bpdVal = document.getElementById('vmValueBPDias').value;
        let spo2Val = document.getElementById('vmValueSPO2').value;
        let RRVal = document.getElementById('vmValueRespiratoryRate').value;
        let HRVal = document.getElementById('vmValueHeartRate').value;
        let PRVal = document.getElementById('vmValuePulse').value;
        let TempVal = document.getElementById('vmValueTemperature').value;
        let RBSVal = document.getElementById('vmValueRbs').value;
        if (dateVal === '' || dateVal === undefined || dateVal === null) {
            document.getElementById('errDate').innerHTML = "Please select Date";
            document.getElementById('errDate').style.display = "block";
        }
        else if (timeVal === '' || timeVal === undefined || timeVal === null) {
            document.getElementById('errTime').innerHTML = "Please select Time";
            document.getElementById('errTime').style.display = "block";
        }
        else if (bpsVal > 500) {
            document.getElementById('errBPS').innerHTML = "Enter valid value";
            document.getElementById('errBPS').style.display = "block";
        }
        else if (bpdVal > 1000) {
            document.getElementById('errBPD').innerHTML = "Enter valid value";
            document.getElementById('errBPD').style.display = "block";
        }
        else if (spo2Val > 100) {
            document.getElementById('errSPO2').innerHTML = "Enter valid value";
            document.getElementById('errSPO2').style.display = "block";
        }
        else if (RRVal > 50) {
            document.getElementById('errRR').innerHTML = "Enter valid value";
            document.getElementById('errRR').style.display = "block";
        }
        else if (HRVal > 220) {
            document.getElementById('errHR').innerHTML = "Enter valid value";
            document.getElementById('errHR').style.display = "block";
        }
        else if (PRVal > 220) {
            document.getElementById('errPR').innerHTML = "Enter valid value";
            document.getElementById('errPR').style.display = "block";
        }
        else if (TempVal > 110) {
            document.getElementById('errTemp').innerHTML = "Enter valid value";
            document.getElementById('errTemp').style.display = "block";
        }
        else if (RBSVal > 2400) {
            document.getElementById('errRBS').innerHTML = "Enter valid value";
            document.getElementById('errRBS').style.display = "block";
        }
       
        else {
           
            setShowUnderProcess(1)
            let response = await POSTInsertPatientVital(sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
                props.setGetData(1)
                handleClear();
                console.log(response)
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
    }

    let handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "vitalDate") {
            document.getElementById("errDate").style.display = "none";
        }
        else if (name === "vitalTime") {
            document.getElementById("errTime").style.display = "none";

        }
        else if (name === "vmValueBPSys") {
            document.getElementById("errBPS").style.display = "none";

        }
        else if (name === "vmValueBPDias") {
            document.getElementById("errBPD").style.display = "none";

        }
        else if (name === "vmValueSPO2") {
            document.getElementById("errSPO2").style.display = "none";

        }
        else if (name === "vmValueRespiratoryRate") {
            document.getElementById("errRR").style.display = "none";

        }
        else if (name === "vmValueHeartRate") {
            document.getElementById("errHR").style.display = "none";

        }
        else if (name === "vmValuePulse") {
            document.getElementById("errPR").style.display = "none";

        }
        else if (name === "vmValueRbs") {
            document.getElementById("errRBS").style.display = "none";

        }
        else if (name === "vmValueTemperature") {
            document.getElementById("errTemp").style.display = "none";

        }
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))

    };

    let handleClear = () => {
        document.getElementById('vmValueBPSys').value = '';
        document.getElementById('vmValueBPDias').value = '';
        document.getElementById('vmValueTemperature').value = '';
        document.getElementById('vmValueRespiratoryRate').value = '';
        document.getElementById('vmValueHeartRate').value = '';
        document.getElementById('vmValuePulse').value = '';
        document.getElementById('vmValueSPO2').value = '';
        // document.getElementById('weight').value = '';
        // document.getElementById('height').value = '';
        document.getElementById('vmValueRbs').value = '';
        document.getElementById('vitalTime').value = '';
        // document.getElementById('vitalDate').value = '';
        document.getElementById('vitalDate').value = curdate();
         document.getElementById('vitalTime').value = formattedTime;
    };
    let curdate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        document.getElementById('vitalDate').value=formattedDate;
        return formattedDate;
    };


     

  

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    let handlerChangeVenti =(e)=>{
        document.getElementById("errFio").style.display="none"
        document.getElementById("errPeep").style.display="none"
        if(e.target.name ==="fiotow"){
           setFiotow(e.target.value);
        }
        else if(e.target.name === "peepVal"){
           
            setPeepVal(e.target.value);
        }
    }
    let handlerSaveVenti = async()=>{
        let getPmID = "";
        const getActiveUhid=JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
        const getpatientList=JSON.parse(sessionStorage.getItem("IPDpatientList"));
        getpatientList.map((val,i)=>{
        if(val.uhId === getActiveUhid){
            getPmID=  val.pmId ; 
            return;
        }
        });
        if(fiotow === '' || fiotow < 1 || fiotow === undefined || fiotow === null){
            document.getElementById("errFio").style.display="block"
        } 
        else if(peepVal === '' || peepVal < 1 || peepVal === undefined || peepVal === null){
            document.getElementById("errPeep").style.display="block"
        }
        else{
            const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
            const obj={
                id: 0,
                pmId: getPmID,
                userId: userID,
                pid: 0,
                peep: peepVal,
                fiO2: fiotow,
                isFromMachine: false,
                ventiMode: 0,
                ClientId:clientID
            }
                setShowVentiUnderProcess(1)
                const response= await PostVentilatorDetails(obj);
                if(response.status===1){
                    setShowVentiUnderProcess(0)
                    setShowVentiToster(1)
                    setVentiTosterMessage("Data Save SuccessFully!")
                    setVentiTosterValue(0)
                    setTimeout(() => {
                        setShowVentiToster(0)
                    }, 2000)
                    setFiotow('');
                    setPeepVal('');   
                    props.setGetData(1)
                  
                }
                else{
                    setShowVentiUnderProcess(0)
                    setShowVentiToster(1)
                    setVentiTosterMessage(response.responseValue)
                    setVentiTosterValue(1)
                    setTimeout(() => {
                        setShowVentiToster(0)
                    }, 2000)
                }
        }
    }
     useEffect(() => {
        curdate();
        document.getElementById('vitalTime').value = formattedTime;
    }, []);



    return (
        <div className='vitallt'>
            <div className="boxcontainer whitebackgroundnopad wb" style={{minHeight:"28vh"}}>
                <div className='d-flex justify-content-between'>
                    <div className='tblheading'>Vital Input</div>

                    <div className='mt-2  d-flex gap-1 vital-btn-date'>

                        <div>
                            <div className='vitals-cnt-in10'>
                                <input type='date' name="vitalDate" id='vitalDate' onChange={handleOnChange} />
                            </div>
                            <small id="errDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div>
                            <div className='vitals-cnt-in10'>
                                <input type='time' name="vitalTime" id='vitalTime' onChange={handleOnChange} />
                            </div>
                            <small id="errTime" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                    </div>


                </div>

                <div className='mainsubheading pt-2'>General</div>
                <div className='vitals-cnt customeInput'>

                  
                        <div className='vitals-cnt-in'>
                            <img src={BPSystolic} className='icnn1' />
                            <input type='number' placeholder='BPS(mm Hg)' name='vmValueBPSys' id='vmValueBPSys' onChange={handleOnChange} />
                            {/* <small id="errBPS" className="form-text text-danger" style={{ display: 'none' }}></small> */}
                            <small id="errBPS" className="absolute-alert" style={{ display: 'none' }}></small>
                        </div>                        
                       
                   
                    <div className='vitals-cnt-in'>
                        <img src={bp} className='icnn1' />
                        <input type='number' placeholder='BPD(mm Hg)' name='vmValueBPDias' id='vmValueBPDias' onChange={handleOnChange} />
                        <small id="errBPD" className="absolute-alert" style={{ display: 'none' }}></small>
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={spo} className='icnn1' />
                        <input type='number' placeholder='SPO2' name='vmValueSPO2' id='vmValueSPO2'  onChange={handleOnChange} />
                        <small id="errSPO2" className="absolute-alert" style={{ display: 'none' }}></small>
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={lungs} className='icnn1' />
                        <input type='number' placeholder='RR/m' name='vmValueRespiratoryRate' id='vmValueRespiratoryRate' onChange={handleOnChange} />
                        <small id="errRR" className="absolute-alert" style={{ display: 'none' }}></small>
                    </div>
                    {/* <div className='vitals-cnt-in'>
                        <img src={bp} className='icnn1' />
                        <input type='text' placeholder='BP_S-BP_D' style={{ width: "65px" }} />
                    </div> */}
                    <div className='vitals-cnt-in'>
                        <img src={heart} className='icnn1' />
                        <input type='number' placeholder='HR' name='vmValueHeartRate' id='vmValueHeartRate'  onChange={handleOnChange}/>
                        <small id="errHR" className="absolute-alert" style={{ display: 'none' }}></small>
                    </div>

                    {/* <div className='vitals-cnt-in'>
                        <img src={temprature} className='icnn1' />
                        <input type='text' placeholder='Temp(C)' style={{ width: "50px" }} />   
                    </div> */}


                    <div className='vitals-cnt-in'>
                        <img src={pulse} className='icnn1' />
                        <input type='number' placeholder='Pulse(Beats)' name='vmValuePulse' id='vmValuePulse' onChange={handleOnChange} />
                        <small id="errPR" className="absolute-alert" style={{ display: 'none' }}></small>
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={temprature} className='icnn1' />
                        <input type='number' placeholder='Temp(°F)' name='vmValueTemperature' id='vmValueTemperature' onChange={handleOnChange} />
                        <small id="errTemp" className="absolute-alert" style={{ display: 'none' }}></small>
                    </div>
                    {/* <div className='vitals-cnt-in'>
                        <img src={height1} className='icnn1' />
                        <input type='number' placeholder='Ht (cm)' name='height' id='height' onChange={handleOnChange} />
                    </div> */}
                    {/* <div className='vitals-cnt-in'>
                        <img src={weight1} className='icnn1' />
                        <input type='number' placeholder='Wt (kg)' name='weight' id='weight'  onChange={handleOnChange} />
                    </div> */}
                    <div className='vitals-cnt-in'>
                        <img src={rbs} className='icnn1' />
                        <input type='number' placeholder='RBS (mg/dl)' name='vmValueRbs' id='vmValueRbs' onChange={handleOnChange} />
                        <small id="errRBS" className="absolute-alert" style={{ display: 'none' }}></small>
                    </div>



                    {/* <div className='vitals-cnt-in'>
                        <img src={heart2} className='icnn1' />
                        <input type='text' placeholder='Iabp Ratio' style={{ width: "60px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={plat} className='icnn1' />
                        <input type='text' placeholder='P(Plat)' style={{ width: "40px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={liver} className='icnn1' />
                        <input type='text' placeholder='Trigger' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={temprature} className='icnn1' />
                        <input type='text' placeholder='Peripheral Temp.' style={{ width: "95px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={fungus} className='icnn1' />
                        <input type='text' placeholder='Fungus' style={{ width: "50px" }} />
                    </div> */}

                </div>

                {/* <div className='mainsubheading'>Head To Toe</div>
                <div className='vitals-cnt'>

                    <div className='vitals-cnt-in'>
                        <img src={Pallor} className='icnn1' />
                        <input type='text' placeholder='Pallor' style={{ width: "40px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Icterus} className='icnn1' />
                        <input type='text' placeholder='Icterus' style={{ width: "40px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Cyanosis} className='icnn1' />
                        <input type='text' placeholder='Cyanosis' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Clubbing} className='icnn1' />
                        <input type='text' placeholder='Clubbing' style={{ width: "55px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Lymphadenopathy} className='icnn1' />
                        <input type='text' placeholder='Lymphadenopathy' style={{ width: "105px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Skin} className='icnn1' />
                        <input type='text' placeholder='Skin' style={{ width: "30px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Tongue} className='icnn1' />
                        <input type='text' placeholder='Tongue' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Throat} className='icnn1' />
                        <input type='text' placeholder='Throat' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Conjunctivae} className='icnn1' />
                        <input type='text' placeholder='Conjunctivae' style={{ width: "75px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Pupils} className='icnn1' />
                        <input type='text' placeholder='Pupils' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Nails} className='icnn1' />
                        <input type='text' placeholder='Nails' style={{ width: "35px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={IdentificationMarks} className='icnn1' />
                        <input type='text' placeholder='Identification Marks' style={{ width: "110px" }} />
                    </div>
                </div>

                <div className='mainsubheading'>Oral</div>
                <div className='vitals-cnt'>

                    <div className='vitals-cnt-in'>
                        <img src={Lips} className='icnn1' />
                        <input type='text' placeholder='Lips' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Teeth} className='icnn1' />
                        <input type='text' placeholder='Teeth' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={Gums} className='icnn1' />
                        <input type='text' placeholder='Gums' style={{ width: "50px" }} />
                    </div>

                </div>

                <div className='mainsubheading'>CVS</div>
                <div className='vitals-cnt'>

                    <div className='vitals-cnt-in'>
                        <img src={lungs1} className='icnn1' />
                        <input type='text' placeholder='CV P(my)' style={{ width: "60px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={lungs1} className='icnn1' />
                        <input type='text' placeholder='SV V' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={lungs1} className='icnn1' />
                        <input type='text' placeholder='PAW P(my)' style={{ width: "70px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={PeripheralPulses} className='icnn1' />
                        <input type='text' placeholder='Peripheral Pulses_R' style={{ width: "115px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={PeripheralPulses} className='icnn1' />
                        <input type='text' placeholder='Peripheral Pulses_L' style={{ width: "115px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={PAP} className='icnn1' />
                        <input type='text' placeholder='PAP' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={CI} className='icnn1' />
                        <input type='text' placeholder='CI' style={{ width: "30px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={SVR} className='icnn1' />
                        <input type='text' placeholder='SVR' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={PVR} className='icnn1' />
                        <input type='text' placeholder='PVR' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={SvO2} className='icnn1' />
                        <input type='text' placeholder='SvO2' style={{ width: "50px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={lungs} className='icnn1' />
                        <input type='text' placeholder='CO' style={{ width: "30px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={heart2} className='icnn1' />
                        <input type='text' placeholder='Pedal Edema' style={{ width: "75px" }} />
                    </div>

                </div>


                <div className='mainsubheading'>Ortho</div>
                <div className='vitals-cnt'>

                    <div className='vitals-cnt-in'>
                        <img src={Deformity} className='icnn1' />
                        <input type='text' placeholder='Deformity Types & Deg' style={{ width: "135px" }} />
                    </div>
                    <div className='vitals-cnt-in'>
                        <img src={LIMB} className='icnn1' />
                        <input type='text' placeholder='LIMB Length Discrepan' style={{ width: "127px" }} />
                    </div>

                </div> */}

                <div className='inner-content'>
                    <div className='d-flex flex-wrap   gap-3 p-2 boxcontainer justify-content-end'>
                        <div className="mb-2 justify-content-end">
                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                            <div className='diet-btn vital-btn '>

                                {/* <button type="button" className="btn btn-save btn-save-fill btn-sm"><img src={GetData} className='icnn' /> Get Data</button>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm" name='vitalDate' ><img src={microphone} className='icnn' /> Voice Data</button> */}
                                {showUnderProcess === 1 ? <TosterUnderProcess /> : <>
                                    {
                                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> :
                                            <button type="button" className="btn btn-save btn-save-fill btn-sm " name='vitalTime' onClick={saveData} ><img src={save} className='icnn' /> {t("Save")}</button>

                                    }
                                </>}

                                <button type="button" className="btn btn-save btn-sm btnbluehover" onClick={handleClear}><img src={clear} className='icnn' /> {t("Clear")}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* <div className="mt-2 boxcontainer">
                <div className='tblheading'>Ventilator Details</div>
                <p className='note'><strong>Note :</strong> Keep the PEEP value as 5 when you assign the ventilator first time.</p>
                <BoxContainer>
                    <div className="mb-2 me-2">
                        <img src={FIO2} className='icnn' /> <label htmlFor="FIO2" className="form-label">FIO2</label>
                        <label className="form-control form-control-sm mt-2">40</label>
                    </div>
                    <div className="mb-2 me-2">
                        <img src={PEEP} className='icnn' /> <label htmlFor="PEEP" className="form-label">PEEP</label>
                        <label className="form-control form-control-sm mt-2">10</label>
                    </div>
                    <div className="mb-2 me-2">
                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                        <div className='diet-btn'>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm mt-2"><img src={save} className='icnn' /> Save</button>
                        </div>
                    </div>
                </BoxContainer>
            </div> */}
            <div className="boxcontainer whitebackgroundnopad wb" style={{minHeight:"60vh"}}>
                <div className='tblheading'>Ventilator Details</div>
                <p className='note'><strong>Note :</strong> Keep the PEEP value as 5 when you assign the ventilator first time.</p>
                <BoxContainer>
                    <div className="mb-2 me-2">
                        <img src={FIO2} className='icnn'  /> <label htmlFor="FIO2" className="form-label">FIO2</label>
                        <input type="number" className="form-control form-control-sm mt-2" placeholder='FIO2' value={fiotow} name='fiotow' onChange={handlerChangeVenti}/>
                         <small id="errFio" className="form-text text-danger" style={{ display: 'none' }}>Please Fill FIO2</small>
                    </div>
                    <div className="mb-2 me-2">
                        <img src={PEEP} className='icnn' /> <label htmlFor="PEEP" className="form-label" >PEEP</label>
                       
                        <input type="number" className="form-control form-control-sm mt-2" placeholder='PEEP' value={peepVal} name="peepVal" onChange={handlerChangeVenti}/>
                        <small id="errPeep" className="form-text text-danger" style={{ display: 'none' }}>Pleae Fill Peep</small>
                    </div>
                    <div className="mb-2 me-2">
                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                        <div className='diet-btn'>
                        {showVentiUnderProcess === 1 ? <TosterUnderProcess /> : <>
                                    {
                                        showVentiToster === 1 ? <Toster value={ventiTosterValue} message={ventiTosterMessage} /> :
                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mt-2" onClick={handlerSaveVenti}><img src={save} className='icnn' /> Save</button>

                                    }
                                </>}
                            
                        </div>
                    </div>
                </BoxContainer>
            </div>

        </div>

    )
}
