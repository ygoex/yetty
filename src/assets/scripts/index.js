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
