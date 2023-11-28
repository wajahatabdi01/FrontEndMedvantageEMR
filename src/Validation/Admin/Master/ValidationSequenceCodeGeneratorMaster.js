function ValidationSequenceCodeGeneratorMaster(sequenceCode = "", preSample="", postSample="", currentSequence="",sequenceType="", sequenceYear="", sequenceDate="") {
    if (sequenceCode !== "" &&  sequenceCode.trim().length !== 0 && preSample !== "" &&  preSample.trim().length !== 0 && postSample !== "" &&
      postSample.trim().length !== 0 && currentSequence!=="" && sequenceType!=="" && sequenceType.trim().length!==0 && sequenceYear!=="" && sequenceDate!=="") {
        return true
    }
    else{
        return false
    }
}
export default ValidationSequenceCodeGeneratorMaster;