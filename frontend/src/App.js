import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionnaireCatalog from "./components/QuestionnaireCatalog";
import QuestionnaireBuilder from "./components/QuestionnaireBuilder";
import RunQuestionnaire from "./components/RunQuestionnaire";

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
