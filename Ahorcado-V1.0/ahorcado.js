// Ofrecer las posivilidades
console.log("Bienvenido al juego del ahorcado. \nPorfavor seleccione una de las siguientes opciones en consola: (1, 2 o 3)\n\t1. Iniciarjuego \n\t2. Estadisticas \n\t3. Salir");
let opciones = parseInt(prompt("Que eliges?"));
// Variable de fallos
let fallos = 0;

let reg = /[a-z]$/;             // Registro de todas las letras de la a - z
let acerto = false;             // Booleano para indicar si se acerto la palabra
let dicionarioDeLetras = [];    // Array para almacenar las letras
let volverAjugar = true;        // Booleano para saber si se quiere seguir jugando

// Contadores de partidas
let partidasJugadas = 0;        // Total de partidas jugadas
let partidasGanadas = 0;        // Total de partidas ganadas
let partodasPerdidas = 0;       // Total de partidas perdidas

// Opciones
while (volverAjugar == true) {
    if (opciones === 1 ) {           // Empezar juego
        ahorcadoGame();
    }else{
        if (opciones === 2) {        // Estadisticas
            estadisticas();
        }else{
            if (opciones === 3) {    // Salir
                console.log("Saliste del juego");
                alert("Saliste del juego");
            }
        }
    }

    // Funciones
    // Juego del ahorcado
    function ahorcadoGame() {
        // En caso de querer ver las estadisticas en consola descomentar esta parte
        /*
        console.log(`Llevas ${partidasJugadas} partidas jugadas`);
        console.log(`Llevas ${partidasGanadas} partidas ganadas`);
        console.log(`Llevas ${partodasPerdidas} partidas perdidas`);
        */
    
        // Reinicair los valores para la siguiente partida
        acerto=false;
        fallos=0;
        dicionarioDeLetras = []; 
        console.log("Empieza el juego!!")
        let palabraAbuscar = prompt("Establece la palabra a buscar: ");
        palabraAguion(palabraAbuscar);
        //console.log(palabraAbuscar);      // Mostrar la palabra a buscar
        
        // Hasta que no aciertes no pares
        while(acerto != true && fallos != 6){
            let letra = prompt("Que letra eliges: ").toLowerCase();
            detectorDeLetrasRepetidas(letra);
            
            if(esLetraCorrecta(letra)){ 
                console.log(pintarPalabra(palabraAbuscar, dicionarioDeLetras));
                console.log(`Letras falladas ${fallos}/6 \n Letras [${dicionarioDeLetras}]`);
                comprobarPalabra(pintarPalabra(palabraAbuscar, dicionarioDeLetras), palabraAbuscar);
                
            }else{
                fallos += 1 ;
                console.log(`Letras falladas ${fallos}/6`);
                console.log("Tiene que ser solo 1 letra y nada de numeros o caracteres especiales");
                if (fallos == 6) {
                    console.log(`Perdiste\nLa palabra era [${palabraAbuscar}]`);
                    partodasPerdidas += 1;
                }
            }
            partidasJugadas += 1;
        }
        volverAJugar()
    }

    // Convierte la palabra que le pasas a guiones bajos
    function palabraAguion (palabra){
        let guiones = "";
        for (let i = 0; i < palabra.length; i++) {
            guiones = guiones + "_ ";
        }
        console.log(guiones);
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

    // Detector para saber si la letra que le pasamos ya esta escrita anteriormente
    function detectorDeLetrasRepetidas(letra) {        
        if (dicionarioDeLetras.includes(letra)) {
            fallos += 1;
            console.log(`Ya has usado la letra ${letra}.`);
        }else{
            dicionarioDeLetras.push(letra);
        }
    }
    
    // Comprueba de que la letra pasa los filtros 
    function esLetraCorrecta(letra){
        return letra != null && reg.test(letra) && letra.length == 1;
        
    }

    // Comprueba de que la palabra final obtenida y la palabra pricipal son iguales
    function comprobarPalabra(palabraAComprobar, palabraABuscar) {
        if (palabraAComprobar == palabraABuscar) {
            acerto = true;
            console.log("Felicidades has acertado la palabra !!");
            partidasGanadas += 1;
        } 
    }

    // Pregunta si quieres volver a jugar y en caso de decir que si vulves al principio del juego
    function volverAJugar() {
        let preguntaJugar = prompt("Quieres volver a jugar? ").toLowerCase();
        if (preguntaJugar == "si") {
            volverAjugar = true;
        }else{
            volverAjugar = false;
            /*
            let volverMenu = prompt("Quieres volver al menú").toLowerCase();
            if (volverMenu == "si"){
                opciones = 2;
            }
            */
        }      
    }

    // Mustra las estadisticas de la partida
    function estadisticas() {
        console.log("Estadisticas");
        console.log(`Partidas hechas:\t${partidasJugadas}`);                            // Numero de partidas transcurridas
        let partGanadasPor = (partidasGanadas/partidasJugadas)*100;                     // Calculo del porcentaje de partidas ganadas
        let partPerdidasPor = (partodasPerdidas/partidasJugadas)*100;                   // Calculo del porcentaje de partidas perdidas
        console.log(`Partidas ganadas(${partGanadasPor}%):\t${partidasGanadas}`);       // Porcentaje de partidas ganadas
        console.log(`Partidas perdidas(${partPerdidasPor}%):\t${partodasPerdidas}`);    // Porcentaje de partidas perdidas
    }
}