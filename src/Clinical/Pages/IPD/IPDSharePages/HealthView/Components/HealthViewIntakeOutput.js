import React, { useEffect, useState } from 'react'
import injection from '../../../../../../assets/images/icons/injection.svg';
import capsule from '../../../../../../assets/images/icons/capsule.svg';
import Urine from '../../../../../../assets/images/HistoryViewIcons/Urine.svg';
import GetHealthViewIntakeOutput from '../../../../../API/IPD/HealthView/GetHealthViewIntakeOutput';
import { FindByQuery } from '../../../../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export const HealthViewIntakeOutput = () => {

    const { t } = useTranslation();
    document.body.dir = i18n.dir();
    let uhID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let [testIntakeOutput, setIntakeOutput] = useState();
    let [patientIntakeOutputData, setPatientIntakeOutputData] = useState([]);
    let [foodId, setFoodId] = useState([]);
    let [FoodName, setFoodName] = useState([]);
    let [intakeSum, setIntakeSum] = useState();
    let totalIntake = 0;


    let getData = async () => {
        let intakeOutputResp = await GetHealthViewIntakeOutput(uhID);
        if (intakeOutputResp.status === 1) {
            foodId = [];
            FoodName = [];
            for (var i = 0; i < intakeOutputResp.responseValue.foodNameAndId.length; i++) {
                foodId.push(intakeOutputResp.responseValue.foodNameAndId[i].id);
                FoodName.push({ 'foodName': intakeOutputResp.responseValue.foodNameAndId[i].foodName });
            }
            setFoodName([...FoodName]);
            setPatientIntakeOutputData(intakeOutputResp.responseValue.intakeOutPutData);
            makeData(intakeOutputResp.responseValue.intakeOutPutData);
            setFoodId([...foodId]);
        }
    };

    let makeData = (data) => {
        let temp = [];
        let intakeTemp = [];
        let intakeSumMain = [];
        let main = [];
        data.map((val, ind) => {
            foodId.map((vv, ii) => {
                let resp = FindByQuery(JSON.parse(val.json), vv.toString(), "foodID")
                if (resp.length !== 0) {
                    temp.push(resp[0].finalResult);
                    intakeTemp.push(resp[0].result);
                }
                else {
                    temp.push("-")
                }

            })

            main.push(temp);
            intakeSumMain.push(intakeTemp);
            temp = [];
            intakeTemp = [];
        })

        //total sum for intake
        for (var i = 0; i < intakeSumMain.length; i++) {
            for (var j = 0; j < intakeSumMain[i].length; j++) {
                if (intakeSumMain[i][j] !== '-') {
                    totalIntake = totalIntake + intakeSumMain[i][j];
                }
            }
        };
        setIntakeSum(totalIntake);
        totalIntake = 0;


        function transpose(a) {
            return Object.keys(a[0]).map(function (c) {
                return a.map(function (r) { return r[c]; });
            });
        }
        setIntakeOutput(transpose(main))
    };

    const uniqueDates = new Set();
    const dateCounts = new Map();

    patientIntakeOutputData.forEach((item) => {
        uniqueDates.add(item.date);

        if (dateCounts.has(item.date)) {
            dateCounts.set(item.date, dateCounts.get(item.date) + 1);
        } else {
            dateCounts.set(item.date, 1);
        }
    });

    

    useEffect(() => {
        getData();
       

    }, []);
    return (
        <>
            <div className='gridb'>

                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t('INTAKE_OUTPUT')}</div>
                    </div>
                    <div className='listdetailsct-in'>
                        <div className='gridsec-take'>{t('TOTAL_INTAKE')} : <span>{intakeSum}</span></div>
                        {/* <div className='gridsec-take'>{t('TOTAL_OUTPUT')} : <span>900ml</span></div> */}
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
                                    })
                                }
                                 
                            </tr>
                        </thead>
                        <tbody>
                           
                            <tr>{patientIntakeOutputData.length > 0 ?
                            <>
                                <td className='fs-6 fw-bold'>#{t("Intake")}</td>
                                {patientIntakeOutputData && patientIntakeOutputData.map((list, index) => {
                                    return (
                                        <td className='text-center'><b>{list.time}:00</b></td>
                                    )
                                })} </> : <td className="text-center" style={{ fontWeight: 'bold' }}>{t("No Record Found")}</td>
                            }
                            </tr>

                            {
                                patientIntakeOutputData && foodId.map((val, ind) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <span>{FoodName[ind].foodName}</span>
                                                </div>
                                            </td>

                                            {
                                                testIntakeOutput && testIntakeOutput[ind].map((v, i) => { return (<td className='text-center'>{v}</td>) })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* <div className="med-table-section histry_view subb">
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{ "width": "5%" }}><br /><span className="timer">Output</span></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>

                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>

                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="text-center">1</td>
                                <td><img src={Urine} className='icnn' />  Urine</td>
                                <td>2.00ml</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>2.00ml</td>
                                <td>2.00ml</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>2.00ml</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </TableContainer>
                </div> */}
            </div>
        </>
    )
}
