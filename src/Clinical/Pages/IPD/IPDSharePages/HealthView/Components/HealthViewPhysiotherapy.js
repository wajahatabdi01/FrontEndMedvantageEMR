import React from 'react';
import TableContainer from '../../../../../../Component/TableContainer';
import ManualTherapy from '../../../../../../assets/images/HistoryViewIcons/ManualTherapy.svg';
import TherapeuticExercises from '../../../../../../assets/images/HistoryViewIcons/TherapeuticExercises.svg';
import Electrotherapy from '../../../../../../assets/images/HistoryViewIcons/Electrotherapy.svg';
import HeatColdTherapy from '../../../../../../assets/images/HistoryViewIcons/HeatColdTherapy.svg';
import Hydrotherapy from '../../../../../../assets/images/HistoryViewIcons/Hydrotherapy.svg';
import MassageTherapy from '../../../../../../assets/images/HistoryViewIcons/MassageTherapy.svg';
import Traction from '../../../../../../assets/images/HistoryViewIcons/Traction.svg';
import TherapeuticExercises1 from '../../../../../../assets/images/HistoryViewIcons/TherapeuticExercises1.svg';
import LaserTherapy from '../../../../../../assets/images/HistoryViewIcons/LaserTherapy.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export const HealthViewPhysiotherapy = () => {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t("PHYSIOTHERAPY")}</div>
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{ "width": "5%" }}><br /><span className="timer">#</span></th>
                                <th><br /><span className="timer">{t("Therapy")}</span></th>
                                <th>17-06-23<br /><span className='timer'>08:00</span></th>
                                <th><br /><span className='timer'>09:00</span></th>
                                <th><br /><span className='timer'>10:00</span></th>
                                <th><br /><span className='timer'>11:00</span></th>
                                <th><br /><span className='timer'>12:00</span></th>
                                <th className="bord-rt"><br /><span className='timer'>13:00am</span></th>

                                <th>18-06-23<br /><span className='timer'>08:00</span></th>
                                <th><br /><span className='timer'>09:00</span></th>
                                <th><br /><span className='timer'>10:00</span></th>
                                <th><br /><span className='timer'>11:00</span></th>
                                <th><br /><span className='timer'>12:00</span></th>
                                <th><br /><span className='timer'>13:00</span></th>
                                <th className="bord-rt"><br /><span className='timer'>14:00</span></th>

                                <th>19-06-23<br /><span className='timer'>08:00</span></th>
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
                                <td><img src={ManualTherapy} className='icnn' /> {t("Manual Therapy")}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                            <tr>
                                <td className="text-center">2</td>
                                <td><img src={TherapeuticExercises} className='icnn' /> {t("Therapeutic Exercises")}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                            <tr>
                                <td className="text-center">3</td>
                                <td><img src={Electrotherapy} className='icnn' /> {t("Electrotherapy")}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                            <tr>
                                <td className="text-center">4</td>
                                <td><img src={HeatColdTherapy} className='icnn' /> {t("Heat and Cold Therapy")}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                            <tr>
                                <td className="text-center">5</td>
                                <td><img src={Hydrotherapy} className='icnn' /> {t('Hydrotherapy')}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                            <tr>
                                <td className="text-center">6</td>
                                <td><img src={MassageTherapy} className='icnn' /> {t("Massage Therapy")}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                            <tr>
                                <td className="text-center">7</td>
                                <td><img src={Traction} className='icnn' /> {t("Traction")}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                            <tr>
                                <td className="text-center">8</td>
                                <td><img src={TherapeuticExercises1} className='icnn' /> {t("Therapeutic Exercises")}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                            <tr>
                                <td className="text-center">9</td>
                                <td><img src={LaserTherapy} className='icnn' /> {t("Laser Therapy")}</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{t("Yes")}</td>
                                <td>-</td>
                                <td>{t("No")}</td>

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

                            </tr>

                        </tbody>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}
