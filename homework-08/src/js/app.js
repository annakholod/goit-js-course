'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) {
        return note;
      }
    }
  }

  saveNote(note) {
    this._notes.push(note);
  }

  deleteNote(id) {
    const note = this.findNoteById(id);
    if (!note) return;
    this._notes.splice(this._notes.indexOf(note), 1);
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    const newNote = Object.assign(note, updatedContent);
    return newNote;
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
  }

  filterNotesByQuery(query) {
    const newNotepad = {
      notes: [],
    };
    let queryLowerCase = query.toLowerCase();
    for (const note of this._notes) {
      let titleLowerCase = note.title.toLowerCase();
      let bodyLowerCase = note.body.toLowerCase();
      if (titleLowerCase.includes(query) || bodyLowerCase.includes(query)) {
        newNotepad.notes.push(note);
      }
    }
    return newNotepad;
  }

  filterNotesByPriority(priority) {
    const newNotepad = {
      notes: [],
    };
    for (const note of this._notes) {
      if (note.priority === priority) {
        newNotepad.notes.push(note);
      }
    }
    return newNotepad;
  }
}

const notepad = new Notepad(initialNotes);

const noteList = document.querySelector('.note-list');

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

  noteSectionPriority.append(createActionButton('DECREASE_PRIORITY', 'ARROW_DOWN'));
  noteSectionPriority.append(createActionButton('INCREASE_PRIORITY', 'ARROW_UP'));

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

renderNoteList(noteList, initialNotes);
