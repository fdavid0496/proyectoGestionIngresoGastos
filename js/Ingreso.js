class Ingreso extends Dato {
    static atrContadorIngresos = 0;

    constructor(prmDescripcion, prmValor) {
        super(prmDescripcion, prmValor);
        this._atrId = ++Ingreso.atrContadorIngresos;
    }

    get id() {
        return this._atrId;
    }
}