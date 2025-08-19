function sanitizeHash(hash) {
    // Only allow alphanumeric, underscore, and hyphen
    return hash.replace(/[^a-zA-Z0-9_-]/g, '');
}
function sanitizePath(hash) {
    // Only allow expected paths through
    let cleanhash = hash.replace(/[^a-zA-Z0-9_/.-]/g, ''),
        cleanpath = "/";
    if (cleanhash[ 0 ] === "/" || cleanhash[ 0 ] === "."){
        cleanpath = cleanhash;
    }
    return cleanpath;
}


function unhidenavButtons(){
        var hiddennavs = $("button.unhide-nav");

        hiddennavs.bind('click', function() {
            let ent = $(this),
              hashfetch = ent.attr("data-unhide"),
              destfetch = ent.attr("data-navurl"),
              desthash = sanitizeHash(hashfetch),
              desturl = sanitizePath(destfetch);
      
            sessionStorage.setItem('sciwbUnhidesection', desthash);
            window.location.href = desturl + '#' + desthash;
        });

        var localhiddennavs = $("button.unhide-local-nav");

        localhiddennavs.bind('click', function() {
            let ent = $(this),
              desthash = ent.attr("data-unhide");
              accordionHandler(desthash);
        });
}

function unhideSection(){
    if ('sciwbUnhidesection' in sessionStorage) {

        const fetchTarget = sessionStorage.getItem('sciwbUnhidesection');
        accordionHandler(fetchTarget);
        // clear sessionStorage
        sessionStorage.removeItem('sciwbUnhidesection');

    }

}

function accordionHandler(fetchTarget){
    const targetID = sanitizeHash(fetchTarget);
    const unhideBtn = document.getElementById(targetID + "-accordbutton");
    if (unhideBtn) {
        setTimeout(function() {
            unhideBtn.click();
            unhideBtn.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure visibility
    }
}

module.exports = { unhidenavButtons, unhideSection }; 