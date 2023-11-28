import React from 'react'

export default function Toster(props) {
    return (
        <div className='med-toaster'>

            {props.value === 0 ?
                <div className='succes-processing'>
                    <i className="bi bi-check-circle-fill"></i> <label>{props.message}</label>
                </div>
                : props.value === 1 ?
                    <div className='alert-processing'>
                        <i className="bi bi-exclamation-triangle"></i> <label>{props.message}</label>
                    </div>
                    :
                    <div className='warning-processing'>
                        <i className="bi bi-exclamation-lg"></i> <label>{props.message}</label>
                    </div>
            }

        </div>
    )
}
