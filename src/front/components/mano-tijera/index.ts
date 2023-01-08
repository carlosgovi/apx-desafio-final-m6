export function initTijeraComp() {
  customElements.define(
    "mano-tijera",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
        this.render();
      }
      render() {
        const img: any = document.createElement("img");
        const imagenSrc = require("/src/front/img/tijera.png");
        /* img.setAttribute("src", "/src/img/tijera.png"); */

        img.src = imagenSrc;
        this.shadow.appendChild(img);
      }
    }
  );
}
