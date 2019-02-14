module.exports = class Aircraft {
    constructor(manufacturer, model, subModel, range, capacity) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.subModel = subModel;
        this.range = range;
        this.capacity = capacity;
    }
};