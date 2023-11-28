import React, { useEffect, useState } from 'react'
import GetFoodIntakeChecklist from '../Api/GetFoodIntakeChecklist'
import GroupTick from '../../../../assets/images/icons/Group Tick.svg'
import Cross from '../../../../assets/images/icons/multiply 4.png'
import UpcomingFood from '../../../../assets/images/icons/UpcomingFood.svg'
import BoxHeading from '../../../../Component/BoxHeading';
import NoDataFound from '../../../../assets/images/icons/No data-rafiki.svg';


export default function FoodIntakeChecklist(props) {
    let [getFoodIntakeChecklist, setFoodIntakeChecklist] = useState([])
    let [foodName, setFoodName] = useState([]);
    let [foodTime, setFoodTime] = useState([]);
    let [showImage, setShowImage] = useState(0)
    const formattedDate = new Date().toISOString().split('T')[0];
    let funFoodIntakeList = async () => {
        let foodIntakeCheclistCall = await GetFoodIntakeChecklist(props.patientdata.UhId, formattedDate)
        if (foodIntakeCheclistCall.status === 1) {
            foodName = []
            foodTime = []
            for (var i = 0; i < foodIntakeCheclistCall.foodIntakeList.length; i++) {
                foodName.push(
                    foodIntakeCheclistCall.foodIntakeList[i].foodName,
                );
                foodTime.push(
                    foodIntakeCheclistCall.foodIntakeList[i].foodEntryTime
                );
            }
            setFoodName([...new Set(foodName)])
            setFoodTime([...new Set(foodTime)])
            setFoodIntakeChecklist(foodIntakeCheclistCall.foodIntakeList)
        }
        else {
            setShowImage(1)
        }
    }
    useEffect(() => {
        funFoodIntakeList()
    }, [])

    return (
        <>
            <div className={`modal d-${props.ShowFoodIntakePopup === 0 ? 'none' : 'block'}`}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                            <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                        </span>                         */}
                        {/* <BoxHeading title={"Food Intake Checklist"} uhid={props.patientdata.UhId} patientName={props.patientdata.PntName} style={{ fontSize: '1.25 rem !important' }} /> */}                       
                   
                        <span className="closee" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>                        
                        <div className='p-profile'>
                         <div className='p-profile-h'>Food Intake Checklist</div>
                            <div className='p-profile-h'>
                             <div className='pname'><span>{props.patientdata.UhId}</span></div>
                            <div className='pname'>- {props.patientdata.PntName}</div> 
                         </div>
                       </div>

                         <div className="row">
                            <div className="col-12">
                            <div className='d-flex flex-wrap gap-4 mt-2 justify-content-end px-2'>
                                <div><img src={GroupTick}  alt=''></img> <i>Given</i></div>
                                <div><img src={Cross} alt='Cross'></img> <i>Pending</i></div>
                                <div><img src={UpcomingFood}/> <i>Upcoming</i></div>
                           </div>
                            </div>

                            <div className="col-12">
                            <div className='my-1 px-2'>                         

                                <div className='listdetailsct pac'>
                                    {/* <div className='listdetailsct-in'>
                                        <div className='listd-in showing'>Food Intake Checklist</div>
                                    </div> */}
                                    <div className='listdetailsct-in'>
                                        {/* <div className='gridsec-take'>Total Intake : <span>{''}</span></div> */}
                                        {/* <div className='gridsec-take'>Total Output : <span>900ml</span></div> */}
                                    </div>
                                </div>

                                <div className="med-table-section histry_view pdtable" style={{ height: '350px', position: 'relative' }}>                                  
                                        {showImage === 0 ? <table className='table-regular-second_'>
                                            <tbody>
                                                <tr>
                                                    <td className='fs-6 fw-bold'>Intake</td>

                                                    {foodTime && [...foodTime].map((list, index) => {
                                                        return (
                                                            <td className='text-center'><b>{list}</b></td>
                                                        )
                                                    })}
                                                </tr>

                                                {foodName && foodName.map((li) => {
                                                    return (
                                                        <tr key={li}>
                                                            <td className='fw-bold' style={{ color: 'white' }} >{li}</td>
                                                            {foodTime && foodTime.map((val) => {

                                                                const matchingData = getFoodIntakeChecklist.find((i) => i.foodName === li && i.foodEntryTime === val);

                                                                return (

                                                                    <td key={val} id={val} className='text-center' style={{ color: 'white' }} >
                                                                        {matchingData ? (
                                                                            <span >
                                                                                <img style={{ height: '20.25px', width: '20px' }}
                                                                                    src={matchingData.isGiven === 0 ? Cross : matchingData.isGiven === 1 ? GroupTick : UpcomingFood}
                                                                                    alt={matchingData.isGiven === 0 ? 'Missed' : matchingData.isGiven === 1 ? 'Given' : 'Upcoming'}
                                                                                />
                                                                            </span>
                                                                        ) : (
                                                                            <span>-</span>
                                                                        )}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table> :
                                            <img className='imageNoDataFound' src={NoDataFound} alt='' />}
                                    
                                </div>
                            
                        </div>

                            </div>
                         </div>

                       


                        
                    </div>
                </div>           </div>
        </>
    )
}
