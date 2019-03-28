$(document).ready(function(){

// -----------  SELEZIONE TUTTI gli slider, funzioni al clicl sul singolo  -----------
  $('.component-galleryRoll .component-galleryRoll-row-img.transition').each(function(index) {

    var self = $(this);
    var parent = self.parent(); 
    var rowToLeft = self.parents().hasClass('toLeft'); 

    var carousel = self.find(".carousel.carousel-showmanymoveone");
    var rowContainer = self.find(".carousel.carousel-showmanymoveone.carousel-fullWidth");
    var carouselOpen = self.find(".component-galleryRoll-row-arrow");
    var carouselControls =  self.find(".carousel-controls");
    var carouselControlsLink =  self.find(".carousel-controls > a");
    var carouselIndicators =  self.find(".carousel-indicators");
    var carouselClose =  self.find(".carousel-close");
    var carouselItems =  self.find(".carousel-inner > .item");


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
      var limitContainerWidth = $(".limit-container").width();
      var limiTransitiontoLeft = $(".component-galleryRoll-row.multImg.toLeft .slide.carousel-fullWidth").offset();
      var limiTransitiontoRight = $(".component-galleryRoll-row.multImg.toRight span.component-galleryRoll-row-arrow").offset();
      var calcToLef = Math.abs(limitContainer.left - limiTransitiontoLeft.left);
      var calcToRight = Math.abs(limitContainerWidth - limiTransitiontoRight.left);

      rowToLeft ? self.css('transform', 'translate( -'+ calcToLef +'px )') : self.css('transform', 'translate( '+ calcToRight +'px )');

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

      rowToLeft ? self.css('transform', '') : self.css('transform', '');

      // --- a fine animazione modifica visibiltà elementi  -----
      parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          carouselOpen.removeClass('hidden');
          carouselControls.addClass('hidden');
          carouselClose.addClass('hidden');
        });
    });



    var next = carouselControls.find('.right.carousel-control');
    var prev = carouselControls.find('.left.carousel-control');

    var itemActiveLast3active =  self.find(".item-last3");

    next.on('click', function(){
      var itemActiveLast3 =  self.find(".item-last4.active");

      var limitContainerWidth = $(".limit-container").width();
      var itemActive3 = $(".carousel-inner > .item.item-last3.active");
      var itemActiveLast4 = $(".carousel-inner > .item.item-last4.active").length;
      var itemActive4 = $(".carousel-inner > .item.item-last4.active");
      console.log('3: ' + itemActiveLast3.length);
      console.log('active: ' + itemActiveLast3active.length);
      console.log({limitContainerWidth,itemActiveLast3, self,next });

      
      if(limitContainerWidth > 1680){
        // if(itemActiveLast4 == 1)  console.log('4 ', itemActive4);
        if(itemActiveLast3 && itemActiveLast3.length) {
          next.hide();
        }

      }

    })
    prev.on('click', function(){
      next.show()
    })

  });
});

