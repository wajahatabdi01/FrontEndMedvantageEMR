import React from 'react'
import TableContainer from '../../../../../Components/TableContainer';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDViewVitalsHistoryPopUp() {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();

    let p = [[], [], [], [], [], [], [], [], [], [],[],[],[],[],[],[],[],[],[],[],[]]
    return (
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header" style="background: #1D4999;">
                <h1 class="modal-title fs-5" id="staticBackdropLabel" style="color: white;">{t("Vital Chart History")}</h1>
                <button type="button" class="btn-close me-3" style="background-color: white; border-radius: 50px; width: 15px; height: 15px;" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="max-height: 500px;">
                <div class="overflow-auto mb-2" style="height: 480px;">
                    <TableContainer>
                        <thead style="height: 10px;">
                            <th>{t("S.No.")}</th>
                            <th>{t("SPO2")}</th>
                            <th>{t("BP")}</th>
                            <th>{t("PR")}</th>
                            <th>{t("RR")}</th>
                            <th>{t("Temp")}</th>
                            <th>{t("Weight")}</th>
                            <th>{t("Height")}</th>
                            <th>{t("Date Time")}</th>
                            <th>{t("Taken By")}</th>
                            <th>{t("Action")}</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="ps-2">1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </TableContainer>
                </div>
            </div>
        </div>
    </div>
</div>

    )
}
