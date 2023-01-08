const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000"; //url del server
import { rtdb } from "./rtdb";
import map from "lodash/map";
import { Router } from "@vaadin/router";

const state = {
  //donde guardo los datos
  data: {
    score: {
      playerLocal: 0,
      playerRemoto: 0,
    },
    contrincanteChoice: "",
    contrincanteName: "",
    rtdbRoomId: "",
    userId: "",
    userIdContrincante: "",
    fullName: "",
    roomId: "",
    choices: "",
    fromServer: [],
  },
  //  listeners
  listeners: [],

  init() {
    if (window.localStorage.getItem("state")) {
      const local: any = window.localStorage.getItem("state");
      const localParseado = JSON.parse(local);
      console.log("localStorage:::::::", localParseado);
      this.setState(localParseado);
      /////////////////////////////////////////////////////////
      this.listenRoom();
    }
  },

  /////////////////////////////LISTENEROOM CHEQUEAR EL CAMBIO DE LOS PLAYERS
  listenRoom() {
    return new Promise<void>((resolve, reject) => {
      console.log("listenroom");
      // //guarfo en state anterior
      const currentState = this.getState();

      if (currentState.rtdbRoomId) {
        // //referencia para la rtdb
        const chatrooomsRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);
        chatrooomsRef.on("value", (snapshot) => {
          const messagesFromServer = snapshot.val();
          console.log(
            "snapshot  que retorna firebase rtdb:::::::listenRoom::::::::::::",
            messagesFromServer
          );
          ////con lodash hago un map de messageList
          const playerList = map(messagesFromServer);
          console.log("playerList::::::", playerList);
          currentState.fromServer = playerList;
          this.setState(currentState);
          console.log("desde el state::", this.getState());
          if (location.pathname == "/compcodigo") {
            this.connectedTwoPlayers();
            if (currentState.userIdContrincante) {
              this.getGames();
            }
          }
          //si los jugadores en su estado star es true van a la page play
          this.stateStartInTrue();
          ///proceso jugada del contrincante con cada listener
          this.processDateContrincante();
        });
      }

      resolve();
    });
  },

  processDateContrincante() {
    const currentState = state.getState();
    currentState.fromServer.map((item) => {
      console.log("log de los items", item);

      if (item.userId !== currentState.userId) {
        console.log("ENTRO al if de processDateContrincante");
        currentState.userIdContrincante = item.userId;
        currentState.contrincanteChoice = item.choice;
        currentState.contrincanteName = item.fullName;
        this.setState(currentState);
      }
    });
  },

  stateStartInTrue() {
    console.log(":::::::stateStartInTrue::::::::::");
    setTimeout(() => {
      const currenState = state.getState();
      if (
        location.pathname == "/esperaplayers" &&
        currenState.fromServer[0].start == true &&
        currenState.fromServer[1].start == true
      ) {
        Router.go("/play");
      }
    }, 2000);
  },

  connectedTwoPlayers() {
    const currenState = state.getState();
    if (currenState.fromServer.length == 2) {
      Router.go("/reglas");
    }
  },

  ///////////////////////////////////
  ///  tomo los datos
  getState() {
    return this.data;
  },
  /// seteo los datos pisando los anteriores
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
  },
  setNombre(newNombre) {
    console.log("setnombre");

    const currenState = this.getState();
    currenState.fullName = newNombre;
    this.setState(currenState);
  },

  addGames() {
    console.log("addGames");
    const currentState = this.getState();
    if (currentState.userId) {
      return fetch(API_BASE_URL + "/addgames", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userIdUno: currentState.userId,
          userIdDos: currentState.userIdContrincante,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch a ::addGames:::", data);
        });
    }
  },
  getGames() {
    console.log("getGames");
    const currentState = this.getState();
    const userId = currentState.userId;
    const userIdContrincante = currentState.userIdContrincante;
    if (userIdContrincante) {
      return fetch(API_BASE_URL + "/getgames", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userIdUno: currentState.userId,
          userIdDos: currentState.userIdContrincante,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch a ::getGames:::", data);
          const listGame = map(data);
          console.log(
            ":::::::::::::::::SCORE::::::::::::::::::",
            currentState.score
          );

          currentState.score.playerLocal = listGame[0][userId] || 0;
          currentState.score.playerRemoto =
            listGame[0][userIdContrincante] || 0;
          state.setState(currentState);
        });
    }
  },
  playerwin() {
    console.log("playerwin");
    const currentState = this.getState();
    if (currentState.userId && currentState.userIdContrincante) {
      return fetch(API_BASE_URL + "/winesgames", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userIdUno: currentState.userId,
          userIdDos: currentState.userIdContrincante,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch a ::playerwin:::", data);
        });
    }
  },
  playerover() {
    console.log("playerover");
    const currentState = this.getState();
    if (currentState.userId && currentState.userIdContrincante) {
      return fetch(API_BASE_URL + "/overgames", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userIdUno: currentState.userId,
          userIdDos: currentState.userIdContrincante,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch a ::playeover:::", data);
        });
    }
  },

  changeChoice() {
    console.log("changeChoice");
    const currentState = this.getState();
    if (currentState.rtdbRoomId) {
      return fetch(API_BASE_URL + "/changechoice", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: currentState.userId,
          rtdbRoomId: currentState.rtdbRoomId,
          choice: currentState.choices,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch a ::cambiar choice:::", data);
        });
    }
  },

  changeStatePlayer(): any {
    console.log("changeStatePlayer");
    const currentState = this.getState();
    if (currentState.rtdbRoomId) {
      return fetch(API_BASE_URL + "/cambiarestado", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: currentState.userId,
          rtdbRoomId: currentState.rtdbRoomId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch a ::cambiarestado", data);
        });
    }
  },

  addPlayerRoom(): any {
    console.log("agregarplayerRoom");
    const currentState = this.getState();
    if (currentState.rtdbRoomId) {
      return fetch(API_BASE_URL + "/agregarplayer", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: currentState.userId,
          rtdbRoomId: currentState.rtdbRoomId,
          fullName: currentState.fullName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch a ::agregarplayer", data);
        });
    }
  },

  accesToRoom(): any {
    console.log("accesstoroom");

    const currentState = this.getState();
    if (currentState.roomId) {
      const userId = currentState.userId;
      return fetch(
        API_BASE_URL + "/rooms/" + currentState.roomId + "?userId=" + userId,
        {
          ///al ser un fetch con el methodo get no nesecita q le pase los prametros del methos ni tampoco los headers ni tampoco va a enviar  el body
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch de accestoroom", data);
          currentState.rtdbRoomId = data.rtdbRoomId;
          this.setState(currentState);
        });
    } else {
      console.log("no hay roomID");
    }
  },

  createRoom(): any {
    console.log("createroom");

    const currentState = this.getState();
    if (currentState.userId) {
      return fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fullName: currentState.fullName,
          userId: currentState.userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("respuesta del fetch a rooms", data);
          currentState.roomId = data.id;
          this.setState(currentState);
          console.log("el estado ahora::", this.getState());
        });
    }
  },
  playGame(): any {
    console.log("playroom");

    const currentState = this.getState();
    if (currentState.fullName) {
      return fetch(API_BASE_URL + "/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nombre: currentState.fullName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.yaexisteId) {
            currentState.userId = data.yaexisteId;
            this.setState(currentState);
            console.log(
              "respuesta del fetch a signup pero existe el user ya",
              data
            );
            console.log("el estado ahora::", this.getState());
          }
          if (data.id) {
            currentState.userId = data.id;
            this.setState(currentState);
            console.log("respuesta del fetch a signup", data);
            console.log("el estado ahora::", this.getState());
          }
        });
    }
  },
  reiniciarState() {
    const currentState = state.getState();
    currentState.contrincanteChoice = "";
    currentState.contrincanteName = "";
    currentState.rtdbRoomId = "";
    currentState.userId = "";
    currentState.userIdContrincante = "";
    currentState.fullName = "";
    currentState.roomId = "";
    currentState.choices = "";
    currentState.fromServer = [];
    currentState.score.playerLocal = 0;
    currentState.score.playerRemoto = 0;
    state.setState(currentState);
  },
  ///manejador del state
  subscribe(callbacks: (any) => { any }) {
    this.listeners.push(callbacks);
  },
};

export { state };
