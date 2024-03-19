import React from 'react';
import Sodium from '../../../../../../assets/images/HistoryViewIcons/Sodium.svg';
import Magnesium from '../../../../../../assets/images/HistoryViewIcons/Magnesium.svg';
import Protein from '../../../../../../assets/images/HistoryViewIcons/Protein.svg';
import Phosphorus from '../../../../../../assets/images/HistoryViewIcons/Phosphorus.svg';
import Creatinine from '../../../../../../assets/images/HistoryViewIcons/Creatinine.svg';
import Potassium from '../../../../../../assets/images/HistoryViewIcons/Potassium.svg';
import Sodium1 from '../../../../../../assets/images/HistoryViewIcons/Sodium1.svg';
import TableContainer from '../../../../../../Component/TableContainer';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export const HealthViewNutritionalAchievement = () => {
    const {t} = useTranslation();
    document.body.dir = i18n.dir()
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t("NUTRITIONAL_ACHIEVEMENT")}</div>
                    </div>
                    <div className='listdetailsct-in'>
                        <div className='gridsec-in'>
                            <i className='fa fa-file-text'></i><i className='fa fa-bar-chart'></i>
                        </div>
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{ "width": "5%" }}><br /><span className="timer">#</span></th>
                                <th><br /><span className="timer">{t("Nutrient")}</span></th>
                                <th>17-06-23<br /><span className='timer'>08:00am</span></th>
                                <th>18-06-23<br /><span className='timer'>08:00am</span></th>
                                <th>19-06-23<br /><span className='timer'>08:00am</span></th>
                                <th>20-06-23<br /><span className='timer'>08:00am</span></th>
                                <th>21-06-23<br /><span className='timer'>08:00am</span></th>
                                <th>22-06-23<br /><span className='timer'>08:00am</span></th>
                                <th>23-06-23<br /><span className='timer'>08:00am</span></th>
                                <th>24-06-23<br /><span className='timer'>08:00am</span></th>
                            </tr>
                        </thead>

                        <tbody>
    <tr>
        <td className="text-center">1</td>
        <td><img src={Sodium} className='icnn' alt=''/> {t('SODIUM')}</td>
        <td> - </td>
        <td> - </td>
        <td>
            <div className="progress barct">
                <div className="progress-bar greenbar" role="progressbar" aria-valuenow="40"
                    aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}>
                </div>
            </div>
        </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td>
            <div className="progress barct">
                <div className="progress-bar greenbar" role="progressbar" aria-valuenow="40"
                    aria-valuemin="0" aria-valuemax="100" style={{ width: "70%" }}>
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <td className="text-center">2</td>
        <td><img src={Magnesium} className='icnn' alt=''/> {t('MAGNESIUM')}</td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
    </tr>
    <tr>
        <td className="text-center">3</td>
        <td><img src={Protein} className='icnn' alt=''/> {t('PROTEIN')}</td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td>
            <div className="progress barct">
                <div className="progress-bar redbar" role="progressbar" aria-valuenow="40"
                    aria-valuemin="0" aria-valuemax="100" style={{ width: "70%" }}>
                </div>
            </div>
        </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
    </tr>
    <tr>
        <td className="text-center">4</td>
        <td><img src={Phosphorus} className='icnn' alt=''/> {t('PHOSPHORUS')}</td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
    </tr>
    <tr>
        <td className="text-center">5</td>
        <td><img src={Creatinine} className='icnn' alt=''/> {t('CREATININE')}</td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
    </tr>
    <tr>
        <td className="text-center">6</td>
        <td><img src={Potassium} className='icnn' alt=''/> {t('POTASSIUM')}</td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
    </tr>
    <tr>
        <td className="text-center">7</td>
        <td><img src={Sodium1} className='icnn' alt='' /> {t('SODIUM_1')}</td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
    </tr>
</tbody>

                    </TableContainer>
                </div>
            </div>
        </>
    )
}
