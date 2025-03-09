import React, { useContext, useEffect, useState } from "react";
import { Loader } from "../Utilities/Loader";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
import { BeatLoader, PulseLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa6";
import { AuthContext } from "../Utilities/AuthContext";
import api from "../../api";
import { toast } from "react-toastify";
import { Capitalize } from "../../Constants";
import "../../styles/settings.css";

export const Settings = () => {
  // function to fetch user subject settings
  const fetchSettings = async () => {
    let response;
    if (loggedIn) {
      try {
        response = await api.get("/api/settings");

        if (response.status != 200) {
          toast.error("something went wrong");
        } else {
          setCourses(response.data.payload.settings);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      response = JSON.parse(localStorage.getItem("settings")) || [];
      setCourses(response);
    }
  };

  //loads settings on render
  useEffect(() => {
    fetchSettings();
  }, []);

  //state variables
  const [filter, setFilter] = useState("Nursery");
  const [formLoading, setFormLoading] = useState(false);
  const [level, setLevel] = useState(null);
  const [customSubject, setCustomSubject] = useState("");
  const [btnLoading, setBtnLoading] = useState([]);
  const [courses, setCourses] = useState([]);
  const { loggedIn } = useContext(AuthContext);

  // multichoice subjects
  const [subjects, setSubjects] = useState([
    { subject: "Mathematics", checked: true },
    { subject: "English language", checked: true },
    { subject: "Igbo language", checked: true },
    { subject: "Civic education", checked: true },
    { subject: "Cultural and creative arts", checked: true },
    { subject: "Christian religious studies", checked: true },
    { subject: "Computer", checked: true },
    { subject: "Agricultral science", checked: true },
    { subject: "Home economics", checked: true },
    { subject: "Basic science", checked: false },
    { subject: "Physical and health education", checked: false },
    { subject: "Basic technology", checked: false },
    { subject: "Chemistry", checked: false },
    { subject: "Biology", checked: false },
    { subject: "Physics", checked: false },
    { subject: "Social studies", checked: false },
    { subject: "Health habits", checked: false },
    { subject: "Social habits", checked: false },
    { subject: "Rhymes", checked: false },
    { subject: "Writing", checked: false },
    { subject: "Government", checked: false },
    { subject: "Business studies", checked: false },
    { subject: "Literature", checked: false },
    { subject: "Commerce", checked: false },
  ]);

  // handles checking of a subject
  const handleCheckboxChange = (index) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) =>
        i === index ? { ...subject, checked: !subject.checked } : subject
      )
    );
  };
  const courseData = subjects.filter((subject) => subject.checked);

  //filters student list
  const filteredList = courses
    .sort((a, b) => a.course_name.localeCompare(b.course_name)) // Sort by name, or modify to any sorting logic
    .filter((course) => filter === course.course_level);

  const handleDeleteCourse = async (id) => {
    // Set loading state for the specific student
    setBtnLoading((prev) => ({ ...prev, [id]: true }));
    if (loggedIn) {
      try {
        const response = await api.delete(`/api/delete-course/${id}`);
        if (response.status === 200) {
          toast.success(response.data.message);
          fetchSettings(); // Refetch students after successful deletion
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        toast.error("Error deleting subject");
        console.log(error);
      } finally {
        // Reset loading state for the specific student
        setBtnLoading((prev) => ({ ...prev, [id]: false }));
      }
    } else {
      const subjects = JSON.parse(localStorage.getItem("settings"));
      const updatedSubjects = subjects.filter((subject) => subject.id !== id);
      localStorage.setItem("settings", JSON.stringify(updatedSubjects));
      toast.success("Subject deleted");
      fetchSettings();
      setBtnLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormLoading(true);
    if ((courseData.length === 0 && customSubject === "")) {
      setFormLoading(false);
      return toast.error("Cannot process empty fields");
    }
    if (!level) {
      setFormLoading(false);
      return toast.error("Please select a level ");
    }

    if (loggedIn) {
      try {
        const response = await api.post("/api/add-settings", {
          courses: courseData,
          course_level: Capitalize(level),
          custom_subject: customSubject || false,
        });
        if (response.status == 201) {
          toast.success("Subject added successfully");
          setLevel(null);
        } else {
          toast.error(response.data.error[0]);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error[0]);
      } finally {
        setFormLoading(false);
        fetchSettings();
      }
    } else {
      const oldSubjects = JSON.parse(localStorage.getItem("settings")) || [];
      const filterSubject = oldSubjects.filter(
        (subject) =>
          subject.course_name == Capitalize(name) &&
          subject.course_level == Capitalize(level)
      );
      if (filterSubject.length > 0) {
        toast.error("Cant have duplicate subjects in a level");
        setFormLoading(false);
      } else {
        const newSubjects = [
          ...oldSubjects,
          {
            id: Date.now(),
            course_name: Capitalize(name),
            course_level: Capitalize(level),
          },
        ];
        localStorage.setItem("settings", JSON.stringify(newSubjects));
        setFormLoading(false);
        toast.success("Subject added successfully");
        fetchSettings();
      }
    }
  };

  return (
    <div className="tab-container">
      <div className="student-list-table" style={{ width: "550px" }}>
        <div className="student-table-dash">
          <label
            style={{ color: "white", fontSize: "1.3rem", fontWeight: 600 }}
          >
            Registered Subjects
          </label>
          <div className="cta-box">
            <label> Level </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="Nursery">Nursery</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
            </select>
          </div>
        </div>

        <div className="student-list">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Subject</th>
                <th>Subject level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                <>
                  {filteredList.map((subject, index) => (
                    <tr key={subject.id}>
                      <td>{index + 1}</td>
                      <td>{subject.course_name}</td>
                      <td>{subject.course_level}</td>
                      <td>
                        <Button
                          title={
                            btnLoading[subject.id] ? (
                              <PulseLoader
                                color="white"
                                size={7}
                                loading={true}
                              />
                            ) : (
                              <FaTrash />
                            )
                          }
                          handleOnClick={() => handleDeleteCourse(subject.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No registered subjects for this level
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="form-section">
        <div className="update-form">
          <Loader loading={formLoading} top={0} color="green" />

          <h3 className="heading-label">Choose Subjects</h3>
          <form onSubmit={handleSubmit}>
            <div className="multi-choice-container">
              {subjects.map((subject, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={subject.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {subject.subject}
                </label>
              ))}
            </div>
            <div className="custom-box">
              <div className="heading">
                <h3>Add custom subject</h3>
              </div>
              <div className="input-box">
                <label>
                  Name of Subject
                  <InputField
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                  />
                </label>
              </div>
              <div className="radio-btn-box">
                <span>Select Level</span>
                <div className="radio-btn">
                  <label>
                    <input
                      type="radio"
                      value="Nursery"
                      checked={level === "Nursery"}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                    Nursery
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Primary"
                      checked={level === "Primary"}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                    Primary
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Secondary"
                      checked={level === "Secondary"}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                    Secondary
                  </label>
                </div>
              </div>
              <Button title="Add subject" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
