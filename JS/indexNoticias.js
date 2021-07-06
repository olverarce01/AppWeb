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
                var nroNoticia=(doc.id).slice(7);
                var divCard=document.createElement("div");
                divCard.classList.add("card");
                divCol.onclick=function(){
            
                    var docRef=db.collection("news").doc("nro");
                    docRef.get().then((doc)=>{
                        if(doc.exists){
                        db.collection("news").doc("nro").update({
                        number: nroNoticia
                        })
                        console.log("update!");
                        //obtenerNroNoticia();
                        window.location.href="noticia-plantilla.html";
                    }       
                    else{
                        console.log("No update!");
                    }              
                    })
                    .catch((error)=>{console.log("error getting document:",error);
                    });   
                }

                //var aEnlace=document.createElement("a");
                //aEnlace.classList.add("links");

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

                //aEnlace.appendChild(imagenCard);
                //aEnlace.appendChild(divCardBody);

                divCard.appendChild(imagenCard);
                divCard.appendChild(divCardBody);
                
                divCol.appendChild(divCard);
                contenedor.appendChild(divCol);
                }


            })


     });   
}
obtenerNoticias();
function obtenerItemEquipo(){

    db.collection("itemEquipo").get().then((querySnapshot)=>{
        var contenedor=document.getElementById("tablaPosiciones");

        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
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
        contenedor.appendChild(itemRef);
        
        

        var contador=1;
         querySnapshot.forEach((doc)=>{
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
                col1.textContent=doc.data().pos;    //pos


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
                
                contenedor.appendChild(itemEquipo);
                }
             
         })


     });   
}
obtenerItemEquipo();