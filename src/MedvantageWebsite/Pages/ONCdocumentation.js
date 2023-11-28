import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import electronichealth from '../ONCDocuments/electronichealth.pdf'
import MultifactorAuthentication from '../ONCDocuments/MultifactorAuthentication.pdf'
import ONCCQMDocumentation from '../../../src/MedvantageWebsite/ONCDocuments/ONCCQMDocumentation.pdf'
import MultiFactorAuthenticationDocumentation from '../../../src/MedvantageWebsite/ONCDocuments/MultiFactorAuthenticationDocumentation.pdf'
import ElectronicHealthInformationExport from '../../../src/MedvantageWebsite/ONCDocuments/ElectronicHealthInformationExport(Cures)Documentation.pdf'
import CostAndCertification from '../../../src/MedvantageWebsite/ONCDocuments/CostAndCertificationDisclosure.pdf'

export default function ONCdocumentation() {
  return (
    <>
        <Navbar/>
            <section className='about-us12' style={{minHeight:'38vh'}}>
                <div className='container'>
                   
  <ul class="list-group">
  <li class="list-group-item active" aria-current="true">ONC Documentation</li>
  <li class="list-group-item">
    <i className='bi bi-list-nested me-1'></i>
    <Link to={ElectronicHealthInformationExport} target='_blank'><span>170.315(b)(10) Electronic Health Information Export Document</span></Link>
  </li>
  <li class="list-group-item">
    <i className='bi bi-list-nested me-1'></i>
    <Link to={MultiFactorAuthenticationDocumentation} target='_blank'><span>170.315 (d)(13) Multifactor Authentication</span></Link>
  </li>  
  <li class="list-group-item">
    <i className='bi bi-list-nested me-1'></i>
    <Link to={ONCCQMDocumentation} target='_blank'><span>170.315 (c)(1) - (c)(4) CQMs</span></Link>
  </li>  
  <li class="list-group-item">
    <i className='bi bi-list-nested me-1'></i>
    <Link to={CostAndCertification} target='_blank'><span>Cost and Certification Disclosures for Medvantage</span></Link>
  </li>  
</ul>



                </div>
            </section>
        <Footer/>
    </>
  )
}
