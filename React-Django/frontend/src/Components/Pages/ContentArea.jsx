import { HomePage } from "./HomePage";
import { AboutUs } from "./AboutUs";
import { CheckResult } from "./CheckResult";
import { ContactUs } from "./ContactUs";
import { ErrorPage } from "./ErrorPage";
import { LoginAuth } from "./LoginAuth";
import { RegisterAuth } from "./RegisterAuth";
import { Routes, Route } from "react-router-dom";
import { GradingTab } from "../Utilities/GradingTab";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContentArea() {
  return (
    <>
        <ToastContainer position="top-center" stacked style={{
          top: 50
        }}/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/check-result" element={<CheckResult />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/login-auth" element={<LoginAuth />} />
        <Route exact path="/register-auth" element={<RegisterAuth />} />
        <Route exact path="/grading/*" element={<GradingTab />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default ContentArea;
