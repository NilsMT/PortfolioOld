function addHexColors(color1, color2, darker) {
    // Function to convert a hexadecimal color to RGB
    function hexToRGB(hex) {
      // Remove the '#' character if it's present
      hex = hex.replace(/^#/, '');
  
      // Parse the red, green, and blue components
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
  
      return [r, g, b];
    }
  
    // Function to convert RGB to a hexadecimal color
    function RGBToHex(rgb) {
      return (
        '#' +
        rgb
          .map((component) => {
            const hex = component.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          })
          .join('')
      );
    }
  
    // Convert the input colors to RGB arrays
    const rgb1 = hexToRGB(color1);
    const rgb2 = hexToRGB(color2);
    var resultRGB
    if (darker==true) {
        // Perform component-wise addition
        resultRGB = rgb1.map((component, index) => {
            return Math.min(255, component - rgb2[index]);
        });
    } else {
        // Perform component-wise addition
        resultRGB = rgb1.map((component, index) => {
            return Math.min(255, component + rgb2[index]);
        });
    }
    // Convert the result back to a hexadecimal color
    const finalColor = RGBToHex(resultRGB);
  
    return finalColor;
}

function invertColor(hex) {
  // Remove the '#' character if present
  hex = hex.replace(/^#/, '');

  // Convert the hex color to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate the inverted RGB values
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  // Convert the inverted RGB values back to hex
  const invertedHex = `#${invertedR.toString(16).padStart(2, '0')}${invertedG.toString(16).padStart(2, '0')}${invertedB.toString(16).padStart(2, '0')}`;

  return invertedHex;
}

function variant() {
  document.body.style.setProperty('--bgdark',addHexColors(document.body.style.getPropertyValue('--bg'),inc,true))
  document.body.style.setProperty('--bglight',addHexColors(document.body.style.getPropertyValue('--bg'),inc,false))
  
  document.body.style.setProperty('--primarydark',addHexColors(document.body.style.getPropertyValue('--primary'),inc,true))
  document.body.style.setProperty('--primarylight',addHexColors(document.body.style.getPropertyValue('--primary'),inc,false))
  
  document.body.style.setProperty('--secondarydark',addHexColors(document.body.style.getPropertyValue('--secondary'),inc,true))
  document.body.style.setProperty('--secondarylight',addHexColors(document.body.style.getPropertyValue('--secondary'),inc,false))
  
  document.body.style.setProperty('--accentdark',addHexColors(document.body.style.getPropertyValue('--accent'),inc,true))
  document.body.style.setProperty('--accentlight',addHexColors(document.body.style.getPropertyValue('--accent'),inc,false))

  document.body.style.setProperty('--texttrans',invertColor(document.body.style.getPropertyValue('--text'))+"55")
  document.body.style.setProperty('--opptext',invertColor(document.body.style.getPropertyValue('--text')))

  document.body.style.setProperty('--oppbg',invertColor(document.body.style.getPropertyValue('--bg')))
  document.body.style.setProperty('--oppbglight',addHexColors(document.body.style.getPropertyValue('--oppbg'),inc,false))
  document.body.style.setProperty('--oppbgdark',addHexColors(document.body.style.getPropertyValue('--oppbg'),inc,true))


  document.body.style.setProperty('--banner',document.body.style.getPropertyValue('--bgdark')+"CC")
}
/////////////////////////
// DEFAULT PALETTE
////////////////////////
const themeButton = document.getElementById("theme");
const inc = "#151515"

document.body.style.setProperty('--text',"#ffffff")
document.body.style.setProperty('--bg',"#313131")
document.body.style.setProperty('--primary',"#a100ff")
document.body.style.setProperty('--secondary',"#f0b22e")
document.body.style.setProperty('--accent',"#3734eb")
/////////////////////////
// CHECK URL VALUES
////////////////////////
const queryParams = new URLSearchParams(window.location.search)

var lightp = queryParams.get('light') === 'true';
if (lightp==false) {
    document.body.style.setProperty('--text',"#ffffff")
    document.body.style.setProperty('--bg',"#313131")
    document.body.style.setProperty('--texttrans',invertColor(document.body.style.getPropertyValue('--text'))+"55")
    document.getElementById("icon").className = "fa-solid fa-moon"
} else {
    document.body.style.setProperty('--text',"#000000")
    document.body.style.setProperty('--bg',"#d1d1d1")
    document.body.style.setProperty('--texttrans',invertColor(document.body.style.getPropertyValue('--text'))+"55")
    document.getElementById("icon").className = "fa-regular fa-sun"
}

/*update page links*/
const pageLinks = document.querySelectorAll('.page-link');
pageLinks.forEach (link => {
  const pagehref = link.getAttribute('href')
  if (link.tagName =="A" & pagehref!=null) {
    link.setAttribute('href',pagehref.split('?')[0]+"?light="+lightp.toString())
  }
});

variant()
/////////////////////////
// CHECK THEME BUTTON
////////////////////////
if (themeButton!=null) {
  themeButton.addEventListener("click", function() {
    if (lightp == true) {
      lightp = false
    } else {
      lightp = true
    }
    themereload=true;
    window.location.href = window.location.href.split('?')[0]+"?light="+lightp.toString()
  });
}

/////////////////////////
// SAVE SCROLL POSITION
////////////////////////
const accueilButtons = document.querySelectorAll('.page-link');
var gohome = false;
// reset le scroll si on clique sur accueil
accueilButtons.forEach(function (button) {
  if (button.textContent.includes('Accueil')) {
    button.addEventListener('click', function () {
      gohome = true
    });
  }
});

// scroll a la position sauvegardée
document.addEventListener("DOMContentLoaded", function(event) { 
  var scrollpos = localStorage.getItem('scrollpos');
  if (scrollpos!=0) window.scrollTo(0, scrollpos);
});

// sauvegarde la position de scroll
window.onbeforeunload = function(e) {
  if (gohome==true) {
    gohome=false;
    localStorage.setItem('scrollpos', 0)
  } else {
    localStorage.setItem('scrollpos', window.scrollY);
  };
};