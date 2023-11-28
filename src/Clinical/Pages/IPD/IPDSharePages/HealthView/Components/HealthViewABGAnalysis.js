import React, { useEffect, useState } from 'react'

import GetHealthViewABGAnalysis from '../../../../../API/IPD/HealthView/GetHealthViewABGAnalysis';
import { FindByQuery } from '../../../../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export const HealthViewABGAnalysis = () => {

    const {t} = useTranslation();;
    document.body.dir = i18n.dir();
    let uhID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let [testABG, setTestABG] = useState();
    let [patientABGData, setPatientABGData] = useState([]);
    let [testId, setTestId] = useState([]);
    let [testName, setTestName] = useState([]);

    let getABGData = async () => {
        let ABGResponse = await GetHealthViewABGAnalysis(uhID);
        
        if (ABGResponse.status === 1) {
            testId = [];
            testName = [];
            for (var i = 0; i < ABGResponse.responseValue.labName.length; i++) {
                testId.push(ABGResponse.responseValue.labName[i].id);
                testName.push({ 'subTestName': ABGResponse.responseValue.labName[i].subTestName });
            }
            setTestName([...testName]);
            setPatientABGData(ABGResponse.responseValue.labData);
            makeData(ABGResponse.responseValue.labData);
            setTestId([...testId]);
        }
    };

    let makeData = (data) => {
        let temp = []
        let main = []
        data.map((val, ind) => {
            testId.map((vv, ii) => {
            let resp = FindByQuery(JSON.parse(val.json), vv.toString(), "subtestId")
            if (resp.length !== 0) {
              temp.push(resp[0].result)
            }
            else {
              temp.push("-")
            }
      
          })
          
          main.push(temp)
         
          temp = []
        })
        
     
        function transpose(a) {
          return Object.keys(a[0]).map(function (c) {
            return a.map(function (r) { return r[c]; });
          });
        }
        setTestABG(transpose(main))
      };
    

    const uniqueDates = new Set();
    const dateCounts = new Map();

    patientABGData.forEach((item) => {
        uniqueDates.add(item.date);

        if (dateCounts.has(item.date)) {
            dateCounts.set(item.date, dateCounts.get(item.date) + 1);
        } else {
            dateCounts.set(item.date, 1);
        }
    });


    useEffect(() => {
        getABGData();
    }, []);
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t("ABG_ANALYSIS")}</div>
                    </div>
                    <div className='listdetailsct-in'>
                        {/* <div className='gridsec-in'>
                            <i className='fa fa-file-text'></i><i className='fa fa-bar-chart'></i>
                        </div> */}
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <table className='med-table border striped' >

                        <thead>
                            <tr>
                                <th></th>

                                {
                                    dateCounts.length && [...dateCounts].map((list, index) => {
                                        return (
                                            <th colSpan={list[1]} className='text-center' style={{color:'#546788', letterSpacing:'1px', fontSize:'14px'}}>{list[0]}</th>
                                        )
                                    })}
                            </tr>
                        </thead>
                            
                        <tbody>
                           
                            <tr>{patientABGData.length > 0 ?
                            <>
                                <td className='fs-6 fw-bold'> {t("TEST")}</td>
                                {patientABGData && patientABGData.map((list, index) => {
                                    return (
                                        <td className='text-center'><b>{list.time}:00</b></td>
                                    )
                                })} </> : <td className="text-center" style={{ fontWeight: 'bold' }}>{t("No Record Found")}</td>
                            }
                            </tr>

                            {
                                patientABGData && testId.map((val, ind) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <span>{testName[ind].subTestName}</span>
                                                </div>
                                            </td>
                                        
                                            {
                                                testABG && testABG[ind].map((v, i) => { return (<td className='text-center'>{v}</td>) })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
