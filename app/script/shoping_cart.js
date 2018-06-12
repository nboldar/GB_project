"use strict";
function Slider(element) {
    this.el = document.querySelector(element);
    this.init();
}

Slider.prototype = {
    a: undefined,
    b: undefined,
    init: function () {

        this.links = this.el.querySelectorAll("#slider-nav a");
        this.wrapper = this.el.querySelector("#slider-wrapper");
        this.wrapperItems = this.el.querySelectorAll("#slider-wrapper div");
        this.toLeftButton = this.el.querySelector("#slider-wrapper .left");
        this.toRightButton = this.el.querySelector("#slider-wrapper .right");
        this.indexN = 0;
        this.navigate();
        this.a = setInterval(() => this.autoSlide(), 7000);

        // console.log(this.toLeftButton);
    },


    setCurrentLink(link) {
        this.indexN = +link.getAttribute("data-slide");
    }
    ,
    navigate() {
        for (var i = 0; i < this.links.length; ++i) {
            var currentLink = this.links[i];
            currentLink.addEventListener('click', (event) => {
                event.preventDefault();
                this.setCurrentLink(event.target);
                // console.log('что это ' + this.a);

                this.slide();
                this.restartSlide();
            });
        }
        this.navigateToSide();
    },
    restartSlide() {
        clearInterval(this.a);
        clearTimeout(this.b);
        this.b = setTimeout(() => (this.a = setInterval(() => this.autoSlide(), 7000)), 7000);
    },

    slide() {

        for (let x = 0; x < this.wrapperItems.length; x++) {
            if (x === this.indexN) {
                this.wrapperItems[x].className = "showed";
                this.links[x].className = "current";
            } else {
                this.wrapperItems[x].className = "slide";
                this.links[x].className = "";
            }
        }
    },


    navigateToSide() {
        this.toLeftButton.addEventListener('click', () => {
            if (this.indexN === 0) {
                this.indexN = this.wrapperItems.length - 1;
            } else {
                this.indexN--;
            }
            this.slide();
            this.restartSlide();
        });
        this.toRightButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.indexN === this.wrapperItems.length - 1) {
                this.indexN = 0;
            } else {
                this.indexN++;
            }
            this.slide();
            this.restartSlide();
        });
    },

    autoSlide() {
        this.indexN++;
        if (this.indexN === this.wrapperItems.length) {
            this.indexN = 0;
        }
        this.slide();
    },

};


document.addEventListener("DOMContentLoaded", function () {
    var aSlider = new Slider("#slider");
    // menu.initShowSubMenu();
});