class Egreso extends Dato {
    static atrContadorEgresos = 0;

    constructor(prmDescripcion, prmValor) {
        super(prmDescripcion, prmValor);
        this._atrId = ++Egreso.atrContadorEgresos;
    }

    get id() {
        return this._atrId;
    }
}