import { state } from "../../state";
import { Router } from "@vaadin/router";
export function initPageReglas() {
  class pagereglas extends HTMLElement {
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
      .conteiner{
               height: 100vh;
               display: grid;
               flex-direction: column;
               align-items: center;
             }
             .manos{
                 display:flex;
                 justify-content: center;
                 padding: 12vh 0 0 0;
             }
            .mano{
                 margin:0  20px;
               }
               .header{
                display:flex;
                justify-content: space-between;
                padding: 0 10%;
                padding-top: 5%;
                font-size: 160%;
                font-weight: bold;
                font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
               }
               .regla{display:flex;
                justify-content:center}
                 }
        `;
      div.innerHTML = ` 
      <div class="header" >
  
      <div >
              <div >
          
          </div >

          <div >
          
          </div >
     </div >
              <div  >
              Sala: ${state.getState().roomId || "el RoomID"}
              </div >

  </div >
      <div class="conteiner">
    
             <custom-text-welcome class="regla" classname="reglas" >
             Presioná jugar
       y elegí: piedra, papel o tijera antes de que pasen los 5 segundos.
             </custom-text-welcome>
             <custom-button class="botonEl" value="¡Jugar!" >
             </custom-button>
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

      function botonAction() {
        const botonEl = div.querySelector(".botonEl");
        botonEl?.addEventListener("click", (e) => {
          ////al precionasr jugar cambiamos el estado en la rtdb por true ...luego pasamos a page de espera "esperando que el oponente precione jugar"
          state.changeStatePlayer().then(() => {
            state.listenRoom();
            state.addGames();
            state.getGames()?.then(() => {
              Router.go("/esperaplayers");
            });
          });
        });
      }
      botonAction();
    }
  }
  customElements.define("page-reglas", pagereglas);
}
