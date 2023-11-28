import React from 'react'
import LoginGif from '../assest/image/119048-login-verification.gif'


export default function ForgotPassword() {
  return (
    <>
      <section className="login-wrapper mb-5">
		<div className="container">
			<div className="row">
				<div className="col-sm-6">
					<div className="login-label-input" style={{border:'1px solid white'}}>
						<div className="text-bold-gray mb-1 mt-3">Sign in </div>
						<div className="text-bold-gray mb-1">Choose our products and
                            explore with us.</div>
						<div className="text-thin-gray">To learn more, visit our plans.</div>
						<img src={LoginGif} alt="" className="login-side-img"/>

					</div>
				</div>
				<div className="col-sm-6">
					<div className="login-label-input">
						<div className="text-thin-gray mt-4"><b>Confirmation for your identity</b></div>
						<div className="text-thin-gray">We sent an email with a verification code to</div>
						<div className="text-thin-gray login-text-w300"><b>xyz2abc@gmail.com. <a href="">Not You?</a></b></div>
						<div className="text-thin-gray mt-4">Enter it below to confirm your email.</div>

						<div className="login-para mt-2">							
							<div className="login-text-w300">Verification code</div>
							<input type="text" name="" id=""/>
						</div>						

						<div className="login-para">
							<button type="button" className="btn-coral">Verify</button>							
						</div>

						<div>
							<button type="button" className="btn-border">Resend verification code</button>
						</div>
					</div>
				</div>
			</div>
		</div>

	</section>
    </>
  )
}
