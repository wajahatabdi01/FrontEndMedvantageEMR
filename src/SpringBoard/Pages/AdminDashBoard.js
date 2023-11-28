import React, { useState, useEffect } from 'react'
import GetCurrentDatePendingBacklog from '../API/AdminDashBoard/GetAdminDashBoard'
import TableContainer from '../../Component/TableContainer'
import BoxContainer from '../../Component/BoxContainer'
import Heading from '../../Component/Heading'
import GetUserProductivity from '../API/AdminDashBoard/GetUserProductivity'
import GetPlanedCloseTask from '../API/AdminDashBoard/GetPlanedCloseTask'
import GetAllStory from '../API/AdminDashBoard/GetAllStory'

export default function AdminDashBoard() {

    let [getCurrentDatePendingBacklogList, setCurrentDatePendingBacklogList] = useState([])
    let [getDeveloperProductvityList, setDeveloperProductvityList] = useState([])
    let [getPlanedCloseTask, setPlanedCloseTask] = useState([])
    let [getAllStoryList, setAllStoryList] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [searchInputstorylist, setSearchInputstorylist] = useState('');
    const [searchInputProjectbacklog, setSearchInputProjectbacklog] = useState('');

    let funGetCurrentDatePendingBacklog = async () => {
        let getResult = await GetCurrentDatePendingBacklog(window.userId)
        setCurrentDatePendingBacklogList(getResult.responseValue);
    }
    let funGetDeveloperProductivity = async () => {
        let getResult = await GetUserProductivity(window.userId)

        setDeveloperProductvityList(getResult.responseValue);
    }

    let funGetProjectDateBacklog = async () => {
        let getResult = await GetPlanedCloseTask(window.userId)
        setPlanedCloseTask(getResult.responseValue);
    }

    let funAllStory = async () => {
        let getResult = await GetAllStory(window.userId)
        console.log('Dashboard Storylist',getResult)
        setAllStoryList(getResult.responseValue);
    }
    // function reformatDateString(s) {
    //     var b = s.split(/\D/);
    //     var day = parseInt(b[2], 10).toString();
    //     var month = parseInt(b[1], 10).toString();
    //     var year = b[0];
    //     return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    // };

    function reformatDateString(s) {
        if (typeof s === 'string' && s.trim() !== '') {
            var b = s.split(/\D/);
            var day = parseInt(b[2], 10).toString();
            var month = parseInt(b[1], 10).toString();
            var year = b[0];
            return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
        }
        else {
            return ''; // Return an empty string or handle the error as needed
        }
    }
    let handleOnChangeCurrentDateBacklog = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBoxCurrentDateBacklog') {
            setSearchInput(value)
        }
    }
    let handleOnChangeCurrentStoryList = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBoxStoryList') {
            setSearchInputstorylist(value)
        }
    }
    let handleOnChangeProjectbacklog = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBoxProjectbacklog') {
            setSearchInputProjectbacklog(value)
        }
    }
    useEffect(() => {
        funGetDeveloperProductivity()
        funGetCurrentDatePendingBacklog()
        funGetProjectDateBacklog()
        funAllStory()
    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-12 maindashb">
                            <Heading text='DashBoard' />
                        </div>

                        <div className="col-md-5 col-sm-12 mt-3 maindashb1" >
                            <div className='backlogStatus'>
                                <Heading text='Developer Productivity' />
                                <div className='bacl_ dashBoardProgressBar' style={{ height: '45vh', overflow: 'auto' }}>
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
                                                    <div class="progress-bar" style={progressBarStyle}>{val.productivity + ' %'}</div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7 col-sm-12 mt-3 maindashb1">
                            <div className='backlogStatus med-table-section' style={{ height: '50vh' }}>
                                {/* <Heading text='Current Date Backlog Status' /> */}
                                <div className='handlser'>
                                    <Heading text="Current Date Backlog Status" />
                                    <div style={{ position: 'relative' }}>
                                        <input value={searchInput} onChange={handleOnChangeCurrentDateBacklog} name="searchBoxCurrentDateBacklog" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                        <span className="tblsericon"><i class="fas fa-search"></i></span>
                                    </div>
                                </div>
                                {/* <BoxContainer> */}
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Developer</th>
                                            <th>Project</th>
                                            <th>Sprint Description</th>
                                            <th>Assign Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCurrentDatePendingBacklogList && getCurrentDatePendingBacklogList.filter((val) => `${val.name} ${val.projectName} ${val.sprintBacklogText} ${val.estimatedHour} ${reformatDateString(val.assignDate)} ${val.statusText} `.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.name}</td>
                                                    <td>{val.projectName}</td>
                                                    <td>{val.sprintBacklogText} ({val.estimatedHour})</td>
                                                    <td>{reformatDateString(val.assignDate)}</td>
                                                    <td>{val.statusText}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                                {/* </BoxContainer> */}
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ display: "none1" }}>
                        <div className="col-md-5 col-sm-12 mt-3 maindashb1">
                            <div className='backlogStatus med-table-section' style={{ height: '42vh' }}>
                                {/* <Heading text='Story List' /> */}
                                <div className='handlser'>
                                    <Heading text="Story List" />
                                    <div style={{ position: 'relative' }}>
                                        <input value={searchInputstorylist} onChange={handleOnChangeCurrentStoryList} name="searchBoxStoryList" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                        <span className="tblsericon"><i class="fas fa-search"></i></span>
                                    </div>
                                </div>

                                {/* <BoxContainer> */}
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Project</th>
                                            <th>Story</th>
                                            <th>Created By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getAllStoryList && getAllStoryList.filter((val) => `${val.projectName} ${val.wantAbleTo + '' + val.soThat} ${val.name} `.toLowerCase().includes(searchInputstorylist.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.projectName}</td>
                                                    {/* <td>{val.projectType}</td> */}
                                                    <td>{val.wantAbleTo + ' ' + val.soThat}</td>
                                                    <td>{val.name}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                                {/* </BoxContainer> */}
                            </div>

                        </div>
                        <div className="col-md-4 col-sm-12 mt-3 maindashb1">
                            <div className='backlogStatus med-table-section' style={{ height: '42vh' }}>
                                {/* <Heading text='Project Backlog Status' /> */}
                                <div className='handlser'>
                                    <Heading text="Project Backlog Status" />
                                    <div style={{ position: 'relative' }}>
                                        <input value={searchInputProjectbacklog} onChange={handleOnChangeProjectbacklog} name="searchBoxProjectbacklog" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                        <span className="tblsericon"><i class="fas fa-search"></i></span>
                                    </div>
                                </div>

                                {/* <BoxContainer> */}
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Project Name</th>
                                            <th>Planned task</th>
                                            <th>Closed Task</th>
                                            <th>Remaining Task</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getPlanedCloseTask && getPlanedCloseTask.filter((val) => `${val.projectName} `.toLowerCase().includes(searchInputProjectbacklog.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.projectName}</td>
                                                    <td>{val.totalTask}</td>
                                                    <td>{val.completedTask}</td>
                                                    <td>{val.holdProgessTask + val.notStartTask}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                                {/* </BoxContainer> */}
                            </div>

                        </div>
                        <div className="col-md-3 col-sm-12 mt-3 maindashb1">
                            <div className='backlogStatus med-table-section' style={{ height: '42vh' }}>
                                <Heading text='Notification' />
                                {/* <BoxContainer> */}
                                <TableContainer>

                                </TableContainer>
                                {/* </BoxContainer> */}
                            </div>

                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}
