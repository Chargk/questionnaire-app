import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuestionnaireCard from "./QuestionnaireCard";
import {
  Container,
  Title,
  Grid,
  Button,
  Notification,
} from "../styles/GlobalStyles";
import SuccessNotification from "../styles/SuccessNotification";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function QuestionnaireCatalog() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/questionnaires?page=${page}&limit=5`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionnaires(data?.questionnaires || data || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((error) => console.error("Error fetching questionnaires:", error));
  }, [page]);

  useEffect(() => {
    if (location.state?.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/", { replace: true, state: {} });
      }, 3000);
    }
  }, [location.state, navigate]);

  const deleteQuestionnaire = async (id) => {
    if (window.confirm("Are you sure you want to delete the questionnaire?")) {
      try {
        await fetch(`http://localhost:5000/api/questionnaires/${id}`, {
          method: "DELETE",
        });
        setQuestionnaires(questionnaires.filter((q) => q.id !== id));
      } catch (error) {
        console.error("Error occurred while deleting:", error);
      }
    }
  };

  return (
    <Container>
      <Title>Questionnaire Catalog</Title>
      <Grid>
        {questionnaires.length > 0 ? (
          questionnaires.map((q) => (
            <QuestionnaireCard
              key={q.id}
              questionnaire={q}
              onDelete={deleteQuestionnaire}
            />
          ))
        ) : (
          <p>Loading or no questionnaires available...</p>
        )}
      </Grid>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Back
        </Button>
        <span style={{ margin: "0 10px" }}>
          {page} / {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </Button>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/create-questionnaire">
          <Button>Create New Questionnaire</Button>
        </Link>
      </div>

      <SuccessNotification
        show={showSuccess}
        message="Questionnaire created successfully!"
      />
    </Container>
  );
}

export default QuestionnaireCatalog;
