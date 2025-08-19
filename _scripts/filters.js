const filterload = require("./js/filters");

const initFilter = () => {
  filterload();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFilter, { once: true });
} else {
    initFilter();
}