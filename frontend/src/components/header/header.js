$(document).ready(() => {
    let aberto = false;
    const tempo = "0.3s";

    $('.menu-hamburguer').click(() => {
        if (aberto) {
            $('.fatia1').css('transform', 'none');
            $('.fatia2').css('opacity', '1');
            $('.fatia3').css('transform', 'none');

            aberto = false;
        } else {
            $('.fatia1').css({
                'transform': 'rotate(45deg) translate(5px, 4px)',
                'transition': tempo
            });

            $('.fatia2').css({
                'opacity': '0',
                'transition': tempo
            });

            $('.fatia3').css({
                'transform': 'rotate(-45deg) translate(5px, -4px)',
                'transition': tempo
            });

            aberto = true;
        }

        $('.nav__container').slideToggle();
    });
});
