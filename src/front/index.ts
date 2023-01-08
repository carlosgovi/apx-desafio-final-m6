import { initButtonComp } from "./components/button";
import { initPapelComp } from "./components/mano-papel";
import { initPiedraComp } from "./components/mano-piedra";
import { initTijeraComp } from "./components/mano-tijera";
import { initScoreCardComp } from "./components/score-card";
import { initStarGanasteComp } from "./components/star-ganaste";
import { initStarPerdisteComp } from "./components/star-perdiste";
import { initTextWelcomComp } from "./components/text-welcome";
// import { initRouter } from "./routes";
//importo el router para que corra el router de vaadin
import "./router";
import { initPageWelcome } from "./pages/page-welcome";
import { initPageIngNombre } from "./pages/page-ingresar-nombre";
import { initPageIngCodigo } from "./pages/page-ingresar-codigo";
import { initPageCompCodigo } from "./pages/page-comp-codigo";
import { initPageReglas } from "./pages/page-reglas";
import { initPageEsperaJugar } from "./pages/page-espera-jugar";
import { initPagePlay } from "./pages/page-play";
import { initPageGanaste } from "./pages/page-resultado/page-ganaste";
import { initPagePerdiste } from "./pages/page-resultado/page-perdiste";
import { initPageEmpate } from "./pages/page-resultado/page-empate";
import { state } from "./state";
(function () {
  state.init();

  ///pages
  initPageWelcome();
  initPageIngNombre();
  initPageIngCodigo();
  initPageCompCodigo();
  initPageReglas();
  initPageEsperaJugar();
  initPagePlay();
  initPageGanaste();
  initPagePerdiste();
  initPageEmpate();
  // components
  initTextWelcomComp();
  initButtonComp();
  initTijeraComp();
  initPapelComp();
  initPiedraComp();
  initStarGanasteComp();
  initScoreCardComp();
  initStarPerdisteComp();
  // const root = document.querySelector(".root");
  // initRouter(root);
})();
