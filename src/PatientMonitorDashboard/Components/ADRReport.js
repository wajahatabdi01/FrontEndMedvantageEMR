import React, { useEffect, useState } from 'react'
import "../../assets/css/patientMonitoringDashboard.css";
import adrIcon from "../../assets/images/icons/adrIcon.svg"
import adrTitleIconF from "../../assets/images/icons/adrTitleIconF.svg"
import adrTabIcon from "../../assets/images/icons/adrTabIcon.svg"
import adrDrugInteractionIcon from "../../assets/images/icons/adrDrugInteractionIcon.svg"
// import adrDrugAllergyScreeningIcon from "../../assets/images/icons/adrDrugAllergyScreeningIcon.svg"
// import adrDuplicateTherapyCheckingIcon from "../../assets/images/icons/adrDuplicateTherapyCheckingIcon.svg"
import ADRReportPost from '../../Clinical/API/RemotePatientMonitorDashboard/ADRReportPost';
import ADRReportPostContraIndication from '../../Clinical/API/RemotePatientMonitorDashboard/ADRReportDrugInteraction';
import ADRReportDrugInteraction from '../../Clinical/API/RemotePatientMonitorDashboard/ADRReportDrugInteraction';
import Loder from '../../Component/Loader';


export default function ADRReport(props) {
    const [dataSideEffect, setDataSideEffect] = useState([]);
    const [dataContraIndication, setDataContraIndication] = useState([]);
    const [dataDrugInteraction, setDataDrugInteraction] = useState([]);
    const [loader, setLoader] = useState(1);
    var CDcounter = 1;
    var SDcounter = 1;
    var DDCcounter = 1;
    var DICCounter = 1;
    let getData = async () => {

        let patientDrugId = []
        let patientProblomId = []
        let flag = 0
        let sendAdr = {}
        let sendDrugInteraction = {}
        let sendContraIndication = {}
        if (props.patientdata.PrescreptionParameterListMedvantage !== null) {
            for (let i = 0; i < props.patientdata.PrescreptionParameterListMedvantage.length; i++) {
                patientDrugId[i] = props.patientdata.PrescreptionParameterListMedvantage[i]["BrandId"];
            }
            flag = 1
        }
        else {
            if (props.patientdata.PrescreptionParameterList !== null) {
                for (let i = 0; i < props.patientdata.PrescreptionParameterList.length; i++) {
                    patientDrugId[i] = props.patientdata.PrescreptionParameterList[i]["DrugId"];
                }
            }
        }


        for (let i = 0; i < props.patientdata.DiagonsisList.length; i++) {
            patientProblomId[i] = props.patientdata.DiagonsisList[i]["ProblemId"];
        }

        if (flag === 1) {
            sendAdr = {
                "medicineId": "",
                "brandId": patientDrugId.toString(),
                "problemId": patientProblomId.toString()
            }
            sendDrugInteraction = {
                "brandId": patientDrugId.toString(),
                "medicineName": ""
            }

            sendContraIndication = {
                "brandId": patientDrugId.toString(),
                "medicineName": "",
                "diseaseName": patientProblomId.toString()
            }

        }

        else {
            sendAdr = {
                "medicineId": patientDrugId.toString(),
                "brandId": "",
                "problemId": patientProblomId.toString()
            }
            sendDrugInteraction = {
                "brandId": "",
                "medicineName": patientDrugId.toString()
            }
            sendContraIndication = {
                "brandId": "",
                "medicineName": patientDrugId.toString(),
                "diseaseName": patientProblomId.toString()
            }
        }

        const resp = await ADRReportPost(sendAdr);
        const ContraindicatedResp = await ADRReportPostContraIndication(sendContraIndication);
        const InteractionResp = await ADRReportDrugInteraction(sendDrugInteraction);
        if (resp.status === 1) {
            setDataSideEffect(resp.responseValue[0].otherSideEffect);
        }
        if (ContraindicatedResp.status === 1) {
            setDataContraIndication(ContraindicatedResp.responseValue);
        }
        if (InteractionResp.status === 1) {
            setDataDrugInteraction(InteractionResp.responseValue);
        }
        setLoader(0)
        console.log("getadta", InteractionResp)

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {/* ######################## Moodal Pop Area #################### */}
            <div className={`modal d-${props.ADRReportPop === 0 ? 'none' : 'block'}`}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content p-0">
                        {/* <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white d-flex column-gap-1 py-1" id="exampleModalLabel">
                                <img src={adrIcon} alt="ADR Report" title='ADR Report' style={{ width: '25px', height: '25px' }} />
                                <label htmlFor="">ADR Report</label>
                            </h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className="bi bi-x-octagon"></i></button>
                        </div> */}

                        <span className="closee" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>                        
                        <div className='p-profile'>
                        <div className='p-profile-h'><img src={adrIcon} alt="ADR Report" title='ADR Report' style={{ width: '15px'}} /> ADR Report</div>
                            <div className='p-profile-h'>
                            <div className='pname'><span>{props.patientdata.UhId}</span></div>
                            <div className='pname'>- {props.patientdata.PntName}</div> 
                        </div>
                        </div>

                        <div className="modal-body p-1">
                            <div className="row">
                                <div className="col-12">
                                    <div className="adrReportSection" style={{ overflow: 'auto', maxHeight: 'calc(100vh - 300px)' }}>

                                        {/* table Common Drug Reactions */}

                                        {dataSideEffect.length !== 0 ?
                                            <div className="repeatAdrSection mb-2">
                                                <div className="adrTitle"><img src={adrTitleIconF} alt="adrTitleIconF" /> Common Drug Reactions</div>

                                                <table className="tableAdrReport">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center" style={{ width: '3%' }}>#</th>
                                                            <th style={{ width: '15%' }}>Drug Name</th>
                                                            <th>Side Effect</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {dataSideEffect && dataSideEffect.map((list, index) => {
                                                            return list.medicineName !== null && list.commonSideEffect !== '-' && (
                                                                <tr>
                                                                    <td className="text-center">{CDcounter++}</td>
                                                                    <td><img src={adrTabIcon} alt="" /> {list.medicineName}</td>
                                                                    <td>{list.commonSideEffect}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            :
                                            <div className="repeatAdrSection mb-2">
                                                <div className="adrTitle"><img src={adrDrugInteractionIcon} alt="adrTitleIconF" /> Common Drug Reactions</div>
                                                No Data Found</div>
                                        }

                                        {/* table Serious Drug Reactions */}
                                        {dataSideEffect.length !== 0 ?
                                            <div className="repeatAdrSection mb-2">
                                                <div className="adrTitle"><img src={adrTitleIconF} alt="adrTitleIconF" /> Serious Drug Reactions</div>

                                                <table className="tableAdrReport">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center" style={{ width: '3%' }}>#</th>
                                                            <th style={{ width: '15%' }}>Drug Name</th>
                                                            <th>Side Effect</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            dataSideEffect && dataSideEffect.map((list, index) => {
                                                                return list.medicineName !== null && list.seriousSideEffect !== '-' && (
                                                                    <tr>
                                                                        <td className="text-center">{SDcounter++}</td>
                                                                        <td><img src={adrTabIcon} alt="" /> {list.medicineName}</td>
                                                                        <td>{list.seriousSideEffect}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                    </tbody>
                                                </table>

                                            </div> : 
                                            <div className="repeatAdrSection mb-2">
                                                <div className="adrTitle"><img src={adrDrugInteractionIcon} alt="adrTitleIconF" /> Serious Drug Reactions</div>
                                                No Data Found</div>
                                        }


                                        {/* table Drug-Disease Contraindication */}
                                        {dataContraIndication.length !== 0 ?
                                            <div className="repeatAdrSection mb-2">
                                                <div className="adrTitle"><img src={adrTitleIconF} alt="adrTitleIconF" /> Drug-Disease Contraindication</div>

                                                <table className="tableAdrReport">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center" style={{ width: '3%' }}>#</th>
                                                            <th style={{ width: '15%' }}>Drug Name</th>
                                                            <th>Problem</th>
                                                            <th>Contraindicated Condition</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {dataContraIndication && dataContraIndication.map((list, index) => {
                                                            return list.medicineName !== null && (
                                                                <tr>
                                                                    <td className="text-center">{DDCcounter++}</td>
                                                                    <td><img src={adrTabIcon} alt="" /> {list.medicineName}</td>
                                                                    <td>{list.problemName}</td>
                                                                    <td>{list.contraIndication}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            :
                                            <div className="repeatAdrSection mb-2">
                                                <div className="adrTitle"><img src={adrDrugInteractionIcon} alt="adrTitleIconF" /> Drug-Disease Contraindication</div>
                                                No Data Found</div>

                                        }

                                        {/* table Drug Interaction */}
                                        {dataDrugInteraction.length !== 0 ?
                                            <div className="repeatAdrSection mb-2">
                                                <div className="adrTitle"><img src={adrDrugInteractionIcon} alt="adrTitleIconF" /> Drug Interaction</div>

                                                <table className="tableAdrReport">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center" style={{ width: '3%' }}>#</th>
                                                            <th>Drugs</th>
                                                            <th>Interacted Drug</th>
                                                            <th>Effect of Interaction</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            dataDrugInteraction && dataDrugInteraction.map((list, index) => {
                                                                return list.medicineName !== null && (
                                                                    <tr>
                                                                        <td className="text-center">{DICCounter++}</td>
                                                                        <td><img src={adrTabIcon} alt="" /> {list.interaction.split('+')[0]}</td>
                                                                        <td><img src={adrTabIcon} alt="" /> {list.interaction.split('+')[1]} <span style={{ color: '#e97c00' }} tooltip='Substitute'>{list.substitute}</span></td>
                                                                        <td>{list.interactionEffect}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                    </tbody>
                                                </table>
                                            </div> : 
                                            <div className="repeatAdrSection mb-2">
                                                <div className="adrTitle"><img src={adrDrugInteractionIcon} alt="adrTitleIconF" /> Drug Interaction</div>
                                                No Data Found</div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <Loder val={loader} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
