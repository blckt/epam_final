
//slider script
function slider() {
    var left = document.querySelector('button.left');
    var right = document.querySelector('button.right');
    var parent = document.querySelector('.slide');
    function elementOffsetRight(element) {
        return (element.offsetLeft + element.clientWidth);
    }

//Лево
    function turnLeft(e) {

        var divs = document.querySelectorAll('.slide div');
        var offset = 200;
        var offsetRightParent = elementOffsetRight(parent);
        var lastDivOffsetRight = elementOffsetRight(divs[divs.length - 1])
       console.log(divs[divs.length - 1].offsetLeft);
        if (offsetRightParent > lastDivOffsetRight - 200) {
            offset = divs[divs.length - 1].offsetLeft+200-offsetRightParent;
            console.log(offset);
            addProp(divs, offset, 'left', true);


        } else {
            addProp(divs, offset, 'left');
        }
    }  
    //Право
    function turnRight(e) {

        var divs = document.querySelectorAll('.slide div');
        var offset = 200;
        if (parent.offsetLeft < divs[0].offsetLeft + 200) {
            offset = divs[0].offsetLeft + 200 - parent.offsetLeft;
            addProp(divs, offset, 'right', true);



        } else {
            addProp(divs, offset, 'right');
        }
    }
    //Обработчики
    right.addEventListener('click', turnRight);

    left.addEventListener('click', function(e){
        setTimeout(turnLeft(e),0);
    });
    //Анимация
    function addProp(divs, offset, side, start) {
        for (var elem in divs) {
            var el = divs[elem];
            if (elem !== 'item' && elem !== 'length') {
                var left = el.style.left || 0;
               
                switch (side) {
                    case 'left': {
                        el.style.left = parseInt(left) - offset + 'px';
                        break;
                    }
                    case 'right': {
                        start ? el.style.left = 0 + 'px' : el.style.left = parseInt(left) + offset + 'px';
                    }
                }

            }


        }
    }
}


