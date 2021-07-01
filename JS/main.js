firebase.initializeApp({
    apiKey: 'AIzaSyC7KErVtON_zmPk9wK40pm4RIR1wIBSdZo',
    authDomain: 'chileanpremierleague-cf84c.firebaseapp.com',
    projectId: 'chileanpremierleague-cf84c'
  });
  var db = firebase.firestore();

var nameV="anonimo", dateV="7:49pm, Hoy", textV;
function Ready(){
    textV = document.getElementById('exampleFormControlTextarea1').value;
    
}
let listaIds=[];
    document.getElementById('btnComentar').onclick=function(){
        actualizarMensajes();
        Ready();
        db.collection("messages").add({
            name: nameV,
            date: dateV,
            text: textV
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            listaIds.push(docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    
 

   class Media{
            constructor(id,name,date,text)
            {   this.name=name;
                this.date=date;
                this.text=text;
                this.id=id;
            }
            forHtml() {
            this.divMedia=document.createElement("div");
            this.divMedia.classList.add("media");
            this.divMedia.id=this.id;
            
            this.divRow=document.createElement("div");
            this.divRow.classList.add("row");

            this.divCol1=document.createElement("div");
            this.divCol1.classList.add("col-sm-4");
            this.divCol1.classList.add("col-md-3");
            
            this.imgUser=document.createElement("img");
            this.imgUser.classList.add("fotoUser");
            this.imgUser.src="recursos/Usuario.png";
            this.imgUser.width="64 px";
            this.imgUser.height="64 px";
            this.imgUser.alt="";
            
            this.divCol1.appendChild(this.imgUser);

            this.divCol2=document.createElement("div");
            this.divCol2.classList.add("col-sm-8");
            this.divCol2.classList.add("col-md-9");
            
            this.divMediaBody=document.createElement("div");
            this.divMediaBody.classList.add("media-body");
            
                this.nombreMediaInicio=document.createElement("p");
                this.nombreMediaInicio.classList.add("nombre");this.nombreMediaInicio.classList.add("mediaInicio");
                this.nombreMediaInicio.textContent=this.name;
                
                this.span1=document.createElement("span");
                this.span1.textContent=this.date;
                this.nombreMediaInicio.appendChild(this.span1);        
                
                this.comentarioMediaInicio=document.createElement("p");
                this.comentarioMediaInicio.classList.add("comentario");this.comentarioMediaInicio.classList.add("mediaInicio");
                this.comentarioMediaInicio.textContent=this.text;

                this.botonMediaFin=document.createElement("div");
                this.botonMediaFin.classList.add("botones"); this.botonMediaFin.classList.add("mediaFin");

                this.botonResponder=document.createElement("a");
                this.botonResponder.classList.add("opcionComentarios");
                this.botonResponder.href="#";
                this.botonResponder.textContent="Responder";
                this.botonMediaFin.appendChild(this.botonResponder);
                
                this.divMediaBody.appendChild(this.nombreMediaInicio);
                this.divMediaBody.appendChild(this.comentarioMediaInicio);
                this.divMediaBody.appendChild(this.botonMediaFin);
                
                this.divCol2.appendChild(this.divMediaBody);
                
                this.divRow.appendChild(this.divCol1);this.divRow.appendChild(this.divCol2);

                this.divMedia.appendChild(this.divRow);
            return this.divMedia;
            }
    }
    /*parte de comentarios */
    function actualizarMensajes(){
        obtenerNroNoticia();
        db.collection("messages").get().then((querySnapshot)=>{
            var contenedor=document.getElementById("contenedorComentarios");
            while (contenedor.firstChild) {
                contenedor.removeChild(contenedor.firstChild);
            }
             querySnapshot.forEach((doc)=>{
                 var media=new Media(doc.id,doc.data().name,doc.data().date,doc.data().text);
                 contenedor.appendChild(media.forHtml());
             })
         });
       
   }

function obtenerNroNoticia(){
    db.ref().collection("news").doc("NroNoticias").get().then((snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });   
}
/*   
function actualizarNocitia(){
spanNoticia=document.getElementById("texto-noticia");
imgNoticia=document.getElementById("imagen-noticia");
db.collection("noticias").get().then((querySnapshot)=>{
    dataNoticia=querySnapshot[0];
    imgNoticia.src=dataNoticia.data().link;
    spanNoticia.textContent=dataNoticia.data().texto;
    
    
    querySnapshot.forEach((doc)=>{
         var media=new Media(doc.id,doc.data().name,doc.data().date,doc.data().text);
     })

 });
}*/