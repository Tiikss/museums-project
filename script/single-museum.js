const slider = function () {
    const slides = document.querySelectorAll(".carousel-img");
    const btnLeft = document.querySelector(".btn--left");
    const btnRight = document.querySelector(".btn--right");
    const dotContainer = document.querySelector(".dots");

    let currentSlide = 0;
    let maxSlide = slides.length;

    // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
    /*
    const createDots = function () {
        slides.forEach(function (_, i) {
            document
                .querySelector(".dots")
                .insertAdjacentHTML(
                    "beforeend",
                    `<button class="dots__dot" data-slide="${i}"></button>`
                );
        });
    };
*/
    const activateDot = function (slide) {
        document
            .querySelectorAll(".dot")
            .forEach((dot) => dot.classList.remove("dot--fill"));

        document.querySelector(`.dot__${slide}`).classList.add("dot--fill");
    };

    const goToSlide = function (slide) {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`;
            s.style.transition = "transform 0.5s ease";
        });
        activateDot(slide);
    };

    const init = function () {
        // createDots();
        activateDot(0);
    };
    init();

    btnRight.addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % maxSlide;
        goToSlide(currentSlide);
    });

    btnLeft.addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + maxSlide) % maxSlide;
        goToSlide(currentSlide);
    });

    dotContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("dot")) {
            const slide = e.target.classList[1].replace("dot__", "");
            goToSlide(slide);
        }
    });
};

slider();
