"use strict";
const menu = {
    navigationMAinMenuClass: '.navigation-menu>li',
    navigationSubMenuClass: '.navigation-menu-submenu',
    mainMenuItems: [],
    subMenuItems: [],



    showSubMenu(event) {
        console.log('show');

        event.target.children[1].classList.remove('hide');
        event.target.children[1].classList.add('show');
    },
    hideSubMenu(event) {
        console.log('hide');


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