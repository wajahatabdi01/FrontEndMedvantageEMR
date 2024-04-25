import React from 'react'

function RedirectUrl({ codingListItem }) {
    const codeName = {
        'ICD10': '2.16.840.1.113883.6.90',
        'SNOMED': '2.16.840.1.113883.6.96'
    }
    const redirectToHealthInfoPage = (param) => {
        const tempData = param.split(":");
        const codingType = tempData[0];
        console.log('codingType', codingType)
        const codingValue = tempData[1];
        const getCode = codeName[codingType];
        const url = "https://connect.medlineplus.gov/application?mainSearchCriteria.v.cs=" + getCode + "&mainSearchCriteria.v.c=" + codingValue;
        window.open(url, 'blank');
    }
    const handleClick = (coding) => {
        console.log("coding", coding);
    }
    return (
        <>
            <td>
                <div className='codeSplit pointer'>
                    {codingListItem.map((coding, index) => (
                        coding.trim() !== '' &&
                        <span key={index} className="" onClick={() => redirectToHealthInfoPage(coding)}>
                            {coding}
                        </span>
                    ))}
                </div>
            </td>
        </>
    )
}

export default RedirectUrl
