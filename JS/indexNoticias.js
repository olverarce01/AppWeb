var config = {
  apiKey: "AIzaSyC7KErVtON_zmPk9wK40pm4RIR1wIBSdZo",
  authDomain: "chileanpremierleague-cf84c.firebaseapp.com",
  databaseURL: "https://chileanpremierleague-cf84c-default-rtdb.firebaseio.com",
  projectId: 'chileanpremierleague-cf84c',
  storageBucket: "chileanpremierleague-cf84c.appspot.com"
};
firebase.initializeApp(config);

var db = firebase.firestore();


  function obtenerNoticias(){

    db.collection("news").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("contenedorCardsNoticias");

        contenedor.removeChild(contenedor.firstChild);
        var documentos=[];
         querySnapshot.forEach((doc)=>{
            documentos.push(doc);
            })
        var divRow=document.createElement("div");
        divRow.classList.add("row");

        documentos.forEach(function(doc) {
            if(doc.id!="nro")
                {
                var divCol=document.createElement("div");
                divCol.classList.add("col-md-12");
                divCol.classList.add("col-lg-6");
                divCol.id=doc.id;                           //id
                var nroNoticia=(doc.id).slice(7);

                var aEnlace=document.createElement("a");


                var divCard=document.createElement("div");
                divCard.classList.add("card");
                aEnlace.onclick=function(){
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

                //aEnlace.classList.add("links");
                //aEnlace.href="noticia-plantilla.html";

                var imagenCard=document.createElement("img");
                imagenCard.classList.add("card-img-top");
                imagenCard.src=doc.data().imagen;
                imagenCard.width="250";
                imagenCard.height="150";
                imagenCard.alt="Card image cap";

                var divCardBody=document.createElement("div");
                divCardBody.classList.add("card-body");

                var h5Titulo=document.createElement("h5");
                h5Titulo.textContent=doc.data().titulo;

                var pContenido=document.createElement("p");
                pContenido.classList.add("card-text");
                pContenido.textContent=doc.data().resumen;

                divCardBody.appendChild(h5Titulo);
                divCardBody.appendChild(pContenido);

                aEnlace.appendChild(imagenCard);
                aEnlace.appendChild(divCardBody);

                //divCard.appendChild(imagenCard);
                //divCard.appendChild(divCardBody);
                
                //divCol.appendChild(divCard);

                divCard.appendChild(imagenCard);
                divCard.appendChild(divCardBody);
                
                aEnlace.appendChild(divCard);
                divCol.appendChild(aEnlace);
                
                divRow.appendChild(divCol);
                }
        });
            contenedor.appendChild(divRow);
     });   
}
obtenerNoticias();
function obtenerItemEquipo(){
    db.collection("itemEquipo").get().then((querySnapshot)=>{
        var documentos=[];
        var contenedor=document.getElementById("contenedorItemEquipo");
        document.removeChild(document.firstChild);

        var tablapos=document.createElement("table");
        tablapos.classList.add("default");
        tablapos.id="tablaPosiciones";

        var itemRef=document.createElement("tr");
        var pos=document.createElement("th");
        pos.textContent="Pos";
        var icono=document.createElement("th");
        var club=document.createElement("th");
        club.textContent="Club";
        var pts=document.createElement("th");
        pts.textContent="PTS";
        var pj=document.createElement("th");
        pj.textContent="PJ";
        var df=document.createElement("th");
        df.textContent="DF";
        itemRef.appendChild(pos);
        itemRef.appendChild(icono);
        itemRef.appendChild(club);
        itemRef.appendChild(pts);
        itemRef.appendChild(pj);
        itemRef.appendChild(df);
        tablapos.appendChild(itemRef);
        
        

        var contador=1;
         querySnapshot.forEach((doc)=>{
                documentos.push(doc);
         })
         documentos.sort(function(a, b) {
             if(b.data().pts==a.data().pts){
                 if(b.data().pj==a.data().pj){
                     return b.data().df - a.data().df;
                 }
                return b.data().pj - a.data().pj;
             }
            return b.data().pts - a.data().pts;
          });

         var contadorpos=1;
         documentos.forEach(function(doc) {
    
            if(doc.id!="nro")
            {
            var itemEquipo=document.createElement("tr");
            itemEquipo.classList.add("itemImpar");
            if(contador%2!=0)
            {   itemEquipo.classList.add("itemImpar");
            }
            else{
                itemEquipo.classList.add("itemPar");
            }
            contador++;
            var col1=document.createElement("td");
            col1.textContent=contadorpos;    //pos
            contadorpos++;
    
            var col2=document.createElement("td");
            var imgIco=document.createElement("img");
            imgIco.src=doc.data().icono;
            imgIco.width="35";
            imgIco.height="35";
            
            col2.appendChild(imgIco);
    
            var col3=document.createElement("td");
            col3.textContent=doc.id;
    
            var col4=document.createElement("td");
            col4.textContent=doc.data().pts;
    
            var col5=document.createElement("td");
            col5.textContent=doc.data().pj;
    
            var col6=document.createElement("td");
            col6.textContent=doc.data().df;
    
            itemEquipo.appendChild(col1);
            itemEquipo.appendChild(col2);
            itemEquipo.appendChild(col3);
            itemEquipo.appendChild(col4);
            itemEquipo.appendChild(col5);
            itemEquipo.appendChild(col6);
            
            tablapos.appendChild(itemEquipo);
            }
         });
         contenedor.appendChild(tablapos);
     });   
  
}
obtenerItemEquipo();
//notificaciones
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