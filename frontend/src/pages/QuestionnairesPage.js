import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QuestionnaireCard from "./QuestionnaireCard";
import {
  Container,
  Title,
  Grid,
  Button,
  PaginationButton,
  SortSelect,
  SearchInput,
} from "../styles/GlobalStyles";
import DeleteNotification from "../styles/DeleteNotification";
import SuccessNotification from "../styles/SuccessNotification";
import ConfirmModal from "../styles/ConfirmModal";
import { AnimatePresence, motion } from "framer-motion";

function QuestionnairesPage() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [sortOption, setSortOption] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredAndSortedQuestionnaires = questionnaires
    .filter((q) => q.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "questions")
        return (b.questions?.length || 0) - (a.questions?.length || 0);
      if (sortOption === "completions")
        return (b.completions || 0) - (a.completions || 0);
      return 0;
    });

  return (
    <Container>
      <Title>Questionnaire Catalog</Title>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <SearchInput
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SortSelect
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Sort by name (A-Z)</option>
          <option value="questions">Sort by questions count</option>
          <option value="completions">Sort by completions</option>
        </SortSelect>
      </div>

      <Grid>
        <AnimatePresence>
          {filteredAndSortedQuestionnaires.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionnaireCard
                id={q.id}
                title={q.name}
                description={q.description}
                questions={q.questions}
                completionCount={q.completions}
                onDelete={(id) => {
                  setPendingDeleteId(id);
                  setShowConfirm(true);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Grid>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <PaginationButton
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Back
        </PaginationButton>
        <span style={{ margin: "0 10px" }}>
          {page} / {totalPages}
        </span>
        <PaginationButton
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </PaginationButton>
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
      <DeleteNotification
        show={showDeleteNotification}
        message="Questionnaire deleted successfully!"
      />
      <ConfirmModal
        show={showConfirm}
        onConfirm={async () => {
          await handleDeleteQuestionnaire(pendingDeleteId);
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

export default QuestionnairesPage;
