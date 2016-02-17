
//init page & history api
(function () {
    getUrlState(null,getRoutes());
})();

window.onhashchange=function(){
    getUrlState(decodeURI(window.location.hash,null));
}
function  getRoutes() {
    console.log(window.location.href);
var url= window.location.href.replace(/https?:\/\/\S*:\d*\//,'');

return url.split(/\//);

}
function getUrlState(hash,routes){
console.log(routes);

   var state;
   var id;
   if(hash){
        hash=hash.replace('#','');
        state=hash.split(/\//)[0];
        console.log(hash.split(/\//));
        if(hash.split(/\//).length>1){
            id=hash.split(/\//)[1];
        }
        
   } 
   else{
       state=routes[0]||'home';
      if(routes.length>1){
          id=routes[1];
      }
   }

    switch (state.toLowerCase()){
        case 'home':{
            initContent('../main.html').then(function(){
                slider(); 
            history.pushState({param:'value'},'','/home');
           
            })
            break;
        }
        case 'all':{
            initContent('../../Views/all.html').then(function(){
                     history.pushState({param:'value'},'TITLE','/all');
                     slider();
            });
            
            break;
        }
           case 'pdp':{
            initContent('../../Views/pdp.html').then(function(){
                     history.pushState({param:'value'},'','../pdp/'+id);
                   
            });
            
            break;
        }
        default:{
                initContent('../../Views/404.html').then(function(){
                     history.pushState({param:'value'},'','/404');
                     
            });
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