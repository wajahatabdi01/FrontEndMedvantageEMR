import React, { useEffect, useState } from 'react'
import GetAntibiogramData from '../../../../../API/OPD/Prescription/GetAntibiogramData';
import GetAntibiogramName from '../../../../../API/OPD/Prescription/GetAntibiogramName';
import { useTranslation } from 'react-i18next';

// import send from '../../../../../assets/images/icons/send.svg'
// import clear from '../../../../../assets/images/icons/clear.svg'


import  i18n from "i18next";
export default function Antibiogram(props) {
    document.body.dir = i18n.dir();
    const {t} = useTranslation();
    let [fromDate, setFromDate] = useState('');
    let [toDate, setToDate] = useState('');
    let [flag, setFlag] = useState('');
    const [antiBiogram, setAntiBiogram] = useState([]);

    let [antiBiogramBind, setAntiBiogramBindName] = useState([]);
    let [bacteriaNameList, setBacteria] = useState([]);


    const handleAntiBiogram = async (e) => {
        if (e.target.name === 'fromDate') {
            setFromDate(e.target.value);
        }
        if (e.target.name === 'toDate') {
            setToDate(e.target.value);
        }
        if (e.target.name === 'radiocheck') {
            setFlag(e.target.value);
        }
        if (e.target.name === 'radiocheck') {
            setFlag(e.target.value)
        }
        if (e.target.name === 'radiocheck') {
            setFlag(e.target.value)
        }

    }

    let antiBiogramShowResult = async () => {

        let response = await GetAntibiogramData(flag, fromDate, toDate);
        console.log('response', response);
        if (response.status === 1) {
            setAntiBiogram(response.responseValue.antibioticBacteria);

        }
    };

    let GetAntibiogramBind = async () => {
        let response = await GetAntibiogramName();

        if (response.status === 1) {
            setAntiBiogramBindName(response.responseValue.antibioticNameDataList);
            setBacteria(response.responseValue.bacteriumNameList)
        }
    }

    function removeTags(str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();

        // Regular expression to identify HTML tags in
        // the input string. Replacing the identified
        // HTML tag with a null string.
        return str.replace(/(<([^>]+)>)/ig, '');
    }

    useEffect(() => {
        GetAntibiogramBind()
    }, [])

    return (
        <div className="modal fade" id="modalAntibiogram" data-bs-backdrop="static">
            <div className="modal-dialog" style={{ maxWidth: '70vw' }}>
                <div className="modal-content p-0">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">{t("Antibiogram Report")}</h1>
                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { props.setShowAntibiogram(0) }}><i className="bi bi-x-octagon"></i></button>
                    </div>
                    <div className="modal-body p-0">
                        <div className="row">
                            <div className="col-12">
                                <div className="med-box">
                                    {/* <div className="title">Hello Title</div> */}
                                    <div className="inner-content">
                                        <div className="d-flex flex-wrap gap-3">
                                            <div className="">
                                                <label htmlFor="fromDate" className="form-label">{t("From Date")} <span className="starMandatory">*</span></label>
                                                <input type="date" className="form-control form-control-sm" name='fromDate' id="fromDate" value={fromDate} onChange={handleAntiBiogram} />
                                            </div>

                                            <div className="">
                                                <label htmlFor="toDate" className="form-label">{t("To Date")} <span className="starMandatory">*</span></label>
                                                <input type="date" className="form-control form-control-sm" name='toDate' id="toDate" value={toDate} onChange={handleAntiBiogram} />
                                            </div>

                                            <div className="" style={{ width: '150px' }}>
                                                <label htmlFor="ddlAntiBiogramName" className="form-label">{t("Antibiotic Name")}<span className="starMandatory">*</span></label>
                                                <select id="ddlAntiBiogramName" className="form-select form-select-sm" name='antiBiogramName' aria-label=".form-select-sm example">
                                                    <option value="0">{t("SELECT")} </option>
                                                    {antiBiogramBind && antiBiogramBind.map((val, index) => {
                                                        return (
                                                            <option value={val.antibioticid}>{val.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div className="" style={{ width: '150px' }}>
                                                <label htmlFor="bacteriaName" className="form-label">{t("Bacteria Name")}<span className="starMandatory">*</span></label>
                                                <select id="bacteriaName" className="form-select form-select-sm" aria-label=".form-select-sm example" >
                                                    <option value={-1}>{t("SELECT")}</option>
                                                    {bacteriaNameList && bacteriaNameList.map((val, index) => {
                                                        return (
                                                            <option value={val.id}>{val.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div className="me-5">
                                                <label htmlFor="Description" className="form-label">{t("Ratio Wise")} <span className="starMandatory">*</span></label>
                                                <div className="d-flex flex-wrap column-gap-4 row-gap-2 regularCheck">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="radiocheck" id="All" value={0} onChange={handleAntiBiogram} />
                                                        <label className="form-check-label" htmlFor="All">{t("All")}</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="radiocheck" id="RatioWise" value={1} onChange={handleAntiBiogram} />
                                                        <label className="form-check-label" htmlFor="RatioWise">{t("Ratio Wise")}</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="radiocheck" id="PercentageWise" value={2} onChange={handleAntiBiogram} />
                                                        <label className="form-check-label" htmlFor="PercentageWise">{t("Percentage Wise")}</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <label for="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                <div className='d-flex gap-2  justify-content-end align-items-center'>
                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => antiBiogramShowResult()}>{t("Show Result")}</button>
                                                    <button type="button" className="btn btn-clear btnbluehover btn-sm mb-1 me-1"> {t("Clear")}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="med-table-section mt-2 mb-1" style={{ maxHeight: '77vh' }}>

                                        <table className='med-table border striped'>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th style={{ textAlign: "center" }} colSpan={40}>{t("ANTIBIOTIC")}</th>
                                                </tr>
                                                <tr>
  <th className='text-center'>{t('#'  )}</th>
  <th>{t('MICROORGANISM'  )}</th>
  <th>{t('Amikacin'  )} +</th>
  <th>{t('Amoxicillin + Clavulanic Acid'  )} +</th>
  <th>{t('Ampicillin'  )} +</th>
  <th>{t('Azithromycin'  )} +</th>
  <th>{t('Aztreonam'  )} +</th>
  <th>{t('Cefepime Hydrochloride'  )} +</th>
  <th>{t('Cefoperazone + Sulbactam')} +</th>
  <th>{t('Cefixime'  )} +</th>
  <th>{t('Cefoxitin'  )} +</th>
  <th>{t('Ceftazidime'  )} +</th>
  <th>{t('Ceftriaxone'  )} +</th>
  <th>{t('Cefuroxime'  )}/{t("Cefuroxime axetil")} +</th>
  <th>{t('Chloramphenicol'  )} +</th>
  <th>{t('Ciprofloxacin'  )} +</th>
  <th>{t('Clarithromycin'  )} +</th>
  <th>{t('Clindamycin'  )} +</th>
  <th>{t('Colistin'  )} +</th>
  <th>{t('Doripenem'  )} +</th>
  <th>{t('Doxycycline'  )} +</th>
  <th>{t('Ertapenem sodium'  )} +</th>
  <th>{t('Erythromycin'  )} +</th>
  <th>{t('Fosfomycin'  )} +</th>
  <th>{t('Gentamicin'  )} +</th>
  <th>{t('High Level Gentamicin'  )} +</th>
  <th>{t('Imipenem'  )} +</th>
  <th>{t('Levofloxacin'  )} +</th>
  <th>{t('Linezolid'  )} +</th>
  <th>{t('Meropenem'  )} +</th>
  <th>{t('Netilmicin'  )} +</th>
  <th>{t('Nitrofurantoin'  )} +</th>
  <th>{t('Norfloxacin'  )} +</th>
  <th>{t('Piperacillin'  )} +</th>
  <th>{t('Piperacillin and Tazobactum'  )} +</th>
  <th>{t('Polymixin-b'  )} +</th>
  <th>{t('Pristinamycin'  )} +</th>
  <th>{t('Teicoplanin'  )} +</th>
  <th>{t('Tetracycline'  )} +</th>
  <th>{t('Tigecycline'  )} +</th>
  <th>{t('Tobramycin sulfate'  )} +</th>
  <th>{t('Vancomycin'  )} +</th>
</tr>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                    <th>{t("Sensitvie %")}</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {antiBiogram && antiBiogram.map((list, index) => {
                                                    // console.log("val", list.amikacin)

                                                    return (
                                                        <tr>
                                                            <td className='text-center'>{index + 1}</td>
                                                            <td>{list.bacteria}</td>
                                                            <td>{removeTags(list.amikacin)}</td>
                                                            <td>{removeTags(list.amoxicillinclavulanicacid)}</td>
                                                            <td>{removeTags(list.ampicillin)}</td>
                                                            <td>{removeTags(list.azithromycin)}</td>
                                                            <td>{removeTags(list.aztreonam)}</td>
                                                            <td>{removeTags(list.cefepimehydrochloride)}</td>
                                                            <td>{removeTags(list.cefoperazonesulbactam)}</td>
                                                            <td>{removeTags(list.cefixime)}</td>
                                                            <td>{removeTags(list.cefoxitin)}</td>
                                                            <td>{removeTags(list.ceftazidime)}</td>
                                                            <td>{removeTags(list.ceftriaxone)}</td>
                                                            <td>{list.cefuroximecefuroximeaxetil}</td>
                                                            <td>{removeTags(list.chloramphenicol)}</td>
                                                            <td>{removeTags(list.ciprofloxacin)}</td>
                                                            <td>{removeTags(list.clarithromycin)}</td>
                                                            <td>{removeTags(list.clindamycin)}</td>
                                                            <td>{removeTags(list.colistin)}</td>
                                                            <td>{removeTags(list.doripenem)}</td>
                                                            <td>{removeTags(list.doxycycline)}</td>
                                                            <td>{removeTags(list.ertapenemsodium)}</td>
                                                            <td>{removeTags(list.erythromycin)}</td>
                                                            <td>{removeTags(list.fosfomicin)}</td>
                                                            <td>{removeTags(list.gentamicin)}</td>
                                                            <td>{removeTags(list.highlevelgentamicin)}</td>
                                                            <td>{removeTags(list.imipenem)}</td>
                                                            <td>{removeTags(list.levofloxacin)}</td>
                                                            <td>{removeTags(list.linezolid)}</td>
                                                            <td>{removeTags(list.meropenem)}</td>
                                                            <td>{removeTags(list.netilmicin)}</td>
                                                            <td>{removeTags(list.nitrofurantoin)}</td>
                                                            <td>{removeTags(list.norfloxacin)}</td>
                                                            <td>{removeTags(list.piperacillin)}</td>
                                                            <td>{removeTags(list.piperacillinandtazobactum)}</td>
                                                            <td>{list.polymixin}</td>
                                                            <td>{removeTags(list.pristinamycin)}</td>
                                                            <td>{removeTags(list.teicoplanin)}</td>
                                                            <td>{removeTags(list.tetracycline)}</td>
                                                            <td>{removeTags(list.tigecycline)}</td>
                                                            <td>{removeTags(list.tobramycinsulfate)}</td>
                                                            <td>{removeTags(list.vancomycin)}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
