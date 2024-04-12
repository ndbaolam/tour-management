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
            })
        });
    }
}
//End delete item

drawListTable();