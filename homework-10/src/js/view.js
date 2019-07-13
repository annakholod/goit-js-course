import {ICON_TYPES, NOTE_ACTIONS} from './utils/constants';
import {notepad} from './app';

const createNoteContent = note => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = note.title;
  noteContent.append(noteTitle);

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = note.body;
  noteContent.append(noteBody);

  return noteContent;
};

const createActionButton = (dataAction, iconCont) => {
  const button = document.createElement('button');
  button.classList.add('action');
  button.dataset.action = NOTE_ACTIONS[dataAction];

  const icon = document.createElement('i');
  icon.classList.add('material-icons', 'action__icon');
  icon.textContent = ICON_TYPES[iconCont];
  button.append(icon);

  return button;
};

const createNoteFooter = note => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteSectionPriority = document.createElement('section');
  noteSectionPriority.classList.add('note__section');
  noteFooter.append(noteSectionPriority);

  noteSectionPriority.append(
    createActionButton('DECREASE_PRIORITY', 'ARROW_DOWN')
  );
  noteSectionPriority.append(
    createActionButton('INCREASE_PRIORITY', 'ARROW_UP')
  );

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${note.priority}`;
  noteSectionPriority.append(notePriority);

  const noteSectionChange = noteSectionPriority.cloneNode(false);
  noteFooter.append(noteSectionChange);

  noteSectionChange.append(createActionButton('EDIT', 'EDIT'));
  noteSectionChange.append(createActionButton('DELETE', 'DELETE'));

  return noteFooter;
};

const createListItem = note => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = note.id;

  const divNote = document.createElement('div');
  divNote.classList.add('note');
  listItem.append(divNote);

  divNote.append(createNoteContent(note));
  divNote.append(createNoteFooter(note));

  return listItem;
};

const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));
  listRef.append(...listItems);
};

const addListItem = (listRef, note) => {
  const newNote = createListItem(note);
  listRef.append(newNote);
};

const removeListItem = item => {
  const note = item.closest('.note-list__item');
  const noteId = note.dataset.id;
  notepad.deleteNote(noteId);
  note.remove();
};

export {renderNoteList, addListItem, removeListItem};
