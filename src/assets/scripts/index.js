"use strict";

if ("serviceWorker" in navigator) {
  navigator
    .serviceWorker
    .register("/service-worker.js")
    .then(function() {
      console.log("ServiceWorker has been registered!");
    })
    .catch(console.error);
}

document.addEventListener("DOMContentLoaded", function(){

  // Persistent dark mode using local storage:
  // https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/

  // Select the button
  const btn = document.getElementById("dark-light-mode");
  // Check for dark mode preference at the OS level
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Get the user's theme preference from local storage, if it's available
  const currentTheme = localStorage.getItem("theme");
  // If the user's preference in localStorage is dark...
  if (currentTheme == "dark") {
    // ...let's toggle the .dark-theme class on the body
    document.body.classList.toggle("dark-theme");
  // Otherwise, if the user's preference in localStorage is light...
  } else if (currentTheme == "light") {
    // ...let's toggle the .light-theme class on the body
    document.body.classList.toggle("light-theme");
  }

  // Listen for a click on the button
  btn.addEventListener("click", function () {
    // If the user's OS setting is dark and matches our .dark-mode class...
    if (prefersDarkScheme.matches) {
      // ...then toggle the light mode class
      document.body.classList.toggle("light-theme");
      // ...but use .dark-mode if the .light-mode class is already on the body,
      var theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      // Otherwise, let's do the same thing, but for .dark-mode
      document.body.classList.toggle("dark-theme");
      var theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
    }
    // Finally, let's save the current preference to localStorage to keep using it
    localStorage.setItem("theme", theme);
  });

});
