const h3divs = require("./js/h3");
const generateTableOfContents = require("./js/anchor-nav");
const externallinks = require("./js/external");
const copycode = require("./js/copycode");
const buildtables = require("./js/tables");


h3divs();
generateTableOfContents();
externallinks();
copycode();
buildtables();