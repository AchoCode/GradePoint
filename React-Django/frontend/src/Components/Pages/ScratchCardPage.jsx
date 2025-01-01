import React, { useEffect, useState } from "react";
import { Loader } from "../Utilities/Loader";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import api from "../../api";
import { Capitalize } from "../../Constants";
import { BeatLoader } from "react-spinners";

export const ScratchCardPage = () => {
  const [noOfCards, setNoOfCards] = useState("");
  const [listLoading, setListLoading] = useState(false);
  const [btnList, setBtnList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  const fetchCards = async () => {
    setListLoading(true);
    try {
      const response = await api.get("/api/fetch-cards");
      if (response.status != 200) {
        toast.error("something went wrong.");
      } else {
        setCardList(response.data.payload.cards);
      }
    } catch (error) {
      toast.error("an error occurred.");
      console.log(error);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handelCardDelete = async (id) => {
    setBtnList((prevbtn) => ({ ...prevbtn, [id]: true }));
    try {
      const response = await api.delete(`/api/delete-card/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchCards(); // Refetch students after successful deletion
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Error deleting card");
      console.log(error);
    } finally {
      setBtnList((prevbtn) => ({ ...prevbtn, [id]: false }));
    }
  };

  const handleGenerateCards = async (event) => {
    event.preventDefault();
    setFormLoading(true);
    if (noOfCards === 0) {
      setFormLoading(false);
      return toast.error("Number of cards must be greater than 0");
    }
    try {
      const response = await api.post("/api/generate-cards", {
        number_of_cards: parseInt(noOfCards),
      });

      if (response.status != 201) {
        toast.error("something went wrong. Try again.");
      } else {
        toast.success("Scratch cards created successfully.");
        fetchCards();
        setNoOfCards(0);
      }
    } catch (error) {
      toast.error("error occurred.");
      console.log(error);
    } finally {
      setFormLoading(false);
    }
  };
  return (
    <div className="tab-container">
      <div className="student-list-table">
        {listLoading ? (
          <Loader loading={listLoading} grading color="green" />
        ) : (
          <div className="student-list">
            <table>
              <thead
                style={{ backgroundColor: "white", position: "sticky", top: 0 }}
              >
                <tr>
                  <th>S/N</th>
                  <th>Card number</th>
                  <th>Valid status</th>
                  <th>Expiry date</th>
                  <th>Used cases</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cardList.length > 0 ? (
                  cardList.map((card, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{card.card_number}</td>
                      <td style={{ textAlign: "center" }}>
                        {card.is_valid ? "True" : "False"}
                      </td>
                      <td>{card.valid_period}</td>
                      <td style={{ textAlign: "center" }}>
                        {card.no_of_times_used}
                      </td>
                      <td>
                        <Button
                          title={
                            btnList[card.id] ? (
                              <BeatLoader
                                size={10}
                                color="white"
                                loading={true}
                              />
                            ) : (
                              <FaTrash />
                            )
                          }
                          handleOnClick={() => handelCardDelete(card.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No cards available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="form-section">
        <div className="update-form">
          <Loader loading={formLoading} top={10} />
          <div className="heading">
            <h3>Guidelines</h3>
          </div>
          <div className="input-box">
            <p style={{ fontSize: "1.2rem", fontWeight: 600, margin: "10px" }}>
              Each scratch card has a valid period of 7 days from the day of
              creation. Each card can be used 5 times by a student. After which
              the card should be deleted.
            </p>
          </div>
          <div className="heading">
            <h3>Generate scratch cards</h3>
          </div>
          <div className="input-box">
            <label>
              Number of cards
              <InputField
                type="number"
                value={noOfCards}
                onChange={(e) => setNoOfCards(e.target.value)}
                min
              />
            </label>
          </div>
          <Button
            title="Generate"
            type="submit"
            handleOnClick={handleGenerateCards}
          />
        </div>
      </div>
    </div>
  );
};
