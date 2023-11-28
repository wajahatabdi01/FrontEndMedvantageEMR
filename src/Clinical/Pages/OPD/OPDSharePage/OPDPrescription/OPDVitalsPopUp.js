import React, { useState } from 'react'
import BPImg from "../../../../../assets/images/OPD/bloodpressure.svg"
import BPImgFull from "../../../../../assets/images/OPD/bpSysDys.svg"
import Loder from '../../../../../Components/Loder'
import Heading from '../../../../../Components/Heading'

import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function OPDVitalsPopUp(props) {


    const {t} = useTranslation(); 
     document.body.dir = i18n.dir();

     
    let [showloder, setShowloder] = useState(0)

    return (
        <>
          <div className={`${props.val === 0 ? 'offcanvas' : "offcanvas show"}   offcanvas-end`} style={{ width: "600px" }} data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="symptoms" aria-labelledby="symptomsLabel">
    <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
        <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { props.fun(0) }}><i className='fa fa-close ' ></i></div>
        <h5 className="offcanvas-title text-white" id="symptomsLabel">{t("Vital")}</h5>
    </div>
    <div className="offcanvas-body ps-4 pe-3" >
        <div className='d-flex flex-column gap-1'>
            {t("General")}
            <div className='d-flex flex-wrap gap-2'>
                <div className='d-flex flex-row gap-1 opdpopupvitaltext ps-2 pe-2' >
                    <img src={BPImg} />
                    <input type='text' placeholder={t("BP Systolic(mm Hg)")} />
                </div>
                <div className='d-flex flex-row gap-1 opdpopupvitaltext ps-2 pe-2'>
                    <img src={BPImg} />
                    <input type='text' placeholder={t("BP Diastolic(mm Hg)")} />
                </div>
                <div className='d-flex flex-row gap-1 opdpopupvitaltext ps-2 pe-2'>
                    <img src={BPImgFull} />
                    <input type='text' placeholder={t("BP_S-BP_D")} />
                </div>
            </div>
        </div>
    </div>
    <Loder val={showloder} />
</div>

            <div className="offcanvas-backdrop fade show"></div>

        </>
    )
}
