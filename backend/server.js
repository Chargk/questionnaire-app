const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const questionnaireRoutes = require('./routes/questionnaires');
const answerRoutes = require('./routes/answers');

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/answers', answerRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
