function ValidationDashboardWidgetAssign(widgetId="0", dashboardId="0") {
    if ( widgetId !== '0' && dashboardId !== '0') {
        return [true,''];
    }
    
    else if(widgetId === '0'){
        return [false,'errddlWidgetId','Please select Widget']
    }
    else if(dashboardId === '0'){
        return [false,'errddlDashboardId','Please select Dashboard']
    }
}
export default ValidationDashboardWidgetAssign;