window.onload = init;
var petalos;
var boton_jugar;
var valores;

function init(){
	petalos = document.getElementsByClassName("petalo");
	asignarEvento();
  boton_jugar = document.getElementById("botonJugar");
  boton_jugar.addEventListener("click",abrirJuego);
}
function asignarValores(){
  var numero_aleatorio = Math.round(Math.random()*10);
  var moneda = numero_aleatorio > 5;
  valores = [];
  for(var i=0;i<petalos.length;i++)
	{
    valores[i] = moneda;
    moneda = !moneda;
  }
}
function abrirJuego(){
  var ventana_actual = document.getElementById("intro");
  var ventana_juego = document.getElementById("juego");
  ventana_actual.className = "hidden";
  ventana_juego.className = "animated fadeIn";
  asignarValores();
}
function asignarEvento(){
	for(var i=0;i<petalos.length;i++)
	{
		petalos[i].addEventListener("click",animar);
	}
}
function colorAleatorio(){
  var r = Math.round(Math.random()*255);
  var g = Math.round(Math.random()*255);
  var b = Math.round(Math.random()*255);
  return "rgb("+r+","+g+","+b+")";
}
function animar(event){
  var id_petalo = event.target.id;
  var petalo = document.getElementById(""+id_petalo);
  //petalo.style.backgroundColor = colorAleatorio(); 
  petalo.className = "petalo animated fadeOutDown";
  validarJugada(id_petalo);
}

function validarJugada(petalo){
  var indice = parseInt(petalo.substr(1));
  var str;
  var valores = ["Netflix and chill", "Salida al cine", "Cena", "Picnic","Noche de spa","Salida a museos","Salida al zoo","Cup&oacute;n v&aacute;lido para lo que t&uacute; quieras"];
 // var valores = ["Netflix and chill", "Salida al cine.", "Cena", "Picnic","Noche de spa"];
  var indiceAleatorio = Math.floor(Math.random() * valores.length);
  if(valores[indice-1])
  {
    
    str = valores[indiceAleatorio];
  }
  else
  {
    str = valores[indiceAleatorio]; 
  }
  //alert(mensaje);
  texto_mensaje.innerHTML = str;
  mensaje.className = "mostrar animated fadeIn";
  setTimeout(()=>{
    mensaje.className = "hidden";
  },1000);
}
/*window.onload = init;
var petalos;
var contador;

function init(){
	var boton = document.getElementById("boton");
	boton.addEventListener("click",animar);
	contador = 0;
	petalos =         document.getElementsByClassName("petalo");
}

function animar(){
	if(contador+1<=petalos.length)
	{
		petalos[contador].className = "petalo animated bounce infinite";
		contador = contador+1;
	}
}*/

const introAudio = document.getElementById('intro');

// Función para iniciar la reproducción de la música
function iniciarReproduccion() {
    if (introAudio.paused) {
        introAudio.play();
    }
}

// Agregar un evento clic en cualquier parte de la página
document.addEventListener('click', function() {
    iniciarReproduccion();
});

// Comprobar y configurar el estado de reproducción y la posición
const estadoReproduccion = localStorage.getItem('estadoReproduccion');
const posicionReproduccion = parseFloat(localStorage.getItem('posicionReproduccion'));

if (estadoReproduccion === 'reproduciendo' && !isNaN(posicionReproduccion)) {
    introAudio.currentTime = posicionReproduccion; // Configurar la posición de reproducción
    introAudio.play(); // Reproducir la música desde la posición almacenada
}

// Almacenar la posición de reproducción cuando se pausa o se cambia la posición
introAudio.addEventListener('pause', function() {
    localStorage.setItem('estadoReproduccion', 'pausado');
    localStorage.setItem('posicionReproduccion', introAudio.currentTime);
});

introAudio.addEventListener('timeupdate', function() {
    localStorage.setItem('posicionReproduccion', introAudio.currentTime);
});
