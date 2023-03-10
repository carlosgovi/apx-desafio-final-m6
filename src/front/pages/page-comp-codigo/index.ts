import { state } from "../../state";
import { Router } from "@vaadin/router";
export function initPageCompCodigo() {
  class pagecompcodigo extends HTMLElement {
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
          display: grid;
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
       
       .header{
        display:flex;
        justify-content: space-between;
        padding: 0 10%;
        padding-top: 5%;
        font-size: 160%;
        font-weight: bold;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
       }
       .roomid{
        color: blue
       }
       .regla{display:flex;
      justify-content:center}
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
      <div class="contenedor">


          <custom-text-welcome class="regla" classname="reglas">

                  
                  <div >
                  
                  Compartir el codigo:
                  
                  </div>
                  <div>
                  
                  ${state.getState().roomId || "el RoomID"}
                  
                  </div>
                  <div >
                  
                  Con tu contrincante
                  </div>
                  
          </custom-text-welcome>
        
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
    }
  }

  customElements.define("page-comp-codigo", pagecompcodigo);
}
