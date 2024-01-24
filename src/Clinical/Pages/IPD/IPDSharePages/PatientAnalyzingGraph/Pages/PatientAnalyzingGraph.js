import React, { useEffect, useState } from 'react'
import Heading from '../../../../../../Components/Heading';
import BoxContainer from '../../../../../../Components/BoxContainer';
import Supplements from '../../../../../../assets/images/PatientAnalyzingGraph/Supplements.svg'
import Vital from '../../../../../../assets/images/PatientAnalyzingGraph/Vital.svg'
import Nutrient from '../../../../../../assets/images/PatientAnalyzingGraph/Nutrient.svg'
import Investigation from '../../../../../../assets/images/PatientAnalyzingGraph/Investigation.svg'
import ECGData from '../../../../../../assets/images/PatientAnalyzingGraph/ECGData.svg'
import IntakeType from '../../../../../../assets/images/PatientAnalyzingGraph/IntakeType.svg'
import date from '../../../../../../assets/images/PatientAnalyzingGraph/date.svg'
import time from '../../../../../../assets/images/PatientAnalyzingGraph/time.svg'
import GetInvestigationList from '../API/GetInvestigationList';
import DropdownWithSearch from '../../../../../../Components/DropdownWithSearch';
import GetVitalList from '../API/GetVitalList';
import GetSupplimentList from '../API/GetSupplimentList';
import GetFoodList from '../API/GetFoodList';
import GetNutrientList from '../API/GetNutrientList';
import GetPatientAnalysingGraph from '../API/GetPatientAnalysingGraph';
import { HighchartsReact } from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import Highcharts from 'highcharts';
import { type } from '@testing-library/user-event/dist/type';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function PatientAnalyzingGraph() {
  const {t} = useTranslation();
    document.body.dir = i18n.dir()

  HighchartsExporting(Highcharts);
  let [investigationList, setInvestigationList] = useState();
  let [selectedInvestigationList, setSelectedInvestigationList] = useState([]);
  let [vitalList, setVitalList] = useState();
  let [selectedVitalList, setSelectedVitalList] = useState([{ id: 1, vitalName: "Height" }, { id: 3, vitalName: "Pulse" }, { id: 4, vitalName: "BP_Sys" }, { id: 6, vitalName: "BP_Dias" }]);
  let [supplimentList, setSupplimentList] = useState();
  let [selectedSupplimentList, setSelectedSupplimentList] = useState([]);
  let [foodList, setFoodList] = useState();
  let [selectedFoodList, setSelectedFoodList] = useState([]);
  let [nutrientList, setNutrientList] = useState();
  let [selectedNutrientList, setSelectedNutrientList] = useState([]);
  let [ecgList, setEcgList] = useState();
  let [selectedEcgList, setSelectedEcgList] = useState([]);
  let [toHour, setToHour] = useState('');
  let [fromTime, setFromTime] = useState('');
  let [intakeType, setIntakeType] = useState('');
  let [fromDate, setFromDate] = useState('');
  let [sendSelectedVitals, setSendSelectedVitals] = useState('');
  let UHID = JSON.parse(window.sessionStorage.getItem('IPDactivePatient')).Uhid ? JSON.parse(window.sessionStorage.getItem('IPDactivePatient')).Uhid : [];
  let [graph, setGraph] = useState();
  let [backColos, setBackColos] = useState([])

  let getInvestigationList = async () => {
    var response = await GetInvestigationList();
    
    if (response.status === 1) {
     
      setInvestigationList(response.responseValue)
    }
  }
  let getVitalList = async () => {
    var response = await GetVitalList();
    
    if (response.status === 1) {
     
      setVitalList(response.responseValue)
    }
  }
  let getSupplimentList = async () => {
    var response = await GetSupplimentList();
  
    if (response.status === 1) {
     
      setSupplimentList(response.responseValue)
    }
  }
  let getFoodList = async () => {
    var response = await GetFoodList();
   
    if (response.status === 1) {     
      setFoodList(response.responseValue)
    }
  }
  let getNutrientList = async () => {
    var response = await GetNutrientList();
    
    if (response.status === 1) {
      setNutrientList(response.responseValue)
    }
  }
  let getEcgList = async () => {
    let ecgArr = [{ ecgName: 'I' }, { ecgName: 'II' }, { ecgName: 'III' }, { ecgName: 'AVR' }, { ecgName: 'AVL' }, { ecgName: 'AVF' }, { ecgName: 'V1' }, { ecgName: 'V2' }, { ecgName: 'V3' }, { ecgName: 'V4' }, { ecgName: 'V5' }, { ecgName: 'V6' },]
    setEcgList(ecgArr)

  }
  //Handle Start Here
  let handleChange = (e) => {
    document.getElementById('errInvestigation').style.display = "none";
    document.getElementById('errVital').style.display = "none";
    document.getElementById('errSupplement').style.display = "none";
    document.getElementById('errNutrient').style.display = "none";
    document.getElementById('errFoodSupplementDrug').style.display = "none";
    document.getElementById('errECG').style.display = "none";
    //  setSelectedInvestigationList(e.target.value)
    if (e.target.name === "investigation") {
      var data = e.target.value;
      let arr = [...selectedInvestigationList];
      for (var i = 0; i < investigationList.length; i++) {
        if (investigationList[i].id === data) {
          if (arr.length === 0) {
            arr.push({
              id: investigationList[i].id,
              testname: investigationList[i].testname
            });
          }
          else {
            var index = arr.findIndex((val) => val.id == investigationList[i].id);
            if (index != -1) {
              document.getElementById('errInvestigation').style.display = "block";
            }
            else {
              arr.push({
                id: investigationList[i].id,
                testname: investigationList[i].testname
              });
            }
          }
          setSelectedInvestigationList(arr)

          break;
        }
      }
    }
    if (e.target.name === "Vital") {
      var slctdVital = e.target.value;
      var arr = [...selectedVitalList];
      // var tempVitalList=[...selectedVitalList];
      for (var i = 0; i < vitalList.length; i++) {
        if (vitalList[i].id === slctdVital) {
          if (arr.length === 0) {
            arr.push({
              id: slctdVital,
              vitalName: vitalList[i].vitalName
            });
          }
          else {
            var index = arr.findIndex((val) => val.id === slctdVital);
            if (index !== -1) {
              document.getElementById('errVital').style.display = "block";
            }
            else {
              arr.push({
                id: slctdVital,
                vitalName: vitalList[i].vitalName
              });
            }
          }
          setSelectedVitalList(arr);
        }
      }
    }
    if (e.target.name === "Supplement") {
      var slctdSupplement = e.target.value;
      var arr = [...selectedSupplimentList]
      for (var i = 0; i < supplimentList.length; i++) {
        if (supplimentList[i].supplimentId === slctdSupplement) {
          if (arr.length === 0) {
            arr.push({
              supplimentId: slctdSupplement,
              supplimentName: supplimentList[i].supplimentName
            });
          }
          else {
            var index = arr.findIndex((val) => val.supplimentId === slctdSupplement);
            if (index !== -1) {
              document.getElementById('errSupplement').style.display = "block";
            }
            else {
              arr.push({
                supplimentId: slctdSupplement,
                supplimentName: supplimentList[i].supplimentName
              });
            }
          }
          setSelectedSupplimentList(arr);
        }
      }
    }
    if (e.target.name === "Nutrient") {
      var slctdNutrient = e.target.value;
      var arr = [...selectedNutrientList]
      for (var i = 0; i < nutrientList.length; i++) {
        if (nutrientList[i].id === slctdNutrient) {
          if (arr.length === 0) {
            arr.push({
              id: slctdNutrient,
              nutrientName: nutrientList[i].nutrientName
            });
          }
          else {
            var index = arr.findIndex((val) => val.id === slctdNutrient);
            if (index !== -1) {
              document.getElementById('errNutrient').style.display = "block";
            }
            else {
              arr.push({
                id: slctdNutrient,
                nutrientName: nutrientList[i].nutrientName
              });
            }
          }
          setSelectedNutrientList(arr);
        }
      }
    }
    if (e.target.name === "FoodSupplementDrug") {
      var slctdFoodSupplementDrug = e.target.value;
      var arr = [...selectedFoodList]
      for (var i = 0; i < foodList.length; i++) {
        if (foodList[i].id === slctdFoodSupplementDrug) {
          if (arr.length === 0) {
            arr.push({
              id: slctdFoodSupplementDrug,
              foodName: foodList[i].foodName
            });
          }
          else {
            var index = arr.findIndex((val) => val.id === slctdFoodSupplementDrug);
            if (index !== -1) {
              document.getElementById('errFoodSupplementDrug').style.display = "block";
            }
            else {
              arr.push({
                id: slctdFoodSupplementDrug,
                foodName: foodList[i].foodName
              });
            }
          }
          setSelectedFoodList(arr);
        }
      }
    }
    if (e.target.name === "ECG") {
      var slctdECG = e.target.value;
      var arr = [...selectedEcgList]
      for (var i = 0; i < ecgList.length; i++) {
        if (ecgList[i].ecgName === slctdECG) {
          if (arr.length === 0) {
            arr.push({
              ecgName: slctdECG,
            });
          }
          else {
            var index = arr.findIndex((val) => val.ecgName === slctdECG);
            if (index !== -1) {
              document.getElementById('errECG').style.display = "block";
            }
            else {
              arr.push({
                ecgName: slctdECG,
              });
            }
          }
          setSelectedEcgList(arr);
        }
      }
    }
    if (e.target.name === "fromDate") {
      setFromDate(e.target.value);
    }
    if (e.target.name === "fromTime") {
      setFromTime(e.target.value);
    }



  }
  //Used To Remove Selected Vitals
  let removeSelectedVital = (index) => {
    var tempArr = [...selectedVitalList]
    tempArr.splice(index, 1);
    setSelectedVitalList(tempArr)
  }
  //Used To Remove Selected Investigation
  let removeSelectedInvestigation = (index) => {
    var tempArr = [...selectedInvestigationList]
    tempArr.splice(index, 1);
    setSelectedInvestigationList(tempArr)
  }
  //Used To Remove Selected Supplement
  let removeSelectedSupplement = (index) => {
    var tempArr = [...selectedSupplimentList]
    tempArr.splice(index, 1);
    setSelectedSupplimentList(tempArr)
  }
  //Used To Remove Selected Nutrient
  let removeSelectedNutrient = (index) => {
    var tempArr = [...selectedNutrientList]
    tempArr.splice(index, 1);
    setSelectedNutrientList(tempArr)
  }
  //Used To Remove Selected Food Supplement Drug
  let removeSelectedFoodSupplemntDrg = (index) => {
    var tempArr = [...selectedFoodList]
    tempArr.splice(index, 1);
    setSelectedFoodList(tempArr)
  }
  //Used To Remove Selected Food Supplement Drug
  let removeSelectedEcg = (index) => {
    var tempArr = [...selectedEcgList]
    tempArr.splice(index, 1);
    setSelectedEcgList(tempArr)
  }
  //Used To Search 
  let handleSearch = async () => {
    var vitalColName = "";
    var investigationColName = "";
    let fromTimeFormat = "";
    const ddlToHour = document.getElementById('ddlToHour').value;
    let hrEle = fromTime.split(':')[0];
    let minEle = fromTime.split(':')[1];
    if (hrEle >= 0 && hrEle <= 24 && minEle >= 0 && minEle <= 60) {
      let AMorPM = 'AM';
      if (hrEle >= 12) AMorPM = 'PM';
      hrEle = (hrEle % 12);
      fromTimeFormat = hrEle === 0 ? 12 + ':' + minEle + ' ' + AMorPM : hrEle + ':' + minEle + ' ' + AMorPM;
    }

    for (var i = 0; i < selectedVitalList.length; i++) {
      vitalColName = vitalColName + selectedVitalList[i].id + ',';
    }
    for (var i = 0; i < selectedInvestigationList.length; i++) {
      investigationColName = investigationColName + selectedInvestigationList[i].id + ',';
    }
    // if (fromTimeFormat === "") {
    //   document.getElementById('errFromDate').style.display = "block";
    // }
    // else if (fromDate === "") {
    //   document.getElementById('errFromDate').style.display = "block";
    // }
    // else if (ddlToHour === "0") {
    //   document.getElementById('errToHour').style.display = "block";
    // }
    // else {
      var obj = {
        // UHID: "UHID00347",
        // UHID: "UHID00181",
        // date: fromDate,
        // timeFrom: fromTimeFormat,
        // toHour: ddlToHour,
        // vitalIdSearch: vitalColName,
        // subtestIDSearch: investigationColName
        UHID: "UHID00347",
        date: "2023-07-25",
        timeFrom: "10:00 AM",
        toHour: "24",
        vitalIdSearch: vitalColName,
      }
      let response = await GetPatientAnalysingGraph(obj);
      if (response.status === 1) {
        graphData(response.responseValues);
      }
    // }
  }
  //Used To Make Data For Graph
  let graphData = (values) => {
    let arrInvestigation = [];
    let arrVitals = [];
    let investigation = "";
    let arrLabel = [];
    let seriesArr = [];
    let a = []

    for (var i = 0; i < values.length; i++) {
      if (values[i].investigation !== "") {
        var getData = JSON.parse(values[i].investigation);
        // if(values)

        // for (var j = 0; j < getData.length; j++) {
        // if(investigation === ""){

        //   investigation = investigation + getData[j].subTestName+' - '+ getData[j].result ;
        // }
        // else{
        //   investigation =  investigation + ',' + getData[j].subTestName+' - '+ getData[j].result ;
        // }
        //  investigation = investigation + getData[j].subTestName+'-'+getData[j].result +','
        // arrInvestigation.push({
        //      type:'spline',
        //      name:investigation,
        //      y:investigation,
        // });
        getData.map((val, ind) => {
          let t = [val.subTestName + "-" + val.result + " "]
          a.push(t)
        })
        arrInvestigation.push({
          type: 'line',
          name: a,
          y: 12
        });
        a = []
        // }
      }
      else {
        arrInvestigation.push({
          type: 'line',
          name: [],
        });
      }
    }
    //Vitals


    var seriesVital = [];

    for (var j = 0; j < selectedVitalList.length; j++) {
      var data = [];

      for (var k = 0; k < values.length; k++) {
        if (values[k].vitalDetails !== "") {
          var vital = JSON.parse(values[k].vitalDetails);
          for (var s = 0; s < vital.length; s++) {
            if (vital[s].vmID == selectedVitalList[j].id) {
              data.push({
                name: values[k].valueDateTime,
                y: Number(vital[s].vmValue) > 0 ? Number(vital[s].vmValue) : null
              });
            }
          }
        }


      }

      seriesArr.push({
        name: selectedVitalList[j].vitalName,
        data: data,
        type: "line"
      });
    }






    // for (var k = 0; k < values.length; k++) {
    //   var data = [];
    //     if(values[k].vitalDetails !== ""){
    //        var vital = JSON.parse(values[k].vitalDetails);
    //         for (var s = 0; s < vital.length; s++) {            
    //                 data.push({
    //                     name: vital[s].vitalName,
    //                     y: Number(vital[s].vmValue) > 0? Number(vital[s].vmValue) : null,
    //                 }); 
    //         }
    //         // seriesVital.push({
    //         //     name: 'vital List',
    //         //     data: data
    //         // });
    //         seriesArr.push({
    //           name: data,
    //           data: data
    //         });
    //     }
    // }

    // for(var j = 0; j < values.length; j++){
    //   if(values[j].vitalDetails !== ""){
    //     var getVitalData=JSON.parse(values[j].vitalDetails);
    //     getVitalData.map((val)=>{
    //       arrVitals.push({
    //         name:val.vitalName,
    //         data:val.vmValue
    //       })
    //     });
    //   }
    // }
    for (var k = 0; k < values.length; k++) {
      arrLabel.push(values[k].valueDateTime);
    }
    let backColor = []

    arrLabel.map((val, ind) => {
      if (val.split(" ")[1] >= "06:00:00" && val.split(" ")[1] <= "19:00:00") {

        let t = {
          id: 'test',
          from: ind, // Start of the plot band
          to: ind + 1, // End of the plot band
          color: '#252931',// Color value
          //  color: 'rgba(255, 0, 0, 0.2)',
          label: {
            //  text: 'Important Range',
            align: 'center',
            useHTML: true

          }
        }
        backColor.push(t)

      }
      if (val.split(" ")[1] > "19:00:00" && val.split(" ")[1] < "06:00:00") {

        let t = {
          id: 'test',
          from: ind, // Start of the plot band
          to: ind + 1, // End of the plot band
          color: '#4a4844',// Color value
          //  color: 'rgba(255, 0, 0, 0.2)',
          label: {
            //  text: 'Important Range',
            align: 'center',
            useHTML: true

          }
        }
        backColor.push(t)

      }
    })
    setBackColos([...backColor])
    seriesArr.push({
      name: "Investigation",
      data: arrInvestigation
    });

    // grapConfig(arrLabel, seriesArr,arrVitals)
    grapConfig(arrLabel, seriesArr, seriesVital,backColor)
  }


  let grapConfig = (labelData, seriesData, vitalSeriesData,backColor) => {

    let daynightdata = [labelData.map((val, ind) => val.split(" ")[1])]
    setGraph({
      chart: {
        displayErrors: true,
        // scrollablePlotArea: {
        //   minWidth: 100,
        //   opacity: 0.6
        // },
        // plotBackgroundImage: 'http://www.java2s.com/style/download.png',

        zoomType: "xy",
      },
      title: {
        text: 'Patient Analyzing Graph'
      },

      yAxis: {
        gridLineWidth: 0.4,
        gridLineColor: '#4F5659',
        title: {
          text: 'Values'
        }
      },

      xAxis: {

        gridLineWidth: 0.4,
        gridLineColor: '#4F5659',
        categories: labelData,
        type: "category",
        // min: 0,
        // max:50,
        plotBands: [backColor]


        ,

        labels: {
          rotation: -45,

          // step: 1 // Show all labels without skipping

        },
        breaks: [{
          from: 0,
          to: 0,
          breakSize: 1
        }],

        scrollbar: {
          enabled: true
        },

      },
      tooltip: {
        formatter: function () {
          return '<b>Name:</b> ' + this.series.name + '<br><b>Time:</b> ' + this.key + '<br> <b>Value:</b> ' + this.y;
        }

        //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
      },


      exporting: {
        enabled: true
      },


      plotOptions: {
        series: {
          // pointWidth: 50,
          dataLabels: {
            align: 'top',
            enabled: true,
          },
        },

      },
      series: [
        ...seriesData
      ],
      // series: [
      //   ...vitalSeriesData
      // ],
      credits: {
        enabled: false,
      }

    })
  }


  useEffect(() => {
    getInvestigationList();
    getVitalList();
    getSupplimentList();
    getFoodList();
    getNutrientList();
    getEcgList();
  }, []);
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">

            <div className="col-12">
              <div className='whitebg'>
                <div className="row">
                  <div className="col-md-8 col-sm-12">
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span className='fieldse'>{t("Patient Analyzing Graph")}</span>

                        <div className='row px-1 py-3'>

                          <div className="col-md-4 col-sm-12">
                            <div className="mb-2 me-2">
                              <img src={Supplements} className='icnn' />
                              <label htmlFor="Supplements" className="form-label">{t("Supplements")}</label>
                              <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedSupplimentList([]) }}><i className='fa fa-minus'></i></span>
                              {/* <input type="text" className="form-control form-control-sm" id="Supplements" name="Supplements" placeholder="Enter Supplements" /> */}
                              {supplimentList && <DropdownWithSearch defaulNname={t("Select Supplement")} name="Supplement" list={supplimentList} valueName="supplimentId" displayName="supplimentName" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlSuppliment" />}
                              <small id="errSupplement" className="form-text text-danger" style={{ display: 'none' }}>{t("Supplement Already Selected")}</small>
                              <div className="addvalue narrt1">
                                {selectedSupplimentList && selectedSupplimentList.map((val, index) => {
                                  return (
                                    <div className="addvalue-in">{val.supplimentName}<span className="closeadd" onClick={() => { removeSelectedSupplement(index) }}><i className="fa fa-times"></i></span></div>
                                  )
                                })}
                              </div>
                              {/* <div className='chksel'>
                                        <div className='chksel-in'> 
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className=""  />
                                             <span>Food/Supp..</span>
                                          </label>
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className="" />
                                             <span>DVT</span>
                                          </label>
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className=""  />
                                             <span>ECG Data</span>
                                          </label>
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className=""  />
                                             <span>Investigation</span>
                                          </label>
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className=""  />
                                             <span>RT HOLD</span>
                                          </label>
                                        </div>
                                        
                                        
                                      </div> */}
                            </div>
                            <div className="mb-2 me-2">
                              <div className='deat'>
                                <img src={Nutrient} className='icnn' />
                                <label htmlFor="Nutrient" className="form-label">{t("Nutrient")}</label>
                                <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedNutrientList([]) }}><i className='fa fa-minus' ></i></span>
                                {nutrientList && <DropdownWithSearch defaulNname={t("Select Nutrient")} name="Nutrient" list={nutrientList} valueName="id" displayName="nutrientName" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlNutrient" />}
                                <small id="errNutrient" className="form-text text-danger" style={{ display: 'none' }}>{t("Nutrient Already Selected")}</small>
                                <div className="addvalue narrt1">
                                  {selectedNutrientList && selectedNutrientList.map((val, index) => {
                                    return (
                                      <div className="addvalue-in">{val.nutrientName}<span className="closeadd" onClick={() => { removeSelectedNutrient(index) }}><i className="fa fa-times"></i></span></div>

                                    )
                                  })}
                                  {/* <div className="addvalue-in">Sodium<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                          <div className="addvalue-in">Potassium<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                          <div className="addvalue-in">Calcium<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                          <div className="addvalue-in">Magnisium<span className="closeadd"><i className="fa fa-times"></i></span></div> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4 col-sm-12">
                            <div className="mb-2 me-2">
                              <div className='deat'>
                                <img src={Vital} className='icnn' />
                                <label htmlFor="Vital" className="form-label">{t("Vital")}</label>
                                <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedVitalList([]) }}><i className='fa fa-minus'></i></span>
                                {/* <input type="text" className="form-control form-control-sm" id="Vital" name="Vital" placeholder="Enter Vital" /> */}
                                {vitalList && <DropdownWithSearch defaulNname={t("Select Vital")} name="Vital" list={vitalList} valueName="id" displayName="vitalName" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlVital" />}
                                <small id="errVital" className="form-text text-danger" style={{ display: 'none' }}>{t("Vital Already Selected")}</small>
                                <div className="addvalue narrt1">
                                  {selectedVitalList && selectedVitalList.map((val, index) => {
                                    return (
                                      <div className="addvalue-in">{val.vitalName}<span className="closeadd" onClick={() => { removeSelectedVital(index) }}><i className="fa fa-times"></i></span></div>
                                    )
                                  })}
                                  {/* <div className="addvalue-in">Heart Rate<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                        <div className="addvalue-in">Pulse<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                        <div className="addvalue-in">Spo2<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                        <div className="addvalue-in">Temperature<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                        <div className="addvalue-in">BP_Sys<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                        <div className="addvalue-in">Heart Rate<span className="closeadd"><i className="fa fa-times"></i></span></div>
                                        <div className="addvalue-in">Pulse<span className="closeadd"><i className="fa fa-times"></i></span></div> */}
                                </div>
                              </div>
                            </div>
                            <div className="mb-2 me-2">
                              <div className='deat'>
                                <img src={Investigation} className='icnn' />
                                <label htmlFor="Investigation" className="form-label">{t("Investigation")}</label>
                                <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedInvestigationList([]) }}><i className='fa fa-minus'></i></span>

                                {/* <input type="text" className="form-control form-control-sm" id="Investigation" name="Investigation" placeholder="Enter Investigation" /> */}
                                {investigationList && <DropdownWithSearch defaulNname={t("Select Investigation")} name="investigation" list={investigationList} valueName="id" displayName="testname" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlInvetigationList" />}
                                {/* {problemList && <DropdownWithSearch defaulNname="Select problem" name="abnormalSymptomID" list={problemList} valueName="id" displayName="problemName" editdata={editProblem} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />} */}
                                <small id="errInvestigation" className="form-text text-danger" style={{ display: 'none' }}>{t("Investigation Already Selected")}</small>
                                <div className="addvalue narrt1">
                                  {selectedInvestigationList && selectedInvestigationList.map((list, index) => {
                                    return (
                                      <div className="addvalue-in">{list.testname}<span className="closeadd" onClick={() => { removeSelectedInvestigation(index) }}><i className="fa fa-times"></i></span></div>


                                    )
                                  })}
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="col-md-4 col-sm-12">
                            <div className="mb-2 me-2">
                              <img src={Supplements} className='icnn' />
                              <label htmlFor="FoodSupplementDrug" className="form-label">{t("Food/Supplement/Drug")}</label>
                              <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedFoodList([]) }}><i className='fa fa-minus' ></i></span>
                            </div>
                            {/* <input type="text" className="form-control form-control-sm" id="FoodSupplementDrug" name="FoodSupplementDrug" placeholder="Enter Food/Supplement/Drug" /> */}
                            {foodList && <DropdownWithSearch defaulNname="Select Food/Supplement/Drug" name="FoodSupplementDrug" list={foodList} valueName="id" displayName="foodName" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlFoodSupplementDrug" />}
                            {/* <div className='chksel'>
                                        <div className='chksel-in'> 
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className=""  />
                                             <span>Supp Curcumin (Supp.)</span>
                                          </label>
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className="" />
                                             <span>Supp Magnesium (Supp.)</span>
                                          </label>
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className=""  />
                                             <span>Supp Iron (Supp.)</span>
                                          </label>
                                          <label className="lns-checkbox">
                                             <input type="checkbox" className=""  />
                                             <span>Supp Magnesium (Supp.)</span>
                                          </label>
                                        </div>
                                        
                                        
                                      </div> */}
                            <small id="errFoodSupplementDrug" className="form-text text-danger" style={{ display: 'none' }}>{t("Food/Supplement/Drug Already Selected")}</small>
                            <div className="addvalue narrt1">
                              {selectedFoodList && selectedFoodList.map((val, index) => {
                                return (
                                  <div className="addvalue-in">{val.foodName}<span className="closeadd" onClick={() => { removeSelectedFoodSupplemntDrg(index) }}><i className="fa fa-times"></i></span></div>

                                )
                              })}
                            </div>

                            <div className="mb-2 me-2">
                              <img src={ECGData} className='icnn' />
                              <label htmlFor="ECGData" className="form-label">ECG Data</label>
                              <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedEcgList([]) }}><i className='fa fa-minus' ></i></span>
                              {/* <input type="text" className="form-control form-control-sm" id="ECGData" name="ECGData" placeholder="Enter ECG Data" />  */}
                              {ecgList && <DropdownWithSearch defaulNname={t("Select ECG")} name="ECG" list={ecgList} valueName="ecgName" displayName="ecgName" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlEcg" />}
                              <small id="errECG" className="form-text text-danger" style={{ display: 'none' }}>{t("ECG Already Selected")}</small>
                              <div className="addvalue narrt1">
                                {selectedEcgList && selectedEcgList.map((val, index) => {
                                  return (
                                    <div className="addvalue-in">{val.ecgName}<span className="closeadd" onClick={() => { removeSelectedEcg(index) }}><i className="fa fa-times"></i></span></div>

                                  )
                                })}
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 analuze">
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span className='fieldse'>{t("Analyzing Graph Date")}</span>
                        <BoxContainer>
                          <div className="mb-2 me-2">
                            <img src={date} className='icnn' /> <label htmlFor="FromDate" className="form-label">{t("From Date")}<span className="starMandatory">*</span></label>
                            <input type="date" className="form-control form-control-sm inn1" id="FromDate" name="fromDate" value={fromDate} placeholder="Select Request Date" onChange={handleChange} />
                            <small id="errFromDate" className="form-text text-danger" style={{ display: 'none' }}>{t("Please Select From Date")}</small>
                          </div>
                          <div className="mb-2 me-2">
                            <img src={time} className='icnn' /> <label htmlFor="FromTime" className="form-label">{t("From Time")}<span className="starMandatory">*</span></label>
                            <input type="time" className="form-control form-control-sm inn1" id="FromTime" name="fromTime" value={fromTime} placeholder="Enter Request Time" onChange={handleChange} />
                            <small id="errFromTime" className="form-text text-danger" style={{ display: 'none' }}>{t("Please Select From Time")}</small>
                          </div>
                          <div className="mb-2 me-2">
                            <img src={time} className='icnn' /> <label htmlFor="BloodGroup" className="form-label" >{t("To Hour")}</label>
                            <select className="form-select form-select-sm inn1" aria-label=".form-select-sm example" name='toHour' id='ddlToHour' onChange={handleChange}>
                              <option value="0">{t("Select Hour")}</option>
                              <option value="1">1{t("Hour")}</option>
                              <option value="2">2{t("Hour")}</option>
                              <option value="3">3{t("Hour")}</option>
                              <option value="4">4{t("Hour")}</option>
                              <option value="5">5{t("Hour")}</option>
                              <option value="6">6{t("Hour")}</option>
                              <option value="7">7{t("Hour")}</option>
                              <option value="8">8{t("Hour")}</option>
                              <option value="9">9{t("Hour")}</option>
                              <option value="10">10{t("Hour")}</option>
                              <option value="11">11{t("Hour")}</option>
                              <option value="12">12{t("Hour")}</option>
                              <option value="13">13{t("Hour")}</option>
                              <option value="14">14{t("Hour")}</option>
                              <option value="15">15{t("Hour")}</option>
                              <option value="16">16{t("Hour")}</option>
                              <option value="17">17{t("Hour")}</option>
                              <option value="18">18{t("Hour")}</option>
                              <option value="19">19{t("Hour")}</option>
                              <option value="20">20{t("Hour")}</option>
                              <option value="21">21{t("Hour")}</option>
                              <option value="22">22{t("Hour")}</option>
                              <option value="23">23{t("Hour")}</option>
                              <option value="24">24{t("Hour")}</option>
                            </select>
                            <small id="errToHour" className="form-text text-danger" style={{ display: 'none' }}>{t("Please Select To Hour")}</small>
                          </div>
                          <div className="mb-2 me-2">
                            <img src={IntakeType} className='icnn' /> <label htmlFor="Component" className="form-label">{t("Intake_Type")}</label>
                            <select className="form-select form-select-sm inn1" aria-label=".form-select-sm example" name='intakeType' id='ddlIntakeType' onChange={handleChange}>
                              <option value="0">{t("Select Intake Type")}</option>
                            </select>
                          </div>
                        </BoxContainer>
                        <div className='searchbtnn'>
                          <button onClick={handleSearch}><i className='fa fa-search'></i>{t("Search_Result")}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="med-table-section">
                <Heading text='Patient Analyzing Graph' />
                <HighchartsReact highcharts={Highcharts} options={graph} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
