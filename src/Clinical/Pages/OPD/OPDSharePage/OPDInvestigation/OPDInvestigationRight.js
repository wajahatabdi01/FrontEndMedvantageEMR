import React, { useEffect } from 'react'
import GetSubCategoryWisePatientInvestigation from '../../../../API/OPD/Investigation/GetSubCategoryWisePatientInvestigation'
import { useState } from 'react'
import GetTestListForIpdandOpd from '../../../../../Pathology/Api/GetTestListForIpdandOpd'
// import GetSubTestListForDashboard from '../../../../Api/RemotePatientMonitorDashboard/GetSubTestListForDashboard'
import TestGraph from './TestGraph'
import GetResultBySubtestIdForGraph from "../../../../API/OPD/Investigation/GetResultBySubtestIdForGraph"
// import nodataImg from '../../../../../assets/images/icons/No data-rafiki.svg'
import nodataImg from '../../../../../../src/assets/images/icons/No data-rafiki.svg'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function OPDInvestigationRight(props) {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();

  let [subTestData, setSubTestData] = useState([])
  let [subtestNameList, setSubtestNameList] = useState([])
  let [subtestGraphData, setSubtestGraphData] = useState([])
  let [showGrap, setShowGrap] = useState(0)

  let getdata = async () => {
    try {
      let response = ""
      if (props.callingpage === 0) {

        response = await GetSubCategoryWisePatientInvestigation({ "subCategoryId": props.activeSubId })
    

        if (response.status === 1) {
          if (response.responseValue !== undefined) {

            setSubTestData(response.responseValue)
          }
          else {
            setSubTestData([])
          }
        }



      }
      else if (props.callingpage === 1) {
        let activeUHID = props.uhid
        response = await GetTestListForIpdandOpd(activeUHID, props.activeSubId)
       
        if (response.status === 1) {

          setSubTestData(response.responseValue)

        }
        else {
          setSubTestData([])

        }
      }
    }
    catch (e) {
      console.log("dddddddddddddddddddddddddddddddd", e.message)
    }


  }

  let getGraphData = async (subtestID) => {
    let senddata = {
      uhid: props.uhid,
      subtest: subtestID

    }
    let response = await GetResultBySubtestIdForGraph(senddata)
    if (response.status === 1) {
      setSubtestGraphData(response.responseValue)
      setShowGrap(1)
    }
  }

  let handleGraphData = (subtestId) => {
    
    getGraphData(subtestId)
  }

  useEffect(() => {
    getdata()
 
  }, [props])

  return (
    <div className='investigation_h_r_ position-relative' style={{ padding: '5px', overflow: 'auto', height: '647px' }}>
      {props.callingpage === 0 ?
        <div className='dflex iivesj'>
          <div className='dflexin'><span className='heading'>{t("subCategoryNamePlaceholder")}</span></div>
          <div className='dflexin'><span className='headingdate'>{t("collectionDatePlaceholder")}</span></div>
        </div> : ""}

      <div className='row wrap_' style={{ height: props.callingpage !== 2 ? "auto" : "500px" }}>
        {subTestData.length !== 0 ? <>  {subTestData && subTestData.map((value, index) => {
          let jsonConvertData = JSON.parse(value.testResultDetails);
          return (
            <div className='d-flex flex-column'>
              {props.callingpage !== 2 ?
                <div className='dflex investt'>
                  <div className='dflexin1'>
                    <span className='heading headtblb'>
                      {t("testNamePlaceholder")} (Collection Date: {value.collectionDateTime.split("T")[0] + " " + value.collectionDateTime.split("T")[1]})
                    </span>
                  </div>
                  <div className='dflexin2'>{t("viewAllPlaceholder")} <i className='fa fa-line-chart grph'></i></div>
                </div> : ""
              }

              <div className='d-flex flex-column tblheight'>
                <table className='med-table tblfont border_ striped1'>
                  <thead>
                    <th style={{ 'width': '100px' }}>{t("subtestPlaceholder")}</th>
                    <th style={{ 'text-align': 'center', 'min-width': '200px' }}>{t("testValuePlaceholder")}</th>
                    <th>{t("Remark")}</th>
                    <th align='center' style={{ 'width': '70px' }}>{t("analyticsPlaceholder")}</th>
                  </thead>
                  <tbody>
                    {jsonConvertData && jsonConvertData.map((val, ind) => {
                      if (props.callingpage === 0) {
                        return (
                          <tr>
                            <td>{val.subTestName}</td>
                            <td style={{ color: val.isNormalResult === 0 ? "red" : "green", fontWeight: "bold", textAlign: 'center' }}>{val.result}</td>
                            <td>{val.resultRangeRemark}</td>
                            <td className='pointer' onClick={() => { handleGraphData(val.subTestID) }}>
                              <i className="fa fa-line-chart grph"></i>
                            </td>
                          </tr>
                        )
                      } else {
                        if (val.isNormalResult === 0) {
                          return (
                            <tr>
                              <td>{val.subTestName}</td>
                              <td style={{ color: val.isNormalResult === 0 ? "red" : "green", fontWeight: "bold", textAlign: 'center' }}>{val.result}</td>
                              <td>{val.resultRangeRemark}</td>
                              <td className='pointer' onClick={() => { handleGraphData(val.subTestID) }}>
                                <i className="fa fa-line-chart grph"></i>
                              </td>
                            </tr>
                          )
                        }
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}</>
          :
          <div className='imageNoDataFound'> <img src={nodataImg} alt="No Data" title='No Data' /> </div>
        }


      </div>
      {showGrap === 1 ? <TestGraph subtestGraphData={subtestGraphData} showGrap={showGrap} modelCloseFun={setShowGrap} /> : ""}
    </div>

  )
}
