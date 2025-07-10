function buildtables() {
  $(".load-table").each(function(){
      
      var tablediv = $(this),
          thisurl = tablediv.data("file"),
          sortable = tablediv.data("sorting"),
          table = tablediv.find("table");

          $.getJSON(thisurl, function(jsonData) {
            let headers = Object.keys(jsonData[ 0 ]);
            let theader = $("<thead/>"),
                trow = $("<tr/>");
            if (sortable != ''){
              headers.forEach(header => trow.append(`<th data-sortable=true scope="col" role="columnheader">${header}</th>`));
            } else {
            headers.forEach(header => trow.append(`<th  role="columnheader">${header}</th>`));
            }
            theader.append(trow); 
            table.append(theader);

            let tbodyset = $("<tbody/>");
          
            
            jsonData.forEach(row => {
              let $tr = $('<tr>'),
                flagfirst = true;

                headers.forEach(header => { if (!flagfirst){
                  $tr.append(`<td scope="row"  data-label="${header}">${row[ header ]}</td>`);
                }else{
                  $tr.append(`<th scope="row"  role="rowheader" data-label="${header}">${row[ header ]}</th>`); }
                  flagfirst=false;
                });
              flagfirst = 1;
              
              tbodyset.append($tr);
            });

            table.append(tbodyset);
          

            if (sortable != ""){
              tablediv.append($('<div/>',{
                "class":"usa-sr-only usa-table__announcement-region",
                "aria-live":"polite",
              }));
            }
          }); 

    });

    
  $(".simple-sorted-table").each(function(){
    let $this = $(this),
        caption = $this.data("caption");
    
    $this.find("table").prepend(`<caption>${caption}</caption>`);
    $this.find("thead tr th").each(function(){
      $(this).attr({
        "data-sortable": true,
        scope: "col",
        role: "columnheader",
    });
    });
    $this.find("tbody tr th").each(function(){
      $(this).attr({
        scope: 'row',
        role: "rowheader",
      });
    });
    $this.append($('<div/>',{
      "class":"usa-sr-only usa-table__announcement-region",
      "aria-live":"polite",
    }));
  });
}    
 
module.exports = buildtables;