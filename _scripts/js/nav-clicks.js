function sanitizeHash(hash) {
    // Only allow alphanumeric, underscore, and hyphen
    return hash.replace(/[^a-zA-Z0-9_-]/g, '');
}


function unhidenavButtons(){
        var hiddennavs = $("button.unhide-nav");

        hiddennavs.bind('click', function() {
            let ent = $(this),
              desthash = ent.attr("data-unhide"),
              desturl = ent.attr("data-navurl");
      
            //console.log(arr)
            sessionStorage.setItem('sciwbUnhidesection', desthash);
            window.location.href = desturl;
        });
}

function unhideSection(){
    if ('sciwbUnhidesection' in sessionStorage) {

        const fetchTarget = sessionStorage.getItem('sciwbUnhidesection');
        const targetID = sanitizeHash(fetchTarget);
        const unhideBtn = document.getElementById(targetID + "-accordbutton");
        if (unhideBtn) {
            setTimeout(function() {
                unhideBtn.click();
                unhideBtn.scrollIntoView({ behavior: 'smooth' });
            }, 100); // Small delay to ensure visibility
        }

        // clear sessionStorage
        sessionStorage.removeItem('sciwbUnhidesection');

    }

}

module.exports = { unhidenavButtons, unhideSection }; 