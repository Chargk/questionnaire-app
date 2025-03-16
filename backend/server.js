const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");

dotenv.config();

const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/questionnaires", async (req, res) => {
  try {
    const snapshot = await db.collection("questionnaires").get();
    const questionnaires = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(questionnaires);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questionnaires", error });
  }
});

app.delete("/api/questionnaires/:id", async (req, res) => {
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
});

app.put("/api/questionnaires/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection("questionnaires").doc(id).update(updatedData);
    res.json({ message: "Questionnaire has been edited" });
  } catch (error) {
    res.status(500).json({
      message: "Error occured while trying to edit the questionnaire",
      error,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
