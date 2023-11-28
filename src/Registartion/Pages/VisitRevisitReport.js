import React from 'react';
import imgUHID from '../../../src/assets/images/icons/UHID1.svg'
import exportfile from '../../BloodBank/images/exportfile.svg'
import printer from '../../BloodBank/images/printer.svg'
import Loader from '../../Component/Loader';
import {useEffect , useState,useRef } from  'react';

import GetAllDepartmentList from '../API/VisitandRevisit/GetAllDepartmentList'
import GetAllPatientVisitReport from '../API/VisitandRevisit/GetAllPatientVisitReport';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function VisitRevisitReport() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  
const [VisitRevist, setVisitRevist] = useState([])
const [departmentList ,setDeparmentlist] = useState([]);
const [toDate, settoDate] = useState('')
const [fromDate, setfromDate] = useState('')
const [vist, setVisit] = useState("3")
const [Department, setDepartment] = useState('0')
const [UHID, setUHID] = useState('')
const [VisitNo, setVisitNo] = useState("")
const [patientName, setpatientName] = useState('')
const [mobileNo, setmobileNo] = useState('')
const [guardianName, setguardianName] = useState('')
const [PID, setPID] = useState('')
const [emailID, setemailID] = useState('')
const [loading, setLoading] = useState(true);
const [showLoder, setShowLoder] = useState(0);
const [pageSize, setPageSize] = useState(1);
const tableContainerRef = useRef(null);
const [totalEntries, setTotalEntries] = useState(0)



 const handleOnChange = (e) => {
  
  const { name, value } = e.target;
  console.log('name:', name);
  console.log('value:', value);
  if (name === 'fromDate') {
    setfromDate(value)
    
  }
  else if (name === 'toDate'){
    settoDate(value)
  }
  else if (name === "visit"){
    setVisit(value)
  }
  else if (name === 'Department'){
    setDepartment(value)
  }
  else if (name === 'UHID'){
    setUHID(value)
  }
  else if (name === 'PID'){
    setPID(value)
  }
  else if (name === 'patientName'){
    setpatientName(value)
  }
  else if (name === 'VisitNo'){
    setVisitNo(value)
  }
  else if (name === 'VisitNo'){
    setVisitNo(value)
  }
  else if (name === 'mobileNo'){
    setmobileNo(value)
  }
  else if (name === 'email'){
    setemailID(value)
  }
  else if (name === 'guardianName'){
    setguardianName(value)
  }
};


const DepartmentList = async()=>{
  let department = await GetAllDepartmentList()
  if(department.status === 1){
    setDeparmentlist(department.responseValue);
    console.log("DepartmentList" , department.responseValue)
  }
}


const handleOnsearch = async () => {
  // Show loader
   setShowLoder(1);

 
  setTimeout(async () => {
    let VisitRevistData = await GetAllPatientVisitReport(vist, UHID,Department, patientName, mobileNo, guardianName, emailID,pageSize);
    if (VisitRevistData.status === 1) {
      setVisitRevist(VisitRevistData.responseValue);
      console.log("VisitData", VisitRevistData.responseValue);
    }
    setShowLoder(0);
  }, 1000); 
};

const handleReset = () => {
  handleOnsearch()
  // Reset input fields
  settoDate('');
  setfromDate('');
  setDepartment('0');
  setUHID('');
  setVisitNo('');
  setpatientName('');
  setmobileNo('');
  setguardianName('');
  setPID('');
  setemailID('')
  setPageSize(1)
 
}

  // Fetch data based on the 'vist' value
 

const handleNext = async ()=>{
  setPageSize(pageSize + 1);
  let VisitRevistData = await GetAllPatientVisitReport(vist, UHID,Department, patientName, mobileNo, guardianName, emailID,pageSize);
  
  setVisitRevist(VisitRevistData.responseValue)
  if (tableContainerRef.current) {
    tableContainerRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
const handlePrevious = async ()=>{
  if(pageSize > 1){
    setPageSize(pageSize - 1);
    let VisitRevistData = await GetAllPatientVisitReport(vist, UHID,Department, patientName, mobileNo, guardianName, emailID,pageSize);
    setVisitRevist(VisitRevistData.responseValue);
    window.scrollTo(0, 0);
  }
 
}

const startIndex = (pageSize - 1) * 50 + 1;
const endIndex = Math.min(pageSize * 50);

// Calculate the correct range for the first page
const firstPageRange = pageSize === 1 ? `1-${Math.min(50, totalEntries)}` : '';

useEffect(() => {
  DepartmentList()
  handleOnsearch();
  
}, [pageSize])

  return (
    <>
    <div className='main-content mt-5 py-3'>
     

     <div className="container-fluid">
       <div className="row">
         <div className="col-12">
           <div className="med-box pb-1">
           <div class="title">Patient Visit/Revisit Report </div>      
           </div>    
         </div>
     
         <div className="col-12 mt-2">
           <div className="med-box pb-1">
           <div className="title fs-6">{t("Patient Visit/Revisit Report")}</div>  
           <div className="inner-content">
            <div className='row mt-2 px-2'>
              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"><b>{t("From Date")}</b><span class="starMandatory"> </span></label>
                    </div>
                    <input type="date" class="form-control form-control-sm" id="fromdate" name="fromDate" value={fromDate} onChange={handleOnChange}></input>                
                </div>
              </div>
              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"><b>{t("To Date")}</b><span class="starMandatory"> </span></label>
                    </div>
                    <input type="date" class="form-control form-control-sm" id="todate" name="toDate" value={toDate}  onChange={handleOnChange}></input>                
                </div>
              </div>

              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"> <b>{("Visit/Revisit")}</b><span class="starMandatory"> </span></label>
                    </div>
                    <select className='form-select form-select-sm' name ="visit" value={vist} onChange={handleOnChange}>   
                    <option value="3">All</option>    
                    <option value="2">Visit</option>    
                    <option value="1">Revisit</option>
                    </select>              
                </div>
              </div>

              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"> <b>Department</b><span class="starMandatory"> </span></label>
                    </div>                  
                    <select className='form-select form-select-sm' name='Department'  value={Department} onChange={handleOnChange}>
                    <option value="0">Select Department </option>   
                    {departmentList && departmentList.map((val,index)=>{
                      return (
                        <option key={index} value= {val.id}>{val.departmentName}</option>   
                      )
                    })}
                    </select>              
                </div>
              </div>
              
              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"> <b>UHID</b><span class="starMandatory"> </span></label>
                    </div>                  
                    <input type="text" class="form-control form-control-sm" id="UHID" name="UHID" value={UHID} placeholder="Enter UHID" onChange= {handleOnChange}></input>             
                </div>
              </div>
              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="PID" class="form-label"> <b>PID</b><span class="starMandatory"> </span></label>
                    </div>                  
                    <input type="number" class="form-control form-control-sm" id="PID" name="PID" value={PID} placeholder="Enter P.ID" onChange= {handleOnChange}></input>             
                </div>
              </div>

              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"><b>Patient Name</b> <span class="starMandatory"> </span></label>
                    </div>                  
                    <input type="text" class="form-control form-control-sm" id="patientName"  value={patientName} name="patientName" placeholder="Enter Patient Name" onChange={handleOnChange} ></input>  
                </div>
              </div>

              

              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"><b>Mobile No.</b> <span class="starMandatory"> </span></label>
                    </div>  
                    <input type="number" class="form-control form-control-sm" id="UHID" name="mobileNo" value={mobileNo}  placeholder="Enter Mobile No." onChange={handleOnChange}/>           
                </div>
              </div>
              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"><b>Email ID</b> <span class="starMandatory"> </span></label>
                    </div>  
                    <input type="text" class="form-control form-control-sm" id="email" name="email" value={emailID}  placeholder="Enter Email ID" onChange={handleOnChange}/>           
                </div>
              </div>

              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"><b>Guardian's Name</b> <span class="starMandatory"> </span></label>
                    </div>                  
                    <input type="text" class="form-control form-control-sm" id="guardianName" name="guardianName" value={guardianName} placeholder="Enter Guardian Name" onChange={handleOnChange} ></input>

                </div>
              </div>

              {/* {/  <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
                    <div className='d-flex align-items-baseline'>                                              
                        <i className="bi bi-calendar-week me-1"></i><label for="UHID" class="form-label"><b>Patient Category</b> <span class="starMandatory"> </span></label>
                    </div>                  
                    <input type="text" class="form-control form-control-sm" id="UHID" name="UHID" placeholder="Search Patient Category" value=""/>            
                </div>
              </div>  /} */}

              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <div className="mb-2 me-2">
              <label for="exampleFormControlInput1" class="form-label">&nbsp;</label>

              <div>
                <button type="button" class="btn btn-save btn-save-fill btn-sm mb-1 me-1"  onClick={handleOnsearch}><i className='bi bi-search'></i> Search</button>
                <button type="button" class="btn btn-clear btn-sm mb-1 me-1" onClick = {handleReset}>
                <i className='bi bi-arrow-clockwise'></i> Reset</button>
                </div>                                     
                                
                </div>
              </div>
              
            </div>
            
            
           </div>

           
     
           
           </div>    
         </div>
       </div>



        <div className='row mt-2'>
            <div className="col-12">
                <div className="handlser"> 
                        
                    <div class="heading mb-2">Visit Revisit List</div>
                    <div className='d-flex gap-2'>
                    <div style={{position: 'relative'}}>
                        <input type="text" class="form-control form-control-sm" placeholder="Search..." value=""/><span class="tblsericon"><i class="fas fa-search"></i></span>
                    </div>

                    <div className='listd-in'><img src={exportfile} className='icnn' alt='' /></div>
                  <div className='listd-in'><img src={printer} className='icnn' alt='' /></div>
                    </div>  

                </div>
                <div className='heading' style={{fontSize: '14px'}}>Showing {startIndex}-{endIndex} Entries of 4992 Entries | Page {pageSize}</div>   
                <div className="med-table-section" ref={tableContainerRef} style={{height:'588px'}}>
                    <table className='med-table border_ striped'>
                    <thead>
                        <tr>
                            <th class="text-center" style={{width:'2%'}}>#</th>
                            <th>UHID</th>
                            <th>CR No.</th>
                            <th>P.Id</th>
                            <th>Patient Name</th>
                            <th>Mobile No</th>
                            <th>Guardian's Name</th>
                            <th>Email Address</th>
                            <th>Visit Date/Time</th>
                            <th>Department</th>
                           
                            </tr>
                    </thead>
                    <tbody>

                      {VisitRevist && VisitRevist.map((data,index)=>{
                        const serialNumber = (pageSize - 1) * 50 + index + 1;
                        return (
                          <tr>
                          <td class="text-center">{serialNumber}</td>
                          <td className='text-primary'>{data.uhID}</td>
                          <td>{data.crNo}</td>
                          <td>{data.pid}</td>
                          <td >{data.patientName}<br></br><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{data.age} yrs</span> | <span style={{ fontSize: '13px', color: '#7B7B7B' }}>{data.genderName}</span></td>
                          <td>{data.mobileNo}</td>
                          <td>{data.guardianName}</td>
                          <td>{data.emailID}</td>
                          <td>{data.createdDate}</td>
                          <td>{data.departName}</td>
                      </tr>
                      )}) 
                  }
                     
                        

                       
                    </tbody>
                    </table>
                    <nav aria-label="Page navigation example" className='mt-3 ms-2'style={{float: 'left',}}>
  <ul class="pagination justify-content-end">
    <li class="page-item" onClick={handlePrevious} disabled={pageSize === 1}>
      <a class="page-link"  tabIndex="-1" >Previous</a>
    </li>
    <li class="page-item"><a class="page-link" >1</a></li>
    <li class="page-item"><a class="page-link" >2</a></li>
    <li class="page-item"><a class="page-link" >3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" onClick={handleNext}> Next</a>
    </li>
  </ul>
</nav>
                </div>

                

            </div>
        </div>
       
     </div>
     
         </div>
    
         {
          showLoder === 1 ? <Loader val={showLoder} /> : ""
        }
    </>
  )
}
