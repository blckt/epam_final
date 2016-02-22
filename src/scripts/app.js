//LocalStorageWorker
(function (window) {
    var basket = {};
    basket.itemsCount = function () {
        var items = basket.getItems();
        if (items) {
            return Array.from(items).length;
        } else {
            return 0;
        }
    }
    basket.getItems = function () {
        return JSON.parse(localStorage.getItem('basket'));
    }
    basket.addItems = function (item) {
        var items;
        if (basket.getItems()) {
            items = Array.from(basket.getItems());
        }
        else {
            items = [];
        }
        if (items) {
            items.push(item);
            localStorage.setItem('basket', JSON.stringify(items));

        }
        else {
            localStorage.setItem('basket', JSON.stringify(item));
        }
        localStorageEventHandler();
    }
    basket.clearItems = function () {
        localStorage.removeItem('basket');

        localStorageEventHandler();
    }
    basket.removeItem = function (id) {
        var items = Array.from(basket.getItems());
        items.splice(id, 1);
        localStorage.setItem('basket', JSON.stringify(items));
        localStorageEventHandler();
    }

    window.Basket = basket;

})(window)



//Event for storage

window.onstorage = function (e) {
    localStorageEventHandler();
}
function localStorageEventHandler() {
    document.querySelector('#basket-counter').innerHTML = Basket.itemsCount() || 0;

}


//pageWorker

function populateProductPage(object) {
    var breadcrumbsWay=document.querySelector('.breadcrumbs ul li:last-child a');
    breadcrumbsWay.href="#pdp/"+object.id;
    breadcrumbsWay.innerHTML=object.name;
    //main image
    document.querySelector("#Main-image").src=object.img[0];
    document.querySelector("#Main-image").alt=object.colors[0];
    
    //images for preview
    for(var i=1;i<object.img.length;i++){
        var img= document.createElement('img');
        img.src=object.img[i];
        img.alt=object.colors[i];
        
        img.onclick=function (e) {
          
            var main=document.querySelector("#Main-image");
            var temp=e.target.src;
            var  tempAlt=e.target.alt;
            e.target.src=main.src;
            main.src=temp;
            e.target.alt=main.alt;
            main.alt=tempAlt;
            
            
                    }
        var pr=document.querySelector('.preview');
           pr.appendChild(img);
    }
    //populate description
    var details=document.querySelector('#descr');
    var h2=details.querySelector('div h2');
    h2.innerHTML=object.name.toUpperCase()
    //article
    details.querySelector(':nth-child(2)').innerHTML="Article number : "+object.article;
    //price
    details.querySelector(':nth-child(3)').innerHTML="&#8364; "+object.price;
  //description
        details.querySelector(':nth-child(4)').innerHTML=object.descr;
       //sizes
       for(var i=0;i<object.size.length;i++){
            //.innerHTML=object.size[0];
          var input=document.createElement('input');
          input.type="radio";
          input.name="size";
          input.value=object.size[i];
          input.id="size"+object.size[i];
           var label=document.createElement('label');
           label.htmlFor="size"+object.size[i];
           label.innerHTML=object.size[i];
        var sizes=document.querySelector('#sizes');
         sizes.appendChild(input);
         sizes.appendChild(label);
       }
    
    }
    
function pdpInit() {
    var btn = document.querySelector('#descr div input[type="button"]');
    function pdpDetailsCollector() {
        var doc = document.querySelector('#item');
        var item = {};
        item.img = doc.querySelector('#Main-image').src;
        item.color = doc.querySelector('#Main-image').alt;
        doc = doc.querySelector('#descr');
        item.name = doc.querySelector('div h2').innerHTML;
        item.article = doc.querySelector('.subheader-small').innerHTML.replace("Article number : ", '');
        item.price = doc.querySelector('div:nth-child(3)').innerHTML.replace(/\D*/, "");
        item.size = doc.querySelector('input[type="radio"]:checked').value;
        Basket.addItems(item);

    }
    var sizes = document.querySelector('#descr #sizes');
    var radios = sizes.querySelectorAll('input');
    btn.onclick = function (e) {

        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                btn.classList.add('added');
                btn.value = "PRODUCT ADDED";
                pdpDetailsCollector();
                return true;
            }
        }

        sizes.classList.toggle('error');

    }
    for (var i = 0; i < radios.length; i++) {
        radios[i].onclick = function () {
            sizes.classList.remove('error');
            btn.classList.remove('added');
            btn.value="ADD TO CARD";
        }
    }


}

window.onhashchange = function () {
    getUrlState(decodeURI(window.location.hash, null));
}
