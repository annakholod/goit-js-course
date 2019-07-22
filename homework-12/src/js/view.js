import noteTemplate from '../templates/note-template.hbs';

const createNoteMarkup = note => {
  return noteTemplate(note);
}

const createListItemMarkup = notes => {
  return notes.map(note => createNoteMarkup(note)).join('');
};

const noteList = document.querySelector('.note-list');

const localNotepadJSON = localStorage.getItem('notes');
const localNotes = JSON.parse(localNotepadJSON);
if(localNotes) {
  noteList.innerHTML = createListItemMarkup(localNotes);
}

// add note
const addListItem = (listRef, note) => {
  const newNote = createNoteMarkup(note);
  listRef.innerHTML += newNote;
};

export {noteList, addListItem, createListItemMarkup, localNotes};
