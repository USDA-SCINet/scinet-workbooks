const generateTableOfContents = require("./js/anchor-nav");
const externallinks = require("./js/external");
const copycode = require("./js/copycode");
const buildtables = require("./js/tables");

generateTableOfContents();
externallinks();
copycode();
buildtables();