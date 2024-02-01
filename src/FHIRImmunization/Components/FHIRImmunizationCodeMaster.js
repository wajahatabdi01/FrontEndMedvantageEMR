import React, { useEffect, useState } from 'react'
import Loader from '../../Component/Loader'
import Heading from '../../Component/Heading'

import GetCodeDropdown from '../../FHIRLab/API/GET/GetCodeDropdown'
import GetCodeBind from '../../FHIRLab/API/GET/GetCodeBindList'

import Search from  '../../assets/images/icons/search_7079548.png';
import Delete from '../../assets/images/icons/delete.svg';
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'



export default function FHIRImmunizationCodeMaster(props) {

  const [getCodeList, setCodeList] = useState([])
    const [getCodeBindList, setCodeBindList] = useState([])
    
    const [textSearch, setTextSearch] = useState('')
    const [getCode, setCode] = useState('')
    const [arrToFwd, setArrToFwd] = useState([]);
    const [showImage, setShowImage] = useState(0);
    const [loader, setLoader] = useState(0);

    ///////////////////////////////////////////// search text box /////////////////////////////

    let handleSearchChange = (e) => {
      setTextSearch(e.target.value)
  }

  ////////////////////////////////////////////////// to set code /////////////////////////////

  let funSetCode = (code) => {
      setCode(code);
  }

  //////////////////////////////////// to Get Code list in dropdown
  let funGetCodeList = async () => {
      const getResponse = await GetCodeDropdown();
      
      setCodeList(getResponse.responseValue)
  }

  

  

  /////////////////////////////////////// To Bind the list of code from dropdown ////////////////////////
  let funBindCodeList = async (e, codeName ) => {
      if (getCode === '' && getCode === undefined && getCode === null && codeName !== "") {
          alert('Please select code.');
      }
      else {
          setLoader(1);
          //const codeNames = codeName = ""?codeName:getCode;
          const codeNames = getCode;
          if(codeName !== undefined){
              let getBindRes = await GetCodeBind(codeName, textSearch);
              if(getBindRes.status === 0) {
                  setLoader(0);
                  setShowImage(1);
              }
              else{
                  setLoader(0)
              setShowImage(0)
              setCodeBindList(getBindRes.responseValue.slice(0,50))
              }
          }
          else{
              let getBindRes = await GetCodeBind(codeNames, textSearch);
              if(getBindRes.status === 0) {
                  setLoader(0);
                  setShowImage(1);
              }
              else{
                  const result = getBindRes.responseValue;
              setLoader(0)
              setShowImage(0)
              setCodeBindList(result.slice(0,50))
              }
          }
          
          // console.log('result ............ : ', result)
          // if (getBindRes.responseValue.length === 0) {
          //     setLoader(0);
          //     setShowImage(1);
          // }
          // else {
              
          // }
          
      }

  }

  ////////////////////////////////////////////// to clear the list and dropdown ////////////////////////////////
  let clearData = () => {
      setTextSearch('');
      setCodeList([]);
      setCodeBindList([])
      funGetCodeList();
  }

  let getDataDetail = (id, code, codeText) => {
      
      const targetInputBox = document.getElementById("chckBoxId" + id).checked;
      
      if (targetInputBox === false) {
          let temp = [...arrToFwd];
          for (var i = 0; i < temp.length; i++) {
              if (temp[i].id === id) {
                  temp.splice(i, 1);
              }
          }
         
          props.SelectedData(temp, props.modalID)
          setArrToFwd(temp)
      }
      else {
          let temp = [...arrToFwd];
          
          temp.push({
              id: id,
              code: code,
              dropdownName: getCode,
              codeText: codeText


          });
          
          props.SelectedData(temp, props.modalID)
          setArrToFwd([...temp])
      }


  }
  useEffect(() => {
      
      setArrToFwd(props.defaultData.length !== 0 ? props.defaultData.filter(val => val.moduleId === props.modalID).length !==0 ? props.defaultData[props.defaultData.length - 1].data : [] : [])

      let hai = props.defaultData.length !== 0 ? props.defaultData.filter(val => val.moduleId === props.modalID).length !== 0 ? props.defaultData[props.defaultData.length - 1].data : [] : []

      
      if (hai.length !== 0) {
          setTimeout(()=>{
              document.getElementById("dropdownName").value = hai[0].dropdownName
              setCode(hai[0].dropdownName)
              funBindCodeList("", hai[0].dropdownName)

          }, 3000)
      }
      funGetCodeList();    
  }, [])
  return (
    <>
            <section className="main-content pt-3 mt-5" style={props.style}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Immunization Code Master</div>
                                {/* <div className="title">{content} </div> */}
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">
                                            {/* <div>
                                            <button className="dropbtn ps-2 pe-2" style={{width:'180px'}} onClick={()=>{document.getElementById("ms-dd-content").style.display = document.getElementById("ms-dd-content").style.display === 'none' ? 'block': 'none'}}>
                                                <span className=' ms-dropdown-label'>Select Code</span>
                                                <i className="bi bi-chevron-down"></i> 
                                            </button>
                                            <div id="ms-dd-content" className='ms-dropdown-content'>
                                            <ul className='ms-dropdown-list-container' >
                                                {getCodeList && getCodeList.map((list, ind) => {
                                                    return(
                                                        <li key={ind}><input type='checkbox' id={'ms-dropdown-value'} className='ms-dropdown-checkbox' onClick={''} />{list.codeName}</li>
                                                    )
                                                })}
                                            </ul>
                                            </div>
                                        </div> */}
                                            <select className='form-select form-select-sm' style={{ width: '179px' }} id="dropdownName" onChange={(event) => funSetCode(event.target.value)}>
                                                <option value='0'>Select Code</option>
                                                {getCodeList && getCodeList.map((list, ind) => (
                                                    <option key={ind} value={list.codeName}>{list.codeName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <input type="text" value={textSearch} className='form-control form-control-sm' placeholder="Search..." onChange={handleSearchChange} />
                                        </div>
                                        <div className="mb-2 me-2 " style={{ backgroundColor: '#ffefef' }}>
                                            <img src={Search} alt='' title='Search' style={{ cursor: 'pointer', width: '20px', height: '20px' }} onClick={funBindCodeList} />
                                        </div>
                                        <div className='mb-2 me-2'>
                                            <img src={Delete} alt='' title='Delete' style={{ cursor: 'pointer' }} onClick={clearData} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            {/* <div className='handlser'>
                                <Heading text="Immunization Code Master" />

                            </div> */}
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '3%' }}>#</th>
                                            <th className="text-center" style={{ "width": "5%" }}> Code </th>
                                            <th>Description</th>
                                            {/* <th style={{ position: 'relative', width: '180px' }}>
                                                <input type="text" className='form-control form-control-sm' placeholder="Search..." onChange={} />
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div> : <>
                                            {getCodeBindList && getCodeBindList.map((bindList, ind) => {
                                                return (                                                  
                                                    <>
                                                    <tr key={bindList.code}>
                                                        <td><input type={props.isMultiple === true ? 'checkbox' : 'radio' } name={props.isMultiple === true ? 'chckBoxId' + bindList.id : 'chckBoxId'} id={'chckBoxId' + bindList.id}
                                                            role={props.isMultiple === true ? 'switch' : ''}
                                                            defaultChecked=
                                                            {props.defaultData.filter(val => val.moduleId === props.modalID).length !== 0 ?
                                                                props.defaultData[props.defaultData.length - 1].data.filter(val => val.code === bindList.code).length !== 0 ?
                                                                    true :
                                                                    false :
                                                                false
                                                            } onClick={() => { getDataDetail(bindList.id, bindList.code, bindList.code_text); }} /></td>
                                                        {/* <td><input type='checkbox' id={'chckBoxId' + bindList.id}
                                                     role='switch' onClick={() => { getDataDetail(bindList.id, bindList.code); }} /></td> */}
                                                        <td style={{ textAlign: 'center' }}>{bindList.code}</td>
                                                        <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{bindList.code_text}</td>
                                                    </tr>
                                                    </>

                                                )
                                            })}
                                        </>

                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination controls */}
                            {/* <nav>
                                <ul className="pagination">
                                    
                                    <button >1</button>
                                    <button >2</button>
                                    <button >3</button>
                                    <button >4  </button>
                                </ul>
                            </nav> */}
                        </div>
                    </div>
                    <Loader val={loader} />
                </div>
            </section>





        </>
  )
}
