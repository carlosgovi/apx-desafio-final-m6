import { firestore, rtdb } from "./db";
import * as admin from "firebase-admin";
import * as express from "express";
//dejo de utilizar uuid y ahoar utilizamos nanoid
import { nanoid } from "nanoid";
//////////////////////
// console.log("variables::::", process.env);
/////////////
import * as cors from "cors";

//utilizo cors para supsanar un problema de corsss....¡?¡??¡?¡?

// utilizo nodemon para escuchar los cambios enla api mientras trabajo lo llamo con un escript desde yarn dev

//utilizo uuid para generar un id complejo para q no choqurn los id

//utilizo body parser para manejar el body ((de tal manera de poder recibir los datos q me pasan el el body y poder manipular esos datos ))
const port = 3000;
const app = express();
///con express.json puedo manejsr el body q recivo desde el front
app.use(express.json());
app.use(cors());
// // referencia a  la collection que quiero manipular datos en firestore
// const usersCollection = firestore.collection("users");

//////////////////////////////////////////////////////////////////////
// app.get("/users", function (req, res) {
//   res.json(["todos los usuarios"]);
// });
app.listen(port, () => {
  console.log(`
   ::::::Server corriendo:::::
     ENTORNO EN: ${process.env.ENVIROMENT}
   el el puerto http://localhost:${port}`);
});
//////////////////////////////////ENDPOINDS DE INICIO SIGN/////////////
///ENDPOINT  SINGUP dar de alta en la base de datos. don los datos pasados en el body de la request
const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");
const gamesCollection = firestore.collection("games");
app.post("/signup", (req, res) => {
  const nombre = req.body.nombre;
  console.log("request a signup ");
  console.log("valor reques nombre", nombre);

  userCollection
    .where("nombre", "==", nombre)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        userCollection.add({ nombre: nombre }).then((newUserRef) => {
          res.json({ id: newUserRef.id, new: true });
        });
      } else {
        userCollection
          .where("nombre", "==", nombre)
          .get()
          .then((searchResponse) => {
            if (!searchResponse.empty) {
              res.json({
                yaexisteId: searchResponse.docs[0].id,
                message: "user ya registrado",
              });
            }
          });
      }
    });
});

//ENDPOINT AUTH que autentifica el user con el mail del mismo
app.post("/auth", (req, res) => {
  // const email=req.body.email   optamos por contracciones en las constsantes
  const { nombre } = req.body;
  console.log("request a auth ");
  console.log(nombre);
  userCollection
    ///con el where busco si hay coinsidencias con el nombre
    .where("nombre", "==", nombre)
    //get optengo esa lista que contenga las coincidencias
    .get()
    .then((searchResponse) => {
      //si el user no esta creado devuelvo un not found
      //empty analiza si esta la respursta con un booleano
      if (searchResponse.empty) {
        res.status(404).json({ message: "not found" });
      } //si el user existe se responde con el id del primer user encontrado
      else {
        res.json({ id: searchResponse.docs[0].id });
      }
    });
});
/////////////////////ENDPOINTS PARA LOS ROOMS//////////
//crea room y devuelve un id simplificado
app.post("/rooms", (req, res) => {
  console.log("reques a rooms");
  const { fullName } = req.body;
  const { userId } = req.body;
  ///chequeo que exista el userid del body en la db
  console.log("userid", userId);

  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      console.log("si existe el user");

      ///si existe
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + nanoid());
        roomRef
          .set({
            [userId]: {
              userId: userId,
              fullName: fullName,
              choice: "",
              online: true,
              start: false,
            },
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999);
            roomsCollection
              .doc(roomId.toString())
              .set({ rtdbRoomId: roomLongId })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({ message: "no existe" });
      }
    });
});

//AGREGA EL NUEVO PLAYER AL ROOM  YA EXISTENTE
app.post("/agregarplayer", (req, res) => {
  console.log("reques a rooms");
  const { fullName } = req.body;
  const { rtdbRoomId } = req.body;
  const { userId } = req.body;
  ///chequeo que exista el userid del body en la db
  console.log("userid", userId);

  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      console.log("si existe el user");

      ///si existe
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + rtdbRoomId);
        roomRef
          .update({
            [userId]: {
              userId: userId,
              fullName: fullName,
              choice: "",
              online: true,
              start: false,
            },
          })
          .then(() => {
            res.json({
              message: "player agregado a la rtdb",
            });
          });
      } else {
        res.status(401).json({ message: "no existe el user" });
      }
    });
});
/////////////Crear LoS GAMES////////////////
app.post("/addgames", (req, res) => {
  const userIdUno = req.body.userIdUno;
  const userIdDos = req.body.userIdDos;
  console.log("request a addgames ");

  gamesCollection
    .where("userIdUno", "==", userIdUno)
    .where("userIdDos", "==", userIdDos)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        gamesCollection
          .add({
            userIdUno: userIdUno,
            userIdDos: userIdDos,
            [userIdUno]: 0,
            [userIdDos]: 0,
          })
          .then((newgamesRef) => {
            res.json({ newGameCreate: true });
          });
      } else {
        res.json({
          message: "no se a podifo crear el juego o ya hay uno creado",
        });
      }
    });
});
/////////////Crear LoS GAMES////////////////

//////////CAMBIAR DATOS DE SCORE///////////
////////CUANDO EL USERUNO GANA    score suma partidas ganadas al useruno
app.post("/winesgames", (req, res) => {
  const userIdUno = req.body.userIdUno;
  const userIdDos = req.body.userIdDos;
  console.log("request a winesgames ");
  const docsref = gamesCollection
    .where("userIdUno", "==", userIdUno)
    .where("userIdDos", "==", userIdDos)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        const docRef: any = snapshot.docs[0].ref;

        // Modifica el documento
        docRef.update({
          [userIdUno]: admin.firestore.FieldValue.increment(1),
        });

        // Envía una respuesta al cliente
        res
          .status(200)
          .send({ message: "score modificado se sumo uno al player1" });
      } else {
        // Si no se ha encontrado un documento, envía una respuesta de error
        res.status(400).send({ message: "No se ha encontrado el juego" });
      }
    });
});

//////// CUANDO EL USERUNO PIERDE score suma partidas ganadas al userdos
app.post("/overgames", (req, res) => {
  const userIdUno = req.body.userIdUno;
  const userIdDos = req.body.userIdDos;
  console.log("request a overgames ");
  const docsref = gamesCollection
    .where("userIdUno", "==", userIdUno)
    .where("userIdDos", "==", userIdDos)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        const docRef: any = snapshot.docs[0].ref;

        // Modifica el documento
        docRef.update({
          [userIdDos]: admin.firestore.FieldValue.increment(1),
        });

        // Envía una respuesta al cliente
        res
          .status(200)
          .send({ message: "score modificado se sumo uno al player2" });
      } else {
        // Si no se ha encontrado un documento, envía una respuesta de error
        res.status(400).send({ message: "No se ha encontrado el juego" });
      }
    });
});

/////////////post trigo los datos PRECISOS
app.post("/getgames", (req, res) => {
  console.log("request a getgames ");

  const userIdUno = req.body.userIdUno;
  const userIdDos = req.body.userIdDos;
  gamesCollection
    .where("userIdUno", "==", userIdUno)
    .where("userIdDos", "==", userIdDos)
    .get()
    .then((usersData) => {
      const docs = usersData.docs;
      const games = docs.map((doc) => {
        return doc.data();
      });
      res.status(200).send({
        ...games,
      });
    });
});

//CAMBIAR EL ESTADO DEL USER EN LA RTDB start:true

app.post("/cambiarestado", (req, res) => {
  console.log("reques a rooms");
  const { rtdbRoomId } = req.body;
  const { userId } = req.body;
  ///chequeo que exista el userid del body en la db
  console.log("userid", userId);

  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      console.log("si existe el user");

      ///si existe
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + rtdbRoomId + "/" + userId);
        roomRef
          .update({
            start: true,
          })
          .then(() => {
            res.json({
              message: "estado de player cambia a true en rtdb",
            });
          });
      } else {
        res.status(401).json({ message: "no existe el user" });
      }
    });
});

//CAMBIAR EL ESTADO DEL USER EN LA RTDB choice:"piedra,papel o tijera"

app.post("/changechoice", (req, res) => {
  console.log("reques a rooms");
  const { rtdbRoomId } = req.body;
  const { userId } = req.body;
  const { choice } = req.body;
  ///chequeo que exista el userid del body en la db
  console.log("userid", userId);

  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      console.log("si existe el user");

      ///si existe
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + rtdbRoomId + "/" + userId);
        roomRef
          .update({
            choice: choice,
          })
          .then(() => {
            res.json({
              message:
                "estado de player cambia a choice:" + choice + " en rtdb",
            });
          });
      } else {
        res.status(401).json({ message: "no existe el user" });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  ///extraigo de la  request una query que me envian en la URL ejemplo: http://localhost:300/rooms/1732?userid=lsjfañdsjfkdjsñjafljkflj
  const { userId } = req.query;
  //extraigo el roomid del URL que me mandan como params
  const { roomId } = req.params;
  console.log("userId resibido", userId);
  console.log("roomId resibida", roomId);

  ///busco en la bd el userid
  userCollection

    .doc(userId.toString())
    //me  traigo la respuesta y la trato
    .get()
    .then((doc) => {
      ///si existe el documento en la db
      if (doc.exists) {
        roomsCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data();

            res.json(data);
          });
      }
      ///si no existe en la db
      else {
        res.status(401).json({ message: "no existe" });
      }
    });
});
app.post("/messages", function (req, res) {
  const rtdbRoomId = req.body.rtdbRoomId;
  const chatRoomRef = rtdb.ref("/rooms/" + rtdbRoomId);
  console.log("lo q me pasan desde el cliente", req.body);

  chatRoomRef.push(req.body, function (err) {
    console.log(err);

    res.json("todo ok");
  });
});
///manejar las rutas q no estan declaradas
// app.use(express.static("dist"));

// app.get("*", (req, res) => {
//   // res.sendFile("../front/index.html");

// });
app.use(express.static("dist"));
const ROOT_PATH = __dirname.replace("src/back", "");
app.get("*", (req, res) => {
  res.sendFile(ROOT_PATH + "dist/index.html");
});
