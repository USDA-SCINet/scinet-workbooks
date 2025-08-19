
function filterComp(e){
    search = e.value.toLowerCase();
    document.querySelectorAll('.fc, .fccat').forEach(function(row){
        text = row.getAttribute("datameta").toLowerCase();
        if(text.match(search)){
            row.classList.remove("fc-no-display");
            row.classList.add("fc-display");
        } else {
            row.classList.add("fc-no-display");
            row.classList.remove("fc-display");
        }
    });
    componentCount = document.querySelectorAll('.fc:not(.fc-no-display):not(.no-display)').length;
    var word = (componentCount === 1) ? "component" : "components";
    var ccount = document.getElementById("component-count");
    if (ccount){
      ccount.innerHTML = `<strong>${componentCount}</strong> ${word} found`;
    }
}

// set search
function searchNav() {

  let iconfilter = document.getElementById('icon-filter');
  if(iconfilter){
    iconfilter.addEventListener('keyup', function () {
      filterComp(this); 
    });
  }
  
  var filternavs = $(".filter-nav");

  filternavs.bind('click', function() {
      let ent = $(this),
        att = ent.attr("att") + "=",
        conts = ent.attr("cont").split(','),
        arr = conts.map(i => att + i).join("&").replace(/ /g,"+");

      //console.log(arr)
      sessionStorage.setItem('sciwbLastsearch', arr);
      window.location.href = "{{ '/workbooks/' | relative_url }}";
  });
}

module.exports = searchNav;