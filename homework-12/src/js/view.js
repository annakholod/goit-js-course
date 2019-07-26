import noteTemplate from '../templates/note-template.hbs';
import initialNotes from '../assets/notes.json';

const createNoteMarkup = note => {
  return noteTemplate(note);
}

const createListItemMarkup = notes => {
  return notes.map(note => createNoteMarkup(note)).join('');
};

const noteList = document.querySelector('.note-list');


const localNotes = JSON.parse(localStorage.getItem('notes'));
if(localNotes) {
  noteList.innerHTML = createListItemMarkup(localNotes);
} else {
  noteList.innerHTML = createListItemMarkup(initialNotes);
}


// add note
const addListItem = (listRef, note) => {
  const newNote = createNoteMarkup(note);
  listRef.innerHTML += newNote;
};

export {noteList, addListItem, createListItemMarkup};
