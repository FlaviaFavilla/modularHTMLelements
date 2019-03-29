$(document).ready(function(){

// -----------  SELEZIONE TUTTI gli slider, funzioni al clicl sul singolo  -----------
  $('.component-galleryRoll .component-galleryRoll-row-img.transition').each(function(index) {

    var self = $(this);
    var parent = self.parent(); 
    var rowToLeft = self.parents().hasClass('toLeft'); 
    var rowToRight = self.parents().hasClass('toRight'); 

    var carousel = self.find(".carousel.carousel-showmanymoveone");
    var rowContainer = self.find(".carousel.carousel-showmanymoveone.carousel-fullWidth");
    var carouselOpen = self.find(".component-galleryRoll-row-arrow");
    var carouselControls =  self.find(".carousel-controls");
    var carouselControlsLink =  self.find(".carousel-controls > a");
    var nexToLeft = self.find('.carousel-controls-toLeft .right.carousel-control');
    var prevToLeft = self.find('.carousel-controls-toLeft .left.carousel-control');
    var nexToRight = self.find('.carousel-controls-toRight .right.carousel-control');
    var prevToRight = self.find('.carousel-controls-toRight .left.carousel-control');
    var carouselIndicators =  self.find(".carousel-indicators");
    var carouselClose =  self.find(".carousel-close");
    var carouselInner = self.find(".carousel-inner");
    var carouselInnerCloned = self.find(".carousel-inner-cloned");
    var carouselItems =  self.find(".carousel-inner > .item");



    // -----------  genera la dimesione del container per le slides  -----------
    rowContainer.addClass("carousel-fullWidth-"+ carouselItems.length );

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
    carouselItems.each(function(item){
      var itemToClone = $(this);
      if(carouselInner.is('.carousel-inner-toRight')){  
        // console.log(itemToClone);           
        carouselInner.prepend(itemToClone)
        // carouselInnerCloned.prepend(itemToClone)
      }
    })



    // ----------- Genera ID degli sliders  -----------
    carousel.attr('id', 'slider-' + index);
    carouselControlsLink.attr('href', '#slider-' + index);


    // -----------  apertura slider -----------
    carouselOpen.on("click", function(e){
      e.stopPropagation();
      
      // --- calcolo la translazione in px  -----
      var limitContainer = $(".limit-container").offset();
      var limitContainerWidth = $(".limit-container").width();

      var limiTransitiontoLeft = $(".component-galleryRoll-row.multImg.toLeft .slide.carousel-fullWidth").offset();
      var limiTransitiontoRight = $(".component-galleryRoll-row.multImg.toRight > .component-galleryRoll-row-text").offset();
      var calcToLef = Math.abs(limitContainer.left - limiTransitiontoLeft.left);
      var calcToRight = Math.abs(limitContainer.left - limiTransitiontoRight.left -30 - 15);

      rowToLeft ? self.css('transform', 'translate( -'+ calcToLef +'px )') : self.css('transform', 'translate( '+ calcToRight +'px )');

      // --- a fine animazione modifica visibiltà elementi  -----
      parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          carouselOpen.addClass('hidden');
          carouselClose.removeClass('hidden');
          if(limitContainerWidth >= 1680 && carouselItems.length > 3){
            carouselControls.removeClass('hidden');
          }
          if(limitContainerWidth < 1680  && carouselItems.length > 2){
            carouselControls.removeClass('hidden');
          }
        });
    });

    // -----------  chiusura slider -----------
    carouselClose.on("click", function(e){
      e.stopPropagation();

      rowToLeft ? self.css('transform', '') : self.css('transform', '');

      // --- a fine animazione modifica visibiltà elementi  -----
      parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          carouselOpen.removeClass('hidden');
          carouselControls.addClass('hidden');
          carouselClose.addClass('hidden');
        });
    });

    // -----------  gestione controller slider ToLeft -----------
    nexToLeft.on('click', function(){
      var itemActiveLast3 =  self.find(".carousel-inner-toLeft .item-last4.active");
      var itemActiveLast2 =  self.find(".carousel-inner-toLeft .item-last3.active");
      var limitContainerWidth = $(".limit-container").width();

      if(limitContainerWidth >= 1680){
        if(itemActiveLast3 && itemActiveLast3.length) {
          nexToLeft.hide();
          self.find(".item-last3 .cloneditem-3").addClass("hidden");
        }
      }
      if(limitContainerWidth < 1680){
        if(itemActiveLast2 && itemActiveLast2.length) {
          nexToLeft.hide();
          self.find(".item-last3 .cloneditem-3").addClass("hidden");
          self.find(".item-last2 .cloneditem-3").addClass("hidden");
        }
      }

    })
    prevToLeft.on('click', function(){
      nexToLeft.show()
    })

    // -----------  gestione controller slider ToRight -----------
    prevToRight.on('click', function(){
      var itemActiveLast3 =  self.find(".carousel-inner-toRight .item-last3.active");
      var itemActiveLast4 =  self.find(".carousel-inner-toRight .item-last4.active");
      var limitContainerWidth = $(".limit-container").width();

      console.log(itemActiveLast4, itemActiveLast3 );

      if(limitContainerWidth >= 1680){
        if(itemActiveLast4 && itemActiveLast4.length) {
          prevToRight.hide();
          // self.find(".item-last3 .cloneditem-3").addClass("hidden");
        }
      }
      if(limitContainerWidth < 1680){
        if(itemActiveLast3 && itemActiveLast3.length) {
          prevToRight.hide();
          // self.find(".item-last3 .cloneditem-3").addClass("hidden");
          // self.find(".item-last2 .cloneditem-3").addClass("hidden");
        }
      }

    })
    nexToRight.on('click', function(){
      prevToRight.show()
    })
  });
});

