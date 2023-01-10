export function initStarPerdisteComp() {
  customElements.define(
    "star-perdiste",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const img: any = document.createElement("img");
        const imagenSrc = require(__dirname +
          "../../img/resultado-perdiste.svg");

        img.src = imagenSrc;
        this.shadow.appendChild(img);
      }
    }
  );
}
