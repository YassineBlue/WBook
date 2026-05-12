
let Books =[];
let booksec = document.getElementById('booksec'); 
let mycategory= document.getElementById('mycategory');
async function getBooks(){
    try{
        const res = await fetch('./data/books.json');
        if(!res.ok) throw new Error(`HTTP Error: ${res.status}`); 
        Books = await res.json();
        renderBooks(Books);
        // category books separated
        bookRoulette(Books);
    }
    catch(error){
        console.error('Failed to load books: ',error);
    }
}
getBooks();
function renderBooks(books){
    let html ='';
    //map would be better here .-.
        books.forEach(b => {
            html +=`<div class="card  text-center" >
            <img src='${b.cover}' class="card-img-top " alt="" >
            <span class="genre">${b.genre}</span>
            <span class="addToCart d-flex justify-content-center gap-3">
                <button class="btn btn-sm btn-success border text-white" type="button" onclick="addtocart(${b.id})"><i class="bi bi-cart-fill text-white"></i> Add to cart</button>
                <button class="btn btn-sm border border-success " type="button" onclick="save(${b.id})"><i class="bi bi-bookmark text-success "></i></button>
                </span>
            <div class="d-flex flex-column">
                <p class="info"><span class="title">${b.name}</span><br>
                <span class="author">By ${b.author}</span></p>
                <p class="d-flex justify-content-center align-items-center gap-4 mt-2">
                    <span class="price"><i class="bi bi-currency-dollar"></i>${b.price}</span>
                    <span class="rate text-success"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i></span>
                </p>
            </div>
        </div>`
        });
        booksec.innerHTML= html;
        mycategory.innerHTML= html;
}
// the right side bg changing concept
let rSide = document.getElementById('homeRight');
let i = 11;
//preloading the imgs for smoothness purposes
for (let j=1; j<=12;j++){
    let img = new Image();
    img.src = `./assets/images/${j}.jpg`;
}
function changeBg(){
    rSide.style.backgroundImage=`url("./assets/images/${i}.jpg")`;
    i++;
    if(i > 12) i=1;
}
changeBg();
setInterval(changeBg,7000);
//roulette concept
function bookRoulette(books){
    const pickabook = document.querySelector('.roulette-btn');
    let title = document.querySelector('.book-title');
    let author = document.querySelector('.book-author');
    let x= document.getElementById('x');
    function pick(){
        let index = Math.floor(Math.random() * 12)+1 ;
        // title.textContent = books[index].name ;
        // author.textContent = books[index].author ;
        x.innerHTML=`<div class="card  text-center" >
            <img src='${books[index].cover}' class="card-img-top " alt="" >
            <span class="genre">${books[index].genre}</span>
            <span class="addToCart d-flex justify-content-center gap-3">
                <button class="btn btn-sm btn-success border text-white" type="button" onclick="addtocart(${books[index].id})"><i class="bi bi-cart-fill text-white"></i> Add to cart</button>
                <button class="btn btn-sm border border-success " type="button" onclick="save(${books[index].id})"><i class="bi bi-bookmark text-success "></i></button>
                </span>
            <div class="d-flex flex-column">
                <p class="info"><span class="title">${books[index].name}</span><br>
                <span class="author">By ${books[index].author}</span></p>
                <p class="d-flex justify-content-center align-items-center gap-4 mt-2">
                    <span class="price"><i class="bi bi-currency-dollar"></i>${books[index].price}</span>
                    <span class="rate text-success"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i></span>
                </p>
            </div>
        </div>`
    }
    pickabook.onclick = pick ;
}
