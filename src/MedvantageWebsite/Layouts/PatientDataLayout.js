import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PatientData from "../Pages/PatientData";
export default function PatientDataLayout(){
    return(
        <>

              <Navbar />
              <PatientData />
              <Footer />
        </>
        
    )
}