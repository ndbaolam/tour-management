//Categoris Slide
const swiperCategory = document.querySelector('.swiper-category');
if(swiperCategory){
    var swiperCategoryThumb = new Swiper(".swiper-category", {
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
            delay: 3000,
          },
    });
}
//End categories slide

//Slide Tour Detail
const swiperSlider = document.querySelector(".swiperSliderThumb");
if(swiperSlider) {
    var swiperSliderThumb = new Swiper(".swiperSliderThumb", {
        spaceBetween: 10,
        slidesPerView: 4,
    });

    var swiperSliderMain = new Swiper(".swiperSliderMain", {
        spaceBetween: 10,
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
        thumbs: {
        swiper: swiperSliderThumb,
        },
    });
}
//End Slide Tour Detail

//Show minicart
const showMiniCart = () => {
    const miniCart = document.querySelector("[mini-cart]");
    if(miniCart) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      miniCart.innerHTML = cart.length;
    }
}
showMiniCart();
//End show minicart

//Cart
const cart = localStorage.getItem("cart");
if(!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
}

//Show alert
const alertAddCartSusscess = () => {
    const elementAlert = document.querySelector("[alert-add-cart-susscess]");
    if(elementAlert) {
      elementAlert.classList.remove("alert-hidden");
  
      setTimeout(() => {
        elementAlert.classList.add("alert-hidden");
      }, 3000);
    }
};
//End Show alert

//Add to cart
const formAddToCart = document.querySelector('[form-add-to-cart]');
if(formAddToCart){
    formAddToCart.addEventListener('submit', (e) => {
        e.preventDefault();
        const tourId = parseInt(formAddToCart.getAttribute('tour-id'));
        const quantity = parseInt(e.target.elements.quantity.value);

        if(tourId && quantity){
            const cart = JSON.parse(localStorage.getItem("cart"));
            const existTour = cart.find(item => item.tourId === tourId);

            if(!existTour){
                const data = {
                    tourId: tourId,
                    quantity: quantity
                };

                cart.push(data);
            } else {
                existTour.quantity += quantity;
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            showMiniCart();
            alertAddCartSusscess();
        }
    })
}
//End Cart 

//Get data cart printout interface
const drawListTable = () => {
    const tableCart = document.querySelector("[table-cart]");
    if(tableCart){
        fetch('/cart/list-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: localStorage.getItem('cart')
            //Send API to backend
        })
        .then(response => response.json())
        .then(data => {
                const tours = data.tours;
                const htmls = tours.map((item, index) => {
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>
                                <img src="${item.infoTour.images[0]}" alt="${item.infoTour.title}" width="80px">
                            </td>
                            <td>
                                <a href="/tours/detail/${item.infoTour.slug}">${item.infoTour.title}</a>
                            </td>
                            <td>${item.infoTour.price_special.toLocaleString()}đ</td>
                            <td>
                                <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px">
                            </td>
                            <td>${item.infoTour.total.toLocaleString()}đ</td>
                            <td>
                                <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
                            </td>
                        </tr>
                    `;
                });
        
                const tbody = tableCart.querySelector("tbody");
                tbody.innerHTML = htmls.join("");

                // Tổng tiền
                const totalPrice = tours.reduce((sum, item) => sum + item.infoTour.total, 0);
                const elementTotalPrice = document.querySelector("[total-price]");
                elementTotalPrice.innerHTML = totalPrice.toLocaleString();

                deleteItemInCart();
                updateQuantityInCart();
            })
        .catch(error => {
            console.error('Error:', error);
        });
    };
};
//End Get data cart printout interface

//Delete item
const deleteItemInCart = () => {
    const buttonsDelete = document.querySelectorAll("[btn-delete]");
    if(buttonsDelete.length > 0) {
        buttonsDelete.forEach(button => {
            button.addEventListener("click", () => {
                const tourId = parseInt(button.getAttribute("btn-delete"));                
                const cart = JSON.parse(localStorage.getItem('cart'));
                const newCart = cart.filter(item => item.tourId !== tourId);

                localStorage.setItem('cart', JSON.stringify(newCart));
                drawListTable();
                showMiniCart();
            });
        });
    }
}
//End delete item

//Update quantity
const updateQuantityInCart = () => {
    const updateInputs = document.querySelectorAll('input[name="quantity"]');
    if(updateInputs.length > 0){
        updateInputs.forEach(input => {
            input.addEventListener("change", () => {
                const tourId = parseInt(input.getAttribute("item-id"));
                const quantity = parseInt(input.value);
                const cart = JSON.parse(localStorage.getItem('cart'));

                for (const item of cart) {
                    if(item.tourId === tourId)
                        item.quantity = quantity
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                drawListTable();
            });
        });
    }
}
//End update quantity

//Send order to server
const formOrder = document.querySelector('[form-order]');
if(formOrder){
    formOrder.addEventListener('submit', (e) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart'));
        
        const fullName = e.target.fullName.value;
        const phone = e.target.phone.value;
        const note = e.target.note.value;

        const data = {
            info:{
                fullName: fullName,
                phone: phone,
                note: note,
            },
            cart: cart
        };

        fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
            //Send API to backend
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    });
}
//End send order to server

//Map
const tourMap = document.getElementById('map');
if(tourMap) {
    const coordinates = tourMap.firstElementChild.defaultValue;
    const [x, y] = coordinates.split(',');
    const direction = [parseFloat(x), parseFloat(y)];

    const map = L.map('map', {
        center: direction,
        zoom: 10,
        preferCanvas: true
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //Get user location
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            const userLocation = [position.coords.latitude,position.coords.longitude]
            L.marker(userLocation)
                .addTo(map)
                .bindPopup("You are here");
        });
    }
    //End get user location

    const marker = L.marker(direction).addTo(map);

    marker.on("click", () => {
        const pos = map.latLngToLayerPoint(marker.getLatLng());
        pos.y -= 25;
        const fx = new L.PosAnimation();
    
        fx.once('end',() => {
            pos.y += 25;
            fx.run(marker._icon, pos, 0.8);
        });
    
        fx.run(marker._icon, pos, 0.3);
    });
}
//End map

drawListTable();