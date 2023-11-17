let fallos = 0;                 // Variable de fallos

let acerto = false;             // Booleano para indicar si se acerto la palabra
let dicionarioDeLetras = [];    // Array para almacenar las letras
let volverAjugar = true;        // Booleano para saber si se quiere seguir jugando
let letraGlobal = "";                 // Letra que obtenemos al clicar el boton
let palabraAbuscar = "";        // Palabra que buscamos

// Contadores de partidas
let partidasJugadas = 0;        // Total de partidas jugadas
let partidasGanadas = 0;        // Total de partidas ganadas
let partodasPerdidas = 0;       // Total de partidas perdidas

// Funciones

// Obtenemos letra
function obtenerLetra(elemento) {
    var letra = elemento.innerHTML.toLowerCase();
    elemento.removeEventListener("click", function() {
        juego(letra);
      });
    return letra;
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
  let section = document.getElementById("letras");
  if (section.style.display != "none") {
    section.style.display = "block";
  }
  palabraAbuscar = prompt("Establece la palabra a buscar: ");       // Pedimos que nos den una palabra
  palabraAguion(palabraAbuscar);
  console.log(palabraAbuscar);        // Nos devuelve la palabra a buscar

   // Reinicair los valores para la siguiente partida
   acerto=false;
   fallos=0;
   dicionarioDeLetras = []; 
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
        console.log("Felicidades has acertado la palabra !!");
        partidasGanadas += 1;
        partidasJugadas += 1;
    } 
}

// ahorcado
function juego(letra) {
        // console.log(letra);                  // Nos devuelve la letra que emos seleccionado
        detectorDeLetrasRepetidas(letra);       // Miramos de que no la tengamos repetida
        // console.log(fallos);                 // Miramos los fallos
        console.log(dicionarioDeLetras);        // Miramos el contenido del diccionaro
        palabraPintada = pintarPalabra(palabraAbuscar, dicionarioDeLetras);
        if(!palabraPintada.includes(letra)){
            fallos += 1;
            console.log(`La letra ${letra}, no existe en la palabra`)
            console.log(`Letras falladas ${fallos}/6 \n Letras [${dicionarioDeLetras}]`);
            if(fallos == 6){
                console.log("Perdiste");
                console.log(`Perdiste\nLa palabra era [${palabraAbuscar}]`);
                partodasPerdidas += 1;
                partidasJugadas += 1;
            }
        }else{
            document.getElementById("palabra").innerHTML = palabraPintada;
            console.log(`Letras falladas ${fallos}/6 \n Letras [${dicionarioDeLetras}]`);
            comprobarPalabra(pintarPalabra(palabraAbuscar, dicionarioDeLetras), palabraAbuscar);
            
        }
        
        console.log(partidasJugadas);
}


// Mustra las estadisticas de la partida
function estadisticas() {
    document.getElementById("tEstadisticas").innerHTML="Estadisticas"
    document.getElementById("pHechas").innerHTML=`Partidas hechas:\t${partidasJugadas}`;                            // Numero de partidas transcurridas
    let partGanadasPor = ((partidasGanadas/partidasJugadas)*100);                                                     // Calculo del porcentaje de partidas ganadas
    let partPerdidasPor = ((partodasPerdidas/partidasJugadas)*100);                                                   // Calculo del porcentaje de partidas perdidas
    document.getElementById("pGanadas").innerHTML=`Partidas ganadas(${partGanadasPor}%):\t${partidasGanadas}`;      // Porcentaje de partidas ganadas
    document.getElementById("pPerdidas").innerHTML=`Partidas perdidas(${partPerdidasPor}%):\t${partodasPerdidas}`;  // Porcentaje de partidas perdidas
}
