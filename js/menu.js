function toggleMenu() {
    const menu = document.getElementById("menu");
    const botao = document.querySelector(".menu-hamburguer");

    menu.classList.toggle("ativo");

    const aberto = menu.classList.contains("ativo");

    botao.setAttribute("aria-expanded", aberto);

    botao.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
}
