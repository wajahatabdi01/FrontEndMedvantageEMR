import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import electronichealth from '../ONCDocuments/electronichealth.pdf'
import APIDocument from '../ONCDocuments/APIDocument.pdf'

export default function APIdocumentation() {
  return (
    <>
      <Navbar />
      <section className='about-us12' style={{ minHeight: '38vh' }}>
        <div className='container'>


          <ul class="list-group">
          <li class="list-group-item active" aria-current="true">API Documentation</li>
            <li class="list-group-item">
              <i className='bi bi-list-nested me-1'></i>
              <Link to={APIDocument} target='_blank'><span>PATIENT SELECTION / DATA CATEGORY REQUEST / ALL DATA
                REQUEST 170.315(G)(7), 170.315(G)(8), 170.315(G)(9)
              </span></Link>
            </li>

            {/* <li class="list-group-item">
    <i className='bi bi-list-nested me-1'></i>
    <Link to={electronichealth} target='_blank'><span>170.315(b)(10) Electronic Health Information Export Document</span></Link>
  </li>
  <li class="list-group-item">
    <i className='bi bi-list-nested me-1'></i>
    <Link to={MultifactorAuthentication} target='_blank'><span>17.315 (d)(13) Multifactor Authentication</span></Link>
  </li>   */}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  )
}
