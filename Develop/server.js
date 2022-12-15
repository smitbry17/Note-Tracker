const express = require("express");
const route = require("./Routes/api");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", route);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
