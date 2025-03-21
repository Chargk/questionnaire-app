import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QuestionnaireCard from "./QuestionnaireCard";
import {
  Container,
  Title,
  Grid,
  Button,
} from "../styles/QuestionnaireCatalog.styles";
import DeleteNotification from "../styles/DeleteNotification";
import SuccessNotification from "../styles/SuccessNotification";
import ConfirmModal from "../styles/ConfirmModal";
import EditedNotification from "../styles/EditedNotification";
import { AnimatePresence, motion } from "framer-motion";

function QuestionnaireCatalog() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdited, setShowEdited] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

    if (location.state?.edited) {
      setShowEdited(true);
      setTimeout(() => {
        setShowEdited(false);
        navigate("/", { replace: true, state: {} });
      }, 3000);
    }
  }, [location.state, navigate]);

  const handleDeleteQuestionnaire = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/questionnaires/${id}`, {
        method: "DELETE",
      });
      setQuestionnaires((prev) => prev.filter((q) => q.id !== id));
      setShowDeleteNotification(true);
      setTimeout(() => setShowDeleteNotification(false), 3000);
    } catch (error) {
      console.error("Error occurred while deleting:", error);
    }
  };

  return (
    <Container>
      <Title>Questionnaire Catalog</Title>
      <Grid>
        <AnimatePresence>
          {questionnaires.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionnaireCard
                questionnaire={q}
                onRequestDelete={(id) => {
                  setPendingDeleteId(id);
                  setShowConfirm(true);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
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
      <EditedNotification
        show={showEdited}
        message="Questionnaire edited successfully!"
      />
      <DeleteNotification
        show={showDeleteNotification}
        message="Questionnaire deleted successfully!"
      />
      <ConfirmModal
        show={showConfirm}
        onConfirm={async () => {
          setLoadingDelete(true);
          await handleDeleteQuestionnaire(pendingDeleteId);
          setLoadingDelete(false);
          setShowConfirm(false);
          setPendingDeleteId(null);
        }}
        onCancel={() => {
          setShowConfirm(false);
          setPendingDeleteId(null);
        }}
      />
    </Container>
  );
}

export default QuestionnaireCatalog;
