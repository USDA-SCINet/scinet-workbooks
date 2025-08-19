const h3divs = require("./js/h3");
const generateTableOfContents = require("./js/anchor-nav");
const externallinks = require("./js/external");
const searchNav = require("./js/searchnav");
const { copycode } = require("./js/copycode");
const buildtables = require("./js/tables");
const { unhidenavButtons, unhideSection } = require("./js/nav-clicks");

h3divs();
generateTableOfContents();
externallinks();
searchNav();
copycode();
buildtables();
unhidenavButtons();
unhideSection();