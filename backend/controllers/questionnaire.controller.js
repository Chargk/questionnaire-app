const admin = require('firebase-admin');
const db = admin.firestore();

exports.getAllQuestionnaires = async (req, res) => {
  try {
    const { limit = 5, page = 1 } = req.query;
    const pageSize = parseInt(limit);
    const pageNumber = parseInt(page);
    const offset = (pageNumber - 1) * pageSize;

    const query = db.collection("questionnaires").orderBy('name');
    
    // Get total count for pagination
    const totalSnapshot = await query.count().get();
    const total = totalSnapshot.data().count;

    const snapshot = await query
      .offset(offset)
      .limit(pageSize)
      .get();

    const questionnaires = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const totalPages = Math.ceil(total / pageSize);
    const hasMore = pageNumber < totalPages;

    res.json({
      questionnaires,
      hasMore,
      currentPage: pageNumber,
      totalPages,
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questionnaires", error });
  }
};

exports.createQuestionnaire = async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection("questionnaires").add(data);
    res.json({ message: "Questionnaire created", id: docRef.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating questionnaire", error });
  }
};

exports.getQuestionnaire = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("questionnaires").doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questionnaire", error });
  }
};

exports.updateQuestionnaire = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection("questionnaires").doc(id).update(updatedData);
    res.json({ message: "Questionnaire has been edited" });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while trying to edit the questionnaire",
      error,
    });
  }
};

exports.deleteQuestionnaire = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("questionnaires").doc(id).delete();
    res.json({ message: "Questionnaire is deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error while trying to delete the questionnaire",
      error,
    });
  }
};

exports.submitQuestionnaire = async (req, res) => {
  res.status(500).json({ message: "Not implemented yet" });
};

exports.getStatistics = async (req, res) => {
  try {
    const { id } = req.params;

    const questionnaireDoc = await db.collection("questionnaires").doc(id).get();
    if (!questionnaireDoc.exists) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    const questionnaire = questionnaireDoc.data();
    const questions =
      typeof questionnaire.questions === "string"
        ? JSON.parse(questionnaire.questions)
        : questionnaire.questions;

    const answersSnapshot = await db
      .collection("answers")
      .where("questionnaireId", "==", id)
      .get();

    const answersData = answersSnapshot.docs.map((doc) => doc.data().answers);

    const statistics = {};

    questions.forEach((q) => {
      const result = {};

      answersData.forEach((answer) => {
        const response = answer[q.id];

        if (q.type === "single" && response) {
          result[response] = (result[response] || 0) + 1;
        }

        if (q.type === "multiple" && Array.isArray(response)) {
          response.forEach((option) => {
            result[option] = (result[option] || 0) + 1;
          });
        }
      });

      statistics[q.id] = {
        text: q.text,
        type: q.type,
        results: result,
      };
    });

    res.json(statistics);
  } catch (error) {
    console.error("Error getting statistics:", error);
    res.status(500).json({ message: "Error getting statistics", error });
  }
}; 