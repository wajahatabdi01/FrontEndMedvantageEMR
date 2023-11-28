import React, { useEffect, useState } from 'react'
import BoxHeading from './BoxHeading'
import GetFoodIntake from '../../Clinical/API/Dasboard/GetFoodIntake';
import TableContainer from "../../Component/TableContainer"

export default function SuggestedFood(props) {
  let [allIntakeList, setAllIntakeList] = useState([]);
  let getAllIntake = async () => {
    console.log("scsdcs", props.patientData)
    let uhid = props.patientdata.UhId;
    const currentDate = new Date();
    const currentFormattedDate = currentDate.toISOString();
    let fromDate = currentFormattedDate;
    let response = await GetFoodIntake(uhid, fromDate);
    if (response.status === 1) {
      console.log('test : ', response);
      setAllIntakeList(response.foodIntakeList);
    }
  }

  useEffect(() => {
    getAllIntake();

  }, [])

    

  return (
    <div className={`modal d-${props.suggestedFoodpopup === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "backdrop-filter": "blur(8px)", overflowY: 'none' }}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
            <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
          </span>
          <BoxHeading title="Suggested Food" patientName={props.patientdata.PntName} uhid={props.patientdata.UhId}/>
          <div className='mt-1 ps-2 pe-2 pb-3'>
            {/* write here  */}
            <TableContainer>
              <thead>
                <th>#</th>
                <th>Food name</th>
                <th>Quantity</th>
                <th>Date Time</th>
              </thead>
              <tbody>

                {allIntakeList && allIntakeList.map((list, index) => {

                  return (

                    <tr>
                      <td className='' style={{ paddingLeft: '7px', fontSize: '13px',color:'#fff' }}>{index + 1}</td>
                      <td><span style={{ color: '#fff', fontSize: '13px' }}>{list.foodName}</span></td>
                      <td><span style={{ color: '#fff', fontSize: '13px' }}>{list.foodQty} {list.unitName}</span></td>
                      <td><span style={{ color: '#fff', fontSize: '13px' }}>{list.foodEntryDate}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

