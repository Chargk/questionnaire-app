import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  FormContainer,
  Title,
  Label,
  Input,
  SaveButton,
} from "../styles/EditQuestionnaire.styles";

const EditQuestionnaire = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/api/questionnaires/${id}`);
      const data = await res.json();
      setName(data.name);
      setDescription(data.description);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`http://localhost:5000/api/questionnaires/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    setLoading(false);
    navigate("/", { state: { edited: true } });
  };

  return (
    <FormContainer>
      <Title>Edit Questionnaire</Title>
      <form onSubmit={handleSubmit}>
        <Label>Name:</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Label>Description:</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <SaveButton type="submit">
          {loading ? <ClipLoader color="#fff" size={18} /> : "Save changes"}
        </SaveButton>
      </form>
    </FormContainer>
  );
};

export default EditQuestionnaire;
