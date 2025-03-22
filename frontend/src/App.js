import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import QuestionnaireCatalog from "./components/QuestionnaireCatalog";
import QuestionnaireBuilder from "./components/QuestionnaireBuilder";
import RunQuestionnaire from "./components/RunQuestionnaire";
import { AnimatePresence, motion } from "framer-motion";
import Header, { ContentContainer } from "./styles/Header";
import EditQuestionnaire from "./components/EditQuestionnaire";
import Statistics from "./components/StatisticPage";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <ContentContainer>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <QuestionnaireCatalog />
                </AnimatedPage>
              }
            />
            <Route
              path="/create-questionnaire"
              element={
                <AnimatedPage>
                  <QuestionnaireBuilder />
                </AnimatedPage>
              }
            />
            <Route
              path="/run/:id"
              element={
                <AnimatedPage>
                  <RunQuestionnaire />
                </AnimatedPage>
              }
            />
            <Route path="/edit/:id" element={<EditQuestionnaire />} />
            <Route path="/statistics/:id" element={<Statistics />} />
          </Routes>
        </AnimatePresence>
      </ContentContainer>
    </>
  );
}

export default App;
