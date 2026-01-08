import {carregarHistorico} from "./utils.js";

$(document).ready(() => {
    const idUsuarioExiste = sessionStorage.getItem("usuario_id");

    if(idUsuarioExiste) {
        $(".form-none").hide();
        $(".content-under").show();

        carregarHistorico();
    }
});
