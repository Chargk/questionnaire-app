import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  console.log("Current state of questionnaires:", questionnaires);

  return (
    <div>
      <h1>Questionnaire Catalog</h1>
      <ul>
        {questionnaires?.length > 0 ? (
          questionnaires.map((q) => (
            <li key={q.id}>
              <h3>{q.name}</h3>
              <p>{q.description}</p>
              <p>Questions: {q.questionsCount}</p>
              <p>Completions: {q.completions}</p>

              <button onClick={() => alert("Edit feature coming soon!")}>
                Edit
              </button>
              <button onClick={() => deleteQuestionnaire(q.id)}>Delete</button>
              <button onClick={() => navigate(`/run/${q.id}`)}>Run</button>
            </li>
          ))
        ) : (
          <p>Loading or no questionnaires available...</p>
        )}
      </ul>

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Back
        </button>
        <span>
          {" "}
          {page} / {totalPages}{" "}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default QuestionnaireCatalog;
