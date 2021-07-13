firebase.initializeApp({
    apiKey: 'AIzaSyC7KErVtON_zmPk9wK40pm4RIR1wIBSdZo',
    authDomain: 'chileanpremierleague-cf84c.firebaseapp.com',
    projectId: 'chileanpremierleague-cf84c'
  });
  var db = firebase.firestore();
function obtenerFechas(){

   var fecha;
        
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
            var gol=document.createElement("th");
            var detalle=document.createElement("th");
            detalle.textContent="vs"
            var gol2=document.createElement("th");
            var club2=document.createElement("th");
            club2.textContent="Club";
            var icono=document.createElement("th");
            
            itemRef.appendChild(pos);
            itemRef.appendChild(icono);
            itemRef.appendChild(club);
            itemRef.appendChild(gol);
            itemRef.appendChild(detalle);
            itemRef.appendChild(gol2);
            itemRef.appendChild(club2);
            itemRef.appendChild(icono2);
            
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
                    col5.textContent=doc.id;
    
                    var col6=document.createElement("td");
                    col6.textContent=doc.data().df;

                    var col7=document.createElement("td");
                    col7.textContent=doc.id;
    

                    var col2=document.createElement("td");
                    var imgIco=document.createElement("img");
                    imgIco.src=doc.data().icono2;
                    imgIco.width="35";
                    imgIco.height="35";
                    
                    col2.appendChild(imgIco);
    
                    itemEquipo.appendChild(col1);
                    itemEquipo.appendChild(col2);
                    itemEquipo.appendChild(col3);
                    itemEquipo.appendChild(col4);
                    itemEquipo.appendChild(col5);
                    itemEquipo.appendChild(col6);
                    itemEquipo.appendChild(col7);
                    itemEquipo.appendChild(col8);
                    
                    contenedor.appendChild(itemEquipo);
                    }
                 
             })
    
    
         });   
    }
    obtenerItemEquipo();

 
    
}
obtenerFechas();