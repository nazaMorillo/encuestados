/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this); // agregué esta liniea
  this.encuestaBorrada = new Evento(this); // agregué esta liniea
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    //this.ultimoId=Math.max(listaId);    
    return this.ultimoId;// agregué esta linea
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    //console.log("Ultimo id: "+id);
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.ultimoId=id;
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function(id){ // agregué este metodo
    //console.log("Estoy en modelo con id de : "+id);
    this.preguntas = this.preguntas.filter(function(pregunta) { return pregunta.id !== id }); // filtramos
    console.log("Estoy en modelo con las preguntas que quedaron");
    console.log(this.preguntas );
    this.guardar();
    this.preguntaBorrada.notificar();
  },
  borrarEncuesta: function(){ // agregué este metodo
    this.preguntas = [];
    console.log(this.preguntas );
    this.guardar();
    this.preguntaBorrada.notificar();
  },
  //se guardan las preguntas
  guardar: function(){
  },
};
