$(document).ready(function(){
      
  var carouselOpen = $(".component-galleryRoll-row-arrow");
  var carouselControls = $(".carousel-controls");
  var carouselClose = $(".carousel-close");
  // var togleToLeft = function(parent){ return parent.toggleClass('transitionClassToLeft');}
  // var togleToRight = function(parent){ return parent.toggleClass('transitionClassToRight');}
  // var togleToRight = parent.toggleClass('transitionClassToRight');

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

// -----------  a fine animazione modifica visibiltà elementi  -----------
      var galleryTransitionEnd = function(parent, carouselOpen, carouselControls){
        return  parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                            function(event) {
                              carouselOpen.toggleClass('hidden');
                              carouselControls.toggleClass('hidden');
                              carouselClose.toggleClass('hidden');
                              return false;
                            });
      }

// -----------  apertura slider -----------
      carouselOpen.on("click", function(e){

        var parent = $(this).parent(); 
        var parents = $(this).parents().hasClass('toLeft'); 
        // var parents = $(this).parents('.toLeft'); 
        
        // translazione al click
        e.stopPropagation();
        parents ? parent.addClass('transitionClassToLeft') : parent.addClass('transitionClassToRight');

        // a fine animazione modifica visibiltà elementi
        galleryTransitionEnd(parent, carouselOpen, carouselControls);
        
        return false;
    });


    // -----------  chiusura slider -----------
    carouselClose.on("click", function(e){

      var parent = $(this).parent(); 
      var parents = $(this).parents('.toLeft'); 
      e.stopPropagation();

      parents ? parent.removeClass('transitionClassToLeft') : parent.removeClass('transitionClassToRight');

      // a fine animazione modifica visibiltà elementi
      galleryTransitionEnd(parent, carouselOpen, carouselControls);
      
      return false;
  });

});

