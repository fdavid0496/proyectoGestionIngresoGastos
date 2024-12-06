class Dato {
    constructor(prmDescripcion, prmValor) {
        this._atrDescripcion = prmDescripcion;
        this._atrValor = prmValor;
    }

    get descripcion() {
        return this._atrDescripcion;
    }

    set descripcion(prmDescripcion) {
        this._atrDescripcion = prmDescripcion
    }

    get valor() {
        return this._atrValor;
    }

    set valor(prmValor) {
        this._atrValor = prmValor;
    }
}