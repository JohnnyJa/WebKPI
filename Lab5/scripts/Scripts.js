SwapTextboxes();
CountTriangleSquare(3, 4, 5);
proccessCookie();
onLoad();
createList();

function SwapTextboxes() {
    let textbox1 = document.getElementById('textbox-1');
    let textbox2 = document.getElementById('textbox-2');
    let buff = textbox1.innerHTML;
    textbox1.innerHTML = textbox2.innerHTML;
    textbox2.innerHTML = buff;
}

function CountTriangleSquare(a, b, c) {
    let mainText = document.querySelector('#main-text');
    let p = (a + b + c) / 2;
    let triangleSquare = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    let triangleSquareP = document.createElement('p');
    triangleSquareP.innerHTML = "Площа трикутника: " + triangleSquare;

    mainText.appendChild(triangleSquareP);
}

function FindNumOfMinFromForm() {
    if (document.forms["FindMinForm"]["numbers"].value != '') {
        let numbers = document.forms["FindMinForm"]["numbers"].value.split(' ');
        numbers = numbers.map(string => +string);
        let min = Math.min(...numbers);
        let numberOfMin = 0;
        numbers.forEach(element => {
            if (element == min) {
                numberOfMin++;
            }
        });
        setCookie('numberOfMin', numberOfMin);
        alert(numberOfMin);
    }

}

function proccessCookie() {
    let cookieName = 'numberOfMin';
    let numberOfMin = getCookie(cookieName);
    if (numberOfMin != undefined) {
        document.getElementById("FindMinForm").hidden = true;
        alert("Previous number of minimum was: " + numberOfMin + ".\n After pressing OK cookies will be deleted");
        deleteCookie(cookieName);
        let warn = setTimeout('reloadPage()', 1500);
    }
    else {
        document.getElementById("FindMinForm").hidden = false;
    }
}

function reloadPage() {
    alert("Cookie was deleted.\nPress OK to reload page");
    location.reload();
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;

}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    });
}

function setColor() {
    let color = localStorage.getItem('Color');
    if (color != undefined) {
        document.getElementById('main-text').style.color = color;
        localStorage.removeItem('Color');
    }
    else {
        color = prompt("Enter text color: ");
        localStorage.setItem('Color', color);
        document.getElementById('main-text').style.color = color;
    }

}

function onLoad() {
    window.addEventListener("load", setColor());
}

function createList() {
    textbox1 = document.getElementById('textbox-1');
    textbox1.ondblclick = function (event) {

        getListFromForm(textbox1, createForm(textbox1));
    }
    textbox2 = document.getElementById('textbox-2');
    textbox2.ondblclick = function (event) {
        getListFromForm(textbox2, createForm(textbox2));

    }
    footer = document.getElementById('footer');
    footer.ondblclick = function (event) {
        getListFromForm(footer, createForm(footer));

    }
    header = document.getElementById('header');
    header.ondblclick = function (event) {

        getListFromForm(header, createForm(header));

    }
    mainText = document.getElementById('main-text');
    mainText.ondblclick = function (event) {

        getListFromForm(mainText, createForm(mainText));

    }
    sideBar = document.getElementById('side-bar');
    sideBar.ondblclick = function (event) {

        getListFromForm(sideBar, createForm(sideBar));

    }

    window.addEventListener("load", removeList());
}

function getListFromForm(div) {
    if (document.forms["listForm"]["elements"].value != '') {
        let elements = document.forms["listForm"]["elements"].value.split(' ');
        ul = document.createElement('ul');

        let count = 0;
        elements.forEach(element => {
            localStorage.setItem('li ' + count, element);
            count++;
            li = document.createElement('li');
            li.innerHTML = element;
            ul.appendChild(li);
        });


        div.innerHTML = '';
        div.appendChild(ul) ;

    }

}

function removeList(){
    for(var i = 0; i < localStorage.length; i++)
    {
        key = localStorage.key(i);
        if(key.split(' ')[0] == li)
        {
            removeItem(key);
        }
    }
}

function createForm(div) {
    form = document.createElement('form');
    input = document.createElement('input');
    input.type = 'text';
    input.name = 'elements';
    button = document.createElement('input');
    button.type = 'button';
    button.value = 'Submit';
    button.onclick = function (event) { getListFromForm(div); }


    form.name = "listForm";
    form.appendChild(input);
    form.appendChild(button);
    div.appendChild(form);
    return button;
}

