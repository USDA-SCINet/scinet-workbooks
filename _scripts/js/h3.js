function h3divs() {  
    $('#pagecontent > h3:not(.rm-a)').each(function() {  
        let thish3 = $(this);
        thish3.nextUntil('h3, h2')
        .wrapAll("<div class='wb-subsection-content usa-prose' />");
    });
    $('.process-list').each(function() {
        let processList = $(this);
        var header_fetch = '> h3:not(.rm-a)';
        var hlist_depth = 'h3list';
        var ending_header = 'h3, h2';
        var list_tag = 'ol';
        if (processList.hasClass( "h4" )){
            header_fetch = '> h4:not(.rm-a)';
            hlist_depth = 'h4list';
            ending_header = 'h4, h3, h2';
        }
        if (processList.hasClass( "ul" )){
            list_tag = 'ul';
        }

        processList.find(header_fetch).each(function() {
            $(this).addClass("usa-process-list__heading");
            $(this).nextUntil(ending_header)
            .addBack()
            .wrapAll(`<li class='usa-process-list__item' ${hlist_depth} usa-prose' />`);
        });
        processList.children().wrapAll(`<${list_tag} class='usa-process-list' />`);
    });
}

module.exports = h3divs;