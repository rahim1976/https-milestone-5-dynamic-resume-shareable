var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
var editResumeButton = document.getElementById("edit-resume");
var imageInput = document.getElementById("image-input");
var imgDisplay = document.createElement("img");
imgDisplay.style.maxWidth = "170px";
imgDisplay.style.maxHeight = "170px";
imgDisplay.style.borderRadius = "50%";
imgDisplay.style.boxShadow = "0 14px 20px rgba(0, 0, 0, 0.1)";
imgDisplay.style.display = "none";
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username")
        .value;
    var fullName = document.getElementById("fullName")
        .value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills")
        .value;
    var resumeData = {
        fullName: fullName,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
        imageSrc: imgDisplay.src,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    var resumeHTML = "\n    <h2 class=\"resume-title\">Profile Picture</h2>\n    <div>".concat(imgDisplay.outerHTML, "</div> <!-- Insert the uploaded image here -->\n    <h3 class=\"resume-section-title\">Personal Information</h3>\n    <p><b>Name:</b> <span class=\"resume-content\">").concat(fullName, "</span></p>\n    <p><b>Email:</b> <span class=\"resume-content\">").concat(email, "</span></p>\n    <p><b>Phone:</b> <span class=\"resume-content\">").concat(phone, "</span></p>\n    <h3 class=\"resume-section-title\">Education</h3>\n    <p><span class=\"resume-content\">").concat(education, "</span></p>\n    <h3 class=\"resume-section-title\">Experience</h3>\n    <p><span class=\"resume-content\">").concat(experience, "</span></p>\n    <h3 class=\"resume-section-title\">Skills</h3>\n    <p><span class=\"resume-content\">").concat(skills, "</span></p>\n    ");
    resumeDisplayElement.innerHTML = resumeHTML;
    resumeDisplayElement.style.display = "block";
    form.style.display = "none";
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
    editResumeButton.style.display = "block";
});
imageInput.addEventListener("change", function (event) {
    var _a;
    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgDisplay.src = e.target.result;
            imgDisplay.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});
downloadPdfButton.addEventListener("click", function () {
    window.print();
});
editResumeButton.addEventListener("click", function () {
    form.style.display = "block";
    shareableLinkContainer.style.display = "none";
    resumeDisplayElement.innerHTML =
        '<h3 style="text-align: center; color: #fff;">Your Resume Will Be Shown Here!</h3>';
    resumeDisplayElement.style.display = "none";
    var username = document.getElementById("username")
        .value;
    var savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
        var resumeData = JSON.parse(savedResumeData);
        document.getElementById("fullName").value =
            resumeData.fullName;
        document.getElementById("email").value =
            resumeData.email;
        document.getElementById("phone").value =
            resumeData.phone;
        document.getElementById("education").value =
            resumeData.education;
        document.getElementById("experience").value =
            resumeData.experience;
        document.getElementById("skills").value =
            resumeData.skills;
        if (resumeData.imageSrc) {
            imgDisplay.src = resumeData.imageSrc;
            imgDisplay.style.display = "block";
        }
    }
});
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value =
                username;
            document.getElementById("fullName").value =
                resumeData.fullName;
            document.getElementById("email").value =
                resumeData.email;
            document.getElementById("phone").value =
                resumeData.phone;
            document.getElementById("education").value =
                resumeData.education;
            document.getElementById("experience").value =
                resumeData.experience;
            document.getElementById("skills").value =
                resumeData.skills;
            if (resumeData.imageSrc) {
                imgDisplay.src = resumeData.imageSrc;
                imgDisplay.style.display = "block";
            }
        }
    }
});
