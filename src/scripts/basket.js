(function (window) {
    var basket={};
    basket.itemsCount=function () {
        var items=localStorage.getItem('basket');
        if(items){
            return items.length
        }  else{
            return 0;
        }
    }
    basket.getItems=function () {
        return JSON.parse(localStorage.getItem('basket'));
    }
    basket.addItems=function (item) {
        var items=Array.from(basket.getItems());
        if(items){
            items.push(item);
            localStorage.setItem('basket',JSON.stringify(items));
            
        }
        else{
            localStorage.setItem('basket',JSON.stringify(item));
        }
    }
    basket.clearItems=function () {
        localStorage.clear();
    }
    
    window.Basket=basket;
return window;
})(window)