import React, { useRef, useState } from 'react'

export default function AutoComplete(props) {
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
    const { suggestions } = props;
    console.log("props", suggestions[0][props.searchKey])
    const input = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      (suggestion) => suggestion[props.searchKey].toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value);
  };
  const onClick = (e) => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(0);
      setIsShow(false);
      setInput(filtered[active]);
    } else if (e.keyCode === 38) {
      // up arrow
      return active === 0 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1);
    }
  };
  const renderAutocomplete = () => {
    if(input.length !== 0)
    {
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
                  <li className={className} key={suggestion.id} onClick={onClick}>
                    {suggestion[props.searchKey]}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          return (
            <div className="no-autocomplete">
              <em>Not found</em>
            </div>
          );
        }
      }
    }
    else{
      setIsShow(false)
    }
    

    
    return (
      <>
        <ul className="autocomplete" ref={selectRef}>
          {props.suggestions.map((val, ind) => {
            let className;
            if (ind === active) {
              className = "active";
            }
            return (
              <li className={className} key={val.id} onClick={onClick}>
                {val[props.searchKey]}
              </li>
            );
          })}
        </ul>
      </>
    );
  };
  return (
    <>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {renderAutocomplete()}
    </>
  );
};

