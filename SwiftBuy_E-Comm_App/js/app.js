document.addEventListener('DOMContentLoaded',()=>{
    const productsContainer=document.getElementById('products-container');
    const searchInput=document.getElementById('search-input');
    const loadingSpinner=document.getElementById('loading-spinner');
    
    let allProducts=[];

    updateCartBadge();

    // Fetch produits
    document.querySelector('#category').addEventListener('change',fetchProductsByCategory=()=>{
        let category=document.querySelector('#category').value;
        fetch(category!=""?`https://fakestoreapi.com/products/category/${category}`:`https://fakestoreapi.com/products`)
            .then(res=>res.json())
            .then(products=>{
                allProducts=products;
                //loadingSpinner.style.display='none';
                displayProducts(products);
            })
            .catch(err=>{
                console.error('Erreur lors de la récupération des produits:',err);
                productsContainer.innerHTML='<div class="alert alert-danger w-100 text-center">Une erreur est survenue lors du chargement des produits.</div>';
            });    
    });   
    fetchProductsByCategory();

    // Filter search
    searchInput.addEventListener('input',(e)=>{
        const searchTerm=e.target.value.toLowerCase();
        const filteredProducts=allProducts.filter(product=>
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // display produits function
    function displayProducts(products){
        if(products.length===0){
            // modifiying the search logic to be more friendly and custemer catchy 
            let html='';
            html +=`<div class="col-12 text-center text-muted py-5"><i class="fa-solid fa-box-open fs-1 mb-3"></i><p>Oups, rien pour « ${searchInput.value} ». Essayez autre chose ou jetez un œil à nos best-sellers</p></div>`;
        allProducts.slice(0,4).forEach(product=>{
            html+=`
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="cardBg card rounded-4 product-card border-0 h-100">
                        <div class="border-bottom" style="height:200px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                            <img src="${product.image}" class="card-img-top product-image w-50" alt="${product.title}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title product-title" title="${product.title.replace(/"/g,'&quot;')}">${product.title}</h5>
                            <p class="card-text text-muted small text-truncate">${product.category}</p>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <span class="fw-bold product-price">${product.price.toFixed(2)} €</span>
                                <button class="btn btn-primary rounded-circle shadow-sm add-to-cart-btn" 
                                    data-id="${product.id}" 
                                    data-title="${product.title.replace(/"/g,'&quot;')}" 
                                    data-price="${product.price}" 
                                    data-image="${product.image}">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        productsContainer.innerHTML=html;
        document.querySelectorAll('.add-to-cart-btn').forEach(button=>{
            button.addEventListener('click',addToCart);
        });
            return;
        }

        let html='';
        products.forEach(product=>{
            html+=`
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="cardBg card rounded-4 product-card border-0 h-100">
                        <div class="border-bottom" style="height:200px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                            <img src="${product.image}" class="card-img-top product-image w-50" alt="${product.title}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title product-title" title="${product.title.replace(/"/g,'&quot;')}">${product.title}</h5>
                            <p class="card-text text-muted small text-truncate">${product.category}</p>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <span class="fw-bold product-price">${product.price.toFixed(2)} €</span>
                                <button class="btn btn-primary rounded-circle shadow-sm add-to-cart-btn" 
                                    data-id="${product.id}" 
                                    data-title="${product.title.replace(/"/g,'&quot;')}" 
                                    data-price="${product.price}" 
                                    data-image="${product.image}">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        productsContainer.innerHTML=html;
        document.querySelectorAll('.add-to-cart-btn').forEach(button=>{
            button.addEventListener('click',addToCart);
        });
    }
    function addToCart(e){
        const btn=e.currentTarget;
        const product={
            id: btn.getAttribute('data-id'),
            title: btn.getAttribute('data-title'),
            price: parseFloat(btn.getAttribute('data-price')),
            image: btn.getAttribute('data-image'),
            quantity: 1
        };

        let cart=JSON.parse(localStorage.getItem('cart'))||[];
        const existingItem=cart.find(item=>item.id===product.id);
        
        if(existingItem){
            existingItem.quantity+=1;
        }else{
            cart.push(product);
        }
        localStorage.setItem('cart',JSON.stringify(cart));
        
        const originalContent=btn.innerHTML;
        btn.innerHTML='<i class="fa-solid fa-check"></i>';
        btn.classList.replace('btn-primary','btn-success');
        setTimeout(()=>{
            btn.innerHTML=originalContent;
            btn.classList.replace('btn-success','btn-primary');
        },1000);

        updateCartBadge();
    }
});

//update badge de cart
function updateCartBadge(){
    const cart=JSON.parse(localStorage.getItem('cart'))||[];
    const totalItems=cart.reduce((sum, item)=>sum+item.quantity, 0);
    const badge=document.getElementById('cart-badge');
    if(badge){
        badge.textContent=totalItems;
    }
}