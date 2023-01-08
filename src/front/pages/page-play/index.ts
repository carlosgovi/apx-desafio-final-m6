import { state } from "../../state";
import { Router } from "@vaadin/router";
export function initPagePlay() {
  class pageplay extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();

      this.render();
    }

    render(): any {
      const div = document.createElement("div");

      //agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.innerHTML = `
      .conteiner{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .contador{
        margin-top:5px;
          display: flex;   
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height:30vh;
          width:30vh ;
        font-size:200px;
        border:20px solid;
        border-radius:100%;
      }
      .manos{
        height:45vh;
          display:flex;
          align-items: flex-end;   
          padding: 5vh 0 0 0;
             
      }
      .mano{
        margin:0  20px;
        
        
      }
      .selec_player {
        transform: scale(1.5,1.5);
          transition: all 0.5s;
          display:inline-flex;
          border-radius: 43px 42px 43px 43px;
          -moz-border-radius: 43px 42px 43px 43px;
          -webkit-border-radius: 43px 42px 43px 43px;
          border: 5px dashed #8ac1eb;
        }
        .selec_pc {
          transform: scale(1.5,1.5);
            transition: all 0.5s;
            display:inline-flex;
            border-radius: 43px 42px 43px 43px;
            -moz-border-radius: 43px 42px 43px 43px;
            -webkit-border-radius: 43px 42px 43px 43px;
            border: 5px dashed #eb8a97;
        }
        .selec_misma_opcion{
          transform: scale(1.5,1.5);
          transition: all 0.5s;
          display:inline-flex;
          background: rgba(52,185,247,1);
          background: -moz-linear-gradient(left, rgba(52,185,247,1) 0%, rgba(240,47,23,1) 54%, rgba(246,41,12,1) 54%, rgba(231,56,39,1) 100%);
          background: -webkit-gradient(left top, right top, color-stop(0%, rgba(52,185,247,1)), color-stop(54%, rgba(240,47,23,1)), color-stop(54%, rgba(246,41,12,1)), color-stop(100%, rgba(231,56,39,1)));
          background: -webkit-linear-gradient(left, rgba(52,185,247,1) 0%, rgba(240,47,23,1) 54%, rgba(246,41,12,1) 54%, rgba(231,56,39,1) 100%);
          background: -o-linear-gradient(left, rgba(52,185,247,1) 0%, rgba(240,47,23,1) 54%, rgba(246,41,12,1) 54%, rgba(231,56,39,1) 100%);
          background: -ms-linear-gradient(left, rgba(52,185,247,1) 0%, rgba(240,47,23,1) 54%, rgba(246,41,12,1) 54%, rgba(231,56,39,1) 100%);
          background: linear-gradient(to right, rgba(52,185,247,1) 0%, rgba(240,47,23,1) 54%, rgba(246,41,12,1) 54%, rgba(231,56,39,1) 100%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#34b9f7', endColorstr='#e73827', GradientType=1 );
        }
        .header{
          display:flex;
          justify-content: space-between;
          padding: 0 10%;
          padding-top: 5%;
          font-size: 140%;
          font-weight: bold;
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
         }
         .red{
          color:red
         }

      `;
      div.innerHTML = ` 
      <div class="conteiner">
      <div class="header" >
  
      <div >
              <div >
              ${state.getState().fullName || "localName"}: ${
        state.getState().score.playerLocal.toString() || "scoreLocal"
      }
          </div >

          <div class="red" >
          ${state.getState().contrincanteName || "Contrincante"}: ${
        state.getState().score.playerRemoto.toString() || "scoreRemoto"
      } 
          </div >
     </div >
              <div  >
              Sala: ${state.getState().roomId || "el RoomID"}
              </div >

  </div >
      <div class="contador">
      
      </div>
         
      <div class="manos">
      <div>
      <mano-piedra class="mano piedra">
      </mano-piedra >
      <mano-papel class="mano papel">
      </mano-papel>
      <mano-tijera class="mano tijera">
      </mano-tijera>
      </div>

      </div>
          `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);

      /////////////////////contador con intervalos
      let contador = 6;
      const intervalo: any = setInterval(() => {
        contador--;
        const contadorEl = div.querySelector(".contador") as any;
        contadorEl.textContent = String(contador);

        if (contador == -0) {
          clearInterval(intervalo);
        }
      }, 1000);

      // ////juego random
      // const computerSelec = () => {
      //   const randomMath = Math.floor(Math.random() * 3);
      //   const opciones = ["piedra", "papel", "tijera"];
      //   return opciones[randomMath];
      // };

      function selecChoice() {
        const piedraClick = function () {
          player = "piedra";
          const currenState = state.getState();
          currenState.choices = "piedra";
          state.setState(currenState);
          state.changeChoice();
          selecPiedra.classList.add("selec_player");
          /////prueba para sacar el listener de piedra
          selecPapel.removeEventListener("click", papelClick, false);
          selecTijera.removeEventListener("click", tijeraClick, false);
          ///retirar class para que no se pueda seguir seleccionando
          let Papel: any = div.querySelector(".papel");
          Papel.classList.remove("selec_player");
          let Tijera: any = div.querySelector(".tijera");
          Tijera.classList.remove("selec_player");
          ////
          ///render del selec pc
          state.subscribe((): any => {
            if (computadora == player) {
              selecPiedra.classList.add("selec_misma_opcion");
            }
            if (computadora == "papel") {
              selecPapel.classList.add("selec_pc");
              selecPapel.classList.remove("selec_misma_opcion");
            }
            if (computadora == "tijera") {
              selecTijera.classList.add("selec_pc");
              selecTijera.classList.remove("selec_misma_opcion");
            }
          });
        };
        const papelClick = function () {
          player = "papel";
          const currenState = state.getState();
          currenState.choices = "papel";
          state.setState(currenState);
          state.changeChoice();
          /////prueba para sacar el listener de piedra
          selecPiedra.removeEventListener("click", piedraClick, false);
          selecTijera.removeEventListener("click", tijeraClick, false);
          selecPapel.classList.add("selec_player");
          ///retirar class para que no se pueda seguir seleccionando
          let Piedra: any = div.querySelector(".piedra");
          Piedra.classList.remove("selec_player");
          let Tijera: any = div.querySelector(".tijera");
          Tijera.classList.remove("selec_player");
          ////
          ///render del selec pc
          state.subscribe((): any => {
            if (computadora == "piedra") {
              selecPiedra.classList.add("selec_pc");
              selecPiedra.classList.remove("selec_misma_opcion");
            }
            if (computadora == player) {
              selecPapel.classList.add("selec_misma_opcion");
            }
            if (computadora == "tijera") {
              selecTijera.classList.add("selec_pc");
              selecTijera.classList.remove("selec_misma_opcion");
            }
          });
        };
        const tijeraClick = function () {
          player = "tijera";
          const currenState = state.getState();
          currenState.choices = "tijera";
          state.setState(currenState);
          state.changeChoice();
          selecTijera.classList.add("selec_player");
          /////prueba para sacar el listener de piedra
          selecPapel.removeEventListener("click", papelClick, false);
          selecPiedra.removeEventListener("click", piedraClick, false);
          ///retirar class para que no se pueda seguir seleccionando
          let Papel: any = div.querySelector(".papel");
          Papel.classList.remove("selec_player");
          let Piedra: any = div.querySelector(".piedra");
          Piedra.classList.remove("selec_player");
          ////
          ///render del selec pc
          state.subscribe((): any => {
            if (computadora == "piedra") {
              selecPiedra.classList.add("selec_pc");
              selecPiedra.classList.remove("selec_misma_opcion");
            }
            if (computadora == "papel") {
              selecPapel.classList.add("selec_pc");
              selecPapel.classList.remove("selec_misma_opcion");
            }
            if (computadora == player) {
              selecTijera.classList.add("selec_misma_opcion");
            }
          });
        };

        ///////////SELECCION DE JUGADA////////////// listeners
        const selecPiedra: any = div.querySelector(".piedra");
        selecPiedra.addEventListener("click", piedraClick, false);
        //////////
        const selecPapel: any = div.querySelector(".papel");
        selecPapel.addEventListener("click", papelClick, false);
        ///////
        const selecTijera: any = div.querySelector(".tijera");
        selecTijera.addEventListener("click", tijeraClick, false);
      }
      selecChoice();
      ////////variables de juego
      let player;
      //////
      let computadora;

      state.subscribe((): any => {
        computadora = state.getState().contrincanteChoice;
        if (player && computadora) {
          compararSelecciones();
        }
      });
      const compararSelecciones = function () {
        ///////logica de los resultados
        setTimeout(() => {
          console.log("player::", player, "-pc::", computadora);
          ///////piedra
          if (player == "piedra" && computadora == "piedra") {
            console.log("empate");
            state.getGames()?.then(() => {
              Router.go("/empate");
            });
          }
          if (player == "piedra" && computadora == "tijera") {
            console.log("ganaste");
            player = false;
            state.playerwin()?.then(() => {
              state.getGames()?.then(() => {
                Router.go("/ganaste");
              });
            });
          }
          if (player == "piedra" && computadora == "papel") {
            console.log("perdiste");
            player = false;
            state.playerover()?.then(() => {
              state.getGames()?.then(() => {
                Router.go("/perdiste");
              });
            });
          }
          ///////papel
          if (player == "papel" && computadora == "papel") {
            console.log("empate");
            state.getGames()?.then(() => {
              Router.go("/empate");
            });
          }
          if (player == "papel" && computadora == "tijera") {
            console.log("perdiste");
            player = false;
            state.playerover()?.then(() => {
              state.getGames()?.then(() => {
                Router.go("/perdiste");
              });
            });
          }
          if (player == "papel" && computadora == "piedra") {
            console.log("ganaste");
            player = false;
            state.playerwin()?.then(() => {
              state.getGames()?.then(() => {
                Router.go("/ganaste");
              });
            });
          }
          /////////tijera
          if (player == "tijera" && computadora == "papel") {
            console.log("ganaste");
            player = false;
            state.playerwin()?.then(() => {
              state.getGames()?.then(() => {
                Router.go("/ganaste");
              });
            });
          }
          if (player == "tijera" && computadora == "piedra") {
            console.log("perdiste");
            player = false;
            state.playerover()?.then(() => {
              state.getGames()?.then(() => {
                Router.go("/perdiste");
              });
            });
          }
          if (player == "tijera" && computadora == "tijera") {
            console.log("empate");
            state.getGames()?.then(() => {
              Router.go("/empate");
            });
          }
        }, 3000);
      };
    }
  }
  customElements.define("page-play", pageplay);
}
