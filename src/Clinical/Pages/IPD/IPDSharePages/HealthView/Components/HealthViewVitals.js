import React, { useEffect, useState } from 'react';
import timeclok from '../../../../../../assets/images/HistoryViewIcons/timeclok.svg';
import bp from '../../../../../../assets/images/HistoryViewIcons/bp.svg';
import oxygen from '../../../../../../assets/images/HistoryViewIcons/oxygen.svg';
import bpmean from '../../../../../../assets/images/HistoryViewIcons/bpmean.svg';
import heartrate from '../../../../../../assets/images/HistoryViewIcons/heartrrate.svg';
import map from '../../../../../../assets/images/HistoryViewIcons/map.svg';
import pulse from '../../../../../../assets/images/HistoryViewIcons/pulse.svg';
import pvc from '../../../../../../assets/images/HistoryViewIcons/pvc.svg';
import rbs from '../../../../../../assets/images/HistoryViewIcons/rbs.svg';
import resprate from '../../../../../../assets/images/HistoryViewIcons/resprate.svg';
import spo from '../../../../../../assets/images/HistoryViewIcons/spo.svg';
import temprature from '../../../../../../assets/images/HistoryViewIcons/temprature.svg';
import { FindByQuery } from "../../../../../../Code/Serach";
import GetHealthViewPTVitals from '../../../../../API/IPD/HealthView/GetHealthViewPTVitals';

import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export const HealthViewVitals = () => {


    const {t} = useTranslation();
    document.body.dir = i18n.dir();

    let [respLen, setRespLen] = useState(0);
    let [vitalsDate, setVitalsDate] = useState([]);
    let [testVitals, setTestVitals] = useState();
    let [vitalNumber, setVitalNumber] = useState([4, 7, 56, 3, 5, 74, 10, 6]);
    let [patientVitalsData, setPatientVitalsData] = useState([]);
    let vitalImg = [{ icon: bp, name: "BP" }, { icon: resprate, name: "RR" }, { icon: spo, name: "spo2" }, { icon: pulse, name: "PR" }, { icon: temprature, name: "Temp." }, {icon:heartrate, name:'HR'}, { icon: bp, name: "RBS" }];
    let uhID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;

    const getPTVitals = async () => {
        let HealthViewPTVitalsResponse = await GetHealthViewPTVitals(uhID);
        if (HealthViewPTVitalsResponse.status === 1) {
            setPatientVitalsData(HealthViewPTVitalsResponse.responseValue);
            makeData(HealthViewPTVitalsResponse.responseValue)
            // props.setGetData(0)
            setVitalsDate(HealthViewPTVitalsResponse.responseValue.date);
        }
    };

    //   let makeData = (data) => {

    //     let temp = []
    //     let main = []
    //     data.map((val, ind) => {
    //       vitalNumber.map((vv, ii) => {
    //         let resp = FindByQuery(JSON.parse(val.json), vv.toString(), "vmId")
    //         if (resp.length !== 0) {
    //           temp.push(resp[0].vmValue)
    //         }
    //         else {
    //           temp.push("-")
    //         }

    //       })

    //       main.push(temp)

    //       temp = []

    //     })


    //     function transpose(a) {
    //       return Object.keys(a[0]).map(function (c) {
    //         return a.map(function (r) { return r[c]; });
    //       });
    //     }
    //     setTestVitals(transpose(main))
    //   };

    let makeData = (data) => {

        let temp = []
        let main = []
        let flag = -1
        data.map((val, ind) => {            

            vitalNumber.map((vv, ii) => {

                let resp = FindByQuery(JSON.parse(val.json), vv.toString(), "vmId")
                
                if (resp.length !== 0 && resp[0].vmId !== 6 && resp[0].vmId !== 4) {
                    temp.push(resp[0].vmValue)

                }
                else if (resp.length !== 0 && resp[0].vmId === 4) {
                    if (flag !== -1) {
                        temp[flag] = temp[flag] + resp[0].vmValue.toString()
                    }
                    else {
                        temp.push(resp[0].vmValue)
                        flag = temp.length - 1
                    }
                }
                else if (resp.length !== 0 && resp[0].vmId === 6) {
                    if (flag !== -1) {
                        temp[flag] = temp[flag] + "/" + resp[0].vmValue.toString()
                    }
                    else {
                        temp.push(resp[0].vmValue)
                        flag = temp.length - 1
                    }
                }
                else {
                    temp.push("-")
                }

            })
           
             
            main.push(temp)
            temp = []
            flag = -1

        })

        function transpose(a) {
            return Object.keys(a[0]).map(function (c) {
                return a.map(function (r) { return r[c]; });
            });
        }
        
        setTestVitals(transpose(main))
    }

    const uniqueDates = new Set();
    const dateCounts = new Map();

    patientVitalsData.forEach((item) => {
        uniqueDates.add(item.date);

        if (dateCounts.has(item.date)) {
            dateCounts.set(item.date, dateCounts.get(item.date) + 1);
        } else {
            dateCounts.set(item.date, 1);
        }
    });

    useEffect(() => {
        getPTVitals();
    }, []);
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'> {t("VITALS_SIGN")} </div>
                    </div>
                    <div className='listdetailsct-in'>
                        {/* <div className='gridsec-in'>
                            <img src={timeclok} className='icnn' />
                        </div> */}
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <table className='med-table border striped' >

                        <thead>
                            <tr>
                                <th></th>
                                {
                                    dateCounts && [...dateCounts].map((list, index) => {

                                        return (
                                            <th colSpan={list[1]} className='text-center' style={{ color: '#546788', letterSpacing: '1px', fontSize: '14px' }}>{list[0]}</th>
                                        )
                                    })}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='fs-6 fw-bold'>#{t("VITALS")}</td>
                                {patientVitalsData && patientVitalsData.map((list, index) => {
                                    return (
                                        <td ><b>{list.time}:00</b></td>
                                    )
                                })}
                            </tr>

                            {
                                patientVitalsData && vitalNumber.map((val, ind) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    {val !== 6 ? <img src={vitalImg[ind].icon} className='icnn' /> : ""}
                                                    {val !== 6 ? <span>{vitalImg[ind].name}</span> : ""}
                                                </div>
                                            </td>
                                            {
                                                val !== 6 ? testVitals && testVitals[ind].map((v, i) => { return (<td>{v}</td>) }) : ""
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
