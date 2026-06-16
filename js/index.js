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
    console.log("Repositories:", repositories);

    /**********************
     * DISPLAY REPOSITORIES IN DOM
     **********************/

    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");

    // --- MANUAL FEATURED PROJECT (ARTIC) ---
const articProject = document.createElement("li");


    for (let i = 0; i < repositories.length; i++) {
      const repo = repositories[i];

      const listItem = document.createElement("li");
      listItem.textContent = repo.name;

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
const messageList = messageSection.querySelector("ul");

messageSection.style.display = "none";

messageForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh

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

  /**********************
 *  EDIT BUTTON     
 **********************/
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  editButton.addEventListener("click", function () {
    // Extract current values
    const currentName = usersName;
    const currentEmail = usersEmail;
    const currentMessage = usersMessage;

    
    const updatedMessage = prompt(
      "Edit your message:",
      currentMessage
    );

    if (updatedMessage !== null && updatedMessage.trim() !== "") {
      newMessage.querySelector("span").innerText = ` — ${updatedMessage}`;
    }
  });

  
  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);

  
  messageList.appendChild(newMessage);

  
  messageSection.style.display = "block";


  messageForm.reset();
});
