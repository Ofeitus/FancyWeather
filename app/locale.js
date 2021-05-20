const language_chooser = document.querySelector(".language-choice");

function setLocale() {
    console.log("changed");
    console.log(language_chooser.value);
}

language_chooser.addEventListener("change", setLocale);