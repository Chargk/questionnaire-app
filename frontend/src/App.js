import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionnaireCatalog from "./QuestionnaireCatalog";
import QuestionnaireBuilder from "./QuestionnaireBulider";
import RunQuestionnaire from "./RunQuestionnaire";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionnaireCatalog />} />
        <Route path="/run/:id" element={<RunQuestionnaire />} />
        <Route
          path="/create-questionnaire"
          element={<QuestionnaireBuilder />}
        />
      </Routes>
    </Router>
  );
}

export default App;
