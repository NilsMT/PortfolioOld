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

const inc = "#151515"

document.body.style.setProperty('--text',"#ffffff")
document.body.style.setProperty('--bg',"#313131")
document.body.style.setProperty('--primary',"#a100ff")
document.body.style.setProperty('--secondary',"#f0b22e")
document.body.style.setProperty('--accent',"#3734eb")

document.body.style.setProperty('--bgdark',addHexColors(document.body.style.getPropertyValue('--bg'),inc,true))
document.body.style.setProperty('--bglight',addHexColors(document.body.style.getPropertyValue('--bg'),inc,false))

document.body.style.setProperty('--primarydark',addHexColors(document.body.style.getPropertyValue('--primary'),inc,true))
document.body.style.setProperty('--primarylight',addHexColors(document.body.style.getPropertyValue('--primary'),inc,false))

document.body.style.setProperty('--secondarydark',addHexColors(document.body.style.getPropertyValue('--secondary'),inc,true))
document.body.style.setProperty('--secondarylight',addHexColors(document.body.style.getPropertyValue('--secondary'),inc,false))

document.body.style.setProperty('--accentdark',addHexColors(document.body.style.getPropertyValue('--accent'),inc,true))
document.body.style.setProperty('--accentlight',addHexColors(document.body.style.getPropertyValue('--accent'),inc,false))

console.log(document.body.style.getPropertyValue("--accentlight"))