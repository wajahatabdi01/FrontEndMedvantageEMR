import CCDAorQRDA from "./CCDAorQRDA"


const FHIRCareCoordinationExport = () => {
  return (
    <>
      <div className='orders-navtabs'>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="CCD-tab" data-bs-toggle="tab" data-bs-target="#CCDorQRDA" type="button" role="tab" aria-controls="CCD" aria-selected="true">CCDA or QRDA</button>
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="CCR-tab" data-bs-toggle="tab" data-bs-target="#CCR" type="button" role="tab" aria-controls="CCR" aria-selected="false">Immunization</button>
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="CCDAORQRDACAT1-tab" data-bs-toggle="tab" data-bs-target="#CCDAORQRDACAT1" type="button" role="tab" aria-controls="CCDAORQRDACAT1" aria-selected="false">Syndromic Surveillance</button>
              </li>
          </ul>
      </div>

      <div class="tab-content" id="myTabContent">
        {/* --------------------------------Start CCD Section-------------------------------------------- */}
        <div class="tab-pane fade show active intab" id="CCDorQRDA" role="tabpanel" aria-labelledby="CCD-tab">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="med-box">
                                    <CCDAorQRDA />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------------------End CCD Section---------------------------------------------- */}
      </div>
    </>
  )
}

export default FHIRCareCoordinationExport