class Basket {
    constructor(idBasket, idGoodsAmount, classSubtotal, classGrandtotal, idTotalMiniCart) {
        this.id = idBasket;
        this.idGoodsAmount = idGoodsAmount;
        this.classSubtotal = classSubtotal;
        this.classGrandtotal = classGrandtotal;
        this.idTotalMiniCart = idTotalMiniCart;
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
        let $totalMiniCart = $(`#${this.idTotalMiniCart}`);
        $goodsAmountDiv.html(this.countGoods);
        $subTotalSpan.html(`sub total $${this.amount}`);
        $grandTotalSpan.html(`$${this.amount - this.discount}`);
        $totalMiniCart.html(`$${this.amount}`)
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
                    let id = dataBaseItem.id;
                    let title = dataBaseItem.title;
                    let url = dataBaseItem.url;
                    let price = dataBaseItem.price;
                    this.basketItems.push(dataBaseItem);
                    let item = new Product(id, title, url, price);
                    item.size = dataBaseItem.size;
                    item.quatity = dataBaseItem.quantity;
                    item.color = dataBaseItem.color;
                    item.renderBasketItem($(`#${this.id}`));
                    item.renderMiniBasketItem($('.total-sum'));
                }
            },

            error: function (error) {
                console.log('Произошла ошибка при получении данных', error);
            },
            dataType: 'json'
        });
    }

    amountRefresh() {
        this.amount = 0;
        let self = this;
        this.basketItems.forEach(function (elem) {
            self.amount += (+elem.subamount)
        })
    }

    addOneMoreItem(id_product, val) {
        for (let i = 0; i < this.basketItems.length; i++) {
            if (+id_product === this.basketItems[i].id) {
                this.basketItems[i].quatity = val;
                this.basketItems[i].subamount = val * this.basketItems[i].price;
                $(`#${this.idTotalMiniCart}`)
                    .parent()
                    .parent()
                    .find(`[data-id=${id_product}]`)
                    .find('span')
                    .first()
                    .html(val);
                this.amountRefresh();
                this.render();
            }
        }
    }

    add(elem) {
        elem.subamount = elem.subtotal();
        elem.url = `img/product-card-img/mini/${elem.id}.min.png`;
        this.basketItems.push(elem);
        elem.renderMiniBasketItem($('.total-sum'));
        this.countGoods++;
        this.amountRefresh();
        this.render();//Перерисовываем корзину
    }

    //TODO - удаление товара из корзины
    remove(id_product, sum) {
        let basketRemoveItem = {
            id_product,
            sum //price: price
        };
        for (let i = 0; i < this.basketItems.length; i++) {
            if (basketRemoveItem.id_product === this.basketItems[i].id) {
                this.basketItems.splice(i, 1);
                this.countGoods--;
                let $neededElement=$(`[data-id=${basketRemoveItem.id_product}]`);
                $neededElement.first().remove();
                if($neededElement.hasClass('product-card')==false){
                    $neededElement.remove();
                }

                this.amountRefresh();
                this.render();
                break;
            }
        }
    }
    allremove(){
        this.basketItems.length=0;
        $(`#${this.id}`).empty();
        $(`#${this.idTotalMiniCart}`).parent().parent().children(`[data-id]`).remove();
        this.countGoods=0;
        this.amountRefresh();
        this.render();

    }
}