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
    this.recuperarDatos();
    this.reconstruirLista();
    this.configuracionDeBotones();
    this.edicion=false;
    
  },
  recuperarDatos: function() {
    this.controlador.recuperarPreguntas();
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
        respuesta=$(this).val(); // agregregué esta parte en donde asocio el valor        
        if(respuesta.length > 0 && value.length != null){
          respuestas.push({'textoRespuesta': respuesta, 'cantidad': 0});
        }
      });
      // validación de item a editar según esté activo o nó y si tiene id o no
      let id = parseInt($('.list-group-item.active').attr('id'));
      if (value=="") {
        alert("Complete campo pregunta por favor");
      }else if (respuestas.length ==0 ) {
        alert("Complete campo respuesta por favor");
      }else if (id && contexto.edicion==true) {
        console.log("Vamos a editar una pregunta");
        contexto.edicion==false;
        contexto.controlador.editarPregunta(id, value, respuestas);
        contexto.limpiarFormulario();                    
      }else {
        console.log("Vamos a agregar una pregunta nueva");
        contexto.controlador.agregarPregunta(value, respuestas);
        contexto.limpiarFormulario();         
      }     
    });
    //asociar el resto de los botones a eventos
    e.botonEditarPregunta.click(function() { // agregué esta función
      //toma el id de la pregunta seleccionada y le pide al controlador que la recupere de la lista
      let id = parseInt($('.list-group-item.active').attr('id')); // agregué esta linea
      let preguntaRecuperada=contexto.controlador.buscarPreguntaPorId(id);
      // inserta el textoPregunta en el campo de pregunta
      e.pregunta.val(preguntaRecuperada[1].textoPregunta);
      contexto.edicion=true;
      e.pregunta.focus();
      setTimeout("window.scroll(0, 0);",300);
      // inserta la respuesta en el campo de respuesta
      //$('[name="option[]"]').val(preguntaRecuperada[1].cantidadPorRespuesta[0].textoRespuesta);
    });
    // borrar pregunta por id
    e.botonBorrarPregunta.click(function() { // agregué esta función
      let id = parseInt($('.list-group-item.active').attr('id')); // agregué esta linea
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
