"use strict";

class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  };

  findNoteById(id) {
    for(const note of this._notes) {
      if(note.id === id) {
        return note;
      }
    }
  };

  saveNote(note) {
    this._notes.push(note);
  };

  deleteNote(id) {
    const note = this.findNoteById(id);
    if(!note) return;
    this._notes.splice(this._notes.indexOf(note), 1);
  };

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    const newNote = Object.assign(note, updatedContent);
    return newNote;
  };

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
    return note;
  };

  filterNotesByQuery(query) {
    const newNotepad = {
      notes: []
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
  };

  filterNotesByPriority(priority) {
    const newNotepad = {
      notes: []
    };
    for (const note of this._notes) {
      if (note.priority === priority) {
        newNotepad.notes.push(note);
      }
    }
    return newNotepad;
  };
}

module.exports = Notepad;
