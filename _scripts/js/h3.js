const jQuery = require('jquery'); 
window.$ = window.jQuery = jQuery; 

function h3divs() { 
    $('#pagecontent > h3:not(.rm-a)').each(function() {  
        let thish3 = $(this);
        thish3.nextUntil('h3, h2')
        .wrapAll("<div class='wb-subsection-content usa-prose' />");
    });
    $('.process-list > h3:not(.rm-a)').each(function() {
        $(this).addClass( "usa-process-list__heading" );
        $(this).nextUntil('h3, h2')
        .addBack()
        .wrapAll("<li class='usa-process-list__item' />");
    });
    $('.process-list').children().wrapAll("<ol class='usa-process-list' />");
}

module.exports = h3divs;