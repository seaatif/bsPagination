
(function ($) {
    $.fn.bsPagination = function (options) {
        let $owner = this,
            settings = $.extend({
                total:        0,
                page:         1,
                maxVisible:   7,
                nextPrevUse:  true,
                firstLastUse: false,
                nextTitle: '&raquo;',
                prevTitle: '&laquo;',
                firstTitle: 'First',
                lastTitle: 'Last'
                
            }, $owner.data('settings') || {}, options || {});
        
        if(settings.total <= 0)
            return this;
    
        if(!$.isNumeric(settings.maxVisible) && !settings.maxVisible){
            settings.maxVisible = parseInt(settings.total, 10);
        }
        
        // it should be odd
        if(settings.maxVisible % 2 == 0) {
            settings.maxVisible++;
        }
        
        $owner.data('settings', settings);
        
        return $owner.each(function () {
            let me = $(this).html(''),
                html = '';
            html += renderOpen();
            if(settings.firstLastUse) html += renderPageLi(settings.firstTitle, 'first', 'dyn');
            if(settings.nextPrevUse) html += renderPageLi(settings.prevTitle, 'prev', 'dyn');
    
            for (let i = 0; i < Math.min(settings.maxVisible, settings.total); i++) {
                let p = i + 1;
                html += renderPageLi(p, p)
            }
            
            if(settings.nextPrevUse) html += renderPageLi(settings.nextTitle, 'next', 'dyn');
            if(settings.firstLastUse) html += renderPageLi(settings.lastTitle, 'last', 'dyn');
            html += renderClose();
            me.html(html);
            renderPageNumbers();
            
            me.find('li a').on('click', function (e) {
                e.preventDefault();
                let a = $(this);
                if(a.hasClass('disabled') || a.hasClass('active')){
                    return;
                }
                
                settings.page = calcPageNumber(a.closest('li').data('index'));
                
                renderPageNumbers();
                $owner.trigger('page-clicked', settings.page);
            });
        });
        
        function renderPageNumbers() {
            $owner.find('li').not('.step-dyn').each(function () {
                let li = $(this),
                    page = calcPageNumber(li.data('index'));
                li.find('a').html(page);
                
                if(page == settings.page)
                    li.addClass('active')
                else
                    li.removeClass('active');
            });
            
            if(settings.page <= 1)
                $owner.find('.page-prev, .page-first').addClass('disabled')
            else
                $owner.find('.page-prev, .page-first').removeClass('disabled')
            
            if(settings.page >= settings.total)
                $owner.find('.page-next, .page-last').addClass('disabled');
            else
                $owner.find('.page-next, .page-last').removeClass('disabled')
        }
        
        function calcPageNumber(index) {
            if(index == 'first')
                return 1;
            else if(index == 'last')
                return settings.total;
            else if (index == 'prev')
                return Math.max(1, settings.page - 1);
            else if (index == 'next')
                return Math.min(settings.total, settings.page + 1);
            else if (settings.total <= settings.maxVisible && $.isNumeric(index))
                return index;
            else if ($.isNumeric(index)) {
                let mid = Math.floor(settings.maxVisible / 2);
                let start = Math.max(settings.page - mid, 1);
                
                if(start + settings.maxVisible > settings.total) {
                    start -= start + settings.maxVisible - settings.total - 1;
                }
                
                return start + index - 1;
            }
        }
        
        function renderPageLi(num, key, cssClass) {
            return `
                <li class="page-item step-${cssClass} page-${key}" data-index="${key}">
                    <a class="page-link" href="#">${num}</a>
                </li>`;
        }
        
        function renderOpen() {
            return `<nav aria-label="Page navigation">
                        <ul class="pagination">`;
        }
        
        function renderClose() {
            return `</ul></nav>`;
        }
        
    }
})(jQuery);
