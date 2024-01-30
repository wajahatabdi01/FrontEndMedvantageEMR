import save from "../../assets/images/icons/save.svg"
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
                                    <div class="title">CCD</div>
                                    <div className="inner-content">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="d-flex flex-wrap gap-3 align-content-end">
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label">Choose File</label>
                                                        <input className="form-control form-control-sm" id="chooseFile" type="file" />
                                                    </div>


                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-outline-success">Import <i className="bi bi-arrow-down-short"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className='d-flex justify-content-end'>
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <div class="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" id="Ascending" value="option1" />
                                                            <label className="form-check-label" for="Ascending">Ascending</label>
                                                        </div>
                                                    </div>

                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" ><img src={save} className='icnn' alt='' />Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
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
                                    <div class="title">CCR</div>
                                    <div className="inner-content">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="d-flex flex-wrap gap-3 align-content-end">
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label">Choose File</label>
                                                        <input className="form-control form-control-sm" id="chooseFile" type="file" />
                                                    </div>


                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-outline-success">Import <i className="bi bi-arrow-down-short"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className='d-flex justify-content-end'>
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <div class="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" id="Ascending" value="option1" />
                                                            <label className="form-check-label" for="Ascending">Ascending</label>
                                                        </div>
                                                    </div>

                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" ><img src={save} className='icnn' alt='' />Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
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
                                    <div class="title">CCDA or QRDA CAT I</div>
                                    <div className="inner-content">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="d-flex flex-wrap gap-3 align-content-end">
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label">Choose File</label>
                                                        <input className="form-control form-control-sm" id="chooseFile" type="file" />
                                                    </div>


                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-outline-success">Import <i className="bi bi-arrow-down-short"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className='d-flex justify-content-end'>
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <div class="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" id="Ascending" value="option1" />
                                                            <label className="form-check-label" for="Ascending">Ascending</label>
                                                        </div>
                                                    </div>

                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" ><img src={save} className='icnn' alt='' />Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
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