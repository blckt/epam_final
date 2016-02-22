
//init page & history api
(function () {
    getUrlState(null, getRoutes());
    localStorageEventHandler(); 
})();


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
        case 'basket':{
            initContent('../../Views/basket.html').then(function () {
                history.pushState({param:'value'},'','../basket');
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
        xhr.open('GET', '../../Data/'+id+'.json', true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }
            else {
                var items = JSON.parse(xhr.responseText);
             
                        resolve(items);
                    
               
            }
        }
    });
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