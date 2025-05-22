// burger menu
function toggleMenu() {
    const menuList = document.getElementById('menu-list');
    const icon = document.getElementById('menu-icon');
    const isOpen = menuList.classList.toggle('active');

    // Cambiar ícono hamburguesa ↔ cruz
    icon.textContent = isOpen ? 'close' : 'menu';
}


// Función para actualizar la fecha y hora
function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    if (datetimeElement) {
        datetimeElement.textContent = `${date} ${time}`;
    }

    requestAnimationFrame(updateDateTime);
}

updateDateTime();

// Función para cambiar el modo claro/oscuro
document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector("body");
    const switches = document.querySelectorAll(".switch input[type='checkbox']");

    switches.forEach(switchElement => {
        switchElement.checked = localStorage.getItem('modo') === 'noche';
        switchElement.addEventListener("change", cambiarModo);
    });

    function cambiarModo() {
        const modoActual = localStorage.getItem('modo');
        if (modoActual === 'dia') {
            body.classList.add("noche");
            localStorage.setItem('modo', 'noche');
        } else {
            body.classList.remove("noche");
            localStorage.setItem('modo', 'dia');
        }

        switches.forEach(switchElement => {
            switchElement.checked = localStorage.getItem('modo') === 'noche';
        });
    }

    if (localStorage.getItem('modo') === 'noche') {
        body.classList.add('noche');
    } else {
        body.classList.remove('noche');
    }
});

// Cambiar el título si es Home
function changeTitleIfHome() {
    if (document.title === "Portfolio") {
        let alertShow = false;
        setInterval(() => {
            document.title = alertShow ? "Portfolio" : "ISPC";
            alertShow = !alertShow;
        }, 3000);
    }
}

changeTitleIfHome();



// Cambiar la imagen cada 2 segundos
const imagenes = [
    "https://i.postimg.cc/C56tm6Gr/0fd2c8e9-0370-490c-81e7-8e0845bb6c85-isnet-general-use.png",
    "assets/yo.jpg",

];

let indice = 0;
const imgElement = document.querySelector('.foto img');

setInterval(() => {
    imgElement.style.opacity = 0; // Empieza a desvanecer

    setTimeout(() => {
        indice = (indice + 1) % imagenes.length;
        imgElement.src = imagenes[indice];
        imgElement.style.opacity = 1; // Vuelve a aparecer
    }, 500); // Espera a que termine el fade out
}, 3000);

// modal imagen
function mostrarImagen(src) {
    const modal = document.getElementById("modal-img");
    const imgGrande = document.getElementById("img-grande");
    imgGrande.src = src;
    modal.style.display = "block";
}

function cerrarModal() {
    document.getElementById("modal-img").style.display = "none";
}


// Esperamos a que el usuario haga clic en cualquier parte del documento
document.addEventListener('click', () => {
    const audio = document.getElementById('musica-fondo');
    if (audio.paused) {
        audio.play().catch((error) => {
            console.log("El navegador bloqueó la reproducción automática:", error);
        });
    }
}, { once: true }); // solo la primera vez

//modal CV

document.querySelector('.ver-cv').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('modal-cv').style.display = 'block';
});

function cerrarModalCV() {
    document.getElementById('modal-cv').style.display = 'none';
}

// json exporstacion

document.addEventListener("DOMContentLoaded", function () {
    fetch("./data/data.json")
        .then(res => res.json())
        .then(data => {
            renderEducacion(data.educacion);
            renderProyectos(data.proyectos);
        });

    function renderEducacion(educacionData) {
        const contenedor = document.querySelector(".educacion-contenedor");
        contenedor.innerHTML = ""; // Limpiar antes de agregar
        educacionData.forEach(item => {
            contenedor.innerHTML += `
          <div class="educacion-item">
            <img src="${item.img}" alt="${item.alt}" onclick="mostrarImagen(this.src)">
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
          </div>
        `;
        });
    }

    function renderProyectos(proyectosData) {
        const grid = document.querySelector(".proyectos-grid");
        grid.innerHTML = ""; // Limpiar antes de agregar
        proyectosData.forEach(proyecto => {
            grid.innerHTML += `
          <div class="proyecto">
            <a href="${proyecto.github}" target="_blank">
              <img src="${proyecto.img}" alt="${proyecto.alt}">
            </a>
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
            <div class="enlaces">
              ${proyecto.web ? `<a href="${proyecto.web}" target="_blank">Ver en Web</a>` : ""}
            </div>
          </div>
        `;
        });
    }
});


// Carrusel de imágenes

const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Mostrar primer slide al cargar
showSlide(currentIndex);

// Iniciar auto-slide cada 4 segundos
setInterval(nextSlide, 4000);




// Scroll suave

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


