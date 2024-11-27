import { HomePage } from "./HomePage";
import { AboutUs } from "./AboutUs";
import { CheckResult } from "./CheckResult";
import { ContactUs } from "./ContactUs";
import { ErrorPage } from "./ErrorPage";
import { LoginAuth } from "./LoginAuth";
import { ManageStudents } from "./ManageStudents";
import { NurseryGrade } from "./NurseryGrade";
import { PrimaryGrade } from "./PrimaryGrade";
import { RegisterAuth } from "./RegisterAuth";
import { ScratchCardPage } from "./ScratchCardPage";
import { SecondaryGrade } from "./SecondaryGrade";
import { Routes, Route } from "react-router-dom";
import { GradingTab } from "../Utilities/GradingTab";
function ContentArea() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/check-result" element={<CheckResult />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/login-auth" element={<LoginAuth />} />
        {/* <Route exact path="/manage-students" element={<ManageStudents />} />
        <Route exact path="/Nursery-grade" element={<NurseryGrade />} />
        <Route exact path="/primary-grade" element={<PrimaryGrade />} /> */}
        <Route exact path="/register-auth" element={<RegisterAuth />} />
        {/* <Route exact path="/scratch-cards" element={<ScratchCardPage />} /> */}
        <Route exact path="/grading/*" element={<GradingTab />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default ContentArea;
