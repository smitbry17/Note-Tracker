const express = require("express");
const route = require("./Routes/api");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", route);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../Note-Tracker/public/notes.html"));
});

// All other routes respond with the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Note-Tracker/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
