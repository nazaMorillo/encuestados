/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
  	this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id) {  // agregué esta función
  	//console.log("Estoy en controlador con id de: "+id);
  	this.modelo.borrarPregunta(id);
  },
  borrarEncuesta: function() {  // agregué esta función
  	this.modelo.borrarEncuesta();
  },
};
