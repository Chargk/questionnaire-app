import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QuestionnaireCard from "../QuestionnaireCard";
import {
  Container,
  Title,
  Grid,
  Button,
  SortSelect,
  SearchInput,
} from "../../styles/GlobalStyles";
import NotificationToaster from "./components/NotificationToaster";
import ConfirmDeletionModal from "./components/ConfirmDeletionModal";
import { AnimatePresence, motion } from "framer-motion";
import { QuestionariesService } from "../../services/questionaries.service";
import InfiniteScroll from "react-infinite-scroller";

function QuestionnairesPage() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [sortOption, setSortOption] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationData, setNotificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const loadQuestionnaires = async (pageNumber) => {
    try {    
      setIsLoading(true);
      const data = await QuestionariesService.getQuestionaries(pageNumber);
      const newQuestionnaires = data?.questionnaires || [];
      
      if (newQuestionnaires.length === 0) {
        setHasMore(false);
      } else {
        setQuestionnaires(prev => {
          const existingIds = new Set(prev.map(q => q.id));
          const uniqueNew = newQuestionnaires.filter(q => !existingIds.has(q.id));
          return [...prev, ...uniqueNew];
        });
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error("Error fetching questionnaires:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.success) {
      setNotificationData({msg: "Questionnaire created successfully"})
      setTimeout(() => {
        setNotificationData(null)
        navigate("/", { replace: true, state: {} });
      }, 3000);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    // Reset questionnaires when search term changes
    setQuestionnaires([]);
    setHasMore(!searchTerm);
  }, [searchTerm]);

  const handleDeleteQuestionnaire = async (id) => {
    try {
      await QuestionariesService.deleteQuestionary(id)

      setQuestionnaires((prev) => prev.filter((q) => q.id !== id));
      setNotificationData({ msg: "Questionnaire deleted successfully!", isError: true });
      setTimeout(() => setNotificationData(null), 3000);
    } catch (error) {
      console.error("Error occurred while deleting:", error);
    }
  };

  const handleDeleteConfirmation = async () => {
    await handleDeleteQuestionnaire(pendingDeleteId);
    setShowConfirm(false);
    setPendingDeleteId(null);
  }

  const handleLoadMore = (page) => {
    if (!searchTerm && hasMore && !isLoading) {
      loadQuestionnaires(page);
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

      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={hasMore && !searchTerm && !isLoading}
        loader={<div key={0} style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
      >
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
      </InfiniteScroll>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/create-questionnaire">
          <Button>Create New Questionnaire</Button>
        </Link>
      </div>

      <NotificationToaster
        show={notificationData}
        message={notificationData?.msg}
        isError={notificationData?.isError}
      />

      <ConfirmDeletionModal
        show={showConfirm}
        onConfirm={handleDeleteConfirmation}
        onCancel={() => {
          setShowConfirm(false);
          setPendingDeleteId(null);
        }}
      />
    </Container>
  );
}

export default QuestionnairesPage;
