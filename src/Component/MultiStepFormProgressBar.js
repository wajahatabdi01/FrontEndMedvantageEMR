import React from 'react';

const MultiStepFormProgressBar = ({ currentStep, totalSteps }) => {
  const progressBarWidth = (currentStep / totalSteps) * 100 + 'px';
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="progress main-progressbar mb-5">
      <div className="progress-bar-container">
        {steps.map(stepNumber => (
          <div key={stepNumber} className={`step-marker ${stepNumber <= currentStep ? 'completed' : ''}`}>
            {stepNumber}
          </div>
        ))}
      </div>
      <div className="progress-bar multistep-form-progressBar" role="progressbar" style={{ width: progressBarWidth }}></div>
    </div>
  );
};

export default MultiStepFormProgressBar;
