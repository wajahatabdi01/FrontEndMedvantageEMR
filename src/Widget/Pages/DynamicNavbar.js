import React, { useState } from 'react'

export default function DynamicNavbar(props) {

    let [showSelectedGrid, setShowSelectedGrid] = useState("Select Display")

    let handleColumn = (number, gridvalue) => {
        setShowSelectedGrid(gridvalue)
        let div = Math.round(100 / number)
        let g = div + "% "
        let autoData = g.repeat(number)
        console.log("change", autoData)
        if (number === 1) {
            document.getElementById("dynamicBoxContainer").style.gridTemplateColumns = "100%";
        }
        else {
            document.getElementById("dynamicBoxContainer").style.gridTemplateColumns = "" + autoData;

        }
    }



    // ############## active dropdown list
    let getDrpMenuLists = document.querySelectorAll('.dropdown-menu.dynamicDrp .dropdown-item');
    for (const getDrpMenuList of getDrpMenuLists) {
        getDrpMenuList.addEventListener("click", function () {
            // alert('Hello');                 
            resetDrpMenuList();
            getDrpMenuList.classList.add("active");
        });
    }

    function resetDrpMenuList() {
        for (const getDrpMenuList of getDrpMenuLists) {
            getDrpMenuList.classList.remove("active");
        }
    }

    return (
        <div className="col-12 p-0">
            <div className="med-box">
                <div className="d-flex justify-content-between align-items-center px-2 mt-2">
                    <div className="title" style={{ fontSize: '25px' }}>Admin Dashboard</div>
                    <div className="d-flex flex-wrap gap-1">
                        {/* <button type="button" className="btn btn-outline-primary_ btn-primary btn-sm" onClick={handleColumn}><i className="bi bi-plus"></i> Select Column</button> */}
                        {/* <div>Show Date Range</div> */}
                        <button type="button" className="btn btn-success" title='Refesh' onClick={() => { window.location.reload() }}><i className="fa-solid fa-rotate"></i></button>

                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <div className="btn-group" role="group">
                                <button type="button " className="btn btn-secondary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                                    {showSelectedGrid}
                                </button>
                                <ul className="dropdown-menu dynamicDrp">
                                    <li><a href='#' className="dropdown-item" name="1x3" onClick={(e) => { handleColumn(1, "1x3") }}>1x3 </a></li>
                                    <li><a href='#' className="dropdown-item" name="2x3" onClick={(e) => { handleColumn(2, "2x3") }}>2x3 </a></li>
                                    <li><a href='#' className="dropdown-item" name="3x3" onClick={(e) => { handleColumn(3, "3x3") }}>3x3</a></li>
                                    <li><a href='#' className="dropdown-item" name="4x3" onClick={(e) => { handleColumn(4, "4x3") }}>4x3</a></li>
                                </ul>
                            </div>
                        </div>



                        {/* <button type="button" className="btn btn-outline-primary_ btn-primary btn-sm"><i className="bi bi-plus"></i> Component</button> */}

                        {/* <button type="button" className="btn btn btn-secondary btn-sm"><i className="bi bi-plus"></i> Filter</button> */}
                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <div className="btn-group" role="group">
                                <button type="button " className="btn btn-secondary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                                    {props.showSelectedFilter}
                                </button>
                                <ul className="dropdown-menu dynamicDrp">
                                    <li><a className="dropdown-item" href="#" onClick={() => { props.handleFilter("1"); props.setShowSelectedFilter("Today")}}>Today</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => { props.handleFilter("2"); props.setShowSelectedFilter("Yesterday")}}>Yesterday</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => { props.handleFilter("3"); props.setShowSelectedFilter("Last Month")}}>Last Month</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => { props.handleFilter("4"); props.setShowSelectedFilter("Last 1 Year")}}>Last 1 Year</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* <button type="button" className="btn btn-outline-dark btn-sm"><i className="bi bi-arrow-90deg-left"></i></button>

                        <button type="button" className="btn btn-outline-dark btn-sm"><i className="bi bi-arrow-90deg-right"></i></button>

                        <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalSetting"><i className="bi bi-gear-fill"></i></button> */}


                        {/* <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-success dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                                    Save
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                    <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                </ul>
                            </div>
                        </div> */}

                        {/* <button type="button" className="btn btn-outline-success btn-sm">Done</button> */}
                    </div>
                </div>

            </div>

        </div>
    )
}
