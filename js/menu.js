// ========================================
// MENU HAMBÚRGUER
// ========================================

const botaoMenu = document.querySelector(".menu-hamburguer");
const menu = document.getElementById("menu");

if (botaoMenu && menu) {

    botaoMenu.addEventListener("click", function () {

        menu.classList.toggle("ativo");

        const aberto = menu.classList.contains("ativo");

        botaoMenu.setAttribute("aria-expanded", aberto);

        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );

    });

}


// ========================================
// SPA - MANIPULAÇÃO DO DOM
// ========================================

const conteudo = document.getElementById("conteudo");


// Conteúdos das páginas
const paginas = {

    inicio: `
        <section class="hero">

            <img
                src="imagens/banner.jpg"
                alt="Imagem representando a preservação da natureza">

            <h1>Salvando a Mata</h1>

            <p>
                Juntos podemos cuidar da natureza e transformar o futuro.
            </p>

            <a
                class="btn"
                href="#voluntario"
                data-rota="voluntario">
                Quero ser voluntário
            </a>

        </section>
    `,


    sobre: `
        <section id="sobre">

            <h2>Sobre a ONG</h2>

            <p>
                A Salvando a Mata é uma organização criada para promover
                a preservação do meio ambiente, incentivar ações sustentáveis
                e conscientizar a comunidade sobre a importância das florestas.
            </p>

        </section>
    `,


    projetos: `
        <section id="projetos">

            <h2>Nossos projetos</h2>

            <div class="cards">

                <article class="card">

                    <img
                        src="imagens/projetos.jpg"
                        alt="Imagem representando projetos ambientais">

                    <h3>Preservação ambiental</h3>

                    <p>
                        Desenvolvemos ações para proteger áreas verdes
                        e incentivar a preservação da natureza.
                    </p>

                </article>


                <article class="card">

                    <img
                        src="imagens/voluntarios.png"
                        alt="Imagem representando voluntários">

                    <h3>Voluntariado</h3>

                    <p>
                        Pessoas podem participar de campanhas e ações
                        em benefício do meio ambiente.
                    </p>

                </article>

            </div>

        </section>
    `,


    voluntario: `
        <section>

            <h2>Seja voluntário</h2>

            <p>
                Faça parte das ações da Salvando a Mata.
                Sua participação contribui para a preservação
                do meio ambiente.
            </p>

            <a
                class="btn"
                href="html/cadastro.html">
                Fazer cadastro
            </a>

        </section>
    `

};


// ========================================
// RENDERIZAÇÃO DO CONTEÚDO
// ========================================

function renderizar(pagina) {

    if (paginas[pagina]) {

        conteudo.innerHTML = paginas[pagina];

    } else {

        conteudo.innerHTML = paginas.inicio;

    }

}


// ========================================
// NAVEGAÇÃO DA SPA
// ========================================

function navegar(pagina) {

    history.pushState(
        { pagina: pagina },
        "",
        "#" + pagina
    );

    renderizar(pagina);

}


// ========================================
// CLIQUES NOS LINKS
// ========================================

document.addEventListener("click", function (event) {

    const link = event.target.closest("[data-rota]");

    if (!link) {
        return;
    }

    event.preventDefault();

    const pagina = link.dataset.rota;

    navegar(pagina);


    // Fecha o menu no celular
    if (menu && botaoMenu) {

        menu.classList.remove("ativo");

        botaoMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    }

});


// ========================================
// BOTÕES VOLTAR / AVANÇAR DO NAVEGADOR
// ========================================

window.addEventListener("popstate", function () {

    const pagina =
        location.hash.replace("#", "") || "inicio";

    renderizar(pagina);

});


// ========================================
// CARREGAMENTO INICIAL
// ========================================

const paginaInicial =
    location.hash.replace("#", "") || "inicio";

renderizar(paginaInicial);
