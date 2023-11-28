function ElisaTestValidation (donorName = '', donorID = '', age = '',  bldGrp = '', bagType = '', product = '')  
{
    if(donorName === '' || donorName.toString().length === 0 || donorName === null || donorName === undefined)
    {
      return ['Donor name is empty', 'errDonorName'];
    }
    else if(donorID === '' || donorID.toString().length === 0 || donorID === null || donorID === undefined)
    {
      return ['Donor ID is empty', 'errDonorID'];
    }
    else if(age === '' || age.toString().length === 0 || age === null || age === undefined)
    {
      return ['Age is empty', 'errAge'];
    }
    
    else if(bldGrp === '' || bldGrp.toString().length === 0 || bldGrp === null || bldGrp === undefined)
    {
      return ['Blood group is empty', 'errBldGrp'];
    }
    else if(bagType === '' || bagType.toString().length === 0 || bagType === null || bagType === undefined)
    {
      return ['Bag type is empty', 'errbagType'];
    }
    else if(product === '' || product.toString().length === 0 || product === null || product === undefined)
    {
      return ['Product is empty', 'errProduct'];
    }
    else{
      return true;
    }
    
}
export default ElisaTestValidation;