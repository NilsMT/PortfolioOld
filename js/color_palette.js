/////////////////////////
// COLOR OPERATIONS
////////////////////////
function hexToRGB(hex) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
}
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
function addHexColors(color1, color2, darker) {
  const rgb1 = hexToRGB(color1);
  const rgb2 = hexToRGB(color2);
  var resultRGB
  if (darker==true) {
      resultRGB = rgb1.map((component, index) => {
          return Math.min(255, component - rgb2[index]);
      });
  } else {
      resultRGB = rgb1.map((component, index) => {
          return Math.min(255, component + rgb2[index]);
      });
  }
  const finalColor = RGBToHex(resultRGB);
  return finalColor;
}
function invertColor(hex) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;
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
// GET THEME COOKIE
////////////////////////
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
/////////////////////////
// CHECK URL VALUES
////////////////////////
function checkforthemetoload() {
  if (getCookie("isLight")==='true') {
    document.body.style.setProperty('--text',"#000000")
    document.body.style.setProperty('--bg',"#d1d1d1")
    document.body.style.setProperty('--primary',"#a100ff")
    document.body.style.setProperty('--secondary',"#f0b22e")
    document.body.style.setProperty('--accent',"#3734eb")

    document.getElementById("icon").className = "fa-regular fa-sun"
  } else if (getCookie("isLight")==='false') {
    document.body.style.setProperty('--text',"#ffffff")
    document.body.style.setProperty('--bg',"#313131")
    document.body.style.setProperty('--primary',"#7300b6")
    document.body.style.setProperty('--secondary',"#c89425")
    document.body.style.setProperty('--accent',"#2f2ccd")

    document.getElementById("icon").className = "fa-solid fa-moon"
  }
  variant()
}
/////////////////////////
// CHECK THEME BUTTON
////////////////////////
const themeButton = document.getElementById("theme");
if (themeButton!=null) {
  themeButton.addEventListener("click", function() {
    if (getCookie("isLight") === 'true') {
      setCookie('isLight',"false");
    } else {
      setCookie('isLight',"true");
    }
    checkforthemetoload();
  });
}



function setCookie(name, value) {
  // Check if cookie with the same name already exists
  var existingCookie = getCookie(name);
  if (existingCookie !== "") {
      // If cookie with the same name exists, remove it first
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  
  var date = new Date();
  date.setFullYear(date.getFullYear() + 1); // Add one year to the current year
  date.setHours(23, 59, 59, 0); // Set time to midnight of the last day of the next year
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  var cookieName = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }
  return "";
}
/////////////////////////
// DEFAULT BEHAVIOR
////////////////////////
const inc = "#151515"
//palette
document.body.style.setProperty('--text',"#ffffff")
document.body.style.setProperty('--bg',"#313131")
document.body.style.setProperty('--primary',"#a100ff")
document.body.style.setProperty('--secondary',"#f0b22e")
document.body.style.setProperty('--accent',"#3734eb")
//
checkforthemetoload()