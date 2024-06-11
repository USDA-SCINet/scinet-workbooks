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
      sessionStorage.setItem('lastsearch', arr);
      window.location.href = "{{ '/workbooks/' | relative_url }}";
  })
});