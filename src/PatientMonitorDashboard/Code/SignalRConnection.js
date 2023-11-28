// import handleSearchs from "./PMDCode";
// sort according sortorderindex
let sortList = (obj) => {
  let arr = obj.sort((a, b) => {
    return b.sortOrderIndex - a.sortOrderIndex;
  });
  return arr;
}

export default function SignalRConnection(connection, setTempFullPatientDataList, setLoderBool, createWardList, handleUpdatedata) {
  let fullList = []
  let tempList = []
  let onlyOne = 1
  if (connection) {
    // start connection first time
    connection.start().then((result) => {
      var clientData = JSON.parse(sessionStorage.getItem("LoginData"));
      var clientId = clientData.clientId;
      var userId = clientData.userId;

      // add new user first time
      connection.invoke("AddUser", clientId, userId).then(function (response) {

        // console.log(response.responseValue)
        if (response.status === 1) {
          if (response.responseValue != null) {
            let sortedList = sortList(response.responseValue)
            // console.log("List sorted", sortedList)
            // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)
            // setFullPatientDataList(sortedList);
            setTempFullPatientDataList(sortedList)
            createWardList(response.responseValue);
            fullList = sortedList;
            tempList = sortedList;
            if (onlyOne) {

              setLoderBool(0)
              onlyOne = 0
            }
            // console.log("establish run", sortedList)
            // console.log("establish run", sortedList)
            handleUpdatedata()
          }
        }
        else {
          setLoderBool(0)
        }
      })

      // call when new patient is add
      connection.on("PatientAdded", (response) => {
        if (response.responseValue != null) {
          let sortedList = sortList([...fullList, response.responseValue])



          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);

          setTempFullPatientDataList(sortedList)
          fullList = sortedList;
          tempList = sortedList;


          console.log("add new patient run")
          handleUpdatedata()


        }
      })

      connection.on("UpdatedPatientData", (response) => {
        if (response.responseValue != null) {
          let sortedList = sortList([...fullList, response.responseValue])



          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)
          // setFullPatientDataList(sortedList);

          setTempFullPatientDataList(sortedList)
          fullList = sortedList;
          tempList = sortedList;


          console.log("add UpdatedPatientData new patient run")
          handleUpdatedata()


        }
      })

      // call when patient diagonsis data update
      connection.on("UpdatedPatientDiagonsis", (response) => {
        if (response.responseValue) {
          let newUpdate = response.responseValue;
          console.log("UpdatedPatientDiagonsisResp", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              tempList[index] = newUpdate;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Update diag run")
          handleUpdatedata()



        }
      })


      // call when patient ventilator data update
      connection.on("PatientOnLifeSupport", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("UpdatePatientVentilatorDataResponse", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              tempList[index] = newUpdate;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Ventilator run")
          handleUpdatedata()




        }
      })
      // responsePatientRemoved
      // call when patient remove
      connection.on("PatientRemoved", (response) => {
        console.log("response", response)
        if (response.responseValue != null) {
          let removeId = response.responseValue;

          fullList.map((patientdata, index) => {
            // let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === removeId) {
              tempList.splice(index, 1);
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)
          handleUpdatedata()
        }
      })

      // call when patient investigation data update
      connection.on("UpdatePatientInvestigation", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("UpdatePatientInvestigationResponse", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              tempList[index] = newUpdate;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Investi run")
          handleUpdatedata()




        }
      })

      // call when patient vitals data update
      connection.on("UpdatedPatientVitals", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("UpdatedPatientVitalsResponse", newUpdate)

          const index = fullList.findIndex(
            (item) => item.patientId === newUpdate.patientId
          );
          fullList[index] = newUpdate
          let sortedList = sortList(fullList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)


          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)
          console.log("vital run")
          handleUpdatedata()





        }
      })

      // call when Patient Release From Life Support data update
      connection.on("PatientReleaseFromLifeSupport", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("PatientReleaseFromLifeSupport", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              JSON.parse(tempList[index].patientDataList).LifeSupportList = null;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Patient Release From Life Support run")
          handleUpdatedata()
        }
      })

      // call when Patient assign oxygen support data update
      connection.on("PatientOnOxygenSupport", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("PatientOnOxygenSupport", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              JSON.parse(tempList[index].patientDataList).OxygenSupporList = newUpdate;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Patient Release From Life Support run")
          handleUpdatedata()
        }
      })

      // call when Patient assign oxygen support data update
      connection.on("PatientOnOxygenSupport", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("PatientOnOxygenSupport", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              JSON.parse(tempList[index].patientDataList).OxygenSupporList = newUpdate;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Patient Release From Life Support run")
          handleUpdatedata()
        }
      })


      // call when Patient assign PatientOnDVTPumpSupport data update
      connection.on("PatientOnDVTPumpSupport", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("PatientOnDVTPumpSupport", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              JSON.parse(tempList[index].patientDataList).PatientOnDVTPumpSupport = newUpdate;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Patient Release From Life Support run")
          handleUpdatedata()
        }
      })

      // call when Patient remove PatientOnDVTPumpSupport data update
      connection.on("PatientReleaseFromDVTPumpSupport", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("PatientReleaseFromDVTPumpSupport", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              JSON.parse(tempList[index].patientDataList).PatientOnDVTPumpSupport = null;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Patient Release From Life Support run")
          handleUpdatedata()
        }
      })



      // call when Patient assign ECG Graph data update
      connection.on("PatientECGGraph", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("PatientECGGraph", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              JSON.parse(tempList[index].patientDataList).ECGList = newUpdate;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null ? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("Patient Release From Life Support run")
          handleUpdatedata()
        }
      })

      // call when patient FluidBottle data update
      connection.on("UpdatePatientFluidBottle", (response) => {
        if (response.responseValue != null) {
          let newUpdate = response.responseValue;
          console.log("UpdatePatientFluidBottle", newUpdate)

          fullList.map((patientdata, index) => {
            let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === newUpdate.patientId) {
              tempList[index] = newUpdate;
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)

          console.log("UpdatePatientFluidBottle run")
          handleUpdatedata()
        }
      })


      // call when patient remove
      connection.on("PatientReleaseFluidBottle", (response) => {
        console.log("PatientReleaseFluidBottle", response)
        if (response.responseValue != null) {
          let removeId = response.responseValue;

          fullList.map((patientdata, index) => {
            // let jsonData = JSON.parse(patientdata.patientDataList)
            if (patientdata.patientId === removeId) {
              tempList[index].PatientFluidBottleList = null
            }
          })
          let sortedList = sortList(tempList)
          // let sortedData = selectedWard != null? handleSearchs(selectedWard, sortedList, null) : handleSearchs(1, sortedList, null)

          // setFullPatientDataList(sortedList);
          setTempFullPatientDataList(sortedList)
          handleUpdatedata()
        }
      })





      connection.onclose(async () => {
        await start();
      });

      async function start() {
        try {
          await connection.start();
        } catch (err) {
          setTimeout(start, 5000);
        }
      };

    }).catch((e) => console.log("connection faild"));


  }
}
