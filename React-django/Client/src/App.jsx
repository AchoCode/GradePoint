import { HomePage } from "./Components/Pages/HomePage";
import { AboutUs } from "./Components/Pages/AboutUs";
import { CheckResult } from "./Components/Pages/CheckResult";
import { ContactUs } from "./Components/Pages/ContactUs";
import { ErrorPage } from "./Components/Pages/ErrorPage";
import { LoginAuth } from "./Components/Pages/LoginAuth";
import { ManageStudents } from "./Components/Pages/ManageStudents";
import { NurseryGrade } from "./Components/Pages/NurseryGrade";
import { PrimaryGrade } from "./Components/Pages/PrimaryGrade";
import { RegisterAuth } from "./Components/Pages/RegisterAuth";
import { ScratchCardPage } from "./Components/Pages/ScratchCardPage";
import { SecondaryGrade } from "./Components/Pages/SecondaryGrade";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/check-result" element={<CheckResult />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/login-auth" element={<LoginAuth />} />
        <Route exact path="/manage-students" element={<ManageStudents />} />
        <Route exact path="/Nursery-grade" element={<NurseryGrade />} />
        <Route exact path="/primary-grade" element={<PrimaryGrade />} />
        <Route exact path="/register-auth" element={<RegisterAuth />} />
        <Route exact path="/scratch-cards" element={<ScratchCardPage />} />
        <Route exact path="/secondary-grade" element={<SecondaryGrade />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
