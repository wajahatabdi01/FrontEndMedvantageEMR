import {useState, useEffect } from "react";
import React from 'react';
import Medication from '../../../../../assets/images/icons/Medication.svg';
import LifeSupport from '../../../../../assets/images/icons/LifeSupport.svg';
import VitalsSign from '../../../../../assets/images/icons/VitalsSign.svg';
import Labs from '../../../../../assets/images/icons/Labs.svg';
import IntakeOutput from '../../../../../assets/images/icons/IntakeOutput.svg';
import ABGAnalysis from '../../../../../assets/images/icons/ABGAnalysis.svg';
import Lines from '../../../../../assets/images/icons/Lines.svg';
import NutrientLevel from '../../../../../assets/images/icons/NutrientLevel.svg';
import Scores from '../../../../../assets/images/icons/Scores.svg';
import DoctorsOrder from '../../../../../assets/images/icons/DoctorsOrder.svg';
import Checklist from '../../../../../assets/images/icons/Checklist.svg';
import Physiotherapy from '../../../../../assets/images/icons/Physiotherapy.svg';

import HealthViewMedication from "./Components/HealthViewMedication";
import { HealthViewVitals } from "./Components/HealthViewVitals";
import { HealthViewLifeSupport } from "./Components/HealthViewLifeSupport";
import { HealthViewLab } from "./Components/HealthViewLab";
import { HealthViewIntakeOutput } from "./Components/HealthViewIntakeOutput";
import { HealthViewABGAnalysis } from "./Components/HealthViewABGAnalysis";
import { HealthViewLines } from "./Components/HealthViewLines";
import { HealthViewNutritionalAchievement } from "./Components/HealthViewNutritionalAchievement";
import { HealthViewScores } from "./Components/HealthViewScores";
import { HealthViewDoctorsOrder } from "./Components/HealthViewDoctorsOrder";
import { HealthViewCheckList } from "./Components/HealthViewCheckList";
import { HealthViewPhysiotherapy } from "./Components/HealthViewPhysiotherapy";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export const HealthViewIndex = () => {

  const {t} = useTranslation();
document.body.dir = i18n.dir();

const [isShown1, setIsShown1] = useState(false);
const LifeSupportshow = event => {
  setIsShown1(current => !current);
};

const [isShown2, setIsShown2] = useState(false);
const VitalsSignshow = event => {
  setIsShown2(current => !current);
};

const [isShown3, setIsShown3] = useState(false);
const Labshow = event => {
  setIsShown3(current => !current);
};

const [isShown4, setIsShown4] = useState(false);
const IntakeOutputshow = event => {
  setIsShown4(current => !current);
};

const [isShown5, setIsShown5] = useState(false);
const ABGAnalysisshow = event => {
  setIsShown5(current => !current);
};

const [isShown6, setIsShown6] = useState(false);
const Linesshow = event => {
  setIsShown6(current => !current);
};

const [isShown7, setIsShown7] = useState(false);
const NutrientLevelshow = event => {
  setIsShown7(current => !current);
};

const [isShown8, setIsShown8] = useState(false);
const Scoresshow = event => {
  setIsShown8(current => !current);
};

const [isShown9, setIsShown9] = useState(false);
const DoctorsOrdershow = event => {
  setIsShown9(current => !current);
};

const [isShown10, setIsShown10] = useState(false);
const Checklistshow = event => {
  setIsShown10(current => !current);
};

const [isShown11, setIsShown11] = useState(false);
const Physiotherapyshow = event => {
  setIsShown11(current => !current);
};


const [isActive, setIsActive] = useState(false);
const handleClick = event => {
  setIsActive(current => !current);
};


///################### table row ative

// document.body.style.overflow = 'hidden';
let getAnchorBlueIcons = document.querySelectorAll('.leftbarb a.blueicon');
for (const getAnchorBlueIcon of getAnchorBlueIcons) {
  getAnchorBlueIcon.addEventListener("click", function () {
    getAnchorBlueIcon.classList.add("active");
  });

}


  return (
    <>
      
          <div className="row">

            <div className='col-md-2 col-sm-12 leftbluesidebar-cnt2 plt1'>
      <div id="simple-list-example" className="leftbluesidebarScroll d-flex_ flex-column_ gap-2_ simple-list-example-scrollspy text-center_">
        <div className='leftbarb'>
          <a className='blueicon active' href='#Medication'>
            <img src={Medication} className='icnn' /> {t('MEDICATION')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={LifeSupportshow} className='blueicon' href="#LifeSupportshow">
            <img src={LifeSupport} className='icnn' /> {t('LIFE_SUPPORT')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={VitalsSignshow} className='blueicon' href="#VitalsSignshow">
            <img src={VitalsSign} className='icnn' /> {t('VITALS_SIGN')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={Labshow} className='blueicon' href='#Labshow'>
            <img src={Labs} className='icnn' /> {t('LABS')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={IntakeOutputshow} className='blueicon' href='#IntakeOutputshow'>
            <img src={IntakeOutput} className='icnn' /> {t('INTAKE_OUTPUT')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={ABGAnalysisshow} className='blueicon' href='#ABGAnalysisshow'>
            <img src={ABGAnalysis} className='icnn' /> {t('ABG_ANALYSIS')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={Linesshow} className='blueicon' href='#Linesshow'>
            <img src={Lines} className='icnn' /> {t('LINES')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={NutrientLevelshow} className='blueicon' href='#NutrientLevelshow'>
            <img src={NutrientLevel} className='icnn' /> {t('NUTRITIONAL_ACHIEVEMENT')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={Scoresshow} className='blueicon' href='#Scoresshow'>
            <img src={Scores} className='icnn' /> {t('SCORES')}
          </a>
        </div>
        <div className='leftbarb'>
          <a onClick={DoctorsOrdershow} className='blueicon' href='#DoctorsOrdershow'>
            <img src={DoctorsOrder} className='icnn' /> {t('DOCTORS_ORDER')}
          </a>
        </div>
                <div className='leftbarb'>
                  <a onClick={Checklistshow} className='blueicon' href='#Checklistshow'><img src={Checklist} className='icnn' />{t("CHECKLIST")}</a>
                </div>
                <div className='leftbarb'>
                  <a onClick={Physiotherapyshow} className='blueicon' href='#Physiotherapyshow'><img src={Physiotherapy} className='icnn' /> {t("PHYSIOTHERAPY")}</a>
                </div>
              </div>
            </div>

            <div className='col-md-10 col-sm-12 prt1'>
              <div className="col-12">
                <div className='gridsec'>
                  <div className='gridsec-in'>
                    {/* <div><i className='fa fa-bars'></i></div> */}
                    <div onClick={handleClick}><i className='fa fa-th-large'></i></div>
                  </div>
                </div>
              </div>

              <div className="relative" style={{ overflowX: 'auto' }}>
                <div className='nn1 smoothScroll_ scrollspy-example rightbluesidebarScroll' data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" tabIndex="0">

                  {/* Medication */}
                  <div className={isActive ? 'col-12 nn' : ''} id='Medication'>
                    <HealthViewMedication />
                  </div>

                  {/* Life Support */}
                  {isShown1 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='LifeSupportshow'>
                      <HealthViewLifeSupport />
                    </div>
                  )}


                  {/* Vitals Sign */}
                  {isShown2 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='VitalsSignshow'>
                      <HealthViewVitals />
                    </div>
                  )}

                  {/* Labs */}
                  {isShown3 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='Labshow'>
                      <HealthViewLab />
                    </div>
                  )}


                  {/* Intake/Output */}
                  {isShown4 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='IntakeOutputshow'>
                      <HealthViewIntakeOutput />
                    </div>
                  )}

                  {/* ABG Analysis */}
                  {isShown5 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='ABGAnalysisshow'>
                     <HealthViewABGAnalysis />
                    </div>
                  )}

                  {/* Lines */}
                  {isShown6 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='Linesshow'>
                      <HealthViewLines />
                    </div>
                  )}


                  {/* Nutritional Achievement */}
                  {isShown7 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='NutrientLevelshow'>
                    <HealthViewNutritionalAchievement />
                    </div>
                  )}

                  {/* Scores */}
                  {isShown8 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='Scoresshow'>
                      <HealthViewScores />
                    </div>
                  )}

                  {/* Doctors Order */}
                  {isShown9 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='DoctorsOrdershow'>
                      <HealthViewDoctorsOrder />
                    </div>
                  )}

                  {/* Checklist */}
                  {isShown10 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='Checklistshow'>
                      <HealthViewCheckList />
                    </div>
                  )}

                  {/* Physiotherapy */}
                  {isShown11 && (
                    <div className={isActive ? 'col-12 nn' : ''} id='Physiotherapyshow'>
                      <HealthViewPhysiotherapy />
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        
    </>
  )
}
