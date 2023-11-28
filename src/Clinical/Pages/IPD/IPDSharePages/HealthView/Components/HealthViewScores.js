import React from 'react';
import TableContainer from '../../../../../../Component/TableContainer';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export const HealthViewScores = () => {
    const {t} = useTranslation();
    document.body.dir = i18n.dir()
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t("SCORES")}</div>
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{ "width": "5%" }}><br /><span className="timer">#</span></th>
                                <th><br /><span className="timer">{t("SCORES")}</span></th>
                                <th>17-06-23<br /><span className='timer'>08:00</span></th>
                                <th><br /><span className='timer'>09:00</span></th>
                                <th><br /><span className='timer'>10:00</span></th>
                                <th className="bord-rt"><br /><span className='timer'>11:00</span></th>

                                <th>18-06-23<br /><span className='timer'>8:00</span></th>
                                <th><br /><span className='timer'>9:00</span></th>
                                <th><br /><span className='timer'>10:00</span></th>
                                <th><br /><span className='timer'>11:00</span></th>
                                <th className="bord-rt"><br /><span className='timer'>12:00</span></th>

                                <th>19-06-23<br /><span className='timer'>08:00</span></th>
                                <th><br /><span className='timer'>09:00</span></th>
                                <th><br /><span className='timer'>10:00</span></th>
                                <th><br /><span className='timer'>11:00</span></th>
                                <th><br /><span className='timer'>12:00</span></th>
                                <th><br /><span className='timer'>13:00</span></th>
                                <th><br /><span className='timer'>14:00</span></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="text-center">1</td>
                                <td> {t("BMI")} </td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td className="text-center">2</td>
                                <td>{t("GFR")}</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>8.2mmol/L</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td className="text-center">3</td>
                                <td>{t("APACHE II Score")}</td>
                                <td>7.196</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td className="text-center">4</td>
                                <td>{t("Anion Gap")}</td>
                                <td>7.196</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td className="text-center">5</td>
                                <td>{t("Metabolic Syndrome")}</td>
                                <td>7.196</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td className="text-center">6</td>
                                <td>{t("GCS")}</td>
                                <td>7.196</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td className="text-center">7</td>
                                <td>{t("SIRS Criteria")}</td>
                                <td>7.196</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td className="text-center">8</td>
                                <td>{t("GCS")}</td>
                                <td>7.196</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td className="text-center">9</td>
                                <td>{t("SIRS Criteria")}</td>
                                <td>7.196</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>1.05</td>
                                <td>-</td>
                                <td>1.05</td>
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
