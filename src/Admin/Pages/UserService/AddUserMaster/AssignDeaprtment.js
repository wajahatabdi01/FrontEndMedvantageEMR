import React from 'react'
import { useState } from 'react'
import GetHeadMaster from '../../../Api/Master/HeadMaster/GetHeadMaster'
import GetDepartmentMaster from '../../../../SuperAdmin/Api/Master/DepartmentMaster/GetDepartmentMaster'
import { useEffect } from 'react'
import { FindByQuery, SearchIndex } from '../../../../Code/Serach'
import AlertToster from '../../../../Component/AlertToster'
import GetHeadDepartmentMappingByHeadId from '../../../Api/UserService/GetHeadDepartmentMappingByHeadId'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function AssignDeaprtment(props) {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();

  let [departmentList, setDepartmentList] = useState([])
  let [departmentListTemp, setDepartmentListTemp] = useState([])
  let [headList, setHeadList] = useState([])
  let [sendData, setSendData] = useState([])
  let [selectedHead, setSelectedHead] = useState(-1)
  let [shoowAlert, setShowAlert] = useState(0)
  let [shoowAlertMsg, setShowAlertMsg] = useState(0)
  let [dummyData, setDummyData] = useState(0)
  let row = {
    "assignTo": 0,
    "headID": 0,
    "departmentId": 0,
    "departmentName": ""
  }
  let handleOnChange = (e) => {
    let id = parseInt(e.target.id)

    let res = sendData.filter(v => v.departmentId === id)
    let dep = res.filter(v => v.headID === selectedHead)
    let temp = []
    temp = [...departmentList]
    let tempSendData = [...sendData]
    if (dep.length === 0) {

      row = {
        "assignTo": 0,
        "headID": selectedHead,
        "departmentId": id,
        "departmentName": e.target.name
      }
      departmentList.map((val, ind) => {
        if (val.departmentId === id) {
          temp[ind].checked = true
        }
      })

      if ([...sendData, row].length === departmentListTemp.length) {
        document.getElementById("selectAllDepartment").checked = true
      }
      setDepartmentList(temp)
      setSendData([...tempSendData, row])
      props.setDepartmentdata([...tempSendData, row])
    }
    else {
      sendData.map((v, i) => {
        if (v.headID === selectedHead && v.departmentId === id) {
          tempSendData.splice(i, 1)
          let index =temp.findIndex(val=>val.departmentId === id) 
          temp[index].checked = false
          document.getElementById(id).checked = false
          document.getElementById("selectAllDepartment").checked = false
        }
      })

      setDepartmentList(temp)
      setSendData([...tempSendData])
      props.setDepartmentdata([...tempSendData])
    }
 

  }

  let getDepartment = async (id) => {
    let getDepartment = await GetHeadDepartmentMappingByHeadId(id);
    if (getDepartment.status === 1 && getDepartment.responseValue.length !== 0) {
      setDepartmentList(getDepartment.responseValue.map(v => ({ ...v, checked: false, id: v.departmentID })))
      setDepartmentListTemp(getDepartment.responseValue.map(v => ({ ...v, checked: false, id: v.departmentID })))
      return getDepartment.responseValue.map(v => ({ ...v, checked: false, id: v.departmentID }))
    }
    else {
      setDepartmentList([])
      setDepartmentListTemp([])
      return []
    }
  }
  let getData = async () => {
    let getHead = await GetHeadMaster();
    if (getHead.status === 1) {
      setHeadList(getHead.responseValue);
    }

  }

  let handleHeadChange = async (e, data) => {
    let value = parseInt(e.target.value)

    setSelectedHead(value)
    let departmentListTemp = await getDepartment(value)
    setTimeout(() => {
      if (value !== -1) {
        let sendData = data
        // let deptFalse = departmentListTemp.map(v => ({ ...v, checked: false,  id: v.departmentID }))
        let deptFalse = departmentListTemp

        let temp = [...deptFalse]

        // let headdata = FindByQuery(sendData, value, "headID")
        let headdata = sendData.filter(v => v.headID === value)
        if ((headdata.length === departmentListTemp.length)) {
          document.getElementById("selectAllDepartment").checked = true
        }
        else {
          document.getElementById("selectAllDepartment").checked = false
        }
        if (headdata.length !== 0 && headdata !== undefined) {
          headdata.map((v, i) => {
            let findIndex = departmentListTemp.findIndex(val=>val.departmentId === v.departmentId)
            if (findIndex !== -1) {

              document.getElementById(temp[findIndex].departmentId).checked = true;

              temp[findIndex].checked = true
            }
          })
        }
        else {
          departmentListTemp.map((v, i) => {
            document.getElementById(v.departmentId).checked = false;
            temp[i].checked = false
          })
        }
        setDepartmentList(temp)
      }
      else {
        document.getElementById("selectAllDepartment").checked = false
      }
    }, 200)

  }

  let handleAllSelect = () => {
    // let findHead = FindByQuery(sendData, selectedHead.toString(), "headID")
    let findHead = sendData.filter(val=>val.headID.toString() === selectedHead.toString())
    let temp = []

    if (findHead.length !== 0) {
      if (findHead.length === departmentListTemp.length) {
        temp = [...sendData]
        departmentListTemp.map((val, ind) => {
          document.getElementById(val.departmentId).checked = false
          departmentList[ind].checked = false
          sendData.map((vals, inds) => {
            if (vals.deptID === val.id && vals.headID === selectedHead) {
              delete temp[inds]
            }
          })
        })

        setSendData(temp.filter(item => item))
        props.setDepartmentdata(temp.filter(item => item))
      }
      else {
        temp = [...sendData]
        departmentListTemp.map((val, ind) => {
          document.getElementById(val.departmentId).checked = false
          departmentList[ind].checked = false
          sendData.map((vals, inds) => {
            if (vals.deptID === val.id && vals.headID === selectedHead) {
              delete temp[inds]
            }
          })
        })
        let afterRemove = temp.filter(item => item)
        temp = []
        document.getElementById("selectAllDepartment").checked = true
        departmentListTemp.map((val, ind) => {
          document.getElementById(val.departmentId).checked = true
          row = {
            "assignTo": 0,
            "headID": selectedHead,
            "departmentId": val.departmentId,
            "departmentName": val.departmentName
          }
          departmentList[ind].checked = true
          temp.push(row)
        })
        setSendData([...afterRemove, ...temp])
        props.setDepartmentdata([...afterRemove, ...temp])

        setDepartmentList(departmentList)
      }

    }
    else if (findHead.length === 0) {
      document.getElementById("selectAllDepartment").checked = true
      departmentListTemp.map((val, ind) => {
        document.getElementById(val.departmentId).checked = true
        row = {
          "assignTo": 0,
          "headID": selectedHead,
          "departmentId": val.departmentId,
          "departmentName": val.departmentName
        }
        departmentList[ind].checked = true
        temp.push(row)
      })
      setSendData([...sendData, ...temp])
      props.setDepartmentdata([...sendData, ...temp])

      setDepartmentList(departmentList)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (props.editedDepartmentData.length !== 0) {
      if (props.callFunForEditOrRoleId === 0) {


        let newData = [...props.editedDepartmentData]

        newData[0]["assignTo"] = 0

        document.getElementById("headId").value = newData[0].headID
        setSendData([...newData])
        props.setDepartmentdata([...newData])
        handleHeadChange({ target: { value: newData[0].headID } }, newData)
      }
      else if (props.callFunForEditOrRoleId === 1) {

        let newData = [...props.editedDepartmentData]

        newData[0]["assignTo"] = 0

        document.getElementById("headId").value = newData[0].headID
        setSendData([...newData])
        props.setDepartmentdata([...newData])
        handleHeadChange({ target: { value: newData[0].headID } }, newData)
      }
    }
    else {
      setSendData([])
      document.getElementById("headId").value = -1
      handleHeadChange({ target: { value: -1 } }, [])
    }
  }, [props.editedDepartmentData])



  return (
    <div className="col-12">
      <div className="fieldsett-in">
        <div className="fieldsett">
          <span className="fieldse">{t("Assign Department")}</span>
          <div className="row mt-2 px-2">
            <div className="col-sm-10">
              <ul className="headList" style={{ display: `${selectedHead === -1 ? "none" : departmentList.length === 0 ? "none" : "block"}` }}>
                <li className="Headlist-in regularCheck d-flex gap-1">
                  <div className="form-check" >
                    <input className="form-check-input" type="checkbox" id="selectAllDepartment" onChange={handleAllSelect} defaultChecked={false} />
                  </div>
                  <label htmlFor="All">{t("Select All")}</label>
                </li>
              </ul>
            </div>
            <div className="col-sm-2" style={{ float: "right" }}>
              <div className="mb-2 me-2">
                <select name='headId' id="headId" onChange={(e) => handleHeadChange(e, sendData)} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value={"-1"}>{t("Select Module")}</option>
                  {headList && headList.map((val, index) => {
                    return (
                      <option value={val.id}>{val.headName}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row mt-2 px-2"  >
            <div className="col-sm-12" style={{ display: `${selectedHead !== -1 ? "block" : "none"}` }}>
              <ul className="headList">
                {/* {selectedHead !== -1 ? */}

                <>
                  {departmentList && departmentList.map((val, index) => {
                    return (
                      <>
                        <li className="Headlist-in regularCheck d-flex gap-1">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id={val.departmentId} name={val.departmentName} onClick={handleOnChange} checked={val.checked} />
                          </div>
                          <label htmlFor={val.departmentId} >{val.departmentName}</label>
                        </li>
                      </>
                    );
                  })}
                </>
                {/* : ""
                } */}



              </ul>

            </div>
          </div>
        </div>
      </div>
      {
        shoowAlert === 1 ? <AlertToster handle={setShowAlert} message={shoowAlertMsg} /> : ""
      }
    </div>
  )
}
