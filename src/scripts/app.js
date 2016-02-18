function pdpInit() {
    var btn= document.querySelector('#descr div input[type="button"]');
console.log(btn);
btn.onclick=function (e) {
    btn.classList.add('added');
    btn.value="PRODUCT ADDED";
}
}