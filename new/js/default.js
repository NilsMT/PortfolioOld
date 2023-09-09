const target = document.getElementById("myfooter");
target.textContent = "Réalisé avec amour par Nils Moreau--Thomas | Copyright © " + (new Date().getFullYear()).toString() + " Tous droits réservés";

const headerItems = document.getElementById('header-items');
const collapseHeader = document.getElementById('collapse-header');

collapseHeader.addEventListener('click', () => {
    if (headerItems.style.display!="none") {
        collapseHeader.textContent = 'Menu ▼';
        headerItems.style.display='none';
    } else {
        collapseHeader.textContent = 'Menu ▲';
        headerItems.style.display='';
    }
});
