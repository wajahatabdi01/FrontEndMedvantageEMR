import React, { useEffect, useState } from 'react'
import GetMedicalHistory from '../Api/GetMedicalHistory';
import AlertToster from '../../../../Component/AlertToster';
// import exportfile from '../../BloodBank/images/exportfile.svg'
// import printer from '../../BloodBank/images/printer.svg'


export default function MedicalHistoryReportForDashboard(props) {
    let [medicalHistory, setMedicalHistory] = useState([]);
    let [date, setDate] = useState('');
    let [showMessage, setShowMessage] = useState(0)
    let [showAlertToster, setShowAlertToster] = useState(0)
    const getGetMedicalHistoryDetails = async () => {
       
        let response = await GetMedicalHistory(props.patientdata.UhId);
       
        if (response.status === 1) {
            setMedicalHistory(response.responseValue.table)
        }
        else {
            setShowAlertToster(1)
            setShowMessage(response.table)
        }
    }
    useEffect(() => {
        getGetMedicalHistoryDetails();
    }, []);

   
    return (
        <>


            <div className='mt-1_ ps-5_ pe-4_ row_'>
                <div className='gridb'>
                    <div className="pdtable" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    <table className='med-table_ border_ striped_'>
                                <thead>
                                    <tr>
                                        <th className='text-center' style={{ width: '3%' }}>#</th>
                                        <th>History</th>
                                        <th>Condition</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>


                                <tbody>

                                    {medicalHistory && medicalHistory.map((list, ind) => {
                                        return (
                                            <tr>
                                                <td >{ind + 1}</td>
                                                <td >{list.parameterName}</td>
                                                <td >
                                                    {
                                                        JSON.parse(list.jsonResult).map((val, i) => {
                                                            return (
                                                                <span>{i !== 0 ? ',' : ''}{val.Condition}</span>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td >{list.historyDate}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>


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
