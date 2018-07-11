/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        21-06-2018 08:06:04 
* Descripcion : SeguimientoTour.js
* ---------------------------------------
*/ 
"use strict";

$$.Proceso.SeguimientoTour = class SeguimientoTour {

    main() {
        var tour = new Tour({
            steps: [
                {
                    element: `#ELEMENTO AL QUE SE LE APLICA EL TOUR`,
                    content: 'CONTENIDO DESDE ARRAY JS: APP_TOUR',
                    backdrop: true,
                    backdropPadding: 5,
                    placement: "bottom",
                    reflex: true
                }
            ]
        });
        tour.init();
        tour.restart();
    }
    
}