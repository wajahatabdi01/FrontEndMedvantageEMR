import React, { useEffect, useState } from 'react'
import Heading from '../../../../../Component/Heading'
import GetCalculatorParameterWithResult from '../../../../API/OPD/Calculator/GetCalculatorParameterWithResult'
import Loder from '../../../../../Component/Loader'
import GetCalculatorResult from '../../../../API/OPD/Calculator/GetCalculatorResult'
import GetCalculatorParameterScore from '../../../../API/OPD/Calculator/GetCalculatorParameterScore'
import Search from '../../../../../Code/Serach'
import GetCalculatorList from '../../../../API/OPD/Calculator/GetCalculatorList'
import switchIcon from '../../../../../../src/assets/images/icons/switch.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function OPDCALRight(props) {
  
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  let [patientResultData, setPatientResultData] = useState([])
  let [sendForm, setSendForm] = useState("")
  let [loader, setLoader] = useState(1)
  let [score, setScore] = useState({ index: -1, value: null })
  let [allCalculatorList, setAllCalculatorList] = useState()
  let [showAllCalculatorList, setShowAllCalculatorList] = useState()
  let [showList, setShowList] = useState(0)
  let [activeUHID, setActiveUHID] = useState(window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : window.sessionStorage.getItem("IPDactivePatient")?JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid:props.uhid)
  let [parameterIDStore, setParameterIDStore] = useState()

  let getData = async (id) => {
    let sendData = { id: id, uhid: activeUHID }
    let response = await GetCalculatorParameterWithResult(sendData);
    setPatientResultData("")
    if (response.status === 1 && response.responseValue != null) {
      
      setPatientResultData(response.responseValue[0])
      setSendForm(response.responseValue[0].parameterList)
      setLoader(0)
    }
    else {
      setPatientResultData("")
      setLoader(0)

    }
  }

  let getScore = async (data, index) => {
    let response = await GetCalculatorParameterScore(data)
    let temp = [...patientResultData.parameterList]
   
    if (response.status === 1) {
      patientResultData.parameterList.map((v, ind) => {
        if (v.parameterID === parameterIDStore) {
          temp[ind].parameterScore = response.responseValue[0].score
          
        }
      })
      patientResultData.result = patientResultData.result
      patientResultData.parameterList = temp
      setPatientResultData(patientResultData)

    }
    else{
      setLoader(0)
    }
  }

  let getCalculatorListFun = async () => {

    let response = await GetCalculatorList()
    if (response.status === 1) {
      setAllCalculatorList(response.responseValue)
      setShowAllCalculatorList(response.responseValue)
    }
    
  }

  let handleOnchange = (e, index) => {
    let data = {
      calculatorId: props.getId,
      uhid: activeUHID,
      parameterId: sendForm[index].parameterID,
      paramaterValue: e.target.value
    }
    setParameterIDStore(sendForm[index].parameterID)
    sendForm[index].parameterValue = e.target.value
    getScore(data, index)
   
    // patientResultData[0][index].parameterValue =e.target.value
    

  }

  let handleSearch = (e) => {
    let value = e.target.value
    if (value.length != 0) {
      setShowList(1)
      let searchList = Search(allCalculatorList, value)
      if (searchList.length != 0) {

        setShowAllCalculatorList(searchList)
      }
      else {
        setShowList(0)

      }
    }
    else {
      setShowList(0)
    }
  }

  let handleCalculatorClick = (id, name) => {
    getData(id)
    setLoader(1)
    setShowList(0)
    document.getElementById("calculatorseachId").value = name
  }

  let sendData = async () => {
   
    let data = {
      UHID: activeUHID,
      parameter: JSON.stringify(sendForm),
      calculatorId: props.getId
    }
    setLoader(1)
    let response = await GetCalculatorResult(data)
    setPatientResultData("")

    if (response.status === 1) {
      setPatientResultData(response.responseValue[0])
      setLoader(0)
    }
    else {
      setLoader(0)
    }
  }

  useEffect(() => {
    if (props.getId != "") {
      getCalculatorListFun()
      setScore({ index: -1, value: null })
      getData(props.getId)
      setLoader(1)
    }
  }, [props])

  return (
    <div className="calRight boxcontainer">
    <div className='listdetailsct box-shadow-none p-0'>
      <div className='listdetailsct-in'>
        <Heading text={t("Select calculator to set score")} />
      </div>
      <div className="listdetailsct-in">
        <div className="listd-in  position-relative">
          <form className="d-flex ms-auto ser" role="search">
            <input type="search" id="calculatorseachId" className="form-control form-control-sm calculatorSearchBox" placeholder={t("Creatinine Clearance Estimate")} onChange={handleSearch} />
            {showList === 1 ?
              <div className='position-absolute calculatorSearch'>
                <ul>
                  {showAllCalculatorList && showAllCalculatorList.map((val, ind) => {
                    return (
                      <li className='pointer' onClick={() => { handleCalculatorClick(val.id, val.calculatorName) }}>{val.calculatorName}</li>
                    )
                  })}
                </ul>
              </div>
              : ""}
          </form>
        </div>
      </div>
    </div>
  
    <div className="whitebg1">
      <div className="bluebg">
        <p><strong>{t("Formula-")}{patientResultData.length !== 0 ? patientResultData.result[0].formula : ""}</strong></p>
      </div>
    </div>
  
    <div className="whitebg1">
      <div className='row'>
        <div className="col-md-12 plt_">
          <div className="med-table-section pdtable px-2_" style={{ height: 'calc(100vh - 300px)',  }}>
            <table className='med-table border'>
              <tbody>
                {patientResultData.length !== 0 ? patientResultData.parameterList.map((val, ind) => {
  
                  if (val.controlType === "number" || val.controlType === "text") {
                    return (
                      <tr>
                        <td className='v-top pb-3_' style={{ width: '40%' }}><b>{val.parameterName}</b></td>
  
                        <td className='v-top pb-3_' style={{ width: '30%' }}>
                          <div className="input-group input-group-sm">
  
                            <input className="form-control" type={val.controlType} name="parameterValue" onChange={(e) => { handleOnchange(e, ind) }} /><span className="input-group-text" id="inputGroup-sizing-sm"><img src={switchIcon} /></span>
  
                          </div>
                        </td>
                        
                        <td className='v-top text-center pb-3_'>{t("SCORES")} : {val.score ? val.score : val.parameterValue ? val.score : val.parameterScore} <span className='pointer' title={val.scoreList}>{t("All:")} {t("SCORES")}</span></td>
                      </tr>
                    )
                  }
                  else if (val.controlType === "dropdown") {
                    return (
                      <tr>
                        <td className='v-top pb-3_' style={{ width: '40%' }}><b>{val.parameterName}</b></td>
  
                        <td className='v-top pb-3_' style={{ width: '30%' }}>
                          <div className="input-group input-group-sm">
  
                            <select className="form-select" id="" name="parameterValue" onChange={(e) => { handleOnchange(e, ind) }}>
                              <option>{val.labelDisplay}</option>
                              {val.parameterValueList && JSON.parse(val.parameterValueList).map((v, ind) => {
                                return (
                                  <option selected={val.parameterValue ? true : false}>{v.value}</option>
                                )
                              })}
                            </select>
                          </div>
                        </td>
  
                        <td className='v-top text-center pb-3_'>{t("SCORES")} : {val.score ? val.score : val.parameterValue ? val.score : val.parameterScore}  <span className='pointer' title={val.scoreList}>{t("All Score:")}</span></td>
                      </tr>
                    )
                  }
  
                }) : ""}
  
              </tbody>
            </table>
          </div>
  
          <div className="col-12 bg-white">
            <div className='listdetailsct box-shadow-none'>
              <div className='listdetailsct-in'>
                <div className='listd-in'><p className='res'><strong>{t("Result -")}{patientResultData.length !== 0 ? patientResultData.result[0].calculatedResult : ""} {patientResultData.length !== 0 ? patientResultData.result[0].unit : ""}</strong></p></div>
                <div className='listd-in'><p className='res'><strong>{t("Problem -")}{patientResultData.length !== 0 ? patientResultData.result[0].problem : ""}</strong></p></div>
              </div>
              <div className="listdetailsct-in" onClick={sendData}>
                <div className="listd-in">
                  <div className='calculatorbtn'>
                    <i className='fa fa-calculator'></i> {t("Calculate")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <Loder val={loader} />
  
  </div>
  
  )
}
