import React, { useEffect, useRef, useState } from 'react'

export default function TextBoxWithSearch(props) {
    const [active, setActive] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(true);
    const [input, setInput] = useState("");
    const selectRef = useRef(null);

    function setChange() {
        const selected = selectRef?.current?.querySelector(".active");
        if (selected) {
            selected?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    const onChange = (e) => {
        const suggestions = props.list;
        
        const input = e.currentTarget.value;
        // const newFilteredSuggestions
        if (suggestions.length !== 0) {
            
            const newFilteredSuggestions = suggestions.filter(
                (val) =>
                    val[props.displayName].trim()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) > -1
            );
            setFiltered(newFilteredSuggestions);
        }
        setActive(0);
        setIsShow(true);
        setInput(e.currentTarget.value);
        props.getvalue(e, props.index);
    };
    const onClick = (e, suggestion) => {
        setActive(0);
        setFiltered([]);
        setIsShow(false);
        setInput(e.currentTarget.innerText);
       
        let target = {
            target: {
                value: e.currentTarget.innerText,
                name: props.name,
                allValue:suggestion

            }
        }
        props.getvalue(target, props.index);
    };
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            // enter key
            setActive(0);
            setIsShow(false);
           
            setInput(filtered[active][props.displayName]);
            
            let target = {
                target: {
                    value: filtered[active][props.displayName],
                    name: props.name,
                    allValue: filtered[active]

                }
            }
            props.getvalue(target, props.index);
            props.getvalue(e, props.index);
        } else if (e.keyCode === 38) {
            // up arrow
            return active === 0 ? null : setActive(active - 1);
        } else if (e.keyCode === 40) {
            // down arrow
         
            return active - 1 === filtered.length ? null : setActive(active + 1);
        }
    };
    const renderAutocomplete = () => {
        if (input.length !== 0) {
            if (isShow && input) {
                if (filtered.length) {
                    return (
                        <ul className="autocomplete" ref={selectRef}>
                            {filtered.map((suggestion, index) => {
                                let className;
                                if (index === active) {
                                    className = "active";
                                }
                                setTimeout(() => {
                                    setChange();
                                }, [100]);
                                return (
                                    <li
                                        className={className}
                                        key={suggestion.displayName}
                                        id={suggestion["valueName"]}
                                        onClick={(e) => {
                                            onClick(e, suggestion);
                                        }}
                                    >
                                        {suggestion[props.displayName]}
                                    </li>
                                );
                            })}
                        </ul>
                    );
                } else {
                    // return (
                    //     <div className="no-autocomplete">
                    //         <em>Not found</em>
                    //     </div>
                    // );
                    setIsShow(false)
                }
            }
        } else {
            setIsShow(false);
        }

        return (
            <>
                <ul className="autocomplete" ref={selectRef}>
                    {props.list && props.list.map((val, ind) => {
                        let className;
                        if (ind === active) {
                            className = "active";
                        }
                        return (
                            <li className={className} key={val.id} onClick={onClick}>
                                {val[props.displayName]}
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    };
    useEffect(() => {
        
        setInput(props.editdata);
        // if (props.editdata) {
        // }
        // else{
        //     setInput("");

        // }
        if (props.clear === 1) {
            setInput("");
            props.clearFun(0);
        }
        if (input.length === 0) {
        }
    }, [props.clear]);
    return (
        <>
            <input
                autoComplete="off"
                name={props.name}
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
                placeholder={input.length !== 0 ? input : props.defaulNname}
                className={props.StyleClass}
                style={props.style}
                id={props.name}
            />
            {isShow === true ? renderAutocomplete() : ""}
        </>
    );
}
