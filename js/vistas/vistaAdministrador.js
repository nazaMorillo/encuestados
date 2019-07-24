/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
   this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function(){
    contexto.reconstruirLista();
  });

  this.modelo.encuestaBorrada.suscribir(function(){
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $('<li class ="list-group-item" id='+pregunta.id+'>'+pregunta.textoPregunta+'</li>');
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
    //this.modelo.preguntas = [{'textoPregunta': "Mi primer Pregunta", 'id': 0, 'cantidadPorRespuesta': [{'textoRespuesta': "mi unica respuesta", 'cantidad': 2}]}];
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function(respuesta) {
        //completar
        respuesta=$(this).val(); // agregregué esta parte en donde asocio el valor        
        if(respuesta.length > 0 && value.length != null){
          respuestas.push({'textoRespuesta': respuesta, 'cantidad': 0});
        }
      });
      contexto.limpiarFormulario();
      let id = parseInt($('.list-group-item.active').attr('id'));
      if (id) {
        //alert('Estamo activo');
        contexto.controlador.editarPregunta(id, value, respuestas);
      }else{
        //alert('No estamo activo');
        contexto.controlador.agregarPregunta(value, respuestas);
      }      
    });
    //asociar el resto de los botones a eventos
    e.botonEditarPregunta.click(function() { // agregué esta función
      //toma el id de la pregunta seleccionada y le pide al controlador que la recupere de la lista
      let id = parseInt($('.list-group-item.active').attr('id')); // agregué esta linea
      let preguntaRecuperada=contexto.controlador.buscarPreguntaPorId(id);
      // inserta el textoPregunta en el campo de pregunta
      e.pregunta.val(preguntaRecuperada[1].textoPregunta);
      // inserta la respuesta en el campo de respuesta
      $('[name="option[]"]').val(preguntaRecuperada[1].cantidadPorRespuesta[0].textoRespuesta);
    });
    // borrar pregunta por id
    e.botonBorrarPregunta.click(function() { // agregué esta función
      let id = parseInt($('.list-group-item.active').attr('id')); // agregué esta linea
      //console.log(id);
      //en la función del controlador para borrarPregunta paso por parametro id
      contexto.controlador.borrarPregunta(id);
    });
      // Borrar lista
    e.borrarTodo.click(function() {
      contexto.controlador.borrarEncuesta();

    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
