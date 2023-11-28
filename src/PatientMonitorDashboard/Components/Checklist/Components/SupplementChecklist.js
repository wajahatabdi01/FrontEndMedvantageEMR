import React, { useEffect, useState } from 'react';
import GetSupplementChecklistDetails from '../Api/GetSupplementChecklistDetails';
import BoxHeading from '../../../../Component/BoxHeading';
import GroupTick from '../../../../assets/images/icons/Group Tick.svg'
import Cross from '../../../../assets/images/icons/multiply 4.png'
import UpcomingSupplement from '../../../../assets/images/icons/UpcomingFood.svg';
import NoDataFound from '../../../../assets/images/icons/No data-rafiki.svg';

export default function SupplementChecklist(props) {

    let [supplementName, setSupplementName] = useState([]);
    let [supplementTime, setSupplementTime] = useState([]);
    let [supplementData, setSupplementData] = useState([]);
    let [showImage, setShowImage] = useState(0)

    const getData = async () => {
        const formattedDate = new Date().toISOString().split('T')[0];
        const getSupplementResp = await GetSupplementChecklistDetails(props.patientdata.UhId, formattedDate);

        if (getSupplementResp.status === 1) {
            supplementName = [];
            supplementTime = [];
            for (var i = 0; i < getSupplementResp.foodIntakeList.length; i++) {
                supplementName.push(
                    getSupplementResp.foodIntakeList[i].supplimentName

                );
                supplementTime.push(
                    getSupplementResp.foodIntakeList[i].medicationEntryTime

                );
            }
            setSupplementName([...new Set(supplementName)]);
            setSupplementTime([...new Set(supplementTime)]);

            setSupplementData(getSupplementResp.foodIntakeList);
        }
        else {
            setShowImage(1)

        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className={`modal d-${props.ShowSupplimentPopup === 0 ? 'none' : 'block'}`}>
                <div className="modal-dialog modal-dialog-centered_ modal-lg">
                    <div className="modal-content">
                        {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                            <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                        </span> */}
                        {/* <BoxHeading name="" textcolor="#7E7E7E" patientBool={true} patientName={props.patientdata.PntName} patientUhid={props.patientdata.UhId} /> */}
                        {/* <BoxHeading title={"Supplement Checklist"} uhid={props.patientdata.UhId} patientName={props.patientdata.PntName} /> */}


                        <span className="closee" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>                        
                        <div className='p-profile'>
                         <div className='p-profile-h'>Supplement Checklist</div>
                            <div className='p-profile-h'>
                             <div className='pname'><span>{props.patientdata.UhId}</span></div>
                            <div className='pname'>- {props.patientdata.PntName}</div> 
                         </div>
                        </div>

                       <div className="row">
                        <div className="col-12">
                        <div className='d-flex flex-wrap gap-4 mt-2 justify-content-end px-2'>
                            <div><img src={GroupTick} alt='GroupTick'></img> <i>Given</i></div>
                            <div><img src={Cross} alt='Cross'></img> <i>Pending</i></div>
                            <div><img src={UpcomingSupplement} alt='UpcomingSupplement'></img> <i>Upcoming</i></div>
                        </div>
                        </div>
                        <div className="col-12">
                        <div className='mt-1 px-2'>                            
                                {/* <div className='listdetailsct pac'>
                                    <div className='listdetailsct-in'>
                                        <div className='listd-in showing'>Supplement CheckList</div>
                                    </div>
                                </div> */}

                                <div className="med-table-section histry_view_ pdtable" style={{ height: '350px', position: 'relative' }}>                                    
                                        {showImage === 0 ? <table className='table-regular-second_'>
                                            <tbody>
                                                <tr>
                                                    <td className='fs-6 fw-bold'>Supplement</td>
                                                    {supplementTime && [...supplementTime].map((list, index) => {
                                                        return (
                                                            <td className='text-center'><b>{list}</b></td>
                                                        )
                                                    })}
                                                </tr>
                                                {/* {supplementName && supplementName.map((li) => {
                                                    return (
                                                    <tr>
                                                        <td>{li}</td>
                                                        {supplementTime && supplementTime.map((val) => {
                                                            let hasMatch = false;
                                                            supplementData && supplementData.forEach((i) => {
                                                                if (i.supplimentName === li && i.medicationEntryTime === val) {
                                                                    hasMatch = true;
                                                                }
                                                            });
                                                            return (
                                                                <td id={val}>
                                                                    {hasMatch ? <span><img src={i.isGiven === 0 ? 'missed': i.isGiven === 1 ? 'given' : 'upcoming'}/></span> : <span>-</span>}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                    );
                                                    })} */}
                                                {supplementName && supplementName.map((li) => {
                                                    return (
                                                        <tr key={li}>
                                                            <td>{li}</td>
                                                            {supplementTime && supplementTime.map((val) => {
                                                                const matchingData = supplementData.find((i) => i.supplimentName === li && i.medicationEntryTime === val);
                                                                return (
                                                                    <td key={val} id={val} className='text-center'>
                                                                        {matchingData ? (
                                                                            <span>
                                                                                <img
                                                                                    src={matchingData.isGiven === 0 ? Cross : matchingData.isGiven === 1 ? GroupTick : UpcomingSupplement}
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
                </div>
            </div>
        </>
    )
}
