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

var textLenght;
      $(".component-galleryRoll-row-arrow").on("click", function(){
        console.log('ciao');
        textLenght = $(".component-galleryRoll-row-text").width();
        console.log(textLenght);
        // transform: translate(-585px);
        // component-galleryRoll-row-img

        $(this).parent().css({'transform': 'translate(-'+ textLenght +'px)', 'transition': '2s'});
    });

});