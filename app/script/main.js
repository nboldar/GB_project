$(document).ready(function () {
    //Создаем экземпляр корзины
    let basket = new Basket('shopping-cart-wrapper', 'cart-item-amount', 'proceed-subtotal', 'grand-price');
    $('body').on('click', function (event) {
        let $closeBtn = $(event.target);
        if ($closeBtn.hasClass("fa-times-circle") == true) {
            console.log('ok');
            let idProduct = parseInt($closeBtn.parent().attr('data-id'));
            let sum = parseInt($closeBtn.parent().find('span.card-sum').text().slice(1));
            basket.remove(idProduct, sum);

        }
    });
    $('#shopping-cart-wrapper').on('change', function (event) {
        let $input = $(event.target);
        if ($input.hasClass('quatity') == true) {
            let idProduct = $input.attr('data-id');
            let val = parseInt($input.val());
            let price = parseInt($input.parent().find('span.unite-price').text().slice(1));
            console.log(price);
            $input.parent().find('.card-sum').html(`$${price * val}`);
            basket.addOneMoreItem(idProduct, val);
        }

    })
});