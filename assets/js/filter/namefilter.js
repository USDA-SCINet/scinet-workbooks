function filterComp(e){
    search = e.value.toLowerCase();
    document.querySelectorAll('.fc').forEach(function(row){
        text = row.getAttribute("datameta").toLowerCase();
        if(text.match(search)){
            row.classList.remove("fc-no-display");
        } else {
            row.classList.add("fc-no-display");
        }
    });
    filteredCount();
}

function filteredCount(){
    componentCount = document.querySelectorAll('.fc:not(.fc-no-display):not(.no-display)').length;
    var word = (componentCount === 1) ? "component" : "components";
    document.getElementById("component-count").innerHTML = `<strong>${componentCount}</strong> ${word} found`
}