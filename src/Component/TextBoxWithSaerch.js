import React, { useState } from "react";
import { FindByQuery } from "../Code/Serach";

export default function TextBoxWithSaerch(props) {
    let [hideBox, setHideBox] = useState(-1);
    let [listShow, setListBox] = useState([]);

    let handleClick = (value) => {
        props.getClickValue(value);
        document.getElementById(props.id).value = value[props.displayName];
        setHideBox(-1);
    };

    let handleOnchange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        props.getTextOnchange(value);
        if (value.length !== 0) {
            let response = FindByQuery(props.list, value, props.searchParameter);

            if (response.length !== 0) {
                setListBox(response);
                setHideBox(1);
            } else {
                setListBox([]);
                setHideBox(-1);
            }
        } else {
            setListBox([]);
            setHideBox(-1);
        }
    };
    return (
        <div className="position-relative">
            <input
                autoComplete="off"
                style={{ zIndex: 25 }}
                type="text"
                id={props.id}
                onChange={handleOnchange}
            />
            {hideBox === 1 ? (
                <div className="position-absolute opdmedicationsearchbox">
                    <ul id="drugul">
                        {listShow &&
                            listShow.map((val, index) => {
                                return (
                                    <li
                                        className="pointer"
                                        onClick={(e) => {
                                            handleClick(val);
                                        }}
                                    >
                                        {val[props.displayName]}
                                    </li>
                                );
                            })}
                    </ul>
                    <div
                        className="full-screen-div-opd"
                        onClick={() => {
                            setHideBox(-1);
                        }}
                    ></div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
