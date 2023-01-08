import { state } from "../../../state";
import { Router } from "@vaadin/router";
export function initPageEmpate() {
  class pageempate extends HTMLElement {
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
      .title{
        font-size: 60px;
        margin:50px;
        color:grey
      }
     
     `;
      div.innerHTML = ` 
      <div class="conteiner">
      
        <div  class="title">
       Empataste
       
        </div>
        <div>
        <score-card>
        </score-card>
        </div>
        <div class="button">
        <custom-button class="botonEl" value="volver a jugar">
        </custom-button>
        </div>
      </d`;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);

      function botonAction() {
        const botonEl = div.querySelector(".botonEl");
        botonEl?.addEventListener("click", (e) => {
          // state.reiniciarState();
          state.reiniciarState();
          Router.go("/");
        });
      }

      botonAction();
    }
  }
  customElements.define("page-empate", pageempate);
}
