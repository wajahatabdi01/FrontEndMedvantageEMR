import React from 'react'

export default function ImportCqmData() {
  return (
    <>
    <div className='main-content mt-5 py-3'>
     

<div className="container-fluid">
  <div className="row">
    <div className="col-12">
      <div className="med-box pb-1">
      <div class="title">Import CQM Data</div>      
      </div>    
    </div>

    <div className="col-12 mt-2">
      <div className="med-box pb-1">
      <div className="title fs-6">Encounter Manager</div>  

      <div className='iframeImportCqm' style={{height:'82vh'}}>
        {/* <iframe src="http://172.16.19.96/medvantageemr4/interface/modules/zend_modules/public/encountermanager" frameborder="0"></iframe> */}
        {/* <iframe src="http://172.16.19.96/medvantageemr4/interface/modules/zend_modules/public/encountermanager" className='mt-1 w-100 h-100' frameborder="0"></iframe> */}
        <iframe src="http://172.16.19.96/openemr7/interface/modules/zend_modules/public/encountermanager" className='mt-1 w-100 h-100' frameborder="0"></iframe>
        {/* <iframe src="https://www.google.com/" className='mt-1 w-100 h-100' frameborder="0"></iframe> */}
         {/* <iframe src="https://medvantage.tech/login" className='mt-1 w-100 h-100' frameborder="0"></iframe>  */}

        
        </div>    
      </div>    
    </div>
  </div>
</div>

    </div>
    </>
  )
}

