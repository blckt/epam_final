
//init page & history api
(function () {
    getUrlState(null, getRoutes());
})();

window.onhashchange = function () {
    getUrlState(decodeURI(window.location.hash, null));
}
function getRoutes() {

    var url = window.location.href.replace(/https?:\/\/\S*:\d*\//, '');
    url = url.split('?')[0];
    return url.split(/\//);

}
function getUrlState(hash, routes) {
    var state;
    var id;
    if (hash) {
        hash = hash.replace('#', '');
        state = hash.split(/\//)[0];
        console.log(hash.split(/\//));
        if (hash.split(/\//).length > 1) {
            id = hash.split(/\//)[1];
        }

    }
    else {
        state = routes[0] || 'home';
        if (routes.length > 1) {
            id = routes[1];
        }
    }

    switch (state.toLowerCase()) {
        case 'home': {
            initContent('../main.html').then(function () {
                slider();
                history.pushState({ param: 'value' }, '', '/home');
            })
            break;
        }
        case 'all': {
            initContent('../../Views/all.html').then(function () {
                history.pushState({ param: 'value' }, 'TITLE', '/all');
                slider();
            });

            break;
        }
        case 'pdp': {
            initContent('../../Views/pdp.html').then(function () {
                initProductDetails(id).then(function (item) {
                populateProductPage(item);
                pdpInit();
                })
                history.pushState({ param: 'value' }, '', '../pdp/' + id);

            });

            break;
        }
        default: {
            initContent('../../Views/404.html').then(function () {
                history.pushState({ param: 'value' }, '', '/404');

            });
        }
    }
}
function initProductDetails(id) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../../Data/items.json', true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }
            else {
                var items = JSON.parse(xhr.responseText).items;
                items.forEach(function (element) {
                    if (element.id == id) {
                        resolve(element);
                    }
                })
            }
        }
    });
}
function populateProductPage(object) {
    var breadcrumbsWay=document.querySelector('.breadcrumbs ul li:last-child a');
    breadcrumbsWay.href="#pdp/"+object.id;
    breadcrumbsWay.innerHTML=object.name;
    //main image
    document.querySelector("#Main-image").src=object.img[0];
    //images for preview
    for(var i=1;i<object.img.length;i++){
        var img= document.createElement('img');
        img.src=object.img[i];
        img.alt="Preview Image";
        img.onclick=function (e) {
          
            var main=document.querySelector("#Main-image");
            var temp=e.target.src;
            e.target.src=main.src;
            main.src=temp;
            
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
function initContent(state) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', state, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }
            else {
                var main = document.querySelector('#main');
                main.innerHTML = xhr.responseText;
                resolve();
            }
        }
    });
}