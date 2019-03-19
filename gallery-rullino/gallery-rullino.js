$(document).ready(function(){

// -----------  generazione cloni immagine slider  -----------
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

// -----------  SELEZIONE TUTTI gli slider, funzioni al clicl sul singolo  -----------
  $('.component-galleryRoll-row-img.transition').each(function(index) {

    var carousel = $(this).find(".carousel.carousel-showmanymoveone");
    var carouselOpen = $(this).find(".component-galleryRoll-row-arrow");
    var carouselControls =  $(this).find(".carousel-controls");
    var carouselControlsLink =  $(this).find(".carousel-controls > a");
    var carouselIndicators =  $(this).find(".carousel-indicators li");
    var carouselClose =  $(this).find(".carousel-close");
    var carouselToSlide =  $(this);

    var parent = $(this).parent(); 
    var parents = $(this).parents().hasClass('toLeft'); 
    // console.log(parent, parents, carouselToSlide);

    // ----------- Genera ID degli sliders  -----------
console.log(index);
    carousel.attr('id', 'slider-' + index);
    carouselControlsLink.attr('href', '#slider-' + index);
    carouselIndicators.attr('data-target', '#slider-' + index);


    // -----------  a fine animazione modifica visibiltà elementi  -----------
        var galleryTransitionEnd = function(){
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
        e.stopPropagation();
        parents ? carouselToSlide.addClass('transitionClassToLeft') : carouselToSlide.addClass('transitionClassToRight');

        galleryTransitionEnd();
      });

    // -----------  chiusura slider -----------
      carouselClose.on("click", function(e){
        e.stopPropagation();
        parents ? carouselToSlide.removeClass('transitionClassToLeft') : carouselToSlide.removeClass('transitionClassToRight');

        galleryTransitionEnd();
      });

  });



});

