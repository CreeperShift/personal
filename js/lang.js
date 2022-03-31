const switchEN = document.getElementById("switchEN");
const switchDE = document.getElementById("switchDE");
const langElements = document.getElementsByClassName("lang");

let english = true;

let en;
let de;

function SwitchLang() {
  switchEN.addEventListener("click", (btn) => {
    if (!english) {
      SetEnglish();
    }
  });

  switchDE.addEventListener("click", (btn) => {
    if (english) {
      setGerman();
    }
  });
}

function SetEnglish() {
  setLanguage(en);
  english = true;
  switchEN.classList.add("active");
  switchDE.classList.remove("active");
  setCookie("lang", "en", 14);
}

function setGerman() {
  setLanguage(de);
  english = false;
  switchEN.classList.remove("active");
  switchDE.classList.add("active");
  setCookie("lang", "de", 14);
}

async function printJSON() {
  const responseEN = await fetch("lang/en.json");
  en = await responseEN.json();

  const responseDE = await fetch("lang/de.json");
  de = await responseDE.json();

  let cookie = getCookie("lang");

  if (cookie == "en") {
    SetEnglish();
  } else if (cookie == "de") {
    setGerman();
  } else {
    if (navigator.language != "de" && navigator.language != "de-DE") {
      SetEnglish();
    } else {
      setGerman();
    }
  }
}

function setLanguage(lang) {
  for (el of langElements) {
    el.innerText = lang[el.id];
  }
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/;samesite=strict";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

printJSON();
SwitchLang();
