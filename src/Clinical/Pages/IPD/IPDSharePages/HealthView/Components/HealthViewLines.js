import React from 'react'
import TableContainer from '../../../../../../Component/TableContainer';
import lines from '../../../../../../assets/images/HistoryViewIcons/lines.svg';
import insertion from '../../../../../../assets/images/HistoryViewIcons/insertion.svg';
import removallines from '../../../../../../assets/images/HistoryViewIcons/removallines.svg';
import Foleys from '../../../../../../assets/images/HistoryViewIcons/Foleys.svg';
import NGTube from '../../../../../../assets/images/HistoryViewIcons/NGTube.svg';
import lines1 from '../../../../../../assets/images/HistoryViewIcons/lines1.svg';
import CVP1 from '../../../../../../assets/images/HistoryViewIcons/CVP1.svg';
import insertiontube from '../../../../../../assets/images/HistoryViewIcons/insertiontube.svg';
import tuberemoval from '../../../../../../assets/images/HistoryViewIcons/tuberemoval.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export const HealthViewLines = () => {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t("LINES")}</div>
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{ "width": "5%" }}><span className="timer">#</span></th>
                                <th><span className="timer">{t("LINES")}</span></th>
                                <th><span className='timer'>17-06-23</span></th>
                                <th><span className='timer'>18-06-23</span></th>
                                <th><span className='timer'>19-06-23</span></th>
                                <th><span className='timer'>20-06-23</span></th>
                                <th><span className='timer'>21-06-23</span></th>
                                <th><span className='timer'>22-06-23</span></th>
                                <th><span className='timer'>23-06-23</span></th>
                            </tr>
                        </thead>

                        <tbody>
    <tr>
        <td className="text-center">1</td>
        <td><img src={lines} className='icnn' /> {t('LINE_1')}</td>
        <td>{t('INSERTION_1')}</td>
        <td>-</td>
        <td>-</td>
        <td>{t('REMOVAL_1')}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
    <tr>
        <td className="text-center">2</td>
        <td><img src={Foleys} className='icnn' /> {t('FOLEYS')}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
    <tr>
        <td className="text-center">3</td>
        <td><img src={NGTube} className='icnn' /> {t('NG_TUBE')}</td>
        <td>-</td>
        <td>-</td>
        <td>{t('INSERTION_2')}</td>
        <td>-</td>
        <td>-</td>
        <td>{t('REMOVAL_2')}</td>
        <td>-</td>
    </tr>
    <tr>
        <td className="text-center">4</td>
        <td><img src={lines1} className='icnn' /> {t('LINE_1')}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
    <tr>
        <td className="text-center">5</td>
        <td><img src={CVP1} className='icnn' /> {t('CVP_1')}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
</tbody>

                    </TableContainer>
                </div>
            </div>
        </>
    )
}
