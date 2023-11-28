<section className="main-content mt-5 pt-3">
<div className="container-fluid">
    <div className="row">
        <div className="col-12">
            <div className="med-box">
                <div className="title">Surgery Checklist Item Master</div>
                <div className="inner-content">

                    <div className='row'>
                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                            <div className="d-flex flex-wrap align-content-end">
                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="Code" className="form-label"> Checklist Item</label>
                                    <input type="text" className="form-control form-control-sm" name="checkListName" value={checkListName}  placeholder="Enter Check List Item" onChange={handlerChange}/>
                                    <small id="errcheckList" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        {isUpdateBtnShow === true ?<button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button>:
                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerSave}>Save</button> }
                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>Clear</button>
                                    </div>
                                    <div id="success" className="alert alert-success alert-dismissible fade show" role="alert"
                                        style={{ display: 'none' }}>
                                        <strong><i className="fa fa-check" aria-hidden="true"></i> </strong>Checklist Item Saved Successfully
                                    </div>
                                    <div id="successUpdate" className="alert alert-success alert-dismissible fade show" role="alert"
                                        style={{ display: 'none' }}>
                                        <strong><i className="fa fa-check" aria-hidden="true"></i> </strong> Checklist Item Updated Successfully
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div className="col-12 mt-3">
            <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped_">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                            <th>CheckList Item Name</th>
                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {checkListItemList && checkListItemList.map((list,index)=>{
                        return(
                            <tr>
                            <td className="text-center">{index+1}</td>
                            <td>{list.checkListName}</td>
                            <td>
                                <div className="action-button">
                                    <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={()=>{edit(list)}}></i></div>
                                    <div data-bs-toggle="" data-bs-title="Delete Row" data-bs-placement="bottom" ><i className="fa fa-trash actiondel"onClick={() => { deleteRow(list.id);}}></i>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        )
                    })}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</section>