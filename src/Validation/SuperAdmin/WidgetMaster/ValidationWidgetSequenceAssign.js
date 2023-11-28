function ValidationWidgetSequenceAssign( widgetId="0", sequenceNumber='', assignedTo='0') {
    if (widgetId !== '0'  && sequenceNumber !== '' && assignedTo !== '0') {
        return [true,'']
    }
    else{
        if(widgetId === '0'){
            return [false,'errddlWidgetId', 'Please select widget'];
        }
        else if(sequenceNumber === "" ){
            return [false, 'errddlSequenceNumber', 'Please enter sequence number'];
        }
        else if(assignedTo === '0'){
            return [false, 'errddlassignedTo', 'Please select user Name'];
        }
    }
}
export default ValidationWidgetSequenceAssign;