const Container = document.querySelector(".thumbnail-container");
const allBox = Container.children;
const containerWidth = Container.offsetWidth;
const controls = document.querySelector(".controls");
const margin = 30;
let items = 0;
let totalItems = 0;
let jumpSlideWidth = 0;

responsive = [
    {
        breakPoint: {
            width: 0,
            item: 1,
        },
    },
    {
        breakPoint: {
            width: 600,
            item: 2,
        },
    },
    {
        breakPoint: {
            width: 1000,
            item: 4,
        },
    },
];

function load() {
    for (let i = 0; i < responsive.length; i++) {
        if (window.innerWidth > responsive[i].breakPoint.width) {
            items = responsive[i].breakPoint.item;
        }
    }
    start();
}

function start() {
    let totalItemWidth = 0;
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].style.width = containerWidth / items - margin + "px";
        allBox[i].style.margin = margin / 2 + "px";
        totalItemWidth += containerWidth / items;
        totalItems++;
    }

    Container.style.width = totalItemWidth + "px";
    ////////////////
    let allSlide = Math.ceil(totalItems / items);

    let ul = document.createElement("ul");
    for (let i = 1; i <= allSlide; i++) {
        const li = document.createElement("li");
        li.id = i;
        li.innerHTML = i;
        li.setAttribute("onclick", "controlSlides(this)");
        ul.appendChild(li);
        if (i == 1) {
            li.className = "active";
        }
    }
    controls.appendChild(ul);
}

function controlSlides(ele) {
    const ul = controls.children;

    const li = ul[0].children;

    let active;

    for (let i = 0; i < li.length; i++) {
        if (li[i].className == "active") {
            active = i;
            li[i].className = "";
        }
    }

    ele.className = "active";
    let numb = ele.id - 1 - active;
    jumpSlideWidth = jumpSlideWidth + containerWidth * numb;
    Container.style.marginLeft = -jumpSlideWidth + "px";
}

window.onload = load();
