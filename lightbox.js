document.addEventListener('DOMContentLoaded', function () {
    var gallery = document.querySelector('.cat-gallery');
    var lightbox = document.getElementById('catLightbox');
    if (!gallery || !lightbox) return;

    var thumbs = Array.prototype.slice.call(gallery.querySelectorAll('.cat-thumb'));
    var img = lightbox.querySelector('.lightbox-img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var current = 0;

    function show(index) {
        current = (index + thumbs.length) % thumbs.length;
        var thumbImg = thumbs[current].querySelector('img');
        img.src = thumbImg.src;
        img.alt = thumbImg.alt;
    }

    function open(index) {
        show(index);
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
    }

    thumbs.forEach(function (thumb, i) {
        thumb.addEventListener('click', function () { open(i); });
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
});
