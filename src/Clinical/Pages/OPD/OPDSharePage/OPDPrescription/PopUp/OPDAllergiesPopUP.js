import React, { useEffect, useState } from "react";
import searcIcon from "../../../../../../assets/images/Navbar/search.svg";
import GetFoodListByPrefixText from "../../../../../API/OPD/Prescription/KnowMedsAPI/GetFoodListByPrefixText";
import { FindByQuery, SearchIndex } from "../../../../../../Code/Serach";
import SaveOPDData from "../../../../../../Code/SaveOPDData";
import { useTranslation } from "react-i18next";
import plus from "../../../../../../assets/images/icons/icons8-plus-30.png";
import i18n from "i18next";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";

export default function OPDAllergiesPopUP(props) {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();

  let [showData, setShowData] = useState(0);
  let [sendData, setSendData] = useState([]);
  let [foodDataList, setFoodDataList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  let [itemListShow, setItemListShow] = useState(10);
  let [scroll, setScroll] = useState(0);
  let row = { problemId: 0, problemName: "", pdmId: 0, checked: true };
  let [disable, setDisable] = useState(0);
  let [loader, setLoader] = useState(1);
  const [problem, setProblem] = useState("");
  const [coding, setCoding] = useState("");
  const [outComelist, setOutcomeList] = useState([]);
  const [occurencelist, setOccurenceList] = useState([]);
  const [statuslist, setStatusList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [issueDetails, setIssueDetails] = useState({
    title: "",
    coding: "",
    beginDateTime: "",
    endDateTime: "",
    classificationTypeId: "0",
    occurrenceId: "0",
    verificationStatusId: "0",
    referredby: "",
    comments: "",
    outcomeId: "0",
    destination: "",
  });

  const [filteredFoodList, setFilteredFoodList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  let getdata = async () => {
    let responseFoodList = await GetFoodListByPrefixText();

    if (responseFoodList.status === 1) {
      console.log("Data bind", responseFoodList.responseValue);
      setLoader(0);

      setFoodDataList(responseFoodList.responseValue);
      setFilteredFoodList(responseFoodList.responseValue);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterFoodList(e.target.value);
  };

  const filterFoodList = (term) => {
    const filteredList = foodDataList.filter((food) =>
      food.foodName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredFoodList(filteredList);
  };

  const infinityScroll = () => {
    // Adjust the threshold and fetch more items as needed
    console.log('window.innerHeight', window.innerHeight);
    console.log('document.documentElement.scrollTop', document.documentElement.scrollTop);
    console.log('document.documentElement.offsetHeight', document.documentElement.offsetHeight);
    if (!(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)) {
      setItemListShow(itemListShow + 10);
    }
  };

  console.log('itemListShow',itemListShow);

  //   let infinityScroll = () => {
  //     console.log("callll");
  //     // let getScrollSection = document.querySelector("#react-select-3-listbox");
  //     // setScroll(getScrollSection.scrollTop);
  //     // let scrollTop = getScrollSection.scrollTop;
  //     // let scrollHeight = getScrollSection.scrollHeight;
  //     // let clientHeight = getScrollSection.clientHeight;
  //     // if (scrollTop + clientHeight >= scrollHeight) {
  //     //   setItemListShow(itemListShow + 10);
  //     // }

  //       setItemListShow(itemListShow + 10);
  //       onscroll()
  //   };
  //   let onscroll = ()=>{
  //     console.log("cdslcnsd")
  //     window.scroll("scroll",  setItemListShow(itemListShow + 10))
  //   }
  // Function triggered on selection
  function handleSelect(data) {
    console.log("data", data);
    setSelectedOptions(data);
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <div
        className={`${
          props.val === 0 ? "offcanvas" : "offcanvas show"
        }   offcanvas-end`}
        style={{ width: "400px" }}
        data-bs-scroll="true"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="allergies"
        aria-labelledby="allergiesLabel"
      >
        <div
          className="offcanvas-header d-flex justify-content-start gap-4  p-4 "
          style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}
        >
          <div
            className="d-flex justify-content-center align-items-center pointer"
            style={{
              backgroundColor: "white",
              borderRadius: "50px",
              width: "24px",
              height: "24px",
            }}
            data-bs-dismiss="offcanvas"
            onClick={() => {
              props.fun(0);
            }}
            aria-label="Close"
          >
            <i className="fa fa-close "></i>
          </div>
          <h5 className="offcanvas-title text-white" id="allergiesLabel">
            {t("Allergies")}
          </h5>
          {/* <button type="button" className="btn-close"  ></button> */}
        </div>
        <div className="offcanvas-body ps-4 pe-3">
          <div className="d-flex flex-column pt-2">
            <div className="d-flex flex-wrap mb-2 gap-3 justify-content-between">
              <div
                className="opdLabDetailsbox pointer"
                style={{
                  background: `${showData === 0 ? "#dee5ef" : "white"}`,
                }}
              >
                <span>{t("Food")}</span>
              </div>

              <div
                className="col-md-1 d-flex  align-items-center mr-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <button
                  type="button"
                  className="btn btn-sm btn-save-fill mb-1 ms-2"
                >
                  <img src={plus} className="icnn" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas-backdrop fade show"
        onClick={() => {
          props.fun(0);
        }}
      ></div>

      {/* ############################################################### MODAl POP UP ############################################################### */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content ">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-white "
                id="staticBackdropLabel"
              >
                Allergy
              </h1>
              <button
                type="button"
                className="btn-close_ btnModalClose"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content">
                {/* --------------------------Allergy Tab Section----------------------------------------------- */}

                <div className="problemhead">
                  <div className="problemhead-inn">
                    <div
                      className="wrap scroll-in-section allergiespopup"
                      style={{ maxHeight: "70vh" }}
                    >
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search Allergies"
                      />

                      <Select
                        options={filteredFoodList.map((food) => ({
                            label: food.foodName,
                            value: food.id,
                          }))}
                        onMenuOpen={infinityScroll}
                        onMenuScroll={infinityScroll}
                        placeholder="Select Allergies"
                        value={selectedOptions}
                        onChange={handleSelect}
                        isMulti
                      />
                    </div>

                    <span className="font-monospace fst-italic">
                      (Select one of these, or type your own title)
                    </span>
                  </div>

                  <div className="problemhead-inn">
                    <div className="col-12 mb-2">
                      <label
                        htmlFor="txtPatientRelationAddress"
                        className="form-label"
                      >
                        <b>Title</b>
                      </label>
                      <input
                        type="text"
                        value=""
                        className="form-control form-control-sm"
                        name="title"
                        id="title"
                        placeholder="Enter title"
                      />
                    </div>
                  </div>
                  <div className="problemhead-inn">
                    <div className="col-12 mb-2">
                      <label
                        htmlFor="txtPatientRelationAddress"
                        className="form-label"
                      >
                        <b>Coding</b>
                      </label>
                      <div>
                        <select
                          className="form-control"
                          style={{ height: "8em" }}
                          multiple
                          name="coding"
                          id="coding"
                        >
                          {issueDetails.coding !== "" ? (
                            <option>{issueDetails.coding}</option>
                          ) : (
                            ""
                          )}
                        </select>
                      </div>
                    </div>
                    <div class="d-inline-flex gap-2">
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        style={{ backgroundColor: "#1d4999" }}
                      >
                        Add
                      </button>
                      <button type="button" class="btn btn-secondary btn-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 mb-2">
                        <label
                          htmlFor="txtPatientRelationAddress"
                          className="form-label"
                        >
                          <b>Begin Date and Time</b>
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          id="beginDateTime"
                          name="beginDateTime"
                        />
                      </div>
                      <div className="col-6 mb-2">
                        <label
                          htmlFor="txtPatientRelationAddress"
                          className="form-label"
                        >
                          <b>End Date and Time</b>
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          id="endDateTime"
                          name="endDateTime"
                        />
                        <div className="mt-2" style={{ float: "inline-end" }}>
                          <span className="font-monospace fst-italic">
                            (leave blank if still active)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-4 mb-2">
                        <label
                          htmlFor="ddlRelationshipTertiary"
                          className="form-label"
                        >
                          <b>Classification Type</b>
                        </label>
                        {/* <sup style={{ color: "red" }}>*</sup> */}
                        <div className="d-flex gap-3">
                          <select
                            className="form-select form-select-sm"
                            id="classificationTypeId"
                            aria-label=".form-select-sm example"
                            name="classificationTypeId"
                          >
                            <option value="0" selected>
                              Select Classification
                            </option>
                            {classificationList &&
                              classificationList.map((list) => {
                                return (
                                  <option value={list.id}>{list.name}</option>
                                );
                              })}
                          </select>
                        </div>
                        <small
                          id="errRelationshipTertiary"
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                      <div className="col-4 mb-2">
                        <label
                          htmlFor="ddlRelationshipTertiary"
                          className="form-label"
                        >
                          <b>Occurrence</b>
                        </label>
                        {/* <sup style={{ color: "red" }}>*</sup> */}
                        <div className="d-flex gap-3">
                          <select
                            className="form-select form-select-sm"
                            id="occurrenceId"
                            aria-label=".form-select-sm example"
                            name="occurrenceId"
                          >
                            <option value="0" selected>
                              Select Occurrence
                            </option>
                            {occurencelist &&
                              occurencelist.map((list) => {
                                return (
                                  <option value={list.id}>{list.name}</option>
                                );
                              })}
                          </select>
                        </div>
                        <small
                          id="errRelationshipTertiary"
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>

                      <div className="col-4 mb-2">
                        <label
                          htmlFor="ddlRelationshipTertiary"
                          className="form-label"
                        >
                          <b>Verification Status</b>
                        </label>
                        {/* <sup style={{ color: "red" }}>*</sup> */}
                        <div className="d-flex gap-3">
                          <select
                            className="form-select form-select-sm"
                            id="verificationStatusId"
                            aria-label=".form-select-sm example"
                            name="verificationStatusId"
                          >
                            <option value="0" selected>
                              Select Status
                            </option>
                            {statuslist &&
                              statuslist.map((list) => {
                                return (
                                  <option value={list.id}>{list.name}</option>
                                );
                              })}
                          </select>
                        </div>
                        <small
                          id="errRelationshipTertiary"
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 mb-2">
                        <label
                          htmlFor="ddlRelationshipTertiary"
                          className="form-label"
                        >
                          <b>Outcome</b>
                        </label>
                        {/* <sup style={{ color: "red" }}>*</sup> */}
                        <div className="d-flex gap-3">
                          <select
                            className="form-select form-select-sm"
                            id="outcomeId"
                            aria-label=".form-select-sm example"
                            name="outcomeId"
                          >
                            <option value="0" selected>
                              Select Outcome
                            </option>
                            {outComelist &&
                              outComelist.map((list) => {
                                return (
                                  <option value={list.id}>{list.name}</option>
                                );
                              })}
                          </select>
                        </div>
                        <small
                          id="errRelationshipTertiary"
                          className="form-text text-danger"
                          style={{ display: "none" }}
                        ></small>
                      </div>
                      <div className="col-6 mb-2">
                        <label
                          htmlFor="txtPatientRelationAddress"
                          className="form-label"
                        >
                          <b>Destination</b>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="destination"
                          name="destination"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 mb-2">
                        <label
                          htmlFor="txtPatientRelationAddress"
                          className="form-label"
                        >
                          <b>Referred by</b>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm mt-1"
                          id="referredby"
                          name="referredby"
                        />
                      </div>
                      <div className="col-12 mb-2">
                        <label
                          htmlFor="txtPatientRelationAddress"
                          className="form-label"
                        >
                          <b>Comments</b>
                        </label>
                        <textarea
                          className="mt-1 form-control"
                          id="comments"
                          name="comments"
                          rows="3"
                          cols="40"
                          style={{ height: "121px" }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                <button
                  type="button"
                  class="btn btn-save btn-save-fill btn-lg "
                  data-bs-dismiss="modal"
                >
                  <i class="bi bi-check-lg"></i> Save
                </button>
                <button
                  type="button"
                  class="btn btn-secondary btn-secondry btn-lg"
                  data-bs-dismiss="modal"
                >
                  <i class="bi bi-x-lg"></i> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
