---
---
// set search
$(document).ready(function() {
  var filternavs = $(".filter-nav");

  filternavs.bind('click', function() {
      let ent = $(this),
        att = ent.attr("att") + "=",
        conts = ent.attr("cont").split(','),
        arr = conts.map(i => att + i).join("&").replace(/ /g,"+");

      //console.log(arr)
      sessionStorage.setItem('sciwbLastsearch', arr);
      window.location.href = "{{ '/workbooks/' | relative_url }}";
  })
});


function filterComp(e){
  search = e.value.toLowerCase();
  document.querySelectorAll('.fc, .fccat').forEach(function(row){
      text = row.getAttribute("datameta").toLowerCase();
      if(text.match(search)){
          row.classList.remove("fc-no-display");
      } else {
          row.classList.add("fc-no-display");
      }
  });
  componentCount = document.querySelectorAll('.fc:not(.fc-no-display):not(.no-display)').length;
  var word = (componentCount === 1) ? "component" : "components";
  document.getElementById("component-count").innerHTML = `<strong>${componentCount}</strong> ${word} found`
}