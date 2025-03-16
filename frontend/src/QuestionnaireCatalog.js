import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Button } from "./styles/GlobalStyles";

function QuestionnaireCatalog() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/questionnaires?page=1&limit=5")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setQuestionnaires(data || []);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching questionnaires:", error));
  }, []);

  const deleteQuestionnaire = async (id) => {
    if (window.confirm("Are you sure you want to delete the questionnaire?")) {
      try {
        await fetch(`http://localhost:5000/api/questionnaires/${id}`, {
          method: "DELETE",
        });
        setQuestionnaires(questionnaires.filter((q) => q.id !== id));
      } catch (error) {
        console.error(
          "Error occurred while trying to delete the questionnaire:",
          error
        );
      }
    }
  };

  return (
    <Container>
      <Title>Questionnaire Catalog</Title>
      <ul>
        {questionnaires?.length > 0 ? (
          questionnaires.map((q) => (
            <li key={q.id}>
              <h3>{q.name}</h3>
              <p>{q.description}</p>
              <p>Questions: {q.questionsCount}</p>
              <p>Completions: {q.completions}</p>

              <Button onClick={() => alert("Edit feature coming soon!")}>
                Edit
              </Button>
              <Button onClick={() => deleteQuestionnaire(q.id)}>Delete</Button>
              <Button onClick={() => navigate(`/run/${q.id}`)}>Run</Button>
            </li>
          ))
        ) : (
          <p>Loading or no questionnaires available...</p>
        )}
      </ul>

      <div>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Back
        </Button>
        <span>
          {" "}
          {page} / {totalPages}{" "}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </Button>
      </div>
    </Container>
  );
}

export default QuestionnaireCatalog;
