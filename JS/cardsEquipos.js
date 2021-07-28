firebase.initializeApp({
    apiKey: 'AIzaSyB7F2CYw8tBu21ZXUen9gOYSryMHnB2hdw',
    authDomain: 'chileanpremierleague-e69f2.firebaseapp.com',
    projectId: 'chileanpremierleague-e69f2'
  });
  var db = firebase.firestore();


function obtenerEquipos(){

    db.collection("itemEquipo").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("contenedorEquipos");
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }


         querySnapshot.forEach((doc)=>{
             console.log(doc.id);
            var divColumna=document.createElement("div");
            divColumna.classList.add("col-md-8");
            divColumna.classList.add("col-lg-4");
            divColumna.classList.add("columnaCentrada");
            
            var divCardEquipo=document.createElement("div");
            divCardEquipo.classList.add("card");
            divCardEquipo.classList.add("equipo");

            var imgIcono=document.createElement("img");
            imgIcono.classList.add("card-img-top");
            imgIcono.src=doc.data().icono;
            imgIcono.width="90";
            imgIcono.height="90";
            imgIcono.alt="Card image cap";

            var divCardBody=document.createElement("div");
            divCardBody.classList.add("card-body");
            
            var h5Nombre=document.createElement("h5");
            h5Nombre.classList.add("card-title");
            h5Nombre.classList.add("text-center");
            h5Nombre.textContent=doc.id;

            var h5datos=document.createElement("h5");
            h5datos.textContent=doc.data().datos;
            
            divCardBody.appendChild(h5Nombre);
            divCardBody.appendChild(h5datos);

            divCardEquipo.appendChild(imgIcono);
            divCardEquipo.appendChild(divCardBody);
            divColumna.appendChild(divCardEquipo);
            contenedor.appendChild(divColumna);
         })
        });   
}
obtenerEquipos();

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