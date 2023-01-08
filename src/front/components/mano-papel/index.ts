export function initPapelComp() {
  customElements.define(
    "mano-papel",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const img: any = document.createElement("img");

        const imagenSrc = require("/src/front/img/papel.png");

        img.src = imagenSrc;
        this.shadow.appendChild(img);
      }
    }
  );
}
