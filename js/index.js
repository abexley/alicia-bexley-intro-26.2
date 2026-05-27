/**********************
 * FOOTER
 **********************/
const body = document.body;

const footer = document.createElement("footer");
body.appendChild(footer);

const footerSelect = document.querySelector("footer");

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.innerHTML = `&#169; Alicia Bexley ${thisYear}`;

footerSelect.appendChild(copyright);


/**********************
 * SKILLS SECTION
 **********************/
const skills = ["HTML", "CSS", "JavaScript", "GitHub"];

const skillsSection = document.querySelector("#skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

/**********************
 * MESSAGE FORM SECTION
 **********************/
const messageForm = document.forms["leave_message"];
const messageSection = document.querySelector("#messages");

function updateMessagesVisibility() {
  const messageList = messageSection.querySelector("ul");
  if (messageList.children.length === 0) {
    messageSection.style.display = "none";
  } else {
    messageSection.style.display = "block";
  }
}

// Hide messages section on page load 
updateMessagesVisibility();

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;
  console.log(name, email, message);

  const messageList = messageSection.querySelector("ul");

  // Create new list item
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> <span>${message}</span>`;

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.setAttribute("type", "button");
  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();
    updateMessagesVisibility();
  });

  // Edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.setAttribute("type", "button");
  editButton.addEventListener("click", function () {
    const entry = editButton.parentNode;
    const span = entry.querySelector("span");

    // If already editing, save and restore
    if (editButton.innerText === "save") {
      const input = entry.querySelector("input.edit-input");
      span.innerText = input.value;
      span.style.display = "inline";
      input.remove();
      editButton.innerText = "edit";
    } else {
      // Replace span with an input field
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("class", "edit-input");
      input.value = span.innerText;
      span.style.display = "none";
      entry.insertBefore(input, removeButton);
      editButton.innerText = "save";
      input.focus();
    }
  });

  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  updateMessagesVisibility();
  event.target.reset();
});