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
        const imagenSrc = require("/src/front/img/resultado-perdiste.png");

        img.src = imagenSrc;
        this.shadow.appendChild(img);
      }
    }
  );
}
