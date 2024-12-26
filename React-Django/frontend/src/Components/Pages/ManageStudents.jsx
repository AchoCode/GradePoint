import React, { useEffect, useState } from "react";
import { Button } from "../Utilities/Button";
import { Loader } from "../Utilities/Loader";
import { FaTrash } from "react-icons/fa6";
import { InputField } from "../Utilities/InputField";
import { toast } from "react-toastify";
import api from "../../api";
import { Capitalize } from "../../Constants";
import { BeatLoader } from "react-spinners";
export const ManageStudents = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState(null);
  const [listLoading, setListLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState({});
  const [studentList, setStudentList] = useState([]);

  const fetchStudents = async () => {
    setListLoading(true);
    try {
      const response = await api.get("/api/fetch-students");

      if (response.status != 200) {
        toast.error("error fetching data");
      } else {
        // const apiData =
        setStudentList(response.data.payload.students);
      }
    } catch (error) {
    } finally {
      setListLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  // * filters student list
  const filteredList = studentList
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort by name, or modify to any sorting logic
    .filter(
      (student) =>
        (filter === "All" ||
          student.level?.toLowerCase() === filter.toLowerCase()) &&
        (student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.reg_no?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleDeleteStudent = async (id) => {
    // Set loading state for the specific student
    setBtnLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await api.delete(`/api/delete-student/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchStudents(); // Refetch students after successful deletion
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Error deleting student");
      console.log(error);
    } finally {
      // Reset loading state for the specific student
      setBtnLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormLoading(true);
    if (!level || !name) {
      toast.error("Cannot process empty fields");
      setFormLoading(false);
    } else {
      try {
        const response = await api.post("/api/create-student", {
          name: Capitalize(name),
          level: Capitalize(level),
        });
        console.log(response);
        if (response.status == 201) {
          toast.success("Student added successfully");
          setName("");
          setLevel(null);
        } else {
          toast.error(response.data.error[0]);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error[0]);
      } finally {
        setFormLoading(false);
        fetchStudents();
      }
    }
  };

  return (
    <div className="tab-container">
      <div className="student-list-table">
        <div className="student-table-dash">
          <div className="cta-box">
            <label>Search</label>
            <InputField
              type="text"
              label="Student name or reg no."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="cta-box">
            <label> Sort by</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Nursery">Nursery</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
            </select>
          </div>
        </div>
        {listLoading ? (
          <Loader loading={listLoading} grading color={"green"} />
        ) : (
          <>
            <div className="student-list">
              <table>
                <thead
                  style={{
                    backgroundColor: "white",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <tr>
                    <th>S/N</th>
                    <th>Student name</th>
                    <th>Reg No.</th>
                    <th>Level</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.length > 0 ? (
                    filteredList.length > 0 ? (
                      filteredList.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>{student.name}</td>
                          <td>{student.reg_no}</td>
                          <td>{student.level}</td>
                          <td>
                            <Button
                              title={
                                btnLoading[student.id] ? (
                                  <BeatLoader
                                    loading={true}
                                    size={10}
                                    color="white"
                                  />
                                ) : (
                                  <FaTrash />
                                )
                              }
                              handleOnClick={() =>
                                handleDeleteStudent(student.id)
                              }
                              aria-label={`Delete ${student.name}`}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          No students match your search.
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No students available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="form-section">
        <div className="update-form">
          <div className="heading">
            <h3>New student</h3>
            <Loader loading={formLoading} top={10} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label>
                Name of student
                <InputField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="radio-btn-box">
              <div className="heading">
                <h3>Select level</h3>
              </div>
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
            <Button title="Add" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
