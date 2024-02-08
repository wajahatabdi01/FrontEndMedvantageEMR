
import React from 'react';

const MultiStepFormProgressBar = ({ currentStep, totalSteps }) => {
  const progressBarWidth = (currentStep / totalSteps) * 100 + '%';

  return (
    <div className="progress main-progressbar mb-5">
        <div className='current-step-progressbar'>{currentStep}</div>
      <div className="progress-bar multistep-form-progressBar" role="progressbar"
        style={{ width: progressBarWidth }}
    
      
      >
      
      </div>
    </div>
  );
};

export default MultiStepFormProgressBar;
