import React,{useState,useEffect} from "react";
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
export default function PatientPAC (){
    return(
        <>
             <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Patient Pre Anaesthesia Check-Up (PAC)</div>
                                <div className="inner-content">
                                    <div className='row'>
                                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                                            <div className="d-flex flex-wrap align-content-end">
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="uhid" className="form-label">UHID</label>
                                                    <input type="number" className="form-control form-control-sm" name="uhid" value={uhid}  placeholder="Enter UHID" onChange={handlerChange}/>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="mpg" className="form-label">MPG</label>
                                                    <input type="text" className="form-control form-control-sm" name="mpg" value={mpg}  placeholder="MPG" onChange={handlerChange}/>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="tmDistance" className="form-label">T-M Distance</label>
                                                    <input type="text" className="form-control form-control-sm" name="tmDistance" value={tmDistance}  placeholder="T-M Distance" onChange={handlerChange}/>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="mouthOpening" className="form-label">Mouth Opening</label>
                                                    <input type="text" className="form-control form-control-sm" name="mouthOpening" value={mouthOpening}  placeholder="Mouth Opening" onChange={handlerChange}/>
                                                </div>
                                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="teeth" className="form-label">Teeth</label>
                                                    <input type="checkbox" className="form-control form-control-sm" id="teeth" name="teeth" value={teeth}   onChange={handlerChange}/>
                                                </div>
                                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="neck" className="form-label">Neck</label>
                                                    <input type="checkbox" className="form-control form-control-sm" id="neck" name="neck" value={neck}   onChange={handlerChange}/>
                                                </div>
                                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="teeth" className="form-label">Spine</label>
                                                    <input type="checkbox" className="form-control form-control-sm" id="spine" name="spine" value={spine}  onChange={handlerChange}/>
                                                </div>
                                                
                                                


                                                <div className="mb-2">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                    <div>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={saveBtnIcon} className='icnn' alt='' />Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1"><img src={clearBtnIcon} className='icnn' alt='' />Clear</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped_">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Operation Theater</th>
                                            <th>Team Member</th>
                                            <th>Role</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="text-center">1</td>
                                            <td>OT 1</td>
                                            <td>Test Team</td>
                                            <td>Doctor</td>
                                            <td>
                                                <div className="action-button">
                                                    <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit"></i></div>
                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel"></i>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}