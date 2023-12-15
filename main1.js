let noteArea=document.querySelector(".note-area");
let noteText=document.querySelector(".note-text");
let title=document.querySelector(".title");
let note=document.querySelector(".note");
let notes =document.querySelector("#notes");

const showNoteArea= () =>{
    noteText.style='display: block';
    noteArea.classList.add('note-now');
    title.setAttribute('placeholder','Title');
    title.style='font-size: 20px';
}
const hideNoteArea=()=>{
    noteText.style='displat: none';
    noteArea.classList.remove('note-now')
}

const addNoteTolocalStorage=(note)=>{
    if (note.length <0) {
        return
        
    }
    let oldNote;
    if (localStorage.getItem("notes1")===null) {
        oldNote=[];
    }
    else{
        oldNote=JSON.parse(localStorage.getItem('notes1'));
    }
    oldNote.push(note);

    localStorage.setItem('notes1', JSON.stringify (oldNote));
}


const getNotesFromLocalStorage = ()=>{
    let oldNote;
    if (localStorage.getItem("notes1")===null) {
        oldNote=[];
    }
    else{
        oldNote=JSON.parse(localStorage.getItem('notes1'));
    }
    oldNote.forEach(note => {
        notes.innerHTML+=`
        <div class="note">
        <h3 class="title-text" id="title-text"> ${note[0]}</h3>
        <p class="note-blog">
        ${note[1]}
        </p>
        <i class="fa fa-trash "></i>
        <div class="note-now">
        </div>`

    });
}

const deleteFromLocalStorage = (deletedNote)=>{
    let oldNote;
    if (localStorage.getItem("notes1")===null) {
        oldNote=[];
    }
    else{
        oldNote=JSON.parse(localStorage.getItem('notes1'));
    }
    oldNote.map( (note, index) =>{
        if (note[0] == deletedNote.children[0].textContent.trim() && note[1] == deletedNote.children[1].textContent.trim()) 
        {
            oldNote.splice(index,1);
            return oldNote;
        }
    });
    localStorage.setItem('notes1', JSON.stringify(oldNote));

}


document.addEventListener("DOMContentLoaded" , getNotesFromLocalStorage);

const addNote=(t, n)=>{
    notes.innerHTML+=`
    <div class="note">
    <h3 class="title-text" id="title-text"> ${t}</h3>
    <p class="note-blog">
    ${n}
    </p>
    <i class="fa fa-trash "></i>
    <div class="note-now">
    </div>`

    title.value='';
    noteText.value='';
}



noteArea.addEventListener("click", showNoteArea);
document.addEventListener('click', (event)=>{
    let isclicked=noteArea.contains(event.target);
    if (!isclicked) {
        hideNoteArea();

        if (title.value.length===0 && noteText.value.length===0) {
            return;
            
        }
        else{
        addNoteTolocalStorage([title.value, noteText.value])
        addNote(title.value, noteText.value);
    }
        
    }
});
// mouseover
document.addEventListener("mouseover" , (event)=>{
    if (event.target.classList.contains("note")) {
        event.target.querySelector("i").classList.add('show');
        
    }
});

// mouseout
document.addEventListener("mouseout" , (event)=>{
    if (event.target.classList.contains("note")) {
        event.target.querySelector("i").classList.remove('show');
        
    }
});

document.addEventListener("click" , (event)=>{
    if (event.target.classList.contains("fa-trash")) {
        event.target.parentElement.remove();
        deleteFromLocalStorage(event.target.parentElement);
        
    }
});

// local storage: in aan istcmlno browserka storage kiisa
