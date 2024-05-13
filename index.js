// Notes Extension

// Default note settings
var defaultNoteSettings = {
  notes: [],
};

// Get note settings
var getNoteSetting = (settingName) => {
  if (localStorage.getItem(`note_${settingName}`) === null) {
    return defaultNoteSettings[settingName];
  }
  return JSON.parse(localStorage.getItem(`note_${settingName}`)) || "";
};

// Set note settings
var setNoteSetting = (settingName, value) => {
  localStorage.setItem(`note_${settingName}`, JSON.stringify(value));
};

// Create note HTML
var createNoteHTML = () => {
  const notes = getNoteSetting("notes");

  const notesHTML = notes
    .map(
      (note, index) => `
    <div class="note-item">
      <div class="note-content">${note}</div>
      <button class="delete-note-btn" data-index="${index}">Delete</button>
    </div>
  `
    )
    .join("");

  return `
    <div class="notes-container">
      <h2>Notes</h2>
      <div class="notes-list">${notesHTML}</div>
      <div class="add-note">
        <textarea id="note-input" placeholder="Enter a new note..."></textarea>
        <button id="add-note-btn">Add Note</button>
      </div>
    </div>
  `;
};

// Notes functionality
var notesTab = () => {
  const notesTabHTML = document.createElement("div");
  notesTabHTML.innerHTML = createNoteHTML();

  const addNoteBtn = notesTabHTML.querySelector("#add-note-btn");
  const noteInput = notesTabHTML.querySelector("#note-input");

  addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
      const notes = getNoteSetting("notes");
      notes.push(noteText);
      setNoteSetting("notes", notes);
      noteInput.value = "";
      location.reload();
    }
  });

  const deleteNoteBtns = notesTabHTML.querySelectorAll(".delete-note-btn");
  deleteNoteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const index = deleteBtn.getAttribute("data-index");
      const notes = getNoteSetting("notes");
      notes.splice(index, 1);
      setNoteSetting("notes", notes);
      location.reload();
    });
  });

  return notesTabHTML;
};

// Create Notes UI
var notesExtension = () => {
  Caido.navigation.addPage("/notes", {
    body: notesTab(),
  });

  Caido.sidebar.registerItem("Notes", "/notes", {
    icon: "fas fa-sticky-note",
    group: "Notes",
  });
};

notesExtension();
