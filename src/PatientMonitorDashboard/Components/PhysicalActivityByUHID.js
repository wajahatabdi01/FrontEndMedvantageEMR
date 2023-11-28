import React, { useEffect, useState } from 'react'
import GetPhysicalActivityByUHID from './Checklist/Api/GetPhysicalActivityByUHID'
import BoxHeading from '../../Component/BoxHeading';
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'

export default function PhysicalActivityByUHID(props) {
  let [getPhysicalActivity, setPhysicalActivity] = useState([]);
  let [showImage, setShowImage] = useState(0)

  let funGetPhysicalActivityList = async () => {
    let activityList = await GetPhysicalActivityByUHID(props.patientdata.UhId);
    if (activityList.status === 1) {
      setPhysicalActivity(activityList.responseValue)
    }
    else {
      setShowImage(1)
    }

  }

  useEffect(() => {
    funGetPhysicalActivityList()
  }, [])
  return (
    <>
      <div className={`modal d-${props.ShowPhysicalActivityPopup === 0 ? 'none' : 'block'}`}>
        <div className="modal-dialog modal-dialog-centered_ modal-lg">
          <div className="modal-content">
            {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
              <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
            </span> */}
            {/* <BoxHeading name="" textcolor="#7E7E7E" patientBool={true} patientName={props.patientdata.PntName} patientUhid={props.patientdata.UhId} /> */}
            {/* <BoxHeading title={"Physical Activity"} uhid={props.patientdata.UhId} patientName={props.patientdata.PntName} /> */}


            <span className="closee" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>                        
            <div className='p-profile'>
              <div className='p-profile-h'>Physical Activity</div>
                <div className='p-profile-h'>
                  <div className='pname'><span>{props.patientdata.UhId}</span></div>
                <div className='pname'>- {props.patientdata.PntName}</div> 
              </div>
            </div>


             <div className="row">
              <div className="col-12">
              <div className='mt-1 px-2'>              
                {/* <div className='listdetailsct pac'>
                  <div className='listdetailsct-in'>
                    <div className='listd-in showing '>Physical Activity</div>
                  </div>
                  <div className='listdetailsct-in'>
                    
                  </div>
                </div> */}
                <div className="med-table-section histry_view_ pdtable" style={{ height: '350px', position: 'relative' }}>              
                {showImage === 0 ?<table className='tableAdrReport_ table-regular-second_' >
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th className='text-center'>Time From</th>
                        <th className='text-center'>Time To</th>
                        <th className='text-center'>Total Time(min)</th>

                          {/* {timeList && timeList.map((i)=>{
                          return(
                              <th style={{ color: '#546788', letterSpacing: '1px', fontSize: '14px' }}>{i.time}</th>
                          )
                      })} */}
                      </tr>
                    </thead>
                    <tbody>
                      
                      {getPhysicalActivity.map((list, ind) => {
                        
                        return (
                          <>
                            <tr key={list.id}>
                              <td>{list.activityName}</td>
                              <td className='text-center'>{list.timeFrom}</td>
                              <td className='text-center'>{list.timeTo}</td>
                              <td className='text-center'>{list.totalTimeInMinutes}</td>
                            </tr>
                          </>
                        )
                      })}
                    
                    </tbody>
                  </table>:
                  <img className='imageNoDataFound' src={NoDataFound}  alt=''/>
                  }
                
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
