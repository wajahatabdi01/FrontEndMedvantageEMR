import React, { useEffect } from 'react'
import rmd_logo from "../assest/image/RMD-Logo.png"
import { Link } from 'react-router-dom';

export default function Navbar() {

 
  useEffect(() => {
    if (window.scrollY > 0) {
      document.querySelector('.navbarCustome').classList.add('active');
    } else {
      document.querySelector('.navbarCustome').classList.remove('active');
    }
  }, [ window.onscroll])


  

  return (
    <>
      <nav className="navbar navbar-expand-xl bg-body-tertiary fixed-top navbarCustome">
        <div className="container-fluid customeNavContainer">
          <a className="navbar-brand" href="#"><img src={rmd_logo} /></a>
          <button className="navbar-toggler btnNavbarToggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            {/* <span className="navbar-toggler-icon"></span> */}
            <i className="bi bi-filter-right"></i>
          </button>
          <div className="collapse navbar-collapse customeNavItem" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about-us/" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/benefits-rmd/" className="nav-link">Benefits Of RMD</Link>
              </li>
              {/* <li className="nav-item">
         <a href="api.html" className="nav-link">API</a>
        </li>  
        <li className="nav-item">
        <a href="plans.html" className="nav-link">Plans</a>
        </li> */}

              <li className="nav-item">
                <Link to="/channel-partner/" className="nav-link">Channel Partner</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact-us/" className="nav-link">Contact Us</Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/registration/" className="nav-link">Registration</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li> */}
              {/* <li className="nav-item">
               <select className="form-select rounded-0"  name="languageName" onChange={handleOnchange}>
                            <option value="">--Choose an option--</option>
                            <option value="en">English</option>
                            <option value="ar">Arabic</option>
               </select>
              </li> */}

              {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>            
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}

            </ul>
            <ul class="navbar-nav custommenu"><li class="nav-item signin"><Link to="/registration/" className="nav-link"><i class="fa-solid fa-user"></i>&nbsp; Sign Up</Link></li>
            <li class="nav-item login"><Link to="/login" className="nav-link"><i className="fa-solid fa-key"></i> Sign In</Link></li></ul>


          </div>
          <div className="dropdown">
  <button class="btn btn-primary dropdown-toggle langBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false" fdprocessedid="xptexf" >
   <i className="fa-solid fa-globe"></i> Language
  </button>
                              <ul className="dropdown-menu menulistLang" data-popper-placement="bottom-start">
                                <li  style={{ cursor: 'pointer' }}>English</li>
                                <li style={{ cursor: 'pointer' }}>Arabic</li>
   
  </ul>
          </div>
        </div>
      </nav>


    </>
  )
}



