import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';

import uhid from '../../BloodBank/images/uhid.svg'
import name from '../../BloodBank/images/name.svg'
import age from '../../BloodBank/images/age.svg'
import genders from '../../BloodBank/images/genders.svg'
import department from '../../BloodBank/images/department.svg'
import bloddgroup from '../../BloodBank/images/bloddgroup.svg'
import product from '../../BloodBank/images/product.svg'
import requestunit from '../../BloodBank/images/requestunit.svg'
import dob from '../../BloodBank/images/dob.svg'
import time from '../../BloodBank/images/time.svg'
import printer from '../../BloodBank/images/printer.svg'
import exportfile from '../../BloodBank/images/exportfile.svg'
import GetAllBloodRequestList from '../Api/BloodDonorRegestration/GetBlood/GetIusse/GetAllBloodRequestList';
import BloodIssueValidations from '../../Validation/BloodBank/BloodIssueValidations';
import PostBloodIssueStatus from '../Api/BloodDonorRegestration/PostBlood/PostBloodIssueStatus';

import TosterUnderProcess from '../../Component/TosterUnderProcess'
import Toster from '../../Component/Toster'
import GetIssueList from '../Api/BloodDonorRegestration/GetBlood/GetIusse/GetIssueList';


export default function BloodIssueList() {
 
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");

    let [getAllRequestList, setAllRequestList] = useState([]);
    let [patientName, setpatientName] = useState('');
    let [department, setdepartment] = useState('');
    let [hospitalName, sethospitalName] = useState('');
    let [bloodGroup, setbloodGroup] = useState('');
    let [productName, setproductName] = useState('');
    let [requestedQuantity, setrequestedQuantity] = useState('');
    let [updateStatus, setupdateStatus] = useState('');
    let [rowId, setrowId] = useState('');
    let [remark, setremark] = useState('');
    let [isShowIssueModel, setIsShowIssueModel] = useState(0);
    let [getAllIssueLists, setAllIssueList] = useState([]);
    let clearErrorMsg=()=>{
        document.getElementById('errupdateStatus').style.display="none";
    }
    let handleChange =(e)=>{
         if(e.target.name === "remark"){
          setremark(e.target.value)
         }
    }
    let getAllRequest = async () => 
    {
      let data = await GetAllBloodRequestList();
      console.log('test : ', data);
      setAllRequestList(data.responseValue);
     
    }

    let getAllIssueList = async (list) => 
    {
     
      let bloodGroupID = list.bloodGroupID;
      let productID = list.productID;
      let data = await GetIssueList(bloodGroupID,productID);
      setAllIssueList(data.responseValue);
      console.log('getAllIssueList : ', data);
    }

    let edit = (list) => {
      console.log('edit', list);
      setpatientName(list.patientName)
      setdepartment(list.department)
      sethospitalName(list.hospitalName)
      setbloodGroup(list.groupName)
      setproductName(list.productName)
      setrequestedQuantity(list.requestedQuantity)
      setrowId(list.id)
    }
    let clear = async () => {
      setremark('');
      document.getElementById('ddlUpdateStatus').value = 0;
      setIsShowIssueModel(0);
    }
    let updateData = async () => {
      const updateStatus = parseInt(document.getElementById('ddlUpdateStatus').value);
      const res = BloodIssueValidations(updateStatus);
      console.log('res',res);
      // document.getElementById('errupdateStatus').style.display = 'none';
      var id = res[1];
      if (res === true) {
        var obj = {
          id: rowId,
          approvalStatus: updateStatus,
          remark: remark,
          userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        }
        console.log('update obj : ', obj);
        let data = await PostBloodIssueStatus(obj);
        if (data.status === 1) {
          setShowUnderProcess(0);
          getAllRequest();
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage('Updated Successfully!');
          setTimeout(() => {
            setShowToster(0);
            clear();
            //getVisitorList();
          }, 2000);
        }
        else {
          setShowUnderProcess(0);
          getAllRequest();
          setShowToster(1);
          setTosterMessage(data.responseValue);
          setTosterValue(1);
          setTimeout(() => {
            setShowToster(0);
          }, 2000)
        }
      }
      else {
        document.getElementById(id).innerHTML = res[0];
        document.getElementById(id).style.display = 'block';
      }
    }
      useEffect(() => {
       
        getAllIssueList();
        getAllRequest();
      },[])
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Blood Issue List' />
              <div className="col-12 mt-2">
              {/* <Heading text='Donor List' /> */}
             
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Patient Name</th>
                      <th>Age/Gender</th>
                      <th>Department</th>
                      <th>Hospital Name</th>
                      <th>BG</th>
                      <th>Product</th>
                      <th>Req Unit</th>
                      <th>Issued Unit</th>
                      <th>Req Date/Time</th>
                      <th>Status</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                  {getAllRequestList && getAllRequestList.map((list, index) => {
                      return (
                    <tr style={{
                        backgroundColor: list.approvalStatus === 2 ? '#ACDC8C' : list.approvalStatus === 1 ? '#F2D48F' : '#E86F68' ,
                      }} >
                      <td className="text-center">{index+ 1}</td>
                      <td>{list.patientUHID}</td>
                      <td>{list.patientName}</td>
                      <td>{list.age} / {list.gender}</td>
                      <td>{list.department}</td>
                      <td>{list.hospitalName}</td>
                      <td>{list.groupName}</td>
                      <td>{list.productName}</td>
                      <td>{list.requestedQuantity}</td>
                      <td>{list.issuedQuantity}</td>
                      <td>{list.createdDate}</td>
                      <td>{list.approvalStatustext}</td>
                      <td>
                        <div className="action-button">
                        <div  data-bs-title="Edit Row" data-bs-placement="bottom" onClick={() => {  setIsShowIssueModel(1);edit(list);}} ><i className="fa fa-thermometer-full actiontem"></i></div>
                        <div data-bs-toggle="modal"  data-bs-target="#IssueModal" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-camera-retro actioncam"></i></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit"></i></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><i className="fa fa-trash actiondel"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                    )
                    })}

                  </tbody>
                </TableContainer>
              </div>

            </div>        
            </div>

     


          </div>
        </div>

      </section>


{/* ///////////////////////////////// Extubate Modal POP up/////////////////////////// */}
{console.log('setIsShowIssueModel',isShowIssueModel)}
{isShowIssueModel === 1 ?
  <div className={`modal d-${isShowIssueModel === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">

<div className="modal-dialog modal-lg">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Issue Blood Remark </h1>

      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" onClick={()=>{setIsShowIssueModel(0)}}>

        <i className="bi bi-x-octagon"></i>

      </button>

    </div>
     
      <div className="modal-body p-0">

<div className="row">

  <div className="col-12">

    <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">

      <div className="row">
        {/* <input type='hidden' id='id' name='id' value={id} disabled></input> */}
        <div className="col-md-4 mb-2">

          <label htmlFor="patientName" className="form-label">Patient Name<span className="starMandatory">*</span>

          </label>

          <input type="text" className="form-control form-control-sm" id="patientName"  value={patientName} placeholder="Patient Name" name="patientName" disabled />


        </div>

        <div className="col-md-4 mb-2">

        <label htmlFor="department" className="form-label">Department<span className="starMandatory">*</span>

        </label>

        <input type="text" className="form-control form-control-sm" id="department"  value={department} placeholder="Department" name="department" disabled />


        </div>
        <div className="col-md-4 mb-2">

          <label htmlFor="hospitalName" className="form-label">Hospital Name<span className="starMandatory">*</span>

          </label>

          <input type="text" className="form-control form-control-sm" id="hospitalName" value={hospitalName} placeholder="Hospital Name" name="hospitalName" disabled />


        </div>

        <div className="col-md-4 mb-2">

        <label htmlFor="bloodGroup" className="form-label">Blood Group<span className="starMandatory">*</span>

        </label>

        <input type="text" className="form-control form-control-sm" id="bloodGroup" value={bloodGroup} placeholder="Blood Group" name="bloodGroup" disabled />


        </div>

        <div className="col-md-4 mb-2">

        <label htmlFor="productName" className="form-label">Product Name<span className="starMandatory">*</span>

        </label>

        <input type="text" className="form-control form-control-sm" id="productName" value={productName}  placeholder="Product Name" name="productName" disabled />


        </div>

        <div className="col-md-4 mb-2">

        <label htmlFor="requestedQuantity" className="form-label">Requested Quantity<span className="starMandatory">*</span>

        </label>

        <input type="text" className="form-control form-control-sm" id="requestedQuantity" value={requestedQuantity} placeholder="Requested Quantity" name="requestedQuantity" disabled />


        </div>
        <div className="col-md-4 mb-2">

        <label htmlFor="updateStatus" className="form-label">Update Status<span className="starMandatory">*</span>

        <select className="form-select form-select-sm" style={{width: '100%'}} id="ddlUpdateStatus" name="updateStatus"  aria-label=".form-select-sm example" onChange={clearErrorMsg}>
          <option value='0'>Update Status</option>
          <option value='2'>Approve</option>
          <option value='3'>Reject</option>
        </select>


        </label>

        {/* <input type="text" className="form-control form-control-sm" id="extubateDate" placeholder="Requested Quantity" name="extubateDate" disabled /> */}

        <div> <small id='errupdateStatus' className='form-text text-danger' ></small></div>

        </div>
          <div className="col-md-4 mb-2">


        <label htmlFor="remark"  className="form-label">Remark<span className="starMandatory">*</span>

        </label>

        <textarea type="text" className="form-control form-control-sm" id="remark" value={remark} placeholder="Remark" name="remark" onChange={handleChange}/>


        </div>

     

        <div className="col-md-4 mb-2">
          <label htmlFor="exampleFormControlInput1" className="form-label"> &nbsp; </label>
          <div>

          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
              showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                :
                <div>
                  {
                    <>
                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={updateData}>Update</button>
                    </>
                  }
                </div>
            }


          
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

</div> :''
}


<div className="modal fade" id="IssueModal" data-bs-backdrop="static">

<div className="modal-dialog modal-lg">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Blood Issue List </h1>

      <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window">

        <i className="bi bi-x-octagon"></i>

      </button>

    </div>

    <div className="modal-body p-0">

      <div className="row">

        <div className="col-12">

          <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">

            <div className="row">
            <div className="col-md-4 mb-2">

            <label htmlFor="patientName" className="form-label">Patient Name<span className="starMandatory">*</span>

            </label>

            <input type="text" className="form-control form-control-sm" id="patientName"  value={patientName} placeholder="Patient Name" name="patientName" disabled />


            </div>

            <div className="col-md-4 mb-2">

            <label htmlFor="department" className="form-label">Department<span className="starMandatory">*</span>

            </label>

            <input type="text" className="form-control form-control-sm" id="department"  value={department} placeholder="Department" name="department" disabled />


            </div>
            <div className="col-md-4 mb-2">

            <label htmlFor="hospitalName" className="form-label">Hospital Name<span className="starMandatory">*</span>

            </label>

            <input type="text" className="form-control form-control-sm" id="hospitalName" value={hospitalName} placeholder="Hospital Name" name="hospitalName" disabled />


            </div>

            <div className="col-md-4 mb-2">

            <label htmlFor="bloodGroup" className="form-label">Blood Group<span className="starMandatory">*</span>

            </label>

            <input type="text" className="form-control form-control-sm" id="bloodGroup" value={bloodGroup} placeholder="Blood Group" name="bloodGroup" disabled />


            </div>

            <div className="col-md-4 mb-2">

            <label htmlFor="productName" className="form-label">Product Name<span className="starMandatory">*</span>

            </label>

            <input type="text" className="form-control form-control-sm" id="productName" value={productName}  placeholder="Product Name" name="productName" disabled />


            </div>

            <div className="col-md-4 mb-2">

            <label htmlFor="requestedQuantity" className="form-label">Requested Quantity<span className="starMandatory">*</span>

            </label>

            <input type="text" className="form-control form-control-sm" id="requestedQuantity" value={requestedQuantity} placeholder="Requested Quantity" name="requestedQuantity" disabled />

            </div>

            <div className="col-md-4 mb-2">

            <label htmlFor="issueQuantity" className="form-label">Issue Quantity<span className="starMandatory">*</span>

            </label>

            <input type="number" className="form-control form-control-sm" id="issueQuantity" placeholder="Issue Quantity" name="issueQuantity"  />

            </div>

            
            <div className="col-md-4 mb-2">

            <label htmlFor="Remark" className="form-label">Remark<span className="starMandatory">*</span>

            </label>

            <textarea type="text" className="form-control form-control-sm" id="remark" placeholder="Remark" name="remark"  />

            </div>


              <div className="col-md-4 mb-2">
                <label htmlFor="exampleFormControlInput1" className="form-label"> &nbsp; </label>
                <div>
                  <button type="button" className="btn btn-save btn-sm mb-1 me-1"> Submit </button>
                </div>

              </div>



            </div>

            <div className='row'>

            <div className="col-md-12 mb-2">
            <div className="med-table-section" style={{ "height": "50vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      
                      <th>Donor Name</th>
                      <th>Age/Gender</th>
                      <th>Bag No.</th>
                      <th>BG</th>
                      <th>Product</th>
                      <th>Expiry </th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                  {getAllIssueList && getAllIssueLists.map((list, index) => {
                      return (
                    <tr style={{
                        backgroundColor: list.approvalStatus === 2 ? '#ACDC8C' : list.approvalStatus === 1 ? '#F2D48F' : '#E86F68' ,
                      }} >
                      <td className="text-center">{index+ 1}</td>
                      <td>{list.donorName}</td>
                      <td>{list.age} / {list.gender}</td>
                      <td>{list.bagSerialNumber}</td>
                      <td>{list.groupName}</td>
                      <td>{list.productName}</td>
                      <td>{list.createdDate}</td>
                      <td>{list.approvalStatustext}</td>
                      <td>
                        <div className="action-button">
                      
                        </div>
                      </td>
                    </tr>
                    )
                    })}

                  </tbody>
                </TableContainer>
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

</div>

    </>
  )
}
