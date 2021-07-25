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

