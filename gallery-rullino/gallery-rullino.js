$(document).ready(function(){

// -----------  SELEZIONE TUTTI gli slider, funzioni al clicl sul singolo  -----------
  $('.component-galleryRoll .component-galleryRoll-row-img.transition').each(function(index) {

    var carousel = $(this).find(".carousel.carousel-showmanymoveone");
    var carouselOpen = $(this).find(".component-galleryRoll-row-arrow");
    var carouselControls =  $(this).find(".carousel-controls");
    var carouselControlsLink =  $(this).find(".carousel-controls > a");
    var carouselIndicators =  $(this).find(".carousel-indicators");
    var carouselClose =  $(this).find(".carousel-close");
    var carouselItems =  $(this).find(".carousel-inner > .item");
    var carouselToSlide =  $(this);

    var parent = $(this).parent(); 
    var parents = $(this).parents().hasClass('toLeft'); 

console.log(carouselItems, carouselItems.length);
    // -----------  generazione cloni immagine slider  -----------
    carouselItems.each(function(item){
      var itemToClone = $(this);

      for (var i=1; i < carouselItems.length; i++) {
        itemToClone = itemToClone.next();
        // wrap around if at end of item collection
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }
        // grab item, clone, add marker class, add to collection
        itemToClone.children(':first-child').clone()
          .addClass("item-list cloneditem-"+(i) )
          .appendTo($(this));
      }

      // ----------- Genera gli Indicators dello slider  -----------
      carouselIndicators.append("<li data-slide-to='"+ item +"' data-target='#slider-"+ index +"'></li>" );
      if(item === 0) {
        carouselIndicators.children().first().addClass('active');
      }
      
    });

    // ----------- Genera ID degli sliders  -----------
    carousel.attr('id', 'slider-' + index);
    carouselControlsLink.attr('href', '#slider-' + index);


    // -----------  apertura slider -----------
    carouselOpen.on("click", function(e){
      e.stopPropagation();
      parents ? carouselToSlide.addClass('transitionClassToLeft') : carouselToSlide.addClass('transitionClassToRight');
      // --- a fine animazione modifica visibiltà elementi  -----
      parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          carouselOpen.addClass('hidden');
          carouselControls.removeClass('hidden');
          carouselClose.removeClass('hidden');
        });
    });

    // -----------  chiusura slider -----------
    carouselClose.on("click", function(e){
      e.stopPropagation();
      parents ? carouselToSlide.removeClass('transitionClassToLeft') : carouselToSlide.removeClass('transitionClassToRight');
      // --- a fine animazione modifica visibiltà elementi  -----
      parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          carouselOpen.removeClass('hidden');
          carouselControls.addClass('hidden');
          carouselClose.addClass('hidden');
        });
    });

  });



});

