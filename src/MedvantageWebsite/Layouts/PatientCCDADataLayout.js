import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PatientCCDAData from "../Pages/PatientCCDAData";
export default function PatientCCDADataLayout(){
    return(
        <>

              <Navbar />
              <PatientCCDAData />
              <Footer />
        </>
        
    )
}