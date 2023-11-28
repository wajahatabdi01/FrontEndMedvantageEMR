function DonorVisitValidations (donorID = '') {
  if(donorID === '' || donorID.toString().length === 0 || donorID === null)
  {
    return ['Please fill Donor ID','errDonor'];
  }
  else
  {
    return true;
  }
}
export default DonorVisitValidations;