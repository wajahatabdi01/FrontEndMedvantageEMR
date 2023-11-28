import React, { useEffect, useState } from "react";
import profilepic from "../../../../assets/images/icons/profilepic.png"
import save from '../../../../assets/images/icons/save.svg'

export default function UpdateProfile() {
  return (
    <>
    <div>
        <div className="wt-box ">
            <div className="row">
                <div className="col-sm-4">
                    <div className="pfile1">
                        <div className="pfile2">
                            <img src={profilepic} className="ppic" alt="" />
                        </div>
                        <div className="pfile22">
                            <h3>Sakshi Singh</h3>
                            <h4>UI/UX Designer <span>IT Department</span></h4>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col-sm-6 brdr">
                            <div className=" pfile10">
                                <div className="pfile21">
                                    <span className="lbl">Emp ID:</span>
                                    <label>10040</label>
                                </div>
                                <div className="pfile21">
                                    <span className="lbl">Date of Joining:</span>
                                    <label>09/11/2020</label>
                                </div>
                                <div className="pfile21">
                                    <span className="lbl">EDP HOD:</span>
                                    <label>Israr Khan - 10001</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className=" pfile10">
                                <div className="pfile21">
                                    <span className="lbl">Mobile Number:</span>
                                    <label>9026566457</label>
                                </div>
                                <div className="pfile21">
                                    <span className="lbl">Email ID:</span>
                                    <label>info@criteriontechnologies.com</label>
                                </div>
                                <div className="pfile21">
                                    <span className="lbl">Leave HOD:</span>
                                    <label>Israr Khan - 10001</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="wt-box2 wt-box-update">
            <div className="row">
                <div className="col-sm-6">
                    <div className="wt-box ">
                        <div className="p-info">
                            <h3>Personal Information <span className="saveb">  <img src={save} className="s1" alt="" /> Save</span></h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="pinfo2">
                                        <span className="lbl">Gender</span>
                                        <input type="text" value="Female" />
                                    </div>
                                    <div className="pinfo2">
                                        <span className="lbl">Date of Birth</span>
                                        <input type="text" value="10 Jan, 2001" />
                                    </div>
                                    <div className="pinfo2">
                                        <span className="lbl">HomeTown</span>
                                        <input type="text" value="Lucknow" />
                                    </div>
                                    <div className="pinfo2">
                                        <span className="lbl">Language</span>
                                        <input type="text" value="Hindi, English and Urdu" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="pinfo2">
                                        <span className="lbl">Nationality</span>
                                        <input type="text" value="Indian" />
                                    </div>
                                    <div className="pinfo2">
                                        <span className="lbl">Religion</span>
                                        <input type="text" value="None" />
                                    </div>
                                    <div className="pinfo2">
                                        <span className="lbl">Marital Status</span>
                                        <input type="text" value="Single" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="pinfo2">
                                        <span className="lbl">Permanent Address</span>
                                        <input type="text" value="10/100 Dubagga Uttar Pradesh (India)" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="pinfo2">
                                        <span className="lbl">Current Address</span>
                                        <input type="text" value="10/100 Dubagga Uttar Pradesh (India)" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="wt-box">
                        <div className="p-info">
                            <h3>Education Information <span className="saveb">  <img src={save} className="s1" alt="" /> Save</span></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pinfo2">
                                    <input type="text" value="Bachelor in Management Information System - (2014-2018)" />
                                    <input type="text" value="Lucknow University" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="pinfo2">
                                    <input type="text" value="Certificate in Graphic Design - (2014-2018)" />
                                    <input type="text" value="Integral University" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wt-box">
                        <div className="p-info">
                            <h3>Account Information <span><i className="fa fa-pencil"></i></span></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="pinfo2">
                                    <span className="lbl">Bank Account</span>
                                    <input type="text" value="1231567895" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pinfo2">
                                    <span className="lbl">Customer Name</span>
                                    <input type="text" value="Ajay Kumar Yadav" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pinfo2">
                                    <span className="lbl">Bank Name</span>
                                    <input type="text" value="HDFC" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pinfo2">
                                    <span className="lbl">Tax Code</span>
                                    <input type="text" value="1231567895" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pinfo2">
                                    <span className="lbl">Insurance Code</span>
                                    <input type="text" value="4354354" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pinfo2">
                                    <span className="lbl">IFSC Code</span>
                                    <input type="text" value="HDFC10101" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}
