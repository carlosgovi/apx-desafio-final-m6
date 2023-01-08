import { state } from "../../state";
import { Router } from "@vaadin/router";
export function initPageIngNombre() {
  class pagewelcome extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const div = document.createElement("div");

      //agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.innerHTML = `
        .contenedor{
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .manos{
            display:flex;
            justify-content: center;
            padding: 10vh 0 0 0;
        }
        .mano{
          margin:0  20px;
        }
        .input{
            width: 300px;
            height: 70px;
            border: 10px solid #001997;
            border-radius: 10px;
            font-size: 45px;
        }
        .button{
          
          color: white;
          width:322px ;
          height:87px ;
          font-size: 30px;
          background: #006CFC;
border: 10px solid #001997;
border-radius: 10px;

       }
        `;
      div.innerHTML = ` 
        <div class="contenedor">
        
          <custom-text-welcome classname="title">
          
                  
                  <div classname="title">
                  
                  Piedra
                  Papel ó
                  Tijera
                  
                  </div>
                  
          </custom-text-welcome>
          <form class="form">
          <div>
          
          <input class="input" placeholder="Tu Nombre" name="nombre" type="text">
          </div>
          <button class="button">Empezar</button>
          </form>
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
      function siYaTengoRooID() {
        const currentState = state.getState();
        if (currentState.roomId) {
          console.log("me enchufo al room ya existente que fue ingresado");

          state.playGame().then(() =>
            state.accesToRoom().then(() =>
              state.addPlayerRoom().then(() => {
                state.listenRoom();
                Router.go("/compcodigo");
              })
            )
          );
        } else {
          console.log("me enchufo a un room nuevo");

          state.playGame().then(() =>
            state.createRoom().then(() =>
              state.accesToRoom().then(() => {
                state.listenRoom();
                Router.go("/compcodigo");
              })
            )
          );
        }
      }
      function botonAction() {
        const formulario = div.querySelector(".form");
        formulario?.addEventListener("submit", (e: any) => {
          e.preventDefault();
          const inputNombre = e.target.nombre.value;
          console.log("valor del input::", inputNombre);
          state.setNombre(inputNombre);
          console.log("el STATE::", state.getState());
          siYaTengoRooID();
        });
      }
      ///1  state.playGame(),2 state.createRoom() 3 state.accesToRoom() 4 state.listenRoom()
      botonAction();

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("page-ing-nombre", pagewelcome);
}
