firebase.initializeApp({
    apiKey: 'AIzaSyB7F2CYw8tBu21ZXUen9gOYSryMHnB2hdw',
    authDomain: 'chileanpremierleague-e69f2.firebaseapp.com',
    projectId: 'chileanpremierleague-e69f2'
  });
  var db = firebase.firestore();




function obtenerFechas(){
    var fecha="fecha";
    var i=1;
    var f=17;
    while(i<=f){

        var aux=fecha.concat(i.toString());
     
    db.collection("fechas").doc("fechas").collection(aux).get().then((querySnapshot)=>{
        var documentos=[];
        querySnapshot.forEach((doc)=>{
           
            documentos.push(doc);
        })
        var fechaPartido = "";
        documentos.forEach(function(doc){
if(fechaPartido!=doc.data().nrofecha){
    var div=document.createElement("div");
    div.classList.add("fechapartido")
    div.textContent="Fecha "+doc.data().nrofecha.toString();
    document.getElementById("tablaPosiciones").appendChild(div);
    fechaPartido=doc.data().nrofecha;   

}       
            
            var contenedor=document.getElementById("tablaPosiciones");
            
            var tr=document.createElement("tr");
            tr.classList.add("itemImpar")
            var td1=document.createElement("td");
            //td1.textContent=doc.data().iconoA;
            var imagA=document.createElement("img");
            imagA.src=doc.data().iconoA;
            imagA.width="35";
            imagA.height="35";
            td1.appendChild(imagA);
            var td2=document.createElement("td");
            td2.textContent=doc.data().equipoA;
            var td3=document.createElement("td");
            td3.textContent=doc.data().golesA;
            var td4=document.createElement("td");
            td4.textContent=doc.data().fecha;
            var td5=document.createElement("td");
            td5.textContent=doc.data().golesB;
            var td6=document.createElement("td");
            td6.textContent=doc.data().equipoB;
            var td7=document.createElement("td");
            var imagB=document.createElement("img");
            //td7.textContent=doc.data().iconoB;
            imagB.src=doc.data().iconoB;
            imagB.width="35";
            imagB.height="35";
            td7.appendChild(imagB);
  

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);

            contenedor.appendChild(tr);

          
        });
    })
i++;
}
}
obtenerFechas();
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