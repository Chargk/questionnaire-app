const admin = require("firebase-admin");
const { faker } = require('@faker-js/faker');

const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Helper function to generate random questions
const generateQuestions = (count) => {
  const questionTypes = ["text", "single", "multiple"];
  const questions = [];

  for (let i = 0; i < count; i++) {
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const question = {
      id: `q${i + 1}`,
      text: faker.lorem.sentence().replace(".", "?"),
      type: type,
    };

    if (type !== "text") {
      const optionsCount = Math.floor(Math.random() * 3) + 3; // 3-5 options
      question.options = Array.from({ length: optionsCount }, () =>
        faker.word.noun()
      );
    }

    questions.push(question);
  }

  return questions;
};

// Generate questionnaire data
const generateQuestionnaires = (count) => {
  return Array.from({ length: count }, (_, index) => {
    const questionsCount = Math.floor(Math.random() * 11) + 5; // 5-15 questions
    const questions = generateQuestions(questionsCount);

    return {
      name: `${faker.word.adjective()} ${faker.word.noun()} Survey ${index + 1}`,
      description: faker.lorem.paragraph(),
      completions: Math.floor(Math.random() * 15), // 0-50 completions
      questions: questions,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
  });
};

// Generate answers for a questionnaire
const generateAnswers = (questionnaireId, questions, count) => {
  return Array.from({ length: count }, () => {
    const answers = [];
    const startTime = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 65); // Within 65 days
    const finishTime = startTime + Math.floor(Math.random() * 1000 * 60 * 30); // 0-30 minutes completion time

    questions.forEach((question) => {
      let answer;

      if (question.type === "text") {
        answer = faker.lorem.sentence();
      } else if (question.type === "single" || question.type === "multiple") {
        answer = question.options[Math.floor(Math.random() * question.options.length)];
      } else if (question.type === "multiple") {
        const selectedCount = Math.floor(Math.random() * question.options.length) + 1;
        const shuffled = [...question.options].sort(() => 0.5 - Math.random());
        answer = shuffled.slice(0, selectedCount).join(',');
      }

      answers.push(answer);
    });

    return {
      questionnaireId,
      answers,
      startTime,
      finishTime,
      createdAt: new Date(finishTime),
    };
  });
};

async function seedDatabase() {
  try {
    const questionnaires = generateQuestionnaires(15);
    
    for (const questionnaire of questionnaires) {
      const docRef = await db.collection("questionnaires").add(questionnaire);
      console.log(`Created questionnaire: ${questionnaire.name}`);

      // Generate random number of answers (1-15)
      const answersCount = Math.floor(Math.random() * 15) + 1;
      const answers = generateAnswers(docRef.id, questionnaire.questions, answersCount);
      
      for (const answer of answers) {
        await db.collection("answers").add(answer);
      }
      
      // Update the actual completions count
      await docRef.update({ completions: answersCount });
      console.log(`Created ${answersCount} answers for ${questionnaire.name}`);
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
}

seedDatabase();
