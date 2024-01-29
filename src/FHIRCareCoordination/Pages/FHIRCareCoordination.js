import FHIRCareCoordinationExport from "./FHIRCareCoordinationExport";
import FHIRCareCoordinationImport from "./FHIRCareCoordinationImport";
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg';
const FHIRCareCoordination = () => {
    return (
        <section className="main-content mt-5 pt-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className="med-box">
                            <div className="title">Care Coordination</div>
                            <div className="inner-content">
                                <div className="d-flex flex-wrap align-content-end">
                                    <div className='orders-navtabs'>
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active" id="Import-tab" data-bs-toggle="tab" data-bs-target="#Import" type="button" role="tab" aria-controls="Import" aria-selected="true">Import</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="Export-tab" data-bs-toggle="tab" data-bs-target="#Export" type="button" role="tab" aria-controls="Export" aria-selected="false">Export</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-content mt-2" id="myTabContent">
                            {/* --------------------------------Start FHIR Care Coordination Import Section-------------------------------------------- */}
                            <div class="tab-pane fade show active intab" id="Import" role="tabpanel" aria-labelledby="Import-tab">
                                <FHIRCareCoordinationImport />
                            </div>
                            {/* -----------------------------------End FHIR Care Coordination Import Section---------------------------------------------- */}

                            {/* -----------------------------------Start FHIR Care Coordination Export Section---------------------------------------------- */}
                            <div class="tab-pane fade intab" id="Export" role="tabpanel" aria-labelledby="Export-tab">
                                <FHIRCareCoordinationExport />
                            </div>
                            {/* -----------------------------------Enf FHIR Care Coordination Export Section---------------------------------------------- */}
                        </div>

                        <div className='imageNoDataFound' style={{marginTop:'68px'}}><img src={NoDataFound} alt="imageNoDataFound" /></div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default FHIRCareCoordination; 