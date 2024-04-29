---
---

const packaged = [{% include packages.js sect='workbooks' %}]

function submitFilters(form){
  $("#nowbs").addClass('no-display');


    var fdata = new FormData(form) //.entries();
    //var data = $('#workbook-array').serialize()

    var formvalues = {};
    var inclusive = [];
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

    //console.log(formvalues.length)

    if(Object.keys(formvalues).length === 0){
      $(".wb").removeClass('no-display');
    } else {
      filterWBs(formvalues, inclusive)
    }

    return false
  }


  function filterWBs(formvalues, inclusive){

    var entri = Object.entries(formvalues);
    var obj1 = Object.fromEntries(entri.filter(([k]) => inclusive.includes(k)));
    var obj2 = Object.fromEntries(entri.filter(([k]) => !inclusive.includes(k)));

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

    //console.log(obj1)
    var include = packaged.filter(incConditions(obj1));
    var exclude = include.filter(exclConditions(obj2));

    var idarray = exclude.flatMap(function (el) { return el.keeps; });

    
    if(idarray.length===0){
      noWBsFound()
    } else {

      $(".wb").addClass('no-display');

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
