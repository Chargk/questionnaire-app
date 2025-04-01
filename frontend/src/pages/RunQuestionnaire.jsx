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
import { QuestionariesService } from "../services/questionaries.service";
import { formatDuration } from "../utils/time";

const localStorageProgressKey = "questionnaire-progress";

const RunQuestionnairePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState(null);
  const [questionnaire, setQuestionnaire] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [formattedAnswers, setFormatterAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getProgressFromLocalStorage = () => {
      const progress = JSON.parse(
        localStorage.getItem(localStorageProgressKey)
      );

      if (progress?.id === id) {
        setCurrentStep(progress.currentStep);
        setAnswers(progress.answers);
        setStartTime(progress.startTime);

        return;
      }

      localStorage.removeItem(localStorageProgressKey);
    };

    QuestionariesService.getQuestionnaire(id).then((data) => {
      setQuestionnaire(data);
      setAnswers(new Array(data.questions.length).fill(""));
      setStartTime(Date.now());
      getProgressFromLocalStorage();
    });
  }, [id]);

  const handleChange = (value, isMultiple = false) => {
    const updated = [...answers];
    if (isMultiple) {
      updated[currentStep] = value;
    } else {
      updated[currentStep] = value;
    }
    setAnswers(updated);
  };

  const handleStepChange = (isNext) => {
    const nextStep = isNext ? currentStep + 1 : currentStep - 1;

    setCurrentStep(nextStep);
    localStorage.setItem(
      localStorageProgressKey,
      JSON.stringify({ id, answers, currentStep: nextStep, startTime })
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formattedAnswers = answers.map((answer, index) => {
        const question = questionnaire.questions[index];

        if (question.type === "single") {
          return question.options[answer];
        } else if (question.type === "multiple") {
          return answer.map((idx) => question.options[idx]).join(",");
        }

        return answer;
      });

      setFormatterAnswers(formattedAnswers);

      await QuestionariesService.submitAnswer(
        id,
        formattedAnswers,
        startTime,
        setFinishTime(Date.now())
      );

      setSubmitted(true);
      localStorage.removeItem(localStorageProgressKey);
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestionInput = (question) => {
    switch (question.type) {
      case "single":
        return (
          <div>
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                style={{ display: "block", margin: "10px 0" }}
              >
                <input
                  type="radio"
                  name={`question-${currentStep}`}
                  value={optionIndex}
                  checked={answers[currentStep] === optionIndex}
                  onChange={(e) => handleChange(Number(e.target.value))}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case "multiple":
        return (
          <div>
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                style={{ display: "block", margin: "10px 0" }}
              >
                <input
                  type="checkbox"
                  value={optionIndex}
                  checked={answers[currentStep]?.includes(optionIndex) || false}
                  onChange={(e) => {
                    const currentAnswers = answers[currentStep] || [];
                    const newAnswers = e.target.checked
                      ? [...currentAnswers, optionIndex]
                      : currentAnswers.filter((idx) => idx !== optionIndex);
                    handleChange(newAnswers, true);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return (
          <Input
            type="text"
            placeholder="Ваша відповідь"
            value={answers[currentStep] || ""}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
    }
  };

  if (!questionnaire) return <Container>Loading...</Container>;

  if (submitted) {
    return (
      <ThankYouScreen>
        <h2>Дякую за проходження! 🎉</h2>
        <Button onClick={() => navigate("/")}>На головну</Button>

        <h3>Час проходження: {formatDuration(finishTime - startTime)}</h3>
        <h3>Ваші відповіді: </h3>
        {questionnaire.questions.map((question, index) => (
          <React.Fragment key={question.id}>
            <h4>Запитання: {question.text}</h4>
            <span>
              Відповідь:{" "}
              {question.type === "multiple"
                ? formattedAnswers[index].split(",").join(", ")
                : formattedAnswers[index]}
            </span>
          </React.Fragment>
        ))}
      </ThankYouScreen>
    );
  }
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
            {renderQuestionInput(currentQuestion)}
          </QuestionBlock>

          <ButtonGroup>
            <Button
              disabled={currentStep === 0}
              onClick={() => handleStepChange()}
            >
              Назад
            </Button>

            {currentStep < questionnaire.questions.length - 1 ? (
              <Button
                disabled={
                  !answers[currentStep] &&
                  !Number.isInteger(answers[currentStep])
                }
                onClick={() => handleStepChange(true)}
              >
                Далі
              </Button>
            ) : (
              <SubmitButton
                disabled={!answers[currentStep] || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? <Spinner /> : "Надіслати"}
              </SubmitButton>
            )}
          </ButtonGroup>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default RunQuestionnairePage;
