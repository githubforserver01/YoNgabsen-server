const { credential } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const stringify = require("./stringify");
const admin = require("firebase-admin");

// DEFAULT APP CONFIGURATION
const serviceAccountYoNgabsen = require("../cert/firebase/firebaseyongabsen.json"); // service account private key for default app
initializeApp({
  projectId: "yongabsen",
  credential: credential.cert(serviceAccountYoNgabsen),
}); // Initialize for default app
const yoNgabsenMessaging = getMessaging(); // get messaging instance for default app

// SECOND APP CONFIGURATION
const serviceAccountYoNgabsenAdmin = require("../cert/firebase/firebaseyongabsenadmin.json"); // service account private key for second app
const yoNgabsenAdminConnector = initializeApp(
  {
    projectId: "yongabsenadmin",
    credential: credential.cert(serviceAccountYoNgabsenAdmin),
  },
  "yongabsenadmin"
); // initialize for second app
const yoNgabsenAdminMessaging = getMessaging(yoNgabsenAdminConnector); // get messaging instance for second app

function yoNgabsen_sendMessage(message) {
  return yoNgabsenMessaging.send(message);
}

function yoNgabsen_sendMessageToDevice(tokenFcm, payload) {
  return yoNgabsenMessaging.sendToDevice(tokenFcm, payload);
}

function yoNgabsenAdmin_sendMessage(message) {
  return yoNgabsenAdminMessaging.send(message);
}

function yoNgabsenAdmin_sendMessageToDevice(tokenFcm, payload) {
  return yoNgabsenAdminMessaging.sendToDevice(tokenFcm, payload);
}

module.exports = {
  yoNgabsen_sendMessage,
  yoNgabsen_sendMessageToDevice,
  yoNgabsenAdmin_sendMessage,
  yoNgabsenAdmin_sendMessageToDevice,
};
