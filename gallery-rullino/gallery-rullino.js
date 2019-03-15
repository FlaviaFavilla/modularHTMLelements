$(document).ready(function(){
      
  var carouselOpen = $(".component-galleryRoll-row-arrow");
  var carouselControls = $(".carousel-controls");
  var carouselClose = $(".carousel-close");
  var textLenght;

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

// -----------  animazione apertura/chiusura slider  -----------
      var galleryOpening = function(parent,textLenght){
          return parent.css({
            'transform': 'translate( '+ textLenght +'px)', 
            'transition': '2s'
          })
      };

// -----------  a fine animazione modifica visibiltà elementi  -----------
      var galleryTransitionEnd = function(parent, carouselOpen, carouselControls){
        return  parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                            function(event) {
                              carouselOpen.toggleClass('hidden');
                              carouselControls.toggleClass('hidden');
                              carouselClose.toggleClass('hidden');
                            });
      }

// -----------  apertura slider -----------
      carouselOpen.on("click", function(){

        var parent = $(this).parent(); 
        
        // calcolo spostastamento dello slider e direzione
        textLenght = $(".component-galleryRoll-row-text").width();
        textLenght = parent.hasClass('toRight') ? textLenght : "-" + textLenght;
        // translazione al click
        galleryOpening(parent, textLenght);

        // a fine animazione modifica visibiltà elementi
        galleryTransitionEnd(parent, carouselOpen, carouselControls);
    });


    // -----------  chiusura slider -----------
    carouselClose.on("click", function(){

      var parent = $(this).parent(); 
      
      // calcolo spostastamento dello slider e direzione
      textLenght = $(".component-galleryRoll-row-text").width();
      textLenght = parent.hasClass('toRight') ?  "-" + textLenght : textLenght;
      // translazione al click
      galleryOpening(parent, textLenght);

      // a fine animazione modifica visibiltà elementi
      galleryTransitionEnd(parent, carouselOpen, carouselControls);
  });

});

