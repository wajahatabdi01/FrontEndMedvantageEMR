import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import VerifyUHID from "../Pages/VerifyUhid";
export default function VerifyUHIDLayout(){
    return(
        <div>
            <Navbar />
            <VerifyUHID />
            <Footer />
        </div>

    )   
}