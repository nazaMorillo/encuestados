/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this); // agregué esta liniea
  this.preguntaBorrada = new Evento(this); // agregué esta liniea
  this.encuestaBorrada = new Evento(this); // agregué esta liniea
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let ultimoId=this.ultimoId;
    this.preguntas.forEach(function(pregunta, i){
      ultimoId=pregunta.id;  
      //console.log(pregunta);
    });
    return ultimoId;
  },
  buscarPreguntaPorId: function(id) {
    let indice=0;
    let pregunta=this.preguntas.find(function(pregunta, i) {
      indice=i;
      pregu=pregunta;
      return pregunta.id == id;
    });
    return [indice,pregunta];
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
   editarPregunta: function(id, nombre, respuestas) {
    let indice=this.buscarPreguntaPorId(id);
    var preguntaEditada = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    //console.log(preguntaEditada);
    this.preguntas.splice(indice[0], 1, preguntaEditada);
    this.guardar();
    this.preguntaEditada.notificar();
  },
  borrarPregunta: function(id){ // agregué este metodo
    //console.log("Estoy en modelo con id de : "+id);
    this.preguntas = this.preguntas.filter(function(pregunta) { return pregunta.id !== id });
    this.guardar();
    this.preguntaBorrada.notificar();
  },
  borrarEncuesta: function(){ // agregué este metodo
    this.preguntas = [];
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
  },
};