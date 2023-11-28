export default function ShowNotification(mainHeading, msgBody) {

    if (Notification.permission === "granted") {
        NotificationMesg(mainHeading, msgBody);
    }
    else {
        Notification.requestPermission().then(function (p) {
            if (p === 'granted') {
                // show notification here
                NotificationMesg(mainHeading, msgBody);
            } else {
                console.log('User blocked notifications.');
            }
        }).catch(function (err) {
            console.error(err);
        });
    }
}
let NotificationMesg = (mainHeading, msgBody) => {
    var notify = new Notification(mainHeading, {
        body: msgBody,
        icon: 'https://bit.ly/2DYqRrh',
    });
}
