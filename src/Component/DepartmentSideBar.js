import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import OffcanvasLogo from '../../../assets/images/Navbar/offcanvas-logo.png'
// import MaskGroup from "../../../assets/images/Navbar/MaskGroup.png"
import searcIcon from "../assets/images/Navbar/search.svg"
import { FindByQuery } from '../Code/Serach'

export default function DepartmentSideBar(props) {

    let [departmentData, setDepartmentData] = useState()
    let [departmentDataTemp, setDepartmentDataTemp] = useState()
    let [loder, setLoder] = useState(1)
    let [clearTextBox, setClearTextBox] = useState(0)

    let getData = async () => {
        // let response = await GetDepartmentByHead(props.wardId)
        if (props.extDepartmentData.length !== 0) {
            setDepartmentData(props.extDepartmentData)
            setDepartmentDataTemp(props.extDepartmentData)
            setLoder(0)
        }
    }
    let handleSearch = (e) => {
       
        if(clearTextBox !== 0)
        {
            let result = FindByQuery(departmentData, e.target.value, "departmentName")
            if (e.target.value !== "") {
                if (result.length !== 0) {
                    setDepartmentDataTemp(result)
                }
                else {
                    setDepartmentDataTemp([])
                }
            }
            else {
                setDepartmentDataTemp(departmentData)
            }
        }
        else{
            document.getElementById("searchDep").value = ""
            setClearTextBox(1)
        }
       
    }

    let handleDepartment = (departmentId, departmentName) => {
        let wardId = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
        let wardname = JSON.parse(window.sessionStorage.getItem("activePage")).wardName
        props.setShowDepart(0)
        window.sessionStorage.removeItem("activePage")
        window.sessionStorage.setItem("activePage", JSON.stringify({ "WardId": wardId, "wardName": wardname, "DepartmentId": departmentId, "departmentName": departmentName }))

    }
    useEffect(() => {       
        if (props.extDepartmentData.length !== 0) {
            getData()           
        }

    }, [props.extDepartmentData])
    return (
        <div className={`${props.extDepartmentData.length !== 0 ? 'offcanvas show' : "offcanvas"}   offcanvas-end p-0 m-0`} style={{ width: "400px" }} data-bs-scroll="true" data-bs-backdrop="static" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header d-flex justify-content-between gap-5 p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                <h5 className="offcanvas-title text-white" id="offcanvasScrollingLabel" >Select Department</h5>
                <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px",  position:"relative"}} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { props.extsetDepartmentData([]);  window.sessionStorage.removeItem("departmentmenu") }}><i className='fa fa-close ' style={{position:"absolute", paddingRight:"3px"}}></i></div>
            </div>
            <div className="offcanvas-body ps-4 pe-3" >

                <div className='d-flex flex-column gap-1  pt-2 gap-3'>
                    <div className='d-flex flex-column searchbar gap-1  pt-2 mb-3'>
                        <input type='text' className='ps-3 pe-5 pb-2 pt-2 serchbox' autoComplete='off' id="searchDep" placeholder='Search....' onChange={handleSearch} />
                        <img src={searcIcon} className='rightsidebarsearchicon' />
                    </div>

                    {
                        departmentDataTemp && departmentDataTemp.map((val, ind) => {
                            return (
                                <div className="position-relative">
                                    {props.getHeadName.toString().toLowerCase().localeCompare("opd") === 0 ?
                                        <Link to="/opdpatientlist/" className='ps-4 p-2 departmentList d-flex flex-row gap-3 pointer' onClick={() => { handleDepartment(val.departmentId, val.departmentName) }}><label>{val.departmentName}</label></Link>
                                        :
                                        props.getHeadName.toString().toLowerCase().localeCompare("dietetics") === 0 ?
                                            <Link to="/dieteticsPatientList/" className='ps-4 p-2 departmentList d-flex flex-row gap-3 pointer' onClick={() => { handleDepartment(val.departmentId, val.departmentName) }}><label>{val.departmentName}</label></Link>
                                            :
                                            <Link to="/ipdpatientlist/" className='ps-4 p-2 departmentList d-flex flex-row gap-3 pointer' onClick={() => { handleDepartment(val.departmentId, val.departmentName) }}><label>{val.departmentName}</label></Link>

                                    }

                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
