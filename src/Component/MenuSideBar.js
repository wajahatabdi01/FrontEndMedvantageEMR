import React, { useEffect } from "react";
import OffcanvasLogo from "../assets/images/Navbar/offcanvas-logo.png";
import MaskGroup from "../assets/images/Navbar/MaskGroup.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import masterNavLinkicon from "../assets/images/Navbar/user.svg";
import scheduleNavLinkicon from "../assets/images/Navbar/Layer.svg";
import uhidNavLinkicon from "../assets/images/Navbar/medical-report.svg";
import dashboardIcon from "../assets/images/icons/dashboard.svg";
import userpatientRegistrationIcon from "../assets/images/icons/userpatientRegistration.svg";
// import { NavLink } from "react-router-dom";
export default function MenuSideBar(props) {
  let [menuList, setMenuList] = useState([])

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

  let handleMenu = (name, id) => {
    // console.log("dsvcsdcsd", name, id)
    let wardId = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
    let wardname = JSON.parse(window.sessionStorage.getItem("activePage")).wardName
    let departmentName = JSON.parse(window.sessionStorage.getItem("activePage")).departmentName ? JSON.parse(window.sessionStorage.getItem("activePage")).departmentName : ""
    let DepartmentId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId ? JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId : null
    let menuName = name
    let menuId = id

    window.sessionStorage.removeItem("activePage")
    window.sessionStorage.setItem("activePage", JSON.stringify({ "WardId": wardId, "wardName": wardname, "DepartmentId": DepartmentId, "departmentName": departmentName, "menuName": menuName, "menuId": menuId }))


  }
  useEffect(() => {
    if (props.exMenutData.length !== 0) {
      if (window.sessionStorage.getItem("departmentmenu")) {

        let menList = JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList
        setMenuList(menList)
      }

    }
    else {
      let menList = window.sessionStorage.getItem("departmentmenu") ? JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList : []
      setMenuList(menList)
      // setMenuList([])
    }
    // console.log("menushow", props.showMenu)
  }, [props])
  return (
    // < !--offCanvas navbar  -- >

    <div className="offcanvas offcanvas-start sidebar-nav shadow-sm rounded_" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ display: `${props.showMenu === 1 ? "block" : "none"}` }}>
      <div className="offcanvas-header offcanvas-header-custome">
        <div className="offcanvas-logo-username">
          <div className="offcanvas-logoBorderBottom p-2_">
            <img src={MaskGroup} className="logoLeft" />
            <div className="offcanvas-logo">
              <Link to={props.isSuperadmin === false ? "/dashboard/" : ""}>
                {" "}
                <img src={OffcanvasLogo} className="OffcanvasLogo" />{" "}
              </Link>
            </div>
          </div>
          <h5
            className="offcanvas-title text-uppercase user-name"
            id="offcanvasExampleLabel"
            style={{ display: "none" }}
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
          {window.location.pathname !== "/opdpatientlist/" && window.location.pathname !== "/ipdpatientlist/" ?
            <ul className="navbar-nav side-ul-list singleList">
              {
                window.sessionStorage.getItem("activePage") ? JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId !== "" ?
                  menuList && menuList.map((val, ind) => {
                    if (val.subMenuList.length === 0) {
                      return (
                        <li className="singleList" onClick={() => handleMenu(val.menuName, val.menuId)}>
                          <Link to={val.url} className={`nav-link  px-3 sidebar-link ${val.menuId === 0 ? "active" : ""}`}>
                            <span className="me-2"><img src={dashboardIcon} alt="" className="navLinkicon" /></span>
                            <span>{val.menuName}</span>
                          </Link>
                        </li>
                      )
                    }
                    else if (val.subMenuList.length !== 0) {
                      return (
                        <li className="multiList">
                          <Link
                            to="##"
                            className="nav-link px-2 sidebar-link"
                            data-bs-toggle="collapse"
                            data-bs-target={'#' + val.menuId}
                            aria-expanded="false"
                          >
                            <span className="me-2">
                              {/* <i className="bi bi-folder-check"></i> */}
                              <img src={masterNavLinkicon} alt="" className="navLinkicon" />
                            </span>
                            <span>{val.menuName}</span>
                            <span className="right-icon ms-auto">
                              <i className="bi bi-chevron-down"></i>
                            </span>
                          </Link>
                          <div className="collapse custome-collapse" id={val.menuId}>
                            <ul className="navbar-nav ps-3">
                              {
                                val.subMenuList && val.subMenuList.map((v, i) => {
                                  return (
                                    <li onClick={() => handleMenu(val.menuName, val.menuId)}>
                                      <Link to={v.url} className="nav-link">
                                        <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                        <span>{v.menuName}</span>
                                      </Link>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          </div>
                        </li>

                      )
                    }
                  })
                  :

                  props.showMenu === 1 && JSON.parse(window.sessionStorage.getItem("departmentmenu")).departmentList.length === 0 && JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId === "" ?
                    menuList && menuList.map((val, ind) => {

                      if (val.subMenuList.length === 0) {
                        return (
                          <li className="singleList" onClick={() => handleMenu(val.menuName, val.menuId)}>
                            <Link to={val.url} className={`nav-link  px-3 sidebar-link ${ind === 0 ? "active" : ""}`}>
                              <span className="me-2"><img src={dashboardIcon} alt="" className="navLinkicon" /></span>
                              <span>{val.menuName}</span>
                            </Link>
                          </li>
                        )
                      }
                      else if (val.subMenuList.length !== 0) {
                        return (
                          <li className="multiList">
                            <Link
                              to="##"

                              className="nav-link px-2 sidebar-link"
                              data-bs-toggle="collapse"
                              data-bs-target={'#' + val.menuId}
                              aria-expanded="false"
                            >
                              <span className="me-2">
                                {/* <i className="bi bi-folder-check"></i> */}
                                <img src={masterNavLinkicon} alt="" className="navLinkicon" />
                              </span>
                              <span>{val.menuName}</span>
                              <span className="right-icon ms-auto">
                                <i className="bi bi-chevron-down"></i>
                              </span>
                            </Link>
                            <div className="collapse custome-collapse" id={val.menuId}>
                              <ul className="navbar-nav ps-3">
                                {
                                  val.subMenuList && val.subMenuList.map((v, i) => {
                                    return (
                                      <li onClick={() => handleMenu(val.menuName, val.menuId)}>
                                        <Link to={v.url} className="nav-link">
                                          <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                          <span>{v.menuName}</span>
                                        </Link>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </div>
                          </li>
                        )
                      }
                    }) : <></> : <></>

              }


            </ul>

            : ""}
        </nav>
      </div>
    </div>
    // <!--offCanvas navbar-- >
  );
}
