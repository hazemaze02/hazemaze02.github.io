document.addEventListener('DOMContentLoaded', function () {
    var carousels = document.querySelectorAll('.slide-carousel');

    carousels.forEach(function (carousel) {
        var count = parseInt(carousel.dataset.slideCount, 10);
        var path = carousel.dataset.slidePath;
        var pad = parseInt(carousel.dataset.slidePad, 10) || 2;
        var img = carousel.querySelector('.slide-image');
        var counter = carousel.querySelector('.slide-counter');
        var prevBtn = carousel.querySelector('.slide-prev');
        var nextBtn = carousel.querySelector('.slide-next');
        var current = 1;

        function slideSrc(n) {
            var num = String(n).padStart(pad, '0');
            return path + '-' + num + '.jpg';
        }

        function preload(n) {
            if (n < 1 || n > count) return;
            var im = new Image();
            im.src = slideSrc(n);
        }

        function render() {
            img.src = slideSrc(current);
            img.alt = 'Slide ' + current + ' of ' + count;
            counter.textContent = current + ' / ' + count;
            prevBtn.disabled = current === 1;
            nextBtn.disabled = current === count;
            preload(current + 1);
            preload(current - 1);
        }

        function go(delta) {
            var next = current + delta;
            if (next < 1 || next > count) return;
            current = next;
            render();
        }

        prevBtn.addEventListener('click', function () { go(-1); });
        nextBtn.addEventListener('click', function () { go(1); });

        carousel.setAttribute('tabindex', '0');
        carousel.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { go(-1); }
            if (e.key === 'ArrowRight') { go(1); }
        });

        var touchStartX = null;
        carousel.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        carousel.addEventListener('touchend', function (e) {
            if (touchStartX === null) return;
            var dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 40) {
                go(dx < 0 ? 1 : -1);
            }
            touchStartX = null;
        }, { passive: true });

        render();
    });
});
