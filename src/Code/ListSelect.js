let update = 0
let old = 0
let DownKey = (ul, liSelected, index, next, oldData) => {
    if (ul.getElementsByTagName('li') !== null) {
        let list = ul.getElementsByTagName("li");
        var len = ul.getElementsByTagName('li').length - 1;
        index.current = index.current + 1
        //down 
        if (liSelected.current) {
            // console.log("csdcscsd", liSelected.current)
            removeClass(liSelected.current, 'selected');
            next.current = ul.getElementsByTagName('li')[index.current];
            if (typeof next.current !== undefined && index.current <= len) {

                liSelected.current = next.current;
            } else {
                index.current = 0;
                liSelected.current = ul.getElementsByTagName('li')[0];
            }
            addClass(liSelected.current, 'selected');


            // scroll code 

            document.getElementById(ul.parentNode.id).scroll(oldData.current, list[index.current].offsetHeight + oldData.current);
            oldData.current = oldData.current + list[index.current].offsetHeight
            // var rect = list[index.current].getBoundingClientRect();
            // count =  count + 1;

            // if (count > 1 && rect.y > 0) {
            //     console.log("count", count)
            //     document.getElementById(ul.parentNode.id).scrollTo({
            //         top: 50 + old,
            //         behavior: "smooth"
            //     });
            //     old = 50 + old
            //     count = 0
            //     // document.getElementById(ul.parentNode.id).scrollIntoView();
            // } else if (rect.y < 0) {
            //     document.getElementById(ul.parentNode.id).scrollTo({
            //         top: rect.top,
            //         behavior: "smooth"
            //     });
            // }
            // console.log("dddddddddddddddddddddddd", index.current);


        } else {
            index.current = 0;
            liSelected.current = ul.getElementsByTagName('li')[0];
            addClass(liSelected.current, 'selected');
        }
    }
}

let UpKey = (ul, liSelected, index, next, oldData) => {
    if (ul.getElementsByTagName('li') !== null) {
        let list = ul.getElementsByTagName("li");

        var len = ul.getElementsByTagName('li').length - 1;
        if (liSelected.current) {
            removeClass(liSelected.current, 'selected');
            index.current = index.current - 1
            // console.log(index);
            next.current = list[index.current];
            if (typeof next.current !== undefined && index.current >= 0) {
                liSelected.current = next.current;
            } else {
                index.current = len;
                liSelected.current = list[len];
            }
            addClass(liSelected.current, 'selected');

            // scroll code 
            document.getElementById(ul.parentNode.id).scroll( oldData.current - oldData.current , list[index.current].offsetHeight - oldData.current);
            oldData.current = oldData.current - list[index.current].offsetHeight
            // var rect = list[index.current].getBoundingClientRect();
            // count =  count + 1;

            // if (count > 1 && rect.y > 0) {
            //     console.log("count", count)
            //     document.getElementById(ul.parentNode.id).scrollTo({
            //         top: 50 - old,
            //         behavior: "smooth"
            //     });
            //     old = 50 - old
            //     count = 0
            //     // document.getElementById(ul.parentNode.id).scrollIntoView();
            // } else if (rect.y < 0) {
            //     document.getElementById(ul.parentNode.id).scrollTo({
            //         top: rect.top,
            //         behavior: "smooth"
            //     });
            // }
            // var rect = list[index.current].getBoundingClientRect();
            // console.log("document.getElementById(ul.parentNode.id).offsetHeight", document.getElementById(ul.parentNode.id).offsetHeight)
            // if (rect.top > document.getElementById(ul.parentNode.id).offsetHeight && rect.top > 0) {
            //     document.getElementById(ul.parentNode.id).scrollTo({
            //         top: document.getElementById(ul.parentNode.id).offsetHeight,
            //         behavior: "smooth"
            //     });
            // } else if (rect.top < 0) {
            //     document.getElementById(ul.parentNode.id).scrollTo({
            //         top: 0,
            //         behavior: "smooth"
            //     });
            // }
        } else {
            index.current = 0;
            liSelected.current = ul.getElementsByTagName('li')[len];
            addClass(liSelected.current, 'selected');
        }
    }
}


function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
};

function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
};
export default DownKey
export { UpKey }