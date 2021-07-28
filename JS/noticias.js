firebase.initializeApp({
    apiKey: 'AIzaSyB7F2CYw8tBu21ZXUen9gOYSryMHnB2hdw',
    authDomain: 'chileanpremierleague-e69f2.firebaseapp.com',
    projectId: 'chileanpremierleague-e69f2'
  });
  var db = firebase.firestore();

function actualizarScrollNoticias() {
    
db.collection("news").get().then((querySnapshot)=>{
    var contenedor=document.getElementById("contenedorCarousel");
    /*while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }*/
     /*querySnapshot.forEach((doc)=>{
        var carouselItem=document.createElement("div");
        carouselItem.classList.add("carousel-item");
        var divA=document.createElement("a");
        divA.href="noticia-plantilla.html";
        var imagenA=document.createElement("img");
        imagenA.classList.add("rounded");
        imagenA.classList.add("mx-auto");
        imagenA.classList.add("d-block");
        imagenA.src=doc.data().imagen;

        imagenA.width="800";
        imagenA.height="500";
        imagenA.alt="...";

        divA.appendChild(imagenA);
        carouselItem.appendChild(divA);
        contenedor.appendChild(carouselItem);
     })*/
     var carouselItem=document.createElement("div");
     carouselItem.classList.add("carousel-item");
     var imagenA=document.createElement("img");
     carouselItem.appendChild(imagenA);
     carouselItem.textContent="####################################################################";
     contenedor.appendChild(carouselItem);

 }); 
}
document.getElementById('botonNotificaciones').onclick=function(){
  
    // Comprobamos si el navegador soporta las notificaciones
  if (!("Notification" in window)) {
    alert("Este navegador no soporta las notificaciones del sistema");
  }

  // Comprobamos si ya nos habían dado permiso
  else if (Notification.permission === "granted") {
    // Si esta correcto lanzamos la notificación
    var notification = new Notification("Ya aceptaste las notificaciones");
  }

  // Si no, tendremos que pedir permiso al usuario
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Si el usuario acepta, lanzamos la notificación
      if (permission === "granted") {
        var notification = new Notification("Bienvenido a Notificaciones ChileanPremierLeague");
      }
    });
  }

  // Finalmente, si el usuario te ha denegado el permiso y
  // quieres ser respetuoso no hay necesidad molestar más.
   
}
function spawnNotification(theBody,theIcon,theTitle) {
    var options = {
        body: theBody,
        icon: theIcon
    }
    var n = new Notification(theTitle,options);
//setTimeout(n.close.bind(n), 5000);
}
//spawnNotification("a vs b","recursos/zee-ball.png","Partido de Hoy");
var database=firebase.database();
var commentsRef = firebase.database().ref('notificaciones');
commentsRef.on('child_added', (data) => {
  spawnNotification(data.val().body,data.val().icono,data.val().titulo);
  //addCommentElement(postElement, data.key, data.val().text, data.val().author);
});


/*
var notificacion="noty1";
var starCountRef = database.ref('notificaciones/' + notificacion);
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  //updateStarCount(postElement, data);
});
*/
