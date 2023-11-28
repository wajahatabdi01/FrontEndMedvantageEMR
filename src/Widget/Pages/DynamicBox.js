import React, { useEffect, useState } from 'react'
import TableData from './TableData'
import GetDynamicAPI from '../API/GetDynamicAPI'
import Loader from '../../Component/Loader'

export default function DynamicBox(props) {
    let [tableData, setTableData] = useState([])
    let [showLoder, setShowLoder] = useState(0)
    let getData = async () => {
        setShowLoder(1)
        let modifyData = ""+props.data[0].apiURL+""+props.filterData
        let response = await GetDynamicAPI(modifyData)
        if (response.status === 1) {
            setShowLoder(0)
            if (response.responseValue) {
                setTableData(response.responseValue)
            }
            // console.log(props.data[0].title)
            //  console.log(response)
        }
    }

    useEffect(() => {
        getData()
    }, [props])
    return (
        <div className="dynamicBoxContainerItems" style={{background:props.data[0].headingColor}}>
            <div className="topHeader d-flex justify-content-between align-items-center" style={{background:"#112437"}} >
                <div className='titleText' ><i className="bi bi-record-circle-fill"></i> {props.data[0].title.toUpperCase()}</div>
                <div className='d-flex flex-wrap_ gap-3 pe-2'>
                    <i className="bi bi-bar-chart-line-fill" title='Show Graph'></i>
                    <i className="bi bi-x-circle" title='Close Box' onClick={() => { props.handleRemove(props.index) }}></i>
                </div>
            </div>
            <div className="table-dynamic-section" style={{ height: '220px' }}>
                <TableData data={tableData} />
            </div>
            <div className="dynamicBoxContainerItemsLoader"><i className="fa fa-spinner fa-spin"></i></div>
            <Loader val={showLoder}/>
        </div>
    )
}
