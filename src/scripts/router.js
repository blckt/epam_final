
//init page & history api
(function () {
  console.log(getRoutes());  
//   initContent('main.html').then(function(){
//      slider();
//   })
    getUrlState(null,getRoutes());
})();

window.onhashchange=function(){
    getUrlState(decodeURI(window.location.hash,null));
}
function  getRoutes() {
var url= window.location.href;
var routes=url.replace(/(https?):\/\/.*:?[1234567890]?\//,'');
return routes.split(/\//);

}
function getUrlState(hash,routes){
   var state;
   if(hash){
        state=hash.replace('#','');
   } 
   else{
       state=routes[0]||'home';
   }
    switch (state){
        case 'home':{
            initContent('main.html').then(function(){
                slider(); 
            history.pushState({param:'value'},'','home');
           
            })
            break;
        }
        case 'all':{
            initContent('../../Views/all.html').then(function(){
                     history.pushState({param:'value'},'','all');
                     slider();
            });
            
            break;
        }
    }
}
function initContent(state){
   return new Promise(function(resolve,reject){
       var xhr = new XMLHttpRequest();
    xhr.open('GET',state, true);
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