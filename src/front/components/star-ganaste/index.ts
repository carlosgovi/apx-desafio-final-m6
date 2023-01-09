export function initStarGanasteComp() {
  customElements.define(
    "star-ganaste",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const img: any = document.createElement("img");
        const imagenSrc = require("../../img/resultado-ganaste.svg");

        img.src = imagenSrc;
        this.shadow.appendChild(img);
      }
    }
  );
}
