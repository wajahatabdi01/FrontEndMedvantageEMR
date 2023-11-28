

export default function TimeCalculate(time) {
    let date = new Date()

    // let difftime = Math.abs(date - new Date(time.replace(/-/g, '/')))
    // let days = parseInt(difftime /(1000 * 3600 * 24))
    // let hourse = parseInt((difftime / 1000) % 60)
    // let minutes = parseInt((difftime / (1000 * 60)) % 60)
    // let seconds = parseInt((difftime / (1000 * 60 * 60)) % 24);
    // console.log("days", days)
    // if(days > 0)
    // {
    //     return (days+"-D")

    // }
    // else if(hourse > 0)
    // {

    //         return (hourse+":"+minutes+":"+seconds+"-Hr")

    // }
    // else if(hourse <= 0 && minutes > 0)
    // {
    //     return (0+":"+minutes+":"+seconds+"-Min")
    // }

// console.log("time", time)


    let oldYear = parseInt(time.split(" ")[0].split("-")[0])
    let oldMonth = parseInt(time.split(" ")[0].split("-")[1])
    let oldDate = parseInt(time.split(" ")[0].split("-")[2])
    let oldtimeHr = parseInt(time.split(" ")[1].split(":")[0])
    let oldtimeMin = parseInt(time.split(" ")[1].split(":")[1])
    let oldtimeSec = parseInt(time.split(" ")[1].split(":")[2])

    let currentYear = parseInt(date.getFullYear())
    let currentMonth = parseInt(date.getMonth()) + 1
    let currentDate = parseInt(date.getDate())
    let currentTimeHr = parseInt(date.getHours())
    let currentTimeMin = parseInt(date.getMinutes())

    let currentTimeSec = parseInt(date.getSeconds())



    let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
    let oldFullDate = new Date(time)
    let diffDate = Math.abs(currentFullDate - oldFullDate)

    let days = Math.round(diffDate / (1000 * 3600 * 24))

    var msec = diffDate;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    if ((currentMonth - oldMonth) === 0) {
        // if same month
        if ((currentDate - oldDate) === 0) {
            // if same day
            if ((currentTimeHr - oldtimeHr) > 0) {
                // let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                // let oldFullDate = new Date(time)
                // let diffDate = Math.abs(currentFullDate - oldFullDate)

                // var msec = diffDate;
                // var hh = Math.floor(msec / 1000 / 60 / 60);
                // msec -= hh * 1000 * 60 * 60;
                // var mm = Math.floor(msec / 1000 / 60);
                // msec -= mm * 1000 * 60;
                // var ss = Math.floor(msec / 1000);
                // msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"

                if (hh > 0) {
                    return (hh + ":" + mm + "-H")
                }
                else {
                    return (mm + "-M")

                }

            }
            else {

                return ((currentTimeMin - oldtimeMin) + "-M")
            }
        }

        // if not same day
        else {
            if (days > 1) {
                let hour = hh % 24
                let day = Number.parseInt(hh / 24)
                return (day + "-D")
            }
            else {
                if (hh >= 24) {
                    return (1 + "-D")

                }
                else{
                    return (hh + ":" + mm + "-H")
                }
            }

        }
    }

    // if month not same
    else {
        let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
        let oldFullDate = new Date(time.split(" ")[0])
        let diffDate = Math.abs(currentFullDate - oldFullDate)


        return (days + "-D")


    }
}
