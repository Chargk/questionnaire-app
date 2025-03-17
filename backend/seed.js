const admin = require("firebase-admin");

const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const questionnaireData = {
  name: "Test Questionnaire",
  description: "A test questionnaire",
  completions: 10,
  questionsCount: 3,
  questions: [
    { id: "q1", text: "What is your name?", type: "text" },
    {
      id: "q2",
      text: "What is your favorite color?",
      type: "single",
      options: ["Red", "Blue", "Green"],
    },
    {
      id: "q3",
      text: "Which animals do you like?",
      type: "multiple",
      options: ["Dog", "Cat", "Rabbit"],
    },
  ],
};

async function seedDatabase() {
  try {
    const docRef = db.collection("questionnaires").doc(questionnaireData.name);
    await docRef.set(questionnaireData);
    console.log("Questionnaire added successfully!");
  } catch (error) {
    console.error("Error adding questionnaire:", error);
  }
}

seedDatabase();
