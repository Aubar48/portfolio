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
    "https://media-eze1-1.cdn.whatsapp.net/v/t61.24694-24/462983808_823871012997824_3207676274210132791_n.jpg?ccb=11-4&oh=01_Q5Aa1QHo1_pzDAAPNV9sG2q3HHeJc5Xjhl9GC-0DMGkrDkdnYA&oe=6823E04F&_nc_sid=5e03e0&_nc_cat=107"
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
