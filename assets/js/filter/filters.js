---
---

const packaged = [{% include packages.js sect='workbooks' %}]

function submitFilters(form){
  $("#nowbs").addClass('no-display');
  // hide No Results Found message if showing

  // get form data
    var fdata = new FormData(form) 
    var formvalues = {}; // form values in array format
    var inclusive = []; // keys that have 'inclusive' data handling
    fdata.forEach((value, key) => {
      if (value !== "") {
        if(key.includes("inclusive")){
          inclusive.push(value);
        } else {
          if(key=='core-wbs' || key=='wbs'){
            var mykey = 'wbs'
            inclusive.push(value);
          } else {
            var mykey = key 
          }
            // Reflect.has in favor of: formvalues.hasOwnProperty(key)
  
          if(!Reflect.has(formvalues, mykey)){
            formvalues[mykey] = value;
            return;
          }
          if(!Array.isArray(formvalues[mykey])){
            formvalues[mykey] = [formvalues[mykey]];    
          }
          
          formvalues[mykey].push(value);
        }
      }
        
    });

    var formobject = Object.entries(formvalues);

    //check if formdata has a selction
    if(formobject.length === 0){
      $(".wb").removeClass('no-display');
    } else {
      filterWBs(formobject, inclusive)
    }

    return false
  }


  function filterWBs(formobject, inclusive){

    // refactor
    var obj1 = Object.fromEntries(formobject.filter(([k]) => inclusive.includes(k)));
    var obj2 = Object.fromEntries(formobject.filter(([k]) => !inclusive.includes(k)));

    var c_exclusive = (arr, target) => target.every(v => arr.includes(v));
    var c_inclusive = (arr, target) => target.some(v => arr.includes(v));

    var incConditions = search => a => Object.keys(search).every(k => 
      a[k] === search[k] ||
      Array.isArray(search[k]) && Array.isArray(a[k]) && c_inclusive(a[k], search[k]) ||
      Array.isArray(search[k]) && search[k].includes(a[k]) ||
      Array.isArray(a[k]) && a[k].includes(search[k])
    ),
    exclConditions = search => a => Object.keys(search).every(k => 
      a[k] === search[k] ||
      Array.isArray(search[k]) && Array.isArray(a[k]) && c_exclusive(a[k], search[k]) ||
      Array.isArray(search[k]) && search[k].includes(a[k]) ||
      Array.isArray(a[k]) && a[k].includes(search[k])
    );

    // filter by inclusive conditions
    var include = packaged.filter(incConditions(obj1));
    // filter by exclusive conditions
    var exclude = include.filter(exclConditions(obj2));

    // get ids of items that match the selected tutorials
    var idarray = exclude.flatMap(function (el) { return el.keeps; });

    // display error message if no workbooks found
    if(idarray.length===0){
      noWBsFound()
    } else {

      // hide all tutorials
      $(".wb").addClass('no-display');

      // display only selected tutorials
      idarray.forEach((divid) =>{
        var div = document.getElementById(divid);
        if(div) {
          div.classList.remove('no-display')
        }
      })
    }
  }


  function noWBsFound(){
    $("#nowbs").removeClass('no-display')
    $(".wb").removeClass('no-display');
  }

$(document).ready(function() {
    
    $('.filter-toggle').prop("checked", false).click(function() {

        let sectfilter = $(this).attr("toggles"),
            togs = $(this);
        
        if(togs.prop("checked")){
            togs.text('Select All')
        } else { togs.text('Deselect All') };

        togs.prop("checked", !togs.prop("checked"));
        $('.'+sectfilter).prop('checked', this.checked);                
    });

    
    
});
