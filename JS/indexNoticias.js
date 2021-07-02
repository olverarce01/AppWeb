firebase.initializeApp({
    apiKey: 'AIzaSyC7KErVtON_zmPk9wK40pm4RIR1wIBSdZo',
    authDomain: 'chileanpremierleague-cf84c.firebaseapp.com',
    projectId: 'chileanpremierleague-cf84c'
  });
  var db = firebase.firestore();


  function obtenerNoticias(){

    db.collection("news").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("contenedorCardsNoticias");

        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
         querySnapshot.forEach((doc)=>{
                if(doc.id!="nro")
                {
                var divCol=document.createElement("div");
                divCol.classList.add("col-md-12");
                divCol.classList.add("col-lg-6");
                divCol.id=doc.id;                           //id

                var divCard=document.createElement("div");
                divCard.classList.add("card");
                divCard.onclick=function(){
            
                    var docRef=db.collection("news").doc("nro");
                    docRef.get().then((doc)=>{
                        if(doc.exists){
                        db.collection("news").doc("nro").update({
                        number: nroNoticia
                        })
                        console.log("update!");
                        obtenerNroNoticia();
                    }       
                    else{
                        console.log("No update!");
                    }              
                    })
                    .catch((error)=>{console.log("error getting document:",error);
                    });   
                }

                var aEnlace=document.createElement("a");
                aEnlace.href="noticia-plantilla.html";
                aEnlace.classList.add("links");

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

                divCard.appendChild(aEnlace);
                divCol.appendChild(divCard);
                contenedor.appendChild(divCol);
                }
                /*
                divNoticia.onclick=function(){
                    var imagen=document.getElementById("imagen-noticia");

                    var docRef=db.collection("news").doc("nro");
                    docRef.get().then((doc)=>{
                        if(doc.exists){
                        db.collection("news").doc("nro").update({
                        number: nroNoticia
                        })
                        console.log("update!");
                        obtenerNroNoticia();
                    }       
                    else{
                        console.log("No update!");
                    }              
                    })
                    .catch((error)=>{console.log("error getting document:",error);
                    });   
                }*/
         })


     });   
}
obtenerNoticias();