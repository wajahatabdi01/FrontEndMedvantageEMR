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
import Allergy from "../../../../../../Registartion/Pages/OPDRegistration/IssuesPopUpComponents/Allergy";

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

                <Allergy/>
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
