import React, { useEffect } from 'react'
import LoginGif from '../assest/image/119048-login-verification.gif'

export default function ConfirmIdentity() {

	
  return (
    <>
      <section className="login-wrapper MB-5">
		<div className="container">
			<div className="row">
				<div className="col-sm-6">
					<div className="login-label-input" style={{borderLeft:'1px solid white'}}>
						<div className="text-bold-gray mb-1 mt-3">Sign in </div>
						<div className="text-bold-gray mb-1">Choose our products and
							explore with us.</div>
						<div className="text-thin-gray">To learn more, visit our plans.</div>
						<img src={LoginGif} alt="" className="login-side-img"/>

					</div>
				</div>
				<div className="col-sm-6">
					<div className="for-alert">
						<div id="success" className="alert alert-success alert-dismissible fade show" role="alert"
							style={{display:'none'}}>
							<strong><i className="fa fa-check" aria-hidden="true"></i> </strong> Your travel request has been successfully submitted
							<button type="button" className="close" data-dismiss="alert" aria-label="Close">
								{/* <!-- <span aria-hidden="true">×</span> --> */}
							</button>
						</div>
						<div id="failureFirst" className="alert alert-danger alert-dismissible fade show" role="alert"
							style={{display:'none'}}>
							<strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please Fill All Fields!!
							<button type="button" className="close" data-dismiss="alert" aria-label="Close">
								{/* <!-- <span aria-hidden="true">×</span> --> */}
							</button>
						</div>
						<div id="failureSecond" className="alert alert-danger alert-dismissible fade show" role="alert"
							style={{display:'none'}}>
							<strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please Fill Authentic Information!!
							<button type="button" className="close" data-dismiss="alert" aria-label="Close">
								{/* <!-- <span aria-hidden="true">×</span> --> */}
							</button>
						</div>
					</div>
					<div className="login-label-input">
						<div className="text-thin-gray mt-4"><b>Confirmation for your identity</b></div>
						<div className="text-thin-gray">We sent an email with a verification code to</div>
						<div className="text-thin-gray login-text-w300"><b><span id="labelGetEmail"></span> <a href="##">Not
									You?</a></b></div>
						<div className="text-thin-gray mt-4">Enter it below to confirm your email.</div>

						<div className="login-para mt-2">
							<div className="login-text-w300">Verification code</div>
							<input type="text" name="" id="textOTP"/>
							<input type="hidden" name="" id="textGetEmail"/>
						</div>

						<div className="login-para">
							<button type="button" className="btn-coral" onClick="verifyForRegiter();">Verify</button>
						</div>

						<div>
							<button type="button" className="btn-border" onClick="resendOTP();">Resend verification
								code</button>
						</div>
					</div>
				</div>
			</div>
		</div>

	</section>
    </>
  )
}
