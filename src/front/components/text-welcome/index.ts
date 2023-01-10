export function initTextWelcomComp() {
  class TextComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const div = document.createElement("div");
      //tomo atributo para manejar las classe
      const className = this.getAttribute("classname") || "class";
      //agrego estilos desde el componente con style
      const style = document.createElement("style");

      style.innerHTML = `
      
      .conteiner{
        display:flex;
        justify-content:center;
       aling-items:center
       }
       .title{
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        width:308px ;
           display:flex;
           justify-content:center;
           aling-items:center;
           text-align: center;
           color: #009048;
           color: rgba(29, 109, 79, 0.578);
            margin-top:30px;
            margin-bottom:30px;
            font-weight: 700;
            font-size: 70px;

          }
          .reglas{
            
            font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
            color: rgb(87, 87, 87);
            width:308px ;
            display:flex;
            justify-content:center;
            aling-items:center;
            text-align: center;
            margin-top:50px;
            margin-bottom:30px;
            
            font-weight: 600;
            font-size: 230%;
          }
      
       `;
      div.className = className;
      div.textContent = this.textContent;
      ///el textcontent del this se lo paso al div q appendeo

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("custom-text-welcome", TextComponent);
}
