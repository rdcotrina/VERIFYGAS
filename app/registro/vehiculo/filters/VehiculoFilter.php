<?php
/* 
* ---------------------------------------
* --------- CREATED BY LV ----------
* Autor:        Super 
* Fecha:        26-05-2018 04:05:26 
* Descripcion : VehiculoFilter.php
* ---------------------------------------
*/ 

namespace Registro\Vehiculo\Filters;
   
use \Vendor\ValidaForm;

trait VehiculoFilter {
    
    private $_frm;

    use ValidaForm {
        ValidaForm::__construct as private __fvConstruct;
    }

    public function __construct() {
        $this->__fvConstruct();
        $this->_frm = Obj()->Vendor->Request->allForm()->post();
    }
    
    public function isValidate() {
        $this->valida()
            ->filter(["field" => "txt_primernombre", "label" => $this->_frm->primer_nombre])
                ->rule(["rule" => "required"])
                ->rule(["rule" => "minlength:3"])
            ->filter(["field" => "txt_apellidopaterno", "label" => $this->_frm->apellido_paterno])
                ->rule(["rule" => "required"])
                ->rule(["rule" => "minlength:3"])
            ->filter(["field" => "txt_apellidomaterno", "label" => $this->_frm->apellido_materno])
                ->rule(["rule" => "required"])
                ->rule(["rule" => "minlength:3"])
            ->filter(["field" => "txt_nrodocidentidad", "label" => $this->_frm->nro_documento_identidad])
                ->rule(["rule" => "required"])
                ->rule(["rule" => "number"])
            ->filter(["field" => "lst_pais", "label" => $this->_frm->pais])
                ->rule(["rule" => "required"])
            ->filter(["field" => "lst_tipodocumentoidentidad", "label" => $this->_frm->tipo_doc])
                ->rule(["rule" => "required"])
            ->filter(["field" => "txt_celular", "label" => $this->_frm->celular])
                ->rule(["rule" => "required"])
                ->rule(["rule" => "number"])
            ->filter(["field" => "txt_direcciondomicilio", "label" => $this->_frm->direccion_domicilio])
                ->rule(["rule" => "required"])
                ->rule(["rule" => "minlength:10"])
            ->filter(["field" => "txt_aniofabricacion", "label" => $this->_frm->anio_fabricacion])
                ->rule(["rule" => "number"])
            ->filter(["field" => "txt_cilindrada", "label" => $this->_frm->cilindrada])
                ->rule(["rule" => "required"])
            ->filter(["field" => "txt_model", "label" => $this->_frm->modelo])
                ->rule(["rule" => "required"])
            ->filter(["field" => "txt_marka", "label" => $this->_frm->marca])
                ->rule(["rule" => "required"])
            ->filter(["field" => "txt_plaka", "label" => $this->_frm->placa])
                ->rule(["rule" => "required"]);

        if ($this->valida()->isTrue()) {
            return true;
        }
        return false;
    }
    
}