const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById(
  "resume-display"
) as HTMLDivElement;

const shareableLinkContainer = document.getElementById(
  "shareable-link-container"
) as HTMLDivElement;
const shareableLinkElement = document.getElementById(
  "shareable-link"
) as HTMLAnchorElement;
const downloadPdfButton = document.getElementById(
  "download-pdf"
) as HTMLButtonElement;
const editResumeButton = document.getElementById(
  "edit-resume"
) as HTMLButtonElement;
const imageInput = document.getElementById("image-input") as HTMLInputElement;
const imgDisplay = document.createElement("img");
imgDisplay.style.maxWidth = "170px";
imgDisplay.style.maxHeight = "170px";
imgDisplay.style.borderRadius = "50%";
imgDisplay.style.boxShadow = "0 14px 20px rgba(0, 0, 0, 0.1)";
imgDisplay.style.display = "none";

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const fullName = (document.getElementById("fullName") as HTMLInputElement)
    .value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (
    document.getElementById("education") as HTMLTextAreaElement
  ).value;
  const experience = (
    document.getElementById("experience") as HTMLTextAreaElement
  ).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement)
    .value;
  const resumeData = {
    fullName,
    email,
    phone,
    education,
    experience,
    skills,
    imageSrc: imgDisplay.src,
  };
  localStorage.setItem(username, JSON.stringify(resumeData));

  const resumeHTML = `
    <h2 class="resume-title">Profile Picture</h2>
    <div>${imgDisplay.outerHTML}</div> <!-- Insert the uploaded image here -->
    <h3 class="resume-section-title">Personal Information</h3>
    <p><b>Name:</b> <span class="resume-content">${fullName}</span></p>
    <p><b>Email:</b> <span class="resume-content">${email}</span></p>
    <p><b>Phone:</b> <span class="resume-content">${phone}</span></p>
    <h3 class="resume-section-title">Education</h3>
    <p><span class="resume-content">${education}</span></p>
    <h3 class="resume-section-title">Experience</h3>
    <p><span class="resume-content">${experience}</span></p>
    <h3 class="resume-section-title">Skills</h3>
    <p><span class="resume-content">${skills}</span></p>
    `;


  resumeDisplayElement.innerHTML = resumeHTML;
  resumeDisplayElement.style.display = "block";

  form.style.display = "none";

  const shareableURL = `${window.location.origin}?username=${encodeURIComponent(
    username
  )}`;

  shareableLinkContainer.style.display = "block";
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;

  editResumeButton.style.display = "block";
});

imageInput.addEventListener("change", (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imgDisplay.src = e.target!.result as string;
      imgDisplay.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

downloadPdfButton.addEventListener("click", () => {
  window.print();
});

editResumeButton.addEventListener("click", () => {
  form.style.display = "block";
  shareableLinkContainer.style.display = "none";

  resumeDisplayElement.innerHTML =
    '<h3 style="text-align: center; color: #fff;">Your Resume Will Be Shown Here!</h3>';
  resumeDisplayElement.style.display = "none";

  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const savedResumeData = localStorage.getItem(username);
  if (savedResumeData) {
    const resumeData = JSON.parse(savedResumeData);
    (document.getElementById("fullName") as HTMLInputElement).value =
      resumeData.fullName;
    (document.getElementById("email") as HTMLInputElement).value =
      resumeData.email;
    (document.getElementById("phone") as HTMLInputElement).value =
      resumeData.phone;
    (document.getElementById("education") as HTMLTextAreaElement).value =
      resumeData.education;
    (document.getElementById("experience") as HTMLTextAreaElement).value =
      resumeData.experience;
    (document.getElementById("skills") as HTMLTextAreaElement).value =
      resumeData.skills;

    if (resumeData.imageSrc) {
      imgDisplay.src = resumeData.imageSrc;
      imgDisplay.style.display = "block";
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username) {
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById("username") as HTMLInputElement).value =
        username;
      (document.getElementById("fullName") as HTMLInputElement).value =
        resumeData.fullName;
      (document.getElementById("email") as HTMLInputElement).value =
        resumeData.email;
      (document.getElementById("phone") as HTMLInputElement).value =
        resumeData.phone;
      (document.getElementById("education") as HTMLTextAreaElement).value =
        resumeData.education;
      (document.getElementById("experience") as HTMLTextAreaElement).value =
        resumeData.experience;
      (document.getElementById("skills") as HTMLTextAreaElement).value =
        resumeData.skills;

      if (resumeData.imageSrc) {
        imgDisplay.src = resumeData.imageSrc;
        imgDisplay.style.display = "block";
      }
    }
  }
});
