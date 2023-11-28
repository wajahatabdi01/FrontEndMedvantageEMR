import React from 'react';
import TableContainer from '../../../../../../Component/TableContainer';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export const HealthViewDoctorsOrder = () => {
    const {t} = useTranslation();
    document.body.dir = i18n.dir()
    return (
        <>
            <div className='gridb'>
                <div className='listdetailsct pac'>
                    <div className='listdetailsct-in'>
                        <div className='listd-in showing'>{t("DOCTORS_ORDER")}</div>
                    </div>
                </div>

                <div className="med-table-section histry_view">
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{ "width": "5%" }}><span className="timer">#</span></th>
                                <th><span className="timer">{t("Doctors Order")}</span></th>
                                <th><span className='timer'>{t("Order Status")}</span></th>
                                <th><span className='timer'>{t("Ordered At")}</span></th>
                                <th><span className='timer'>{t("Ordered By")}</span></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="text-center">1</td>
                                <td>{t("Send Trop-I")}</td>
                                <td className='greentxt1'>{t("Done")}</td>
                                <td>09/06/23 11:30 am</td>
                                <td>{t("Dr. Shaheer Parvez")}</td>
                            </tr>

                            <tr>
                                <td className="text-center">2</td>
                                <td>{t("Send Trop-I")}</td>
                                <td className='redtxt1'>{t("Pending")}</td>
                                <td>09/06/23 11:30 am</td>
                                <td>{t("Dr. Shaheer Parvez")}</td>
                            </tr>


                            <tr>
                                <td className="text-center">3</td>
                                <td>{t("Send Trop-I")}</td>
                                <td className='redtxt1'>{t("Pending")}</td>
                                <td>09/06/23 11:30 am</td>
                                <td>{t("Dr. Shaheer Parvez")}</td>
                            </tr>

                            <tr>
                                <td className="text-center">4</td>
                                <td>{t("Send Trop-I")}</td>
                                <td className='greentxt1'>{t("Done")}</td>
                                <td>09/06/23 11:30 am</td>
                                <td>{t("Dr. Shaheer Parvez")}</td>
                            </tr>

                            <tr>
                                <td className="text-center">5</td>
                                <td>{t("Send Trop-I")}</td>
                                <td className='redtxt1'>{t('Pending')}</td>
                                <td>09/06/23 11:30 am</td>
                                <td>{t("Dr. Shaheer Parvez")}</td>
                            </tr>

                            <tr>
                                <td className="text-center">6</td>
                                <td>{t("Send Trop-I")}</td>
                                <td className='redtxt1'>{t("Pending")}</td>
                                <td>09/06/23 11:30 am</td>
                                <td>{t("Dr. Shaheer Parvez")}</td>
                            </tr>
                        </tbody>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}
