function ValidationWidgetRoleAssign(roleId="0", widgetId="0") {
    if (roleId !== '0' && widgetId !== '0') {
        return [true,'']
    }
    else{
        if(widgetId === '0'){
            return [false,'errddlWidgetId', 'Please select widget'];
        }
        
        else if(roleId === '0'){
            return [false, 'errddlRoleId','Please select role'];
        }
    }
}
export default ValidationWidgetRoleAssign;