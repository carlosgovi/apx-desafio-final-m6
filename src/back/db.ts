import * as admin from "firebase-admin";
// import * as serviceAccount from "./key.json";
///////////
// console.log("variables::::", process.env, typeof process.env);
////////////
///utilizo las variables de entorno y no uso mas el json
const variablesDeEntorno: any = process.env;
const firebaseConfig: any = {
  type: variablesDeEntorno.TYPE,
  project_id: variablesDeEntorno.PROJECT_ID,
  private_key_id: variablesDeEntorno.PRIVATE_KEY_ID,
  private_key: variablesDeEntorno.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: variablesDeEntorno.CLIENT_EMAIL,
  client_id: variablesDeEntorno.CLIENT_ID,
  auth_uri: variablesDeEntorno.AUTH_URI,
  token_uri: variablesDeEntorno.TOKEN_URI,
  auth_provider_X509_cert_url: variablesDeEntorno.AUTH_PROVIDER_X509_CERT_URL,
  client_X509_cert_url: variablesDeEntorno.CLIENT_X509_CERT_URL,
  enviroment: variablesDeEntorno.ENVIROMENT,
};
// console.log("objeto variables pasadas", typeof firebaseConfig, firebaseConfig);

// var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://rock-paper-scissors-e3521-default-rtdb.firebaseio.com",
});
//referencia a la bdreal time

const rtdb = admin.database();
//exporto el firestore para acceder a la bd
const firestore = admin.firestore();
export { firestore, rtdb };
