export function initButtonComp() {
  class TextComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const value = this.getAttribute("value") || "button";
      //agrego estilos desde el componente con style
      const style = document.createElement("style");
      style.innerHTML = `
            .conteiner{
             display:flex;
             justify-content:center;
            aling-items:center
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
        <div class="conteiner">
        <input type="button" value="${value}" class="button"/>
          
          </div>`;
      ///el textcontent del this se lo paso al div q appendeo

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("custom-button", TextComponent);
}
