# bsPagination
Bootstrap 5 Pagination with jQuery for Ajax

## Dependencies
```h2
jQuery
Bootstrap v5.2
```

It uses Bootstrap v5.2 Css and Html to show pagination. 

## How to Use
```javascript
$("#pagin").bsPagination({
    total: 1,          // total pages
    page: 1,            // default page
    maxVisible: 7,     // visible pagination
    nextPrevUse:  true, // show Prev Next Button
    firstLastUse: false, // show First Last Button
}).on("page-clicked", function(event, pageNum){
    // call your ajax function here to fetch contens
    
    ...
    
    // you can use below code to update page numbers
    $(this).bsPagination({
        total: 10, // update total pages
        page: 5 // update the current page if want
    });
});
```
