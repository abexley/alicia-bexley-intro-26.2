/**********************
 * FOOTER
 **********************/
const body = document.body;

const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.innerHTML = `&#169; Alicia Bexley ${thisYear}`;

footer.appendChild(copyright);


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