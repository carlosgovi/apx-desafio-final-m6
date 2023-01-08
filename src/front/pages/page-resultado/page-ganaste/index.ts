import { state } from "../../../state";
import { Router } from "@vaadin/router";
export function initPageGanaste() {
  class pageganaste extends HTMLElement {
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
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .star{
        margin-top:20px
      }
      .button{
        margin-top:20px;
      }
     
      `;
      div.innerHTML = ` 
      <div class="conteiner">
      
        <div  class="star">
       <star-ganaste>
       <star-ganaste/>
        </div>
        <div>
        <score-card>
        </score-card>
        </div>
        <div class="button">
        <custom-button class="botonEl" value="volver a jugar">
        </custom-button>
        </div>
      </div>
         `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);

      function botonAction() {
        const botonEl = div.querySelector(".botonEl");
        botonEl?.addEventListener("click", (e) => {
          state.reiniciarState();
          Router.go("/");
        });
      }

      botonAction();
    }
  }
  customElements.define("page-ganaste", pageganaste);
}
