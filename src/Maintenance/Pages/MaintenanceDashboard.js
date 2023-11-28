import React, { useState } from 'react'
import addIcon from '../../assets/images/icons/add.png'
import negativebalance from '../../assets/images/icons/negativebalance.png'
import zoomout from '../../assets/images/icons/zoomout.png'
import Group from '../../assets/images/icons/Group.png'
import Groupbox2 from '../../assets/images/icons/Groupbox2.png'
import Groupbox3 from '../../assets/images/icons/Groupbox3.png'
import Groupbox4 from '../../assets/images/icons/Groupbox4.png'
import Hospital from '../../assets/images/icons/Hospital.png'
import College from '../../assets/images/icons/College.png'
import Pharmacy from '../../assets/images/icons/Pharmacy.png'
import University from '../../assets/images/icons/University.png'
import dots from '../../assets/images/icons/dots.png'
import menu from '../../assets/images/icons/menu.png'
import Highcharts from 'highcharts';
import Ellipse from '../../assets/images/icons/Ellipse.png';
import notiicn from '../../assets/images/PatientListIcons/notiicn.svg';
import HighchartsReact from 'highcharts-react-official'
import * as signalR from '@microsoft/signalr';
import { useEffect } from 'react'
import GetAllNotificationCount from '../API/MaintenanceDashBoard/GetAllNotificationCount'
import GetAllComplaintNotification from '../API/ComplaintChart/GetComplaintNotification'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function MaintenanceDashboard() {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    const [zoomedIn, setZoomedIn] = useState(false);
    let [message, setMessage] = useState({ notificationTemplateId: 0 })
    let [connect, setConnect] = useState([])
    const [ComplaintTable, setComplaintTable] = useState([])

    const toggleZoom = () => {
        setZoomedIn(!zoomedIn);
    };


    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: "Expected/ Unexpected Manintenance"
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            accessibility: {
                description: 'Months of the year'
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Expected',
            marker: {
                symbol: 'square'
            },
            data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
                y: 26.4,

                accessibility: {
                    description: 'Sunny symbol, this is the warmest point in the chart.'
                }
            }, 22.8, 17.5, 12.1, 7.6]

        }, {
            name: 'Unexpected',
            marker: {
                symbol: 'diamond'
            },
            data: [{
                y: 1.5,

                accessibility: {
                    description: 'Snowy symbol, this is the coldest point in the chart.'
                }
            }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
        }]
    }
    let GetComplaintNotification = async () => {
        let ComplaintNotification = await GetAllComplaintNotification()

        if (ComplaintNotification.status === 1 && ComplaintNotification.responseValue[0] !== undefined) {
            setComplaintTable(ComplaintNotification.responseValue)
            setMessage(ComplaintNotification.responseValue[0])
        }
    }

    let GetAllNotification = async () => {
        let data = await GetAllNotificationCount();
        if (data.status === 1 && data.responseValue !== undefined) {
            setComplaintTable(data.responseValue)

            // setMessage(data.responseValue)
        }
        else if (data.status === 0) {
            // setMessage(data.responseValue[0])
        }
    }


    // let [connection, setConnection] = useState(new signalR.HubConnectionBuilder()
    //     .withUrl(window.NotificationUrl + "/Notification")
    //     .configureLogging(signalR.LogLevel.Information)  // Replace with your API URL
    //     .build())
 
    useEffect(() => {
        GetComplaintNotification()
        // let connection = window.sessionStorage.getItem("singleR") ?JSON.parse(window.sessionStorage.getItem("singleR")).connection:[]
        // console.log("connection ", connection)
        // connection.start().then(() => {
        //     connection.invoke("NewUserConnected", window.userId, 0).catch(err => console.log(err))
        //     connection.on("OnNewUserConnected", (message) => {
        //         console.log("n jnnknj", message)
        //         GetAllNotification()

        //     });
        //     connection.on("ReceiveComplaint", (message) => {


        //         setMessage(message.responseValue)
        //         console.log(message.responseValue)
        //     });
        // })
    }, [])

    return (
        <>
        <section className='main-content mt-5 pt-3'>
            <div className='maintenaendash'>
                <div className='static-container'>

                    <div className='maintenance-overview secc'>
                        <div className='dashboard-top-container'>
                          <h5 class="mtop-heading">{t("Maintenance_Overview")}</h5>
                        </div>
                        <div className='leftm1'>
                            <div className='maintenance-overview-boxes toppic'>
                                <div className='dgh'>
                                    <img src={Group} alt='Group' />
                                    <img src={menu} className='toppic1' alt='menu' />
                                </div>
                                <div className='dgh dgh1'>
                                    <div className='toppic2'>
                                        <h4>4520</h4>
                                        <p>{t("Total_Maintenance")}</p>
                                    </div>
                                    <div class="maintenanceProgressBar"></div>
                                </div>
                            </div>
                            <div className='maintenance-overview-boxes toppic'>
                                <div className='dgh'>
                                    <img src={Groupbox2} alt='Group' />
                                    <img src={menu} className='toppic1' alt='menu' />
                                </div>
                                <div className='dgh dgh1'>
                                    <div className='toppic2'>
                                        <h4>245</h4>
                                        <p>{t("In_Progress")}</p>
                                    </div>
                                    <div class="maintenanceProgressBar"></div>
                                </div>
                            </div>
                            <div className='maintenance-overview-boxes toppic'>
                                <div className='dgh'>
                                    <img src={Groupbox3} alt='Group' />
                                    <img src={menu} className='toppic1' alt='menu' />
                                </div>
                                <div className='dgh dgh1'>
                                    <div className='toppic2'>
                                        <h4>520</h4>
                                        <p>{t("Hold_Maintenance")}</p>
                                    </div>
                                    <div class="maintenanceProgressBar"></div>
                                </div>
                            </div>
                            <div className='maintenance-overview-boxes toppic'>
                                <div className='dgh '>
                                    <img src={Groupbox4} alt='Group' />
                                    <img src={menu} className='toppic1' alt='menu' />
                                </div>
                                <div className='dgh dgh1'>
                                    <div className='toppic2'>
                                        <h4>245</h4>
                                        <p>{t("Complete_Maintenance")}</p>
                                    </div>
                                    <div class="maintenanceProgressBar"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='graph-container-in secc'>
                        <div className='d-flex justify-content-between graphc'>
                            <div className='dashboard-top-container'>
                                <h5 class="mtop-heading">{t("Expected_Unexpected_Manintenance")}</h5>
                            </div>
                            <div className='add-button-container'>
                                <div>
                                    <button className='add-machine-button'><i className='fa fa-plus'></i>{t("Add_Machine")}</button>
                                </div>
                                <div className='noticonut'>
                                    <div className=" position-relative  " data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-bell-fill"></i>
                                        <span className="position-absolute top-0 start-100 translate-middle badge badge1 rounded-pill bg-danger">
                                            {console.log("dddddddddddddddddddddddddd", message.notificationTemplateId)}
                                            +{message.notificationTemplateId}
                                            <span className="visually-hidden">{t("unread_messages")}</span>
                                        </span>
                                        <div className="dropdown-menu ddmenu dropdown-menu-left " aria-labelledby="dropdownMenuButton" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(-142px, 35px, 0px)', width: '25vw' }}>
                                            <div className="dropdowntitle-wrap d-flex align-items-center justify-content-between" >
                                                <div className="dropdowntitle1">{t("Notifications")}</div>
                                                <div className="clearallcs"><a href='/'>{t("Clear_All")}</a></div>
                                            </div>
                                            <div className='todaycs'>{t("Today")}</div>
                                            <ul className="custom-notifications1">
                                                {ComplaintTable && ComplaintTable.map((data, index) => {
                                                    return (
                                                        <>
                                                            <li className="unread">
                                                                <a href="/" className="notification-main">
                                                                    <div className="notipic">
                                                                        <img src={notiicn} class="notipic1" />
                                                                    </div>
                                                                    <div className="namenoti"><p><strong>{data.respondentPerson}</strong>{data.complaintText}</p></div>
                                                                    <div className="hrnoti"><p>{data.hoursDifference}</p></div>
                                                                </a>
                                                            </li>
                                                        </>
                                                    )
                                                })}

                                            </ul>
                                            <div className="viewallcs"><a href="/">{t("View All")} <i className="fa fa-angle-right"></i></a></div>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <img className='mx-2' src={negativebalance} alt='negativebalance' style={{ cursor: 'pointer' }} />
                                </div>
                                <div>
                                    <img src={zoomout} alt='zoom-in-out'
                                        onClick={toggleZoom} style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                        </div>
                        <div className='graph-container'>
                            {/* <div className='d-flex expp1'>
                                <div className='expp'><h6><i className='fa fa-circle green'></i>Expected</h6></div>
                                <div className='expp'><h6><i className='fa fa-circle red'></i>Unexpected</h6></div>
                            </div> */}

                            <div className='maitenanceExpectedChart'>
                                <HighchartsReact className="mb-5" highcharts={Highcharts} options={options} />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className='m-cat'>
                    <h5 className='mtop-heading'>{t("Maintenance_in_Categories")}</h5>
                    <div className='maintenance-category'>

                        <div className='maintenance-category-boxes cat1'>
                            <div className='mdflex t1'>
                                <div className='catt'><img src={Hospital} alt='hospital' /></div>
                                <div className='catt'><img src={dots} alt='dots' className='dotss' /></div>
                            </div>
                            <div className='mdflex t2'>
                                <div className='rankk'>
                                   <h6>{t("Hospital")}</h6>
                                   <h5>{t("Building")}</h5>
                                </div>
                                <div className='rankk1'>504</div>
                            </div>
                        </div>

                        <div className='maintenance-category-boxes cat1'>
                            <div className='mdflex t1'>
                                <div className='catt'><img src={College} alt='hospital' /></div>
                                <div className='catt'><img src={dots} alt='dots' className='dotss' /></div>
                            </div>
                            <div className='mdflex t2'>
                                <div className='rankk'>
                                    <h6>{t("College")}</h6>
                                    <h5>{t("Building")}</h5>
                                </div>
                                <div className='rankk1'>504</div>
                            </div>
                        </div>

                        <div className='maintenance-category-boxes cat1'>
                            <div className='mdflex t1'>
                                <div className='catt'><img src={Pharmacy} alt='hospital' /></div>
                                <div className='catt'><img src={dots} alt='dots' className='dotss' /></div>
                            </div>
                            <div className='mdflex t2'>
                                <div className='rankk'>
                                    <h6>{t("Pharmacy")}</h6>
                                    <h5>504</h5>
                                </div>
                                <div className='rankk1'>504</div>
                            </div>
                        </div>

                        <div className='maintenance-category-boxes cat1'>
                            <div className='mdflex t1'>
                                <div className='catt'><img src={University} alt='hospital' /></div>
                                <div className='catt'><img src={dots} alt='dots' className='dotss' /></div>
                            </div>
                            <div className='mdflex t2'>
                                <div className='rankk'>
                                    <h6>{t("University")}</h6>
                                    <h5>{t("Building")}</h5>
                                </div>
                                <div className='rankk1'>504</div>
                            </div>
                        </div>

                        <div className='maintenance-category-boxes cat1'>
                            <div className='mdflex t1'>
                                <div className='catt'><img src={Hospital} alt='hospital' /></div>
                                <div className='catt'><img src={dots} alt='dots' className='dotss' /></div>
                            </div>
                            <div className='mdflex t2'>
                                <div className='rankk'>
                                    <h6>{t("Hospital")}</h6>
                                    <h5>{t("Building")}</h5>
                                </div>
                                <div className='rankk1'>504</div>
                            </div>
                        </div>

                        <div className='maintenance-category-boxes cat1'>
                            <div className='mdflex t1'>
                               <div className='catt'><img src={College} alt='hospital' /></div>
                               <div className='catt'><img src={dots} alt='dots' className='dotss' /></div>
                            </div>
                            <div className='mdflex t2'>
                                <div className='rankk'>
                                    <h6>{t("College")}</h6>
                                    <h5>{t("Building")}</h5>
                                </div>
                                <div className='rankk1'>678</div>
                            </div>
                        </div>

                        <div className='maintenance-category-boxes cat1'>
                            <div className='mdflex t1'>
                                <div className='catt'><img src={Pharmacy} alt='hospital' /></div>
                                <div className='catt'><img src={dots} alt='dots' className='dotss' /></div>
                            </div>
                            <div className='mdflex t2'>
                                <div className='rankk'>
                                <h6>{t("Pharmacy")}</h6>
                                <h5>{t("Building")}</h5>
                                </div>
                                <div className='rankk1'>567</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="entriess">
                    <div className="med-table-section" style={{ "height": "80vh" }}>
                        <h6 className='showen'>{t("Showing_1-11_of_250_entries")}</h6>
                        <table className="med-table border_ striped">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ "width": "5%" }}>#<i class="fa-regular fa-arrow-up-arrow-down" style={{ color: '#546788' }}></i> </th>
                                    <th style={{width:'145px'}}>{t("Machine_Name")}</th>
                                    <th>{t("Machine Type")}</th>
                                    <th>{t("Vendor")}</th>
                                    <th>{t("Under_Waranty")}</th>
                                    <th>{t("Last_Service")}</th>
                                    <th>{t("Upcoming_Service")}</th>
                                    <th>{t("Complaint")}</th>
                                    <th>{t("Status")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center">1</td>
                                    <td>{t("Surgical_Light")} <i className='fa fa-times dasfclose'></i></td>
                                    <td>{t("Single_Ceiling_Mounted_Light")}</td>
                                    <td>-</td>
                                    <td>{t("Yes")}</td>
                                    <td>05/02/2022</td>
                                    <td>28/08/2023</td>
                                    <td>{t("Lorem Ipsum is simply dummy text printing and typesetting industry")}.</td>
                                    <td><button className='upcoming-button'>{t("Upcoming")}</button></td>
                                </tr>
                                <tr>
                                    <td className="text-center">2</td>
                                    <td>{t("Surgical_Light")} <i className='fa fa-times dasfclose'></i></td>
                                    <td>{t("Single_Ceiling_Mounted_Light")}</td>
                                    <td>-</td>
                                    <td>{t("Yes")}</td>
                                    <td>05/02/2022</td>
                                    <td>28/08/2023</td>
                                    <td>{t("Lorem Ipsum is simply dummy text printing and typesetting industry")}.</td>
                                    <td><button className='Pending-button'>{t("Upcoming")}</button></td>
                                </tr>
                                <tr>
                                    <td className="text-center">3</td>
                                    <td>{t("Surgical_Light")} <i className='fa fa-times dasfclose'></i></td>
                                    <td>{t("Single_Ceiling_Mounted_Light")}</td>
                                    <td>-</td>
                                    <td>{t("Yes")}</td>
                                    <td>05/02/2022</td>
                                    <td>28/08/2023</td>
                                    <td>{t("Lorem Ipsum is simply dummy text printing and typesetting industry")}.</td>
                                    <td><button className='Done-button'>{t("Done")}</button></td>
                                </tr>
                                <tr>
                                    <td className="text-center">4</td>
                                    <td>{t("Surgical_Light")} <i className='fa fa-times dasfclose'></i></td>
                                    <td>{t("Single_Ceiling_Mounted_Light")}</td>
                                    <td>-</td>
                                    <td>{t("Yes")}</td>
                                    <td>05/02/2022</td>
                                    <td>28/08/2023</td>
                                    <td>{t("Lorem Ipsum is simply dummy text printing and typesetting industry")}.</td>
                                    <td><button className='upcoming-button'>{t("Upcoming")}</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        </>

    )
}
