const components = require("./index");
const initwbComponents = () => {
  components
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initwbComponents, { once: true });
} else {
  initwbComponents();
}

exports.initwbComponents = initwbComponents;