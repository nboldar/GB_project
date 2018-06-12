class Basket {
    constructor(idBasket, idGoodsAmount, classSubtotal, classGrandtotal) {
        this.id = idBasket;
        this.idGoodsAmount = idGoodsAmount;
        this.classSubtotal = classSubtotal;
        this.classGrandtotal = classGrandtotal;
        this.discount = 0;
        this.countGoods = 0; //Общее кол-во товаров в корзине
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров
        //Получаем уже добавленные в корзину товары
        this.getBasket();
    }

    render() {
        let $goodsAmountDiv = $(`#${this.idGoodsAmount}`);
        let $subTotalSpan = $(`.${this.classSubtotal}`);
        let $grandTotalSpan = $(`.${this.classGrandtotal}`);
        $goodsAmountDiv.html(this.countGoods);
        $subTotalSpan.html(`sub total $${this.amount}`);
        $grandTotalSpan.html(`$${this.amount - this.discount}`);
    }

    getBasket() {
        $.ajax({
            type: 'GET',
            url: './json/basket_get.json',
            context: this,
            success: function (data) {
                this.countGoods = data.basket.length;
                this.amount = data.amount;
                this.render();
                for (let key in data.basket) {
                    let dataBaseItem = data.basket[key];
                    let id = dataBaseItem.id_product;
                    let title = dataBaseItem.title;
                    let url = dataBaseItem.urlimg;
                    let price = dataBaseItem.price;
                    this.basketItems.push(dataBaseItem);
                    let item = new Product(id, title, url, price);
                    item.size = dataBaseItem.size;
                    item.quatity = dataBaseItem.quantity;
                    item.color = dataBaseItem.color;
                    item.renderBasketItem($(`#${this.id}`));

                    item.renderMiniBasketItem($('#cart-mini'));

                }
                this.renderMiniBasket($('#cart-mini'));
            },

            error: function (error) {
                console.log('Произошла ошибка при получении данных', error);
            },
            dataType: 'json'
        });
    }
    renderMiniBasket($jQueryElement){
        let $nameTotalSum=$('<span>total</span>');
        let $totalSum=$(`<span>$${this.amount}</span>`);
        let $goToCartBtn=$('<button />', {
            type:'button',
            text:'go to cart',
            onclick:'location.href="shoping_cart.html"'

        });
        let $checkoutBtn=$('<button />', {
            type:'button',
            text:'checkout',
            onclick:'location.href="checkout.html"'
        });
        $jQueryElement.append($nameTotalSum);
        $jQueryElement.append($totalSum);
        $jQueryElement.append($goToCartBtn);
        $jQueryElement.append($checkoutBtn);

    }

    amountRefresh() {
        this.amount = 0;
        let self = this;
        this.basketItems.forEach(function (elem) {
            self.amount += elem.subamount
        })
    }

    addOneMoreItem(id_product, val) {
        for (let i = 0; i < this.basketItems.length; i++) {
            if (+id_product === this.basketItems[i].id_product) {
                this.basketItems[i].quatity = val;
                this.basketItems[i].subamount = val * this.basketItems[i].price;
                this.amountRefresh();
                this.render();
            }
        }
    }

    add(id_product, price) {
        let basketNewItem = {
            id_product,
            price //price: price
        };

        this.basketItems.push(basketNewItem);
        this.countGoods++;
        this.amount += price; //this.amount = this.amount + price;
        this.refresh(); //Перерисовываем корзину
    }

    //TODO - удаление товара из корзины
    remove(id_product, sum) {
        let basketRemoveItem = {
            id_product,
            sum //price: price
        };
        for (let i = 0; i < this.basketItems.length; i++) {
            if (basketRemoveItem.id_product === this.basketItems[i].id_product) {
                this.basketItems.splice(i, 1);
                this.countGoods--;
                $(`[data-id=${basketRemoveItem.id_product}]`).remove();
                this.amountRefresh();
                this.render();
                break;
            }
        }
    }
}