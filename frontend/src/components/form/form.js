$(document).ready(() => {
    $(".trocar1").click(() => {
        $(".fomulario-cadastrar").css({"display": "block"});
        $(".fomulario-entrar").css({"display": "none"});
    });

    $(".trocar2").click(() => {
        $(".fomulario-cadastrar").css({"display": "none"});
        $(".fomulario-entrar").css({"display": "block"});
    });
});