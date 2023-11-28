import React from "react";
import { useState, useEffect } from "react";
import offcanvaslogo from "../../assets/images/Navbar/offcanvas-logo.png";
export default function ChallanReceipt() {
  let [receiptprint, setreceiptprint] = useState();
  let [itemDetail, setItemDetail] = useState([]);
  let GetReceiptDetails = () => {
    let data = JSON.parse(window.sessionStorage.getItem("ChallanReceiptdata"));
    setreceiptprint(data[0]);
    let itemD = JSON.parse(data[0].ics_data);

    setItemDetail(itemD);
  };

  useEffect(() => {
    GetReceiptDetails();
    setTimeout(() => {
      handlepritnt();
    }, 1200);
  }, []);

  let handlepritnt = () => {
    document.title = "Challan Receipt";
    window.print("");
    window.close();
  };
  const totalQuantity = itemDetail.reduce((total, data) => total + data.qty, 0);
  return (
    <>
      {receiptprint && (
        <>
          <section className="main-content dpt-3 mt-5">
            <div className="card-wrapper">
              <div className="quater-border right-top"></div>
              <div className="quater-border left-bottom"></div>
              <div className="water-mark">
                <div className="clientText">Medvantage</div>
              </div>

              <table className="tableHeaderFooter">
                <thead>
                  <tr>
                    <td>
                      <div className="dis-hed">
                        <div className="logo-main">
                          <img
                            src={offcanvaslogo}
                            style={{ width: "100%" }}
                            alt="Brand Logo"
                          />
                        </div>

                        <div className="address-section">
                          <div className="organizationName">
                            Era Medical College
                          </div>
                          <div className="organizationAddress">
                            Sarfarazganj,Lucknow,Uttar Pradesh 226003
                          </div>
                          <div className="email">Email: demo@med.com</div>
                          <div className="organizationContact">
                            Phone: +91 3214569874{" "}
                          </div>
                        </div>

                        <div className="pres-inn"> &nbsp;</div>
                      </div>

                      <div className="pat-dtls text-center">
                        <div className="document-title"> Inward Challan</div>
                      </div>
                      {/* ----------------------------Patient Information--------------------------------------- */}
                    </td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <div className="pat-dtls">
                        {/* <div className='document-title fs-6'>Suggested Investigations</div> */}
                        <table className="table-certificate border_ cert-top1">
                          <tr>
                            <td>
                              Consign by (Cust) :{receiptprint.recivedto}{" "}
                            </td>
                            <td>Challan No.: {receiptprint.challannumber}</td>
                            <td>Date: {receiptprint.createdDate}</td>
                          </tr>

                          <tr>
                            <td colspan={3}>
                              <b>Destination:</b> {receiptprint.destination}
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <b>Dispatched from:</b> Lucknow, Uttar Pradesh
                            </td>
                            <td colspan={2}>
                              <b>Remarks</b> {receiptprint.signature}{" "}
                            </td>
                          </tr>
                        </table>

                        <table className="table-certificate border cert-top1">
                          <tr>
                            <td class="text-center">
                              <b>#</b>
                            </td>
                            <td>
                              <b>Description of Materials</b>
                            </td>
                            <td>
                              <b>Serial No.</b>
                            </td>
                            <td>
                              <b>Quantity</b>
                            </td>
                          </tr>

                          {itemDetail &&
                            itemDetail.map((data, index) => {
                              return (
                                <tr>
                                  <td class="text-center">{index + 1}</td>
                                  <td>{data.descripation}</td>
                                  <td>{data.serialNumber}</td>
                                  <td>{data.qty}</td>
                                </tr>
                              );
                            })}

                          <tr>
                            <td colspan={2}>
                              <b>Approx value of Materials: NA</b>
                            </td>
                            <td>
                              <b>Total No.of items:</b>{" "}
                            </td>
                            <td>{totalQuantity}</td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>

                <tfoot>
                  <td>
                    <table className="table-certificate border cert-top1">
                      <tr>
                        <td colspan="3">
                          <b>For Web Works India Pvt,Ltd</b>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <b>Signature</b>
                        </td>
                        <td>
                          <b>Stamp</b>
                        </td>
                        <td>
                          <b>Authorised Signature</b>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tfoot>
              </table>
            </div>

            {/* <div class="row">
			<div class="table-responsive">
                <div class="table-responsive custom_datatable">						
					<table class="table table-bordered" style={{width:"100%",margin:"auto",textAlign:"left"}} >
                        <tbody>
							
									<>
									
									<tr>
                                <td rowspan="2" colspan="2"><img src={offcanvaslogo} alt=""></img><h3 style={{margin:"10px 0 0 10px"}}>Inward Challan</h3></td>
                            </tr>									
                            <tr>
								<td colspan="3"><p>K.No-3,Lucknow - Hardoi - Shahjahanpur Rd,</p>
                                <p className="mt-1">Sarfarazganj,Lucknow,Uttar Pradesh 226003</p>
                                </td>  											
                            </tr>
							<tr  style={{border : 'none'}}>
								<td colspan="2">Consign by (Cust) :{receiptprint.recivedto} </td>
                                <td>Challan No.</td>
								<td colspan="2">{receiptprint.challannumber}</td>
								
							</tr>
                            <tr  style={{border : 'none'}}>
                                <td colspan="2"></td>  
                                <td>Date</td>  
								<td colspan="2">{receiptprint.createdDate}</td>  											
                            </tr>
							<tr>
								<td colspan="2"></td>
								<td colspan="3">
                                    <h6>Destination:</h6>
                                    <p>{receiptprint.destination}</p>
                                </td>
							</tr>
                            <tr>
                                <td colspan="1"><h6>Dispatched from:</h6></td>
                                <td colspan="2">Lucknow, Uttar Pradesh</td>
                                <td >
                                    <h6>Remarks</h6>
                                    <p>{receiptprint.signature}</p>
                                </td>
                            </tr>	
                            <tr>
                                <td><h6>#</h6></td>
                                <td><h6>Description of Materials</h6></td>
                                <td><h6>Serial No.</h6></td>
                                <td><h6>Quantity</h6></td>
                            </tr>
							{itemDetail && itemDetail.map((data,index)=>{
								return(
									<tr>
									<td>{index+1}</td>
									<td>{data.descripation}</td>
									<td>{data.serialNumber}</td>
									<td>{data.qty}</td>	
								</tr>
								)
							})}
		
							<tr>
								<td colspan="2"><h6>Approx value of Materials: NA</h6></td>
								<td colspan="1"><h6>Total No.of items:</h6></td>
								<td>{totalQuantity}</td>
							</tr>
							<tr className = "" style={{height: '8vh'}}>
								<td colspan="4" style={{textAlign: 'center'}}><h6 style={{marginTop: '25px'}}>For Web Works India Pvt,Ltd</h6></td>
							</tr>
							<tr>
								<td><h6>Signature</h6></td>
								<td colspan="2"><h6 style={{textAlign : 'center'}}>Stamp</h6></td>
								<td colspan="2"><h6>Authorised Signature</h6></td>
							</tr>
							<tr style={{height : "8vh"}}>
								<td></td>
								<td colspan="2"></td>
								<td colspan="2"></td>
							</tr>
									</>
							
													

						</tbody>
					</table>
				</div>
			</div> 
            </div> */}
          </section>
        </>
      )}
    </>
  );
}
