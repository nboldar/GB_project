$(document).ready(function () {
    menu.initShowSubMenu();
    //Создаем экземпляр корзины
    let catalogArr=[];
    let basket = new Basket('shopping-cart-wrapper', 'cart-item-amount', 'proceed-subtotal', 'grand-price', 'total-mini-cart');
    $('body').on('click', function (event) {
        let $target = $(event.target);
        if ($target.hasClass("fa-times-circle") == true) {
            let idProduct = parseInt($target.parent().attr('data-id'));
            let sum = parseInt($target.parent().find('span.card-sum').text().slice(1));
            basket.remove(idProduct, sum);
        }
        if ($target.is('.cart-img')) {
            $('.cart-mini').toggleClass('show');
            $('.pointer').toggleClass('show');
        }
        if ($target.is('.cart-add>img')) {
            let id_product = parseInt($target.attr('data-id'));
            catalogArr.forEach(function (elem) {
                if(elem.id===id_product){
                    basket.add(elem);
                    $('#dialog').dialog({
                        modal: true,
                        hide: {effect: "blind", duration: 300},
                        show: {effect: "blind", duration: 300},
                        title: 'Thanks! Your purchase added to cart!',
                        width: 400,
                        height:40,
                    })
                }
            })
        }
        if($target.is('button.clear-btn')){
            console.log('its ok');
            basket.allremove();
        }
        if($target.is('a')){
            event.preventDefault();
        }

    });
    $('#shopping-cart-wrapper').on('change', function (event) {
        let $input = $(event.target);
        if ($input.hasClass('quatity') == true) {
            let idProduct = $input.attr('data-id');
            let val = parseInt($input.val());
            let price = parseInt($input.parent().find('span.unite-price').text().slice(1));
            $input.parent().find('.card-sum').html(`$${price * val}`);
            basket.addOneMoreItem(idProduct, val);
        }


    });
    let product1 = new Product(18, 'mango skirts', 'img/product-card-img/regular/18.png', 38);
    catalogArr.push(product1);
    let product2 = new Product(17, 'mango sweater', 'img/product-card-img/regular/17.png', 54);
    catalogArr.push(product2);
    let product3 = new Product(16, 'mango polo', 'img/product-card-img/regular/16.png', 78);
    catalogArr.push(product3);
    let product4 = new Product(15, 'mango jacket', 'img/product-card-img/regular/15.png', 39);
    catalogArr.push(product4);
    let product5 = new Product(9, 'mango jacket', 'img/product-card-img/regular/9.png', 46);
    catalogArr.push(product5);
    let product6 = new Product(13, 'mango costume', 'img/product-card-img/regular/13.png', 61);
    catalogArr.push(product6);
    let product7 = new Product(12, 'mango trousers', 'img/product-card-img/regular/12.png', 78);
    catalogArr.push(product7);
    let product8 = new Product(11, 'mango coat', 'img/product-card-img/regular/11.png', 29);
    catalogArr.push(product8);
    let product9 = new Product(10, 'mango scarf', 'img/product-card-img/regular/10.png', 12);
    catalogArr.push(product9);
    catalogArr.forEach(function (elem) {
        elem.renderInCatalog($('.product-search-product-card'))
    });

});