var words = ['Hello! I am Full-Stack Developer.'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;

var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;        
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    
    // Split the text and wrap "Full-Stack Developer" in a span
    var highlightedText = part.replace(
      /(Full-Stack Developer)/g, 
      '<span class="highlight">$1</span>'
    );
    
    $('#about-para').html(highlightedText);

    // Update highlight width
    var fullPhrase = "Full-Stack Developer";
    var visiblePart = part.match(/Full-Stack Developer/);
    if (visiblePart) {
      var percentage = (visiblePart[0].length / fullPhrase.length) * 100;
      $('.highlight').css('--highlight-width', percentage + '%');
    }
  }, speed);
};

$(document).ready(function () {
  wordflick();
  
  // Add CSS for the highlight class and animation
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .highlight {
        background-image: linear-gradient(to right, yellow var(--highlight-width, 0%), transparent var(--highlight-width, 0%));
        background-repeat: no-repeat;
        transition: background-image 111.8s ease-out;
      }
    `)
    .appendTo('head');
});