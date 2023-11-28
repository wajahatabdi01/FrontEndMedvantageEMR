import React, { useEffect, useState } from 'react'
import TextEditor from '../../Component/TextEditor';
import TableContainer from '../../Component/TableContainer';
import Heading from '../../Component/Heading';
import Toster from '../../Component/Toster';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import GetSubtestListForMaster from '../Api/SampleRecieve/Get/GetSubtestListForMaster';
import PutSubTestListForMaster from '../Api/Put/PutSubTestListForMaster';

import edit from '../../assets/images/icons/edit.svg'
import save from '../../assets/images/icons/save.svg'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function MicrobiologyTemplateMaster() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  let [showTemplate, setshowTemplate] = useState(false);
  let [getSubtestList, setSubtestList] = useState([]);
  let [editorValue, setEditorValue] = useState("");
  let [subTestId, setSubTestId] = useState("");

  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");

  let [tosterValue, setTosterValue] = useState(0);

  /////////////////// for SummonNote Template /////////////////////
  let handleTexteditor = (e) => {

    setEditorValue(e.target.value)
  }

  ///////////////////// Shows the list of subtests /////////////////////
  let getListOfSubtest = async () => {
    let subTestData = await GetSubtestListForMaster();
    setSubtestList(subTestData.responseValue)

  }

  ///////////////////////// Opens the template for specific subtest //////////////////////////

  let funSubTestTemplate = (id, templateData) => {
   
    setshowTemplate(true);
    setSubTestId(id);
    setEditorValue(templateData);
  }

  ////////////////////////// to save template //////////////////////////////////////////////////////////
  let saveTemplate = async () => {
    if (editorValue.trim() === '') {
      alert('Please fill something in Template');
    }
    else {
      let obj = {
        subTestId: subTestId,
        template: editorValue

      }
      setShowUnderProcess(1);
      let saveData = await PutSubTestListForMaster(obj);
      if (saveData.status === 1) {
        getListOfSubtest();
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage('Data Saved Successfully!');
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
      else {
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(saveData.responseValue);
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }

  }
  useEffect(() => {
    getListOfSubtest();
  }, [])

  return (


    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div class="col-12">
            <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Microbiology_Template_Master")}</div></div></div>

            <div class="row">
              <div className="col-md-6 col-sm-12 plt1">
                <div className="med-box">
                  <div class="heading">{t("SubTest_List")}</div>
                  <div class="med-table-section mt-2" style={{ height: '84vh' }}>
                    <table className='med-table border_ striped'>
                      <thead>
                        <tr>
                          <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                          <th>{t("SubtestName")}</th>
                          <th>{t("Is_Set_Template")}</th>
                          <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSubtestList && getSubtestList.map((list, index) => {

                          return (<>
                            <tr key={list.id}>
                              <td style={{ textAlign: 'center' }}>{index + 1}</td>
                              <td>{list.subTestName}</td>
                              <td>{list.isTemplate}</td>
                              <td className="text-center" onClick={() => { funSubTestTemplate(list.id, list.testtemplate) }} ><img src={edit} className='icnnrd'  alt='' /></td>
                            </tr>
                          </>
                          )
                        })}
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 prt1">
                <div className="med-box">
                  <div class="heading">{t("SubTest_Notes")}</div>
                  <div class="med-table-section mt-2" style={{ height: '84vh' }}>
                    <div className="row">
                      {showTemplate === true && <div className='col-12'>
                        <div className='med-table-section box-shadow-none' style={{ marginTop: '7px', padding:'10px'}}>
                          <TextEditor getTextvalue={handleTexteditor} name="abc" id="abc" setValue={editorValue} />
                        </div>
                        <div>
                        </div>

                      </div>}


                      {showTemplate === true && <div className="col-12">
                        <div className="d-flex justify-content-end gap-2 mt-2" style={{padding:'10px'}}>{showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                          showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <><button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={saveTemplate}><img src={save} className='icnn'  alt='' /> {t("Save")}</button>
                            {/* <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={''}>Clear</button> */}
                          </>
                        }</div></div>}


                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
