/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        08-06-2018 07:06:19 
* Descripcion : EntregaTour.js
* ---------------------------------------
*/ 
"use strict";

$$.Proceso.EntregaTour = class EntregaTour {

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