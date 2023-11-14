export default class Item {

    id :number;
    name :string;
    price :number;
    rating :number;
    picture :string;

    constructor(id :number, name :string, price :number, rating :number, picture :string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.picture = picture;
    }
}