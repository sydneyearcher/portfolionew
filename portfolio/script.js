// Carousel Functionality
const carouselContainer = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let slideIndex = 0;
const totalSlides = slides.length;

// Clone first and last slides for seamless infinite scrolling
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
carouselContainer.append(firstClone);
carouselContainer.prepend(lastClone);

const updateCarouselPosition = () => {
    const slideWidth = slides[0].clientWidth + 10; // Include gap
    carouselContainer.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
};

const moveToNextSlide = () => {
    slideIndex++;
    updateCarouselPosition();
    if (slideIndex > totalSlides) {
        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            slideIndex = 1;
            updateCarouselPosition();
            setTimeout(() => (carouselContainer.style.transition = 'transform 0.5s ease'));
        }, 500);
    }
};

const moveToPrevSlide = () => {
    slideIndex--;
    updateCarouselPosition();
    if (slideIndex < 0) {
        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            slideIndex = totalSlides - 1;
            updateCarouselPosition();
            setTimeout(() => (carouselContainer.style.transition = 'transform 0.5s ease'));
        }, 500);
    }
};

nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

// Initialize carousel
updateCarouselPosition();
carouselContainer.style.transition = 'transform 0.5s ease';

// Optional: Auto-scroll every 5 seconds
setInterval(moveToNextSlide, 5000);
