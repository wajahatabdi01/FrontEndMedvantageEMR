import React from 'react'

export default function ToStartUnderProcess() {
    return (
        <div className='med-toaster success'>
            <div className='under-processing'>
                <div className="spinner-border text-success" role="status"></div>
                <label>Data is under processing...</label>
            </div>
        </div>
    )
}
