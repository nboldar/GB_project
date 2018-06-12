"use strict";

class Product {
    constructor(id, title, url, price) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.price = price;
        this.size = "l";
        this.color = "white";
        this.quatity = 1
    }

    subtotal() {
        return this.price * this.quatity
    }

    renderBasketItem($jQueryElement) {
        let $itemWrapper = $('<div />', {
            class: 'cart-content',
            'data-id': this.id,
        });
        let $itemCard = $('<div />', {
            class: 'card',
            'data-id': this.id,
        });
        let $itemImg = $('<img>', {
            src: this.url,
            alt: "your choice",
            'data-id': this.id,
        });
        let $itemDescription = $('<div />', {
            class: 'card-description',
            'data-id': this.id,
        });
        let $itemTitle = $(`<span class="card-name">${this.title}</span>`);
        let $itemColor = $(`<span>Color: <span class="card-color">${this.color}</span></span>`);
        let $itemSize = $(`<span>Size: <span class="card-size">${this.size}</span></span>`);
        let $itemInfo = $('<div />', {
            class: 'purchase-info',
            'data-id': this.id,
        });
        let $itemPrice = $(`<span class="unite-price">$${this.price}</span>`);
        let $itemNumber = $('<input />', {
            class: 'quatity',
            'data-id': this.id,
            type: "number",
            value: `${this.quatity}`,
            min: "1",
            max: "1000"
        });
        let $itemShippingInfo = $(`<span class="shipping">free</span>`);
        let $itemSubtotal = $(`<span class="card-sum">$${this.subtotal()}</span>`);
        let $closeBtn = $(`<span class="action fa fa-times-circle"></span>`);
        $jQueryElement.append($itemWrapper);
        $itemWrapper.append($itemCard);
        $itemWrapper.append($itemInfo);
        $itemCard.append($itemImg);
        $itemCard.append($itemDescription);
        $itemDescription.append($itemTitle);
        $itemDescription.append($itemColor);
        $itemDescription.append($itemSize);
        $itemInfo.append($itemPrice);
        $itemInfo.append($itemNumber);
        $itemInfo.append($itemShippingInfo);
        $itemInfo.append($itemSubtotal);
        $itemInfo.append($closeBtn);
    }

    renderMiniBasketItem($jQueryElement) {
        let $itemWrapper = $('<div />', {
            class: 'cart-mini-item-wrapper',
            'data-id': this.id,
        });


        let $itemImg = $('<img>', {
            src: this.url,
            alt: "your choice",
            'data-id': this.id,
        });
        let $itemWrapperForInfo = $('<div />', {

            'data-id': this.id,
        });
        let $title = $('<p />', {
            class: "product-name",
            text: this.title,
        });
        let $price = $('<p />', {
            class: "product-price",

        });
        let $innerPrice = $(`<span>${this.quatity}</span>x<span>$${this.price}</span>`);

        let $deleteBtn = $(`<span class="action fa fa-times-circle"></span>`);
        let $totalAmount = $('<div />', {
            class: 'product-total-sum',

        });
        $itemWrapper.insertBefore($jQueryElement);
        $itemWrapper.append($itemImg);
        $itemWrapper.append($itemWrapperForInfo);
        $itemWrapper.append($deleteBtn);
        $itemWrapperForInfo.append($title);
        $itemWrapperForInfo.append($innerPrice);
    }

    renderInCatalog($jQueryElement) {
        let $itemWrapper = $('<div />', {
            class: 'product-card',
            'data-id': this.id,
        });
        let $itemImg = $('<img />', {
            class: 'product-card-main-img',
            'data-id': this.id,
            src: this.url,
            alt: this.title,
        });
        let $itemDivHelper = $('<div />', {
            class: 'product-card-darken',
            'data-id': this.id,

        });
        let $title = $('<span />', {
            class: "product-name",
            text: this.title,
        });
        let $price = $('<p />', {
            class: "product-price",
            text: `$${this.price}`,
        });
        let $addToCartBtn=$('<a />',{
            class:'product-card-icon cart-add',
            href:'javascript://',
        });
        let $addContinueBtn=$('<a />',{
            class:'product-card-icon cart-continue',
            href:'javascript://',
        });
        let $addToFavouriteBtn=$('<a />',{
            class:'product-card-icon cart-favourite',
            href:'javascript://',
        });
        let addToCartImg=$('<img />',{
            src:'img/icon/add_to_cart.png',
            alt:'Add to cart',
            'data-id': this.id,
        });
        let addContinueImg=$('<img />',{
            src:'img/icon/add_to_cart_copy.png',
            alt:'Buy again',
        });
        let addToFavouriteImg=$('<img />',{
            src:'img/icon/add_to_cart_copy2.png',
            alt:'Add to favourite',
        });
        $jQueryElement.append($itemWrapper);
        $itemWrapper.append($itemImg);
        $itemWrapper.append($itemDivHelper);
        $itemWrapper.append($addToCartBtn);
        $itemWrapper.append($addContinueBtn);
        $itemWrapper.append($addToFavouriteBtn);
        $itemWrapper.append($title);
        $itemWrapper.append($price);
        $addToCartBtn.append(addToCartImg);
        $addContinueBtn.append(addContinueImg);
        $addToFavouriteBtn.append(addToFavouriteImg)
    }

}


class product_class {
    constructor(id, title, url, price, size, subamout) {
    }
}