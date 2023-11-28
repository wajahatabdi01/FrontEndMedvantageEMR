import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import TableContainer from '../../../Components/TableContainer'
import Loder from '../../../Components/Loder'
import Toster from '../../../Components/Toster'
import TosterUnderProcess from '../../../Components/TosterUnderProcess'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import GetHeadMaster from '../../Api/Master/HeadMaster/GetHeadMaster'
import GetMenuMaster from '../../../SuperAdmin/Api/Master/MenuMaster/GetMenuMaster'
import GetAddUser from '../../Api/UserService/GetAddUser'


export default function UserMenuMapping() {
    let [userList, setUserList] = useState()
    let [headList, setHeadList] = useState()
    let [menuList, setMenuList] = useState()
    let [sendHeadList, setSendHeadList] = useState([]);
    let [sendMenuList, setSendMenuList] = useState([])
    let [sendForm, setSendForm] = useState({ "userId": window.userId, "clientID": 13})




    // get data from api
    let getdata = async () => {
        let response = await GetHeadMaster();
        let getMenu = await GetMenuMaster();
        let getUser = await GetAddUser();
        if (response.status === 1) {
            setHeadList(response.responseValue)
            setMenuList(getMenu.responseValue)
            setUserList(getUser.responseValue)
        }
    }
     //Handle Change
     let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log('name',name);
        console.log('value',value);
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    // Select All head
    let checkId = (id) => {
        let bool = false;
        sendHeadList.map((val, ind) => {
            if (id === val) {
                bool = true;
                return [bool, ind];
            }
        });
        return [bool, -1];
    };

    // Change Select Head  
    let changeHead = (id) => {
        // console.log(id)

        if (id === -1) {
            let a = document.getElementById(-1).checked;

            let arr = [];
            if (a) {
                headList.map((val, ind) => {
                    document.getElementById(val.id).checked = true;
                    arr.push(val.id);
                });

                setSendHeadList([...arr]);
            } else {
                headList.map((val, ind) => {
                    document.getElementById(val.id).checked = false;
                });
                document.getElementById(-1).checked = false;
                setSendHeadList([]);
            }
        } else {
            let g = checkId(id);

            if (g[0]) {
                sendHeadList.splice(g[1], 1);
            } else {
                setSendHeadList([...sendHeadList, id]);
            }
        }
    };

    // Select All Menu
    let checkMenuId = (id) => {
        let bool = false;
        sendMenuList.map((val, ind) => {
            if (id === val) {
                bool = true;
                return [bool, ind];
            }
        });
        return [bool, -1];
    };

    // Change Select Menu 
    let changeMenu = (id) => {
        // console.log(id)

        if (id === -1) {
            let a = document.getElementById(-1).checked;

            let arr = [];
            if (a) {
                menuList.map((val, ind) => {
                    document.getElementById(val.id).checked = true;
                    arr.push(val.id);
                });

                setSendMenuList([...arr]);
            } else {
                menuList.map((val, ind) => {
                    document.getElementById(val.id).checked = false;
                });
                document.getElementById(-1).checked = false;
                setSendMenuList([]);
            }
        } else {
            let cm = checkMenuId(id);

            if (cm[0]) {
                sendMenuList.splice(cm[1], 1);
            } else {
                setSendMenuList([...sendMenuList, id]);
            }
        }
    };

    useEffect(() => {
        getdata();
    }, [])
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text='User Menu Mapping' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="caretakerName" className="form-label">User <span className="starMandatory">*</span></label>
                                    <select name='equipmentTypeId' id="equipmentTypeId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {userList && userList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="mb-2 me-2">
                                    <label htmlFor="caretakerName" className="form-label">Head <span className="starMandatory">*</span></label>
                                    <div className="dropdown">
                                        <button className="btn btn-light dropdown-toggle multi-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Select
                                        </button>
                                        <ul className="dropdown-menu multistyl">
                                            <li className="d-flex flex-row ps-1 gap-2">
                                                <input type="checkbox" id={-1} onChange={() => { changeHead(-1); }} />
                                                <span>select All</span>
                                            </li>

                                            {headList && headList.map((val, index) => {
                                                return (
                                                    <li className="d-flex flex-row ps-1 gap-2">
                                                        <input type="checkbox" id={val.id} onChange={() => { changeHead(val.id); }} />
                                                        <span htmlFor="val.id">{val.headName}</span>
                                                    </li>
                                                );
                                            })}

                                        </ul>
                                    </div>
                                </div>

                                <div className="mb-2 me-2">
                                    <label htmlFor="caretakerName" className="form-label">Menu <span className="starMandatory">*</span></label>
                                    <div className="dropdown">
                                        <button className="btn btn-light dropdown-toggle multi-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Select
                                        </button>
                                        <ul className="dropdown-menu multistyl">
                                            <li className="d-flex flex-row ps-1 gap-2">
                                                <input type="checkbox" id={-1} onChange={() => { changeMenu(-1); }} />
                                                <span>select All</span>
                                            </li>

                                            {menuList && menuList.map((val, index) => {
                                                return (
                                                    <li className="d-flex flex-row ps-1 gap-2">
                                                        <input type="checkbox" id={val.id} onChange={() => { changeMenu(val.id); }} />
                                                        <span>{val.menuName}</span>
                                                    </li>
                                                );
                                            })}

                                        </ul>
                                    </div>
                                </div>





                                <div className="mb-2 relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1">Save</button>
                                        <button type="button" className="btn btn-clear btn-sm mb-1">Clear</button>
                                    </div>
                                </div>
                            </BoxContainer>

                        </div>


                    </div>
                </div>


            </section>
        </>
    )
}
