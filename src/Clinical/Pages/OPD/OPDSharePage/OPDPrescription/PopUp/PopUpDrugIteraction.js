import React, { useEffect, useState } from 'react'
// import Heading from '../../../../../../Components/Heading'
import BoxHeading from '../../../../../../Component/BoxHeading';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function PopUpDrugIteraction(props) {
  document.body.dir = i18n.dir();
  const {t} = useTranslation();
  let [showModal1, setShowModal1] = useState(0)
  let [showModal2, setShowModal2] = useState(0)

  let handleAddMedicine = (value) => {
    console.log("valuess", value)
    let temp = [...props.medicationData]

    temp[temp.length - 2]["drugName"] = value.medicineName
    temp[temp.length - 2]["id"] = 0
    temp[temp.length - 2]["drugId"] = 0
    temp[temp.length - 2]["medicineId"] = value.id
    props.getData(temp)
    props.func(0)
  }
  useEffect(() => {
    setShowModal1(props.show)
  }, [props.show])
  return (
    <>
    
      <div className={`modal  d-${showModal1 === 1 ? "block" : "none"}`} data-bs-backdrop="static" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered_ modal-xl PopUpModal" style={{ margin: '30px auto' }}>
          <div className="modal-content p-0">
            {/* <div className="modal-header d-flex flex-row justify-content-between"> */}
            {/* <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Modal 1</h1> */}
            {/* <Heading text="Drug Interaction" /> */}
            {/* <span></span> */}
            {/* <span type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { props.func(0) }}></span>
            </div> */}
            <div className="modal-header">
              <h1 className="modal-title fs-6 text-white" id="exampleModalLabel">
                <label htmlFor="">
                <BoxHeading title={t("Drug Interaction")} />
                </label>
              </h1>

              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { props.func(0) }}><i className="bi bi-x-octagon"></i></button>
            </div>





            <div className="modal-body p-0 m-0"> 
              {/* for Drug Interaction */}
              <div className='d-flex flex-column gap-1 '>
                {props.drugInteractionData.length != 0 ?
                  <>
                    {/* <BoxHeading title={t("Drug Interaction")} /> */}

                    <div style={{ maxHeight: "200px", overflowY:"auto"}}>
                      <table className='med-table border-bottom '>
                        <tbody>
                          {props.drugInteractionData.map((val, ind) => {
                            return (
                              <tr>

                                <td className='text-danger'><strong>{val.interaction.split("+")[0]}</strong> has <strong>{val.interactionNature}</strong> {t("Interaction with")} <strong>{val.interaction.split("+")[1]}</strong> &nbsp;&nbsp;(<span>{val.reference})</span>  </td>
                              </tr>

                            )

                          })}

                        </tbody>
                      </table>

                    </div>
                  </> : ""}

                {props.contraIndicationnData.length != 0 ? <div className=''>
                  <BoxHeading title={t("Contradictions")} />

                  {/* <Heading text="Contradictions" /> */}
                  <div className='wrap ps-2 pe-2' style={{ maxHeight: "200px" }}>
                    <table className='med-table border_ striped'>
                      <thead>
                        <th>#</th>
                        <th>{t("Contraindicated Drug")}</th>
                        <th>{t("Contraindicated Disease")}</th>
                        <th>{t("Reference")}</th>
                      </thead>
                      <tbody>
                        {props.contraIndicationnData.map((val, ind) => {
                          return (
                            <tr>
                              <td>{ind + 1}</td>
                              <td>{val.medicineName}</td>
                              <td>{val.problemName}</td>
                              <td>{val.reference}</td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </table>
                  </div>
                </div> : ""}

                {props.sideEffectData.length != 0 ? <div className=''>
                  <BoxHeading title="Side Effects" />
                  {/* <Heading text="Side Effects" /> */}
                  <div className='wrap ps-2 pe-2' style={{ maxHeight: `${props.drugInteractionData.length != 0 ? "200px" : "500px"}` }}>
                    <table className='med-table border striped'>
                      <thead>
                        <th>#</th>
                        <th>{t("Medicine Name")}</th>
                        <th>{t("Molecule")}</th>
                        <th>{t("Common Side Effect")}</th>
                        <th>{t("Rare Side Effect")}</th>
                        <th>{t("Other Side Effect")}</th>
                      </thead>
                      <tbody>
                        {props.sideEffectData.map((val, ind) => {
                          return (
                            <tr>
                              <td>{ind + 1}</td>
                              <td>{val.medicineName}</td>
                              <td>{val.molecule}</td>
                              <td>{val.commonSideEffect}</td>
                              <td>{val.rareSideEffect}</td>
                              <td>{val.otherSideEffect}</td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </table>
                  </div>
                </div> : ""}
              </div>

              {props.drugInteractionData.length != 0 ?
                <>
                  <BoxHeading title={t("Effective & Suggestive Action")} />

                  <div className="modal-body" style={{height:"400px", overflowY:"auto"}}>
                    {props.drugInteractionData && props.drugInteractionData.map((val, ind) => {
                      return (

                        <div className='d-flex flex-column gap-3' >
                          <table className='med-table border-bottom striped_'>
                            <tbody>
                              <tr>
                                <td style={{ width: "15%" }}><b>{t("Effects")}:</b></td>
                                <td>{val.interactionEffect}</td>
                              </tr>
                              <tr>
                                <td><b>{t("Suggestive Action")}:</b></td>
                                <td>{val.suggestiveAction}</td>
                              </tr>
                            </tbody>
                          </table>
                          {/* <div className='d-flex flex-row gap-3 effectiveSuggestive'>
                            <strong>Effects:</strong>
                            <p>{val.interactionEffect}</p>
                          </div>
                          <div className='d-flex flex-row gap-3 effectiveSuggestive'>

                            <strong>Suggestive Action:</strong>
                            <p>{val.suggestiveAction}</p>
                          </div> */}
                          <div className='d-flex flex-column '  >
                            <h6>{t("Substitute for Medicine")} {val.interaction.split("+")[0]} {t("are")}:</h6>
                            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                              <table className='med-table border-bottom striped_'>

                                <thead>
                                  <th>#</th>
                                  <th>{t("Medicine Name")}</th>
                                  <th>{t("Substitute Name")}</th>
                                </thead>
                                <tbody>
                                  {JSON.parse(val.substituteList).map((val, ind) => {
                                    return (
                                      <tr >
                                        <td>{ind + 1}</td>
                                        <td>{val.medicineName}</td>
                                        <td>{val.substitudeWithID.map((val, ind) => {
                                          return (
                                            <>
                                              {ind === 0 ?
                                                <tr>
                                                  <td><b>{t("NAME")}</b></td>
                                                  <td style={{ width: "15%", textAlign: "center" }}><b>{t("Action")}</b></td>
                                                </tr> : ""}
                                              <tr>
                                                <td style={{}}>{val.medicineName}</td>
                                                <td className='text-center'><button onClick={() => { handleAddMedicine(val) }}>+</button></td>
                                              </tr>

                                            </>

                                          )
                                        })}</td>

                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
                : ""}

              {/* for Contradiction */}
            </div>


            {/* <div className="modal-footer">
              <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={()=>{setShowModal1(0)}}>Open second modal</button>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-xl PopUpModal">
          <div className="modal-content">
            <div className="modal-header">
              <BoxHeading title="Effective && Suggestive Action" />
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { props.func(0) }}></button>
            </div>
            <div className="modal-body">
              {props.drugInteractionData && props.drugInteractionData.map((val, ind) => {
                return (

                  <div className='d-flex flex-column gap-3'>
                    <div className='d-flex flex-row gap-3 effectiveSuggestive'>
                      <strong>Effects:</strong>
                      <strong>{val.interactionEffect}</strong>
                    </div>
                    <div className='d-flex flex-row gap-3 effectiveSuggestive'>
                      <strong>Suggestive Action:</strong>
                      <strong>{val.suggestiveAction}</strong>
                    </div>
                    <div className='d-flex flex-column '>
                      <strong>Substitute for Medicine {val.interaction.split("+")[0]} are:</strong>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={() => { setShowModal1(1) }}>Back</button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <a className="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a> */}
    </>
  )
}
