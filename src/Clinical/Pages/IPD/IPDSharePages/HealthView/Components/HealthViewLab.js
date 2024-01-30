import React, { useEffect, useState } from 'react'

import GetHealthViewLab from '../../../../../API/IPD/HealthView/GetHealthViewLab';
import { FindByQuery } from '../../../../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export const HealthViewLab = () => {

    const { t } = useTranslation();
    document.body.dir = i18n.dir();
    let uhID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    // let [respLen, setRespLen] = useState(0);
    // let [labDate, setLabDate] = useState([]);
    let [testLab, setTestLab] = useState();
    let [patientLabData, setPatientLabData] = useState([]);
    let [testId, setTestId] = useState([]);
    let [testName, setTestName] = useState([]);
    let getLabData = async () => {
        let labResponse = await GetHealthViewLab(uhID);
        
        if (labResponse.status === 1) {
            testId = [];
            testName = [];
            for (var i = 0; i < labResponse.responseValue.labName.length; i++) {
                testId.push(labResponse.responseValue.labName[i].id);
                testName.push({ 'subTestName': labResponse.responseValue.labName[i].subTestName });
            }
            setTestName([...testName]);
            setPatientLabData(labResponse.responseValue.labData);
            makeData(labResponse.responseValue.labData);
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
        setTestLab(transpose(main))
    };


    const uniqueDates = new Set();
    const dateCounts = new Map();

    patientLabData.forEach((item) => {
        uniqueDates.add(item.date);

        if (dateCounts.has(item.date)) {
            dateCounts.set(item.date, dateCounts.get(item.date) + 1);
        } else {
            dateCounts.set(item.date, 1);
        }
    });

    useEffect(() => {
        getLabData();
    }, []);
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t("LABS")}</div>
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <table className='med-table border striped'>
                        <thead>
                            <tr>
                                <th></th>

                                {
                                    dateCounts && [...dateCounts].map((list, index) => {
                                        return (
                                            <th colSpan={list[1]} className='text-center' style={{ color: '#546788', letterSpacing: '1px', fontSize: '14px' }}>{list[0]}</th>
                                        )
                                    })
                                       
                             
                                }
                            </tr>
                        </thead>

                        <tbody>
                            <tr>{patientLabData.length > 0 ?
                            <>
                                <td className='fs-6 fw-bold'>#{t("TEST")}</td>
                                {patientLabData && patientLabData.map((list, index) => {
                                    return (
                                        <td className='text-center'><b>{list.time}:00</b></td>
                                    )
                                })} </> : <td className="text-center" style={{ fontWeight: 'bold' }}>{t("No Record Found")}</td>
                            }
                               
                            </tr>

                            {
                                patientLabData && testId.map((val, ind) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <span>{testName[ind].subTestName}</span>
                                                </div>
                                            </td>

                                            {
                                                testLab && testLab[ind].map((v, i) => { return (<td className='text-center'>{v}</td>) })
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
