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
 *  GLOBAL VARIABLES    
 **********************/
const GITHUB_USERNAME = "abexley";
const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

/**********************
 *  FETCH REQUEST     
 **********************/
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })

/**********************
 *  PARSE JSON DATA     
 **********************/
  .then(repositories => {
   

    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      const repo = repositories[i];
      const listItem = document.createElement("li");
      const createdDate = new Date(repo.created_at);

      listItem.innerHTML = `
        <h3>
          <a href="${repo.html_url}" target="_blank">
            ${repo.name}
          </a>
        </h3>
        <p>
          ${repo.description || "No description available."}
        </p>
        <small>
          Created: ${createdDate.toLocaleDateString()}
        </small>
      `;

      projectList.appendChild(listItem);
    }
  })

/**********************
 *  ERROR HANDLING     
 **********************/
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);

    const projectsSection = document.querySelector("#projects");

    if (projectsSection) {
      projectsSection.innerHTML =
        "<p>Unable to load projects. Please try again later.</p>";
    }
  });

/**********************
 *  MESSAGE FORM    
 **********************/
const messageForm = document.forms["leave_message"];
const messageSection = document.getElementById("messages");
const messageList = document.getElementById("messages-list");

messageSection.style.display = "none";

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  const newMessage = document.createElement("li");
  newMessage.classList.add("message-item");

  newMessage.innerHTML = `
    <a href="mailto:${usersEmail}">${usersName}</a>
    <span> — ${usersMessage}</span>
  `;

  /**********************
   *  EDIT BUTTON     
   **********************/
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  editButton.addEventListener("click", function () {
    const messageSpan = newMessage.querySelector("span");
    const currentMessage = messageSpan.innerText.replace(" — ", "");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentMessage;
    editInput.style.margin = "0.5rem 0";
    editInput.style.padding = "6px";
    editInput.style.borderRadius = "6px";
    editInput.style.border = "1px solid #ccc";
    editInput.style.width = "100%";
    editInput.style.boxSizing = "border-box";

    const saveButton = document.createElement("button");
    saveButton.innerText = "save";
    saveButton.type = "button";
    saveButton.style.background = "#5cb85c";
    saveButton.style.color = "white";
    saveButton.style.border = "none";
    saveButton.style.padding = "6px 10px";
    saveButton.style.borderRadius = "6px";
    saveButton.style.cursor = "pointer";
    saveButton.style.marginTop = "0.5rem";

    messageSpan.replaceWith(editInput);
    editButton.style.display = "none";

    saveButton.addEventListener("click", function () {
      const updatedMessage = editInput.value.trim();

      if (updatedMessage !== "") {
        const newSpan = document.createElement("span");
        newSpan.innerText = ` — ${updatedMessage}`;
        editInput.replaceWith(newSpan);
        editButton.style.display = "inline-block";
        saveButton.remove();
      }
    });

    newMessage.appendChild(saveButton);
  });

  /**********************
   *  REMOVE BUTTON     
   **********************/
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();

    if (messageList.children.length === 0) {
      messageSection.style.display = "none";
    }
  });

  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);

  messageList.appendChild(newMessage);

  messageSection.style.display = "block";

  messageForm.reset();
});

/**********************
 * HAMBURGER MENU
 **********************/
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");

  if (navLinks.classList.contains("open")) {
    hamburger.textContent = "✕";
    hamburger.setAttribute("aria-label", "Close navigation menu");
  } else {
    hamburger.textContent = "☰";
    hamburger.setAttribute("aria-label", "Open navigation menu");
  }
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    hamburger.textContent = "☰";
    hamburger.setAttribute("aria-label", "Open navigation menu");
  });
});

/**********************
 * DARK MODE TOGGLE
 **********************/
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️ Light Mode";
  } else {
    darkModeToggle.textContent = "🌙 Dark Mode";
  }
});