import NotesView from "./notesView.js";
import NotesApi from "./notesApi.js";

export  default class App{
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root , this._handler())
        this._refreshNotes();
    }

    _refreshNotes(){
        const notes = NotesApi.getAllNotes();
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length>0);

        this.activeNote = notes[0];
        this.view.updateActiveNote(this.activeNote)
    }

    _handler(){
       return {
           onNoteAdd:() => {
               const newNote = {
                   title:"new title",
                   body: "new body"
               };
               NotesApi.saveNote(newNote);
               this._refreshNotes();
           },
           onNoteEdit:(newTitle , newBody) => {
               NotesApi.saveNote({
                   id: this.activeNote.id,
                   title: newTitle,
                   body: newBody
               })
               this._refreshNotes()
           },
           onNoteSelected:(noteId) => {
               const selectedNote = this.notes.find(n => n.id==noteId);
               this.activeNote = selectedNote;
               this.view.updateActiveNote(selectedNote);
           },
           onNoteDelete:(noteId) => {
               NotesApi.deleteNote(noteId);
               this._refreshNotes();
           }
       }
    }
}
