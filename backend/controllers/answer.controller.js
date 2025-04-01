const admin = require('firebase-admin');
const db = admin.firestore();

exports.submitAnswer = async (req, res) => {
  try {
    const questionnaireId = req.params.id
    const { answers, startTime, finishTime } = req.body;

    await db.collection("answers").add({
      questionnaireId,
      answers,
      startTime,
      finishTime,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const questionnaireRef = db.collection("questionnaires").doc(questionnaireId);
    await questionnaireRef.update({
      completions: admin.firestore.FieldValue.increment(1),
    });

    res.status(200).json({ message: "Answers submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving answers", error });
  }
}; 

exports.getAnswers = async (req, res) => {
  try {
    const questionnaireId = req.params.id;

    const answersSnapshot = await db
      .collection("answers")
      .where("questionnaireId", "==", questionnaireId)
      .get();

    const answers = answersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(answers);
  } catch (error) {
    console.error("Error getting answers:", error);
    res.status(500).json({ message: "Error fetching answers", error });
  }
}; 
