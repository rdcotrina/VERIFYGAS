"use strict";
$$.Generar.ModuloTour = class ModuloTour {

    main() {
        var tour = new Tour({
            steps: [
                {
                    element: `#${PREBTNCTXT}${this._alias}${APP_BTN.NEW}`,
                    content: APP_TOUR.rol.c_rol,
                    backdrop: true,
                    backdropPadding: 5,
                    placement: "bottom",
                    reflex: true
                }
            ],               
            onNext: (tour) => {  
                //visualiza menu de opciones por registro - las acciones 
                if(tour._current == 2 || tour._current == 3 || tour._current == 4 || tour._current == 5 || tour._current == 6){
                    $(`#tr_${this._gridModulo}_0 div.btn-group`).addClass('open');
                }else{
                    $(`#tr_${this._gridModulo}_0 div.btn-group`).removeClass('open');
                }
            }
        });
        tour.init();
        tour.restart();
    }
    
};