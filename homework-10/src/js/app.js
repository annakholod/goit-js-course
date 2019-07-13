import {NOTE_ACTIONS} from './utils/constants';
import Notepad from './notepad-model';
import initialNotes from '../assets/notes.json';
import {renderNoteList, addListItem, removeListItem} from './view';

const shortid = require('shortid');


const notepad = new Notepad(initialNotes);

const noteList = document.querySelector('.note-list');

renderNoteList(noteList, initialNotes);

// add note
const formNoteEditor = document.querySelector('.note-editor');
const noteTitle = formNoteEditor.querySelector(`[name='note_title']`);
const noteBody = formNoteEditor.querySelector(`[name='note_body']`);

const addNote = (evt) => {
  evt.preventDefault();
  if(noteTitle.value === '' || noteBody.value === '') {
    alert('Необходимо заполнить все поля!');
  } else {
    const note = {
      id: shortid.generate(),
      title: noteTitle.value,
      body: noteBody.value,
      priority: notepad.priorityDefault(),
    }
    notepad.saveNote(note);
    addListItem(noteList, note);

    formNoteEditor.reset();
  }
};

formNoteEditor.addEventListener('submit', addNote);

// delete note
const handleListClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;
  const action = target.parentNode.dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeListItem(target);
      break;
  }
};

noteList.addEventListener('click', handleListClick);

// serch
const serchFormInput = document.querySelector('.search-form__input');

const serchByQuery = () => {
  const filteredNotes = notepad.filterNotesByQuery(serchFormInput.value);
  noteList.innerHTML = '';
  renderNoteList(noteList, filteredNotes);
};

serchFormInput.addEventListener('input', serchByQuery);

export {notepad};
