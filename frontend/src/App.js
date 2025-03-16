import React, { useEffect, useState } from "react";

function App() {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/questionnaires")
      .then((response) => response.json())
      .then((data) => setQuestionnaires(data))
      .catch((error) => console.error("Error fetching questionnaires:", error));
  }, []);

  return (
    <div>
      <h1>Questionnaire Catalog</h1>
      <ul>
        {questionnaires.map((q) => (
          <li key={q.id}>
            <h3>{q.name}</h3>
            <p>{q.description}</p>
            <p>Questions: {q.questionsCount}</p>
            <p>Completions: {q.completions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
