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

    // Si el texto contiene HTML (como nuestro enlace), lo manejamos diferente
    if (text.includes('<a')) {
        // Escribimos la parte estática primero
        const staticPart = text.split('<a')[0];
        for (let char of staticPart) {
            line.textContent += char;
            await new Promise(r => setTimeout(r, speed));
        }
        // Insertamos el enlace de golpe para que sea funcional
        line.innerHTML += text.substring(staticPart.length);
    } else {
        // Comportamiento normal para texto simple
        for (let char of text) {
            line.textContent += char;
            window.scrollTo(0, document.documentElement.scrollHeight);
            await new Promise(r => setTimeout(r, speed));
        }
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

// 1. Definimos la función de transición por separado para poder removerla
async function handleTransition() {
    if (isReadyToInteract) {
        // Desactivamos la bandera inmediatamente
        isReadyToInteract = false; 
        
        // 2. REMOVEMOS LOS EVENTOS: Ya no responderá a más teclas ni clics
        window.removeEventListener('keydown', handleTransition);
        window.removeEventListener('click', handleTransition);
        
        await showProfile();
    }
}

async function showProfile() {
    container.innerHTML = ""; 
    
    await typeLine(">>> ACCEDIENDO A BASE DE DATOS...", 50);
    await new Promise(r => setTimeout(r, 600));

    await typeLine("DATOS PERSONALES", 20, true);
    await typeLine("NOMBRE: JONATHAN OLIVA");
    await typeLine("ROL: BACKEND DEVELOPER");
    await typeLine("UBICACIÓN: Villa Mercedes, San Luis, Argentina");
    
    await typeLine("CONTACTO", 20, true);
    await typeLine("EMAIL: olivajonaj@gmail.com");
    const githubLink = '<a href="https://github.com/Jonathan-Oliva" target="_blank" class="project-link">github.com/Jonathan-Oliva</a>' ;
    await typeLine("GITHUB: " + githubLink);

    await typeLine("HABILIDADES TÉCNICAS", 20, true);
    await typeLine("PYTHON      [######----]", 10, false, "skill-item");
    await typeLine("TYPESCRIPT  [#####-----]", 10, false, "skill-item");
    await typeLine("NODEJS      [######----]", 10, false, "skill-item");
    await typeLine("JAVA        [####------]", 10, false, "skill-item");
    await typeLine("SQL/NOSQL   [######----]", 10, false, "skill-item");
    await typeLine("INGLÉS      [######----]", 10, false, "skill-item");

    await typeLine("PROYECTOS RECIENTES", 20, true);
    await typeLine("> TODO_LIST.TS");
    await typeLine("> WEB_PORTAFOLIO.HTML");
    await typeLine("> BOT_AUTOMATIZACION.PY");
    await typeLine("> VOTO_ELECTRONICO.JAVA");



    await typeLine("HABILIDADES BLANDAS", 20, true);
    await typeLine("LIDERAZGO");
    await typeLine("TRABAJO EN EQUIPO");
    await typeLine("PENSAMIENTO CRÍTICO");
    await typeLine("RESOLUCIÓN DE PROBLEMAS");

    await typeLine("");
    await typeLine(">>> FIN DE LA TRANSMISIÓN. SISTEMA EN ESPERA_");

    // 3. Activamos el scroll
    document.documentElement.classList.add('active-scroll');
}

// 4. Asignamos los eventos usando la función nombrada
window.addEventListener('keydown', handleTransition);
window.addEventListener('click', handleTransition);

document.addEventListener('DOMContentLoaded', init);