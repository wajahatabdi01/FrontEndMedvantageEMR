import React, {useEffect} from 'react'
import mainlogo from '../../src/assets/images/Navbar/offcanvas-logo.png'
import '../assets/css/CertificateCard.css'

export default function DeathCertificate() {
    let pDeatails = 'Demo Patient - 100000'
    useEffect(() => {
        document.title = `Death Certificate: ${pDeatails}`; // Set the desired title here
      }, []);

    return (
        <>
            <div className="card-wrapper">  
            <div className='quater-border right-top'></div>
            <div className='quater-border left-bottom'></div>             
                {/* ----------------Header Sec-------------- */}
                <div className="dis-hed">
                    <div className="discharge-logo">
                        <div className="logo-main">
                            <img src={mainlogo} />
                        </div>
                    </div>
                    <div className="address-section">
                        <div className='address'>K.No-3, Sarfarazganj, Hardoi road, Lucknow, UP-226003</div>
                        <div className='email'>info@medvantage.com</div>
                        <div className='phone'>+91-7795688088</div>                        
                    </div>
                </div>
           
            
            <div className='document-title'>Death Certificate</div>
           
                            

               
                   
           

            </div>


        </>
    )
}
