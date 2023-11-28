import React, { useEffect, useState } from 'react'
import BoxHeading from './BoxHeading'
// import BoxHeading from '../../../../Components/BoxHeading'

export default function PatientScorePieChart(props) {
    let [vitalData, setVitalData] = useState([])
    let [vitalScore, setVitalScore] = useState([])
    let [totalScore, setTotalScore] = useState(0)
    let createData = () => {
        let ptaientdata = props.patientdata
        let vitals = ptaientdata.VitalParametersList
        let Investigation = ptaientdata.InvestigationParameterList
        let total = 0
        vitals.map((vital) => {
            setVitalData(vitalData => ({
                ...vitalData,
                [vital.VitalName]: vital
            }))
            total = total + Number.parseInt(vital.VitalScore)
            setTotalScore(total)


            setVitalScore(vitalScore => ({ ...vitalScore, ['score']: vital.VitalScore }))
        })
        Investigation.map((inves) => {

            setVitalData(vitalData => ({
                ...vitalData,
                [inves.SubTestName]: inves
            }))
            total = total + Number.parseInt(inves.SubTestScore)
            setTotalScore(total)


            setVitalScore(vitalScore => ({ ...vitalScore, ['score']: inves.SubTestScore }))
        })

        if (ptaientdata.LifeSupportList != null) {
            total = total + 42
            setTotalScore(total + 42)

        }
        if (ptaientdata.InfusionPumpDataList != null) {
            ptaientdata.InfusionPumpDataList.map((data, ind) => {
                if (data.FluidName.trim().toLowerCase() === "NORAD".toLocaleLowerCase()) {
                    setTotalScore(total + 38)
                    total = total + 38
                }
            })

        }
        

        console.log("fsdfds", total)



    }
    useEffect(() => {
        createData()
    }, [])
    return (
        <div className={`modal d-${props.patientScorePieChartpopup === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "backdrop-filter": "blur(8px)", overflowY: 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span>
                    {/* <BoxHeading name="Vital / Investigation Abnormal Score" textcolor="#7E7E7E" /> */}
                    <BoxHeading title="Vital / Investigation Abnormal Score" patientName={props.patientdata.PntName} uhid={props.patientdata.UhId} />
                    <div className='mt-1 pb-1 ps-2 pe-2'>
                        <div className='wrap'>
                            <table className='table-monitor' >
                                <thead className='fixedTheadSecond'>
                                    <th style={{ width: "100px" }} >
                                        BP{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }}>
                                        SPO2{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        RR{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        HR{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        PR{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        ALB{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        Ca++{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        K+{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        Na+{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }}>
                                        Mg{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        PH{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        PCO2{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        EtCO2{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>


                                    <th style={{ width: "100px" }} >
                                        PO2{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        LACTATE{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        HCO3{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        RBS{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        Temp{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>

                                    <th style={{ width: "100px" }} >
                                        Creatinine{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>


                                    <th style={{ width: "100px" }} >
                                        B Urea{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>


                                    <th style={{ width: "100px" }} >
                                        I/O{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>


                                    <th style={{ width: "100px" }} >
                                        SGOT{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>


                                    <th style={{ width: "100px" }} >
                                        SGPT{" "}
                                        <i
                                            className="bi bi-dash-circle remove-icon"
                                            title="Remove Column"
                                        ></i>
                                    </th>


                                </thead>

                                <tbody >
                                    {/* show data for patient vitals or second halif*/}

                                    <td className='text-center'>
                                        {vitalData.BP_Sys &&
                                            <span style={{ color: vitalData.BP_Sys.VitalColor }}>{vitalData.BP_Sys && vitalData.BP_Sys.VitalValue}</span>
                                        }
                                        /
                                        {vitalData.BP_Dias &&
                                            <span style={{ color: vitalData.BP_Dias.VitalColor }}>{vitalData.BP_Dias && vitalData.BP_Dias.VitalValue}</span>
                                        }
                                    </td>
                                    <td className='text-center'>
                                        {vitalData.spo2 &&
                                            <span style={{ color: vitalData.spo2.VitalColor }}>{vitalData.spo2 && vitalData.spo2.VitalValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData.respRate &&
                                            <span style={{ color: vitalData.respRate.VitalColor }}>{vitalData.respRate && vitalData.respRate.VitalValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData.heartRate &&
                                            <span style={{ color: vitalData.heartRate.VitalColor }}>{vitalData.heartRate && vitalData.heartRate.VitalValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData.Pulse &&
                                            <span style={{ color: vitalData.Pulse.VitalColor }}>{vitalData.Pulse && vitalData.Pulse.VitalValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["Serum Albumin"] &&
                                            <span style={{ color: vitalData["Serum Albumin"].SubTestColor }}>{vitalData["Serum Albumin"] && vitalData["Serum Albumin"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["Ca++"] &&

                                            <span style={{ color: vitalData["Ca++"].SubTestColor }}>{vitalData["Ca++"] && vitalData["Ca++"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["k+"] &&
                                            <span style={{ color: vitalData["k+"].SubTestColor }}>{vitalData["k+"] && vitalData["k+"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["Na+"] &&
                                            <span style={{ color: vitalData["Na+"].SubTestColor }}>{vitalData["Na+"] && vitalData["Na+"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["Serum Magnesium"] &&
                                            <span style={{ color: vitalData["Serum Magnesium"].SubTestColor }}>{vitalData["Serum Magnesium"] && vitalData["Serum Magnesium"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["PH"] &&
                                            <span style={{ color: vitalData["PH"].SubTestColor }}>{vitalData["PH"] && vitalData["PH"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["PCO2"] &&
                                            <span style={{ color: vitalData["PCO2"].SubTestColor }}>{vitalData["PCO2"] && vitalData["PCO2"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["PCO2"] &&
                                            <span style={{ color: vitalData["PCO2"].SubTestColor }}>{vitalData["PCO2"] && vitalData["PCO2"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["PO2"] &&
                                            <span style={{ color: vitalData["PO2"].SubTestColor }}>{vitalData["PO2"] && vitalData["PO2"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["Lac"] &&
                                            <span style={{ color: vitalData["Lac"].SubTestColor }}>{vitalData["Lac"] && vitalData["Lac"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["HCO3-"] &&
                                            <span style={{ color: vitalData["HCO3-"].SubTestColor }}>{vitalData["HCO3-"] && vitalData["HCO3-"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["RBS"] &&
                                            <span style={{ color: vitalData["RBS"].VitalColor }}>{vitalData["RBS"] && vitalData["RBS"].VitalValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["Temperature"] &&
                                            <span style={{ color: vitalData["Temperature"].VitalColor }}>{vitalData["Temperature"] && vitalData["Temperature"].VitalValue} </span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["Creatinine"] &&
                                            <span style={{ color: vitalData["Creatinine"].SubTestColor }}>{vitalData["Creatinine"] && vitalData["Creatinine"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["Blood Urea"] &&
                                            <span style={{ color: vitalData["Blood Urea"].SubTestColor }}>{vitalData["Blood Urea"] && vitalData["Blood Urea"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["I/O"] &&
                                            <span style={{ color: vitalData["SGOT/AST"].SubTestColor }}>{vitalData["SGOT/AST"] && vitalData["SGOT/AST"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["SGOT/AST"] &&
                                            <span style={{ color: vitalData["SGOT/AST"].SubTestColor }}>{vitalData["SGOT/AST"] && vitalData["SGOT/AST"].SubTestValue}</span>
                                        }

                                    </td>
                                    <td className='text-center'>
                                        {vitalData["S.G.O.T./ AST"] &&
                                            <span style={{ color: vitalData["S.G.O.T./ AST"].SubTestColor }}>{vitalData["S.G.O.T./ AST"] && vitalData["S.G.O.T./ AST"].SubTestValue}</span>
                                        }

                                    </td>

                                </tbody>
                            </table>
                        </div>
                        <div className='mt-2 wrap' style={{ height: "400px" }}>
                            <table className='popup-table'>
                                <thead>
                                    <th>S. No</th>
                                    <th>Parameter</th>
                                    <th>Result</th>
                                    <th>Rank</th>
                                    <th>Score</th>
                                </thead>
                                <tbody style={{ textAlign: 'center' }}>
                                    {console.log("data ", vitalData)}
                                    {vitalData && Object.entries(vitalData).map((value, index) => {
                                        if (value[1].VitalValue != undefined && value[1].VitalScore != 0) {
                                            return (
                                                <tr>
                                                    <td style={{ color: "white" }}>{index + 1}</td>
                                                    <td style={{ color: "white" }}>{value[1].VitalName}</td>
                                                    <td style={{ color: "white" }}>{value[1].VitalValue}</td>
                                                    <td style={{ color: "white" }}></td>
                                                    <td style={{ fontWeight: `${value[1].VitalScore != 0 ? "bold" : ""}`, color: `${value[1].VitalScore != 0 ? "white" : ""}` }}>{value[1].VitalScore}</td>
                                                </tr>
                                            )
                                        }
                                        else if (value[1].SubTestValue != undefined && value[1].SubTestScore != 0) {
                                            return (
                                                <tr >
                                                    <td style={{ color: "white" }}>{index + 1}</td>
                                                    <td style={{ color: "white" }}>{value[1].SubTestName}</td>
                                                    <td style={{ color: "white" }}>{value[1].SubTestValue}</td>
                                                    <td style={{ color: "white" }}></td>
                                                    <td style={{ fontWeight: `${value[1].SubTestScore != 0 ? "bold" : ""}`, color: `${value[1].SubTestScore != 0 ? "white" : ""}` }}>{value[1].SubTestScore}</td>
                                                </tr>
                                            )
                                        }
                                        else {
                                            return (<></>)
                                        }
                                    })}
                                    {props.patientdata.LifeSupportList &&
                                        <tr>
                                            <td style={{ color: "white" }}>{Object.entries(vitalData).length + 1}</td>
                                            <td style={{ color: "white" }}>ventilatorSupport</td>
                                            <td style={{ color: "white" }}>0</td>
                                            <td style={{ color: "white" }}></td>
                                            <td style={{ color: "white" }}>42</td>
                                        </tr>
                                    }
                                    {
                                        props.patientdata.InfusionPumpDataList && props.patientdata.InfusionPumpDataList.map((data, index) => {
                                            if (data.FluidName.trim().toLowerCase() === "NORAD".toLocaleLowerCase()) {
                                                return (
                                                    <tr>
                                                        <td style={{ color: "white" }}>{Object.entries(vitalData).length + 1}</td>
                                                        <td style={{ color: "white" }}>Norad</td>
                                                        <td style={{ color: "white" }}>0</td>
                                                        <td style={{ color: "white" }}></td>
                                                        <td style={{ color: "white" }}>38</td>
                                                    </tr>
                                                )
                                            }

                                        })
                                    }
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td style={{ color: "white" }}>Total:</td>
                                        <td style={{ color: "white" }}>{totalScore && totalScore}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
