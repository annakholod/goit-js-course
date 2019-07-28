import noteTemplate from '../templates/note-template.hbs';

const createNoteMarkup = note => {
  return noteTemplate(note);
}

const createListItemMarkup = notes => {
  return notes.map(note => createNoteMarkup(note)).join('');
};


// add note
const addListItem = (listRef, note) => {
  const newNote = createNoteMarkup(note);
  listRef.innerHTML += newNote;
};

export {addListItem, createListItemMarkup};
