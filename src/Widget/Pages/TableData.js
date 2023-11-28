import React, { useEffect, useState } from 'react'

export default function TableData(props) {
    let [object, setObbject] = useState()

    useEffect(()=>{
        // console.log("props.data",props.data)
        if(props.data[0] !== undefined)
        {
            setObbject(Object.keys(props.data[0]))
            console.log("head", Object.keys(props.data[0]))
        }
    }, [props])

    return (
        <table className="table-dynamic">
            <thead>
                <tr>
                    <th className='text-center'>#</th>
                    {object != null && object.map((val, ind) => {
                        return(

                            <th>{val.toUpperCase()}</th>
                        )
                    })}
                </tr>
       
            </thead>

            <tbody>
                {props.data.length != 0 && props.data.map((val, ind) => {
                    let key = Object.keys(val)
                    return (
                        <tr>
                            <td className='text-center'>{ind + 1}</td>
                            {key.map((v, i) => {
                                return (
                                    <>
                                        <td>{val[v]}</td>
                                    </>
                                )
                            })}

                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}
