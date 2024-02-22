import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import DownloadChartedDocument from '../Pages/DownloadChartedDocument'


export default function LayoutDownloadChartedDocument() {
    return (
        <div className='abc'>
            <Navbar />
            <ClinicalSidebar />
            <DownloadChartedDocument />
        </div>
    )
}


