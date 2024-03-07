import { Elem1 } from "./components/Elem1.js";
import { Elem2 } from "./components/Elem2.js";
import { log } from "./utils/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const rootWrapper = document.getElementById("total-wrapper");
  rootWrapper.appendChild(Elem1).appendChild(Elem2);

  log(rootWrapper, "rootWrapper: ");
})