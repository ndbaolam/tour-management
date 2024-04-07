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