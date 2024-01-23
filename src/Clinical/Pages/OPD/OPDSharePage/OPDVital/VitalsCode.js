// get display vital
let getvitaldata = (vitalDatas) => {
    if (vitalDatas !== undefined) {
      let data = vitalDatas.allPatientVital;
      let final_data = []
      let senddata = []
      let count = 0
      data.map((valdate1, index) => {
        // let senddata = []
        if (index === count) {
          data.map((valdate2, ind) => {
            if (valdate1.vitalDateTime === valdate2.vitalDateTime) {
              count = ind + 1;
              //temp = valdate2
              senddata.push(valdate2)
            }
            index = count;

          })
        }
        
        if (senddata.length !== 0) {
          final_data.push(senddata)
        }

        senddata = []

      })
      let temparr = []
      let temps = []
      let temppush = '-'
      let bp = ''
      let columns = ["Pulse", "respRate", "heartRate", "spo2", "BP_Sys", "BP_Dias", "Temperature", "Height", "Weight"];
      final_data.map((value, index) => {
        columns.map((cols, ind) => {
          value.map((val, inde) => {
            if (cols === val.vitalName) {
              if (val.vitalName === 'BP_Sys' || val.vitalName === 'BP_Dias') {
                if(bp==='-')
                {
                  bp = ''
                }
                bp = bp +"/"+ val.vmValue
                
              }
              else {
                temppush = val.vmValue
              }
            }
          })
          
          temps.push(temppush)
          temppush = '-'
        })
        temps[4] = bp.slice(1)
        temps.splice(5, 1)
       
        // temps.push(value[index].vitalDateTime)
     

        temps.push(value[0].vitalDateTime.split("T")[0] +'/'+value[0].vitalDateTime.split("T")[1])
        temps.push(value[0].name)
        temparr.push(temps)
        temps = []
        bp = '-'
      })

      return temparr
    //   setVitalSetData(temparr)
    }
  }

  export default getvitaldata;