$(function() {
 
    var gallery = $('#gallery ul'),
        items   = gallery.find('li'),
        len     = items.length,
        current = 1,  /* the current item we're looking */
        
        first   = items.filter(':first'),
        last    = items.filter(':last'),
        
        triggers = $('button');
    
    /* 1. Cloning first and last item */
    first.before(last.clone(true)); 
    last.after(first.clone(true)); 
    
    /* 2. Set button handlers */
    triggers.on('click', function() {
      
      if (gallery.is(':not(:animated)')) {
       
          var cycle = false,
              delta = (this.id === "prev")? -1 : 1;
              /* in the example buttons have id "prev" or "next" */  
      
          gallery.animate({ left: "+=" + (-100 * delta) }, function() {
        
              current += delta;
         
              /** 
               * we're cycling the slider when the the value of "current" 
               * variable (after increment/decrement) is 0 or when it exceeds
               * the initial gallery length
               */          
              cycle = !!(current === 0 || current > len);
         
              if (cycle) {
                  /* we switched from image 1 to 4-cloned or 
                     from image 4 to 1-cloned */
                  current = (current === 0)? len : 1; 
                  gallery.css({left:  -100 * current });
              }
          });   
       }
      
    });
  });