
function cambiarPagina(page) 
{
	$.mobile.changePage("#" + page, 
		{
			transition: "none"
        });
}

$(document).ready(function()
{
	var hoteles = [];
	var marcadores = [];
	var puntos = [];
	var marcadorRegistro;
	var mapaRegistro;
	var latitudPunto;
	var longitudPunto;
	var latlngInicial = new google.maps.LatLng(19.4978, -99.1269); 

	$("#botonRegistrar").click(function()
	{
		var nombre = $("#nombre").val();
		var ciudad = $("#ciudad").val();
		var telefono = $("#telefono").val();
		var estrellas = $("#estrellas").val();

		var hotel =
		{
			nombre: nombre,
			ciudad: ciudad,
			telefono: telefono,
			estrellas: estrellas
		}

		var punto = 
		{
			latitud: latitudPunto,
			longitud: longitudPunto        
		};

		puntos.push(punto);

		hoteles.push(hotel);

		alert("Registro Exitoso")

		marcadorRegistro.setPosition(latlngInicial);
		mapaRegistro.setCenter(latlngInicial);

		limpiarCampos();
	});

	$("#botonLista").click(function()
	{
		var tablaHoteles = $("#tablaHoteles");
		$(".hotel").remove();

		for (var i = 0; i < hoteles.length; i++)
		{
			var tr = $("<tr></tr>");
			tr.attr("class","hotel");

			var td = $("<td></td>");
			var a = $("<a></a>").text(hoteles[i].nombre);
			a.attr("class","ui-btn")
			a.attr("index", i)
			a.click(function() 
				{
					var i = $(this).attr("index");
					$("#nombreHotel").text(hoteles[i].nombre);
					$("#ciudadHotel").text(hoteles[i].ciudad);
					$("#telefonoHotel").text(hoteles[i].telefono);
					$("#estrellasHotel").text(hoteles[i].estrellas);

					cambiarPagina('pagina4');
				});
			a.click(function mostrarMapa()
			{
				var opciones = 
				{
					zoom: 3,
					center: latlngInicial,
					mapTypeId: google.maps.MapTypeId.ROADMAP        
				};

				var mapa = new google.maps.Map(document.getElementById("divMapa"), opciones);    
				
                var latlngnN = new google.maps.LatLng(puntos[i].latitud, puntos[i].longitud);
                var marker = new google.maps.Marker(
                	{
                		position: latlngnN,
                		map: mapa     
                	});

                mostrarMapa();
            });
			
			tr.append(td);
			td.append(a);
			tablaHoteles.append(tr);
		}
		cambiarPagina("pagina3");
	});

	function mostrarMapaRegistro() 
	{
		var opciones = 
		{
			zoom: 3,
			center: latlngInicial,
			mapTypeId: google.maps.MapTypeId.ROADMAP        
		};

		mapaRegistro = new google.maps.Map(document.getElementById("divMapaRegistro"), opciones);   
		
		marcadorRegistro = new google.maps.Marker(
			{
				position: latlngInicial,
                map: mapaRegistro,
                draggable: true     
            });

		google.maps.event.addListener(marcadorRegistro, 'dragend', function(event) 
			{
				latitudPunto = event.latLng.lat();
                longitudPunto = event.latLng.lng();
            });
	}

	mostrarMapaRegistro();

	function limpiarCampos()
	{
		$("#nombre").val("");
		$("#ciudad").val("");
		$("#telefono").val("");
		$("#estrellas").val(""); 
	}

});








