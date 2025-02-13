import admin from "firebase-admin";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import { fileURLToPath } from "url";
import path from "path";

// Initialize Firebase Admin
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, "adminsdk.json"), "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const collectionName = "messages";
const outputCsv = "./docs/confessions.csv";

// Initialize CSV writer
const csvWriter = createObjectCsvWriter({
  path: outputCsv,
  header: [
    { id: "from", title: "Sender" },
    { id: "to", title: "Recipient" },
    { id: "message", title: "Message" },
  ],
});

async function exportToCSV() {
  try {
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map((doc) => ({
        ...doc.data()
    }));
    console.log(data)

    await csvWriter.writeRecords(data);
    console.log(`CSV file "${outputCsv}" created successfully!`);
  } catch (error) {
    console.error("Error exporting data:", error);
  }
}

exportToCSV();
