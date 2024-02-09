import React from 'react';

// const MultiStepFormProgressBar = ({ currentStep, totalSteps, stepNames }) => {
//   // const progressBarWidth = currentStep === 0 ? '0%' : (currentStep / totalSteps) * 100 + '%';
//   const progressBarWidth = (currentStep / (totalSteps - 1)) * 100 + '%';

//   return (
//     <div className="progress main-progressbar" style={{ marginBottom: "4rem" }}>
//       <div className="progress-bar-container">
//         {[...Array(totalSteps)].map((_, index) => (
//           <div key={index + 1} className={`step-marker ${index + 1 <= currentStep ? 'completed' : ''} ${index + 1 === totalSteps ? 'last-step' : ''}`}>
//             {index + 1 < totalSteps && <div>{index + 1}</div>}
//             {stepNames && stepNames[index] && <div className="step-heading mt-5 pt-2 formstepName">{stepNames[index]}</div>}
//             {index + 1 <= currentStep && index + 1 !== totalSteps && <span className="tick-icon">&#10003;</span>}
//           </div>
//         ))}
//       </div>
//       <div className="progress-bar multistep-form-progressBar" role="progressbar" style={{ width: progressBarWidth, transition: 'all 0.5s' }}></div>
//     </div>
//   );
// };

const MultiStepFormProgressBar = ({ currentStep, totalSteps, stepNames }) => {
  // Calculate progress percentage
  const progressBarWidth = (currentStep / (totalSteps - 1)) * 100 + '%';

  return (
    <div className="progress main-progressbar" style={{ marginBottom: "4rem" }}>
      <div className="progress-bar-container">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index + 1} className={`step-marker ${index + 1 <= currentStep ? 'completed' : ''} ${index + 1 === totalSteps ? 'last-step' : ''}`}>
            {index + 1 !== totalSteps && (
              <>
                {index < currentStep ? <span className="tick-icon">&#10003;</span> : <div>{index + 1}</div>}
              </>
            )}
            {stepNames && stepNames[index] && <div className="step-heading mt-5 pt-2 formstepName">{stepNames[index]}</div>}
          </div>
        ))}
      </div>
      <div className="progress-bar multistep-form-progressBar" role="progressbar" style={{ width: progressBarWidth, transition: 'width 0.5s' }}></div>
    </div>
  );
};

export default MultiStepFormProgressBar;
