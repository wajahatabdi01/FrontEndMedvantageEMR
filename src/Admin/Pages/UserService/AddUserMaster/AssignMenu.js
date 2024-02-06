import React, { useEffect } from 'react'
import { useState } from 'react';
import GetMenuMaster from '../../../../SuperAdmin/Api/Master/MenuMaster/GetMenuMaster';
import savebtn from "../../../../assets/images/icons/savebtn.svg";
import deletebtn from "../../../../assets/images/icons/deletebtn.svg";
import editbtn1 from "../../../../assets/images/icons/editbtn1.svg";
import GetHeadMaster from '../../../Api/Master/HeadMaster/GetHeadMaster';
import GetMenuByHeadId from '../../../Api/UserService/GetMenuByHeadId';
import { FindByQuery, SearchIndex, SearchIndexAll } from '../../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function AssignMenu(props) {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();
  let [menuList, setMenuList] = useState();
  const [checkMenu, setCheckMenu] = useState([]);
  let [showList, setShowList] = useState(-1)
  let [sendData, setSendData] = useState([])
  let [headList, setHeadList] = useState([])
  let [selectedHead, setSelectedHead] = useState(-1)
  let row = {
    "headId": 0,
    "assignTo": 0,
    "parentId": 0,
    "menuId": 0,
    "saveAllowed": true,
    "modifyAllowed": true,
    "deleteAllowed": true
  }
  let getData = async () => {
    // let getMenu = await GetMenuMaster();
    let getHead = await GetHeadMaster()
    // if (getMenu.status === 1) {
    //   setMenuList(getMenu.responseValue);
    // }
    if (getHead.status === 1) {
      setHeadList(getHead.responseValue)
    }

  }

  let handleHeadChange = async (e, data) => {
    let value = parseInt(e.target.value)
    // console.log("acsadds", e.target.value)
    setSelectedHead(value)
    let response = await GetMenuByHeadId(value)

    if (response.status === 1) {
      setTimeout(() => {
        let sendData = data
        let subd = { menuChecked: false, saveChecked: false, modifyChecked: false, deleteChecked: false }
        let d = { parentChecked: false }
        let temp = [...response.responseValue]
        temp.map((val, ind) => {
          Object.assign(val, d)
          val.subMenu.map((v, i) => {
            Object.assign(v, subd)
          })
        })

        let t = [...temp]
        if (sendData.length !== 0) {
          let findHead = sendData.filter(v => v.headId.toString() === value.toString())
          console.log("findHead", findHead, sendData)
          if (findHead.length !== 0) {
            temp.map((val, ind) => {

              // console.log("headdata", findHead, sendData, value)
              let findParentId = []
              if (val.subMenu.length !== 0) {
                val.subMenu.map((vl) => {
                  sendData.map((v) => {
                    if (v.menuId.toString() === vl.id.toString()) {
                      findParentId.push(v)
                    }
                  })
                  // findParentId = sendData.filter(v => v.menuId.toString() === vl.id.toString())
                })
              }
              else {
                findParentId = sendData.filter(v => v.menuId.toString() === val.id.toString())

              }
              // console.log("findParentId", findParentId, sendData, val)

              if (findParentId.length > 0) {
                console.log("find Data", findParentId, val.subMenu)
                if (findParentId.length === val.subMenu.length) {
                  t[ind].parentChecked = true;

                  val.subMenu.map((vv, ii) => {
                    // let findSubmenu = FindByQuery(sendData, vv.id, "menuId")[0]

                    let findSubmenu = sendData.filter(v => v.menuId.toString() === vv.id.toString())[0]
                    if (findSubmenu.length !== 0) {
                      if (findSubmenu.menuId !== 0) {
                        t[ind].subMenu[ii].menuChecked = true
                      }

                      if (findSubmenu.saveAllowed === true) {
                        t[ind].subMenu[ii].saveChecked = true

                      }
                      if (findSubmenu.modifyAllowed === true) {
                        t[ind].subMenu[ii].modifyChecked = true

                      }
                      if (findSubmenu.deleteAllowed === true) {
                        t[ind].subMenu[ii].deleteChecked = true

                      }
                    }
                  })
                }
                else if (val.subMenu.length === 0) {
                  t[ind].parentChecked = true;

                }
                else {
                  val.subMenu.map((vv, ii) => {
                    // let findSubmenu = FindByQuery(sendData, vv.id, "menuId")
                    let findSubmenu = sendData.filter(v => v.menuId.toString() === vv.id.toString())
                    if (findSubmenu.length !== 0) {
                      if (findSubmenu[0].menuId !== 0) {
                        t[ind].subMenu[ii].menuChecked = true
                      }

                      if (findSubmenu[0].saveAllowed === true) {
                        t[ind].subMenu[ii].saveChecked = true

                      }
                      if (findSubmenu[0].modifyAllowed === true) {
                        t[ind].subMenu[ii].modifyChecked = true

                      }
                      if (findSubmenu[0].deleteAllowed === true) {
                        t[ind].subMenu[ii].deleteChecked = true

                      }
                    }
                  })
                }



              }
              // else if (findParentId.length === 0) {
              //   t[ind].parentChecked = true;
              // }
            })
          }
          else {
            temp.map((val, ind) => {
              // let findParentId = FindByQuery(sendData, val.id, "parentId")
              let findParentId = sendData.filter(v => v.menuId.toString() === val.id.toString())
              if (findParentId.length === val.subMenu.length) {
                t[ind].parentChecked = false;
                val.subMenu.map((vv, ii) => {
                  // let findSubmenu = FindByQuery(sendData, vv.id, "menuId")[0]
                  let findSubmenu = sendData.filter(v => v.menuId.toString() === vv.id.toString())[0]
                  if (findSubmenu.length !== 0) {
                    if (findSubmenu.menuId !== 0) {
                      t[ind].subMenu[ii].menuChecked = false
                    }

                    if (findSubmenu.saveAllowed === true) {
                      t[ind].subMenu[ii].saveChecked = false

                    }
                    if (findSubmenu.modifyAllowed === true) {
                      t[ind].subMenu[ii].modifyChecked = false

                    }
                    if (findSubmenu.deleteAllowed === true) {
                      t[ind].subMenu[ii].deleteChecked = false

                    }
                  }
                })
              }
              else {
                val.subMenu.map((vv, ii) => {
                  // let findSubmenu = FindByQuery(sendData, vv.id, "menuId")
                  let findSubmenu = sendData.filter(v => v.menuId.toString() === vv.id.toString())
                  if (findSubmenu.length !== 0) {
                    if (findSubmenu[0].menuId !== 0) {
                      t[ind].subMenu[ii].menuChecked = false
                    }

                    if (findSubmenu[0].saveAllowed === true) {
                      t[ind].subMenu[ii].saveChecked = false

                    }
                    if (findSubmenu[0].modifyAllowed === true) {
                      t[ind].subMenu[ii].modifyChecked = false

                    }
                    if (findSubmenu[0].deleteAllowed === true) {
                      t[ind].subMenu[ii].deleteChecked = false

                    }
                  }
                })
              }


            })
          }

        }
        else {
          temp.map((val, ind) => {
            // let findParentId = FindByQuery(sendData, val.id, "parentId")
            let findParentId = sendData.filter(v => v.menuId.toString() === val.id.toString())
            if (findParentId.length !== 0) {
              if (findParentId.length === val.subMenu.length) {
                t[ind].parentChecked = true;
                val.subMenu.map((vv, ii) => {
                  // let findSubmenu = FindByQuery(sendData, vv.id, "menuId")[0]
                  let findSubmenu = sendData.filter(v => v.menuId.toString() === vv.id.toString())[0]
                  if (findSubmenu.length !== 0) {
                    if (findSubmenu.menuId !== 0) {
                      t[ind].subMenu[ii].menuChecked = true
                    }

                    if (findSubmenu.saveAllowed === true) {
                      t[ind].subMenu[ii].saveChecked = true

                    }
                    if (findSubmenu.modifyAllowed === true) {
                      t[ind].subMenu[ii].modifyChecked = true

                    }
                    if (findSubmenu.deleteAllowed === true) {
                      t[ind].subMenu[ii].deleteChecked = true

                    }
                  }
                })
              }
              else {
                val.subMenu.map((vv, ii) => {
                  // let findSubmenu = FindByQuery(sendData, vv.id, "menuId")
                  let findSubmenu = sendData.filter(v => v.menuId.toString() === vv.id.toString())
                  if (findSubmenu.length !== 0) {
                    if (findSubmenu[0].menuId !== 0) {
                      t[ind].subMenu[ii].menuChecked = true
                    }

                    if (findSubmenu[0].saveAllowed === true) {
                      t[ind].subMenu[ii].saveChecked = true

                    }
                    if (findSubmenu[0].modifyAllowed === true) {
                      t[ind].subMenu[ii].modifyChecked = true

                    }
                    if (findSubmenu[0].deleteAllowed === true) {
                      t[ind].subMenu[ii].deleteChecked = true

                    }
                  }
                })
              }
            }
          })
        }

        setMenuList(temp)

      }, 250)
    }

  }
  const handleToggle = (e) => {
    setShowList(parseInt(e) === showList ? -1 : parseInt(e))

  };

  let hanleChangeAll = (e) => {

    let name = e.target.name
    let id = e.target.id
    let checked = e.target.checked
    let tempmenuList = [...menuList]
    console.log("menuList", menuList, id)
    let searchResult = []
    menuList.map((val, ind) => {
      sendData.map((v) => {
        if (val.headId.toString() !== selectedHead.toString()) {
          if (val.id.toString() === id.toString()) {
            if (val.subMenu.length !== 0) {
              val.subMenu.map((vv) => {
                if (v.menuId.toString() === vv.id.toString()) {
                  // console.log("vvvv", v)
                  searchResult.push(v)
                }
              })

            }
            else {
              if (v.menuId.toString() === id.toString()) {
                // console.log("vvvv", v)
                searchResult.push(v)
              }
            }

          }
        }
        else if (val.headId.toString() === selectedHead.toString()) {
        console.log("headid ", val.headId.toString(), selectedHead.toString())

          if (val.id.toString() === id.toString()) {
            if (val.subMenu.length !== 0) {
              val.subMenu.map((vv) => {
                if (v.menuId.toString() === vv.id.toString() && v.headId.toString()  === selectedHead.toString()) {
                  // console.log("vvvv", v)
                  searchResult.push(v)
                }
              })

            }
            else {
              if (v.menuId.toString() === id.toString() && v.headId.toString()  === selectedHead.toString()) {
                // console.log("vvvv", v)
                searchResult.push(v)
              }
            }

          }
        }

      })
      // searchResult.push()
    })
    // let searchResult = sendData.filter(v => v.menuId.toString() === id.toString())
    console.log("searchResult", searchResult)
    let tempsendfinal = []
    // console.log("senddata", sendData, searchResult, id)

    if (searchResult.length === 0) {

      menuList.map((val, ind) => {
        if (val.id === parseInt(id)) {
          if (val.subMenu.length !== 0) {
            val.subMenu.map((v, i) => {

              let row = {
                "id": id,
                "headId": selectedHead,
                "assignTo": 0,
                "parentId": id,
                "menuId": v.id,
                "saveAllowed": true,
                "modifyAllowed": true,
                "deleteAllowed": true
              }

              tempmenuList[ind]["parentChecked"] = true
              tempmenuList[ind].subMenu[i]["menuChecked"] = true
              tempmenuList[ind].subMenu[i]["saveChecked"] = true
              tempmenuList[ind].subMenu[i]["modifyChecked"] = true
              tempmenuList[ind].subMenu[i]["deleteChecked"] = true
              // // console.log("check", tempmenuList)
              tempsendfinal.push(row)
              document.getElementById(v.id).checked = true
              document.getElementById(v.id + "Save").checked = true
              document.getElementById(v.id + "Edit").checked = true
              document.getElementById(v.id + "Delete").checked = true

            })
          }
          else {
            let row = {
              "headId": selectedHead,
              "assignTo": 0,
              "parentId": id,
              "menuId": id,
              "id": id
            }


            tempmenuList[ind]["parentChecked"] = true
            tempsendfinal.push(row)
          }
        }

      })
      setSendData([...sendData, ...tempsendfinal])
      props.setMenuData([...sendData, ...tempsendfinal])
      setMenuList(tempmenuList)
      tempsendfinal = []

    }
    else {
      console.log("searchResult", searchResult)
      let allIndex = SearchIndexAll(menuList, "id", id)
      console.log("id", id, allIndex)
      console.log("senddata", sendData)
      if (allIndex.length !== 0) {
        let temp = sendData
        menuList.map((val, ind) => {
          if (val.id === parseInt(id) && val.subMenu.length !== 0) {
            val.subMenu.map((v, i) => {
              tempmenuList[ind]["parentChecked"] = false
              tempmenuList[ind].subMenu[i]["menuChecked"] = false
              tempmenuList[ind].subMenu[i]["saveChecked"] = false
              tempmenuList[ind].subMenu[i]["modifyChecked"] = false
              tempmenuList[ind].subMenu[i]["deleteChecked"] = false

            })
          }
          else {
            tempmenuList[allIndex[0]]["parentChecked"] = false
          }
        })
        let temps = []
        let flag = 0
        console.log("old data", sendData, menuList)
        menuList.map((val, ind) => {
          if (val.id.toString() === id.toString()) {
            sendData.map((v, inds) => {
              if (val.subMenu.length !== 0) {
                val.subMenu.map((vv) => {
                  if (v.menuId.toString() === vv.id.toString() && v.headId.toString() === val.headId.toString()) {
                    delete temp[inds]
                  }
                })
              }
              else {
                if (flag === 0) {
                  if (v.menuId.toString() === val.id.toString() && v.headId.toString() === val.headId.toString()) {
                    delete temp[inds]
                    flag = 1
                    console.log("menuList", val, inds)
                  }

                }
              }
            })



          }
        })


        // sendData.map((val, ind) => {
        //   // console.log("cdscsdcsdcscs", val.parentId.toString() === id.toString(), val.parentId.toString(), id.toString())
        //   if (val.menuId.toString() !== id.toString()) {
        //     temp.push(val)
        //   }
        // })
        console.log("new data", temp.filter(n => n))
        setSendData([...temp.filter(n => n)])
        props.setMenuData([...temp.filter(n => n)])
        setMenuList(tempmenuList)
      }
      else {
        tempmenuList[allIndex[0]]["parentChecked"] = false
        let temp = [...sendData]
        // // console.log("cdscsdcsdcsdcsd", sendData.filter((v, i) => { // console.log(tempmenuList[allIndex[0]].id, v) }))
        temp = sendData.filter((v, i) => { return tempmenuList[allIndex[0]].id.toString() !== v.menuId.toString() })
        setSendData([...temp])
        props.setMenuData([...temp])
        setMenuList(tempmenuList)
      }


    }
  }

  let hanleChangeSubMenu = (e, ids) => {
    let parentid = ids
    let submenuId = e.target.value
    let tempmenuList = [...menuList]
    let searchResult = FindByQuery(sendData, submenuId, "menuId")
    let tempsendfinal = []
    let lenOfSubMenu = []
    let lenOfSaveSubMenu = []
    if (searchResult.length === 0) {
      menuList.map((val, ind) => {
        // // console.log("found", val.id, parseInt(id))
        if (val.id === parseInt(parentid)) {
          lenOfSubMenu = val.subMenu.length
          val.subMenu.map((v, i) => {
            if (v.id === parseInt(submenuId)) {
              document.getElementById(v.id).checked = true
              let row = {
                "headId": selectedHead,
                "assignTo": 0,
                "parentId": parentid,
                "menuId": v.id,
                "saveAllowed": true,
                "modifyAllowed": true,
                "deleteAllowed": true
              }
              tempmenuList[ind]["parentChecked"] = false
              tempmenuList[ind].subMenu[i]["menuChecked"] = true
              tempmenuList[ind].subMenu[i]["saveChecked"] = true
              tempmenuList[ind].subMenu[i]["modifyChecked"] = true
              tempmenuList[ind].subMenu[i]["deleteChecked"] = true
              tempsendfinal.push(row)
            }
          })
          lenOfSaveSubMenu = FindByQuery([...sendData, ...tempsendfinal], parentid, "parentId")
          if (lenOfSubMenu === lenOfSaveSubMenu.length) { document.getElementById(parentid).checked = true; tempmenuList[ind]["parentChecked"] = true }
        }

      })



      setSendData([...sendData, ...tempsendfinal])
      props.setMenuData([...sendData, ...tempsendfinal])
      setMenuList(tempmenuList)
      tempsendfinal = []
    }
    else {
      let allIndex = SearchIndexAll(sendData, "menuId", submenuId)
      let temp = [...sendData]

      menuList.map((val, ind) => {
        if (sendData[allIndex[0]].parentId === parseInt(parentid)) {
          val.subMenu.map((v, i) => {
            if (v.id === parseInt(submenuId)) {
              tempmenuList[ind]["parentChecked"] = false
              tempmenuList[ind].subMenu[i]["menuChecked"] = false
              tempmenuList[ind].subMenu[i]["saveChecked"] = false
              tempmenuList[ind].subMenu[i]["modifyChecked"] = false
              tempmenuList[ind].subMenu[i]["deleteChecked"] = false
            }
          })
        }
      })
      temp.splice(allIndex[0], 1)
      setSendData([...temp])
      props.setMenuData([...temp])
      setMenuList(tempmenuList)
    }

  }


  let handleChangeModify = (e, menuId, parentId) => {
    let name = e.target.value
    let temp = [...sendData]
    let tempmenuList = [...menuList]

    sendData.map((val, ind) => {
      if (parseInt(val.parentId) === parseInt(parentId) && parseInt(val.menuId) === parseInt(menuId)) {
        // save
        if (name === "Save" && val.saveAllowed === false) {

          temp[ind].saveAllowed = true
        }
        else if (name === "Save" && val.saveAllowed === true) {
          temp[ind].saveAllowed = false
        }

        // modify
        else if (name === "Edit" && val.modifyAllowed === false) {
          temp[ind].modifyAllowed = true
        }
        else if (name === "Edit" && val.modifyAllowed === true) {
          temp[ind].modifyAllowed = false
        }

        // delete
        else if (name === "Delete" && val.deleteAllowed === false) {
          temp[ind].deleteAllowed = true
        }
        else if (name === "Delete" && val.deleteAllowed === true) {
          temp[ind].deleteAllowed = false
        }

      }
    })

    menuList.map((val, ind) => {
      val.subMenu.map((v, i) => {
        if (val.id === parseInt(parentId) && v.id === parseInt(menuId)) {
          if (name === "Save" && v.saveChecked === false) {
            tempmenuList[ind].subMenu[i]["saveChecked"] = true
          }
          else if (name === "Save" && v.saveChecked === true) {
            tempmenuList[ind].subMenu[i]["saveChecked"] = false
          }

          // modify
          else if (name === "Edit" && v.modifyChecked === false) {
            tempmenuList[ind].subMenu[i]["modifyChecked"] = true
          }
          else if (name === "Edit" && v.modifyChecked === true) {
            tempmenuList[ind].subMenu[i]["modifyChecked"] = false
          }

          // delete
          else if (name === "Delete" && v.deleteChecked === false) {
            tempmenuList[ind].subMenu[i]["deleteChecked"] = true
          }
          else if (name === "Delete" && v.deleteChecked === true) {
            tempmenuList[ind].subMenu[i]["deleteChecked"] = false
          }

        }
      })

    })
    setSendData([...temp])
    props.setMenuData([...temp])
    setMenuList([...tempmenuList])

  }

  useEffect(() => {
    getData()
  }, [])


  useEffect(() => {
    if (props.editedMenutData.length !== 0) {
      if (props.callFunForEditOrRoleId === 1) {
        let newData = [...props.editedMenutData]

        // newData[ind]["headId"] = newData[ind]["headId"]
        // newData[ind]["menuId"] = newData[ind]["menuId"]
        newData[0]["assignTo"] = 0
        newData[0]["parentId"] = 0
        let response = GetMenuByHeadId(props.editedMenutData[0].headId)

        if (response.status === 1) {
          response.responseValue.map((v, i) => {
            if (v.subMenu.length !== 0) {
              // let finddata = FindByQuery(v.subMenu, val.menuId, "id")
              let finddata = FindByQuery(v.subMenu, props.editedMenutData[0].id, "id")
              if (finddata.length !== 0) {
                newData[0]["parentId"] = v.id
              }
            }
            else {


              newData[0]["parentId"] = v.id


            }
          })

          // delete newData[ind]["headId"]
          // delete newData[ind]["menuId"]
          // delete newData[ind]["id"]
        }






        document.getElementById("headIds").value = props.editedMenutData[0].headId
        // document.getElementById("Save").value = newData[0].headId
        // document.getElementById("Edit").value = newData[0].headId
        // document.getElementById("Delete").value = newData[0].headId
        setSendData([...props.editedMenutData])
        props.setMenuData([...props.editedMenutData])
        handleHeadChange({ target: { value: props.editedMenutData[0].headId } }, props.editedMenutData)
      }

      else if (props.callFunForEditOrRoleId === 0) {
        let newData = [...props.editedMenutData]

        // newData[0]["headId"] = newData[0]["headId"]
        // newData[0]["menuId"] = newData[0]["id"]
        newData[0]["assignTo"] = 0
        newData[0]["parentId"] = 0
        let response = GetMenuByHeadId(props.editedMenutData[0].headId)

        if (response.status === 1) {
          response.responseValue.map((v, i) => {

            if (v.subMenu.length !== 0) {
              let finddata = FindByQuery(v.subMenu, props.editedMenutData[0].id, "id")

              if (finddata.length !== 0) {
                newData[0]["parentId"] = v.id
              }
            }
            else {
              newData[0]["parentId"] = v.id
            }


          })
          // delete newData[0]["headId"]
          // delete newData[0]["menuId"]
          // delete newData[0]["id"]
        }


        // console.log("data", ...props.editedMenutData)
        document.getElementById("headIds").value = props.editedMenutData[0].headId
        setSendData([...props.editedMenutData])
        props.setMenuData([...props.editedMenutData])
        handleHeadChange({ target: { value: props.editedMenutData[0].headId } }, props.editedMenutData)
      }

    }

    else {
      setSendData([])
      document.getElementById("headIds").value = 0
      handleHeadChange({ target: { value: -1 } }, [])
    }

  }, [props.editedMenutData])

  return (
    <div className="col-12">
      <div className="fieldsett-in">
        <div className="fieldsett">
          <span className="fieldse">{t("Assign Menu")}</span>

          <div className="row mt-3" style={{ paddingLeft: '29px' }}>

            <div className="d-flex flex-row justify-content-right align-itmes-right" >
              <div className=" col-2 mb-2 me-2">

                <select name='headId' id="headIds" className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={(e) => { handleHeadChange(e, sendData) }}>
                  <option value="0" >{t("Select_Module")}</option>
                  {headList && headList.map((val, index) => {
                    return (
                      <option value={val.id}>{val.headName}</option>
                    )
                  })}
                </select>


              </div>
            </div>
            <div className="col-sm-12">

              <ul id="myUL" className="userIdMasterUl headList">

                {menuList && menuList.map((val, index) => {


                  return (
                    <>


                      <li className="multi">

                        <div className="orangechk">
                          {val.subMenu.length !== 0 ?
                            <div htmlFor={val.id} onClick={() => { handleToggle(val.id) }}>
                              <span className="caret" >
                                <input type="checkbox" id={val.id} value="id" name={val.id} style={{ display: 'none' }} />{" "}
                              </span>{" "}
                            </div> : <></>
                          }

                          <input type="checkbox" value="parentMenu" id={val.id} name={val.id} onChange={(e) => { hanleChangeAll(e) }} checked={val.parentChecked} />{" "}

                          <label>{val.menuName}</label>
                        </div>

                        {/* {showList === val.id ? <> */}
                        {val.subMenu && val.subMenu.map((list, ind) => {

                          return (
                            <div className="graycheckbox" id={"show" + val.id} style={{ display: `${showList === val.id ? "block" : "hiddend"}` }}>

                              <ul className={`${showList === parseInt(val.id) ? "active" : "nested"}`}>
                                <li className="crudP">
                                  <input type="checkbox" name="menuName" value={list.id} id={list.id} onClick={(e) => { hanleChangeSubMenu(e, val.id) }} checked={list.menuChecked} />{" "}
                                  <label htmlFor={list.id}>{list.menuName}</label>
                                </li>
                                <li className="crud">
                                  <input type="checkbox" id={list.id + "Save"} value="Save" checked={list.saveChecked} onClick={(e) => { handleChangeModify(e, list.id, val.id) }} />{" "}
                                  <label for="Save"> {" "} <img src={savebtn} className="icnnchk" alt="" />{" "} {t("Save")} </label>
                                </li>
                                <li className="crud">
                                  <input type="checkbox" id={list.id + "Edit"} value="Edit" checked={list.modifyChecked} onClick={(e) => { handleChangeModify(e, list.id, val.id) }} />{" "}
                                  <label for="Edit"> <img src={editbtn1} className="icnnchk" alt="" />{" "} {t("Edit")} </label>
                                </li>
                                <li className="crud">
                                  <input type="checkbox" id={list.id + "Delete"} value="Delete" checked={list.deleteChecked} onClick={(e) => { handleChangeModify(e, list.id, val.id) }} />{" "}
                                  <label for="Delete"> <img src={deletebtn} className="icnnchk" alt="" /> {t("Delete")} </label>
                                </li>
                              </ul>
                            </div>
                          )
                        })
                        }


                        {/* </> : <></>} */}
                      </li>



                    </>

                  );



                })}
              </ul>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
