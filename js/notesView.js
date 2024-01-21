export default class NotesView{

    constructor(root,handler) {
        this.root = root;
        const {onNoteAdd , onNoteEdit , onNoteSelected , onNoteDelete} = handler;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteSelected = onNoteSelected;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `    <div class="note-sidebar">

        <div class="note--logo">Note Pad</div>
        <div class="note--list">
<!--            <div class="note&#45;&#45;list-item note&#45;&#45;list-item&#45;&#45;selected">-->
<!--                <div class="note&#45;&#45;small-title">New Note</div>-->
<!--                <div class="note&#45;&#45;small-body">My First Note...</div>-->
<!--                <div class="note&#45;&#45;small-updated">Sunday 8:10 PM</div>-->
<!--            </div>-->
        </div>
        <button class="note--add-btn">Add Note</button>

    </div>
    <div class="note-content">
        <input type="text" class="note--title" placeholder="note title...">
        <textarea name="" id="" class="note--body">your body...</textarea>
    </div>`;

        const noteAddBtn = this.root.querySelector(".note--add-btn"),
              inputTitle = this.root.querySelector(".note--title"),
              inputBody = this.root.querySelector(".note--body");


        noteAddBtn.addEventListener("click" , () => {
            this.onNoteAdd();
        });

        [inputTitle , inputBody].forEach(inputFeild => {
            inputFeild.addEventListener("blur" , () => {
                const newTitle = inputTitle.value.trim();
                const newBody = inputBody.value.trim();
                this.onNoteEdit(newTitle , newBody)
            })
        })

        this.updateNotePreviewVisibility(false)
    }

    _createListItem(id,title,body,updated){

        const MAX_BODY_LENGTH = 50;

        return `<div class="note--list-item" data-id="${id}">
                <div class="note--item-header">
                    <div class="note--small-title">${title}</div>
                    <span data-id="${id}" class="note--list-trash">
                        <i class="bi bi-trash-fill"></i>
                    </span>
                </div>
                <div class="note--small-body">
                    ${body.substring(0 , MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="note--small-updated">
                    ${new Date(updated).toLocaleString("en" , {dateStyle:"full" , timeStyle:"short"})}
                </div>
            </div>`;
    }

    updateNoteList(notes){
        const noteContainer = this.root.querySelector(".note--list");
        noteContainer.innerHTML = "";

        let noteList = "";

        for (const note of notes){
            const {id,title,body,updated} = note;
            const html = this._createListItem(id,title,body,updated);
            noteList += html;
        }
        noteContainer.innerHTML = noteList;

        noteContainer.querySelectorAll(".note--list-item").forEach(noteItem => {
            noteItem.addEventListener("click" , () => {
                this.onNoteSelected(noteItem.dataset.id);
            })
        })

        noteContainer.querySelectorAll(".note--list-trash").forEach(noteItem => {
            noteItem.addEventListener("click" , (e) => {
                e.stopPropagation();
                this.onNoteDelete(noteItem.dataset.id);
            })
        })
    }

    updateActiveNote(note){
        this.root.querySelector(".note--title").value = note.title;
        this.root.querySelector(".note--body").value = note.body;
        this.root.querySelectorAll(".note--list-item").forEach(item => {
            item.classList.remove("note--list-item--selected")
        })
        this.root.querySelector(`.note--list-item[data-id="${note.id}"]`).classList.add("note--list-item--selected");
    }

    updateNotePreviewVisibility(visible){
        this.root.querySelector(".note-content").style.visibility = visible ? "visible" : "hidden";
    }
}