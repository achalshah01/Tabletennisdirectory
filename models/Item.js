

class Item {


    constructor(itemCode, itemName, subCategory,brand, Description, rating, imageUrl) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._catalogCategory = subCategory;
        this._brand = brand;
        this._description = Description;
        this._rating = rating;
        this._imageURL = imageUrl;
    }


    /**
     *
     * Getter and Setters
     */

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get subCategory() {
        return this._catalogCategory;
    }
    get brand() {
        return this._brand;
    }
    set brand(value) {
        this._brand = value;
    }
    set subCategory(value) {
        this._catalogCategory = value;
    }



    get Description() {
        return this._description;
    }

    set Description(value) {
        this._description = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get imageUrl() {
        return this._imageURL;
    }

    set imageUrl(value) {
        this._imageURL = value;
    }
getImageURL(){
  return this._imageURL;
}

}

module.exports = Item;
