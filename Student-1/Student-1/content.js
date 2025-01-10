// Show content on scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('.content').forEach(content => {
        const rect = content.getBoundingClientRect();
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top < viewHeight && rect.bottom >= 0) {
            content.classList.add('visible');
        } else {
            content.classList.remove('visible');
        }
    });
});