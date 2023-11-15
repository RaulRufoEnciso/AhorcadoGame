let fallos = 0;                 // Variable de fallos

let acerto = false;             // Booleano para indicar si se acerto la palabra
let dicionarioDeLetras = [];    // Array para almacenar las letras
let volverAjugar = true;        // Booleano para saber si se quiere seguir jugando
let letraGlobal = "";           // Letra que obtenemos al clicar el boton
let palabraAbuscar = "";        // Palabra que buscamos

// Contadores de partidas
let partidasJugadas = 0;        // Total de partidas jugadas
let partidasGanadas = 0;        // Total de partidas ganadas
let partidasPerdidas = 0;       // Total de partidas perdidas

// Funciones

// Crear abecedario
let abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();

function crearAbcedario() {
    let contenedor = document.getElementById("abecedario"); // Puedes cambiar esto según tu estructura HTML
    let html1 ="";

    for (let letra = 0; letra < abecedario.length; letra++){
        html1 += `<button id="letra${abecedario[letra]}" onclick="juego('${abecedario[letra]}')">${abecedario[letra]}</button>`;
    }
    contenedor.innerHTML=html1;
}

// Convierte la palabra que le pasas a guiones bajos
function palabraAguion (palabra){
    let guiones = "";
    for (let i = 0; i < palabra.length; i++) {
        guiones = guiones + "_ ";
    }
    document.getElementById("palabra").innerHTML=guiones;
}

// Detector para saber si la letra que le pasamos ya esta escrita anteriormente
function detectorDeLetrasRepetidas(letra) {        
    if (dicionarioDeLetras.includes(letra)) {
        fallos += 1;
        console.log(`Ya has usado la letra ${letra}.`);
    }else{
        dicionarioDeLetras.push(letra);
    }
}

// Abrimos el teclado y preguntamos por la palabra
function desplegarLetras() {
    crearAbcedario() 
    palabraAbuscar = prompt("Establece la palabra a buscar: ");       // Pedimos que nos den una palabra
    palabraAguion(palabraAbuscar);
    console.log(palabraAbuscar);        // Nos devuelve la palabra a buscar

    document.getElementById("mensajeFinal").innerHTML="";
    reiniciarValores();
}

// Recorres la palabra y comprueba de que la letra pasada es igual a la letra de la palabra que miramos en el momento
function pintarPalabra(palabra, letras) {
    let texto = "";
    for (let i = 0; i < palabra.length; i++) {
        if (letras.includes(palabra[i])) {
            texto += palabra[i];            
        }else{
            texto += "_ ";
        }  
    }
     return texto;
}

// Comprueba de que la palabra final obtenida y la palabra pricipal son iguales
function comprobarPalabra(palabraAComprobar, palabraABuscar) {
    if (palabraAComprobar == palabraABuscar) {
        acerto = true;
        // console.log("Felicidades has acertado la palabra !!");
        document.getElementById("mensajeFinal").innerHTML="FELICIDADES, HAS GANADOOO !!";
        partidasGanadas += 1;
        partidasJugadas += 1;
        reiniciarValores();
    } 
}

// Desactivar botones
function desactivarBotones(boton){
    boton.disabled = true;
    boton.style.opacity = 0.7;
}

// Cambiar ahorcado
function cambiarAhorcado(fallos) {
    document.getElementById("imgAhorcado").src = `./src/img/penjat_${fallos}.png`
}

// Reiniciar valores;
function reiniciarValores() {
    fallos=0;
    dicionarioDeLetras = [];
    document.getElementById("lletresUtilitzades").innerHTML = "";
}

function perdiste(palabraAbuscar) {
    // console.log("Perdiste");
    // console.log(`Perdiste\nLa palabra era [${palabraAbuscar}]`);
    document.getElementById("mensajeFinal").innerHTML=`PERDISTE D:\nPerdiste\nLa palabra era [${palabraAbuscar}]`;
    partidasPerdidas += 1;
    partidasJugadas += 1;
    reiniciarValores();
}
// ahorcado
function juego(letra) {
    // Desactivar los botenes clicados
    let boton = document.getElementById(`letra${letra}`);
    desactivarBotones(boton)

    // console.log(letra);                  // Nos devuelve la letra que emos seleccionado
    detectorDeLetrasRepetidas(letra);       // Miramos de que no la tengamos repetida
    // console.log(fallos);                 // Miramos los fallos
    // console.log(dicionarioDeLetras);     // Miramos el contenido del diccionaro
    document.getElementById("lletresUtilitzades").innerHTML=dicionarioDeLetras;
    palabraPintada = pintarPalabra(palabraAbuscar, dicionarioDeLetras);

    if(!palabraPintada.includes(letra)){
        fallos += 1;
        cambiarAhorcado(fallos)
        console.log(`La letra ${letra}, no existe en la palabra`)
        console.log(`Letras falladas ${fallos}/6 \n Letras [${dicionarioDeLetras}]`);
        if(fallos == 6){
            perdiste(palabraAbuscar, fallos, dicionarioDeLetras);
        }
    }else{
        document.getElementById("palabra").innerHTML = palabraPintada;
        console.log(`Letras falladas ${fallos}/6 \n Letras [${dicionarioDeLetras}]`);
        comprobarPalabra(pintarPalabra(palabraAbuscar, dicionarioDeLetras), palabraAbuscar);
        
    }
    
    console.log(partidasJugadas);
}


// Mustra las estadisticas de la partida
function abrirEstadisticas() {
    // Puedes ajustar las dimensiones y otras opciones según tus necesidades
    var ventanaEstadisticas = window.open('', '_blank', 'width=600,height=400');

    // Puedes escribir contenido en la nueva ventana si es necesario
    if (ventanaEstadisticas) {
        ventanaEstadisticas.document.write('<h1>Estadisticas</h1>');
        ventanaEstadisticas.document.write(`<p>Partidas hechas:\t${partidasJugadas}</p>`);                                  // Numero de partidas transcurridas
        let partGanadasPor = ((partidasGanadas/partidasJugadas)*100);                                                       // Calculo del porcentaje de partidas ganadas
        let partPerdidasPor = ((partidasPerdidas/partidasJugadas)*100);                                                     // Calculo del porcentaje de partidas perdidas
        ventanaEstadisticas.document.write(`<p>Partidas ganadas(${partGanadasPor}%):\t${partidasGanadas}</p>`);          // Porcentaje de partidas ganadas
        ventanaEstadisticas.document.write(`<p>Partidas perdidas(${partPerdidasPor}%):\t${partidasPerdidas}</p>`);      // Porcentaje de partidas perdidas
    }
}