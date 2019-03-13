$(document).ready(function(){

    //  -------------  Add smooth scrolling to anchor button  ----------------------
    $("a.cta-button[href^='#']").on('click', function(event) {  
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
    //  -------------  END smooth scrolling to anchor button  ----------------------



  });