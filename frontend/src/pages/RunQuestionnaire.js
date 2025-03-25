import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Container,
  Title,
  QuestionBlock,
  QuestionText,
  Input,
  SubmitButton,
  Spinner,
  ButtonGroup,
  Button,
  ThankYouScreen,
} from "../styles/RunQuestionnaire.styles";

const RunQuestionnairePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/questionnaires/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestionnaire(data);
        setAnswers(new Array(data.questions.length).fill(""));
      });
  }, [id]);

  const handleChange = (value) => {
    const updated = [...answers];
    updated[currentStep] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch(`http://localhost:5000/api/questionnaires/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submit error", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!questionnaire) return <Container>Loading...</Container>;

  if (submitted)
    return (
      <ThankYouScreen>
        <h2>Спасибо за прохождение анкеты! 🎉</h2>
        <Button onClick={() => navigate("/")}>На главную</Button>
      </ThankYouScreen>
    );

  const currentQuestion = questionnaire.questions[currentStep];

  return (
    <Container>
      <Title>{questionnaire.name}</Title>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <QuestionBlock>
            <QuestionText>{currentQuestion.text}</QuestionText>
            <Input
              type="text"
              placeholder="Ваш ответ"
              value={answers[currentStep] || ""}
              onChange={(e) => handleChange(e.target.value)}
            />
          </QuestionBlock>

          <ButtonGroup>
            <Button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Назад
            </Button>

            {currentStep < questionnaire.questions.length - 1 ? (
              <Button
                disabled={!answers[currentStep]}
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Далее
              </Button>
            ) : (
              <SubmitButton
                disabled={!answers[currentStep] || submitting}
                onClick={handleSubmit}
              >
                {submitting ? <Spinner /> : "Отправить"}
              </SubmitButton>
            )}
          </ButtonGroup>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default RunQuestionnairePage;
