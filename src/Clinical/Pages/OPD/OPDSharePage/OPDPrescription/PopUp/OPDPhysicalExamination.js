import React, { useEffect, useState } from 'react'
import Loader from '../../../../../../Component/Loader'
// import Heading from '../../../../../../Components/Heading'
import { Editor } from 'react-draft-wysiwyg'
// import "../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDPhysicalExamination(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    
    let [showloder, setShowloder] = useState(0)

    const [textdata, setTextdata] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    console.log(textdata);
  }, [textdata]);
   
    return (
        <>
            <div className={`${props.val === 0 ? 'offcanvas' : "offcanvas show"}   offcanvas-end`} style={{ width: "400px" }} data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="symptoms" aria-labelledby="symptomsLabel">
                <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                    <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { props.fun(0) }}><i className='fa fa-close ' ></i></div>
                    <h5 className="offcanvas-title text-white" id="symptomsLabel">{t("Physical Examination")}</h5>
                    {/* <button type="button" className="btn-close"  ></button> */}
                </div>
                <div className="offcanvas-body ps-4 pe-3" >
                    <div className='d-flex flex-column gap-1'>

                        <div className='d-flex flex-column flex-lg-row gap-3'>
                            <input type='date' className='ps-2 pe-2' />
                            <input type='date' className='ps-2 pe-2' />
                        </div>
                        <div className='d-flex fex-row pt-4'>

                            <Editor editorState={textdata}
                                toolbarClassName="toolbarClassName"

                                wrapperClassName="wrapperClassName"
                                
                                editorClassName="editorClassName"
                                onEditorStateChange={setTextdata} />
                           
                        </div>



                    </div>
                </div>
                <Loader val={showloder} />
            </div>
            <div className="offcanvas-backdrop fade show"></div>

        </>
    )
}
