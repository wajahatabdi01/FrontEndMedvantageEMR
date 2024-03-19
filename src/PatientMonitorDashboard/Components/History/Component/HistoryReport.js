import React, { useEffect, useState } from 'react'
import BoxHeading from '../../BoxHeading';
import GetFamilyHistoryReport from '../Api/GetFamilyHistoryReport';
import AlertToster from '../../../../Component/AlertToster';
// import GetMedicationDetails from '../Api/GetMedicationDetails';
// // import BoxHeading from '../../BoxHeading';
// import BoxHeading from '../../../../Component/BoxHeading';
// import UpcomingFood from '../../../../assets/images/icons/UpcomingFood.svg'

export default function HistoryReport(props) {
    let [familyHistory, setFamilyHistory] = useState([]);
    let [date, setDate] = useState('');
    let [showMessage, setShowMessage] = useState(0)
    let [showAlertToster, setShowAlertToster] = useState(0)
    const getGetFamilyHistoryDetails = async ()=>{
     
        let response = await GetFamilyHistoryReport(props.patientdata.UhId);
     
        if(response.status ===  1){
            setFamilyHistory(response.responseValue)
        }
        else{
            setShowAlertToster(1)
            setShowMessage(response.responseValue)
        }
    }
    useEffect(() => {
        getGetFamilyHistoryDetails();
    }, []);
    return (
        <>

            
                    <div className='mt-1_ ps-5_ pe-4_ row_'>
                        <div className='gridb'>
                            <div className="pdtable" style={{maxHeight:'350px', overflowY:'auto'}}>
                                <table className='med-table_ border_ striped_'>
                                    <thead>
                                        <tr>
                                            <th className='text-center'>#</th>
                                            <th>History</th>
                                            <th>Relation</th>
                                            <th>Date</th>
                                            {/* <th>Vaccine</th>
                                            <th>Disease</th> */}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {familyHistory && familyHistory.map((list,ind)=>{
                                            return(
                                                <tr>
                                                    <td>{ind+1}</td>
                                                    <td >{list.parameterName}</td>
                                                    <td>
                                                        {
                                                           JSON.parse(list.jsonResult).map((val,i)=>{
                                                            return(
                                                                <span>{i !==0 ? ',':''}{val.Relation}</span>
                                                            )
                                                           })
                                                        }
                                                    </td>
                                                    <td>{list.dateOfDiseaseOrVaccine}</td>
                                                    {/* <td>{list.vaccineName}</td>
                                                    <td >{list.diseaseName ? list.diseaseName :''}</td> */}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    {/* <tbody>
                                            {
                                                medicationChecklistData && medicationChecklistData.map((list, index) => {

                                                    return (
                                                        <tr>
                                                            <td className='text-center' style={{backgroundColor:'white'}}>{list.drugName}</td>
                                                            
                                                            { list.medicationDetails !== null ?
                                                                JSON.parse(list.medicationDetails).map((val, ind) => {
                                                                if (val.durationType === "Morning") {
                                                                    return (
                                                                        <td className='text-center' style={{backgroundColor:'white'}}>
                                                                            {val.icon === "check" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                val.icon === "upcoming" ? <img src={UpcomingFood} />:
                                                                                    val.icon === "late" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                        val.icon === "exclamation" ? <i className="bi bi-x-circle-fill text-danger fs-6"></i> : ''} </td>
                                                                    )
                                                                }
                                                                if (val.durationType === "After Noon") {
                                                                    return (
                                                                        <td className='text-center' style={{backgroundColor:'white'}}>
                                                                            {val.icon === "check" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                val.icon === "upcoming" ? <img src={UpcomingFood} /> :
                                                                                    val.icon === "late" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                        val.icon === "exclamation" ? <i className="bi bi-x-circle-fill text-danger fs-6"></i> : ''} </td>
                                                                    )
                                                                }
                                                                if (val.durationType === "Evening") {
                                                                    return (
                                                                        <td className='text-center' style={{backgroundColor:'white'}}>
                                                                            {val.icon === "check" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                val.icon === "upcoming" ? <img src={UpcomingFood} /> :
                                                                                    val.icon === "late" ?<i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                        val.icon === "exclamation" ? <i className="bi bi-x-circle-fill text-danger fs-6"></i> : ''} </td>
                                                                    )
                                                                }
                                                                if (val.durationType === "Night") {
                                                                    return (
                                                                        <td className='text-center' style={{backgroundColor:'white'}}>
                                                                            {val.icon === "check" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                val.icon === "upcoming" ? <img src={UpcomingFood} /> :
                                                                                    val.icon === "late" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                        val.icon === "exclamation" ? <i className="bi bi-x-circle-fill text-danger fs-6"></i> : ''} </td>
                                                                    )
                                                                }
                                                                if (val.durationType === 1) {
                                                                    return (
                                                                        <td className='text-center' style={{backgroundColor:'white'}}>-</td>

                                                                    )
                                                                }

                                                            }):''}
                                                        </tr>
                                                    )


                                                })
                                            }
                                        </tbody> */}

                                </table>

                            </div>

                        </div>
                    </div>
                
            {
                showAlertToster === 1 ?
               <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
            }
        </>
    )
}
