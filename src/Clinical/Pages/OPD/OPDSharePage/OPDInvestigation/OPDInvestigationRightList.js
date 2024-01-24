import React, { useEffect, useState } from 'react'
import GetSubTestNameForGraph from '../../../../API/OPD/Investigation/GetSubTestNameForGraph'
import GetResultBySubtestIdForGraph from '../../../../API/OPD/Investigation/GetResultBySubtestIdForGraph'
import TestGraph from './TestGraph'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDInvestigationRightList(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();

    let [subtestNameList, setSubtestNameList] = useState([])
    let [subtestGraphData, setSubtestGraphData] = useState([])
    let [showGrap, setShowGrap] = useState(0)

    let getData = async () => {

        try {
            let response = await GetSubTestNameForGraph()
            if (response.status === 1) {
                setSubtestNameList(response.responseValue)
               
            }
        }
        catch (e) { }
    }

    let getGraphData = async (subtestID) => {
        let senddata = {
            uhid: props.uhid,
            subtest: subtestID

        }
        let response = await GetResultBySubtestIdForGraph(senddata)
        if (response.status === 1) {
            setSubtestGraphData(response.responseValue)
            setShowGrap(1)
        }
    }

    useEffect(() => {
       
        getData()
    }, [])
    return (
        <div className='investigation_h_r'>
            <div className='dflex'  style={{'justify-content':'space-between', 'margin-bottom':'10px'}}>
              <div className='dflexin'>{t("All")} {t("Test")}</div>
              <div className='dflexin seri'><input type='search' placeholder={t('Search')}/><i className='fa fa-search'></i></div>
            </div>
            <div className='d-flex flex-wrap gap-2' >
                {subtestNameList && subtestNameList.map((val, ind) => {
                    return (
                        <span className='opdcancletab opdcltab'>
                            <label onClick={() => { getGraphData(val.subtestID) }}>{val.subTestName}</label>
                        </span>
                    )
                })}
                {

                    showGrap === 1 ? < TestGraph subtestGraphData={subtestGraphData} showGrap={showGrap} modelCloseFun={setShowGrap} /> : ""
                }
            </div>
        </div>

    )
}
