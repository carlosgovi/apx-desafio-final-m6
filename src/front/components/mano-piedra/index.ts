export function initPiedraComp() {
  customElements.define(
    "mano-piedra",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const img: any = document.createElement("img");

        const imagenSrc: any = require("/src/front/img/piedra2.png");

        img.src = imagenSrc;
        this.shadow.appendChild(img);
      }
    }
  );
}
