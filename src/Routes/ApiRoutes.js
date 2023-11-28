
import React, { Component } from 'react'
import { Routes, Route, } from "react-router-dom";
import CommonLayout from '../CommonLayout/CommonLayout';
import Login from '../Login/Login';
import ProtectedRoutes, { AuthRoutesSuperadmin } from "../Services/AuthRoutes";
import PageNotFound from '../Services/PageNotFound';
import OPDPrescriptionIndex from '../Clinical/Pages/OPD/OPDSharePage/OPDPrescription/OPDPrescriptionIndex';
import DeathCertificate from '../Component/DeathCertificate';
import HomeLayout from '../MedvantageWebsite/Layouts/HomeLayout';
import AboutLayout from '../MedvantageWebsite/Layouts/AboutLayout';
import BenifitOfRMDLayout from '../MedvantageWebsite/Layouts/BenifitOfRMDLayout';
import ChannelPartnerLayout from '../MedvantageWebsite/Layouts/ChannelPartnerLayout';
import ContactUsLayout from '../MedvantageWebsite/Layouts/ContactUsLayout';
import SignUpLaout from '../MedvantageWebsite/Layouts/SignUpLaout';
import ConfirmIdentityLayout from '../MedvantageWebsite/Layouts/ConfirmIdentityLayout';
import ForgotPasswordLayout from '../MedvantageWebsite/Layouts/ForgotPasswordLayout';
import LayoutVerifyEmail from '../MedvantageWebsite/Layouts/VerifyEmailLayout';
import LayoutVerifyOtp from '../MedvantageWebsite/Layouts/VerifyOtpLayout';
import IPDPrecriptionIndex from '../Clinical/Pages/IPD/IPDSharePages/Prescription/IPDPrecriptionIndex';
import IPDPatientPersonalDashboardIndex from '../Clinical/Pages/IPD/IPDSharePages/PatientPersonalDashboard/IPDPatientPersonalDashboardIndex';
import PatientRegistration from '../Registartion/Pages/OPDRegistration/PatientRegistration';
import AdmitPatientByUHID from '../Registartion/Pages/AdmitPatientByUHID/AdmitPatientByUHID';
import Profile from '../Registartion/Pages/Profile';
import IPDFile from '../Clinical/Pages/IPD/IPDSharePages/IPDFile/IPDFile';
import Billing from '../Billing/Pages/Billing';
import CountryMaster from '../SuperAdmin/Pages/Master/CountryMaster';
import StateMaster from '../SuperAdmin/Pages/Master/StateMaster';
import CityMaster from '../SuperAdmin/Pages/Master/CityMaster';
import UserMaster from '../SuperAdmin/Pages/Master/UserMaster';
import UserTypeMaster from '../SuperAdmin/Pages/Master/UserTypeMaster';
import PatientDetailsMaster from '../SuperAdmin/Pages/Master/PatientDetailsMaster';
import DepartmentMaster from '../SuperAdmin/Pages/Master/DepartmentMaster';
import HeadMaster from '../SuperAdmin/Pages/Master/HeadMaster';
import HeadDepartmentMapping from '../SuperAdmin/Pages/Master/HeadDepartmentMapping';
import HeadMenuAssign from '../SuperAdmin/Pages/Master/HeadMenuAssign';
import MenuApiMapping from '../SuperAdmin/Pages/Master/MenuApiMapping';
import MenuMaster from '../SuperAdmin/Pages/Master/MenuMaster';
import ModuleMaster from '../SuperAdmin/Pages/Master/ModuleMaster';
import ModuleMenuAssign from '../SuperAdmin/Pages/Master/ModuleMenuAssign';
import ApplicationFeatureChecklistMaster from '../SuperAdmin/Pages/Master/ApplicationFeatureChecklistMaster';
import ModuleDepartmentMapping from '../SuperAdmin/Pages/Master/ModuleDepartmentMapping';
import VitalMaster from '../SuperAdmin/Pages/UtilityMaster/VitalMaster';
import GuardianRelationMaster from '../SuperAdmin/Pages/UtilityMaster/GuardianRelationMaster';
import RoleMaster from '../SuperAdmin/Pages/UtilityMaster/RoleMaster';
import RoleWiseDepartmentAssign from '../SuperAdmin/Pages/UtilityMaster/RoleWiseDepartmentAssign';
import DesignationMaster from '../SuperAdmin/Pages/UtilityMaster/DesignationMaster';
import PaymentModeMaster from '../SuperAdmin/Pages/UtilityMaster/PaymentModeMaster';
import ApiDocumentDetails from '../SuperAdmin/Pages/APIMaster/ApiDocumentDetails';
import ApiDocumentMenuMaster from '../SuperAdmin/Pages/APIMaster/ApiDocumentMenuMaster';
import ApiDocumentRightDetails from '../SuperAdmin/Pages/APIMaster/ApiDocumentRightDetails';
import ApiDocumentRightMenuMaster from '../SuperAdmin/Pages/APIMaster/ApiDocumentRightMenuMaster';
import ApiMaster from '../SuperAdmin/Pages/APIMaster/ApiMaster';
import BaseUrlMaster from '../SuperAdmin/Pages/APIMaster/BaseUrlMaster';
import EducationTypeMaster from '../SuperAdmin/Pages/APIMaster/EducationTypeMaster';
import IdTypeMaster from '../SuperAdmin/Pages/APIMaster/IdTypeMaster';
import OccupationTypeMaster from '../SuperAdmin/Pages/APIMaster/OccupationTypeMaster';
import PackageMaster from '../SuperAdmin/Pages/APIMaster/PackageMaster';
import ServiceMaster from '../SuperAdmin/Pages/APIMaster/ServiceMaster';
import ServiceHeadMapping from '../SuperAdmin/Pages/APIMaster/ServiceHeadMapping';
import PackageServiceMapping from '../SuperAdmin/Pages/APIMaster/PackageServiceMapping';
import ServiceModuleMapping from '../SuperAdmin/Pages/APIMaster/ServiceModuleMapping';
import { DashboardMaster } from '../SuperAdmin/Pages/WidgetMaster/DashboardMaster';
import { WidgetCategoryMaster } from '../SuperAdmin/Pages/WidgetMaster/WidgetCategoryMaster';
import { WidgetMaster } from '../SuperAdmin/Pages/WidgetMaster/WidgetMaster';
import { WidgetRoleAssign } from '../SuperAdmin/Pages/WidgetMaster/WidgetRoleAssign';
import { WidgetSequenceAssign } from '../SuperAdmin/Pages/WidgetMaster/WidgetSequenceAssign';
import { DashboardWidgetAssign } from '../SuperAdmin/Pages/WidgetMaster/DashboardWidgetAssign';
import BedMaster from '../Admin/Pages/Masters/BedMaster';
import BuildingMaster from '../Admin/Pages/Masters/BuildingMaster';
import FloorMaster from '../Admin/Pages/Masters/FloorMaster';
import CareTakerMaster from '../Admin/Pages/Masters/CareTakerMaster';
import LocationMaster from '../Admin/Pages/Masters/LocationMaster';
import LocationDepartmentAssign from '../Admin/Pages/Masters/LocationDepartmentAssign';
import RoomMaster from '../Admin/Pages/Masters/RoomMaster';
import RoomDepartmentAssign from '../Admin/Pages/Masters/RoomDepartmentAssign';
import WardMaster from '../Admin/Pages/Masters/WardMaster';
import WardBedAssignMaster from '../Admin/Pages/Masters/WardBedAssignMaster';
import WardDepartmentAssign from '../Admin/Pages/Masters/WardDepartmentAssign';
import WardHeadAssignMaster from '../Admin/Pages/Masters/WardHeadAssignMaster';
import StatusMaster from '../Admin/Pages/Masters/StatusMaster';
import EquipmentTypeMaster from '../Admin/Pages/Masters/EquipmentTypeMaster';
import EquipmentNameMaster from '../Admin/Pages/Masters/EquipmentNameMaster';
import AlertEscalationMaster from '../Admin/Pages/Masters/AlertEscalationMaster';
import DischargeTypeMaster from '../Admin/Pages/Masters/DischargeTypeMaster';
import FeedBackHeadMaster from '../Admin/Pages/Masters/FeedBackHeadMaster';
import SequenceCodeGeneratorMaster from '../Admin/Pages/Masters/SequenceCodeGeneratorMaster';
import RaceMaster from '../Admin/Pages/Masters/RaceMaster';
import OxygenSupportMaster from '../Admin/Pages/Masters/OxygenSupportMaster';
import { RTHoldTypeMaster } from '../Admin/Pages/Masters/RTHoldTypeMaster';
import { InvestigationNormalRange } from '../Admin/Pages/Masters/InvestigationNormalRange';
import MachineTypeMaster from '../Admin/Pages/Masters/MachineTypeMaster';
import EthinicityMaster from '../Admin/Pages/Masters/EthinicityMaster';
import LifeSupportMode from '../Admin/Pages/Masters/LifeSupportMode';
import LifeSupportModeMapping from '../Admin/Pages/Masters/LifeSupportModeMapping';
import GetExaminationCategoryMasterAPI from '../Admin/Api/Master/ExaminationCategoryMasterAPI/GetExaminationCategoryMasterAPI';
import ExaminationCategoryDepartmentAssign from '../Admin/Pages/Examination/ExaminationCategoryDepartmentAssign';
import ExaminationMaster from '../SuperAdmin/Pages/Master/ExaminationMaster';
import ExaminationSubCategory from '../SuperAdmin/Pages/Master/ExaminationSubCategory';
import ExaminationParameterMaster from '../SuperAdmin/Pages/Master/ExaminationParameterMaster';
import ExaminationSubCategoryParameterAssign from '../SuperAdmin/Pages/Master/ExaminationSubCategoryParameterAssign';
import ExaminationParameterProblem from '../Admin/Pages/Examination/ExaminationParameterProblem';
import HistoryCategory from '../SuperAdmin/Pages/Master/HistoryCategory';
import HistorySubCategory from '../SuperAdmin/Pages/Master/HistorySubCategory';
import HistoryParameterMaster from '../SuperAdmin/Pages/Master/HistoryParameterMaster';
import HistorySubCategoryParameterAssign from '../SuperAdmin/Pages/Master/HistorySubCategoryParameterAssign';
import Historycategorydepartmentassign from '../Admin/Pages/History/Historycategorydepartmentassign';
import HistoryParameterDepartmentAssign from '../Admin/Pages/History/HistoryParameterDepartmentAssign';
import HistoryParameterProblem from '../Admin/Pages/History/HistoryParameterProblem';
import DashboardParameterMaster from '../Admin/Pages/Masters/DashboardParameterMaster';
import DashboardColumnSequence from '../Admin/Pages/Dashboard/DashboardColumnSequence';
import DashboardColumnMaster from '../Admin/Pages/Dashboard/DashboardColumnMaster';
import DashboardParameterColumnAssign from '../Admin/Pages/Dashboard/DashboardParameterColumnAssign';
import AddUserMaster from '../Admin/Pages/UserService/AddUserMaster';

import { HealthViewIndex } from '../Clinical/Pages/IPD/IPDSharePages/HealthView/HealthViewIndex';
import PharmacyPurchase from '../../src/Pharmacy/Purchase/Pages/PharmacyPurchase'
import AllPurchase from './../../src/Pharmacy/Purchase/Pages/AllPurchase'
import PurchasePrint from '../../src/Pharmacy/Purchase/Pages/PurchasePrint'
import PharmacySale from '../../src/Pharmacy/Sale/Pages/PharmacySale'
import PharmacyUnitMaster from '../../src/Pharmacy/UnitMaster/Pages/PharmacyUnitMaster'
import SuperAdminLogin from '../SuperAdmin/Pages/SuperAdminLogin';
import TestMaster from '../Lab/Pages/Master/TestMaster';
import VaccinationChart from '../Clinical/Pages/OPD/OPDSharePage/OPDVaccinationChart/VaccinationChart';
import SampleCollection from '../Pathology/Pages/SampleCollection';
import PerformTest from '../Pathology/Pages/PerformTest';
import ValidateTest from '../Pathology/Pages/ValidateTest';
import Print from '../Pathology/Pages/Print';
import PrintBarCode from '../Pathology/Pages/PrintBarCode';
import ViewReportPrint from '../Pathology/Pages/ViewReportPrint';
import SampleMaster from '../Lab/Pages/Master/SampleMaster';
import SubTestMaster from '../Lab/Pages/Master/SubTestMaster';
import AddUserIndex from '../Admin/Pages/UserService/AddUserMaster/AddUserIndex';
import CategoryMaster from '../Lab/Pages/Master/CategoryMaster';
import SubCategoryMaster from '../Lab/Pages/Master/SubCategoryMaster';
import TestInstruction from '../Lab/Pages/Master/TestInstruction';
import MachineMaster from '../Lab/Pages/Master/MachineMaster';
import UserTestCategoryAssign from '../Lab/Pages/Master/UserTestCategoryAssign';
import TestSubTestMapping from '../Lab/Pages/Master/TestSubTestMapping';
import UserTestSubCategoryAssign from '../Lab/Pages/Master/UserTestSubCategoryAssign';
import { SubtestNormalRange } from '../Lab/Pages/Master/SubtestNormalRange';
import LanguageMaster from '../Admin/Pages/Masters/LanguageMaster';
import PersonalDashboardIndexSecond from '../Clinical/Pages/IPD/IPDSharePages/PatientPersonalDashboard/patientpersonalDashboardBody/personalDashboardIndexSecond';
import { EquipmentAMC } from '../Inventory/Pages/EquipmentAMC';
import { EquipmentCategory } from '../Inventory/Pages/EquipmentCategory';
import EquipmentChecklist from '../Inventory/Pages/EquipmentChecklist';
import { EquipmentMaster } from '../Inventory/Pages/EquipmentMaster';

import ItemSubCategoryMaster from '../Inventory/Pages/ItemSubCategoryMaster';
import Agenda from '../SpringBoard/Pages/Agenda';
import ProjectMaster from '../SpringBoard/Pages/ProjectMaster';
import ProjectTypeMaster from '../SpringBoard/Pages/ProjectTypeMaster';
import AdminDashBoard from '../SpringBoard/Pages/AdminDashBoard';
import AssignProject from '../SpringBoard/Pages/AssignProject';
import AddModuleMaster from '../SpringBoard/Pages/AddModuleMaster';
import StoryMaster from '../SpringBoard/Pages/StoryMaster';
import SprintMaster from '../SpringBoard/Pages/SprintMaster';
import SprintBacklog from '../SpringBoard/Pages/SprintBacklog';
import OPDVitalIndex from '../Clinical/Pages/OPD/OPDSharePage/OPDVital/OPDVitalIndex';
import IPDVitalsIndex from '../Clinical/Pages/IPD/IPDSharePages/Vitals/IPDVitalsIndex';
import SurgeryMaster from '../OperationTheatre/Pages/SurgeryMaster';
import OperationTheaterMaster from '../OperationTheatre/Pages/OperationTheaterMaster';
import OtTeam from '../OperationTheatre/Pages/OtTeam';
import PatientSurgeryAdvice from '../OperationTheatre/Pages/PatientSurgeryAdvice';
import SurgeryKitItemAssign from '../OperationTheatre/Pages/SurgeryKitItemAssign';
import SurgeryCheckListItemMaster from '../OperationTheatre/Pages/SurgeryCheckListItemMaster';
import SurgeryKitMaster from '../OperationTheatre/Pages/SurgeryKitMaster';
import SurgeryKitAssign from '../OperationTheatre/Pages/SurgeryKitAssign';
import PatientSurgeryPlanned from '../OperationTheatre/Pages/patientSurgeryPlanned';
import EquipmentLocation from '../Inventory/Pages/EquipmentLocation';
import { ServiceTypeMaster } from '../Inventory/Pages/ServiceTypeMaster';
import VehicleRenewal from '../Inventory/Pages/VehicleRenewal';
import { VendorMaster } from '../Inventory/Pages/VendorMaster';
import AlarmWarningLog from '../BmsServices/Pages/AlarmWarningLog';
import DeviceAccessControl from '../BmsServices/Pages/DeviceAccessControl';
import EnergyMeter from '../BmsServices/Pages/EnergyMeter';
import EnergyReading from '../BmsServices/Pages/EnergyReading';
import EnergyTypeMaster from '../BmsServices/Pages/EnergyTypeMaster';
import LightingControl from '../BmsServices/Pages/LightingControl';
import LocationEnvironment from '../BmsServices/Pages/LocationEnvironment';
import ChallanForm from '../BmsServices/Pages/ChallanForm';
import LocationEnvironmentSetting from '../BmsServices/Pages/LocationEnvironmentSetting';
import Payment from '../BmsServices/Pages/Payment';
import ChallanReport from '../BmsServices/Pages/ChallanReport';
import ChallanReceipt from '../BmsServices/Pages/ChallanReceipt';
import SecurityAccessControl from '../BmsServices/Pages/SecurityAccessControl';
import TenantMaster from '../BmsServices/Pages/TenantMaster';
import DeviceAccessLog from '../BmsServices/Pages/DeviceAccessLog';
import ComlaintStatusMaster from '../Maintenance/Pages/ComlaintStatusMaster';
import Complaint from '../Maintenance/Pages/Complaint';
import ComplaintCategoryMaster from "../Maintenance/Pages/ComplaintCategoryMaster";
import ComplaintChart from '../Maintenance/Pages/ComplaintChart';
import ComplaintRespondent from '../Maintenance/Pages/ComplaintRespondent';
import LocationMainteneaceSchedule from '../Maintenance/Pages/LocationMainteneaceSchedule';
import MaintenanceContract from '../Maintenance/Pages/MaintenanceContract';
import MaintenanceDashboard from '../Maintenance/Pages/MaintenanceDashboard';
import MaintenanceSchedule from '../Maintenance/Pages/MaintenanceSchedule';
import MaintenanceVisit from '../Maintenance/Pages/MaintenanceVisit';
import HealthCard from '../Registartion/Pages/HealthCard';
import ItemMaster from '../Inventory/Pages/ItemMaster';
import { ItemCategoryMaster } from '../Inventory/Pages/ItemCategoryMaster';
import SampleRecieve from '../MIcrobiology/Pages/SampleRecieve';
import CultureLaboratoryReport from '../MIcrobiology/Pages/CultureLaboratoryReport';
import CreateCultureReport from '../MIcrobiology/Pages/CreateCultureReport';
import CreateCultureSterileReport from '../MIcrobiology/Pages/CreateCultureSterileReport';
import MicroLaboratoryValidation from '../MIcrobiology/Pages/ValidationMicro/MicroLaboratoryValidation';
import MicroValidation from '../MIcrobiology/Pages/ValidationMicro/MicroValidation';
import MicroCultureValidation from '../MIcrobiology/Pages/ValidationMicro/MicroCultureValidation';
import MIcroCultureFinalValidation from '../MIcrobiology/Pages/ValidationMicro/MicroCultureFinalValidation';
import MicroCultureSterileValidation from '../MIcrobiology/Pages/ValidationMicro/MicroCultureSterileValidation';
import MicroCultureSterileFinalValidation from '../MIcrobiology/Pages/ValidationMicro/MicroCultureSterileFinalValidation';
import PrintLaboratoryReport from '../MIcrobiology/Pages/PrintForMicro/PrintLaboratoryReport';
import ViewPrintLaboratoryReport from '../MIcrobiology/Pages/PrintForMicro/ViewPrintLaboratoryReport';
import PrintOrganismReport from '../MIcrobiology/Pages/PrintForMicro/PrintOrganismReport';
import ViewPrintOrganismReport from '../MIcrobiology/Pages/PrintForMicro/ViewPrintOrganismReport';
import PrintCultureSterileReport from '../MIcrobiology/Pages/PrintForMicro/PrintCultureSterileReport';
import ViewPrintCultureSterileReport from '../MIcrobiology/Pages/PrintForMicro/ViewPrintCultureSterileReport';
import MicrobiologyTemplateMaster from '../MIcrobiology/Pages/MicrobiologyTemplateMaster';
import IPDDischargeCard from '../Clinical/Pages/IPD/IPDSharePages/IPDDischargeCard/IPDDischargeCard';
import OrganMaster from '../Radiology/Pages/OrganMaster';
import OrganParameterMaster from '../Radiology/Pages/OrganParameterMaster';
import OrganParameterMappingMaster from '../Radiology/Pages/OrganParameterMappingMaster';
import ModalityMaster from '../Radiology/Pages/ModalityMaster';
import RadiologyNormalRange from '../Radiology/Pages/RadiologyNormalRange';
import RadiologyTestMaster from '../Radiology/Pages/RadiologyTestMaster';
import TestOrganMapping from '../Radiology/Pages/TestOrganMapping';
import TestSubCategoryMaster from '../Radiology/Pages/TestSubCategoryMaster';
import PrescriptionNotificationReport from '../Pharmacy/NotificationReport/Pages/PrescriptionNotificationReport';
import DepartmentCategoryMaster from '../SuperAdmin/Pages/Master/DepartmentCategoryMaster';
import RadiologyPerformTest from '../Radiology/Pages/PerformTest';
import RadiologyValidate from '../Radiology/Pages/RadiologyValidate';
import RadioFinalValidate from '../Radiology/Pages/RadioFinalValidate';
import PrintReport from '../Radiology/Pages/PrintReport';
import RadiologyPrintReport from '../Radiology/Pages/RadiologyPrintReport';
import CashCounterBillingReceipt from '../Billing/Pages/CashCounterBillingReceipt';
import ExportPatientData from '../Admin/Pages/ExportPatientData/ExportPatientData';
import ExportPatientDataCCDA from '../Admin/Pages/ExportPatientData/ExportPatientDataCCDA';
import PrintOPDRegistrationSlip from '../Registartion/Pages/PrintOPDRegistrationSlip';
import VerifyUHID from '../MedvantageWebsite/Pages/VerifyUhid';
import PatientData from '../MedvantageWebsite/Pages/PatientData';
import PatientCCDAData from '../MedvantageWebsite/Pages/PatientCCDAData';
import NotificationScheduler from '../Notification Scheduler/Pages/NotificationScheduler';

import PatientMonitoringDashboard from '../PatientMonitorDashboard/PMDIndex'
import OpdPrintout from '../Clinical/Pages/Component/OpdPrintout';
import RecipeMaster from '../Dietetics/Pages/RecipeMaster';
import FoodIntake from '../Dietetics/Pages/FoodIntake';
import PatientIntake from '../Dietetics/Pages/PatientIntake';
import SupplementIntake from '../Dietetics/Pages/SupplementIntake';
import BloodDonorRegestration from '../BloodBank/Pages/BloodDonorRegestration';
import BloodDonorVisit from '../BloodBank/Pages/BloodDonorVisit';
import CreateBloodBag from '../BloodBank/Pages/CreateBloodBag';
import EditBloodBag from '../BloodBank/Pages/EditBloodBag';
import BloodDiscardForm from '../BloodBank/Pages/BloodDiscardForm';
import ElisaTest from '../BloodBank/Pages/ElisaTest';
import BloodRequest from '../BloodBank/Pages/BloodRequest';
import BloodIssueList from '../BloodBank/Pages/BloodIssueList';
import RoleWiseMenuAssign from '../SuperAdmin/Pages/UtilityMaster/RoleWiseMenuAssign';
import HSNCodeMaster from '../Pharmacy/HSNCodeMaster/Pages/HSNCodeMaster'
import AllSale from '../Pharmacy/Sale/Pages/AllSale'
// import MedicationChecklist from '../PatientMonitorDashboard/Components/Checklist/Components/MedicationChecklist';
import FoodIntakeChecklist from '../PatientMonitorDashboard/Components/Checklist/Components/FoodIntakeChecklist';
import CurrentStock from '../Pharmacy/CurrentStock/Pages/CurrentStock';
import SalePrint from '../Pharmacy/Sale/Pages/SalePrint'
import SalePrintByBillNo from '../Pharmacy/Sale/Pages/SalePrintByBillNo'
import ManufacturerMaster from '../Pharmacy/ManufacturerMaster/Pages/ManufacturerMaster';
import ConsumeTypeMaster from '../Pharmacy/ConsumeTypeMaster/Pages/ConsumeType'
import SaltMaster from '../Pharmacy/SaltMaster/Pages/SaltMaster';
import PharmacyProductMaster from '../Pharmacy/ProductMaster/Pages/PharmacyProductMaster'
import ProductSaltMapping from '../Pharmacy/ProductSaltMapping/Pages/ProductSaltMapping'
// import PatientMonitoringDashboard from '../PatientMonitorDashboard/PMDIndex'
import IPDCalculatorIndex from '../Clinical/Pages/IPD/IPDSharePages/Calculator/IPDCalculatorIndex';
import OPDCalculatorIndex from '../Clinical/Pages/OPD/OPDSharePage/OPDCalculator/OPDCalculatorIndex';
import ConversionMaster from '../Pharmacy/ConversionMaster/Pages/ConversionMaster'
import DischargeCard from '../Component/DischargeCard';
import NotificationTemplate from '../SuperAdmin/Pages/Notification/NotificationTemplate';
import { LayouChallanForm } from '../BmsServices/Layouts/LayouChallanForm';
import { LayoutChallanReport } from '../BmsServices/Layouts/LayoutChallanReport';
import ImportCqmData from '../Component/ImportCqmData';
import PrintUHIDQR from '../Registartion/Pages/AdmitPatientByUHID/PrintUHIDQR';
import PrintAdmitDetails from '../Registartion/Pages/AdmitPatientByUHID/PrintAdmitDetails';
import AssignMachinetoPatient from '../Clinical/Pages/IPD/IPDSharePages/AssignMachinetoPatient/AssignMachinetoPatient';
import VisitRevisitReport from '../Registartion/Pages/VisitRevisitReport';
import OPDInvestigationIndex from '../Clinical/Pages/OPD/OPDSharePage/OPDInvestigation/OPDInvestigationIndex';
import DynamicDashboard from '../Widget/Pages/DynamicDashboard';
import LanguageHeadMaster from '../Admin/Pages/Masters/LanguageHeadMaster'
import TableMaster from '../Admin/Pages/Masters/TableMaster';
import LanguageConversionMaster from '../Admin/Pages/Masters/LanguageConversionMaster';
import TimeslotMaster from '../Admin/Pages/TimeSlot/TimeslotMaster';
import DoctorTimeSlotMapping from '../Admin/Pages/TimeSlot/DoctorTimeSlotMapping';


import AddItems from '../Billing/Pages/AddItems';
import AddCompanyMaster from '../Billing/Pages/AddCompanyMaster';
import AddtemRate from '../Billing/Pages/AddtemRate';
import ONCdocumentation from '../MedvantageWebsite/Pages/ONCdocumentation';
import APIdocumentation from '../MedvantageWebsite/Pages/APIdocumentation';
import HistoryReport from '../PatientMonitorDashboard/Components/History/Component/HistoryReport';
import PatientProfile from '../Clinical/Pages/IPD/IPDSharePages/PatientPersonalDashboard/PatientProfile';
import MedicalHistoryReportForDashboard from '../PatientMonitorDashboard/Components/History/Component/MedicalHistoryReportForDashboard';
import PatientProfileForDB from '../Clinical/Pages/IPD/IPDSharePages/PatientPersonalDashboard/PatientProfileForDB';
import LogDetails from '../ActivityLog/LogDetails';
import ReturnPurchase from '../Pharmacy/Purchase/Pages/ReturnPurchase';
import PatientOnVentilator from '../Clinical/Pages/IPD/IPDSharePages/PatientOnVentilator/PatientOnVentilator';
import ReturnSale from '../Pharmacy/Sale/Pages/ReturnSale';
import ReturnSalePrint from '../Pharmacy/Sale/Pages/ReturnSalePrint';
import BillingLists from '../Billing/Pages/BillingLists';
import BillingListwithCompany from '../Billing/Pages/BillingListwithCompany';
import PolicyDetails from '../Billing/Pages/PolicyDetails';
import PatientRegistrationAndAdmit from '../Registartion/Pages/OPDRegistration/PatientRegistrationAndAdmit';
import CommonLayoutSuperAdmin from '../CommonLayout/CommonLayoutSuperAdmin';
import PatientDetailsbyPollicyNo from '../Billing/Pages/PatientDetailsbyPollicyNo';
import ClaimedPolicies from '../Billing/Pages/ClaimedPolicies';
import ClaimReceivedList from '../Billing/Pages/ClaimReceivedList';
import ReceivedClaim from '../Billing/Pages/ReceivedClaim';
import BillbyCompany from '../Billing/Pages/BillbyCompany';
import Output from '../Clinical/Pages/IPD/IPDSharePages/Output/Output';
import GroupMaster from '../Admin/Pages/Schedule/GroupMaster';
import NotificationCategoryMaster from '../Admin/Pages/Schedule/NotificationCategoryMaster';
import EscalationMaster from '../Admin/Pages/Schedule/EscalationMaster';
import OTMaintenance from '../OperationTheatre/Pages/OTMaintenance';
import GroupKeywordAssign from '../Admin/Pages/Schedule/GroupKeywordAssign';
import PatientPhysicalActivity from '../Clinical/Pages/IPD/IPDSharePages/PatientPhysicalActivity/PatientPhysicalActivity';
import PrintBloodDonorRegistration from '../BloodBank/Pages/PrintBloodDonorRegistration';
import AdvancePayment from '../Billing/Pages/AdvancePayment';
import CreditLimit from '../Billing/Pages/CreditLimit';
import CreditApprovedLimit from '../Billing/Pages/CreditApprovedLimit';
 import DeveloperProjectRole from '../SpringBoard/Pages/DeveloperProjectRole';
 import ProjectWiseTask from '../SpringBoard/Pages/ProjectWiseTask';
 import Meeting from '../SpringBoard/Pages/Meeting';
import Discussion from '../SpringBoard/Pages/Discussion';
import { User } from '../SupportTicket/Pages/User';
import { Developer } from '../SupportTicket/Pages/Developer';
import TaskMaster from '../Admin/Pages/Schedule/TaskMaster';
import OrganDepartmentMapping from '../Admin/Pages/OrganDepartmentMapping/OrganDepartmentMapping';
import { CodeMaster } from '../Admin/Pages/EMR Master/CodeMaster';
import ListEditorMaster from '../Admin/Pages/EMR Master/ListEditorMaster';

export default function ApiRoutes() {

      return (
            <Routes>
                  {/* -----------------------------Start Website Routing---------------------- */}
                  <>
                        <Route path='*' element={<PageNotFound />} />
                        <Route path='/pagenotfound/' element={<PageNotFound />} />
                        <Route path='/' element={<HomeLayout />} />
                        <Route path='/about-us/' element={<AboutLayout />} />
                        <Route path='/benefits-rmd/' element={<BenifitOfRMDLayout />} />
                        <Route path='/channel-partner/' element={<ChannelPartnerLayout />} />
                        <Route path='/contact-us/' element={<ContactUsLayout />} />
                        <Route path='/signup/' element={<SignUpLaout />} />
                        <Route path='/confirmidentity/' element={<ConfirmIdentityLayout />} />
                        <Route path='/forgotpassword/' element={<ForgotPasswordLayout />} />
                        <Route path='/registration' element={<LayoutVerifyEmail />} />
                        <Route path='/verify-otp' element={<LayoutVerifyOtp />} />
                        <Route path='/deathcertificate/' element={<DeathCertificate />} />
                        <Route path="/login/" element={<Login />} />
                        <Route path='/verifyUHID/' element={<VerifyUHID />} />
                        <Route path='/patientData/' element={<PatientData />} />
                        <Route path='/patientCCDAData/' element={<PatientCCDAData />} />
                        <Route path='/oncdocumentation/' element={<ONCdocumentation />} />
                        <Route path='/apidocumentation/' element={<APIdocumentation />} />
                        <Route path='/groupMaster/' element={<GroupMaster />} />
                        <Route path='/notificationCategoryMaster/' element={<NotificationCategoryMaster />} />
                        <Route path='/escalationMaster/' element={<EscalationMaster />} />
                        <Route path='/groupKeywordAssign/' element={<GroupKeywordAssign />} />
                        <Route path='/taskMaster/' element={<TaskMaster />} />
                  </>


                  {/* -----------------------------End Website Routing----------------------- */}
                  {/* -----------------------------Start SuperAdmin Routing----------------------- */}
                  <>
                        <Route path="/superadmin/" element={<SuperAdminLogin />} />
                        <Route path="/countrymaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<CountryMaster />} name="superadmin" />} />} />
                        <Route path="/statemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<StateMaster />} name="superadmin" />} />} />
                        <Route path="/citymaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<CityMaster />} name="superadmin" />} />} />
                        <Route path="/usermaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<UserMaster />} name="superadmin" />} />} />
                        <Route path="/usertypemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<UserTypeMaster />} name="superadmin" />} />} />
                        <Route path="/patientdetailsmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<PatientDetailsMaster />} name="superadmin" />} />} />
                        <Route path="/departmentmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<DepartmentMaster />} name="superadmin" />} />} />
                        <Route path="/adminheadmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<HeadMaster />} name="superadmin" />} />} />
                        <Route path="/headdepartmentmapping/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<HeadDepartmentMapping />} name="superadmin" />} />} />
                        <Route path="/headmenuassign/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<HeadMenuAssign />} name="superadmin" />} />} />
                        <Route path="/menuapimapping/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<MenuApiMapping />} name="superadmin" />} />} />
                        <Route path="/menumaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<MenuMaster />} name="superadmin" />} />} />
                        <Route path="/modulemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ModuleMaster />} name="superadmin" />} />} />
                        <Route path="/modulemenuassign/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ModuleMenuAssign />} name="superadmin" />} />} />
                        <Route path="/applicationfeaturechecklistmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ApplicationFeatureChecklistMaster />} name="superadmin" />} />} />
                        <Route path="/moduledepartmentmapping/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ModuleDepartmentMapping />} name="superadmin" />} />} />

                        <Route path="/vitalmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<VitalMaster />} name="VitalMaster" />} />} />
                        <Route path="/guardianRelationmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<GuardianRelationMaster />} name="superadmin" />} />} />
                        <Route path="/rolemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<RoleMaster />} name="RoleMaster" />} />} />
                        <Route path="/rolewisemenuassign/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<RoleWiseMenuAssign />} name="superadmin" />} />} />
                        <Route path="/rolewisedepartmentassign/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<RoleWiseDepartmentAssign />} name="superadmin" />} />} />
                        <Route path="/designationmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<DesignationMaster />} name="superadmin" />} />} />
                        <Route path="/paymentmodemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<PaymentModeMaster />} name="superadmin" />} />} />

                        <Route path="/apidoucmentdetails/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ApiDocumentDetails />} name="superadmin" />} />} />
                        <Route path="/apidocumentmenumaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ApiDocumentMenuMaster />} name="superadmin" />} />} />
                        <Route path="/apidocumentrightdetails/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ApiDocumentRightDetails />} name="superadmin" />} />} />
                        <Route path="/apidocumentrrightmenu/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ApiDocumentRightMenuMaster />} name="superadmin" />} />} />
                        <Route path="/apimaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ApiMaster />} name="superadmin" />} />} />
                        <Route path="/baseurlmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<BaseUrlMaster />} name="superadmin" />} />} />
                        <Route path="/educationtypemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<EducationTypeMaster />} name="superadmin" />} />} />
                        <Route path="/idtypemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<IdTypeMaster />} name="superadmin" />} />} />
                        <Route path="/occupationtypemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<OccupationTypeMaster />} name="superadmin" />} />} />
                        <Route path="/packageMaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<PackageMaster />} name="superadmin" />} />} />
                        <Route path="/servicemaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ServiceMaster />} name="superadmin" />} />} />
                        <Route path="/serviceheadmapping/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ServiceHeadMapping />} name="superadmin" />} />} />
                        <Route path="/packageservicemapping/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<PackageServiceMapping />} name="superadmin" />} />} />
                        <Route path="/servicemodulemapping/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<ServiceModuleMapping />} name="superadmin" />} />} />

                        <Route path="/dashboardmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<DashboardMaster />} name="superadmin" />} />} />
                        <Route path="/widgetcategorymaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<WidgetCategoryMaster />} name="superadmin" />} />} />
                        <Route path="/widgetmaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<WidgetMaster />} name="superadmin" />} />} />
                        <Route path="/dashboardwidgetassign/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<DashboardWidgetAssign />} name="superadmin" />} />} />
                        <Route path="/widgetroleassign/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<WidgetRoleAssign />} name="superadmin" />} />} />
                        <Route path="/widgetsequenceassign/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<WidgetSequenceAssign />} name="superadmin" />} />} />
                        <Route path="/departmentcategorymaster/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<DepartmentCategoryMaster />} name="superadmin" />} />} />
                        <Route path="/notificationtemplate/" element={<AuthRoutesSuperadmin Compnent={<CommonLayoutSuperAdmin Component={<NotificationTemplate />} name="superadmin" />} />} />
                  </>
                  {/* -----------------------------End SuperAdmin Routing----------------------- */}

                  {/* -----------------------------Start Admin Routing----------------------- */}
                  <>
                        <Route path="/bedMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BedMaster />} name="BedMaster" />} />} />
                        <Route path="/buildingmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BuildingMaster />} name="BuildingMaster" />} />} />
                        <Route path="/floormaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<FloorMaster />} name="FloorMaster" />} />} />
                        <Route path="/caretakermaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CareTakerMaster />} name="CareTakerMaster" />} />} />
                        <Route path="/locationmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LocationMaster />} name="LocationMaster" />} />} />
                        <Route path="/locationdepartmentassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LocationDepartmentAssign />} name="LocationDepartmentAssign" />} />} />
                        <Route path="/roommaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RoomMaster />} name="RoomMaster" />} />} />
                        <Route path="/roomdepartmentassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RoomDepartmentAssign />} name="RoomDepartmentAssign" />} />} />
                        <Route path="/wardmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<WardMaster />} name="WardMaster" />} />} />
                        <Route path="/wardbedassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<WardBedAssignMaster />} name="WardBedAssignMaster" />} />} />
                        <Route path="/warddepartmentassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<WardDepartmentAssign />} name="WardDepartmentAssign" />} />} />
                        <Route path="/wardheadassignmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<WardHeadAssignMaster />} name="WardHeadAssignMaster" />} />} />
                        <Route path="/statusmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<StatusMaster />} name="StatusMaster" />} />} />
                        <Route path="/equipmentTypeMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EquipmentTypeMaster />} name="EquipmentTypeMaster" />} />} />
                        <Route path="/equipmentNameMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EquipmentNameMaster />} name="EquipmentNameMaster" />} />} />
                        <Route path="/alertEscalationMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AlertEscalationMaster />} name="AlertEscalationMaster" />} />} />
                        <Route path="/dischargetypemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DischargeTypeMaster />} name="DischargeTypeMaster" />} />} />
                        <Route path="/feedbackheadmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<FeedBackHeadMaster />} name="FeedBackHeadMaster" />} />} />
                        <Route path="/sequencecodegeneratormaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SequenceCodeGeneratorMaster />} name="SequenceCodeGeneratorMaster" />} />} />
                        <Route path="/racemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RaceMaster />} name="RaceMaster" />} />} />
                        <Route path="/oxygensupportmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OxygenSupportMaster />} name="OxygenSupportMaster" />} />} />
                        <Route path="/rtholdtypemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RTHoldTypeMaster />} name="RTHoldTypeMaster" />} />} />
                        <Route path="/investigationnormalrange/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<InvestigationNormalRange />} name="InvestigationNormalRange" />} />} />
                        <Route path="/machinetypemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MachineTypeMaster />} name="MachineTypeMaster" />} />} />
                        <Route path="/ethinicitymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EthinicityMaster />} name="EthinicityMaster" />} />} />
                        <Route path="/lifesupportmode/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LifeSupportMode />} name="LifeSupportMode" />} />} />
                        <Route path="/lifesupportmodemapping/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LifeSupportModeMapping />} name="LifeSupportModeMapping" />} />} />

                        <Route path="/examinationcategorymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ExaminationMaster />} name="ExaminationMaster" />} />} />
                        <Route path="/examinationsubcategorymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ExaminationSubCategory />} name="ExaminationSubCategory" />} />} />
                        <Route path="/examinationparametermaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ExaminationParameterMaster />} name="ExaminationParameterMaster" />} />} />
                        <Route path="/examinationsubcategoryparameterassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ExaminationSubCategoryParameterAssign />} name="ExaminationSubCategoryParameterAssign" />} />} />
                        <Route path="/examinationCategoryDepartmentAssign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ExaminationCategoryDepartmentAssign />} name="ExaminationCategoryDepartmentAssign" />} />} />
                        <Route path="/examinationparameterproblem/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ExaminationParameterProblem />} name="ExaminationParameterProblem" />} />} />

                        <Route path="/historycategory/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HistoryCategory />} name="HistoryCategory" />} />} />
                        <Route path="/historysubcategory/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HistorySubCategory />} name="HistorySubCategory" />} />} />
                        <Route path="/historyparameter/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HistoryParameterMaster />} name="HistoryParameterMaster" />} />} />
                        <Route path="/historysubcategoryparameterassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HistorySubCategoryParameterAssign />} name="HistorySubCategoryParameterAssign" />} />} />
                        <Route path="/historyCategoryDepartmentAssign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Historycategorydepartmentassign />} name="Historycategorydepartmentassign" />} />} />
                        <Route path="/historyParameterDepartmentAssign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HistoryParameterDepartmentAssign />} name="HistoryParameterDepartmentAssign" />} />} />
                        <Route path="/historyparameterproblem/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HistoryParameterProblem />} name="HistoryParameterProblem" />} />} />

                        <Route path="/dashboardparametermaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DashboardParameterMaster />} name="DashboardParameterMaster" />} />} />
                        <Route path="/dashboardcolumnsequence/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DashboardColumnSequence />} name="DashboardColumnSequence" />} />} />
                        <Route path="/dashboardcolumnmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DashboardColumnMaster />} name="DashboardColumnMaster" />} />} />
                        <Route path="/dashboardparametercolumnassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DashboardParameterColumnAssign />} name="DashboardParameterColumnAssign" />} />} />

                        <Route path="/addusermaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AddUserIndex />} name="AddUserIndex" />} />} />
                        <Route path="/languagemaster" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LanguageMaster />} name="LanguageMaster" />} />} />
                        <Route path="/languageheadmaster" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LanguageHeadMaster />} name="LanguageHeadMaster" />} />} />
                        <Route path="/languagemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LanguageMaster />} name="LanguageMaster" />} />} />
                        <Route path="/timeslotmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<TimeslotMaster />} name="TimeslotMaster" />} />} />
                        <Route path="/doctortimeslotmapping/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DoctorTimeSlotMapping />} name="DoctorTimeSlotMapping" />} />} />

                        {/* Admin -> Export Patient Data Routing*/}
                        <Route path="/USCDI-Data/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ExportPatientData />} name="ExportPatientData" />} />} />
                        <Route path="/CCDA-Data/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ExportPatientDataCCDA />} name="ExportPatientDataCCDA" />} />} />

                        <Route path="/tablemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<TableMaster />} name="TableMaster" />} />} />
                        <Route path="/languageconversionmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LanguageConversionMaster />} name="LanguageConversionMaster" />} />} />
                        <Route path="/logdetails/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LogDetails />} name="LogDetails" />} />} />
                        <Route path="/organdepartmentmapping/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OrganDepartmentMapping />} name="OrganDepartmentMapping" />} />} />
                  </>
                  {/* End Here */}

                  {/* -----------------------------End Admin Routing----------------------- */}

                  {/* -----------------------------Start Pathalogy Routing----------------------- */}
                  <>
                        <Route path="/testmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<TestMaster />} name="TestMaster" />} />} />
                        <Route path="/SampleCollection" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SampleCollection />} name="SampleCollection" />} />} />
                        <Route path="/PerformTest" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PerformTest />} name="PerformTestPathology" />} />} />
                        <Route path="/ValidateTest" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ValidateTest />} name="ValidateTestPathology" />} />} />
                        <Route path="/Print" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Print />} name="PrintPathology" />} />} />
                        <Route path="/PrintBarCode" element={<ProtectedRoutes Compnent={<PrintBarCode />} />} />
                        <Route path="/ViewReportPrint" element={<ProtectedRoutes Compnent={<ViewReportPrint />} />} />
                        <Route path="/samplemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SampleMaster />} name="SampleMaster" />} />} />
                        <Route path="/labsubtestmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SubTestMaster />} name="SubTestMaster" />} />} />
                        <Route path="/testcategorymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CategoryMaster />} name="CategoryMaster" />} />} />
                        <Route path="/testsubcategorymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SubCategoryMaster />} name="SubCategoryMaster" />} />} />
                        <Route path="/testinstruction/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<TestInstruction />} name="TestInstruction" />} />} />
                        <Route path="/machinemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MachineMaster />} name="MachineMaster" />} />} />
                        <Route path="/userTestcategoryassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<UserTestCategoryAssign />} name="UserTestCategoryAssign" />} />} />
                        <Route path="/testsubtestmapping/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<TestSubTestMapping />} name="TestSubTestMapping" />} />} />
                        <Route path="/usertestsucategoryassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<UserTestSubCategoryAssign />} name="UserTestSubCategoryAssign" />} />} />
                        <Route path="/subtestnormalrange/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SubtestNormalRange />} name="SubtestNormalRange" />} />} />

                  </>

                  {/* -----------------------------End Pathalogy Routing----------------------- */}

                  {/* ---------------------------------------Start Microbiology Routing------------------------ */}
                  <>
                        <Route path="/SampleRecieve/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SampleRecieve />} name="Microbiology" />} />} />
                        <Route path="/CultureLaboratoryReport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CultureLaboratoryReport />} name="Microbiology" />} />} />
                        <Route path="/CreateCultureReport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CreateCultureReport />} name="Microbiology" />} />} />
                        <Route path="/CreateCultureSterileReport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CreateCultureSterileReport />} name="Microbiology" />} />} />
                        <Route path="/microlaboratoryvalidation/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MicroLaboratoryValidation />} name="Microbiology" />} />} />
                        <Route path="/microvalidation/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MicroValidation />} name="Microbiology" />} />} />
                        <Route path="/microculturereportvalidation/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MicroCultureValidation />} name="Microbiology" />} />} />
                        <Route path="/microculturefinalvalidation/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MIcroCultureFinalValidation />} name="Microbiology" />} />} />
                        <Route path="/microculturesterilereportvalidation/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MicroCultureSterileValidation />} name="Microbiology" />} />} />
                        <Route path="/microculturesterilefinalvalidation/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MicroCultureSterileFinalValidation />} name="Microbiology" />} />} />
                        <Route path="/printlaboratoryreport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PrintLaboratoryReport />} name="Microbiology" />} />} />
                        <Route path="/viewprintlaboratoryreport/" element={<ProtectedRoutes Compnent={<ViewPrintLaboratoryReport />} />} />
                        <Route path="/printorganismreport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PrintOrganismReport />} name="Microbiology" />} />} />
                        <Route path="/viewprintorganismreport/" element={<ProtectedRoutes Compnent={<ViewPrintOrganismReport />} />} />
                        <Route path="/printculturesterilereport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PrintCultureSterileReport />} name="Microbiology" />} />} />
                        <Route path="/viewprintculturesterilereport/" element={<ProtectedRoutes Compnent={<ViewPrintCultureSterileReport />} />} />
                        <Route path="/microbiologytemplatemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MicrobiologyTemplateMaster />} name="Microbiology" />} />} />
                  </>
                  {/* ---------------------------------------End Microbiology Routing------------------------ */}

                  <Route path="/dashboard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={null} name="dashboard" />} />} />
                  {/* -----------------------------Start OPD Routing---------------------- */}
                  <>
                        <Route path="/opdpatientlist/" element={<ProtectedRoutes Compnent={<CommonLayout Component={null} name="OPDPatientList" />} />} />
                        <Route path="/prescriptionopd/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OPDPrescriptionIndex />} name="opd" />} />} />
                        <Route path="/vaccinationchart/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<VaccinationChart />} name="opd" />} />} />
                        <Route path="/opdvital/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OPDVitalIndex />} name="opd" />} />} />
                        <Route path="/opdcalculator/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OPDCalculatorIndex />} name="opd" />} />} />
                        <Route path="/investigationopd/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OPDInvestigationIndex />} name="opd" />} />} />
                        <Route path="/prescriptionPrint/" element={<ProtectedRoutes Compnent={<OpdPrintout />} />} />
                  </>
                  {/* -----------------------------End OPD Routing---------------------- */}

                  {/* -----------------------------Start IPD Routing---------------------- */}
                  <>
                        <Route path="/ipdpatientlist/" element={<ProtectedRoutes Compnent={<CommonLayout Component={null} name="IPDPatientList" />} />} />
                        <Route path="/prescriptionipd/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<IPDPrecriptionIndex />} name="ipd" />} />} />
                        <Route path="/patientpersonalDashboardipd/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientProfile />} name="ipd" />} />} />
                        {/* <Route path="/patientpersonalDashboardipd/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<IPDPatientPersonalDashboardIndex />} name="ipd" />} />} /> */}

                        <Route path="/ipdfile/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<IPDFile />} name="ipd" />} />} />
                        <Route path="/healthview/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HealthViewIndex />} name="ipd" />} />} />
                        <Route path="/personalDashboardIndexSecond/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PersonalDashboardIndexSecond />} name="ipd" />} />} />
                        <Route path="/ipdvital/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<IPDVitalsIndex />} name="ipd" />} />} />
                        <Route path="/iPDDischargeCard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<IPDDischargeCard />} name="ipd" />} />} />
                        {/* <Route path="/printDischargeCard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DischargeCard />} name="ipd" />} />} /> */}
                        <Route path="/printDischargeCard/" element={<ProtectedRoutes Compnent={<DischargeCard />} />} />
                        <Route path="/ipdcalculator/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<IPDCalculatorIndex />} name="ipd" />} />} />
                        <Route path="/assignMachinetoPatient/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AssignMachinetoPatient />} name="ipd" />} />} />
                        <Route path="/patientpersonalDashboardpmdDashboard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientProfileForDB />} name="null" />} />} />
                        <Route path="/patientoutput/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Output />} name="ipd" />} />} />
                        <Route path="/patientphysicalactivity/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientPhysicalActivity />} name="ipd" />} />} />
                       
                  </>
                  {/* -----------------------------End IPD Routing---------------------- */}

                  {/* -----------------------------Start Registration Routing---------------------- */}
                  <>
                        <Route path="/patientregistration/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientRegistration />} name="patientregistration" />} />} />
                        <Route path="/patientregistration&admit/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientRegistrationAndAdmit />} name="patientregistration" />} />} />
                        <Route path="/visitRevisitReport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<VisitRevisitReport />} name="patientregistration" />} />} />
                        <Route path="/opdPrint/" element={<ProtectedRoutes Compnent={<PrintOPDRegistrationSlip />} />} />
                        <Route path="/ipdPrint/" element={<ProtectedRoutes Compnent={<PrintUHIDQR />} />} />
                        <Route path="/printAdmitDetails/" element={<ProtectedRoutes Compnent={<PrintAdmitDetails />} />} />
                        <Route path="/admitpatient/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AdmitPatientByUHID />} name="patientregistration" />} />} />
                        <Route path="/profile/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Profile />} name="Profile" />} />} />
                        <Route path="/billing/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Billing />} name="billing" />} />} />
                        <Route path="/billingcahcounterprint/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CashCounterBillingReceipt />} name="CashCounterBillingReceipt" />} />} />
                        <Route path="/healthcard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HealthCard />} name="healthcard" />} />} />
                        <Route path="/printHealthCard/" element={<ProtectedRoutes Compnent={<PrintUHIDQR />} />} />

                  </>
                  {/* -----------------------------End Registration Routing---------------------- */}

                  {/* -----------------------------Start Billing Routing---------------------- */}
                  <>
                  <Route path="/billing/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Billing />} name="billing" />} />} />
                  <Route path="/additems/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AddItems />} name="additems" />} />} />
                  <Route path="/addCompany/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AddCompanyMaster />} name="addCompany" />} />} />
                  <Route path="/addItemRate/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AddtemRate />} name="addItemRate" />} />} />
                  <Route path="/billingList/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BillingLists/>} name="billingList" />} />} />
                  <Route path="/billistListwithCompany/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BillingListwithCompany/>} name="billingList" />} />} />
                  <Route path="/policydetails/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PolicyDetails/>} name="policydetails" />} />} />
                  <Route path="/patientdetailbypolicyno/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientDetailsbyPollicyNo/>} name="patientdetailbypolicyno" />} />} />
                  <Route path="/claimedpolicies/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ClaimedPolicies/>} name="claimedpolicies" />} />} />
                  <Route path="/claimreceivedlist/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ClaimReceivedList/>} name="claimreceivedlist" />} />} />
                  <Route path="/receivedclaim/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ReceivedClaim/>} name="receivedclaim" />} />} />
                  <Route path="/billbycompany/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BillbyCompany/>} name="billbycompany" />} />} />
                  <Route path="/AdvancePayment/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AdvancePayment/>} name="AdvancePayment" />} />} />
                  <Route path="/creditlimit/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CreditLimit/>} name="creditlimit" />} />} />
                  <Route path="/creditapproveimit/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CreditApprovedLimit/>} name="Creditapproveimit" />} />} />

                  </>
                  {/* -----------------------------End Billing Routing---------------------- */}


                  {/* -----------------------------Start PMD Routing---------------------- */}
                  <Route path="/patientmonitordashboard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientMonitoringDashboard />} name="null" />} />} />
                  {/* -----------------------------End PMD Routing---------------------- */}

                  {/* -----------------------------Start Dynamic Dashboard Routing---------------------- */}
                  <Route path="/dynamicdashboard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DynamicDashboard />} name="null" />} />} />
                  {/* -----------------------------End Dynamic Dashboard Routing---------------------- */}



                  {/* -----------------------------Start Pharmacy Routing---------------------- */}
                  <>
                        <Route path="/pharmacyPurchase/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PharmacyPurchase />} name="pharmacy" />} />} />
                        <Route path="/allpurchase/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AllPurchase />} name="pharmacy" />} />} />
                        <Route path="/purchaseprint/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PurchasePrint />} name="pharmacy" />} />} />
                        <Route path="/saleprint/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SalePrint />} name="pharmacy" />} />} />
                        <Route path="/salePrintByBillNo/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SalePrintByBillNo />} name="pharmacy" />} />} />
                        <Route path="/pharmacysale/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PharmacySale />} name="pharmacy" />} />} />
                        <Route path="/allsale/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AllSale />} name="pharmacy" />} />} />
                        <Route path="/pharmacyunitmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PharmacyUnitMaster />} name="pharmacy" />} />} />
                        <Route path="/hsncodemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HSNCodeMaster />} name="pharmacy" />} />} />
                        <Route path="/manufacturermaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ManufacturerMaster />} name="pharmacy" />} />} />
                        <Route path="/consumetypemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ConsumeTypeMaster />} name="pharmacy" />} />} />
                        <Route path="/pharmacyproductmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PharmacyProductMaster />} name="pharmacy" />} />} />
                        <Route path="/saltmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SaltMaster />} name="pharmacy" />} />} />
                        <Route path="/conversionmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ConversionMaster />} name="pharmacy" />} />} />
                        <Route path="/productsaltmapping/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ProductSaltMapping />} name="pharmacy" />} />} />
                        <Route path="/currentstock/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CurrentStock />} name="pharmacy" />} />} />
                        <Route path="/prescriptionnotificationreport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PrescriptionNotificationReport />} name="pharmacy" />} />} />
                        <Route path="/returnpurchase/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ReturnPurchase />} name="pharmacy" />} />} />
                        <Route path="/returnsale/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ReturnSale />} name="pharmacy" />} />} />
                        <Route path="/printreturnsale/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ReturnSalePrint />} name="pharmacy" />} />} />
                  </>
                  {/* -----------------------------End Pharmacy Routing---------------------- */}


                  {/* -----------------------------Start Inventory Routing---------------------- */}
                  <>
                        <Route path="/itemCategorymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ItemCategoryMaster />} name="itemcategorymaster" />} />} />
                        <Route path="/itemmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ItemMaster />} name="itemmaster" />} />} />
                        <Route path="/equipmentmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EquipmentMaster />} name="equipmentmaster" />} />} />
                        <Route path="/equipmentlocation/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EquipmentLocation />} name="equipmentlocation" />} />} />
                        <Route path="/equipmentamc/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EquipmentAMC />} name="equipmentamc" />} />} />
                        <Route path="/equipmentcategory/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EquipmentCategory />} name="equipmentcategory" />} />} />
                        <Route path="/equipmentchecklist/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EquipmentChecklist />} name="equipmentchecklist" />} />} />
                        <Route path="/itemsubcategorymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ItemSubCategoryMaster />} name="itemsubcategorymaster" />} />} />
                        <Route path="/servicetypemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ServiceTypeMaster />} name="servicetypemaster" />} />} />
                        <Route path="/vehiclerenewal/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<VehicleRenewal />} name="vehiclerenewal" />} />} />
                        <Route path="/vendormaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<VendorMaster />} name="vendormaster" />} />} />
                  </>
                  {/* -----------------------------End Inventory Routing---------------------- */}



                  {/* -----------------------------Start Bms Services Routing---------------------- */}
                  <>
                        <Route path="/alarmwarninglog/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AlarmWarningLog />} name="alarmwarninglog" />} />} />
                        <Route path="/deviceaccesscontrol/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DeviceAccessControl />} name="deviceaccescontrol" />} />} />
                        <Route path="/energymeter/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EnergyMeter />} name="energymeter" />} />} />
                        <Route path="/energyreading/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EnergyReading />} name="energyreading" />} />} />
                        <Route path="/energytypemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EnergyTypeMaster />} name="energytypemaster" />} />} />
                        <Route path="/lightingcontrol/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LightingControl />} name="lightingcontrol" />} />} />
                        <Route path="/locationenvironment/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LocationEnvironment />} name="locationenvironment" />} />} />
                        <Route path="/locationenvironmentsetting/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LocationEnvironmentSetting />} name="locationenvironmentsetting" />} />} />
                        <Route path="/payment/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Payment />} name="payment" />} />} />
                        <Route path="/securityaccesscontrol/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SecurityAccessControl />} name="securityaccesscontrol" />} />} />
                        <Route path="/tenantmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<TenantMaster />} name="tenantmaster" />} />} />
                        <Route path="/deviceaccesslog/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DeviceAccessLog />} name="deviceaccesslog" />} />} />
                        <Route path="/challanform/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ChallanForm />} name="challanform" />} />} />
                        <Route path="/challanreport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ChallanReport />} name="challanreport" />} />} />
                        <Route path="/challanreceipt/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ChallanReceipt />} name="challanreceipt" />} />} />
                  </>
                  {/* -----------------------------End Bms Services Routing--------------------------- */}


                  {/* -----------------------------Start Maintenance Routing---------------------- */}
                  <>
                        <Route path="/comlaintstatusmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ComlaintStatusMaster />} name="comlaintstatusmaster" />} />} />
                        <Route path="/complaint/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Complaint />} name="complaint" />} />} />
                        <Route path="/complaintcategorymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ComplaintCategoryMaster />} name="complaintcategorymaster" />} />} />
                        <Route path="/complaintchart/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ComplaintChart />} name="complaintchart" />} />} />
                        <Route path="/complaintrespondent/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ComplaintRespondent />} name="complaintrespondent" />} />} />
                        <Route path="/locationmainteneaceschedule/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<LocationMainteneaceSchedule />} name="locationmainteneaceschedule" />} />} />
                        <Route path="/maintenancecontract/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MaintenanceContract />} name="maintenancecontract" />} />} />
                        <Route path="/maintenancedashboard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MaintenanceDashboard />} name="maintenancedashboard" />} />} />
                        <Route path="/maintenanceschedule/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MaintenanceSchedule />} name="maintenanceschedule" />} />} />
                        <Route path="/maintenancevisit/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MaintenanceVisit />} name="maintenancevisit" />} />} />

                  </>

                  {/* -----------------------------End Maintenance Routing--------------------------- */}

                  {/* -----------------------------Start Springboard Routing---------------------- */}
                  <>
                        <Route path="/ProjectMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ProjectMaster />} name="ProjectMaster" />} />} />
                        <Route path="/ProjectTypeMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ProjectTypeMaster />} name="ProjectTypeMaster" />} />} />
                        <Route path="/AdminDashBoard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AdminDashBoard />} name="AdminDashBoard" />} />} />
                        <Route path="/TLDashboard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AdminDashBoard />} name="TLDashboard" />} />} />
                        <Route path="/AssignProject/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AssignProject />} name="AssignProject" />} />} />
                        <Route path="/AddModuleMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<AddModuleMaster />} name="AddModuleMaster" />} />} />
                        <Route path="/StoryMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<StoryMaster />} name="StoryMaster" />} />} />
                        <Route path="/SprintMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SprintMaster />} name="SprintMaster" />} />} />
                        <Route path="/SprintBacklog/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SprintBacklog />} name="SprintBacklog" />} />} />
                        <Route path="/Agenda/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Agenda />} name="Agenda" />} />} />
                        <Route path="/DeveloperProjectRole/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<DeveloperProjectRole />} name="DeveloperProjectRole" />} />} />
                        <Route path="/ProjectWiseTask/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ProjectWiseTask />} name="ProjectWiseTask" />} />} />
                        <Route path="/Meeting/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Meeting />} name="Meeting" />} />} />
                        <Route path="/Discussion/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<Discussion />} name="Discussion" />} />} />
                  </>
                  {/* -----------------------------End Springboard Routing---------------------- */}

                  {/* -----------------------------Start OPERATION THEATRES Routing---------------------- */}
                  <>
                        <Route path="/surgerymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SurgeryMaster />} name="Surgerymaster" />} />} />
                        <Route path="/operationtheatermaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OperationTheaterMaster />} name="operationtheatermaster" />} />} />
                        <Route path="/otteam/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OtTeam />} name="otteam" />} />} />
                        <Route path="/patientsurgeryadvice/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientSurgeryAdvice />} name="patientsurgeryadvice" />} />} />
                        <Route path="/surgerykititemassign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SurgeryKitItemAssign />} name="surgerykititemassign" />} />} />
                        <Route path="/surgeryChecklistItemMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SurgeryCheckListItemMaster />} name="surgeryChecklistItemMaster" />} />} />
                        <Route path="/surgerykitMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SurgeryKitMaster />} name="surgerykitMaster" />} />} />
                        <Route path="/surgerykitAssign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SurgeryKitAssign />} name="surgerykitAssign" />} />} />
                        <Route path="/patientsurgeryplanned/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientSurgeryPlanned />} name="patientsurgeryplanned" />} />} />
                        <Route path="/otmaintenance/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OTMaintenance />} name="otmaintenance" />} />} />
                  </>
                  {/* -----------------------------End OPERATION THEATRES Routing---------------------- */}

                  {/* -----------------------------Start Radiology  Routing---------------------- */}
                  <>
                        <Route path="/organmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OrganMaster />} name="OrganMaster" />} />} />
                        <Route path="/organparametermaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OrganParameterMaster />} name="OrganParameterMaster" />} />} />
                        <Route path="/organparametermappingmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<OrganParameterMappingMaster />} name="OrganParameterMappingMaster" />} />} />
                        <Route path="/modalitymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ModalityMaster />} name="ModalityMaster" />} />} />
                        <Route path="/radiologynormalrangemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RadiologyNormalRange />} name="RadiologyNormalRange" />} />} />
                        <Route path="/radiologytestmaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RadiologyTestMaster />} name="RadiologyTestMaster" />} />} />
                        <Route path="/testOrganMapping/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<TestOrganMapping />} name="TestOrganMapping" />} />} />
                        <Route path="/radiologytestsubcategorymaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<TestSubCategoryMaster />} name="TestSubCategoryMaster" />} />} />
                        <Route path="/Perform-Test/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RadiologyPerformTest />} name="PerformTest" />} />} />
                        <Route path="/Radiology-validate/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RadiologyValidate />} name="RadiologyValidate" />} />} />
                        <Route path="/RadiologyFinalValidate/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RadioFinalValidate />} name="RadioFinalValidate" />} />} />
                        <Route path="/printReport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PrintReport />} name="PrintReport" />} />} />

                        <Route path="/radiologyPrintReport/" element={<ProtectedRoutes Compnent={<RadiologyPrintReport />} />} />
                  </>
                  {/* -----------------------------End Radiology  Routing---------------------- */}


                  {/* -----------------------------Start Dietetics  Routing---------------------- */}
                  <>

                        <Route path="/dieteticsPatientList/" element={<ProtectedRoutes Compnent={<CommonLayout Component={null} name="DieteticsPatientList" />} />} />
                        <Route path="/recipeMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<RecipeMaster />} name="RecipeMaster" />} />} />
                        <Route path="/foodIntake/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<FoodIntake />} name="FoodIntake" />} />} />
                        <Route path="/supplementIntake/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<SupplementIntake />} name="supplementIntake" />} />} />
                        <Route path="/patientIntake/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientIntake />} name="patientIntake" />} />} />

                  </>
                  {/* -----------------------------End Dietetics  Routing---------------------- */}










                  {/* -----------------------------Start Notification Scheduler Routing---------------------- */}

                  <Route path="/notificationScheduler/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<NotificationScheduler />} name="NotificationScheduler" />} />} />
                  {/* <Route path="/groupMaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<GroupMaster />} name="GroupMaster" />} />} /> */}

                  {/* -----------------------------End Notification Scheduler Routing---------------------- */}

                  {/* -----------------------------START BLOOD BANK  ROUTING---------------------- */}
                  <Route path="/donorregistration/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BloodDonorRegestration />} name="Bloodbank" />} />} />
                  <Route path="/donorvisit/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BloodDonorVisit />} name="Bloodbank" />} />} />
                  <Route path="/createbloodbag/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CreateBloodBag />} name="Bloodbank" />} />} />
                  <Route path="/editbloodbag/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<EditBloodBag />} name="Bloodbank" />} />} />
                  <Route path="/bloodbagdiscard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BloodDiscardForm />} name="Bloodbank" />} />} />
                  <Route path="/elisatest/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ElisaTest />} name="Bloodbank" />} />} />
                  <Route path="/bloodrequest/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BloodRequest />} name="Bloodbank" />} />} />
                  <Route path="/bloodissuelist/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<BloodIssueList />} name="Bloodbank" />} />} />
                  <Route path="/printblooddonorregistration/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PrintBloodDonorRegistration />} name="Bloodbank" />} />} />
                  {/* -----------------------------END BLOOD BANK  ROUTING---------------------- */}

                  {/* -----------------------------START FOOD INTAKE CHECKLIST ROUTING---------------------- */}
                  <Route path="/foodintakechecklist/" element={<ProtectedRoutes Compnent={<FoodIntakeChecklist />} />} />
                  {/* -----------------------------END FOOD INTAKE CHECKLIST  ROUTING---------------------- */}


                  {/* -----------------------------START ImportCqmData ROUTING Start---------------------- */}
                  <Route path="/importcqmdata/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ImportCqmData />} name="ImportCqmData" />} />} />
                  {/* -----------------------------END ImportCqmData ROUTING End---------------------- */}

                  <Route path="/historyReport/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<HistoryReport />} name="HistoryReport" />} />} />
                  <Route path="/medicalhistoryreportdashboard/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<MedicalHistoryReportForDashboard />} name="MedicalHistoryReportForDashboard" />} />} />

                  {/* -----------------------------------Start Patient On Ventilator----------------------------------------- */}
                  <Route path="/patientVentilatorAssign/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<PatientOnVentilator />} name="null" />} />} />
                  {/* -----------------------------------End Patient On Ventilator----------------------------------------- */}

                                                   {/* Support Ticket Routing Start Here */}
                   <Route path="/userDashoard/" element={<ProtectedRoutes Compnent={ <CommonLayout Component={<User />} name="null" />    } />} />
                   <Route path="/developerDashoard/" element={<ProtectedRoutes Compnent={ <CommonLayout Component={<Developer />} name="null" />    } />} />
                 
                   {/* -----------------------------------Start Medvantage EMR Master----------------------------------------- */}
                   <Route path="/codemaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<CodeMaster />} name="EMRMaster" />} />} />
                   <Route path="/listeditormaster/" element={<ProtectedRoutes Compnent={<CommonLayout Component={<ListEditorMaster />} name="EMRMaster" />} />} />
                  {/* -----------------------------------End Medvantage EMR Master----------------------------------------- */}


            </Routes>

      )
}
