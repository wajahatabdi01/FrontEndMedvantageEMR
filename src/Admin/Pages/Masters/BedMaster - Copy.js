import React, { useEffect, useState } from 'react'
import GetAPIBedMaster from '../../Api/Master/BedMasterAPI/GetAPIBedMaster'
import PostAPIBedMaster from '../../Api/Master/BedMasterAPI/PostAPIBedMaster'
import DeleteAPIBedMaster from '../../Api/Master/BedMasterAPI/DeleteAPIBedMaster'
import PutAPIBedMaster from '../../Api/Master/BedMasterAPI/PutAPIBedMaster'
import Loder from '../../../Components/Loder'
import TosterUnderProcess from '../../../Components/TosterUnderProcess'
import Toster from '../../../Components/Toster'
import user from "../../../assets/images/Navbar/user.svg"

export default function BedMaster() {
    let [bedData, setBeddata] = useState()
    let [sendForm, setSendForm] = useState({ "userId": 16 })
    let [updatebool, setUpdatebool] = useState(0)
    let [loder, setLoder] = useState(1)

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)


    // get data from api
    let getData = async () => {
        let response = await GetAPIBedMaster();
        // console.log(response);
        if (response.status === 1) {
            setLoder(0)
            setBeddata(response.responseValue)
        }
    }

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    // Save data 
    let sendData = async () => {
        // setLoder(1)
        let response = await PostAPIBedMaster(sendForm)
        setShowUnderProcess(1)

        if (response.status === 1) {
            // setLoder(0)
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Save SuccessFully!")
            setTosterValue(0)
            setInterval(() => {
                setShowToster(0)
            }, 2000)
        }
        
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage(response.responseValue)
            setTosterValue(1)
            setInterval(() => {
                setShowToster(0)
            }, 2000)
        }
        getData()
    }


    // get data for update 
    let handleUpdate = (id, bedname) => {
        // console.table(id, bedname);
        setUpdatebool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "bedName": bedname,
        }))
        document.getElementById("bedName").value = bedname
    }

    //  send update
    let handlesendUpdate = async () => {
        setLoder(1)
        let response = await PutAPIBedMaster(sendForm)
        if (response.status === 1) {
            setLoder(0)
            setUpdatebool(0)
            getData()
            document.getElementById("bedName").value = ""
        }
    }


    // Delete data
    let handleDelete = async (id) => {
        let sendData = { "id": id }
        // let getIdForDelete = {"id":id}
        setLoder(1)
        let response = await DeleteAPIBedMaster(sendData)
        if (response.status === 1) {
            setLoder(0)
            getData()
        }
    }

    //  clear data 
    let handleClear = () => {
        setSendForm({})
        document.getElementById("bedName").value = "";
    }

    // cancle update
    let handleCancle = () => {
        setSendForm({})
        setUpdatebool(0)
        document.getElementById("bedName").value = "";

    }


     // ######################### Chat Box
     let btnOpenChatBox = () => {        
        document.querySelector(".chatBox").style.display = "block";        
    }

    let btnCloseChatBox = () => {        
        document.querySelector(".chatBox").style.display = "none";    
    } 
    
    let getUserListSection = document.querySelector(".userListSection");
    let getUserLists = document.getElementsByClassName("userList");
    let getUserWriteChatSection = document.querySelector(".userWriteChatSection"); 

    for (const getUserList of getUserLists) {      
       getUserList.onclick = function() { 
        getUserListSection.style.display = 'none'
        getUserWriteChatSection.style.display = 'block'
       }

       let getBtnBackUserWriteChat= document.querySelector(".btnBackUserWriteChat");
       getBtnBackUserWriteChat.onclick = function() {              
        getUserListSection.style.display = 'block'
        getUserWriteChatSection.style.display = 'none'        
    }      
      
    }   


    useEffect(() => {
        getData();

        ///################### table row ative
        let getTableRows = document.querySelectorAll('.med-table tbody tr');
        for (const getTableRow of getTableRows) {
            getTableRow.addEventListener("click", function () {
                // alert('Hello');                 
                resetTableRows();
                getTableRow.classList.add("active");
            });
        }

        function resetTableRows() {
            for (const getTableRow of getTableRows) {
                getTableRow.classList.remove("active");
            }
        }       

    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Create Bed</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">
                                            <label htmlFor="bedName" className="form-label">Bed Name <span className="starMandatory">*</span></label>
                                            <input type="email" className="form-control form-control-sm" id="bedName" placeholder="Enter Bed Name" name="bedName" onChange={handleChange} />
                                        </div>

                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>


                                            {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                <>
                                                    {showToster === 1 ?
                                                        <Toster value={tosterValue} message={tosterMessage} />

                                                        : <div>
                                                            {updatebool === 0 ?
                                                                <>
                                                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={sendData}>Save</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}>Clear</button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlesendUpdate}>Update</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancle}>Cancle</button>
                                                                </>
                                                            }
                                                        </div>}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <div className="med-box">
                                <div className="title">Bed Master List</div>
                            </div>
                            <div className="med-table-section" style={{ "height": "77vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Bed Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bedData && bedData.map((key, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{key.bedName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(key.id, key.bedName) }}><i className="fa fa-edit actionedit" ></i></div>
                                                            <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" onClick={() => { handleDelete(key.id) }}><i className="fa fa-trash actiondel"></i>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>

                        </div>


                    </div>
                </div>




             {/* ############### Chat box start here ############# */}
             <div className="chatBox">
             <i className="bi bi-x-octagon-fill iconCloseChatBox" title='Close Window' onClick={btnCloseChatBox}></i>

             <div className="userListSection">
             <div className="chatBoxHeader px-3">
                <div className="title py-2">Messages</div>
                <div className="searchBox py-2 relative">
                    <input type="search" name="" id="" placeholder='Search' title='Search user...'/>
                    <i className="bi bi-search"></i>
                </div>                
             </div>

             <div className="userListInnerSection">
               <div className="userList">
                <div className="userImg">
                    <img src={user} alt="" />
                </div>
                <div className="userDetails">
                   <div className="name">Md Ijaharuddin khan</div> 
                   <div className="lastChatText">Last Chat Text</div> 
                </div>
               </div>

               <div className="userList">
                <div className="userImg">
                    <img src={user} alt="" />
                </div>
                <div className="userDetails">
                   <div className="name">Md Nasir Ali khan</div> 
                   <div className="lastChatText">Last Chat Text</div> 
                </div>
               </div>


               <div className="userList">
                <div className="userImg">
                    <img src={user} alt="" />
                </div>
                <div className="userDetails">
                   <div className="name">Md Arif Ali</div> 
                   <div className="lastChatText">Last Chat Text</div> 
                </div>
               </div>
             </div>

             </div>
             {/* ############# End of userListSection */}

             <div className="userWriteChatSection">            
             <div className="chatBoxHeader px-3">
             <i className="bi-arrow-return-left btnBackUserWriteChat" title='Previous'></i>
             <div className="chatUserNameImg">                
                <div className="nameDesignation">
                    <div className="name">Md Ijaharuddin khan</div>
                    <div className="designation">Frontend Software Developer</div> 
                </div>
                <div className="img"><img src={user} alt="" /></div>
             </div>                               
             </div>

             <div className="chattingSection px-3">
              
              <div className="chatMe" title='Outgoing From here.'>
                <div className="time">15:36 PM</div>
                <div className="chat">
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
                </div>
              </div>

              <div className="chatYou" title='Incoming from there.'>  
              <div className="time">15:37 PM</div>            
              <div className="chat"><span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat cupiditate laboriosam </span></div>                
              </div>

              <div className="chatMe" title='Outgoing From here.'>
                <div className="time">15:38 PM</div>
                <div className="chat">
                    <span>Lorem ipsum dolor. </span>
                </div>
              </div>

              <div className="chatYou"  title='Incoming from there.'>  
              <div className="time">15:40 PM</div>            
              <div className="chat"><span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat cupiditate laboriosam.  </span></div>                
              </div>


              <div className="chatMe" title='Outgoing From here.'>
                <div className="time">15:38 PM</div>
                <div className="chat">
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat cupiditate laboriosam. Lorem</span>
                </div>
              </div>

             </div>
              
              <div className="inputWriteSection px-3 pt-2">
                <div className="inputWriteSectionInnerItems">
                <textarea name="" id="" rows="1" placeholder='Start Chat...' title='Write as you want...'></textarea>
                <button title='Send'><i className="bi bi-send-fill"></i></button>
                </div>                
              </div>

             

             </div>
               {/* ############# End of userWriteChatSection */}

             </div>
             {/*####### End of chatBox */}

             {/*####### Chat Button */}
             <div className="chat-btn" title='Start Chat' onClick={btnOpenChatBox}> <i className="bi bi-chat-left-dots"></i></div>

            </section>
            {/* <Loder val={loder} /> */}
            

        </>
    )
}
