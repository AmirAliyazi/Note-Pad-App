const notes = [
    {
        id:1,
        title:"first note",
        body:"note body 1",
        updated: "2023-06-29T18:51:22.452Z"
    },
    {
        id:2,
        title:"second note",
        body:"note body 2",
        updated: "2023-10-29T18:51:22.452Z"
    },
    {
        id:3,
        title:"third note",
        body:"note body 3",
        updated: "2023-04-29T18:51:22.452Z"
    }
];


 export default class NotesApi{

    static getAllNotes(){
        const saveNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
        // const saveNotes = notes || [];
        return saveNotes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        })
    }

    static saveNote(noteToSave){
        const notes = NotesApi.getAllNotes();
        const existedNote = notes.find(n => n.id==noteToSave.id);
        console.log(existedNote)
        if (existedNote){
            existedNote.title = noteToSave.title;
            existedNote.body = noteToSave.body;
            existedNote.updated = new Date().toISOString();
        }else {
            noteToSave.id = new Date().getTime();
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave)
        }
        localStorage.setItem("notes-app" , JSON.stringify(notes));
    }

    static deleteNote(id){
        const notes = NotesApi.getAllNotes();
        const filteredNotes = notes.filter(n => n.id!=id);
        localStorage.setItem("notes-app" , JSON.stringify(filteredNotes))
    }

}


