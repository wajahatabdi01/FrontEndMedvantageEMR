import React, { useState } from 'react'
import IPDInvestigation from './Popup/IPDInvestigation';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
import IPDViewInvestigation from './Popup/IPDViewInvestigation';

export default function IPDVentiBottom() {
    const {t} = useTranslation();
    let [showInvestigation, setShowInvestigation] = useState(0)
    let [viewInvestigation, setViewInvestigation] = useState(0)
    document.body.dir = i18n.dir();
    return (
        <>
            <div className='roww boxcontainer boxs' style={{'padding':'7px 7px', 'width':'100%'}}>
                <div className='d-flex flex-warp  ventib'>
                    {/* <button type='button' className='btn btn-save btn-save-fill'>Patient Intake Type</button>
                    <button type='button' className='btn btn-save btn-save-fill'>Opinion / Reference</button> */}
                    <div className='gapt'><button type='button' className='btn btn-save btn-save-fill' onClick={() => { setShowInvestigation(1) }}> Order / Change Investigation </button></div>
                    <div className='gapt'><button type='button' className='btn btn-save btn-save-fill' onClick={() => { setViewInvestigation(1) }}> View Investigation </button></div>
                </div>
            </div>
            <IPDInvestigation showFun={showInvestigation} modelCloseFun={setShowInvestigation} />
            <IPDViewInvestigation showFun={viewInvestigation} modelCloseFun={setViewInvestigation}/>
        </>
    )
}
