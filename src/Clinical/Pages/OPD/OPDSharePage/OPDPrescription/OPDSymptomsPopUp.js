import React, { useEffect, useState } from 'react'
import ChestPain from "../../../../../assets/images/OPD/ChestPain.svg"
import searcIcon from "../../../../../assets/images/Navbar/search.svg"
import GetProblemList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import Loader from '../../../../../Component/Loader';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDSymptomsPopUp(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();


    let [problemList, setProblemList] = useState()
    let [problemListTemp, setProblemListTemp] = useState()
    let [showloder, setShowloder] = useState(1)

    let getdata = async () => {
        let response = await GetProblemList()
        if (response.status === 1) {
            setShowloder(0)
            setProblemList(response.responseValue)
            setProblemListTemp(response.responseValue)
        }
    }
    let onQuickSearchChangeHandler = (objectArray, serachData) => {
        let quickResult = objectArray.filter(obj => Object.values(obj).some(val => val ? val.toString().toLowerCase().includes(serachData) : false));
        return quickResult;
    }

    let handleSearch = (e) => {
        let value = e.target.value;
        if (value != "") {
            let response = onQuickSearchChangeHandler(problemList, value)
            setProblemList(response)
        }
        else{
            setProblemList(problemListTemp)
        }
    }


    useEffect(() => {
        getdata()
    }, [])

    return (
        <>
            <div className={`${props.val === 0 ? 'offcanvas' : "offcanvas show"}   offcanvas-end`} style={{ width: "400px" }} data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="symptoms" aria-labelledby="symptomsLabel">
                <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                    <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { props.fun(0) }}><i className='fa fa-close ' ></i></div>
                    <h5 className="offcanvas-title text-white" id="symptomsLabel" >{t("Select Symptoms")}</h5>
                    {/* <button type="button" className="btn-close"  ></button> */}
                </div>
                <div className="offcanvas-body ps-4 pe-3" >
                    <div className='d-flex flex-column   pt-2 gap-3'>
                        <div className='d-flex flex-column searchbar gap-1  pt-2 mb-3'>
                            <input type='text' className='ps-3 pe-5 pb-2 pt-2 serchbox' placeholder={t("Search your Symptoms")} onChange={handleSearch}/>
                            <img src={searcIcon} className='rightsidebarsearchicon' />
                        </div>
                        <div className='d-flex flex-column gap-1'>
                            {problemList && problemList.map((val, ind) => {
                                return (

                                    <span className='ps-4 p-2 departmentList d-flex flex-row gap-3' ><img src={ChestPain} /><label>{val.problemName}</label></span>
                                )
                            })}
                        </div>


                    </div>
                </div>
                <Loader val={showloder}/>
            </div>
        <div className="offcanvas-backdrop fade show"></div>

        </>



    )
}
