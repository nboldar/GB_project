"use strict";

const cart = {
    settings: {
        quan: 1,
        price: 180,

    },
    coupon: 100,
    grandTotal: 0,
    proceedSubtotal: 0,
    sumOfSubtotals() {
        let allSums = document.querySelectorAll('.subtotal');
        for (let x = 0; x < allSums.length; x++) {
            this.proceedSubtotal += +allSums[x].innerHTML;
        }
        document.querySelector('.proceed-subtotal').innerHTML = `sub total $${this.proceedSubtotal}`;
        document.querySelector('.grand-price').innerHTML=`$${this.proceedSubtotal-this.coupon}`;
    },


    // grandTotalSum() {
    //     this.grandTotal = this.proceedSubtotal - this.coupon;
    //     let grandSum = document.querySelector('.proceed-price');
    //     grandSum.innerHTML = `$${this.grandTotal}`;
    // },

    quentityOfItems: null,
    addPrice() {
        let priceBox = document.querySelectorAll('.unite-price');
        let subTotal = document.querySelectorAll('.subtotal');
        for (let y = 0; y < priceBox.length; y++) {
            priceBox[y].innerHTML = `$${this.settings.price}`;
            subTotal[y].innerHTML = `${this.settings.price * this.settings.quan}`;
        }
    },


    inCartItems: [],
    initItems() {
        this.addPrice();
        this.quantity();
        this.sumOfSubtotals();

        // this.grandTotalSum();

        this.inCartItems = document.querySelectorAll('.cart-content');
        document.addEventListener('click', event => this.eventHandler(event));

    },
    eventHandler(event) {
        this.deleteItem(event);
    },
    deleteItem(event) {
        if (event.target.classList.contains('fa-times-circle')) {
            let elem = event.target.parentNode.parentNode;
            elem.remove();
            this.proceedSubtotal = 0;
            this.sumOfSubtotals();
        }
    },
    quantity() {
        this.quentityOfItems = document.querySelectorAll('.quatity');
        for (let x = 0; x < this.quentityOfItems.length; x++) {
            this.quentityOfItems[x].addEventListener('input', event => this.subtotalSum(event));
        }

    },
    subtotalSum(event) {
        console.log(event.target.parentNode.children[3]);
        const quan = event.target.value;
        const refSum = event.target.parentNode.children[3];
        refSum.innerHTML = quan * this.settings.price;
        this.proceedSubtotal = 0;
        this.sumOfSubtotals();


    },


};
window.onload = () => cart.initItems();