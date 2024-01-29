import React, { useEffect, useRef, useState } from 'react'
import ExistingComplain from "../../../../../assets/images/OPD/existingComplain.svg"
import PatientHistory from "../../../../../assets/images/OPD/patientHistory.svg"
import PhysicalExamination from "../../../../../assets/images/OPD/physicalExamination.svg"
import ProvisionalDiagonisys from "../../../../../assets/images/OPD/provisionalDiagonisys.svg"
import OPDTopVitals from './OPDTopVitals';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";


import OPDSymptomsPopUp from './OPDSymptomsPopUp'
import OPDAllergiesPopUP from './PopUp/OPDAllergiesPopUP'
import OPDConsultantDiagnosis from './OPDConsultantDiagnosis'
import Search, { FindByQuery, SearchIndex } from '../../../../../Code/Serach'
import GetProblemList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import { useSelector } from 'react-redux'
import SaveOPDData, { GetDataPatient } from '../../../../../Code/SaveOPDData'
import Antibiogram from './PopUp/Antibiogram'
import OPDDiagnosisSuggestion from './OPDDiagnosisSuggestion'
import GetwhatToEatAndWhatToNotEate from '../../../../API/OPD/Prescription/KnowMedsAPI/GetwhatToEatAndWhatToNotEate'
import store from '../../../../../Store'
import { getPatientData } from '../../../../../Reduce/OPD/PatientData'
import DownKey, { UpKey } from "../../../../../Code/ListSelect"
import plus from '../../../../../assets/images/icons/icons8-plus-30.png'
// import Autocomplete from '../../../../Code/AutoComplete'


export default function OPDPatientInputData(props) {
    const { t } = useTranslation();
    document.body.dir = i18n.dir();

    let row = { "problemId": 0, "problemName": "", "pdmId": 0, "isProvisionalDiagnosis": true }

    let [symptomsPopUp, setSymptomsPopUp] = useState(0)
    let [allergiesPopUP, setAllergiesPopUP] = useState(0)
    let [consultantPopUP, setConsultantPopUP] = useState(0)
    let [diagnosisSuggestionPopUP, setDiagnosisSuggestionPopUP] = useState(0)
    let [disable, setDisable] = useState(0)
    let [showAntibiogram, setShowAntibiogram] = useState(0)
    let [showOnlyOneTime, setShowOnlyOneTime] = useState(0)
    let [isProvisionalDiagnosis, setIsProvisionalDiagnosis] = useState(true)

    let [problemList, setProblemList] = useState()
    let [problemListTemp, setProblemListTemp] = useState()

    let [showSearchBoxProblem, setShowSearchBoxProblem] = useState(-1)
    let [showSearchBoxProblemConsultant, setShowSearchBoxProblemConsultant] = useState(-1)


    let [sendData, setSendData] = useState([])
    let [symptomsData, setSymptomsData] = useState([])
    let [consultantData, setConsultantData] = useState([])
    let [physicalData, setPhysicalData] = useState([])

    let [physicalExaminationValue, setPhysicalExaminationValue] = useState(null)

    let patientsendData = useSelector((state) => state.PatientSendData)

    let [showDignosis, setShowDignosis] = useState(1)

    let liSelected = useRef()
    let index = useRef(-1)
    let next = useRef()
    let oldData = useRef(0)


    let getDataFood = async (data) => {
        let asenddata = data.map(val => val.problemId)
        let response = await GetwhatToEatAndWhatToNotEate(asenddata)
        // let response = await GetwhatToEatAndWhatToNotEate(['189'])
        let temp = []
        if (response.status === 1) {
            if (response.responseValue[0].notToEat.length !== 0) {
                response.responseValue[0].notToEat.map((val, ind) => {
                    let row = { "problemId": 0, "problemName": "", "pdmId": 0 }

                    row["problemId"] = val.id
                    row["problemName"] = val.foodName
                    row["pdmId"] = 10
                    temp.push(row)
                })
            }
            if (response.responseValue[0].whatToEat.length !== 0) {
                response.responseValue[0].whatToEat.map((val, ind) => {
                    let row = { "problemId": 0, "problemName": "", "pdmId": 0 }


                    row["problemId"] = val.id
                    row["problemName"] = val.foodName
                    row["pdmId"] = 9
                    temp.push(row)
                })
            }
        }
        // SaveOPDData(temp, "jsonFood");
        props.setFoodData(temp)
        // setSendData(temp)
        // store.dispatch(getPatientData(response))
    }

    let handleKeyPress = (e) => {
        let value = e.target.value;
        let name = e.target.name
        let ul = ""
        if (e.keyCode === 13) {
            if (name === "symptomsData") {
                if (showSearchBoxProblem === -1) {
                    row["problemId"] = 0
                    row["problemName"] = value
                    row["pdmId"] = 2
                }
                else {
                    ul = document.getElementById('symptomsDataList');
                    row["problemId"] = ul.getElementsByTagName('li')[index.current].value
                    row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
                    row["pdmId"] = 2
                    setShowSearchBoxProblem(-1)
                    liSelected.current = ""
                    index.current = -1
                    next.current = ""
                    oldData.current = 0
                }

                setSymptomsData([...symptomsData, row])
                setSendData([...sendData, row])

                document.getElementById(name).value = ""
                document.getElementById(name).focus()
            }
            else if (name === "consultantData") {
                if (showSearchBoxProblemConsultant === -1) {
                    row["problemId"] = 0
                    row["problemName"] = value
                    row["pdmId"] = 4
                }
                else {
                    ul = document.getElementById('consultantDataList');
                    row["problemId"] = ul.getElementsByTagName('li')[index.current].value
                    row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
                    row["pdmId"] = 4
                    setShowSearchBoxProblemConsultant(-1)
                    liSelected.current = ""
                    index.current = -1
                    next.current = ""
                    oldData.current = 0
                }
                setConsultantData([...consultantData, row])
                setSendData([...sendData, row])

                document.getElementById(name).value = ""
                document.getElementById(name).focus()
            }
            // else if (name === "physicalData") {

            //     row["problemId"] = 0
            //     row["problemName"] = value
            //     row["pdmId"] = 6

            //     setPhysicalData([...physicalData, row])
            //     setSendData([...sendData, row])

            //     document.getElementById(name).value = ""
            //     document.getElementById(name).focus()
            // }
        }

        else if (e.keyCode === 40) {
            // down
            if (name === "symptomsData") {
                if (showSearchBoxProblem !== -1) {
                    ul = document.getElementById('symptomsDataList');
                    DownKey(ul, liSelected, index, next, oldData)
                }
            }
            else if (name === "consultantData") {
                if (showSearchBoxProblemConsultant !== -1) {
                    ul = document.getElementById('consultantDataList');
                    DownKey(ul, liSelected, index, next, oldData)
                }

            }

        }

        else if (e.keyCode === 38) {
            // Up
            if (name === "consultantData") {
                if (showSearchBoxProblem !== -1) {
                    ul = document.getElementById('symptomsDataList');
                    UpKey(ul, liSelected, index, next, oldData)

                }
            }
            else if (name === "consultantData") {
                if (showSearchBoxProblemConsultant !== -1) {
                    ul = document.getElementById('consultantDataList');
                    UpKey(ul, liSelected, index, next, oldData)
                }

            }

        }
    }

    let getdata = async () => {

        let response = await GetProblemList();
        try {
            if (response.status === 1) {
                setProblemList(response.responseValue)
                setProblemListTemp(response.responseValue)
            }
        }

        catch (e) {

        }
    };

    let handleSearch = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let data = [...sendData].filter(n => n)

        try {
            liSelected.current = ""
            index.current = -1
            next.current = ""
            if (value != "") {
                if (name === "symptomsData") {
                    let response = FindByQuery(problemList, value, "problemName")
                    if (response.length != 0) {
                        setProblemListTemp(response)
                        setShowSearchBoxProblem(1)
                    }
                    else {
                        // let t = 0
                        // row["problemId"] = 0
                        // row["problemName"] = value
                        // row["pdmId"] = 2
                        // let temp = [...data]
                        // let flag = 0
                        // data.map((val, ind) => {
                        //     if (val.pdmId === 2 && val.problemId === 0) {
                        //         temp[ind]["problemName"] = value
                        //         flag = 1
                        //     }
                        // })
                        // if (flag != 1) {
                        //     setSendData([...data, row])
                        // }
                        // else {
                        //     setSendData([...temp])
                        // }
                        // // sendData.map((val, ind) => {
                        // //     if (val != null) {
                        // //         if (val.pdmId === 2) {
                        // //             data.splice(ind, 1);
                        // //             setSendData([...data, row])
                        // //             t = 1;
                        // //         }
                        // //     }
                        // // })
                        // // if (t === 0) {
                        // //     setSendData([...data, row])

                        // // }
                        // // setSendData([...data, row])
                        // setProblemListTemp([])
                        // setShowSearchBoxProblem(-1)
                        setShowSearchBoxProblem(-1)


                    }

                }
                else if (name === "consultantData") {

                    let response = FindByQuery(problemList, value, "problemName")
                    if (response.length != 0) {
                        setProblemListTemp(response)
                        setShowSearchBoxProblemConsultant(1)
                    }
                    else {
                        // let t = 0
                        // row["problemId"] = 0
                        // row["problemName"] = value
                        // row["pdmId"] = 4
                        // let temp = [...data]
                        // let flag = 0
                        // data.map((val, ind) => {
                        //     if (val.pdmId === 4 && val.problemId === 0) {
                        //         temp[ind]["problemName"] = value
                        //         flag = 1
                        //     }
                        // })
                        // if (flag != 1) {
                        //     setSendData([...data, row])
                        // }
                        // else {
                        //     setSendData([...temp])
                        // }
                        // // sendData.map((val, ind) => {
                        // //     if (val != null) {
                        // //         if (val.pdmId === 4) {
                        // //             data.splice(ind, 1);
                        // //             setSendData([...data, row])
                        // //             t = 1;
                        // //         }
                        // //     }
                        // // })
                        // // if (t === 0) {
                        // //     setSendData([...data, row])

                        // // }
                        // // setSendData([...data, row])

                        // setProblemListTemp([])
                        setShowSearchBoxProblemConsultant(-1)

                    }

                }
                else if (name === "physicalData") { }
                // else if (name === "physicalData") {
                //     // setPhysicalExaminationValue(value)
                //     let t = 0
                
                //     row["problemId"] = 0
                //     row["problemName"] = value
                //     row["pdmId"] = 6
                //     setPhysicalExaminationValue(row)


                //     let temp = [...data]
                //     let flag = 0
                //     data.map((val, ind) => {
                //         if (val.pdmId === 6 && val.problemId === 0) {
                //             temp[ind]["problemName"] = value
                //             flag = 1
                //         }
                //     })
                //     if (flag != 1) {
                //         setSendData([...data, row])
                //     }
                //     else {
                //         setSendData([...temp])
                //     }
                //     // sendData.map((val, ind) => {
                //     //     if (val != null) {
                //     //         if (val.pdmId === 6) {
                //     //             data.splice(ind, 1);
                //     //             setSendData([...data, row])
                //     //             t = 1;
                //     //         }
                //     //     }
                //     // })
                //     // if (t === 0) {
                //     //     setSendData([...data, row])

                //     // }
                // }
            }
            else {

                setShowSearchBoxProblem(-1)
                setShowSearchBoxProblemConsultant(-1)
            }
        }
        catch (e) {

        }


    }

    let handleClick = (boxname, id, name) => {
        let data = [...sendData].filter(n => n)
        try {
            if (boxname === "symptomsData") {
                let t = 0
                row["problemId"] = id
                row["problemName"] = name
                row["pdmId"] = 2
                setShowSearchBoxProblem(-1)
                let flag = 0
                symptomsData.map((v, i) => {
                    if (v.problemId === id) {
                        flag = 1
                        return
                    }
                })
                if (flag === 0) {
                    setSendData([...data, row])
                    setSymptomsData([...symptomsData, row])
                }
                let r = SearchIndex(problemList, "problemName", name)
                let tt = [...problemList]
                tt.splice(r, 1)
                setProblemList(tt)

                let temp = [...data]
                data.map((val, ind) => {
                    if (val.pdmId === 4 && val.problemId === 0) {
                        delete temp[ind]
                    }
                })
                setSendData([...temp.filter(n => n), row])

                document.getElementById("symptomsData").focus()

                // sendData.map((val, ind) => {
                //     if (val != null) {
                //         if (val.pdmId === 2) {
                //             data.splice(ind, 1);
                //             setSendData([...data, row])
                //             setSymptomsData([...symptomsData, row])

                //             t = 1;
                //         }
                //     }
                // })
                // if (t === 0) {
                
                //     setSendData([...data, row])

                //     setSymptomsData([...symptomsData, row])
                // }
                // setSendData([...data, row])
                document.getElementById("symptomsData").value = "";
            }
            else if (boxname === "consultantData") {
                let t = 0
                row["problemId"] = id
                row["problemName"] = name
                row["pdmId"] = 4
                setShowSearchBoxProblemConsultant(-1)

                let flag = 0
                consultantData.map((v, i) => {
                    if (v.problemId === id) {
                        flag = 1
                        return
                    }
                })
                if (flag === 0) {
                    setSendData([...data, row])
                    setConsultantData([...consultantData, row])
                }
                let r = SearchIndex(problemList, "problemName", name)
                let tt = [...problemList]
                tt.splice(r, 1)
                setProblemList(tt)


                let temp = [...data]
                data.map((val, ind) => {
                    if (val.pdmId === 4 && val.problemId === 0) {
                        delete temp[ind]
                    }
                })
                setSendData([...temp.filter(n => n), row])
                // getDataFood([...consultantData, row])



                // sendData.map((val, ind) => {
                //     if (val != null) {
                //         if (val.pdmId === 4) {
                //             data.splice(ind, 1);
                //             setSendData([...data, row])
                //             setConsultantData([...consultantData, row])

                //             t = 1;
                //         }
                //     }
                // })
                // if (t === 0) {
                //     setSendData([...data, row])
                //     setConsultantData([...consultantData, row])

                // }
                // setSendData([...data, row])
                document.getElementById("consultantData").focus();

                document.getElementById("consultantData").value = "";
            }
        }
        catch (e) { }


    }

    let handleIsProvisionalDiagnosis = () => {
        if (isProvisionalDiagnosis === true) {
            let temp = [...sendData]
            sendData.map((val, ind) => {
                if (val.pdmId === 4) {
                    temp[ind].isProvisionalDiagnosis = false
                }
            })
            setSendData([...temp])
            setIsProvisionalDiagnosis(false)
        }
        else {
            let temp = [...sendData]
            sendData.map((val, ind) => {
                if (val.pdmId === 4) {
                    temp[ind].isProvisionalDiagnosis = true
                }
            })
            setSendData([...temp])
            setIsProvisionalDiagnosis(true)
        }
       
    }

    let handleRemove = (ind, problemId, name) => {
        


        try {
            let tempsymptomsData = [...symptomsData]
            let tempconsultantData = [...consultantData]
            let tempphysicalData = [...physicalData]
            let tempSenddata = [...sendData]
            let flag = 0
            

            if (name === "symptomsData") {
                sendData.map((val, ind) => {
                    if (val.pdmId === 2 && val.problemId === problemId) {
                        tempSenddata.splice(ind, 1)
                        return
                    }
                })
                symptomsData.map((val, inde) => {
                    
                    if (val.pdmId === 2 && val.problemId === problemId) {
                        tempsymptomsData.splice(inde, 1)
                        return
                    }
                })

            }
            else if (name === "physicalData") {
                sendData.map((val, ind) => {
                    if (val.pdmId === 6 && val.problemId === problemId) {
                        tempSenddata.splice(ind, 1)
                        return
                    }
                })
                physicalData.map((val, inde) => {
                    
                    if (val.pdmId === 6 && val.problemId === problemId) {
                        tempphysicalData.splice(inde, 1)
                        return
                    }
                })
            }
            else if (name === "consultantData") {
                sendData.map((val, ind) => {
                    if (val.pdmId === 4 && val.problemId === problemId) {
                        tempSenddata.splice(ind, 1)
                        return
                    }
                })
                consultantData.map((val, inde) => {
                    
                    if (val.pdmId === 4 && val.problemId === problemId) {
                        tempconsultantData.splice(inde, 1)
                        return
                    }
                })

            }
            // sendData.map((val, index) => {

            //     if (val.pdmId === 2 && val.problemId === problemId) {
            //         
            //         tempSenddata.splice(ind, 1)
            //         symptomsData.map((val, inde) => {
            //            
            //             if (val.pdmId === 2 && val.problemId === problemId) {
            //                 tempsymptomsData.splice(inde, 1)
            //             }
            //         })
            //     }
            //     else if (val.pdmId === 4 && val.problemId === problemId) {
            //         tempSenddata.splice(ind, 1)
            //         // setSendData(tempSenddata)

            //         consultantData.map((val, inde) => {
            //             if (val.pdmId === 4 && val.problemId === problemId) {
            //                 tempconsultantData.splice(inde, 1)
            //             }

            //         })


            //     }
            //     else if (val.pdmId === 6 && val.problemId === problemId) {
            //         
            //         tempSenddata.splice(ind, 1)
            //         // setSendData(tempSenddata)
            //         physicalData.map((val, inde) => {
            //             if (val.pdmId === 6 && val.problemId === 0) {
            //                 tempphysicalData.splice(inde, 1)
            //             }
            //         })



            //     }


            // })
            
            setSymptomsData(tempsymptomsData)
            setConsultantData(tempconsultantData)
            setPhysicalData(tempphysicalData)
            setSendData(tempSenddata)

        }

        catch (e) { }
        // console.log("senddata", tempSenddata)
    }

    useEffect(() => {
        getdata()

        if (props.values === 1) {
            setData()
            props.funh(0)
        }
    }, [props.values === 1])

    useEffect(() => {

        SaveOPDData(sendData, "jsonDiagnosis");

    }, [sendData])

    let setData = () => {
        // props.setNoYes()
        try {
            setSymptomsData([])
            setConsultantData([])
            setPhysicalData([])
            setSendData([])
            document.getElementById("symptomsData").value = ""
            document.getElementById("consultantData").value = ""
            setPhysicalExaminationValue(null)
            let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
            let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
            let symptomsDatas = []
            let consultantDatas = []
            let physicalexamination = []
            temp.map((value, index) => {
                value.map((val, ind) => {
                    if (value[0] === activeUHID) {
                        let key = Object.keys(val)
                        if (key[0] === "jsonDiagnosis") {
                            if (val.jsonDiagnosis[0] != null) {
                                val.jsonDiagnosis.map((val, ind) => {
                                    if (val != null) {
                                        if (val.pdmId === 2) {
                                            setSymptomsData([...symptomsDatas, val])
                                            symptomsDatas.push(val)
                                        }
                                        if (val.pdmId === 4) {
                                            if (val.isProvisionalDiagnosis === 1 || val.isProvisionalDiagnosis === true) {

                                                setIsProvisionalDiagnosis(true)
                                            }
                                            else {
                                                setIsProvisionalDiagnosis(false)

                                            }
                                            setConsultantData([...consultantDatas, val])
                                            consultantDatas.push(val)
                                        }
                                        if (val.pdmId === 6) {

                                            setPhysicalExaminationValue(val)
                                            setPhysicalData([...physicalexamination, val])
                                            physicalexamination.push(val)
                                        }

                                    }
                                })
                            }
                            
                            // setSendVitals(val.jsonVital)
                        }
                        else if (key[0] === "disable") {
                            setDisable(val.disable)
                        }

                    }

                })

            })

            setSendData([...symptomsDatas, ...consultantDatas, ...physicalexamination])
            symptomsDatas = []
            consultantDatas = []
        }
        catch (e) { }
    }

    let handleChnage = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let data = [...sendData].filter(n => n)

        try {
            liSelected.current = ""
            index.current = -1
            next.current = ""
            if (value != "") {
                if (name === "symptomsData") {
                    let response = FindByQuery(problemList, value, "problemName")
                    if (response.length != 0) {
                        setProblemListTemp(response)
                        setShowSearchBoxProblem(1)
                    }
                    else {
                        // let t = 0
                        // row["problemId"] = 0
                        // row["problemName"] = value
                        // row["pdmId"] = 2
                        // let temp = [...data]
                        // let flag = 0
                        // data.map((val, ind) => {
                        //     if (val.pdmId === 2 && val.problemId === 0) {
                        //         temp[ind]["problemName"] = value
                        //         flag = 1
                        //     }
                        // })
                        // if (flag != 1) {
                        //     setSendData([...data, row])
                        // }
                        // else {
                        //     setSendData([...temp])
                        // }
                        // // sendData.map((val, ind) => {
                        // //     if (val != null) {
                        // //         if (val.pdmId === 2) {
                        // //             data.splice(ind, 1);
                        // //             setSendData([...data, row])
                        // //             t = 1;
                        // //         }
                        // //     }
                        // // })
                        // // if (t === 0) {
                        // //     setSendData([...data, row])

                        // // }
                        // // setSendData([...data, row])
                        // setProblemListTemp([])
                        // setShowSearchBoxProblem(-1)
                        setShowSearchBoxProblem(-1)


                    }

                }
                else if (name === "consultantData") {

                    let response = FindByQuery(problemList, value, "problemName")
                    if (response.length != 0) {
                        setProblemListTemp(response)
                        setShowSearchBoxProblemConsultant(1)
                    }
                    else {
                        // let t = 0
                        // row["problemId"] = 0
                        // row["problemName"] = value
                        // row["pdmId"] = 4
                        // let temp = [...data]
                        // let flag = 0
                        // data.map((val, ind) => {
                        //     if (val.pdmId === 4 && val.problemId === 0) {
                        //         temp[ind]["problemName"] = value
                        //         flag = 1
                        //     }
                        // })
                        // if (flag != 1) {
                        //     setSendData([...data, row])
                        // }
                        // else {
                        //     setSendData([...temp])
                        // }
                        // // sendData.map((val, ind) => {
                        // //     if (val != null) {
                        // //         if (val.pdmId === 4) {
                        // //             data.splice(ind, 1);
                        // //             setSendData([...data, row])
                        // //             t = 1;
                        // //         }
                        // //     }
                        // // })
                        // // if (t === 0) {
                        // //     setSendData([...data, row])

                        // // }
                        // // setSendData([...data, row])

                        // setProblemListTemp([])
                        setShowSearchBoxProblemConsultant(-1)

                    }

                }
                else if (name === "physicalData") {
                    if (physicalExaminationValue === null) {
                        row["problemId"] = 0
                        row["problemName"] = value
                        row["pdmId"] = 6
                        setPhysicalExaminationValue(row)
                    }
                    else {
                        row["problemId"] = 0
                        row["problemName"] = value
                        row["pdmId"] = 6
                        setPhysicalExaminationValue(row)

                    }
                    let temp = [...data]
                    let flag = 0
                    data.map((val, ind) => {
                        if (val.pdmId === 6 && val.problemId === 0) {
                            temp[ind]["problemName"] = value
                            flag = 1
                        }
                    })
                    if (flag != 1) {
                        setSendData([...data, row])
                    }
                    else {
                        setSendData([...temp])
                    }
                    // sendData.map((val, ind) => {
                    //     if (val != null) {
                    //         if (val.pdmId === 6) {
                    //             data.splice(ind, 1);
                    //             setSendData([...data, row])
                    //             t = 1;
                    //         }
                    //     }
                    // })
                    // if (t === 0) {
                    //     setSendData([...data, row])

                    // }
                }
                // else if (name === "physicalData") {
                //     // setPhysicalExaminationValue(value)
                //     let t = 0
                
                //     row["problemId"] = 0
                //     row["problemName"] = value
                //     row["pdmId"] = 6
                //     setPhysicalExaminationValue(row)


                //     let temp = [...data]
                //     let flag = 0
                //     data.map((val, ind) => {
                //         if (val.pdmId === 6 && val.problemId === 0) {
                //             temp[ind]["problemName"] = value
                //             flag = 1
                //         }
                //     })
                //     if (flag != 1) {
                //         setSendData([...data, row])
                //     }
                //     else {
                //         setSendData([...temp])
                //     }
                //     // sendData.map((val, ind) => {
                //     //     if (val != null) {
                //     //         if (val.pdmId === 6) {
                //     //             data.splice(ind, 1);
                //     //             setSendData([...data, row])
                //     //             t = 1;
                //     //         }
                //     //     }
                //     // })
                //     // if (t === 0) {
                //     //     setSendData([...data, row])

                //     // }
                // }
            }
            else {
                row["problemId"] = 0
                row["problemName"] = ""
                row["pdmId"] = 6
                setPhysicalExaminationValue(row)

                setShowSearchBoxProblem(-1)
                setShowSearchBoxProblemConsultant(-1)
            }
        }
        catch (e) {

        }
    }

    useEffect(() => {
        setData()
    }, [patientsendData])


    return (
        <div className='p-0 m-0' >
            <div className={`d-flex flex-column gap-2`} >
                <OPDTopVitals values={props.values} funh={props.funh} />
                <div className={`row p-0 m-0 gap-2 gap-lg-0 `} >
                    <div className='col-12 p-0  boxcontainer'>
                        <div className='d-flex flex-column'>
                            <div className={`row p-0 m-0 opd-prescription-box `} >
                                <div className='p-3 m-0  col-sm-3 col-12 img-text-box-back-opd'>
                                    <div className='d-flex flex-row gap-2  m-0 pdata' onClick={() => { }}>
                                        <img src={ExistingComplain} className='ps-3_' alt='' />
                                        <label>{t("CHIEF_COMPLAINTS")}</label>
                                    </div>
                                </div>
                                <div className='p-2 m-0 col-sm-9 col-12'>

                                    
                                    {/* <input autoComplete="off" type="text" className='text-box-opd ' placeholder={t("ENTER_CHIEF_COMPLAINTS")} name="symptomsData" id="symptomsData" onChange={(e) => { handleChnage(e) }} onKeyDown={handleKeyPress} disabled={disable === 1 ? true : false} />
                                    <div className='d-flex justify-content-end flex-wrap'>
                                    <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2"><img src={plus} className='icnn' alt='' /></button>
                                    </div> */}

                                    <div className="input-container col-md-12 row">
                                        <div className='col-md-11'>
                                        <input autoComplete="off"    type="text"   className="text-box-opd" placeholder={t("ENTER_CHIEF_COMPLAINTS")} name="symptomsData" id="symptomsData" onChange={(e) => { handleChnage(e) }} onKeyDown={handleKeyPress}
                                            disabled={disable === 1 ? true : false}/>
                                        </div>
                                        
                                    <div className="col-md-1 d-flex justify-content-end align-items-center">
                                        <button type="button" className="btn btn-sm btn-save-fill mb-1 ms-2">
                                             <img src={plus} className="icnn" alt="" />
                                        </button>
                                     </div>
                                    </div>

                                     
                                    {showSearchBoxProblem === 1 ?
                                        <div id="symptomsDataListdiv" className='position-absolute opdmedicationsearchbox'>
                                            <ul id="symptomsDataList">
                                                {problemListTemp && problemListTemp.map((val, ind) => {
                                                    return (
                                                        [6, 7].map((id, index) => {
                                                            if (val.problemTypeID === id) {
                                                                return (

                                                                    <li className='pointer' onClick={(e) => { handleClick("symptomsData", val.id, val.problemName) }}>{val.problemName}</li>
                                                                )
                                                            }
                                                        })
                                                    )
                                                })}
                                            </ul>
                                            <div className='full-screen-div-opd' onClick={() => { setShowSearchBoxProblem(0) }}></div>
                                        </div>
                                        : ""}

                                    <div className='d-flex flex-wrap gap-2' style={{ overflowX: "auto", height: '40px' }}>

                                        {
                                            symptomsData && symptomsData.map((val, ind) => {
                                                return (
                                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2 ps-2 pe-2 opdcancletab'>
                                                        <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                                        <i className="fa-solid fa-xmark" onClick={() => { handleRemove(ind, val.problemId, "symptomsData") }}></i>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='row p-0 m-0 opd-prescription-box'>
                                <div className='p-3 m-0  col-sm-3 col-12 img-text-box-back-opd'>
                                    <div className='d-flex flex-row gap-2  m-0 pdata'>
                                        <img src={PhysicalExamination} className='' alt='' />
                                        <label>{t("History of Patient Illness")}</label>
                                    </div>
                                </div>
                                <div className='p-2 m-0 col-sm-9 col-12'>
                                    <input autoComplete="off" type="text" className='text-box-opd' style={{ height: "45px" }} placeholder={t('Enter History of Patient Illness')} value={physicalExaminationValue !== null ? physicalExaminationValue.problemName : ""} name="physicalData" id="physicalData" onChange={handleChnage} onKeyDown={handleKeyPress} disabled={disable === 1 ? true : false} />
                                    {/* <div className='d-flex flex-wrap gap-2' style={{ overflowX: "auto", height: '40px' }}>

                                        {
                                            physicalData && physicalData.map((val, ind) => {
                                                return (
                                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2 ps-2 pe-2 opdcancletab'>
                                                        <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                                        <i className="fa-solid fa-xmark" onClick={() => { handleRemove(ind, val.problemId, "physicalData") }}></i>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> */}

                                </div>

                                {/* <div className='p-2 m-0 col-sm-2 col-4'>4</div> */}
                            </div>
                            <div className='row p-0 m-0 opd-prescription-box'>
                                <div className='p-3 m-0  col-sm-3 col-12 img-text-box-back-opd'>
                                    <div className='d-flex flex-row gap-2  m-0 pdata'>
                                        <img src={ProvisionalDiagonisys} className='ps-3_' alt='' />
                                        <label>{t("Consultant Diagnosis")}</label>
                                    </div>


                                    <div className="d-flex regularCheck column-gap-2 px-2 align-items-center mt-1 justify-content-end">
                                        <label className='provd' htmlFor='provisionalDiagnosis'>{t("Provisional Diagnosis")}</label>
                                        <div className="form-check"><input className="form-check-input" type="checkbox" id="provisionalDiagnosis" checked={isProvisionalDiagnosis === true ? true : false} onClick={handleIsProvisionalDiagnosis} /></div>
                                    </div>


                                </div>
                                <div className='p-2 m-0 col-sm-7 col-12'>

                                    <input autoComplete="off" type="text" className='text-box-opd ' placeholder={t('Enter Consultant Diagnosis')} name='consultantData' id="consultantData" onKeyDown={handleKeyPress} onChange={(e) => { handleSearch(e) }} onClick={() => { showDignosis === 1 ? setDiagnosisSuggestionPopUP(1) : setDiagnosisSuggestionPopUP(0); setShowDignosis(0) }} disabled={disable === 1 ? true : false} />
                                    {showSearchBoxProblemConsultant === 1 ?
                                        <div id="consultantDataListdiv" className='position-absolute opdmedicationsearchbox'>
                                            <ul id="consultantDataList">
                                                {problemListTemp && problemListTemp.map((val, ind) => {
                                                    return (
                                                        [1, 2, 3, 4].map((id, ind) => {
                                                            if (val.problemTypeID === id) {
                                                                return (

                                                                    <li className='pointer' onClick={(e) => { handleClick("consultantData", val.id, val.problemName) }}>{val.problemName}</li>
                                                                )
                                                            }
                                                        })
                                                    )
                                                })}
                                            </ul>
                                            <div className='full-screen-div-opd' onClick={() => { setShowSearchBoxProblemConsultant(0) }}></div>

                                        </div>
                                        : ""}

                                    <div className='d-flex flex-wrap gap-2' style={{ overflowX: "auto", height: "40px" }}>
                                        {
                                            consultantData && consultantData.map((val, ind) => {
                                                return (
                                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2 ps-2 pe-2 opdcancletab'>
                                                        <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                                        <i className="fa-solid fa-xmark" onClick={() => { handleRemove(ind, val.problemId, "consultantData") }}></i>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="col-sm-2 img-text-box-back-opd linkAntibiogram mantibio-cn">
                                    <div className='mantibio'><a href='##' data-bs-toggle="modal" data-bs-target="#modalAntibiogram"> <i className="bi bi-virus"></i> {t("Show Antibiogram")}</a></div>
                                    <div className='mantibio'><a href="##" onClick={() => { disable ? setDiagnosisSuggestionPopUP(0) : setDiagnosisSuggestionPopUP(1) }} > <i className="fa fa-stethoscope" aria-hidden="true" ></i>{t("Diagnosis Suggestion")}</a></div>
                                </div>
                                {/* onClick={symptomsData.length !== 0 ? () => { setDiagnosisSuggestionPopUP(1) } : ""} */}




                                {/* <div className='p-2 m-0 col-sm-2 col-4 m-0 p-0'>
                                    <div className='d-flex flex-column m-0 p-0'>
                                        <span className='ps-2 mb-1 opdpatientcomplaintright' style={{ background: "red" }}>Allergies</span>
                                        <span className='ps-2 mb-1 opdpatientcomplaintright' style={{ background: "#F29A16" }}>Follow up Case</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className='col-12 col-lg-4 p-2 pt-2 pt-lg-0 boxcontainer' style={{ borderLeft: "10px solid #F2F6FE" }}>

                        <Heading text="Abnormal Reports" />
                        <div className='overflow-auto' style={{ height: "212px" }}>
                            <TableContainer>
                                <tbody>
                                    <tr>
                                        <td>
                                            Serum Alkaline Phosphatase
                                        </td>
                                        <td style={{ color: "#2D8AF5" }}>219 U/L</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Serum Alkaline Phosphatase
                                        </td>
                                        <td style={{ color: "#2D8AF5" }}>219 U/L</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Serum Alkaline Phosphatase
                                        </td>
                                        <td style={{ color: "#2D8AF5" }}>219 U/L</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Serum Alkaline Phosphatase
                                        </td>
                                        <td style={{ color: "#2D8AF5" }}>219 U/L</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Serum Alkaline Phosphatase
                                        </td>
                                        <td style={{ color: "#2D8AF5" }}>219 U/L</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Serum Alkaline Phosphatase
                                        </td>
                                        <td style={{ color: "#2D8AF5" }}>219 U/L</td>
                                    </tr>
                                </tbody>
                            </TableContainer>
                        </div>

                    </div> */}
                </div>
            </div>
            {

                symptomsPopUp ? <OPDSymptomsPopUp val={symptomsPopUp} fun={setSymptomsPopUp} /> : ""
            }

            {
                allergiesPopUP ? <OPDAllergiesPopUP val={allergiesPopUP} fun={setAllergiesPopUP} /> : ""
            }

            {/* {
                consultantPopUP ? <OPDConsultantDiagnosis val={consultantPopUP} fun={setConsultantPopUP} /> : ""
            } */}
            {
                diagnosisSuggestionPopUP ? <OPDDiagnosisSuggestion val={diagnosisSuggestionPopUP} fun={setDiagnosisSuggestionPopUP} setConsultantData={setConsultantData} consultantData={consultantData} setSendData={setSendData} sendData={sendData} calling={0} /> : ""
            }


            {/* ######################## Moodal Pop Area #################### */}

            <Antibiogram setShowAntibiogram={setShowAntibiogram} />





        </div>
    )
}

