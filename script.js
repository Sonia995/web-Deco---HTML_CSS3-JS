"use strict";

// ================================= Cursor =================================================//

document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.getElementById("cursor");

  function moveCursor(event) {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  }

  document.addEventListener("mousemove", moveCursor);

  const hoverTargets = document.querySelectorAll(".hover-target");

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseover", function () {
      cursor.classList.add("hover");
    });
    target.addEventListener("mouseout", function () {
      cursor.classList.remove("hover");
    });
  });
});

// ======================= NAV =======================================================================//

// SCROLL

let lastKnownScrollPosition = 0;

function changeColorNav(scrollPos) {
  document.querySelector(".nav").style.backgroundColor = "rgba(255, 251, 248, 0.8";
}



document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (lastKnownScrollPosition) {
    window.requestAnimationFrame(() => {
        changeColorNav(lastKnownScrollPosition);
    });
  } else {
    document.querySelector(".nav").style.backgroundColor = "var(--main-color)";
  }

});

// TOGGLE

let menuIcon = document.querySelector(".menuIcon");
let itemsList = document.querySelector("ul");
let nav = document.querySelector('.fullpageMenu');


menuIcon.addEventListener("click", () => {
    nav.classList.toggle('active');
    menuIcon.classList.toggle('active');
});

itemsList.addEventListener("click", () => {
  nav.classList.toggle('active');
  menuIcon.classList.toggle('active');
});



// ======================= Lazy Load ===========================//

// document.addEventListener("DOMContentLoaded", function () {
//   var lazyImages = document.querySelectorAll("img[data-src]");
//   var options = {
//     rootMargin: "0px", // Margen del área de visualización
//     threshold: 0.1, // Umbral de intersección
//   };

//   function lazyLoad(entries, observer) {
//     entries.forEach(function (entry) {
//       if (entry.isIntersecting) {
//         var img = entry.target;
//         img.src = img.dataset.src;
//         img.removeAttribute("data-src");
//         observer.unobserve(img); // Deja de observar la imagen una vez cargada
//       }
//     });
//   }

//   var observer = new IntersectionObserver(lazyLoad, options);

//   lazyImages.forEach(function (img) {
//     observer.observe(img); // Observa cada imagen
//   });
// });

//========================== Arrow Up =============================//

document.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY;
  let arrowUp = document.querySelector(".button-backtotop");

  if (scrollPosition >= 400) {
    arrowUp.style.display = "inline-flex";
  } else {
    arrowUp.style.display = "none";
  }
});

// ======================== Mobil Logo-Carrusel Auto ===============================//

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  if (window.innerWidth <= 580) {
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  }
  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// ======================== Mobil Client-Carrusel ===============================//

const clientes = document.querySelectorAll(".client");
const prevButton = document.getElementById("prevArrow");
const nextButton = document.getElementById("nextArrow");
let count = 0;

if (window.innerWidth < 720) {
  clientes.forEach(function (cliente) {
    cliente.style.display = "none";
  });
  clientes[0].style.display = "inline-block";
  var arrowContainer = document.querySelector(".arrow-container");
  arrowContainer.style.display = "block";

  prevButton.addEventListener("click", function () {
    moveSlide(-1);
  });

  nextButton.addEventListener("click", function () {
    moveSlide(1);
  });

  function moveSlide(n) {
    showSlide((count += n));
  }

  function showSlide(n) {
    if (n >= clientes.length) {
      count = 0;
    } else if (n < 0) {
      count = clientes.length - 1;
    }

    for (let i = 0; i < clientes.length; i++) {
      clientes[i].style.display = "none";
    }

    clientes[count].style.display = "block";
  }
}

// ======================== Validar Formulario ===============================//

const form = document.querySelector('.myForm');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector("#email");
    const textarea = document.querySelector("#textarea");
    const check = document.querySelector("#checkbox");

    const errorMessages = document.querySelector(".errorMsg");
   
    errorMessages.innerHTML = "";

    
  if (!email.value.trim() || !isValidEmail(email.value)) {
    errorMessages.textContent= "Por favor, ingresa un email válido.";
    errorMessages.style.color = 'red';
    return;
  }

  if (!textarea.value.trim()) {
    errorMessages.textContent= "Escribe tu consulta en el campo de texto";
    errorMessages.style.color = 'red';
    return;
  }

  if (!check.checked) {
    errorMessages.textContent= "Por favor, acepta la política de privacidad";
    errorMessages.style.color = 'red';
    return;
  }
 
  errorMessages.textContent= "Formulario enviado"; 
  errorMessages.style.color = 'green';

  form.reset();
});


 function isValidEmail(email) {
   return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(email);
 }

// ======================== Year Footer ===============================//

var year = document.querySelector(".year");
var date = new Date();
year.textContent = date.getFullYear();
