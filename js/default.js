const target = document.getElementById("myfooter");
target.textContent = "Réalisé avec amour par Nils Moreau--Thomas | Copyright © " + (new Date().getFullYear()).toString() + " Tous droits réservés";

const headerItems = document.getElementById('header-items');
const collapseHeader = document.getElementById('collapse-header');

//le collapse par défault
collapseHeader.textContent = 'Menu ▼';
headerItems.style.display='none';
//l'event du bouton
collapseHeader.addEventListener('click', () => {
    if (headerItems.style.display!="none") {
        collapseHeader.textContent = 'Menu ▼';
        headerItems.style.display='none';
    } else {
        collapseHeader.textContent = 'Menu ▲';
        headerItems.style.display='';
    }
});

//l'event des liens
const headerlinks = document.querySelectorAll('.header-item');
headerlinks.forEach (headerlink => {
    //avoid the collapse button (as it have the same class)
    if(headerlink.id != "collapse-header") {
        headerlink.addEventListener('click', () => {
            collapseHeader.textContent = 'Menu ▼';
            headerItems.style.display='none';
        });
    }
});

//fade animation manager
const contentElements = document.querySelector(".content");
const targets = contentElements.querySelectorAll("*");

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fadeIn");
      entry.target.classList.remove("fadeOut");
    } else {
      entry.target.classList.add("fadeOut");
      entry.target.classList.remove("fadeIn");
    }
  });
});

targets.forEach(image => {
  observer.observe(image);
});

//option dev
const footer = document.getElementById("myfooter");
const hitboxes = document.querySelectorAll("*");
var click=false
footer.addEventListener("click", function () {
  console.warn("clicked");
    click= !click
    //affiche les hitbox ou non
    hitboxes.forEach(hitbox => {
        if (click==true) {
            hitbox.style.border = "1px solid #00ff00";
        } else {
            hitbox.style.border = "";
        }
    });
});