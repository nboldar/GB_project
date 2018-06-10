"use strict";
const menu = {
    navigationMAinMenuClass: '.navigation-menu-item',
    navigationSubMenuClass: '.navigation-menu-submenu',
    mainMenuItems: [],
    subMenuItems: [],



    showSubMenu(event) {
        // console.log('show');
        //
        event.target.children[1].classList.remove('hide');
        event.target.children[1].classList.add('show');
    },
    hideSubMenu(event) {
        // console.log('hide');
        //
        //
        event.target.children[1].classList.remove('show');
        event.target.children[1].classList.add('hide');
    },
    initShowSubMenu() {
        let mainMenu = this.mainMenuItems;
        let subMenu = this.subMenuItems;
        subMenu = document.querySelectorAll(this.navigationSubMenuClass);
        // console.log(subMenu);

        mainMenu = document.querySelectorAll(this.navigationMAinMenuClass);
        for (let x = 0; x < mainMenu.length; x++) {

            mainMenu[x].addEventListener("mouseenter", this.showSubMenu);
            mainMenu[x].addEventListener("mouseleave", this.hideSubMenu);
        }
    },

};


// const cart = {
//     settings: {
//         quan: 1,
//         price: 180,
//
//     },
//     coupon: 100,
//     grandTotal: 0,
//     proceedSubtotal: 0,
//     subtotalClass: '.subtotal',
//     proceedSubtotalClass: '.proceed-subtotal',
//     grandPriceClass: '.grand-price',
//     unitePriceClass: '.unite-price',
//     cartContentClass: '.cart-content',
//     closeSimbolClass: 'fa-times-circle',
//
//
//     sumOfSubtotals() {
//         let allSums = document.querySelectorAll(this.subtotalClass);
//         for (let x = 0; x < allSums.length; x++) {
//             this.proceedSubtotal += +allSums[x].innerHTML;
//         }
//         document.querySelector(this.proceedSubtotalClass).innerHTML = `sub total $${this.proceedSubtotal}`;
//         document.querySelector(this.grandPriceClass).innerHTML = `$${this.proceedSubtotal - this.coupon}`;
//     },
//
//
//     // grandTotalSum() {
//     //     this.grandTotal = this.proceedSubtotal - this.coupon;
//     //     let grandSum = document.querySelector('.proceed-price');
//     //     grandSum.innerHTML = `$${this.grandTotal}`;
//     // },
//
//     quentityOfItems: null,
//     addPrice() {
//         let priceBox = document.querySelectorAll(this.unitePriceClass);
//         let subTotal = document.querySelectorAll(this.subtotalClass);
//         for (let y = 0; y < priceBox.length; y++) {
//             priceBox[y].innerHTML = `$${this.settings.price}`;
//             subTotal[y].innerHTML = `${this.settings.price * this.settings.quan}`;
//         }
//     },
//
//
//     inCartItems: [],
//     initItems() {
//         this.addPrice();
//         this.quantity();
//         this.sumOfSubtotals();
//
//         // this.grandTotalSum();
//
//         this.inCartItems = document.querySelectorAll(this.cartContentClass);
//         document.addEventListener('click', event => this.eventHandler(event));
//
//     },
//     eventHandler(event) {
//         this.deleteItem(event);
//     },
//     deleteItem(event) {
//         if (event.target.classList.contains(this.closeSimbolClass)) {
//             let elem = event.target.parentNode.parentNode;
//             elem.remove();
//             this.proceedSubtotal = 0;
//             this.sumOfSubtotals();
//         }
//     },
//     quantity() {
//         this.quentityOfItems = document.querySelectorAll('.quatity');
//         for (let x = 0; x < this.quentityOfItems.length; x++) {
//             this.quentityOfItems[x].addEventListener('input', event => this.subtotalSum(event));
//         }
//
//     },
//     subtotalSum(event) {
//         // console.log(event.target.parentNode.children[3]);
//         const quan = event.target.value;
//         const refSum = event.target.parentNode.children[3];
//         refSum.innerHTML = quan * this.settings.price;
//         this.proceedSubtotal = 0;
//         this.sumOfSubtotals();
//
//
//     },
//
//
// };
const init = {
    initAll() {
        // cart.initItems();
        menu.initShowSubMenu();
    }
};
window.onload = () => init.initAll();