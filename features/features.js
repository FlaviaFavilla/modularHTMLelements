$(document).ready(function(){

    // -----------  SELEZIONE TUTTI gli slider features, funzioni al clicl sul singolo  -----------
      $('.component-features .carousel-showmanymoveone').each(function(index) {
    
        var carousel = $(this);
        var carouselIndicators =  $(this).find(".carousel-indicators");
        var carouselItems =  $(this).find(".carousel-inner > .item");
        var carouselItemList =  $(this).find(".carousel-inner > .item > .item-list");
        var simpleItems =  $(this).parents().find(".simple-view.row");
        var simpleItemsClass;


        // -----------  generazione degli elementi features per BIG device (senza slider)  -----------
          switch(carouselItemList.length) {
            case 1: simpleItemsClass = "col-md-12";  break;
            case 2: simpleItemsClass = "col-md-6";  break;
            case 3: simpleItemsClass = "col-md-4";  break;
            default: simpleItemsClass = "col-md-3";
          }

         carouselItemList.each(function(){
          simpleItems.append( "<div class='col-xs-12 col-sm-4 "+ simpleItemsClass +" item'><div class='item-list'>" + $(this).html() + " </div></div>" );
         });

    
        // -----------  generazione cloni immagine slider  -----------
        carouselItems.each(function(item){
          var itemToClone = $(this);
    
          for (var i=1; i < carouselItems.length; i++) {
            itemToClone = itemToClone.next();
            // wrap around if at end of item collection
            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }
            
            // nascondo gli elementi da non visalizzare in portrait
            var smHidden = i > 2 ? "hidden-sm" : "";

            // grab item, clone, add marker class, add to collection
            itemToClone.children(':first-child').clone()
              .addClass(smHidden + " item-list hidden-xs cloneditem-"+(i) )
              .appendTo($(this));
          }


          // ----------- Genera gli Indicators dello slider  -----------
          carouselIndicators.append("<li data-slide-to='"+ item +"' data-target='#slider-"+ index +"'></li>" );
          if(item === 0) {
            carouselIndicators.children().first().addClass('active');
          }

        });

        // ----------- Nascondo gli slider indicators in eccesso  -----------
        carouselIndicators.children().each(function(index){
          if(index > carouselIndicators.children().length-3) $(this).addClass('hidden-sm');
        });

        // ----------- Genera ID degli sliders  -----------
        carousel.attr('id', 'slider-' + index);    
    
      });
    
    });
    
    