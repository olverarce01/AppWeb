firebase.initializeApp({
    apiKey: 'AIzaSyC7KErVtON_zmPk9wK40pm4RIR1wIBSdZo',
    authDomain: 'chileanpremierleague-cf84c.firebaseapp.com',
    projectId: 'chileanpremierleague-cf84c'
  });
  var db = firebase.firestore();

  function obtenerItemPartido(){

    db.collection("itemPartido").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("contenido");

        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
        var itemBase=document.createElement("tr");
        var icono1=document.createElement("th");
        
        var club=document.createElement("th");
        club.textContent="club";
        var goles1=document.createElement("th");
        var detalle=document.createElement("th");
        detalle.textContent="vs";
        var goles2=document.createElement("th");
        var club2=document.createElement("th");
        club2.textContent="Club";
        var icono2=document.createElement("th");

        itemBase.appendChild(icono1);
        itemBase.appendChild(club);
        itemBase.appendChild(goles1);
        itemBase.appendChild(detalle);
        itemBase.appendChild(goles2);
        itemBase.appendChild(club2);
        itemBase.appendChild(icono2);

       
         querySnapshot.forEach((doc)=>{

                var col1=document.createElement("td");
                var imgIco=document.createElement("img");
                imgIco.src=doc.data().icono1;
                imgIco.width="35";
                imgIco.height="35";
                
                col1.appendChild(imgIco);

                var col2=document.createElement("td");
                col2.textContent=doc.data().nombre1;

                var col3=document.createElement("td");
                col3.textContent=doc.data().goles1;

                var col4=document.createElement("td");
                col4.textContent="-";

                var col5=document.createElement("td");
                col5.textContent=doc.data().goles2;

                var col6=document.createElement("td");
                col6.textContent=doc.data().nombre2;


                var col7=document.createElement("td");
                var imgIco2=document.createElement("img");
                imgIco2.src=doc.data().icono2;
                imgIco2.width="35";
                imgIco2.height="35";
                
                col7.appendChild(imgIco2);

                itemPartido.appendChild(col1);
                itemPartido.appendChild(col2);
                itemPartido.appendChild(col3);
                itemPartido.appendChild(col4);
                itemPartido.appendChild(col5);
                itemPartido.appendChild(col6);
                itemPartido.appendChild(col7);
                
                contenedor.appendChild(itemPartido);
         })
        })
       .then((doc) => {
        console.log("Document written with ID: ", doc.id);
      
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}
obtenerItemPartido();



function obtenerFechas(){

   
        
 
}
obtenerFechas();