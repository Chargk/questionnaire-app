import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import QuestionnairesPage from "./pages/questionaries-page/QuestionnairesPage";
import QuestionnaireBuilder from "./pages/QuestionnaireBuilder";
import RunQuestionnaire from "./pages/RunQuestionnaire";
import { AnimatePresence, motion } from "framer-motion";
import Header, { ContentContainer } from "./components/Header";
import Statistics from "./pages/statistics/StatisticsPage";

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
                  <QuestionnairesPage />
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
            <Route path="/edit/:id" element={<QuestionnaireBuilder />} />
            <Route path="/statistics/:id" element={<Statistics />} />
          </Routes>
        </AnimatePresence>
      </ContentContainer>
    </>
  );
}

export default App;
