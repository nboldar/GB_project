class Good
{
    constructor(id, title, price){
        this.id = id;
        this.title = title;
        this.price = price;
    }

    render($jQueryElement){
        let $goodContainer = $('<div />', {
            class: 'good',
            'data-id': this.id,
        });

        let $goodTitle = $('<p />', {
            text: this.title
        });

        let $goodPrice = $(`<p>Цена: <span class="product-price">${this.price}</span> руб.</p>`);

        let $goodBuyBtn = $('<button />', {
            class: 'buygood',
            'data-id': this.id,
            text: 'Купить'
        });

        //TODO: Добавить кнопку для удаления
        let $goodRemoveBtn=$('<button />', {
           class:  'removegood',
            'data-id': this.id,
            text: 'Удалить'
        });
        //Объединяем элементы для получения структуры
        $goodTitle.appendTo($goodContainer);
        $goodPrice.appendTo($goodContainer);
        $goodBuyBtn.appendTo($goodContainer);
        $goodRemoveBtn.appendTo($goodContainer);
        $jQueryElement.append($goodContainer);
    }
}