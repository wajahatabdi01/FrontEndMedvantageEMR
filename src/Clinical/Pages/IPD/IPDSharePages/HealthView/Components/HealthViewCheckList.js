import React from 'react';
import TableContainer from '../../../../../../Component/TableContainer';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export const HealthViewCheckList = () => {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t("CHECKLIST")}</div>
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{ "width": "5%" }}><br /><span className="timer">#</span></th>
                                <th><br /><span className="timer">{t("CHECKLIST")}</span></th>
                                <th>14-06-23<br /><span className='timer'>08:00</span></th>
                                <th><br /><span className='timer'>09:00</span></th>
                                <th><br /><span className='timer'>10:00</span></th>
                                <th><br /><span className='timer'>11:00</span></th>
                                <th><br /><span className='timer'>12:00</span></th>
                                <th className="bord-rt"><br /><span className='timer'>13:00am</span></th>

                                <th>15-06-23<br /><span className='timer'>08:00</span></th>
                                <th><br /><span className='timer'>09:00</span></th>
                                <th><br /><span className='timer'>10:00</span></th>
                                <th><br /><span className='timer'>11:00</span></th>
                                <th><br /><span className='timer'>12:00</span></th>
                                <th><br /><span className='timer'>13:00</span></th>
                                <th className="bord-rt"><br /><span className='timer'>14:00</span></th>

                                <th>16-06-23<br /><span className='timer'>08:00</span></th>
                                <th><br /><span className='timer'>09:00</span></th>
                                <th><br /><span className='timer'>10:00</span></th>
                                <th><br /><span className='timer'>11:00</span></th>
                                <th><br /><span className='timer'>12:00</span></th>
                                <th><br /><span className='timer'>13:00</span></th>
                                <th><br /><span className='timer'>14:00</span></th>
                                <th><br /><span className='timer'>15:00</span></th>
                                <th><br /><span className='timer'>16:00</span></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="text-center">1</td>
                                <td>{t("Feeding")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>

                                <td>{t("No")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                            </tr>

                            <tr>
                                <td className="text-center">2</td>
                                <td>{t('Analgesia')}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>

                                <td>{t("No")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                                <td>-</td>
                                <td>-</td>
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
                                <td>{t("Sedation")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>

                                <td>{t("No")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                            </tr>

                            <tr>
                                <td className="text-center">4</td>
                                <td>{t("Thrombo Prophylaxis")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>

                                <td>{t("No")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                                <td>-</td>
                                <td>-</td>
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
                                <td>{t("Head End Elevation")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>

                                <td>{t("No")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                            </tr>

                            <tr>
                                <td className="text-center">6</td>
                                <td>{t("Ulcer Prophylaxis")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>

                                <td>{t("No")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>

                                <td>-</td>
                                <td>-</td>
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
