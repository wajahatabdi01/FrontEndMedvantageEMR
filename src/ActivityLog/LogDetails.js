import React, { useEffect, useState } from "react";
import Toster from "../Component/Toster";
import TosterUnderProcess from "../Component/TosterUnderProcess";
import Loader from "../Component/Loader";
import SuccessToster from "../Component/SuccessToster";
import AlertToster from "../Component/AlertToster";
import BoxContainer from "../Component/BoxContainer";
import Heading from "../Component/Heading";
import GetLogDetails from "./Api/GetLogDetails";
import TableContainer from "../Component/TableContainer";
import noDataImage from '../assets/images/icons/No data-rafiki.svg';
import { t } from "i18next";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function LogDetails() {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    let [showLoder, setShowLoder] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let[logList,setLogList]=useState([]);
    let[pageSize,setPageSize]=useState(20);
    let[activePageNumber,setActivePageNumber]=useState(1);
    let curdate = () => {

        const currentDate = new Date();

        const year = currentDate.getFullYear();

        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        const day = String(currentDate.getDate()).padStart(2, '0');
     
        const formattedDate = `${year}-${month}-${day}`;

        document.getElementById("fromDate").value=formattedDate;
        document.getElementById("toDate").value=formattedDate;

       

    };
    const getLogDetails= async()=>{
        let fromDate=document.getElementById("fromDate").value;
        let toDate=document.getElementById("toDate").value;
        let getPageNo=document.getElementById("ddlPagination").value;
        setActivePageNumber(getPageNo)
        var obj={
            fromDate:fromDate,
            toDate:toDate,
            pSize:pageSize,
            pNumber:getPageNo
        }
        
        setShowLoder(1)
        let response = await GetLogDetails(obj);
      
        if(response.status === 1){
            setLogList(response.responseValue)
            setShowLoder(0);
        }
        else{
            setShowLoder(0);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue)
        }
    }
    let handlerNextPage= async()=>{
        
        let getPageNo=0;
        let fromDate=document.getElementById("fromDate").value;
        let toDate=document.getElementById("toDate").value;
        
        getPageNo=parseInt(activePageNumber)+1;
        getPageNo < 4 ? document.getElementById("ddlPagination").value=getPageNo:document.getElementById("ddlPagination").value=3;
        setActivePageNumber(getPageNo)
        var obj={
            fromDate:fromDate,
            toDate:toDate,
            pSize:pageSize,
            pNumber:getPageNo
        }
      
        setShowLoder(1)
        let response = await GetLogDetails(obj);
       
        if(response.status === 1){
            setLogList(response.responseValue)
            setShowLoder(0);
        }
        else{
            setShowLoder(0);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue)
        }
    }
    let handlerPreviousPage= async()=>{
        let getPageNo=0;
        let fromDate=document.getElementById("fromDate").value;
        let toDate=document.getElementById("toDate").value;
        
        getPageNo=parseInt(activePageNumber)-1;
        getPageNo < 4 ? document.getElementById("ddlPagination").value=getPageNo:document.getElementById("ddlPagination").value=3;
        setActivePageNumber(getPageNo)
        var obj={
            fromDate:fromDate,
            toDate:toDate,
            pSize:pageSize,
            pNumber:getPageNo
        }
        
        setShowLoder(1)
        let response = await GetLogDetails(obj);
       
        if(response.status === 1){
            setLogList(response.responseValue)
            setShowLoder(0);
        }
        else{
            setShowLoder(0);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue)
        }
    }
    let handleClear=()=>{
        curdate();
        setLogList([]);
        setActivePageNumber(1);
        document.getElementById("ddlPagination").value=1;
    }
    useEffect(()=>{
        curdate();
       setTimeout(()=>{
        getLogDetails();
       },1000);
    },[]);
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text={t("Log_Details")}/>
                             <BoxContainer>
                            <div className="col-2 mb-2 me-2">
                                <label htmlFor="TestName" className="form-label">{t("From Date")}</label>
                                <input type="date" className="form-control form-control-sm" name="fromDate" id="fromDate"  />
                                <small id="errFromDate" className="form-text text-danger" style={{ display: 'none' }}></small>

                            </div>
                            <div className="col-2 mb-2 me-2">
                                <label htmlFor="TestName" className="form-label">{t("To Date")}</label>
                                <input type="date" className="form-control form-control-sm" name="toDate" id="toDate"  />
                                <small id="errToDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                            </div>
                            <div className="mb-2 relative">
                                <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                <div>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={getLogDetails}>{t("Show")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>{t("Clear")}</button>
                                             
                                </div>
                            </div>
                            </BoxContainer> 
                        </div>
                        <div className="col-12 mt-2">
                            {/* <Heading text={t("All_Test_List")} /> */}
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Activity_Type")}</th>
                                            <th>{t("Remark")}</th>
                                            <th>{t("DATE")}</th>
                                            <th style={{width:'70%'}}>{t("Activity_Log")}</th>
                                           
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            logList.length > 0 ?
                                            logList && logList.map((val, ind) => {
                                                const parser=val.activityLog ? JSON.parse(val.activityLog) :[];
                                                const arrayFromObject=Object.entries(parser).map(([key, value]) => ({ key, value }));
                                                
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.activityType}</td>
                                                    <td>{val.remark}</td>
                                                    <td>{val.formatDate}</td>
                                                    <td>
                                                        <div className="text-break">
                                                            <table>
                                                            
                                                                <thead>
                                                                {arrayFromObject.map((li)=>{
                                                                    return(
                                                                        <th>{li.key}</th>
                                                                    )
                                                                })}
                                                                </thead>    
                                                                <tbody>
                                                                {arrayFromObject.map((li)=>{
                                                                    return(
                                                                        <td>{li.value}</td>
                                                                    )
                                                                })}
                                                                </tbody>    

                                                               
                                                           
                                                            {/* {arrayFromObject.map((li)=>{
                                                                return(
                                                               <>
                                                               <thead>
                                                                    <th>{li.key}</th>
                                                                </thead>
                                                                <tbody>
                                                                
                                                                    <td>{li.value}</td>
                                                                    
                                                                </tbody> 
                                                               </>
                                                                )
                                                            })} */}
                                                            </table>
                                                        </div>
                                                  
                                                    </td>
                                                    
                                                </tr>
                                            )
                                        }):
                                        <div className="imageNoDataFound">
                                        <img src={noDataImage} />
                                        </div>
                                        }


                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                {/* <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={'handleDelete'} data-bs-dismiss="modal">{t("Delete")}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

                            </div>
                            <div className="pagginationSection">
                                        <div className="paginationItemContainer">
                                            <div className="d-flex gap-2 align-items-center">
                                                <span className="spanText" style={{ minWidth: '140px' }}> {t("THE_PAGE_YOU_ARE_ON")}</span>
                                                <select name="" id="ddlPagination" className="form-select form-select-sm pagginationDrp" onChange={getLogDetails}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                            <div className="d-flex gap-2 align-items-center">
                                                <span className="spanText">{t("Previous")}</span> <i className="bi bi-arrow-left" onClick={handlerPreviousPage}></i>
                                                <span>{activePageNumber}</span>
                                                <i className="bi bi-arrow-right" onClick={handlerNextPage}></i> <span className="spanText">{t("NEXT")}</span>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
                {
                    showLoder === 1 ? <Loader val={showLoder} /> : ""
                }
                {/* {
                    isShowToaster === 1 ?
                        <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
                } */}

                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }
            </section>
        </>
    )
} 