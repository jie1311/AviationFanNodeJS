module.exports = class Airport{
    constructor(iata, city, lng, lat) {
        this.iata = iata;
        this.city = city;
        this.lat = lat;
        this.lng = lng;
    }
};