import React from 'react'

export default function MedicalProblem() {

  const customStyle = { marginLeft: '0px' };
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

    <section className="main-content mt-5 pt-3" style={customStyle}>
      <div>
      <h1 className='modal-title fs-5 text-black' id="staticBackdropLabel">Medical Problem</h1>
      </div>
    </section>
  )
}
