// ========================================
// MÁSCARA DE CPF
// ========================================

document.getElementById("cpf").addEventListener("input", function() {

    let valor = this.value
        .replace(/\D/g, "")
        .slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    this.value = valor;

});


// ========================================
// MÁSCARA DE TELEFONE
// ========================================

document.getElementById("telefone").addEventListener("input", function() {

    let valor = this.value
        .replace(/\D/g, "")
        .slice(0, 11);

    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    this.value = valor;

});


// ========================================
// MÁSCARA DE CEP
// ========================================

document.getElementById("cep").addEventListener("input", function() {

    let valor = this.value
        .replace(/\D/g, "")
        .slice(0, 8);

    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");

    this.value = valor;

});


// ========================================
// ESTADOS E CIDADES - IBGE
// ========================================

const estadoSelect = document.getElementById("estado");
const cidadeSelect = document.getElementById("cidade");


// ========================================
// CARREGAR ESTADOS
// ========================================

fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
)

    .then(response => {

        if (!response.ok) {
            throw new Error("Erro ao carregar estados");
        }

        return response.json();

    })

    .then(estados => {

        estadoSelect.innerHTML =
            '<option value="">Selecione o estado</option>';

        estados.forEach(estado => {

            const option = document.createElement("option");

            option.value = estado.sigla;

            option.textContent = estado.nome;

            option.dataset.id = estado.id;

            estadoSelect.appendChild(option);

        });

    })

    .catch(() => {

        estadoSelect.innerHTML =
            '<option value="">Erro ao carregar estados</option>';

    });


// ========================================
// CARREGAR CIDADES
// ========================================

estadoSelect.addEventListener("change", function() {

    const estadoSelecionado =
        this.options[this.selectedIndex];

    const estadoId =
        estadoSelecionado.dataset.id;


    cidadeSelect.innerHTML =
        '<option value="">Carregando cidades...</option>';

    cidadeSelect.disabled = true;


    if (!estadoId) {

        cidadeSelect.innerHTML =
            '<option value="">Selecione primeiro o estado</option>';

        return;

    }


    fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios?orderBy=nome`
    )

        .then(response => {

            if (!response.ok) {
                throw new Error("Erro ao carregar cidades");
            }

            return response.json();

        })

        .then(cidades => {

            cidadeSelect.innerHTML =
                '<option value="">Selecione a cidade</option>';


            cidades.forEach(cidade => {

                const option =
                    document.createElement("option");

                option.value = cidade.nome;

                option.textContent = cidade.nome;

                cidadeSelect.appendChild(option);

            });


            cidadeSelect.disabled = false;

        })

        .catch(() => {

            cidadeSelect.innerHTML =
                '<option value="">Erro ao carregar cidades</option>';

        });

});
