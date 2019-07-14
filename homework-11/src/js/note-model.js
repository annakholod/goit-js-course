import {PRIORITY_TYPES} from './utils/constants';

export class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    const note = this._notes.find(item => item.id === id);
  }

  saveNote(note) {
    this._notes.push(note);
  }

  deleteNote(id) {
    this._notes = this._notes.filter(item => item.id !== id);
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
    const notes = [];
    let queryLowerCase = query.toLowerCase();
    for (const note of this._notes) {
      let titleLowerCase = note.title.toLowerCase();
      let bodyLowerCase = note.body.toLowerCase();
      if (titleLowerCase.includes(queryLowerCase) || bodyLowerCase.includes(queryLowerCase)) {
        notes.push(note);
      }
    }
    return notes;
  }

  filterNotesByPriority(priority) {
    const notes = [];
    for (const note of this._notes) {
      if (note.priority === priority) {
        notes.push(note);
      }
    }
    return notes;
  }

  priorityDefault() {
    return PRIORITY_TYPES.LOW;
  }
}
