import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionnaireCatalog from "./QuestionnaireCatalog";
import RunQuestionnaire from "./RunQuestionnaire";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionnaireCatalog />} />
        <Route path="/run/:id" element={<RunQuestionnaire />} />
      </Routes>
    </Router>
  );
}

export default App;
