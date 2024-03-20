import React, { useEffect } from "react";
import OffcanvasLogo from "../assets/images/Navbar/offcanvas-logo.png";
import MaskGroup from "../assets/images/Navbar/MaskGroup.png";
// import { useState } from "react";
import { Link } from "react-router-dom";
import shoppingBag from "../assets/images/icons/shoppingBag.svg";
import unitIcon from "../assets/images/icons/unitIcon.svg";
import purchaseIcon from "../assets/images/icons/purchaseIcon.svg";
import saleIcon from "../assets/images/icons/saleIcon.svg";
export default function PharmacyPurchaseSideBar() {
  useEffect(() => {
    let getSideCollapseLinks = document.getElementsByClassName("sidebar-link");
    for (const getSideCollapseLink of getSideCollapseLinks) {
      getSideCollapseLink.addEventListener("click", function () {
        resetPreLink();
        getSideCollapseLink.classList.add("active");
      });
    }

    function resetPreLink() {
      for (const getSideCollapseLink of getSideCollapseLinks) {
        getSideCollapseLink.classList.remove("active");
      }
    }

    let getCustomeCollapseInnerLinks = document.querySelectorAll(
      ".custome-collapse a.nav-link"
    );
    for (const getCustomeCollapseInnerLink of getCustomeCollapseInnerLinks) {
      getCustomeCollapseInnerLink.addEventListener("click", function () {
        resetPregetCustomeCollapseInnerLink();
        getCustomeCollapseInnerLink.classList.add("active");
      });
    }

    function resetPregetCustomeCollapseInnerLink() {
      for (const getCustomeCollapseInnerLink of getCustomeCollapseInnerLinks) {
        getCustomeCollapseInnerLink.classList.remove("active");
      }
    }
  });

  return (
    // < !--offCanvas navbar-- >
    <div
      className="offcanvas offcanvas-start sidebar-nav shadow-sm rounded_"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header offcanvas-header-custome">
        <div className="offcanvas-logo-username">
          <div className="offcanvas-logoBorderBottom">
            <img src={MaskGroup} className="logoLeft" alt=""/>
            <div className="offcanvas-logo">
              <Link to="/dashboard/">
                {" "}
                <img src={OffcanvasLogo} className="OffcanvasLogo" alt=""/>{" "}
              </Link>
            </div>
          </div>
          <h5
            className="offcanvas-title text-uppercase user-name"
            id="offcanvasExampleLabel"
            style={{ visibility: "hidden" }}
          >
            Md Ijaharuddin Khan
          </h5>
        </div>

        <button
          type="button"
          className="btn-close btn-offcanvas-close btn-closeCustome"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          X
        </button>
      </div>

      <div className="offcanvas-body p-0">
        <nav className="navbar">
          <ul className="navbar-nav side-ul-list">
            {/* <!-- <li><div className="text-muted small fw-bold text-uppercase px-3">CORE</div></li> --> */}
            <li style={{ display: "none" }}>
              <a href="##" className="nav-link px-3 active">
                <span className="me-1">
                  <i className="bi bi-speedometer2 text-black"></i>
                </span>
                <b>Dashboard</b>
              </a>
            </li>           
       

            


            <li className="singleList">
              <Link className="nav-link  px-2 sidebar-link">
                <span className="me-2">
                  {/* <i className="bi bi-file-earmark"></i> */}
                  <img src={shoppingBag} alt="" className="navLinkicon" />
                </span>
                <span>Item Master</span>
              </Link>
            </li>

            <li className="singleList">
              <Link to={'/unitmaster/'}  className="nav-link  px-2 sidebar-link">
                <span className="me-2">
                  {/* <i className="bi bi-file-earmark"></i> */}
                  <img src={unitIcon} alt="" className="navLinkicon" />
                </span>
                <span>Unit Master</span>
              </Link>
            </li>

            <li className="singleList">
              <Link to={'/pharmacyPurchase/'} className="nav-link  px-2 sidebar-link">
                <span className="me-2">
                  {/* <i className="bi bi-file-earmark"></i> */}
                  <img src={purchaseIcon} alt="" className="navLinkicon" />
                </span>
                <span>Purchase</span>
              </Link>
            </li>  
            <li className="singleList">
              <Link to={'/allPurchase/'} className="nav-link  px-2 sidebar-link">
                <span className="me-2">
                  {/* <i className="bi bi-file-earmark"></i> */}
                  <img src={purchaseIcon} alt="" className="navLinkicon" />
                </span>
                <span>All Purchase</span>
              </Link>
            </li>            

            <li className="singleList">
              <Link to={'/pharmacySale/'}  className="nav-link  px-2 sidebar-link">
                <span className="me-2">
                  {/* <i className="bi bi-file-earmark"></i> */}
                  <img src={saleIcon} alt="" className="navLinkicon" />
                </span>
                <span>Sale</span>
              </Link>
            </li>           


            
            {/* <li className="multiList">
              <Link
                className="nav-link px-2 sidebar-link"
                data-bs-toggle="collapse"
                data-bs-target="#UHIDReport"
                aria-expanded="false"
              >
                <span className="me-2">                 
                  <img src={uhidNavLinkicon} alt="" className="navLinkicon" />
                </span>
                <span>Purchase Report</span>
                <span className="right-icon ms-auto">
                  <i className="bi bi-chevron-down"></i>
                </span>
              </Link>
              <div className="collapse custome-collapse" id="UHIDReport">
                <ul className="navbar-nav">
                  <li>
                    <a href="#" className="nav-link">
                      <span className="me-1">
                        <i className="bi bi-check"></i>
                      </span>
                      <span>Patient Track</span>
                    </a>
                  </li>
                  
                </ul>
              </div>
            </li> */}

          </ul>
        </nav>
      </div>
    </div>
   
  );
}




