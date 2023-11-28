import React, { useState, useEffect } from 'react'
import TableContainer from '../../Components/TableContainer'
import BoxContainer from '../../Components/BoxContainer'
import Heading from '../../Components/Heading'
import GetCurrentDateBacklog from '../API/TLDasbBoard/GetCurrentDatebacklog'
import GetProjectBacklogStatus from '../API/TLDasbBoard/GetProjectBacklogStatus'
import GetDeveloperProductivity from '../API/TLDasbBoard/GetDeveloperProductivity'




import GetCurrentDatePendingBacklog from '../API/AdminDashBoard/GetAdminDashBoard'
import GetUserProductivity from '../API/AdminDashBoard/GetUserProductivity'
import GetPlanedCloseTask from '../API/AdminDashBoard/GetPlanedCloseTask'
import GetAllStory from '../API/AdminDashBoard/GetAllStory'
//import ProgressBar from './components/ProgressBar';

export default function AdminDashBoard() {

    let [getCurrentDateBacklogList, setCurrentDateBacklogList] = useState([])
    let [getProjectBacklogList, setProjectBacklogList] = useState([])
    let [getDeveloperProductvityList, setDeveloperProductvityList] = useState([])
    //let [getLogingUserID, setLogingUserID] = useState('[]')
    //setLogingUserID=134//window.userId;

    let funGetCurrentDateBacklog = async () => {
        let getResult = await GetCurrentDatePendingBacklog(window.userId)
        setCurrentDateBacklogList(getResult.responseValue);
    }
    let funGetProjectDateBacklog = async () => {
        let getResult = await GetPlanedCloseTask(window.userId)
        setProjectBacklogList(getResult.responseValue);
    }
    let funGetDeveloperProductivity = async () => {
        let getResult = await GetUserProductivity(window.userId)
        setDeveloperProductvityList(getResult.responseValue);
    }
    useEffect(() => {
        funGetCurrentDateBacklog()
        funGetProjectDateBacklog()
        funGetDeveloperProductivity()
    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text='DashBoard' />
                        </div>

                        <div className="col-5 mt-3" >
                            <div className='backlogStatus' style={{ background: '#fff', height: '43vh' }}>
                                <Heading text='Developer Productivity' />

                                {getDeveloperProductvityList && getDeveloperProductvityList.map((val, ind) => {
                                    const progressBarStyle = {
                                        width: `${val.productivity}%`
                                      };
                                   return (
                                        <>
                                            <div className='progTop'>
                                        <p className='devName'>{val.name}</p>
                                    </div>
                                         <div class="progress mt-3" role="progressbar" >
                                         <div class="progress-bar" style={progressBarStyle}>{val.productivity+' %'}</div>
                                         </div>
                                        </>

                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-7 mt-3">
                            <div className='backlogStatus' style={{ background: '#fff', height: '43vh' }}>
                                <Heading text='Current Date Backlog Status' />
                                <BoxContainer>
                                    <TableContainer>
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                                <th>Developer</th>
                                                <th>Project</th>
                                                <th>Sprint Description</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getCurrentDateBacklogList && getCurrentDateBacklogList.map((val, ind) => {
                                                return (
                                                    <tr key={val.id}>
                                                        <td className="text-center">{ind + 1}</td>
                                                        <td>{val.name}</td>
                                                        <td>{val.projectName}</td>
                                                        <td>{val.sprintBacklogText} ({val.estimatedHour})</td>
                                                        <td>{val.statusText}</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </TableContainer>
                                </BoxContainer>
                            </div>

                        </div>

                    </div>
                    <div className="row">

                        <div className="col-5 mt-3">
                            <div className='backlogStatus' style={{ background: '#fff', height: '42vh' }}>
                                <Heading text='Project Backlog Status' />
                                <BoxContainer>
                                    <TableContainer>
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                                <th>Project Name</th>
                                                <th>Planned task</th>
                                                <th>Cloased Task</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getProjectBacklogList && getProjectBacklogList.map((val, ind) => {
                                                return (
                                                    <tr key={val.id}>
                                                        <td className="text-center">{ind + 1}</td>
                                                        <td>{val.projectName}</td>
                                                        <td>{val.plannedTask}</td>
                                                        <td>{val.closedTask}</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </TableContainer>
                                </BoxContainer>
                            </div>

                        </div>
                        <div className="col-7 mt-3">
                            <div className='backlogStatus' style={{ background: '#fff', height: '42vh' }}>
                                <Heading text='Notification' />
                                <BoxContainer>
                                    <TableContainer>

                                    </TableContainer>
                                </BoxContainer>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
