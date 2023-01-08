import { Router } from "@vaadin/router";
import { state } from "../../state";

export function initPageIngCodigo() {
  class pageIngCode extends HTMLElement {
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
            <input class="input" placeholder="codigo" name="codigo" type="text">
            </div>
            <button class="button">Ingrezar a la sala</button>
            <div class="manos">
            <div>
            </form>
            <mano-piedra class="mano piedra">
            </mano-piedra >
            <mano-papel class="mano papel">
            </mano-papel>
            <mano-tijera class="mano tijera">
            </mano-tijera>
            </div>
          </div>
              `;

      function botonAction() {
        const form = div.querySelector(".form");

        form?.addEventListener("submit", (e: any) => {
          e.preventDefault();
          const numSala = e.target.codigo.value;
          const currenState = state.getState();
          currenState.roomId = numSala;
          state.setState(currenState);
          console.log("el STATE::", state.getState());
          Router.go("/ingnombre");
        });
      }

      botonAction();

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("page-ing-codigo", pageIngCode);
}
