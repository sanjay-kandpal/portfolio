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


// Confetti
document.addEventListener('DOMContentLoaded', function() {
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.top = '0';
  confettiContainer.style.left = '0';
  confettiContainer.style.width = '100%';
  confettiContainer.style.height = '100%';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = '9999';
  document.body.appendChild(confettiContainer);

  const colors = [
    '#ff0000',  // Red
    '#ffff00',  // Yellow
    '#00ff00',  // Green
    '#0000ff',  // Blue
    '#ff00ff',  // Magenta
    '#ffffff',  // White
    '#000000',  // Black
    '#ff8000',  // Orange
    '#800080',  // Purple
    '#00ffff',  // Cyan
    '#808000',  // Olive
    '#800000',  // Maroon
    '#008080',  // Teal
    '#ff1493',  // Deep Pink
    '#4b0082',  // Indigo
    '#a52a2a',  // Brown
    '#d3d3d3',  // Light Grey
    '#c0c0c0',  // Silver
    '#ff6347',  // Tomato
    '#4682b4',  // Steel Blue
    '#32cd32',  // Lime Green
    '#ffd700'   // Gold
  ];
  

  function createConfetti(x, y) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confettiContainer.appendChild(confetti);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 3 + Math.random() * 3;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    const animation = confetti.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx * 100}px, ${dy * 100}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: 1000 + Math.random() * 1000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
    });

    animation.onfinish = () => confetti.remove();
  }

  function burst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (let i = 0; i < 100; i++) {
      setTimeout(() => createConfetti(centerX, centerY), Math.random() * 500);
    }
  }

  function crackerEffect() {
    burst();
    const burstInterval = setInterval(burst, 2000);

    setTimeout(() => {
      clearInterval(burstInterval);
      setTimeout(() => {
        confettiContainer.remove();
      }, 2000);
    }, 100);
  }

  crackerEffect();
});