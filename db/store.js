const util = require("util");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

class Store {
  read() {
    return read("db/db.json", "utf8");
  }

  write(note) {
    return write("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
        console.log(parsedNotes);
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw Error("Title and Text boxes cannot be blank.");
    }
    const newNote = { title, text, id: uuidv4() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updateNotes) => this.write(updateNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
