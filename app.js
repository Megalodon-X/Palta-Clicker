// --- 1. LAS VARIABLES DEL ESTRATEGA ---
let paltas = 0;
let paltasPorSegundo = 0;
let costoAbuelaActual = 50; // ¿A cuánto cotiza la abuela granjera hoy?
let costoMaquinaActual = 500; // La tecnología es cara

// --- 2. LOS CABLES AL HTML ---
let textoPaltas = document.getElementById("contador-paltas");
let textoPPS = document.getElementById("contador-pps");
let granPalta = document.getElementById("gran-palta");
let btnComprarAbuela = document.getElementById("btn-comprar-abuela");
let textoCostoAbuela = document.getElementById("costo-abuela");
let btnComprarMaquina = document.getElementById("btn-comprar-maquina");
let textoCostoMaquina = document.getElementById("costo-maquina");


// --- 3. LA LÓGICA DEL CLICK MANUAL ---
granPalta.addEventListener("click", hacerClick);

function hacerClick() {
    paltas = paltas + 1; // Sumamos 1 palta a la matemática
    textoPaltas.innerText = paltas; // El pintor actualiza la pantalla
    guardarProgreso();
}

// --- 4. LA TIENDA (Comprar Abuelas) ---
btnComprarAbuela.addEventListener("click", comprarAbuela);

function comprarAbuela() {
    // 1. Verificamos si nos alcanza la plata (la matemática)
    if (paltas >= costoAbuelaActual) {
        
        // 2. Pagamos (restamos paltas)
        paltas = paltas - costoAbuelaActual;
        
        // 3. Subimos nuestra producción (Paltas por Segundo)
        paltasPorSegundo = paltasPorSegundo + 1;
        
        // 4. INFLACIÓN: La próxima abuela va a costar un 20% más
        // Usamos Math.floor para no tener "fracciones de palta" en el precio
        costoAbuelaActual = Math.floor(costoAbuelaActual * 1.2);

        // 5. Los Pintores actualizan toda la pantalla
        textoPaltas.innerText = paltas;
        textoPPS.innerText = paltasPorSegundo;
        textoCostoAbuela.innerText = costoAbuelaActual;
        guardarProgreso();

    } else {
        // Si somos pobres, el navegador nos avisa
        alert("¡No tenés suficientes paltas para contratar a esta señora!");
    }
}

// --- LA TECNOLOGÍA CLONADORA ---
btnComprarMaquina.addEventListener("click", comprarMaquina);

function comprarMaquina() {
    // Es igual que la abuela, pero manejamos números más grandes
    if (paltas >= costoMaquinaActual) {
        
        paltas = paltas - costoMaquinaActual;
        paltasPorSegundo = paltasPorSegundo + 10; // ¡Esta da 10 de golpe!
        
        // Inflación del 20%
        costoMaquinaActual = Math.floor(costoMaquinaActual * 1.2);

        // Actualizamos la pantalla
        textoPaltas.innerText = paltas;
        textoPPS.innerText = paltasPorSegundo;
        textoCostoMaquina.innerText = costoMaquinaActual;
        guardarProgreso();

    } else {
        alert("¡Necesitás más presupuesto para tecnología punta!");
    }
}

// --- 5. EL MOTOR DEL TIEMPO (El Bucle Infinito) ---
// Le decimos al reloj: Ejecutá la función "producirPaltas" cada 1000 ms (1 segundo)
// Acá el setInterval funciona como un reloj que corre cada 1000 milisegundos para que las abuelas laburen solas.
setInterval(producirPaltas, 1000);

function producirPaltas() {
    // Si tenemos al menos 1 abuela produciendo...
    if (paltasPorSegundo > 0) {
        // Le sumamos a nuestras paltas totales lo que hacemos por segundo
        paltas = paltas + paltasPorSegundo;
        
        // El pintor actualiza el número grande
        textoPaltas.innerText = paltas;
    }
}

// --- 6. LA MEMORY CARD (Guardar y Cargar) ---

// 💾 FUNCIÓN DE GUARDADO
function guardarPartida() {
    // Guardamos las 4 variables clave de nuestro imperio
    localStorage.setItem("paltas", paltas);
    localStorage.setItem("pps", paltasPorSegundo);
    localStorage.setItem("costoAbuela", costoAbuelaActual);
    localStorage.setItem("costoMaquina", costoMaquinaActual);
    
    // Un mensajito opcional para que sepas que funcionó
    console.log("¡Juego guardado en la Memory Card!");
}

// ⏱️ EL AUTOGUARDADO (El que vos propusiste)
// Ejecuta guardarPartida cada 30 segundos (30000 milisegundos)
setInterval(guardarPartida, 30000);

// (Opcional) Si querés que también guarde al hacer click manual, 
// simplemente agregás guardarPartida(); adentro de tu función hacerClick().

// 🔄 FUNCIÓN DE CARGA
function cargarPartida() {
    // Revisamos si existe una partida guardada (le preguntamos por las paltas)
    let paltasGuardadas = localStorage.getItem("paltas");
    
    // Si NO es null, significa que hay datos viejos guardados
    if (paltasGuardadas !== null) {
        // IMPORTANTE: localStorage guarda todo como "Texto". 
        // Usamos Number() para volver a convertirlo en números matemáticos.
        paltas = Number(localStorage.getItem("paltas"));
        paltasPorSegundo = Number(localStorage.getItem("pps"));
        costoAbuelaActual = Number(localStorage.getItem("costoAbuela"));
        costoMaquinaActual = Number(localStorage.getItem("costoMaquina"));
        
        // ¡Le avisamos a los pintores que actualicen el HTML apenas entramos!
        textoPaltas.innerText = paltas;
        textoPPS.innerText = paltasPorSegundo;
        textoCostoAbuela.innerText = costoAbuelaActual;
        textoCostoMaquina.innerText = costoMaquinaActual;
    }
}

// 🚀 EJECUCIÓN INICIAL
// Esto va suelto en tu código para que el juego intente cargar apenas abrís la página
cargarPartida();