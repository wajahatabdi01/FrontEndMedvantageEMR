import React, { useEffect, useState } from 'react'
import i18n from "i18next";
import { useTranslation } from 'react-i18next';
import GetAllPatientVitalByDate from '../../../../API/OPD/Vitals/GetAllPatientVitalByDate';
import NODataFound from '../../../../../Component/NODataFound';
export default function DisplayVitalsHistory() {
    const { t } = useTranslation();
    document.body.dir = i18n.dir()
    //Vitals

    let [vitals, setVitals] = useState([]);
    let [vitalsDate, setVitalsDate] = useState([]);

    const distinctItem = (Array) => {
        const uniqueItems = new Set();
        Array.forEach((item) => {
            uniqueItems.add(item);
        });
        return uniqueItems;
    };
    //Find Unique Date for Vitals
    const uniqueDates = distinctItem(vitalsDate);



    let getData = async (date = "") => {
        let vitalData = [];
        let vitalDate = [];
        // 2023-11-10
        if (date === "") {
            date = new Date().toISOString().split("T")[0]
            document.getElementById("vitalHistoryDate").value = date

        }
        let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid
        let resp = await GetAllPatientVitalByDate(date, uhid)
        if (resp.status === 1) {
            for (var i = 0; i < resp.responseValue.length; i++) {
                vitalData.push(resp.responseValue[i]);
                vitalDate.push(resp.responseValue[i].datee);
            }
            setVitals([...vitalData]);
            setVitalsDate([...vitalDate]);
            vitalData = [];
            vitalDate = [];
        }
    }

    let handledateChange = (e) => {
        let date = e.target.value
        getData(date)
    }
    useEffect(() => {
        console.log("cxzcbmxvvbxcm")
        getData()
    }, [])
    return (
        <div>
            {/* Vitals */}
            <div>
                <div className='hcomplaintxt mb-3' style={{ background: "white", minHeight: "250px" }}>
                    <div className='ps-2 pe-2 d-flex flex-row justify-content-between'>
                        <div className='head1' style={{ marginBottom: '0px' }}>{t("Vitals History by Date")}</div>
                        <div className='mt-2  d-flex gap-1 vital-btn-date'>
                            <div className='vitals-cnt-in10'>
                                <input type='date' name="vitalDate" id='vitalHistoryDate' onChange={handledateChange} />
                            </div>
                            {/* <small id="errDate" className="form-text text-danger" style={{ display: 'none' }}></small> */}
                        </div>
                    </div>
                    {vitals.length !== 0 ?

                        <table className='pattbl grayth table-certificate border border-bottom_ striped'>
                            {uniqueDates && [...uniqueDates].map((dateList, index) => {
                                return (
                                    <>
                                        <thead>
                                            <tr>
                                                <th colSpan={25}>
                                                    <div className='listDate'>{t("DATE")}: {dateList}</div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>{t("Vitals")}</th>
                                                <th>12 AM</th>
                                                <th>01 AM</th>
                                                <th>02 AM</th>
                                                <th>03 AM</th>
                                                <th>04 AM</th>
                                                <th>05 AM</th>
                                                <th>06 AM</th>
                                                <th>07 AM</th>
                                                <th>08 AM</th>
                                                <th>09 AM</th>
                                                <th>10 AM</th>
                                                <th>11 AM</th>
                                                <th>12 PM</th>
                                                <th>01 PM</th>
                                                <th>02 PM</th>
                                                <th>03 PM</th>
                                                <th>04 PM</th>
                                                <th>05 PM</th>
                                                <th>06 PM</th>
                                                <th>07 PM</th>
                                                <th>08 PM</th>
                                                <th>09 PM</th>
                                                <th>10 PM</th>
                                                <th>11 PM</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {vitals && vitals.map((vitalsList, index) => {
                                                if (dateList === vitalsList.datee) {
                                                    return (
                                                        <tr>
                                                            <td>{vitalsList.vitalName}</td>
                                                            <td>{vitalsList["12AM"]}</td>
                                                            <td>{vitalsList["01AM"]}</td>
                                                            <td>{vitalsList["02AM"]}</td>
                                                            <td>{vitalsList["03AM"]}</td>
                                                            <td>{vitalsList["04AM"]}</td>
                                                            <td>{vitalsList["05AM"]}</td>
                                                            <td>{vitalsList["06AM"]}</td>
                                                            <td>{vitalsList["07AM"]}</td>
                                                            <td>{vitalsList["08AM"]}</td>
                                                            <td>{vitalsList["09AM"]}</td>
                                                            <td>{vitalsList["10AM"]}</td>
                                                            <td>{vitalsList["11AM"]}</td>
                                                            <td>{vitalsList["12PM"]}</td>
                                                            <td>{vitalsList["01PM"]}</td>
                                                            <td>{vitalsList["02PM"]}</td>
                                                            <td>{vitalsList["03PM"]}</td>
                                                            <td>{vitalsList["04PM"]}</td>
                                                            <td>{vitalsList["05PM"]}</td>
                                                            <td>{vitalsList["06PM"]}</td>
                                                            <td>{vitalsList["07PM"]}</td>
                                                            <td>{vitalsList["08PM"]}</td>
                                                            <td>{vitalsList["09PM"]}</td>
                                                            <td>{vitalsList["10PM"]}</td>
                                                            <td>{vitalsList["11PM"]}</td>
                                                        </tr>
                                                    )
                                                }

                                            })}

                                        </tbody>
                                    </>
                                )
                            })}

                        </table>
                        :
                        <NODataFound />
                    }

                </div>
            </div>
        </div>
    )
}

