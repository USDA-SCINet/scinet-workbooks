---
---

const packaged = [{% include packages.js sect='workbooks' %}]

function submitFilters(form){
  // get form data
  var fdata = new FormData(form)
  var formstring = new URLSearchParams(fdata).toString();

  sessionStorage.setItem('lastsearch', formstring);
  sortForm(fdata); 

  return false
  
}


function loadFilters(form, clear = "nope"){
  // get form data
  var savedData = sessionStorage.getItem('lastsearch'),
      fdata = (new URLSearchParams(savedData)).entries();
  //set clear as key, value pair to remove from URLParams, then resubmit form

   for(const [key, val] of fdata) {
    
    if(key === clear[0] && val === clear[1]){
      //do nothing
    } else {
      if( val === "" ){}else{
      const input = form.elements[key];
      if( input.id === key){

          switch(input.type) {
            case 'checkbox': input.checked = !!val; 
            default:         input.value = val;     
          }
        
        
      } else if (input instanceof RadioNodeList) {
          rlength = input.length
          for (var i = 0; i < rlength; i++) {
            if(input[i].value === val){
              input[i].checked = !!val;
            }
          }
        } 
    }}
  }

  submitFilters(form)
}

function sortForm(fdata){

  $("#nowbs").addClass('no-display');
  // hide No Results Found message if showing

  var formvalues = []; // form values in object format
  var pillvalues = $("<ul/>", {'class':"filter-pills__list"});
  var inclusive = []; // keys that have 'inclusive' data handling
  fdata.forEach((value, key) => {
    if (value !== "") {
      if(key.includes("inclusive")){
        inclusive.push(value);
      } else if (key.includes("selector")) {} else {
        if(key=='subject'){
          var mykey = 'subject'
          inclusive.push(value);
        } else {
          var mykey = key 
        }
          // Reflect.has in favor of: formvalues.hasOwnProperty(key)

        if(!Reflect.has(formvalues, mykey)){
          pillvalues.append(makePill(key,value));
          formvalues[mykey] = value;
          return;
        }
        if(!Array.isArray(formvalues[mykey])){
          formvalues[mykey] = [formvalues[mykey]];    
        }
        pillvalues.append(makePill(key,value));
        
        formvalues[mykey].push(value);
      }
    }
      
  });

  var formobject = Object.entries(formvalues);

  //check if formdata has a selction
  if(formobject.length === 0){
    clearSearch()
  } else {
    filterWBs(formobject, inclusive)
    displayfilters(pillvalues)
  }

  
}

function clearSearch(){
  sessionStorage.clear();
  // Refresh the page
  location.reload();

}

  function filterWBs(formobject, inclusive){

    var obj1 = Object.fromEntries(formobject.filter(([k]) => inclusive.includes(k)));
    var obj2 = Object.fromEntries(formobject.filter(([k]) => !inclusive.includes(k)));

    var c_exclusive = (arr, target) => target.every(v => arr.includes(v));
    var c_inclusive = (arr, target) => target.some(v => arr.includes(v));

    var incConditions = search => a => Object.keys(search).every(k => 
      (Array.isArray(search[k]) && ((Array.isArray(a[k]) && c_inclusive(a[k], search[k])) || search[k].includes(a[k]) )) ||
      a[k] === search[k] ||
      Array.isArray(a[k]) && a[k].includes(search[k])
    ),
    exclConditions = search => a => Object.keys(search).every(k => 
      (Array.isArray(search[k]) && ((Array.isArray(a[k]) && c_exclusive(a[k], search[k])) || search[k].includes(a[k]) ))||
      a[k] === search[k] ||
      Array.isArray(a[k]) && a[k].includes(search[k])
    );

    if(Object.keys(obj1).length===0){
      var exclude = packaged.filter(exclConditions(obj2));
    } else {
      // filter by inclusive conditions
      var include = packaged.filter(incConditions(obj1));
      // filter by exclusive conditions
      var exclude = include.filter(exclConditions(obj2));
  }

    // get ids of items that match the selected tutorials
    var idarray = exclude.flatMap(function (el) { return el.keeps; }),
        selarray = exclude.flatMap(function (el) { return el.ref});
    checkWBs(idarray,selarray)
  }

  function checkWBs(idarray,selarray){

    // display error message if no workbooks found
    if(idarray.length===0){
      noWBsFound()
    } else {
      // sessionStorage.setItem('showWBs', JSON.stringify(idarray));
      showWBs(idarray,selarray)
    }
    
  }

  function noWBsFound(){
    //$("#nosubject").removeClass('no-display');
    //$(".wb").removeClass('no-display');
    $(".wb").addClass('no-display').removeClass('wb-select');;
    $("#search-placeholder").removeClass('no-display');
    
    filterCounts(0);
  }

  function showWBs(idarray,selarray){

    // hide all tutorials
    $(".wb").addClass('no-display').removeClass('wb-select');
    $("#search-placeholder").removeClass('no-display');

    // display only selected tutorials
    var counter=0
    idarray.forEach((divid) =>{
      var div = document.getElementById(divid);
      if(div) {
        div.classList.remove('no-display')
        if (selarray.includes(divid)){
          div.classList.add('wb-select');
          counter=counter+1
        }
      }
    })

    filterCounts(counter)
    
  }

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
    classCount($("#component-count"));
}

function filterCounts(num){
  var div = $("#component-count");
  if (div.attr("path") == "json"){
    jsonCount(div, num)
  } else {
    classCount(div)
  }
};

function jsonCount(div, num){
    var word = (num === 1) ? "workbook" : "workbooks";
    div.html(`<strong>${num}</strong> ${word} found`);
}

function classCount(div){
  componentCount = document.querySelectorAll('.fc:not(.fc-no-display):not(.no-display)').length;
  var word = (componentCount === 1) ? "workbook" : "workbooks";
  div.html(`<strong>${componentCount}</strong> ${word} found`);
}

  function displayfilters(myfilters){
    var filters = $('#filter-pills');
    filters.empty();
    filters.append(myfilters)
  } 

  function makePill(k,v){
    var pSet = "filter-pill-" + k + "-" + v,
        pID = pSet.replace(/ /g, "-");
        vText = v;

    var mypill = $("<li/>", {
      "class": "filter-pills__item",
      "keyID": k,
      "value": v,
    }).append($('<a/>',{
      "class": "filter-pills__pill",
      "title": vText,
    }).append($("<span/>", {
      "class":"filter-pill-name",
      text: vText,
    })).append($("<span/>", {
      "class":"filter-pills__remove"
    }).html(
      '<span class="filter-pills__remove">' +
        '<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">'+
          '<use xlink:href="/assets/uswds/img/sprite.svg#close"></use>'+
        '</svg>' +
      '</span>'
      )))

    mypill.bind('click', function() {
      let ent = $(this),
        k = ent.attr("keyID"),
        v = ent.attr("value");
    var myform = document.getElementById("workbook-array");
    myform.reset();
    loadFilters(myform, [k,v])
    });

    return mypill;

  }

  function removeFilter(me){
    let ent = $(me),
        k = ent.attr("keyID"),
        v = ent.attr("value");
    var myform = document.getElementById("workbook-array");
    myform.reset();
    loadFilters(myform, [k,v])
  }

  $(document).ready(function() {
    var myform = document.getElementById("workbook-array");
      
      $('.filter-toggle').prop("checked", false).click(function() {
  
          let sectfilter = $(this).attr("toggles"),
              togs = $(this);
          
          if(togs.prop("checked")){
              togs.text('Select All')
          } else { togs.text('Deselect All') };
  
          togs.prop("checked", !togs.prop("checked"));
          $('.'+sectfilter).prop('checked', this.checked);                
      });
  
      $('.selectmultiple').on('change', function (e) {
        let selectedO = $("option:selected", this),
          selectV = this.value;
  
        if (selectV) {
          let confirmer = selectedO.attr( "confirms" ),
            match = selectedO.attr( "match" );
  
          var fetched = myform.elements[confirmer];
  
          if(fetched[match].value === selectV){
            fetched[match].checked = !!selectV;
          }      
        }
      });
  
      
      $('.tooltip-toggle').click(function(){
        let tog = $(this).attr("toggles")
        $("#"+tog).toggleClass( "no-display" )
  
      });
  
      if ('lastsearch' in sessionStorage) {
        loadFilters(myform)
  
      } else { classCount($("#component-count")); }
  });
  