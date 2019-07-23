import {Notyf} from 'notyf';
import MicroModal from 'micromodal';
import {NOTIFICATION_MESSAGES, NOTE_ACTIONS} from './utils/constants';
import {Notepad} from './note-model';
import 'notyf/notyf.min.css';
import {noteList, addListItem, createListItemMarkup, localNotes} from './view';

const notyf = new Notyf();
const shortid = require('shortid');


const notepad = new Notepad();

const btnOpenModal = document.querySelector(`button[data-action='open-editor']`);
const formNoteEditor = document.querySelector('.note-editor');
const noteTitle = formNoteEditor.querySelector(`[name='note_title']`);
const noteBody = formNoteEditor.querySelector(`[name='note_body']`);
const serchFormInput = document.querySelector('.search-form__input');



// open modal
const showModal = () => {
  MicroModal.show('note-editor-modal');
};


const localNoteTitle = localStorage.getItem('title');
const localNoteBody = localStorage.getItem('body');

if(localNoteTitle) {
  noteTitle.value = localNoteTitle;
}
if(localNoteBody) {
  noteBody.value = localNoteBody;
}

const addToLocal = () => {
  localStorage.setItem('title', noteTitle.value);
  localStorage.setItem('body', noteBody.value);
};

// add note
const addNote = (evt) => {
  evt.preventDefault();
  if(noteTitle.value === '' || noteBody.value === '') {
    notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  } else {
    const note = {
      id: shortid.generate(),
      title: noteTitle.value,
      body: noteBody.value,
      priority: notepad.priorityDefault(),
    }
    notepad.saveNote(note).then(savedNote => addListItem(noteList, savedNote));
    notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
    localStorage.removeItem('title');
    localStorage.removeItem('body');
    formNoteEditor.reset();
    MicroModal.close('note-editor-modal');
  }
};

// delete note
const removeListItem = item => {
  const note = item.closest('.note-list__item');
  const noteId = note.dataset.id;
  notepad.deleteNote(noteId).then(notes => createListItemMarkup(notes));
  note.remove();
};

const handleListClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;
  const action = target.parentNode.dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeListItem(target);
      notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
      break;
  }
};

// serch
const serchByQuery = () => {
  const filteredNotes = notepad.filterNotesByQuery(serchFormInput.value);
  noteList.innerHTML = createListItemMarkup(filteredNotes);
};


btnOpenModal.addEventListener('click', showModal);
formNoteEditor.addEventListener('keyup', addToLocal);
formNoteEditor.addEventListener('submit', addNote);
noteList.addEventListener('click', handleListClick);
serchFormInput.addEventListener('input', serchByQuery);

export {localNotes};
