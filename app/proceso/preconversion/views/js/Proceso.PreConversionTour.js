/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        03-06-2018 01:06:45 
* Descripcion : PreConversionTour.js
* ---------------------------------------
*/ 
"use strict";

$$.Proceso.PreConversionTour = class PreConversionTour {

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