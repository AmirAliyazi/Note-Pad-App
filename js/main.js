import NotesApi from "./notesApi.js";
import NotesView from "./notesView.js";
import App from "./app.js";

const root = document.getElementById("app");
const app = new App(root)



view.updateNoteList(NotesApi.getAllNotes());
view.updateActiveNote(NotesApi.getAllNotes()[0]);