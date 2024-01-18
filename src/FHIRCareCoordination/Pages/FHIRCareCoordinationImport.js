import React from 'react'

const FHIRCareCoordinationImport = () => {
    return (
        <>
            <div className='orders-navtabs'>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="HRFixed-tab" data-bs-toggle="tab" data-bs-target="#HRFixed" type="button" role="tab" aria-controls="HRFixed" aria-selected="true">HR Fixed Duty</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="HRDailyDuty-tab" data-bs-toggle="tab" data-bs-target="#HRDailyDuty" type="button" role="tab" aria-controls="HRDailyDuty" aria-selected="false">HR Daily Duty</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="HRDailyDuty-tab" data-bs-toggle="tab" data-bs-target="#HRDailyDuty" type="button" role="tab" aria-controls="HRDailyDuty" aria-selected="false">HR Daily Duty</button>
                    </li>
                </ul>
            </div>
            <div class="tab-content" id="myTabContent">

                {/* --------------------------------Start HR Fixed Duty Section-------------------------------------------- */}
                <div class="tab-pane fade show active intab" id="HRFixed" role="tabpanel" aria-labelledby="HRFixed-tab">
                    <div className='handlser customHeading'>
                        {/* <Heading />                    */}
                    </div>
                </div>
                {/* -----------------------------------End Order Section---------------------------------------------- */}

                {/* -----------------------------------Start HR Duty Section---------------------------------------------- */}

                <div class="tab-pane fade intab" id="HRDailyDuty" role="tabpanel" aria-labelledby="HRDailyDuty-tab">

                    <div className='handlser customHeading'>
                        {/* <Heading  />                         */}
                    </div>
                    
                </div>
                {/* -----------------------------------Enf HR Duty Section---------------------------------------------- */}

            </div>
        </>
    )
}

export default FHIRCareCoordinationImport