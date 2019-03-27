$(document).ready(function(){

// -----------  SELEZIONE TUTTI gli slider, funzioni al clicl sul singolo  -----------
  $('.component-galleryRoll .component-galleryRoll-row-img.transition').each(function(index) {

    var carousel = $(this).find(".carousel.carousel-showmanymoveone");
    var rowContainer = $(this).find(".carousel.carousel-showmanymoveone.carousel-fullWidth");
    var carouselOpen = $(this).find(".component-galleryRoll-row-arrow");
    var carouselControls =  $(this).find(".carousel-controls");
    var carouselControlsLink =  $(this).find(".carousel-controls > a");
    var carouselIndicators =  $(this).find(".carousel-indicators");
    // var carouselIndicatorLink =  $(this).find(".carousel-indicators li");
    var carouselClose =  $(this).find(".carousel-close");
    var carouselItems =  $(this).find(".carousel-inner > .item");
    // var carouselItemList =  $(this).find(".carousel-inner > .item > .item-list");
    var carouselToSlide =  $(this);

    // var carouselItemsLeft =  $(this).find(".carousel-inner-toLeft > .item");
    // var carouselItemsRight =  $(this).find(".carousel-inner-toRight > .item");
    // carouselItemsRight = carouselItemsRight.reverse();
// carouselItems = carouselItemsLeft > 0 ? carouselItemsLeft : carouselItemsRight.get().reverse();
// console.log(carouselItemsLeft, carouselItemsRight );

    var parent = $(this).parent(); 
    var parents = $(this).parents().hasClass('toLeft'); 

// console.log(carouselItems.length);
    // -----------  genera la dimesione del container per le slides  -----------
    rowContainer.addClass("carousel-fullWidth-"+ carouselItems.length );

    // -----------  generazione cloni immagine slider  -----------
    carouselItems.each(function(item){
      var itemToClone = $(this);
      for (var i=1; i < 4; i++) {
        itemToClone = itemToClone.next();
        // wrap around if at end of item collection
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }
        // grab item, clone, add marker class, add to collection
        itemToClone.children(':first-child').clone()
          .addClass("item-list cloneditem cloneditem-"+(i) )
          .appendTo($(this));
      }

      // ----------- Genera gli Indicators dello slider  -----------
      carouselIndicators.append("<li data-slide-to='"+ item +"' data-target='#slider-"+ index +"'></li>" );
      if(item === 0) {
        carouselIndicators.children().first().addClass('active');
      }
      if(item === carouselItems.length-1)  $(this).addClass('item-last');
      if(item === carouselItems.length-2)  $(this).addClass('item-last2');
      if(item === carouselItems.length-3)  $(this).addClass('item-last3');
      if(item === carouselItems.length-4)  $(this).addClass('item-last4');

      // segno l'ultimo elemento clonato per il positioning in tablet portrait
      $(this).children().last().addClass('cloneditem-last');
    });

    // ----------- Genera ID degli sliders  -----------
    carousel.attr('id', 'slider-' + index);
    carouselControlsLink.attr('href', '#slider-' + index);


    // -----------  apertura slider -----------
    carouselOpen.on("click", function(e){
      e.stopPropagation();
      
      // --- calcolo la translazione in px  -----
      var limitContainer = $(".limit-container").offset();
      var limiTransition = $(".component-galleryRoll-row.multImg.toLeft .slide.carousel-fullWidth").offset();
      var calc = Math.abs(limitContainer.left - limiTransition.left);

      parents ? carouselToSlide.css('transform', 'translate( -'+ calc +'px )') : carouselToSlide.css('transform', 'translate( '+ calc +'px )');

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

      parents ? carouselToSlide.css('transform', '') : carouselToSlide.css('transform', '');

      // --- a fine animazione modifica visibiltà elementi  -----
      parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          carouselOpen.removeClass('hidden');
          carouselControls.addClass('hidden');
          carouselClose.addClass('hidden');
        });
    });

    carouselIndicators.on('click', function(){
      console.log( $(this) );
    })


    // var next = carouselControls.find('[data-slide="next"]');
    // var itemActiveLast3 =  $(this).find(".item-last3.active");
    // var itemActiveLast3active =  $(this).find(".item-last3");

    // next.on('click', function(){
    //   var limitContainerWidth = $(".limit-container").width();
    //   var itemActive3 = $(".carousel-inner > .item.item-last3.active");
    //   var itemActiveLast4 = $(".carousel-inner > .item.item-last4.active").length;
    //   var itemActive4 = $(".carousel-inner > .item.item-last4.active");
    //   console.log('3: ' + itemActiveLast3.length);
    //   console.log('active: ' + itemActiveLast3active.length);
    //   if(limitContainerWidth > 1680){
    //     // if(itemActiveLast4 == 1)  console.log('4 ', itemActive4);
    //     if(itemActiveLast3 == 1)  console.log('3 ', itemActive3);
    //     // next.css('pointer-events','none');
    //   }
    // })

  });
});

