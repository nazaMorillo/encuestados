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
  editarPregunta: function(id, pregunta, respuestas) {  // agregué esta función
      this.modelo.editarPregunta(id, pregunta, respuestas);
  },
  borrarPregunta: function(id) {  // agregué esta función
    this.modelo.borrarPregunta(id);
  },
  borrarEncuesta: function() {  // agregué esta función
    this.modelo.borrarEncuesta();
  },
  agregarVoto: function(nombrePregunta,respuestaSeleccionada) {  // agregué esta función
    this.modelo.incrementarVotoRespuesta(nombrePregunta,respuestaSeleccionada);
  },
};
