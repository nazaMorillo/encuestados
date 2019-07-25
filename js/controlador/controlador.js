/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  recuperarPreguntas: function() {
      this.modelo.actualizarPreguntas();
  },
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  buscarPreguntaPorId: function(id) {  // agregué esta función
    return this.modelo.buscarPreguntaPorId(id);;
  },
  editarPregunta: function(id, pregunta, respuestas) {
      this.modelo.editarPregunta(id, pregunta, respuestas);
  },
  borrarPregunta: function(id) {  // agregué esta función
    //console.log("Estoy en controlador con id de: "+id);
    this.modelo.borrarPregunta(id);
  },
  borrarEncuesta: function() {  // agregué esta función
    this.modelo.borrarEncuesta();
  },
  agregarVoto: function(nombrePregunta,respuestaSeleccionada) {  // agregué esta función
    this.modelo.incrementarVotoRespuesta(nombrePregunta,respuestaSeleccionada);
  },
};
