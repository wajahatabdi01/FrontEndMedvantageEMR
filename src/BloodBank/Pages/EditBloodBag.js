import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';
import donorid from '../../BloodBank/images/donorid.svg'
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
import GetAllCreatedBag from '../Api/BloodDonorRegestration/GetBlood/GetCreateBag/GetAllCreatedBag';
import GetAllBagComposition from '../Api/BloodDonorRegestration/GetBlood/GetCreateBag/GetAllBagComposition';
import GetBagProductMapping from '../Api/BloodDonorRegestration/GetBlood/GetCreateBag/GetBagProductMapping';
import CreateBagValidation from '../../Validation/BloodBank/CreateBagValidation';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import PutBloodBag from '../Api/BloodDonorRegestration/PutBlood/PutBloodBag';
import DeleteBloodBag from '../Api/BloodDonorRegestration/DeleteBlood/DeleteBloodBag';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';

export default function EditBloodBag() {

  let [donorName, setDonorName] = useState('');
  let [donorID, setDonorID] = useState('');
  let [ageOfDonor, setAgeOfDonor] = useState('');
  let [gender, setGender] = useState('');
  let [bloodGroup, setBloodGroup] = useState('');
  //let [visitID, setVisitID] = useState("");
  let [bagComposition, setBagCompositon] = useState([]);
  let [allCreatedBagList, setAllCreatedBagList] = useState([]);
  let [productComponent, setProductComponent] = useState([]);
  let [visitID, setVisitID] = useState("");
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [rowID, setRowID] = useState('');

  let edit = (list) => {
    
    document.getElementById('ddlBagComponent').value = list.bagCompositionID;
    setDonorName(list.donorName);
    setDonorID(list.donorID);
    setAgeOfDonor(list.age);
    setGender(list.gender);
    setBloodGroup(list.groupName);
    getProductMapping(list.bagCompositionID);
    setVisitID(list.visitID);
   
  }

  let updateData = async () => {
    let arr = [];
    const bagID = parseInt(document.getElementById('ddlBagComponent').value);
    const res = CreateBagValidation(donorName, donorID, ageOfDonor, gender, bloodGroup, bagID, productComponent);
    if (res === true) {
      for (var i = 0; i < productComponent.length; i++) {
        arr.push(
          {
            bagCompositionID: bagID,
            productID: productComponent[i].productID

          }
        )
      }
 

      let obj = {
        jsonbagComposition: JSON.stringify(arr),
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        visitID: visitID,
      }
     

      let data = await PutBloodBag(obj)
      
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage('Bag Updated Successfully!');
        setTimeout(() => {
          clear();
          setShowToster(0);
          getAllCreatedBag();
        }, 2000);
      }
      else {
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(data.responseValue);
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0);
        }, 2000);
      }
    }
    else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage('All fields are mandatory to be filled!');
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  }

  let deleteData = async () => {
   
    const userID = JSON.parse(window.sessionStorage.getItem('LoginData')).userId;
    var obj = {
      visitID: rowID,
      userId: userID,
    }
    

    let data = await DeleteBloodBag(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Deleted Successfully!');
      setTimeout(() => {
        setShowToster(0);
        getAllCreatedBag();
      }, 2000);
    }
  }



  let clear = async () => {
    setDonorName('');
    setDonorID('');
    setBloodGroup('');
    setGender('');
    setAgeOfDonor('');
    document.getElementById('ddlBagComponent').value = 0;
    setProductComponent('');
  }

  let getProductMapping = async (id) => {
    
    let data = await GetBagProductMapping(id)
    setProductComponent(data.responseValue)
  
  }

  let productsToUpdate = async () => {
    const bagCompoID = document.getElementById('ddlBagComponent').value;
    let data = await GetBagProductMapping(bagCompoID);
    
    setProductComponent(data.responseValue);

  }

  let getAllCreatedBag = async () => {
    let data = await GetAllCreatedBag();
    setAllCreatedBagList(data.responseValue);
  }

  let getAllBagCompo = async () => {
    let data = await GetAllBagComposition();
    setBagCompositon(data.responseValue);

  }

  useEffect(() => {
    getAllBagCompo();
    getAllCreatedBag();
  }, [])
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Edit Blood Bag' id='top' />

              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className='fieldse'>Edit Blood Bag</span>
                  <div className="row mt-2 px-2">
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={name} className='icnn' alt='' /> <label htmlFor="DonorName" className="form-label">Donor Name</label>
                        </div>

                        <input type="text" className="form-control form-control-sm" id="DonorName" name="DonorName" value={donorName} placeholder="Donor Name" disabled />
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={donorid} className='icnn' alt='' /> <label htmlFor="MobileNumber" className="form-label">Donor ID</label>
                        </div>

                        <input type="text" className="form-control form-control-sm" id="donorID" name="donorID" value={donorID} placeholder="Donor ID" disabled />
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={age} className='icnn' alt='' /> <label htmlFor="Age" className="form-label">Age/Gender</label>
                        </div>

                        <input type="text" className="form-control form-control-sm" id="Age" name="Age" placeholder="Age" value={ageOfDonor + ' ' + gender} disabled />
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={bloddgroup} className='icnn' alt='' /> <label htmlFor="BloodGroup" className="form-label">Blood Group</label>
                        </div>

                        <input type="text" className="form-control form-control-sm" id="BloodGroup" name="BloodGroup" placeholder="Blood Group" value={bloodGroup} disabled />
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={product} className='icnn' alt='' /> <label htmlFor="Bag Component" className="form-label">Bag Type</label>
                        </div>

                        <select className="form-select form-select-sm" id='ddlBagComponent' onChange={() => { productsToUpdate() }} aria-label=".form-select-sm example">
                          <option value='0'>Select Bag</option>
                          {bagComposition && bagComposition.map((list, index) => {
                            return (
                              <option value={list.id}>{list.bagName}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={product} className='icnn' alt='' /><label htmlFor="product" className="form-label">Product</label>
                        </div>


                        <div className="form-control form-control-sm" id="product" name="product"  style={{backgroundColor:'#E9ECEF'}}>

                          {productComponent && productComponent.map((val, index) => {
                            return (
                              <span disabled>{val.productName}<br /></span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rt-btns">
                <BoxContainer>
                  <div className="mb-2 relative">
                    {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                      showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                        :
                        <div>
                          <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={updateData}>Update</button>
                          <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}> <img src={clearBtnIcon} className='icnn' alt='' />Clear</button>
                        </div>
                    }

                  </div>
                </BoxContainer>
              </div>
            </div>

            <div className="col-12 mt-2">
              {/* <Heading text='Donor List' /> */}
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <div className='listd-in'><img src={dob} className='icnn' alt='' /> <span style={{ color: '#1D4999', fontWeight: 'bold', fontSize: '14px' }}>Select Date</span></div>
                  <div className='listd-in'>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option selected>May 10, 2023 - May 16, 2023</option>
                    </select>
                  </div>
                </div>
                {/* <div className='listdetailsct-in'>
                  <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                  <div className='listd-in'><img src={exportfile} className='icnn' alt='' /></div>
                  <div className='listd-in'><img src={printer} className='icnn' alt='' /></div>
                </div> */}
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>

                      <th style={{ "width": "5%" }}>S.No.</th>
                      <th >Donor Name</th>
                      <th >Donor ID</th>
                      <th >Age/Gender</th>
                      <th >Blood Group</th>
                      <th >Bag Name</th>
                      <th >Bag No</th>
                      <th >Product Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>

                  </thead>

                  <tbody>
                   
                    {allCreatedBagList && allCreatedBagList.map((list, index) => {
                      return (
                        <tr>
                          <td ><span style={{ fontSize: '13px', paddingLeft: '7px' }}>{index + 1}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.donorName}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.donorID}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.gender}/{list.age}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.groupName}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.bagName}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{JSON.parse(list.jsonColumn).map((val) => { return (val.bagSerialNo + ',') })}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{JSON.parse(list.jsonColumn).map((val) => { return (val.productName + ',') })}</span></td>
                          <td className="text-center">
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><a href='#top'><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list) }}/></a></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.visitID) }}/>
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
        {/* Modal for delete */}
        <div className='modal fade' id='deleteModal' tabIndex='-1' aria-labelledby='deleteModalLabel' aria-hidden='true'>
          <div className='modal-dialog modalDelete'>
            <div className='modal-content'>
              <div className='modal-body modelby text-center'>
                <div className='popDeleteIcon'><i className='fa fa-trash'></i></div>
                <div className='popDeleteTitle mt-3'>Delete?</div>
                <div className='popDeleteContent'>Do you want to delete it?</div>
              </div>
              <div className='modal-footer1 text-center'>
                <button type='button' className='btncancel popBtnCancel me-2' data-bs-dismiss='modal'>Cancel</button>
                <button type='button' className='btn-delete popBtnDelete' onClick={deleteData} data-bs-dismiss='modal'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
