import React from 'react'

export default function DocumentHistory() {
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div>
              <div className='med-box' style={{ minHeight: '850px' }}>
                <div className='inner-content'>
                  <div className='inboxheadingmain mt-1 mb-3'>
                    <div className="inbox-headingg">Document History List</div>                   
                  </div>
          <div className='med-table-section'>
               <table className='med-table border_ striped dochistry'>
                        <thead>
                            <tr>     
                               <th className=''>#</th>
                               <th className=''>Document</th>
                               <th className=''>Create Date</th>
                               <th className=''>Reviewed Date</th>
                               <th className=''>Review Status</th>
                               <th className=''>Signed</th>
                               <th className=''>Signed Date</th>
                            </tr>
                        </thead>                       
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td className=''>
                                    <div className='documenthistorytbl'>Medical History</div>
                                </td>
                                <td>08 Nov, 23 05:55:19</td>
                                <td>Pending</td>
                                <td>In Review</td>
                                <td>Yes</td>
                                <td>09 Nov, 23 05:55:19</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className='documenthistorytbl'>Privacy Document</div>
                                </td>
                                <td>08 Nov, 23 05:55:19</td>
                                <td>Pending</td>
                                <td>Editing</td>
                                <td>Yes</td>
                                <td>09 Nov, 23 05:55:19</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <div className='documenthistorytbl'>Medical History</div>
                                </td>
                                <td>08 Nov, 23 05:55:19</td>
                                <td>Pending</td>
                                <td>In Review</td>
                                <td>Yes</td>
                                <td>09 Nov, 23 05:55:19</td>
                            </tr>  <tr>
                                <td>4</td>
                                <td>
                                    <div className='documenthistorytbl'>Privacy Document</div>
                                </td>
                                <td>08 Nov, 23 05:55:19</td>
                                <td>Pending</td>
                                <td>Editing</td>
                                <td>Yes</td>
                                <td>09 Nov, 23 05:55:19</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>
                                    <div className='documenthistorytbl'>Medical History</div>
                                </td>
                                <td>08 Nov, 23 05:55:19</td>
                                <td>Pending</td>
                                <td>In Review</td>
                                <td>Yes</td>
                                <td>09 Nov, 23 05:55:19</td>
                            </tr>                           
                        </tbody> 
                    </table>
                </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* -----------------------Start Compose Modal Popup-------------------    */}

    





        {/* -----------------------End Compose Modal Popup---------------------  */}

      </section>

    </>
  )
}
