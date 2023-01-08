import { state } from "../../state";
import { Router } from "@vaadin/router";
export function initPageEsperaJugar() {
  class pageespera extends HTMLElement {
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
             Esperando a que ${
               state.getState().contrincanteName || "contrincanteName"
             } presione ¡jugar!
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
  customElements.define("page-espera-jugar", pageespera);
}
