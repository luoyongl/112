
module.exports = function printInventory(inputs) {
    var barcode_list = get_barcode_list(inputs);
    var shopping_cart = get_shopping_cart(barcode_list);
    var list_print = get_shopping_lists(shopping_cart);
    console.group(list_print);
    console.log(barcode_list);
    console.info(shopping_cart); 
};

function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}
function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
function get_barcode_list(inputs) {
    var barcodes = {};
    inputs.forEach(function (input) {
        if (barcodes[input]) {
            barcodes[input]++;

        }
        else if (input.indexOf('-') != -1) {
            barcodes[input.substr(0, input.indexOf('-'))] = 2;
        }
        else {
            barcodes[input] = 1;
        }
    });
    return barcodes;

}
function get_shopping_cart(barcode_list) {
    var items = loadAllItems();
    var shopping_cart = [];
    items.forEach(function (item) {
        if (barcode_list[item.barcode]) {
            item.count = barcode_list[item.barcode];
            item.free = Math.floor(item.count / 3);
            shopping_cart.push(item);
        }
    });

    return shopping_cart
}
function get_shopping_lists(shopping_cart) {
    var list = '***<没钱赚商店>购物清单***';
    var list_free = '----------------------' + '\n' + '挥泪赠送商品：';
    var sum = 0;
    var save = 0;
    shopping_cart.forEach(function (lists) {
        var subtotal = (lists.count - lists.free) * lists.price
        list = list + '\n' + '名称：' + lists.name + ',数量：' + lists.count + lists.unit + ',单价：' + lists.price.toFixed(2) + '(元),小计：' + subtotal.toFixed(2) + '(元)'
        sum += subtotal;
        if (lists.free > 0) {
            list_free = list_free + '\n' + '名称：' + lists.name + ',数量：' + lists.free + lists.unit;
            save += lists.free * lists.price;
        }
    });
    list = list + '\n' + list_free + '\n' + '----------------------' + '\n' + '总计：' + sum.toFixed(2) + '(元)' + '\n' + '节省：' + save.toFixed(2) + '(元)' + '\n' + '**********************';
    return list;

}
