---
---
// load workbook data
const packaged = [{% include packages.js sect='workbooks' %}]


// saves filter state and calls sorting function
function submitFilters(form){
  // get form data
  var fdata = new FormData(form);
  var formstring = new URLSearchParams(fdata).toString();

  // store filters
  sessionStorage.setItem('lastsearch', formstring);
  sortForm(fdata); 

  // do not reload
  return false;
  
}

// loads filters from session storage
function loadFilters(form, clear = "nope"){
// get form data
var savedData = sessionStorage.getItem('lastsearch'),
    fdata = (new URLSearchParams(savedData)).entries();
//set clear as key, value pair to remove from URLParams, then resubmit form

// loop through saved session information
 for(const [ key, val ] of fdata) {
  if(key === clear[ 0 ] && val === clear[ 1 ]){
    // skip filter
  } else {
    if( !(val === "") ){
    const input = form.elements[ key ];
    if( input.id === key){
      // set checkbox
        switch(input.type) {
          case 'checkbox': input.checked = !!val; 
          default:         input.value = val;     
        }       
    } else if (input instanceof RadioNodeList) {
      // set radio button
        rlength = input.length;
        for (var i = 0; i < rlength; i++) {
          if(input[ i ].value === val){
            input[ i ].checked = !!val;
           }
        }
      } 
  } }
}
// submit loaded form
submitFilters(form);
}

function sortForm(fdata){

$("#nowbs").addClass('no-display');
// hide No Results Found message if showing

var formvalues = [ ]; // form values in object format
var pillvalues = $("<ul/>", { 'class':"filter-pills__list" });
var inclusive = [ ]; // keys that have 'inclusive' data handling
fdata.forEach((value, key) => {
  if (value !== "") {
    if(key.includes("inclusive")){
      inclusive.push(value);
    } else if (!(key.includes("selector"))){
      var mykey = '';
      if(key=='subject'){
        mykey = 'subject';
        inclusive.push(value);
      } else {
        mykey = key; 
      }
      // Add pill for new filter value
      if(!Reflect.has(formvalues, mykey)){
        pillvalues.append(makePill(key,value));
        formvalues[ mykey ] = value;
        return;
      }
      if(!Array.isArray(formvalues[ mykey ])){
        formvalues[ mykey ] = [ formvalues[ mykey ] ];    
      }
      pillvalues.append(makePill(key,value));
      
      formvalues[ mykey ].push(value);
    }
  }
    
});

var formobject = Object.entries(formvalues);

// If no filters, clear search; otherwise, filter workbooks
if(formobject.length === 0){
  clearSearch();
} else {
  filterWBs(formobject, inclusive);
  displayfilters(pillvalues);
}


}

// clears all filters and reloads page
function clearSearch(){
sessionStorage.clear();
// Refresh the page
location.reload();

}


function filterWBs(formobject, inclusive){
// Split filters into inclusive and exclusive
  var obj1 = Object.fromEntries(formobject.filter(([ k ]) => inclusive.includes(k)));
  var obj2 = Object.fromEntries(formobject.filter(([ k ]) => !inclusive.includes(k)));
// Helper functions for inclusive/exclusive matching
  var c_exclusive = (arr, target) => target.every(v => arr.includes(v));
  var c_inclusive = (arr, target) => target.some(v => arr.includes(v));
// Build filter conditions
  var incConditions = search => a => Object.keys(search).every(k => 
    (Array.isArray(search[ k ]) && ((Array.isArray(a[ k ]) && c_inclusive(a[ k ], search[ k ])) || search[ k ].includes(a[ k ]) )) ||
    a[ k ] === search[ k ] ||
    Array.isArray(a[ k ]) && a[ k ].includes(search[ k ])
  ),
  exclConditions = search => a => Object.keys(search).every(k => 
    (Array.isArray(search[ k ]) && ((Array.isArray(a[ k ]) && c_exclusive(a[ k ], search[ k ])) || search[ k ].includes(a[ k ]) ))||
    a[ k ] === search[ k ] ||
    Array.isArray(a[ k ]) && a[ k ].includes(search[ k ])
  );
// Filter packaged data
  var exclude = {};
  if(Object.keys(obj1).length===0){
    exclude = packaged.filter(exclConditions(obj2));
  } else {
    // filter by inclusive conditions
    var include = packaged.filter(incConditions(obj1));
    // filter by exclusive conditions
    exclude = include.filter(exclConditions(obj2));
}

  // get ids of items that match the selected tutorials
  var idarray = exclude.flatMap(function (el) { return el.keeps; });
  var selarray = exclude.flatMap(function (el) { return el.ref; });
  checkWBs(idarray,selarray);
}

// check for matches
function checkWBs(idarray,selarray){

  // display error message if no workbooks found
  if(idarray.length===0){
    noWBsFound();
  } else {
    showWBs(idarray,selarray);
  }
  
}

// show "no results" if no matches found
function noWBsFound(){
$(".wb").addClass('no-display').removeClass('wb-select');
$("#search-placeholder").removeClass('no-display');

filterCounts(0);
}

function showWBs(idarray,selarray){

// hide all tutorials
$(".wb").addClass('no-display').removeClass('wb-select');
$("#search-placeholder").removeClass('no-display');

// display only selected tutorials
var counter=0;
idarray.forEach((divid) =>{
  var div = document.getElementById(divid);
  if(div) {
    div.classList.remove('no-display');
    if (selarray.includes(divid)){
      div.classList.add('wb-select');
      counter=counter+1;
    }
  }
});

filterCounts(counter);

}


// Title search box - Filters components by search input 
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

// Updates the count of filtered workbooks
function filterCounts(num){
var div = $("#component-count");
if (div.attr("path") == "json"){
  jsonCount(div, num);
} else {
  classCount(div);
}
}

// 
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
filters.append(myfilters);
} 

function makePill(k,v){
var pSet = "filter-pill-" + k + "-" + v;
//var pID = pSet.replace(/ /g, "-");
var vText = v;

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
  "class":"filter-pills__remove",
}).html(
  '<span class="filter-pills__remove">' +
    '<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">'+
      '<use xlink:href="/assets/uswds/img/sprite.svg#close"></use>'+
    '</svg>' +
  '</span>'
  )));

// Bind click to remove filter
mypill.bind('click', function() {
  removeFilter(this);
});
return mypill;

}

// Removes a filter pill
function removeFilter(me){
let ent = $(me),
    k = ent.attr("keyID"),
    v = ent.attr("value");
var myform = document.getElementById("workbook-array");
myform.reset();
loadFilters(myform, [ k,v ]);
}

// Returns the "questions" array from quizdata
function getPages() {  
  const baseURL = window.location.origin;
  $.ajax({
      type: 'GET',
      url: baseURL + '/assets/js/filter/workbooks.json',
      data: { get_param: 'value' },
      dataType: 'json',
      success: function (data) {
        var entries = data;
        packaged = entries;
      },
      error: function () {
        console.log("Failed to fetch workbook data");
      },
  });
}

$(document).ready(function() {

  let iconfilter = document.getElementById('icon-filter');
  if(iconfilter){
    iconfilter.addEventListener('keyup', function () {
      filterComp(this); 
    });
  }
  
  var myform = document.getElementById("workbook-array");

  // add submitFilters function to form
  myform.addEventListener("submit", function (e) {
    e.preventDefault();
    submitFilters(this); 
    });
      // Toggle all checkboxes in a section
      $('.filter-toggle').prop("checked", false).click(function() {
  
          let sectfilter = $(this).attr("toggles"),
              togs = $(this);
          
          if(togs.prop("checked")){
              togs.text('Select All');
          } else { togs.text('Deselect All') }
  
          togs.prop("checked", !togs.prop("checked"));
          $('.'+sectfilter).prop('checked', this.checked);                
      });
  // Handle select-multiple dropdowns with confirmation
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
// Toggle inclusive/exclusive filter mode
      $('.inclusive-toggle').prop("checked", false).click(function() {
        let tog = $(this),
            togv = $("#"+tog.attr("value")+"-hint");
            
        if(tog.prop("checked")){
          togv.text('Results match tag 1 OR tag 2')
        } else { togv.text('Results match tag 1 AND tag 2'); }
      })
  
      // Tooltip toggles
      $('.tooltip-toggle').click(function(){
        let tog = $(this).attr("toggles")
        $("#"+tog).toggleClass( "no-display" )
  
      });
  // Load filters from session storage if present
      if ('lastsearch' in sessionStorage) {
        loadFilters(myform)
  
      } else { classCount($("#component-count")); }
  });
  