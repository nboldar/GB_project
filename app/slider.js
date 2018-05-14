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
        this.a = setInterval(() => this.autoSlide(), 2000);

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
                this.setCurrentLink(event.target);
                // console.log('что это ' + this.a);

                this.slide();

                // clearInterval(this.a);
                // this.a=undefined;
                // this.b = setTimeout(this.a = setInterval(this.autoSlide(),1000), 10000);
                // clearTimeout(this.b);



            });
        }
        this.navigateToSide();
    },
    // timeOut(func) {
    //     setTimeout(func, 5000)
    // },
    // clearTimeO(func) {
    //     clearTimeout(func)
    // },
    // timeIn(func) {
    //     this.clearTimeout();
    //     setInterval(func, 2000)
    // },


    slide() {

        for (let x = 0; x < this.wrapperItems.length; x++) {
            if (x === this.indexN) {
                // console.log(this.wrapperItems[x]);
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
            // console.log(this.wrapperItems.length);
            if (this.indexN === 0) {
                this.indexN = this.wrapperItems.length - 1;
            } else {
                this.indexN--;
            }

            this.slide();

        });
        this.toRightButton.addEventListener('click', () => {
            if (this.indexN === this.wrapperItems.length-1) {
                this.indexN = 0;
            } else {
                this.indexN++;
            }
            this.slide();

        });
    },

    autoSlide() {
        clearTimeout(this.b);
        // console.log(this.b);
        this.b = undefined;
        this.indexN++;
        if (this.indexN === this.wrapperItems.length) {
            this.indexN = 0;
        }

        this.slide();


    }
    ,
}
;

document.addEventListener("DOMContentLoaded", function () {
    var aSlider = new Slider("#slider");

});
