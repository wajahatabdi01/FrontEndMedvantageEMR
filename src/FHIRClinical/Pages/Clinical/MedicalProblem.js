import React from 'react'

export default function MedicalProblem() {

  //const customStyle = { marginLeft: '0px' };
  return (
    // <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    //   <div className='modal-dialog modal-dialog-scrollable modal-lg'>
    //     <div className="modal-content ">
    //       <div className="modal-header">
    //         <h1 className='modal-title fs-5 text-black' id="staticBackdropLabel">Medical Problem</h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      <div className="modal-header">
        <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Medical Problem</h1>
          <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
      </div>
    </>
  )
}
