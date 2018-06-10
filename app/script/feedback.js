"use strict";
const validationForm = {
    nameId: 'name',
    phoneId: 'phone',
    emailId: 'email',
    submitBtnId: 'submit',
    resetBtnId: 'reset',
    conteinerId: 'conteiner',
    messageId: 'message',
    cityId: 'city',
    birthId: 'birth',
    dialogId: 'dialog',
    nameErrorMassege: 'Имя введено не верно!',
    phoneErrorMassege: 'Телефон введен не верно!',
    emailErrorMassege: 'Електронный адрес введен не верно!',
    birthErrorMassege: 'Вы не ввели дату рождения!',
    cityErrorMassege: 'Вы не выбрали город!',
    textErrorMassege: 'Ваше сообщение без текста!',
    errorDialog: [],
    namePattern: /^[a-zа-яё\s]{2,40}$/i,
    phonePattern: /^7\d{10}$/,
    emailPattern: /^[\da-z]+[\w\._-][\da-z]+@[\da-z]+[-\w\.][\da-z]+\.[a-z]{2,21}(?!\.)$/i,
    init() {
        const elemName = $(`#${this.nameId}`);
        const elemPhone = $(`#${this.phoneId}`);
        const elemEmail = $(`#${this.emailId}`);
        const buttonSubmit = $(`#${this.submitBtnId}`);
        const buttonReset = $(`#${this.resetBtnId}`);
        const city = $(`#${this.cityId}`);
        const textBlock = $(`.${this.messageId}`);
        const birth = $(`#${this.birthId}`);
        let self = this;
        buttonReset.on('click', function () {
            validationForm.reset();
        });
        $(function () {
            birth.datepicker({
                firstDay: 1,
                dateFormat: "dd.mm.yy",
                dayNamesMin: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
                monthNames: ["ЯНВ", "ФЕВ", "МАРТ", "АПР", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГ", "СЕН", "ОКТ", "НОЯ", "ДЕК"],
                changeYear: true,
                changeMonth: true,
                minDate: new Date(1918, 1 - 1, 1),
                yearRange: "1918:2018"
            });

        });

        buttonSubmit.on('click', function (event) {
            event.preventDefault();
            self.errorDialog.length = 0;
            if (!self.namePattern.test(elemName.val())) {
                self.errorFunc(elemName,self.nameErrorMassege);
            } else {
                elemName.removeClass('error', 500)
            }

            if (!self.phonePattern.test(elemPhone.val())) {
                self.errorFunc(elemPhone,self.phoneErrorMassege);
            } else {
                elemPhone.removeClass('error', 500)
            }

            if (!self.emailPattern.test(elemEmail.val())) {
                self.errorFunc(elemEmail,self.emailErrorMassege);
            } else {
                elemEmail.removeClass('error', 500)
            }

            if (textBlock.val() === undefined || textBlock.val() === '') {
                self.errorFunc(textBlock,self.textErrorMassege);
            } else {
                textBlock.removeClass('error', 500);
            }
            if (city.val() === undefined || city.val() === '') {
                self.errorFunc(city,self.cityErrorMassege);
            } else {
                city.removeClass('error', 500);
            }
            if (birth.val() === undefined || birth.val() === '') {
                self.errorFunc(birth,self.birthErrorMassege);
            } else {
                birth.removeClass('error', 500);
            }
            console.log(self.errorDialog);
            if (self.errorDialog.length > 0) {
                self.dialog(self.errorDialog, 'Внимание ошибки!');
            } else {
                self.postfeedback();
                self.reset();
                self.errorDialog.push('Ваш сообщение отправлено!');
                self.dialog(self.errorDialog, 'Спасибо!');
            }
        });

    },
    errorFunc(element,sms){
        let self=this;
        element.addClass('error', 500);
        element.effect('pulsate', 'slow');
        self.errorDialog.push(sms);
    },
    dialog(arr, titleTxt) {
        let self = this;
        let dialogElem = $(`#${self.dialogId}`);
        dialogElem.empty();
        $.each(arr, function (i, elem) {
            let elemP = $('<p></p>');
            elemP.html(`${elem}`);
            dialogElem.append(elemP);
        });
        $(function () {
            dialogElem.dialog({
                modal: true,
                hide: {effect: "drop", duration: 1000},
                show: {effect: "blind", duration: 800},
                title: `${titleTxt}`,
                width: 500,
            });
        });
    },
    postfeedback(){
        $.ajax({
            type:'POST',
            url:'json/sendFeedback.json',
            success: function (data) {
                $data = data.feedback;
            },
            error: function (error) {
                console.log('Ошибка получения данных', error);
            },
            dataType: 'json'
        });
    },
    reset() {
        let allInputs = $('.feedback-input');
        let textField = $(`.${this.messageId}`);
        allInputs.val(function (i, text) {
            return '';
        });
        textField.val(function (i, text) {
            return '';
        });
    },
};
$(document).ready(function () {

    const $input = $('#city');
    const $search = $('#search');
    let $data = [];
    /**
     * делаем ajax запрос и получаем массив названий городов
     */
    $.ajax({
        type: 'GET',
        url: 'json/cities.json',
        success: function (data) {
            $data = data.city;
        },
        error: function (error) {
            console.log('Ошибка получения данных', error);
        },
        dataType: 'json'
    });
    /**
     * создаем переменную итератор для выбора города кнопкой "вниз"
     * @type {number}
     */
    let i = 0;
    /**
     * вешаем обработчик на форму
     */
    $input.on('input', function () {
        // обнуляем итератор
        i = 0;
        //очищаем выпадающий список
        $search.empty();
        // проходимся по каждому элементу массива
        $data.forEach(function (elem) {
            let inputLen = $input.val().length;
            // проверка и автовставка города при полном вводе города ели такой есть в списке
            if ($input.val().toLowerCase().indexOf(elem.toLowerCase()) === 0) {
                console.log('ok');
                $input.val(elem);
                $search.css('display', 'none');
                return;
            }
            //проверяем совпадает ли то что вводится с чем то из массива вне зависимости регистра
            if ($input.val().toLowerCase() === elem.toLowerCase().substr(0, inputLen)) {
                //если да выводим обертку
                $search.css('display', 'block');
                //создаем элемент выпадающего списка
                let $searchItem = $('<div>', {class: "search-item"});
                //... и вставляем его в обертку
                $searchItem.appendTo('#search');
                //запоняем текстом
                $searchItem.html(elem);
                // и вешаем на обработчик на клик
                $searchItem.on('click', function () {
                    $input.val($searchItem.text());
                    $search.css('display', 'none');
                });
            }
        });
    });
    /**
     * обработчик клика вне формы для скрытия списка
     */
    $(document).on('click', function (event) {
        if (event.target == $search || event.target == $input) {
            return;
        } else {
            $search.empty();
            $search.css('display', 'none');
        }
    });
    /**
     * обработчик листания элементов списка кнопкой вниз
     */
    $(document).keydown(function (event) {
        // event.preventDefault();
        let $item = $(".search-item");
        let lastItemIndex = $item.length - 1;
        if (event.keyCode === 40) {
            // проверяем если список из одного элемента, если да выделяем его
            if (lastItemIndex === 0) {
                $item.addClass("active-search-city");
                return;
            }
            /**
             * навигация по элементам списка кнопкой вниз
             */
            switch (i) {
                case 0:
                    $(`.search-item:eq(${i})`).addClass("active-search-city");
                    $(`.search-item:eq(${lastItemIndex})`).removeClass("active-search-city");
                    i++;
                    break;
                case lastItemIndex:
                    $(`.search-item:eq(${lastItemIndex})`).addClass("active-search-city");
                    $(`.search-item:eq(${lastItemIndex - 1})`).removeClass("active-search-city");
                    i = 0;
                    break;
                default:
                    $(`.search-item:eq(${i})`).addClass('active-search-city');
                    $(`.search-item:eq(${i - 1})`).removeClass('active-search-city');
                    i++;
                    break;
            }
        }
        /**
         *
         * обработчик нажатия кнопки Enter, если нажать выбранный элемент попадет в инпут
         и закроется список
         */
        if (event.keyCode == 13) {
            $input.val($('.search-item.active-search-city').text());
            $search.css('display', 'none');
        }
    });


});

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
    validationForm.init();
    var aSlider = new Slider("#slider");
    $('.subscribe-mail').tooltip();

});
// menu.initShowSubMenu();
