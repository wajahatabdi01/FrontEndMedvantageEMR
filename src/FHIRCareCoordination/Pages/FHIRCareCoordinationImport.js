import { useEffect, useState } from "react";
import save from "../../assets/images/icons/save.svg";
import ParseDocument from "../API/ParseDocument";
import Loader from "../../Component/Loader";
import GetDocumentDetails from "../API/GetDocumentDetails";
import GetEachCCDAComponentDetails from "../API/GetEachCCDAComponentDetails";
import CCDAORQRDACAT from "./ImportPages/CCDAORQRDACAT";
import CCR from "./ImportPages/CCR";
import CCD from "./ImportPages/CCD";
const FHIRCareCoordinationImport = () => {
   
    return (
        <>
            <div className='orders-navtabs'>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="CCD-tab" data-bs-toggle="tab" data-bs-target="#CCD" type="button" role="tab" aria-controls="CCD" aria-selected="true">CCD</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="CCR-tab" data-bs-toggle="tab" data-bs-target="#CCR" type="button" role="tab" aria-controls="CCR" aria-selected="false">CCR</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="CCDAORQRDACAT1-tab" data-bs-toggle="tab" data-bs-target="#CCDAORQRDACAT1" type="button" role="tab" aria-controls="CCDAORQRDACAT1" aria-selected="false">CCDA OR QRDA CAT1</button>
                    </li>
                </ul>
            </div>
            <div class="tab-content" id="myTabContent">
                {/* --------------------------------Start CCD Section-------------------------------------------- */}
                <div class="tab-pane fade show active intab" id="CCD" role="tabpanel" aria-labelledby="CCD-tab">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="med-box">
                                    <CCD/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------------------End CCD Section---------------------------------------------- */}

                {/* -----------------------------------Start CCR Section---------------------------------------------- */}

                <div class="tab-pane fade intab" id="CCR" role="tabpanel" aria-labelledby="CCR-tab">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="med-box">
                                    <CCR />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------------------Enf CCR Section---------------------------------------------- */}

                {/* -----------------------------------Start CCDAORQRDACAT1 Section---------------------------------------------- */}

                <div class="tab-pane fade intab" id="CCDAORQRDACAT1" role="tabpanel" aria-labelledby="CCDAORQRDACAT1-tab">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="med-box">
                                    <CCDAORQRDACAT />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* -----------------------------------Enf CCDAORQRDACAT1 Section---------------------------------------------- */}
            </div>

        </>
    )
}

export default FHIRCareCoordinationImport