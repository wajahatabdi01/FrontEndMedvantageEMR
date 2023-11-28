import React, { useEffect, useState } from 'react'
import Heading from '../../../../../Component/Heading'
import TableContainer from '../../../../../Component/TableContainer'
import GetPatientWiseCalculator from '../../../../API/OPD/Calculator/GetPatientWiseCalculator'
import Loder from '../../../../../Component/Loader';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
import { NavLink } from 'react-router-dom';

export default function OPDCLLeft(props) {

    document.body.dir = i18n.dir();
  
    
    const {t} = useTranslation();

    let [patientCalulatordata, setPatientCalulatordata] = useState([])
    let [loader, setLoader] = useState(1)

    let getdata = async () => {
        let activePatient = window.sessionStorage.getItem("activePatient")
        if (props.callingpage === 0) {
            activePatient = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : ""
        }
        else if (props.callingpage === 1) {
            activePatient = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : ""

        }
        else if(props.uhid !== null && props.uhid !== undefined){
            activePatient = props.uhid
        }
        if (activePatient.length != 0) {
            let response = await GetPatientWiseCalculator(activePatient)
            if (response.status === 1) {
                setLoader(0)
                setPatientCalulatordata(response.responseValue)
                props.setId(response.responseValue[0].id)

            }
            else{
                setLoader(0)
            }
        }
    }

    let handleOnchange = (e) => {
        let name = e.target.name
        let value = e.target.value
        props.setId(value)
    }

    useEffect(() => {
        getdata()
    }, [])
    return (
        <div>
            <div className='heading mb-2'>Most Used Calculators</div>
            {/* <Heading text="Most Used Calculators" /> */}
            <div className="med-table-section pdtable px-2_" style={{ height: "calc(100vh - 190px)"}}>
                <table className='med-table border'>
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th style={{ "width": "55%" }}>{t("Calculator")}</th>
                            <th>{t("Result -")}</th>
                            <th className="text-center">{t("Graph")}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patientCalulatordata && patientCalulatordata.map((val, ind) => {
                            return (
                                <tr>
                                    <td className='text-center'>{ind + 1}</td>
                                    <td>
                                        <div className="d-flex regularCheck column-gap-1 px-2 align-items-center">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="radiocalculator" id={val.id} value={val.id} onChange={handleOnchange} defaultChecked={ind === 0 ? true : false} />
                                            </div>
                                            <label htmlFor={val.id}>{val.calculatorName}</label>
                                        </div>
                                    </td>
                                    <td className='bluetext'>{val.result ? val.result : "Parameter missing"}</td>
                                    <td className="text-center"><span className='graphh pointer'><i className='fa fa-line-chart'></i></span></td>
                                </tr>
                            )
                        })}




                    </tbody>
                </table> 
                
          
            </div>
            <Loder val={loader} />
        </div>
    )
}
