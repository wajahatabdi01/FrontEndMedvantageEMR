// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react'

 
import savebtn from "../../../assets/images/icons/savebtn.svg";
import deletebtn from "../../../assets/images/icons/deletebtn.svg";
import editbtn1 from "../../../assets/images/icons/editbtn1.svg";
 
 

function CheckboxToggle() {
  const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const ToggleItem = ({ discription, id }) => {
    const [toggleThisElement, setToggleThisElement] = useState(false);
    return (
      <div className="single-history" key={id}>
          <div
            className="h-head" onClick={() => setToggleThisElement((prev) => !prev)}> 
            <span className='plusicn'><i className='fa fa-plus' ></i></span><span className='rectangle'></span> Admin
          </div>
    
          {toggleThisElement && 
            <div className="h-info"> 
                <div className="graycheckbox">
                    <ul className='nested ulnobullet'>
                      <li className="crudP">
                        <input
                          type="checkbox"
                          id="BioChemistry"
                          value="BioChemistry"
                        /> 
                        <label for="BioChemistry">Bio Chemistry</label>
                      </li>
                      <li className="crud">
                        <input type="checkbox" id="Save" value="Save" /> 
                        <label for="Save"><img src={savebtn} className="icnnchk" alt="" /> Save</label>
                      </li>
                      <li className="crud">
                        <input type="checkbox" id="Edit" value="Edit" /> 
                        <label for="Edit"><img src={editbtn1} className="icnnchk" alt="" /> Edit</label>
                      </li>
                      <li className="crud">
                        <input
                          type="checkbox"
                          id="Delete"
                          value="Delete"
                        />
                        <label for="Delete"><img src={deletebtn} className="icnnchk" alt="" /> Delete</label>
                      </li>

                      <li className="crudP">
                        <input
                          type="checkbox"
                          id="BioChemistry2"
                          value="BioChemistry2"
                        />{" "}
                        <label for="BioChemistry">Bio Chemistry 2</label>
                      </li>
                      <li className="crud">
                        <input type="checkbox" id="Save" value="Save" /> 
                        <label for="Save"><img src={savebtn} className="icnnchk" alt="" /> Save</label>
                      </li>
                      <li className="crud">
                        <input type="checkbox" id="Edit" value="Edit" /> 
                        <label for="Edit"><img src={editbtn1} className="icnnchk" alt="" /> Edit</label>
                      </li>
                      <li className="crud">
                        <input
                          type="checkbox"
                          id="Delete"
                          value="Delete"
                        /> 
                        <label for="Delete"><img src={deletebtn} className="icnnchk" alt="" /> Delete</label>
                      </li>
                    </ul>
                </div>
            </div>
          }
      </div>
    );
  };
  
  


  return (
    <div className="chkk">

 

        {data.map((d, id) => {
          return <ToggleItem id={id} discription={d} />;
        })}

    </div>
  );
}


export default CheckboxToggle;