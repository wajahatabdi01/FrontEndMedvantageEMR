import React, { useEffect, useState } from 'react'
import bottal from '../../../../../../assets/images/HistoryViewIcons/bottal.svg';
import bluebottal from '../../../../../../assets/images/HistoryViewIcons/bluebottal.svg';
import graybottal from '../../../../../../assets/images/HistoryViewIcons/graybottal.svg';
import Ventilator from '../../../../../../assets/images/HistoryViewIcons/Ventilator.svg';
import InfusionNORAD from '../../../../../../assets/images/HistoryViewIcons/InfusionNORAD.svg';
import InfusionPump from '../../../../../../assets/images/HistoryViewIcons/InfusionPump.svg';
import IVFluid from '../../../../../../assets/images/HistoryViewIcons/IVFluid.svg';
import GetHealthViewLifeSupport from '../../../../../API/IPD/HealthView/GetHealthViewLifeSupport';
import { FindByQuery } from '../../../../../../Code/Serach'; import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export const HealthViewLifeSupport = () => {
    const { t } = useTranslation();
    document.body.dir = i18n.dir();

    let uhID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let [lifeSupport, setLifeSupport] = useState();
    let [patientLifeSupportData, setPatientLifeSupportData] = useState([]);
    let [lifeSupportId, setLifeSupportId] = useState([]);
    let [lifeSupportName, setLifeSupportName] = useState([]);
    let [mainData, setMainData] = useState([]);
    let getLifeSupportData = async () => {
        let lifeSupportResp = await GetHealthViewLifeSupport(uhID);
        console.log('lifeSupportResp', lifeSupportResp);
        if (lifeSupportResp.status === 1) {
            lifeSupportId = [];
            lifeSupportName = [];
            for (var i = 0; i < lifeSupportResp.responseValue.nameOfLifeSupport.length; i++) {
                lifeSupportId.push(lifeSupportResp.responseValue.nameOfLifeSupport[i].id);
                lifeSupportName.push({ 'lifeSupport': lifeSupportResp.responseValue.nameOfLifeSupport[i].name });
            }
            setLifeSupportName([...lifeSupportName]);
            setPatientLifeSupportData(lifeSupportResp.responseValue.data);
            makeData(lifeSupportResp.responseValue.data);
            setLifeSupportId([...lifeSupportId]);
        }
    };

    let makeData = (data) => {

        let temp = []
        let main = []
        let sortMain = []
        data.map((val, ind) => {
            lifeSupportId.map((vv, ii) => {
                let resp = FindByQuery(JSON.parse(val.json), vv.toString(), "lifeSupportMachineNameID")
                console.log("response", resp)
                if (resp.length !== 0) {
                    if (resp.length > 1) {
                        resp.map((val, ind) => {
                            temp.push({ 'fromTime': val.fromTime, 'toTime': val.toTime })
                        })
                    }
                    else {
                        temp.push({ 'fromTime': resp[0].fromTime, 'toTime': resp[0].toTime })
                    }
                }
                else {
                    temp.push("-")
                }

            })
            console.log('temp', temp);

            main.push(temp)
            temp = []
        })
        sortMain = main.sort(function (a, b) { return a - b });
        for (var i = 0; i < main.length; i++) {
            for (var j = 0; j < main[i].length; j++) {
                var data = main[i][j].fromTimeToTime;
                console.log('ssssort--->>>>>>', data)
                // sortMain.push(main[i][j].sort())
            }
        }
        setLifeSupport(sortMain);
        console.log('main', sortMain);

        // function transpose(a) {
        //     return Object.keys(a).map(function (c) {
        //         return a.map(function (r) { return r[c]; });
        //     });
        // }
        // console.log('transpose(main)', transpose(main));
        // setLifeSupport(transpose(main))
    };

    useEffect(() => {
        getLifeSupportData();
    }, []);
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'> {t("LIFE_SUPPORT")}</div>
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
                                    patientLifeSupportData.length > 0 ? (patientLifeSupportData.map((list, index) => {
                                        return (
                                            <th style={{ color: '#546788', letterSpacing: '1px', fontSize: '14px' }}>{list.date}</th>
                                        )
                                    })) : <th colSpan={patientLifeSupportData.length + 1} className="text-center" style={{ fontWeight: 'bold' }}>
                                        {t("No Record Found")}
                                    </th>}
                            </tr>
                        </thead>

                        <tbody>
                           
                            {
                                patientLifeSupportData && lifeSupportId.map((val, ind) => {
                                    return (
                                        <tr>
                                            <td className='text-center'>

                                                <b className='fs-6'><img src={Ventilator} alt='' />{lifeSupportName[ind].lifeSupport}</b>

                                            </td>

                                            {lifeSupport && lifeSupport.map((d, i) => {
                                                return (
                                                    <td>
                                                        <table className='w-100 '>
                                                            {lifeSupport[i] && lifeSupport[i].map((li, j) => {
                                                                return (
                                                                    <tr>
                                                                        <td style={{ border: 'none' }}>{t("Start Time")}: {li.fromTime}</td>
                                                                        <td style={{ border: 'none' }}>{t("Stop Time")}: {li.toTime}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </table>
                                                    </td>
                                                )
                                            })}



                                            {/* {
                                                lifeSupport && lifeSupport[ind].map((v, i) => { return (<td className='text-center'>{v.fromTimeToTime} <br/></td>) })
                                            } */}
                                            {/* {
                                                lifeSupport && lifeSupport[ind].map((v, i) => { return (<td className='text-center'>{v.fromTimeToTime} <br/></td>) })
                                            } */}
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
