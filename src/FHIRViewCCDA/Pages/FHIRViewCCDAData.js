import React, { useEffect, useState } from 'react';
import GetViewCCDAData from '../API/GetViewCCDAData';

export default function FHIRViewCCDAData() {
  const [getUHID, setUHID] = useState('');
  const [htmlData, setHtmlData] = useState('');

  const getViewData = async () => {
    const resView = await GetViewCCDAData(1);
    if(resView)
    {
      let newwindow = window.open('', '_blank');
      newwindow.document.write(resView);

      // setHtmlData(resView);
      // console.log('resView', resView);
    }
  };

  useEffect(() => {
    setUHID(window.sessionStorage.getItem('activeUHID'));
    getViewData();
  }, []);

  // Use React.Fragment to avoid adding an extra div
  return (
    <React.Fragment>
      {/* Pass htmlData inside an object with the __html property */}
      {/* <div dangerouslySetInnerHTML={{ __html: htmlData }}></div> */}
    </React.Fragment>
  );
}
