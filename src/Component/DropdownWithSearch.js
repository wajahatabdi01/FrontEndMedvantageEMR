import React, { useEffect, useState } from 'react'
import Search from '../Code/Serach'
// import AutoComplete from './AutoComplete'

export default function DropdownWithSearch(props) {

    let [dataList, setdataList] = useState(props.list)
    let [showList, setShowList] = useState(0)
    let [dropdownName, setDropdownName] = useState("")


    let handleShowLsit = () => {

        document.onclick = function (e) {
            if (e.target.id.toLowerCase().localeCompare('dropdownId' + props.displayName.toLowerCase()) || e.target.id.toLowerCase().localeCompare('dropdownSpanId' + props.displayName.toLowerCase()) || e.target.id.toLowerCase().localeCompare('dropdownarrowId' + props.displayName.toLowerCase())) {
                setShowList(showList === 1 ? 0 : 1)

            }
            else {
                setShowList(0)
            }


        };
        setdataList(props.list)

    }
    let handleSearch = (e) => {

        let response = Search(props.list, e.target.value)
        if (response.length != 0) {
            setdataList(response)
        }
        else {
            setdataList([])
        }
    }
    let handleClick = (e, value, name, defaultName, allValue) => {


        props.getvalue({ target: { "value": value, "name": name, "selectedName": defaultName, "allValue":allValue } })
        setDropdownName(defaultName)
        document.onclick = function (e) {
            if (e.target.id.toLowerCase().localeCompare('aaa' + props.displayName.toLowerCase()) || e.target.id.toLowerCase().localeCompare('aaa' + props.displayName.toLowerCase()) || e.target.id.toLowerCase().localeCompare('aaa' + props.displayName.toLowerCase())) {
                setShowList(showList === 1 ? 0 : 1)
            }
            else {
                setShowList(0)
            }
        };


    }

    let handleClose = () => {
        document.onclick = function (e) {
            if (e.target.id.toLowerCase().localeCompare('dropdownId' + props.displayName.toLowerCase()) || e.target.id.toLowerCase().localeCompare('dropdownSpanId' + props.displayName.toLowerCase()) || e.target.id.toLowerCase().localeCompare('dropdownarrowId' + props.displayName.toLowerCase())) {
                setShowList(showList === 1 ? 0 : 1)
            }
            else {
                setShowList(0)
            }


        };
    }
    // document.getElementById("dropdown").addEventListener("keydown", ()=>{

    // })

    useEffect(() => {
        setdataList(props.list)
        if (props.clear === 1) {
            setDropdownName("")
            props.clearFun(0)

        }
        else if (props.editdata.length !== 0) {
            setDropdownName(props.editdata)
        }




    }, [props])







    return (
        <div className="dropdown" id="dropdown" >
            <button onClick={handleShowLsit} className="dropbtn ps-2 pe-2" id={`dropdownId${props.displayName}`} >
                <span id={`dropdownSpanId${props.displayName}`}>{dropdownName != "" ? dropdownName : props.defaulNname}</span>
                <i id={`dropdownarrowId${props.displayName}`} className="bi bi-chevron-down"></i>
            </button>
            {showList === 1 ?
                <div id="myDropdown" className="dropdown-content">
                    <input type="text" placeholder="Search.." id="myInput" onChange={handleSearch} />
                    {/* <AutoComplete suggestions={dataList} searchKey="departmentName" /> */}

                    <ul id="searchdrop" className='wrap' style={{ height: "200px", background: '#fff', listStyleType: "none", margin: 0, paddingLeft: "10px",cursor:'pointer' }}>
                        <li className='selected'></li>
                        {dataList && dataList.map((value, index) => {
                            return (
                                <li id="aaa" onClick={(e) => { handleClick(e, value[props.valueName], props.name, value[props.displayName], value) }}>{value[props.displayName]}</li>
                            )
                        })}
                    </ul>
                </div>
                : ""}
            {showList === 1 ?
                <div className='full-screen-div' onClick={handleClose}></div> : ""
            }

        </div>
    )
}
