$(document).ready(function(){

  var modalsGallery = $(".modals-gallery");
  var modalGallery = $(".modals-gallery > .modal");

$(".item-list-video").each(function(item){
    var video = $(this);
    video.attr('data-target', '#videoModal-' + item);
    $(modalGallery).clone().appendTo(modalsGallery).attr("id", "videoModal-" + item);
});


// -----------  SELEZIONE TUTTI gli slider, funzioni al clicl sul singolo  -----------
  $('.component-galleryRoll .component-galleryRoll-row-img').each(function(index) {

    var self = $(this);
    var parent = self.parent(); 
    var rowToLeft = self.parents().hasClass('toLeft'); 
    var rowToRight = self.parents().hasClass('toRight'); 

    var carousel = self.find(".carousel");
    var rowImage =  self.parent().find(".component-galleryRoll-row-img"); 
    var carouselHover =  self.parent().find(".component-galleryRoll-row-carousel-hover"); 
    var carousel = self.find(".carousel.carousel-showmanymoveone");
    var rowContainer = self.find(".carousel.carousel-showmanymoveone.carousel-fullWidth");
    var carouselOpen = self.find(".component-galleryRoll-row-arrow");
    var carouselControls =  self.find(".carousel-controls");
    var carouselControlsLink =  self.find(".carousel-controls > button");
    var nexToLeft = self.find('.carousel-controls-toLeft .right.carousel-control');
    var prevToLeft = self.find('.carousel-controls-toLeft .left.carousel-control');
    var nexToRight = self.find('.carousel-controls-toRight .right.carousel-control');
    var prevToRight = self.find('.carousel-controls-toRight .left.carousel-control');
    var carouselIndicators =  self.find(".carousel-indicators");
    var carouselClose =  self.find(".carousel-close");
    var carouselInner = self.find(".carousel-inner");
    var carouselItems =  self.find(".carousel-inner > .item");

    var limitContainerWidth = $(".limit-container").width();
    var carouselHoverClick = false;
    var lastItemTranslate = false;


    // ----------- Genera ID degli sliders  -----------
    carousel.attr('id', 'slider-' + index);
    carouselControlsLink.attr('href', '#slider-' + index);


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

      // // ----------- Genera gli Indicators dello slider  -----------
      generateIdicators(item);

      // segno la posizione delle slides
      if(item === carouselItems.length-1)  $(this).addClass('item-last');
      if(item === carouselItems.length-2)  $(this).addClass('item-last2');
      if(item === carouselItems.length-3)  $(this).addClass('item-last3');
      if(item === carouselItems.length-4)  $(this).addClass('item-last4');
      if(item === carouselItems.length-5)  $(this).addClass('item-last5');

      // segno l'ultimo elemento clonato per il positioning in tablet portrait
      $(this).children().last().addClass('cloneditem-last');
    
      $(this).addClass("item-" + item);

    });


    // -----------  generazione degli Indicators dello slider  -----------
    function generateIdicators(item){
      carouselIndicators.append("<li data-slide-to='"+ item +"' data-target='#slider-"+ index +"'></li>" );
      if(item === 0) {
        carouselIndicators.children().first().addClass('active');
      }
    }


    // --- swipe del carosello  -----
    carousel.swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

        var limitContainerWidth = $(".limit-container").width();
        
        if(rowToLeft){
          var itemActiveLast4 =  $(this).find(".carousel-inner-toLeft .item-last5.active");
          var itemActiveLast3 =  $(this).find(".carousel-inner-toLeft .item-last4.active");
          var itemActiveLast2 =  $(this).find(".carousel-inner-toLeft .item-last3.active");
          var firstActive = $(this).find(".carousel-inner-toLeft .active.item-0");
        }
        if(rowToRight){
          var itemActiveLast3 =  self.find(".carousel-inner-toRight .item-last3.active");
          var itemActiveLast4 =  self.find(".carousel-inner-toRight .item-last4.active");
          var itemActiveLast5 =  self.find(".carousel-inner-toRight .item-last5.active");
          var firstActive = self.find(".carousel-inner-toRight .active.item-0");
        }

// row ToLeft
        if (direction == 'left' && rowToLeft) {
          slideArrowBackwardActive();
          if(limitContainerWidth >= 1680){
            itemActiveLast3.length ? slideForward(itemActiveLast2, itemActiveLast3, "", false) : $(this).carousel('next');
          }
          if(limitContainerWidth < 1680){
            itemActiveLast2.length ? slideForward(itemActiveLast2, itemActiveLast3, "", false) : $(this).carousel('next');
          }
        }
        if (direction == 'right' && rowToLeft) {
          slideArrowForwardActive();
          firstActive.length ? slideBack(firstActive) :  $(this).carousel('prev');
        }

// row ToRight
        if (direction == 'right' && rowToRight) {
          slideArrowBackwardActive();

          if(limitContainerWidth >= 1680){
            itemActiveLast4.length ? slideForward("", itemActiveLast4, itemActiveLast5, true) : $(this).carousel('prev');
          }
          if(limitContainerWidth < 1680){
            itemActiveLast3.length ? slideForward(itemActiveLast3, itemActiveLast4, itemActiveLast5, true) : $(this).carousel('prev');
          }
        }
        if (direction == 'left' && rowToRight) {
          slideArrowForwardActive();
          firstActive.length ? slideBack(firstActive) :  $(this).carousel('next');
        }
      },
      allowPageScroll:"vertical"
    });

    // animazione all'Hover sull'imagine gallery in desktop
    if(limitContainerWidth > 1182){
      carouselHover.on({
        mouseenter: function () {
          carouselHoverClick == true ? "" : rowToLeft ? carouselHover.css("transform", "translate(-15px)") : carouselHover.css("transform", "translate(15px)");
        },
        mouseleave: function () {
          carouselHoverClick == true ? "" : carouselHover.css("transform", "translate(0)");
        }
      })
    }


    var carouselIndicatorLi =  self.find(".carousel-indicators li");
    carouselIndicatorLi.on("mouseenter", function(){

      var itemPrev =  self.find(".item.prev");
      var itemNext =  self.find(".item.next");
      var active = self.find('.active.item');
      var indicatorActive = self.find(".carousel-indicators .active");
      var indicatorSlidefrom = indicatorActive.data("slide-to");
      var indicatorSlideTo = $(this).data("slide-to");

      console.log({self});
      console.log({active});
      console.log({itemPrev}, {itemNext});

      console.log( "from: " + indicatorSlidefrom + " - to: " + indicatorSlideTo);
      var differenza = indicatorSlideTo - indicatorSlidefrom;
      var differenza = Math.abs(indicatorSlidefrom - indicatorSlideTo);
      console.log(differenza);
      // var traslz = differenza * 500;

      // differenza == 2 ? rightNext.addClass("item-a") : "";
      // rightNext.addClass("item-a")
      // console.log(traslz);
  
      
      // $('.item').removeClass('activeSwipe1');
      // $('.item').removeClass('activeSwipe2');
      // $('.item').removeClass('activeSwipe3');
      // $('.item').removeClass('activeSwipe4');
      // $('.item').removeClass('activeSwipe5');
      // $('.item').removeClass('activeSwipe6');
      // $('.item').removeClass('activeSwipe7');

      carousel.removeClass('carouselSwipe1')
      carousel.removeClass('carouselSwipe2')
      carousel.removeClass('carouselSwipe3')
      carousel.removeClass('carouselSwipe4')
      carousel.removeClass('carouselSwipe5')
      carousel.removeClass('carouselSwipe6')
      carousel.removeClass('carouselSwipe7')

      switch (differenza) {
        case 2:
          console.log('case2'); 
          // active.addClass('activeSwipe2');  
          carousel.addClass('carouselSwipe2')
          break;
        case 3:
          console.log('case 3'); 
          // active.addClass('activeSwipe3');
          carousel.addClass('carouselSwipe3')
          break;
        case 4:
          console.log('case 4'); 
          // active.addClass('activeSwipe4');
          carousel.addClass('carouselSwipe4')
          break;
        case 5:
          console.log('case 5'); 
          // active.addClass('activeSwipe5');
          carousel.addClass('carouselSwipe5')
          break;
        case 6:
          console.log('case 6'); 
          // active.addClass('activeSwipe6');
          carousel.addClass('carouselSwipe6')
          break;
        case 7:
          console.log('case 7'); 
          carousel.addClass('activeSwipe7');
          break;
        default:
          console.log('case basic'); 
          // active.addClass('activeSwipe1');
          carousel.addClass('carouselSwipe1')
      }


      // (leftActive, itemPrev).css({"transform": "translate3d(-"+ traslz +"px, 0, 0)!important", 'color': 'naviblue'});
      // (rightActive, itemNext).css("transform", "translate3d("+ traslz +"px, 0, 0)!important");
      // (rightNext, rightActive).addClass("item-a");

      // active.css({"transform": "translate3d(-"+ traslz +"px, 0, 0)!important", 'color': 'naviblue'});
      // $('.item').removeClass('activeTest')
      // active.addClass('activeTest')
    });
    carouselIndicatorLi.on("click", function(){
      console.log({carouselItems});
    });


    // -----------  inverto gli elementi clonati nello slider a destra -----------
    function prependRowRight(){
      carouselItems.each(function(item){
        var itemToClone = $(this);
        if(carouselInner.is('.carousel-inner-toRight')){  
          carouselInner.prepend(itemToClone);
        }
      });
    } 
    function appendRowRight(){
      carouselItems.each(function(item){
        var itemToClone = $(this);
        if(carouselInner.is('.carousel-inner-toRight')){  
          carouselInner.append(itemToClone);
        }
      });
    } 

    var stato = false;

    if(limitContainerWidth > 976){
      prependRowRight();
      stato = true;
    }
    $(window).resize(function() {

      if( $(".limit-container").width() > 976){
        // if(stato == true){
        // }
        if(stato == false){
          prependRowRight();
        }
      }
      if( $(".limit-container").width() < 976){
        if(stato == true){
          stato = false;
          appendRowRight();
        }
        // if(stato == false){
        // }
      }
    });


    // -----------  funzioni di cambio stile per frecce slider -----------
    function slideArrowForwardActive(){
      if(rowToLeft){
        nexToLeft.css("pointer-events" , "auto");
        nexToLeft.addClass("control-active").removeClass("control-inactive");
      }
      if(rowToRight){
        prevToRight.css("pointer-events" , "auto");
        prevToRight.addClass("control-active").removeClass("control-inactive");
      }
    }
    function slideArrowForwardInactive(){
      if(rowToLeft){
        nexToLeft.css("pointer-events" , "none");
        nexToLeft.addClass("control-inactive").removeClass("control-active");
      }
      if(rowToRight){
        prevToRight.css("pointer-events" , "none");
        prevToRight.addClass("control-inactive").removeClass("control-active");
      }
    }
    function slideArrowBackwardActive(){
      if(rowToLeft){
        prevToLeft.css("pointer-events" , "auto");
        prevToLeft.addClass("control-active").removeClass("control-inactive");
      }
      if(rowToRight){
        nexToRight.css("pointer-events" , "auto");
        nexToRight.addClass("control-active").removeClass("control-inactive");
      }
    }
    function slideArrowBackwardInctive(){
      if(rowToLeft){
        prevToLeft.css("pointer-events" , "none");
        prevToLeft.addClass("control-inactive").removeClass("control-active");
      }
      if(rowToRight){
        nexToRight.css("pointer-events" , "none");
        nexToRight.addClass("control-inactive").removeClass("control-active");
      }
    }


    // -----------  apertura slider -----------
    function openCarouselFunc(){
      carouselOpen.add(carouselItems).on("click", function(e){
        e.stopPropagation();
        e.preventDefault();
        carouselItems.off("click");

        carouselHoverClick = true;

        // --- calcolo la translazione in px  -----
        var limitContainer = $(".limit-container").offset();
        // var limitContainerWidth = $(".limit-container").width();

        var limiTransitiontoLeft = $(".component-galleryRoll-row.multImg.toLeft .slide.carousel-fullWidth").offset();
        var limiTransitiontoRight = $(".component-galleryRoll-row.multImg.toRight > .component-galleryRoll-row-text").offset();
        var calcToLef = Math.abs(limitContainer.left - limiTransitiontoLeft.left +10);
        if(limitContainerWidth > 1199){
          var calcToRight = Math.abs(limitContainer.left - limiTransitiontoRight.left );
        }else {
          var calcToRight = Math.abs(limitContainer.left - limiTransitiontoRight.left -5);
        }

        rowToLeft ? self.css('transform', 'translate( -'+ calcToLef +'px )') : self.css('transform', 'translate( '+ calcToRight +'px )');

        // --- a fine animazione modifica visibiltà elementi  -----
        parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
          function(event) {
            carouselOpen.addClass('hidden');
            carouselClose.removeClass('hidden');
            carouselClose.css("animation", "showClose 250ms ease-in-out both");
            rowToLeft ? carouselClose.css("animation", "showCloseLeft 250ms ease-in-out both") : carouselClose.css("animation", "showCloseRight 250ms ease-in-out both");;

            slideArrowForwardActive();

            if(limitContainerWidth >= 1680 && carouselItems.length > 3){
              carouselControls.removeClass('hidden');
            }
            if(limitContainerWidth < 1680  && carouselItems.length > 2){
              carouselControls.removeClass('hidden');
            }
          });
      });
    }
    openCarouselFunc();


    // -----------  chiusura slider -----------
    // function closeCarouselFunc(){
    carouselClose.on("click", function(e){
      e.stopPropagation();

      carouselHoverClick = false;
      var itamActive;
      carouselItems.each(function(item){
        var active = $(this).hasClass("active"); 
        if(active == true) { return itamActive = item; }
      });
      lastItemTranslate == true ? carouselInner.css({"transform" : "translateX(0px)", "transition-duration" : "0.7s"}) : "";

      self.css('transform', '');

      carouselOpen.removeClass('hidden');
      carouselControls.addClass('hidden');

      rowToLeft ? carouselClose.css("animation", "showCloseCloseLeft 250ms ease-in-out both") : carouselClose.css("animation", "showCloseCloseRight 250ms ease-in-out both");;
      
      carouselItems.each(function(item){
        item == 0 ? $(this).addClass("active") : $(this).removeClass("active");
      });
     
      slideArrowBackwardInctive();

      // --- a fine animazione modifica visibiltà elementi  -----
      parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          carouselClose.css("animation", "");
          carouselClose.addClass('hidden');
        });
        
       carouselItems.on("click", openCarouselFunc());

    });
    // }
    // closeCarouselFunc();


    // -----------  gestione controller slider  -----------
    function slideBack(firstActive){
      lastItemTranslate == true ? carouselInner.css({"transform" : "translateX(0px)", "transition-duration" : "0.7s"}) : "";
      if(rowToLeft){
        slideArrowForwardActive();
        if(firstActive.length == 1){
          slideArrowBackwardInctive();
        }
      }
      if(rowToRight){
        slideArrowForwardActive();
        if(firstActive.length == 1){
          slideArrowBackwardInctive();
        }
      }
    };
    function slideForward(itemActiveLast3, itemActiveLast4, itemActiveLast5, swipe){
      var limitContainerWidth = $(".limit-container").width();
      if(rowToLeft){
        slideArrowBackwardActive();

        if(limitContainerWidth >= 1680){
          if(itemActiveLast4 && itemActiveLast4.length) {
            carouselInner.css({"transform" : "translateX(-297px)", "transition-duration" : "0.7s"});
            lastItemTranslate = true;
            slideArrowForwardInactive();
            self.find(".item-last3 .cloneditem-3").addClass("hidden");
          }
        }
        if(limitContainerWidth < 1680){
          if(itemActiveLast3 && itemActiveLast3.length) {
            carouselInner.css({"transform" : "translateX(-160px)", "transition-duration" : "0.7s"});
            lastItemTranslate = true;
            slideArrowForwardInactive();
            self.find(".item-last3 .cloneditem-3").addClass("hidden");
            self.find(".item-last2 .cloneditem-3").addClass("hidden");
          }
        }
      }

      if(rowToRight){
        slideArrowBackwardActive();

        if(limitContainerWidth >= 1680){
          if(itemActiveLast5 && itemActiveLast5.length || swipe == true && itemActiveLast4 && itemActiveLast4.length) {
            slideArrowForwardInactive();

            carouselInner.css({"transform" : "translateX(300px)", "transition-duration" : "0.7s"});
            lastItemTranslate = true;
          }
        }
        if(limitContainerWidth < 1680){
          if(itemActiveLast4 && itemActiveLast4.length && swipe == false || swipe == true && itemActiveLast3 && itemActiveLast3.length) {

            slideArrowForwardInactive();
  
            carouselInner.css({"transform" : "translateX(140px)", "transition-duration" : "0.7s"});
            lastItemTranslate = true;
          }
        }
      };
    };


    // -----------  gestione controller slider ToLeft -----------
    nexToLeft.on('click', function(){

      var itemActiveLast4 =  self.find(".carousel-inner-toLeft .item-last5.active");
      var itemActiveLast3 =  self.find(".carousel-inner-toLeft .item-last4.active");
      var itemActiveLast2 =  self.find(".carousel-inner-toLeft .item-last3.active");

      slideForward(itemActiveLast3, itemActiveLast4, "", false);
    })

    prevToLeft.on('click', function(){
      var firstActive = self.find(".carousel-inner-toLeft .active.item-1");

      slideBack(firstActive);
    })


    // -----------  gestione controller slider ToRight -----------
    prevToRight.on('click', function(){
      var itemActiveLast3 =  self.find(".carousel-inner-toRight .item-last3.active");
      var itemActiveLast4 =  self.find(".carousel-inner-toRight .item-last4.active");
      var itemActiveLast5 =  self.find(".carousel-inner-toRight .item-last5.active");

      slideForward("", itemActiveLast4, itemActiveLast5, false);
    })

    nexToRight.on('click', function(){
      var firstActive = self.find(".carousel-inner-toRight .active.item-1");

      slideBack(firstActive);
    })


    // -----------  video youtube modal -----------    
    autoPlayYouTubeModal();
    function autoPlayYouTubeModal() {
      var trigger = self.find('[data-toggle="modal"]');

      trigger.click(function () {
        var theModal = $(this).data("target");
        var videoSRC = $(this).attr("data-theVideo");
        var videoSRCauto = videoSRC + "?&theme=dark&autoplay=1&autohide=2&modestbranding=1&showinfo=0&rel=0";
        console.log(theModal, videoSRC, videoSRCauto);
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
          $(theModal + ' iframe').attr('src', videoSRC);
        });
      });
    }


  });


  $('.component-galleryRoll-row.singleImg .item-list-video').on('click', function(e){
    var self = $(this);
    autoPlayYouTubeModal2(self);
  });

  var autoPlayYouTubeModal2 = function(self) {
      var theModal = self.data("target");
      var videoSRC = self.attr("data-theVideo");
      var videoSRCauto = videoSRC + "?&theme=dark&autoplay=1&autohide=2&modestbranding=1&showinfo=0&rel=0";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal + ' button.close').click(function () {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
  }

});

