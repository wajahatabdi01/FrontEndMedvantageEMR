import React, { useEffect } from 'react';


export default function FHIRViewCCDAData() {
 
 

  const getViewData = async () => {
    // const resView = await GetViewCCDAData(1);
    // if(resView)
    // {
    //   let newwindow = window.open('', '_blank');
    //   newwindow.document.write(resView);

    //   // setHtmlData(resView);

    // }
  };

  useEffect(() => {
    
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
