$(document).ready(function(){
      
      (function(){
        $('.carousel-showmanymoveone .item').each(function(){
          var itemToClone = $(this);
      
          for (var i=1;i<3;i++) {
            itemToClone = itemToClone.next();
      
            // wrap around if at end of item collection
            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }
      
            // grab item, clone, add marker class, add to collection
            itemToClone.children(':first-child').clone()
              .addClass("pippo cloneditem-"+(i) )
              .appendTo($(this));
          }
        });
      }());


      $(".component-galleryRoll-row-arrow").on("click", function(){
        var textLenght;
        var parent = $(this).parents();
        
        // calcolo spostastamento dello slider e direzione
        textLenght = $(".component-galleryRoll-row-text").width();
        textLenght = parent.hasClass('toRight') ? textLenght : "-" + textLenght;
        // translazione al click
        $(this).parent().css({
          'transform': 'translate( '+ textLenght +'px)', 
          'transition': '2s'
        });

        
    });

});