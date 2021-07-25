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