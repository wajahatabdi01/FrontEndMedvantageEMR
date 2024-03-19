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
import dobIm from '../../BloodBank/images/dob.svg'
import time from '../../BloodBank/images/time.svg'
import printer from '../../BloodBank/images/printer.svg'
import exportfile from '../../BloodBank/images/exportfile.svg'
import phone from '../../BloodBank/images/phone.svg'
import GetCreateBagList from '../Api/BloodDonorRegestration/GetBlood/GetCreateBag/GetCreateBagList';
import GetAllBagComposition from '../Api/BloodDonorRegestration/GetBlood/GetCreateBag/GetAllBagComposition';
import GetBagProductMapping from '../Api/BloodDonorRegestration/GetBlood/GetCreateBag/GetBagProductMapping';
import PostCreateBagComponent from '../Api/BloodDonorRegestration/PostBlood/PostCreateBag/PostCreateBagComponent';
import CreateBagValidation from '../../Validation/BloodBank/CreateBagValidation';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';



export default function CreateBloodBag() {

  let [createBagList, setCreateBagList] = useState([]);
  let [bagComposition, setBagComposition] = useState([]);
  let [productComponent, setProductComponent] = useState([]);
  let [donorName, setDonorName] = useState('');
  let [donorID, setDonorID] = useState('');
  let [ageOfDonor, setAgeOfDonor] = useState('');
  let [gender, setGender] = useState('');
  let [bloodGroup, setBloodGroup] = useState('');
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [visitID, setVisitID] = useState("");

  //let [rowID, setRowID] = useState('');

  

  let getCreateBagsList = async() => 
  {
    let data = await GetCreateBagList();
    
    setCreateBagList(data.responseValue);
  }

  let getAllBagComposition = async() => 
  {
    let data = await GetAllBagComposition();
    
    setBagComposition(data.responseValue);
    
  }
  //  hhh:JSON.stringify(productComponent)
  let createBagFillUp = async(list) =>
  {
    document.getElementById('showButton').style.display = 'block';

    setDonorName(list.donorName);
    setBloodGroup(list.groupName);
    setDonorID(list.donorID);
    setAgeOfDonor(list.age);
    setGender(list.gender);
    setVisitID(list.visitID);
  }

  let saveBag = async() =>
  {
    let arr = [];
    const bagID=document.getElementById('ddlBagComponent').value;
    //const productID=document.getElementById('product').value;
    const res = CreateBagValidation(donorName,donorID,ageOfDonor,gender,bloodGroup,bagID,productComponent);
    if(res === true)
    {
     
      //setShowUnderProcess(1);
    
      for(var i =0; i < productComponent.length; i++){
        arr.push(
          {
            bagCompositionID: bagID,
            productID : productComponent[i].productID
           
          }
        )
        
      }
     
      let obj = 
      {
        jsonbagComposition : JSON.stringify(arr),
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        visitID:visitID
      }
     
      
      let data = await PostCreateBagComponent(obj);
      if(data.status === 1)
      {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage('Bag Created Successfully');
        setTimeout(() => {
          clear();
          setShowToster(0);
          getCreateBagsList();
        },2000);
      }
      else{
        setShowUnderProcess(0);
          setShowToster(1);
          setTosterMessage(data.responseValue);
          setTosterValue(1);
          setTimeout(() => {
            setShowToster(0);
          },4000);
      }
    }
    else{
      setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage('Fields cannot be empty. Please click on Create Bag');
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0);
        },2000);
    }
    
    
  }

  let clear = async() =>
  {
    
    setDonorName('');
    setDonorID('');
    setBloodGroup('');
    setGender('');
    setAgeOfDonor('');
    document.getElementById('ddlBagComponent').value = 0;
    setProductComponent('');
  }
  let getBagMappingProducts = async() => 
  {
     const slctdBagCompositionId = document.getElementById('ddlBagComponent').value;
    
   
     let data = await GetBagProductMapping(slctdBagCompositionId);
    
     setProductComponent(data.responseValue);
  }


  useEffect(() => {
    getCreateBagsList();
    getAllBagComposition();
    document.getElementById('showButton').style.display='none';
  },[])

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Create Blood Bag' id='top'/>
              
              <div className="fieldsett-in">
                 <div className="fieldsett">
                   <span className='fieldse'>Create Blood Bag</span>
                   <div className="row mt-2 px-2">
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="mb-2">
                    <div className="d-flex align-items-baseline">
                    <img src={name} className='icnn' alt=''/> <label htmlFor="DonorName" className="form-label">Donor Name</label>
                    </div>
                       
                        <input type="text" className="form-control form-control-sm" id="DonorName" name="DonorName" value={donorName} placeholder="Donor Name" disabled />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="mb-2">
                    <div className="d-flex align-items-baseline">
                    <img src={donorid} className='icnn' alt=''/> <label htmlFor="MobileNumber" className="form-label">Donor ID</label>
                    </div>
                      
                        <input type="text" className="form-control form-control-sm" id="MobileNumber" name="MobileNumber" value={donorID} placeholder="Mobile Number" disabled />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="mb-2">
                    <div className="d-flex align-items-baseline">
                    <img src={age} className='icnn' alt=''/> <label htmlFor="Age" className="form-label">Age/Gender</label>
                    </div>
                      
                        <input type="text" className="form-control form-control-sm" id="Age" name="Age" placeholder="Age" value={ageOfDonor +'  '+ gender} disabled />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="mb-2">
                    <div className="d-flex align-items-baseline">
                    <img src={bloddgroup} className='icnn' alt=''/> <label htmlFor="BloodGroup" className="form-label">Blood Group</label>
                    </div>
                      
                        <input type="text" className="form-control form-control-sm" id="BloodGroup" name="BloodGroup" placeholder="Blood Group" value={bloodGroup} disabled/>
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="mb-2">
                      <div className="d-flex align-items-baseline">
                      <img src={product} className='icnn' alt=''/> <label htmlFor="Bag Component" className="form-label">Bag Type</label>
                      </div>
                        <select className="form-select form-select-sm" id='ddlBagComponent' onChange={() => {getBagMappingProducts()}} aria-label=".form-select-sm example">
                          <option value='0'>Select Bag</option>
                          {
                            bagComposition && bagComposition.map((list, index) => {
                              return(
                                <option value={list.id}>{list.bagName}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="mb-2">
                    <div className="d-flex align-items-baseline">
                    <img src={product} className='icnn' alt='' />
                    <label htmlFor="product" className="form-label">Product</label>
                    </div>
                      
                    
                      <div  className="form-control form-control-sm" id="product" name="product" style={{backgroundColor:'#E9E9E9' }} disabled >
                    
                        {productComponent && productComponent.map((val,index)=>{
                        return(
                            <span>{val.productName}<br /></span>
                        )
                      })}
                      </div>
                      
                     
                    </div>
                    </div>
                   </div>
                 </div>
              </div> 
              
              <div className="rt-btns" id='showButton'>
                <BoxContainer>
                  <div className="mb-2 relative">
                    {/* <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label> */}
                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                      showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                        :
                        <div>
                          
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal">Save</button>
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}>Clear</button>
                          
                        </div>
                    }

                  </div>
                </BoxContainer>
              </div>

              

            <div className="col-12 mt-2">
               <Heading text='Donor List' />
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <div className='listd-in'><img src={dobIm} className='icnn' alt=''/> <span style={{  color: '#1D4999',fontWeight:'bold',fontSize: '14px'}}>Select Date</span></div>
                  <div className='listd-in'>
                      <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                          <option selected>May 10, 2023 - May 16, 2023</option>
                      </select>
                  </div>
                </div>
                {/* <div className='listdetailsct-in'>
                  <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                       <input type="search" className="form-control form-control-sm"   placeholder="Search.." />
                        <i className="fa fa-search"></i>
                    </form>
                  </div>
                  <div className='listd-in'><img src={exportfile} className='icnn' alt=''/></div>
                  <div className='listd-in'><img src={printer} className='icnn' alt=''/></div>
                </div> */}
              </div>

              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr >
                      <th className="" style={{ "width": "5%" }}>S.No.</th>
                      <th className="">Donor Name</th>
                      <th className="">Donor ID</th>
                      <th className="">Age/Gender</th>
                      <th className="">Blood Group</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {createBagList && createBagList.map((list, index) => {
                      return(
                        <tr>
                        <td className='' style={{paddingLeft:'7px',fontSize: '13px'}}>{index + 1}</td>
                        <td className=''><span style={{ fontSize: '13px', color: '#7B7B7B'}}>{list.donorName}</span></td>
                        <td className=''><span style={{ fontSize: '13px', color: '#7B7B7B'}}>{list.donorID}</span></td>
                        <td className=''><span style={{ fontSize: '13px', color: '#7B7B7B'}}>{list.gender}/{list.age}</span></td>
                        <td className=''><span style={{ fontSize: '13px', color: '#7B7B7B'}}>{list.groupName}</span></td>
                        <td className='text-center'>
                          <div className="action-button">
                          <a href='#top'>
                          <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => {createBagFillUp(list)}}>Create Bag</button>
                          </a>
                          
                          </div>
                        </td>
                        </tr>
                      )
                    })}
                    {/* <tr>
                      <td className="text-center">1</td>
                      <td>Rahad Hussain</td>
                      <td>9945671102</td>
                      <td>34 Years/ Male</td>
                      <td>A+</td>
                      <td>05/25/2023 04:02 PM</td>
                      
                      <td>2</td>
                      <td>
                        <div className="action-button">
                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" >Save</button>
                        </div>
                      </td>
                    </tr> */}


                  </tbody>
                </TableContainer>
              </div>

            </div>


          </div>
        </div>
        
        {/* Modal start */}
        <div className='modal fade' id='deleteModal' tabIndex='-1' aria-labelledby='deleteModalLabel' aria-hidden='true'>
          <div className='modal-dialog modalDelete'>
            <div className='modal-content'>
              <div className='modal-body modelby text-center'>
                <div className='popDeleteIcon'><i className='fas fa-save'></i></div>
                <div className='popDeleteTitle mt-3'>Save?</div>
                <div className='popDeleteContent'>Do you want to save it?</div>
              </div>
              <div className='modal-footer1 text-center'>
              <button type='button' className='btncancel popBtnCancel me-2' data-bs-dismiss='modal'>Cancel</button>
              <button type='button' className='btn-delete popBtnDelete' onClick={saveBag} data-bs-dismiss='modal'>Save</button>
              </div>
            </div>
          </div>
        </div>
</div>
      </section>
    </>
  )
}
