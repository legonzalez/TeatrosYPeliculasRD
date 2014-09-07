var args = arguments[0] || {};
var comentario = (args.comentario) ? args.comentario :{};

$.nombreUsuario.text =comentario.nombreUsuario || '';
$.fecha.text =comentario.fecha || '';
$.comentario.text =comentario.comentario || '';