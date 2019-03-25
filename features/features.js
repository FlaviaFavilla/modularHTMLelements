$(document).ready(function(){

    // -----------  SELEZIONE TUTTI gli slider features, funzioni al clicl sul singolo  -----------
      $('.component-features .carousel-showmanymoveone').each(function(index) {
    
        var carousel = $(this);
        var carouselIndicators =  $(this).find(".carousel-indicators");
        var carouselItems =  $(this).find(".carousel-inner > .item");

    
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
          // segno l'ultimo elemento clonato per il positioning in tablet portrait
          $(this).children().last().addClass('cloneditem-last');
        });
    
    
    
        // ----------- Genera ID degli sliders  -----------
        carousel.attr('id', 'slider-' + index);    
    
      });
    
    
    
    });
    
    