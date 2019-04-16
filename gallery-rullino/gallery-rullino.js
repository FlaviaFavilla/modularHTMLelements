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

    var rowImage =  self.parent().find(".component-galleryRoll-row-img"); 
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
    $(".carousel").swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == 'left') $(this).carousel('next');
        if (direction == 'right') $(this).carousel('prev');
      },
      allowPageScroll:"vertical"
    });


    // animazione all'Hover sull'imagine gallery in desktop
    // if(limitContainerWidth > 1182){
    //   rowContainer.on({
    //     mouseenter: function () {
    //       rowImage.css("transform", "translate(-15px)");
    //     },
    //     mouseleave: function () {
    //       rowImage.css("transform", "translate(15px)");
    //     }
    //   })
    // }


 
    $('.carousel').on('slide.bs.carousel', function () {

      var carouselIndicatorLi =  self.find(".carousel-indicators li");
      var rightActive = $(".component-galleryRoll .carousel-showmanymoveone .carousel-inner > .item.active.right");
      var itemNext = $(".component-galleryRoll .carousel-showmanymoveone .carousel-inner > .item.next");
      var leftActive = $(".component-galleryRoll .carousel-showmanymoveone .carousel-inner > .item.active.left");
      var itemPrev = $(".component-galleryRoll .carousel-showmanymoveone .carousel-inner > .item.prev");
      // console.log(rightActive, itemNext, leftActive, itemPrev);

      carouselIndicatorLi.on("click", function(){

        var indicatorActive = self.find(".carousel-indicators .active");
        var indicatorSlidefrom = indicatorActive.data("slide-to");
        var indicatorSlideTo = $(this).data("slide-to");
  
  
        console.log( "from: " + indicatorSlidefrom + " - to: " + indicatorSlideTo);
        var differenza = indicatorSlideTo - indicatorSlidefrom;
        var differenza = Math.abs(indicatorSlidefrom - indicatorSlideTo);
        console.log(differenza);
        var traslz = differenza * 500;
  
        // differenza == 2 ? rightNext.addClass("item-a") : "";
        // rightNext.addClass("item-a")
        console.log(traslz);

        (leftActive, itemPrev).css("transform", "translate3d(-"+ traslz +"px, 0, 0)");
        (rightActive, itemNext).css("transform", "translate3d("+ traslz +"px, 0, 0)");
        // (rightNext, rightActive).addClass("item-a");
      });
    })




    function generateIdicators(item){
      // ----------- Genera gli Indicators dello slider  -----------
      carouselIndicators.append("<li data-slide-to='"+ item +"' data-target='#slider-"+ index +"'></li>" );
      if(item === 0) {
        carouselIndicators.children().first().addClass('active');
      }
    }

    // inverto gli elementi clonati nello slider a destra
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


    // -----------  apertura slider -----------
    function openCarousel(){
      carouselOpen.add(carouselItems).on("click", function(e){
        e.stopPropagation();
        e.preventDefault();
        carouselItems.off("click");

        // --- calcolo la translazione in px  -----
        var limitContainer = $(".limit-container").offset();
        // var limitContainerWidth = $(".limit-container").width();


        var limiTransitiontoLeft = $(".component-galleryRoll-row.multImg.toLeft .slide.carousel-fullWidth").offset();
        var limiTransitiontoRight = $(".component-galleryRoll-row.multImg.toRight > .component-galleryRoll-row-text").offset();
        var calcToLef = Math.abs(limitContainer.left - limiTransitiontoLeft.left);
        if(limitContainerWidth > 1199){
          var calcToRight = Math.abs(limitContainer.left - limiTransitiontoRight.left -15);
        }else {
          var calcToRight = Math.abs(limitContainer.left - limiTransitiontoRight.left -10);
        }

        rowToLeft ? self.css('transform', 'translate( -'+ calcToLef +'px )') : self.css('transform', 'translate( '+ calcToRight +'px )');

        // --- a fine animazione modifica visibiltà elementi  -----
        parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
          function(event) {
            carouselOpen.addClass('hidden');
            carouselClose.removeClass('hidden');
            carouselClose.css("animation", "showClose 250ms ease-in-out both");
            rowToLeft ? carouselClose.css("animation", "showCloseLeft 250ms ease-in-out both") : carouselClose.css("animation", "showCloseRight 250ms ease-in-out both");;

            if(limitContainerWidth >= 1680 && carouselItems.length > 3){
              carouselControls.removeClass('hidden');
            }
            if(limitContainerWidth < 1680  && carouselItems.length > 2){
              carouselControls.removeClass('hidden');
            }
          });
      });
    }
    openCarousel();


    // -----------  chiusura slider -----------
    function closeCarousel(){
    carouselClose.on("click", function(e){
      e.stopPropagation();

      var itamActive;
      carouselItems.each(function(item){
        var active = $(this).hasClass("active"); 
        if(active == true) { return itamActive = item; }
      });

      self.css('transform', '');
      carouselOpen.removeClass('hidden');
      carouselControls.addClass('hidden');
      // carouselClose.css("animation", "showCloseClose 250ms ease-in-out both");
      rowToLeft ? carouselClose.css("animation", "showCloseCloseLeft 250ms ease-in-out both") : carouselClose.css("animation", "showCloseCloseRight 250ms ease-in-out both");;
      
      carouselItems.each(function(item){
        item == 0 ? $(this).addClass("active") : $(this).removeClass("active");
      });
      prevToLeft.css("pointer-events" , "none");
      prevToLeft.addClass("control-inactive").removeClass("control-active");
      nexToRight.css("pointer-events" , "none");
      nexToRight.addClass("control-inactive").removeClass("control-active");


      // --- a fine animazione modifica visibiltà elementi  -----
      parent.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
          carouselClose.css("animation", "");
          carouselClose.addClass('hidden');
        });
        
      carouselItems.on("click", openCarousel());

    });
    }
    closeCarousel();


    // -----------  gestione controller slider ToLeft -----------
    nexToLeft.on('click', function(){

      var itemActiveLast3 =  self.find(".carousel-inner-toLeft .item-last4.active");
      var itemActiveLast2 =  self.find(".carousel-inner-toLeft .item-last3.active");
      var limitContainerWidth = $(".limit-container").width();

      console.log(itemActiveLast3.length, itemActiveLast2.length);

      if(limitContainerWidth >= 1680){
        if(itemActiveLast3 && itemActiveLast3.length) {
          nexToLeft.css("pointer-events", "none");
          nexToLeft.addClass("control-inactive").removeClass("control-active");

          self.find(".item-last3 .cloneditem-3").addClass("hidden");

        }
      }
      if(limitContainerWidth < 1680){
        if(itemActiveLast3 && itemActiveLast3.length) {
          carouselInner.css({"transform" : "translateX(-160px)", "transition-duration" : "0.7s"});
          nexToLeft.css("pointer-events" , "none");
          nexToLeft.addClass("control-inactive").removeClass("control-active");
          self.find(".item-last3 .cloneditem-3").addClass("hidden");
          self.find(".item-last2 .cloneditem-3").addClass("hidden");
        }
        // if(itemActiveLast2 && itemActiveLast2.length) {
        //   nexToLeft.css("pointer-events" , "none");
        //   nexToLeft.addClass("control-inactive").removeClass("control-active");
        //   self.find(".item-last3 .cloneditem-3").addClass("hidden");
        //   self.find(".item-last2 .cloneditem-3").addClass("hidden");
        // }
      }
      prevToLeft.css("pointer-events" , "auto");
      prevToLeft.addClass("control-active").removeClass("control-inactive");
    })

    prevToLeft.on('click', function(){
      var firstActive = self.find(".carousel-inner-toLeft .active.item-1");

      carouselInner.css({"transform" : "translateX(0px)", "transition-duration" : "0.7s"});
      nexToLeft.css("pointer-events" , "auto");
      nexToLeft.addClass("control-active").removeClass("control-inactive");
      if(firstActive.length == 1){
        prevToLeft.css("pointer-events" , "none");
        prevToLeft.addClass("control-inactive").removeClass("control-active");
      }
    })


    // -----------  gestione controller slider ToRight -----------
    prevToRight.on('click', function(){
      nexToRight.css("pointer-events" , "auto");
      nexToRight.addClass("control-active").removeClass("control-inactive");
      
      var itemActiveLast3 =  self.find(".carousel-inner-toRight .item-last3.active");
      var itemActiveLast4 =  self.find(".carousel-inner-toRight .item-last4.active");
      var limitContainerWidth = $(".limit-container").width();

      if(limitContainerWidth >= 1680){
        if(itemActiveLast4 && itemActiveLast4.length) {
          prevToRight.css("pointer-events" , "none");
          prevToRight.addClass("control-inactive").removeClass("control-active");
        }
      }
      if(limitContainerWidth < 1680){
        if(itemActiveLast4 && itemActiveLast4.length) {
          prevToRight.css("pointer-events" , "none");
          prevToRight.addClass("control-inactive").removeClass("control-active");

          carouselInner.css({"transform" : "translateX(140px)", "transition-duration" : "0.7s"});
        }
//         if(itemActiveLast3 && itemActiveLast3.length) {
//           prevToRight.css("pointer-events" , "none");
//           prevToRight.addClass("control-inactive").removeClass("control-active");
// console.log("ok")
          
//             carouselInner.css({"transform" : "translateX(140px)", "transition-duration" : "0.7s"});
//         }
      }
    })

    nexToRight.on('click', function(){
      var firstActive = self.find(".carousel-inner-toRight .active.item-1");
      carouselInner.css({"transform" : "translateX(0px)", "transition-duration" : "0.7s"});

      prevToRight.css("pointer-events" , "auto");
      prevToRight.addClass("control-active").removeClass("control-inactive");

      if(firstActive.length == 1){
        nexToRight.css("pointer-events" , "none");
        nexToRight.addClass("control-inactive").removeClass("control-active");
      }
    })


    // -----------  video youtube modal -----------    
    autoPlayYouTubeModal();
    function autoPlayYouTubeModal() {
      var trigger = self.find('[data-toggle="modal"]');
      // console.log(trigger);
      trigger.click(function () {
        var theModal = $(this).data("target");
        var videoSRC = $(this).attr("data-theVideo");
        var videoSRCauto = videoSRC + "?&theme=dark&autoplay=1&autohide=2&modestbranding=1&showinfo=0&rel=0";
        console.log(theModal, videoSRC, videoSRCauto);
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
          $(theModal + ' iframe').attr('src', videoSRC);
        });
        // console.log(theModal);
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

