function externallinks(){
    var links = document.links;
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[ i ].hostname != window.location.hostname) {
        links[ i ].target = '_blank';
        links[ i ].className += ' usa-link--external';
        links[ i ].rel = "noreferrer";
      }
    }
}

module.exports = externallinks;