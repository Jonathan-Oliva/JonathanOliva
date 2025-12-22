const introMessages = [
    "> INICIALIZANDO SISTEMA...",
    "> SISTEMA LISTO.",
    "> CARGANDO INTERFAZ GRÁFICA",
    "[PROGRESS_BAR]",
    "> CARGA COMPLETADA",
    "> BIENVENIDO A LA TERMINAL DE USUARIO",
    "> PRESIONE CUALQUIER TECLA PARA ACCEDER AL PERFIL_"
];

const container = document.getElementById('text-container');
let isReadyToInteract = false;

async function showProgressBar() {
    const line = document.createElement('div');
    line.className = 'line';
    container.appendChild(line);
    for (let i = 0; i <= 20; i++) {
        let bar = "[" + "#".repeat(i) + "-".repeat(20 - i) + "] " + (i * 5) + "%";
        line.textContent = bar;
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(res => setTimeout(res, 60));
    }
}

async function typeLine(text, speed = 30, isTitle = false, className = "line") {
    const line = document.createElement('div');
    line.className = className;
    if (isTitle) line.classList.add('section-title');
    container.appendChild(line);

    for (let char of text) {
        line.textContent += char;
        // Auto-scroll forzado en cada letra
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(r => setTimeout(r, speed));
    }
}

async function init() {
    for (const msg of introMessages) {
        if (msg === "[PROGRESS_BAR]") {
            await showProgressBar();
        } else {
            await typeLine(msg);
        }
        await new Promise(res => setTimeout(res, 400));
    }
    isReadyToInteract = true;
}

async function showProfile() {
    isReadyToInteract = false; 
    container.innerHTML = ""; 
    
    await typeLine(">>> ACCEDIENDO A BASE DE DATOS...", 50);
    await new Promise(r => setTimeout(r, 600));

    await typeLine("DATOS PERSONALES", 20, true);
    await typeLine("NOMBRE: JONATHAN OLIVA");
    await typeLine("ROL: BACKEND DEVELOPER");
    await typeLine("UBICACIÓN: Villa Mercedes, San Luis, Argentina");

    await typeLine("HABILIDADES TÉCNICAS", 20, true);
    await typeLine("PYTHON      [######----]", 10, false, "skill-item");
    await typeLine("JAVASCRIPT  [####------]", 10, false, "skill-item");
    await typeLine("JAVA        [#####-----]", 10, false, "skill-item");
    await typeLine("SQL/NOSQL   [######----]", 10, false, "skill-item");
    await typeLine("INGLÉS      [######----]", 10, false, "skill-item");

    await typeLine("PROYECTOS RECIENTES", 20, true);
    await typeLine("> TODO_LIST.TS");
    await typeLine("> WEB_PORTAFOLIO.REACT");
    await typeLine("> BOT_AUTOMATIZACION.PY");
    await typeLine("> VOTO_ELECTRONICO.JAVA");

    await typeLine("CONTACTO", 20, true);
    await typeLine("EMAIL: olivajonaj@gmail.com");
    await typeLine("GITHUB: github.com/Jonathan-Oliva");
    
    await typeLine("");
    await typeLine(">>> FIN DE LA TRANSMISIÓN. SISTEMA EN ESPERA_");

    // Desbloqueo de scroll manual al final
document.documentElement.classList.add('active-scroll');
    isReadyToInteract = true;
}

async function typeLine(text, speed = 30, isTitle = false, className = "line") {
    const line = document.createElement('div');
    line.className = className;
    if (isTitle) line.classList.add('section-title');
    container.appendChild(line);

    for (let char of text) {
        line.textContent += char;
        // Scroll automático hacia el final del documento
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(r => setTimeout(r, speed));
    }
}

window.addEventListener('keydown', () => { if (isReadyToInteract) showProfile(); });
window.addEventListener('click', () => { if (isReadyToInteract) showProfile(); });
document.addEventListener('DOMContentLoaded', init);