// --- 1. LAS VARIABLES DEL ESTRATEGA ---
let paltas = 0;
let paltasPorSegundo = 0;
let costoAbuelaActual = 50; // ¿A cuánto cotiza la abuela granjera hoy?
let costoMaquinaActual = 500; // La tecnología es cara

// --- FUNCIÓN DE CARGA (Memory Card) ---
function cargarProgreso() {
    const partida = JSON.parse(localStorage.getItem("paltaSave"));

    if (partida) {
        // Recuperamos los valores de la caja
        paltas = partida.paltas;
        paltasPorSegundo = partida.pps;
        costoAbuelaActual = partida.costoAbuela;
        costoMaquinaActual = partida.costoMaquina;
        
        // ¡Pintamos la pantalla con lo recuperado!
        document.getElementById("contador-paltas").innerText = paltas; 
        document.getElementById("contador-pps").innerText = paltasPorSegundo;
        document.getElementById("costo-abuela").innerText = costoAbuelaActual;
        document.getElementById("costo-maquina").innerText = costoMaquinaActual;
        
        console.log("Sistema: Datos recuperados. Bienvenida de nuevo, Master. 🥑");
    }
}

// --- FUNCIÓN DE GUARDADO ---
function guardarProgreso() {
    const datosASalvar = {
        paltas: paltas,            // Nombre real de tu variable
        pps: paltasPorSegundo,     // Guardamos la producción
        costoAbuela: costoAbuelaActual, // Guardamos la inflación
        costoMaquina: costoMaquinaActual
    };
    
    localStorage.setItem("paltaSave", JSON.stringify(datosASalvar));
    console.log("Sistema: Progreso guardado automáticamente. ✅");
}

// Ejecutamos la carga apenas abre el juego
window.onload = cargarProgreso;

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

setInterval(guardarProgreso, 30000);