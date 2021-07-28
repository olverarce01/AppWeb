firebase.initializeApp({
    apiKey: 'AIzaSyB7F2CYw8tBu21ZXUen9gOYSryMHnB2hdw',
    authDomain: 'chileanpremierleague-e69f2.firebaseapp.com',
    projectId: 'chileanpremierleague-e69f2'
  });
  var db = firebase.firestore();


  function obtenerNoticias(){

    db.collection("news").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("carouselExampleControls");

        var carousel=document.createElement("div");
        carousel.classList.add("carousel-inner");
        /*
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }*/
        var documentos=[];
        var primerItem=document.createElement("div");
         querySnapshot.forEach((doc)=>{
                documentos.push(doc);
         })
        documentos.forEach(function(doc) {
            if(doc.id!="nro")
                {
                var nroNoticia=(doc.id).slice(7);
                var divItem=document.createElement("div");
                divItem.classList.add("carousel-item");
                divItem.onclick=function(){
                  var docRef=db.collection("news").doc("nro");
                  docRef.get().then((documento)=>{
                      if(documento.exists){
                      db.collection("news").doc("nro").update({
                      number: nroNoticia
                      })
                      console.log("update!");
                      }       
                  else{
                      console.log("No update!");
                  }              
                  })    
                  window.open("noticia-plantilla.html");
              }
                //divItem.classList.add("active");
                
                var aItem=document.createElement("a");
                var imgItem=document.createElement("img");
                imgItem.src=doc.data().imagen;
                imgItem.classList.add("rounded");
                imgItem.classList.add("mx-auto");
                imgItem.classList.add("d-block");
                imgItem.width="800";
                imgItem.height="500";
                imgItem.alt="...";

                var divCaption=document.createElement("div");
                divCaption.classList.add("carousel-caption");
                divCaption.classList.add("d-md-block");
                
                var h5Caption=document.createElement("h5");
                h5Caption.classList.add("texto-noticias");
                h5Caption.textContent=doc.data().titulo;

                var pCaption=document.createElement("p");
                pCaption.classList.add("texto-noticias");
                pCaption.textContent=doc.data().resumen;
                
                divCaption.appendChild(h5Caption);
                divCaption.appendChild(pCaption);

                aItem.appendChild(imgItem);

                divItem.appendChild(aItem);
                divItem.appendChild(divCaption);
                carousel.appendChild(divItem);
                
                }
        });     
                primerItem=carousel.firstChild;
                primerItem.classList.add("active");
                contenedor.appendChild(carousel);
              

        });   
}
obtenerNoticias();
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