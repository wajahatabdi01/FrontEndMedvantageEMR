const GetDepartmentByID = async (key) => {
    const url = `${window.fhirAdminEMR}/api/DepartmentMaster/GetDepartmentMasterById?id=${key}`;
    const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            return false;
        }
        else{
            const data = await response.json();
            // console.log('response', data);
            return data;
        }

        
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export default GetDepartmentByID;
