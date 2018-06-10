class Basket {
    constructor(idBasket) {
        this.id = idBasket;

        this.countGoods = 0; //Общее кол-во товаров в корзине
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров

        //Получаем уже добавленные в корзину товары
        this.getBasket();
    }

    render($jQueryElement) {
        console.log(this.basketItems[0]);
        let $basketDiv = $('<div />', {
            id: this.id,
            text: 'Корзина'
        });

        let $basketItemsDiv = $('<div />', {
            id: `${this.id}_items`
        });

        $basketItemsDiv.appendTo($basketDiv);
        $basketDiv.appendTo($jQueryElement);
    }

    getBasket() {
        let appendId = `#${this.id}_items`;
        //let self = this;
        $.ajax({
            type: 'GET',
            url: './json/basket_get.json',
            context: this,
            success: function (data) {
                let $basketData = $('<div />', {
                    id: 'basket_data'
                });

                this.countGoods = data.basket.length;
                this.amount = data.amount;

                for (let key in data.basket) {
                    this.basketItems.push(data.basket[key]);
                }

                $basketData.append(`<p>Всего товаров: ${this.countGoods}</p>`);
                $basketData.append(`<p>Общая сумма: ${this.amount}</p>`);
                $basketData.appendTo(appendId);
            }
            ,
            error: function (error) {
                console.log('Произошла ошибка при получении данных', error);
            },
            dataType: 'json'
        });
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
    remove(id_product, price) {
        //splice
        console.log(this.basketItems);
        let basketRemoveItem = {
            id_product,
            price //price: price
        };
        for (let i = 0; i < this.basketItems.length; i++) {
            console.log(this.basketItems[i].id_product);
            if (basketRemoveItem.id_product === this.basketItems[i].id_product) {

                this.basketItems.splice(i, 1);
                this.countGoods--;
                this.amount = this.amount - price;
                this.refresh();
                break;
            }


        }

    }

    refresh() {
        let $basketData = $('#basket_data');
        $basketData.empty(); //Очищаем содержимое контейнера
        $basketData.append(`<p>Всего товаров: ${this.countGoods}</p>`);
        $basketData.append(`<p>Общая сумма: ${this.amount}</p>`);
    }
}