function pdpInit() {
    var btn = document.querySelector('#descr div input[type="button"]');
    console.log(btn);
    var sizes= document.querySelector('#descr #sizes');
    btn.onclick = function (e) {
        var radiobuttons = document.querySelectorAll('#descr #sizes input');
        for (var i = 0; i < radiobuttons.length; i++) {
            if (radiobuttons[i].checked) {
                btn.classList.add('added');
                btn.value = "PRODUCT ADDED";
                return true;
            }
        }
        
        sizes.classList.toggle('error');

    }
}

console.log(Basket.itemsCount());