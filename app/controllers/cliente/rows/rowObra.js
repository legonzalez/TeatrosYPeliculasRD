var args = arguments[0] || {};
var obra = (args.obra) ? args.obra :{};
var listadoDeObras = Alloy.Collections.instance('obra');
listadoDeObras.fetch();

$.filaObra.modelId =obra.identificador || '';
$.titulo.text =obra.titulo || '';
$.filaObra.num = args.num || '';
$.leftImage.image =   (obra.portada !='default.jpg' ) ?obra.portada : '/images/portadas/default.jpg';
$.stars.image =  (obra.stars ) ?'/images/stars/'+obra.stars+'star.png':'/images/stars/0star.png';
$.votos.text = (obra.stars ) ?'('+obra.votos+')':'(0)';
$.rightImage.portada='blue';
if(args.rownum == 0) {
	$.filaObra.backgroundImage = '/images/topRow.png';
	$.filaObra.selectedBackgroundImage = '/images/topRowSelected.png';
} else if(args.rownum == 'last') {
	$.filaObra.backgroundImage = '/images/bottomRow.png';
	$.filaObra.top=7;
	$.filaObra.selectedBackgroundImage = '/images/bottomRowSelected.png';		
}

$.filaObra.addEventListener('click', function(e) {
	//Ti.API.info($.filaObra.modelId);
	//Ti.API.info(JSON.stringify(listadoDeObras.get($.filaObra.modelId)));
	var detailContorller = Alloy.createController('cliente/detalles/obra',{
        obra : listadoDeObras.get($.filaObra.modelId)
    });
	detailContorller.getView().open();
});
