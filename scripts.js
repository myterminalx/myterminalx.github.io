// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Funcionalidad para herramientas avanzadas
document.addEventListener('DOMContentLoaded', () => {
    const output = document.querySelector('#output');
    const commandInput = document.querySelector('#commandInput');
    const prompt = document.querySelector('#prompt').textContent;

    const commands = {
        help: () => {
            return `Comandos disponibles:
- help: Muestra esta lista de comandos.
- clear: Limpia la terminal.
- echo [texto]: Muestra el texto ingresado.
- date: Muestra la fecha y hora actual.
- whoami: Muestra el usuario actual.
- scan [ip/dominio]: Simula un escaneo de puertos.
- subdomains [dominio]: Simula la búsqueda de subdominios.
- git [comando]: Simula comandos básicos de Git.`;
        },
        clear: () => {
            output.innerHTML = '';
            return '';
        },
        echo: (args) => {
            return args.join(' ');
        },
        date: () => {
            return new Date().toString();
        },
        whoami: () => {
            return 'root';
        },
        scan: (args) => {
            if (!args[0]) return 'Error: Debes especificar una IP o dominio.';
            return `Escaneando puertos abiertos en ${args[0]}...\nPuertos abiertos: 22, 80, 443`;
        },
        subdomains: (args) => {
            if (!args[0]) return 'Error: Debes especificar un dominio.';
            return `Buscando subdominios para ${args[0]}...\nSubdominios encontrados: www.${args[0]}, mail.${args[0]}, blog.${args[0]}`;
        },
        git: (args) => {
            if (!args[0]) return 'Error: Debes especificar un comando de Git.';
            switch (args[0]) {
                case 'status':
                    return 'En la rama main\nNada para confirmar, el árbol de trabajo está limpio.';
                case 'clone':
                    if (!args[1]) return 'Error: Debes especificar una URL para clonar.';
                    return `Clonando el repositorio desde ${args[1]}...`;
                case 'commit':
                    return 'Cambios confirmados con éxito.';
                case 'push':
                    return 'Subiendo cambios al repositorio remoto...';
                default:
                    return `Comando de Git no reconocido: ${args[0]}`;
            }
        },
    };

    function logToTerminal(message) {
        const line = document.createElement('div');
        line.textContent = message;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight; // Auto-scroll
    }

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = commandInput.value.trim();
            logToTerminal(`${prompt} ${input}`);
            commandInput.value = '';

            const [command, ...args] = input.split(' ');
            if (commands[command]) {
                const result = commands[command](args);
                if (result) logToTerminal(result);
            } else {
                logToTerminal(`Comando no encontrado: ${command}`);
            }
        }
    });

    // Escáner de Puertos
    document.querySelector('#portScanner').addEventListener('click', async () => {
        const target = prompt('Introduce la IP o dominio a escanear:');
        if (!target) return logToTerminal('Operación cancelada.');

        logToTerminal(`Escaneando puertos abiertos en ${target}...`);
        console.log(`Iniciando escaneo de puertos en ${target}...`);

        // Simulación de escaneo de puertos
        const openPorts = [22, 80, 443]; // Puertos simulados
        setTimeout(() => {
            logToTerminal(`Puertos abiertos encontrados en ${target}: ${openPorts.join(', ')}`);
            console.log(`Puertos abiertos: ${openPorts.join(', ')}`);
        }, 2000);
    });

    // Analizador de Vulnerabilidades
    document.querySelector('#vulnAnalyzer').addEventListener('click', () => {
        logToTerminal('Analizador de Vulnerabilidades: Buscando vulnerabilidades conocidas...');
        console.log('Analizando vulnerabilidades...');
    });

    // Generador de Payloads
    document.querySelector('#payloadGenerator').addEventListener('click', () => {
        logToTerminal('Generador de Payloads: Creando payload básico...');
        console.log('Payload generado: reverse_shell_payload');
    });

    // Cracker de Hashes
    document.querySelector('#hashCracker').addEventListener('click', () => {
        logToTerminal('Cracker de Hashes: Intentando descifrar hash...');
        console.log('Hash descifrado: password123');
    });

    // Buscador de Subdominios
    document.querySelector('#subdomainFinder').addEventListener('click', async () => {
        const domain = prompt('Introduce el dominio para buscar subdominios:');
        if (!domain) return logToTerminal('Operación cancelada.');

        logToTerminal(`Buscando subdominios para ${domain}...`);
        console.log(`Iniciando búsqueda de subdominios para ${domain}...`);

        // Simulación de búsqueda de subdominios
        const subdomains = [`www.${domain}`, `mail.${domain}`, `blog.${domain}`]; // Subdominios simulados
        setTimeout(() => {
            logToTerminal(`Subdominios encontrados para ${domain}: ${subdomains.join(', ')}`);
            console.log(`Subdominios encontrados: ${subdomains.join(', ')}`);
        }, 2000);
    });
});
