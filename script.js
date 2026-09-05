// =========================================================
// LIMPANDO7
// JAVASCRIPT PRINCIPAL
// =========================================================
//
// Este arquivo controla:
//
// 1. Botão principal do Hero
// 2. Comparador Antes e Depois
// 3. Formulário de agendamento
// 4. Envio para WhatsApp
// 5. Sistema de avaliação
// 6. Testemunhos
// 7. Navegação mobile
// 8. Menu mobile
//
// =========================================================


// =========================================================
// BOTÃO DO HERO
// =========================================================

const botaoHero = document.querySelector(".btn");
const agendamento = document.querySelector("#agendamento");


if (botaoHero && agendamento) {

    botaoHero.addEventListener("click", function () {

        agendamento.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


// =========================================================
// COMPARADOR ANTES E DEPOIS
// =========================================================

const areaComparacao =
    document.querySelector(".comparacao");

const imagemAntes =
    document.querySelector(".img-antes");

const barraSlider =
    document.querySelector(".slider-barra");

const botaoSlider =
    document.querySelector(".slider-botao");


let arrastandoSlider = false;


// =========================================================
// MOVER SLIDER
// =========================================================

function moverSlider(evento) {

    if (
        !areaComparacao ||
        !imagemAntes ||
        !barraSlider
    ) {
        return;
    }


    const limites =
        areaComparacao.getBoundingClientRect();


    let posicaoX =
        evento.clientX - limites.left;


    let porcentagem =
        (posicaoX / limites.width) * 100;


    porcentagem =
        Math.max(
            0,
            Math.min(
                100,
                porcentagem
            )
        );


    imagemAntes.style.width =
        `${porcentagem}%`;


    barraSlider.style.left =
        `${porcentagem}%`;

}


// =========================================================
// INICIALIZAÇÃO DO COMPARADOR
// =========================================================

if (
    areaComparacao &&
    imagemAntes &&
    barraSlider &&
    botaoSlider
) {


    // -----------------------------------------------------
    // COMEÇAR ARRASTO
    // -----------------------------------------------------

    function iniciarSlider(evento) {

        arrastandoSlider = true;


        if (
            areaComparacao.setPointerCapture
        ) {

            areaComparacao.setPointerCapture(
                evento.pointerId
            );

        }


        moverSlider(evento);

    }


    // -----------------------------------------------------
    // MOVIMENTO
    // -----------------------------------------------------

    function movimentarSlider(evento) {

        if (!arrastandoSlider) {
            return;
        }


        moverSlider(evento);

    }


    // -----------------------------------------------------
    // FINALIZAR
    // -----------------------------------------------------

    function finalizarSlider(evento) {

        arrastandoSlider = false;


        if (
            evento.pointerId !== undefined &&
            areaComparacao.hasPointerCapture &&
            areaComparacao.hasPointerCapture(
                evento.pointerId
            )
        ) {

            areaComparacao.releasePointerCapture(
                evento.pointerId
            );

        }

    }


    // -----------------------------------------------------
    // EVENTOS DO SLIDER
    // -----------------------------------------------------

    areaComparacao.addEventListener(
        "pointerdown",
        iniciarSlider
    );


    areaComparacao.addEventListener(
        "pointermove",
        movimentarSlider
    );


    areaComparacao.addEventListener(
        "pointerup",
        finalizarSlider
    );


    areaComparacao.addEventListener(
        "pointercancel",
        finalizarSlider
    );


    // -----------------------------------------------------
    // TECLADO
    // -----------------------------------------------------

    botaoSlider.addEventListener(
        "keydown",
        function (evento) {

            let porcentagemAtual =
                parseFloat(
                    imagemAntes.style.width
                ) || 50;


            if (
                evento.key === "ArrowLeft"
            ) {

                porcentagemAtual -= 5;

            }


            if (
                evento.key === "ArrowRight"
            ) {

                porcentagemAtual += 5;

            }


            porcentagemAtual =
                Math.max(
                    0,
                    Math.min(
                        100,
                        porcentagemAtual
                    )
                );


            imagemAntes.style.width =
                `${porcentagemAtual}%`;


            barraSlider.style.left =
                `${porcentagemAtual}%`;

        }
    );

}


// =========================================================
// FORMULÁRIO
// =========================================================

const formulario =
    document.querySelector(".form");

const nome =
    document.querySelector("#nome");

const telefone =
    document.querySelector("#tel");

const email =
    document.querySelector("#email");

const data =
    document.querySelector("#date");

const horario =
    document.querySelector("#time");

const selectServico =
    document.querySelector("#servico");

const mensagemSucesso =
    document.querySelector("#mensagem-sucesso");


// =========================================================
// DATA MÍNIMA
// =========================================================

if (data) {

    const hoje = new Date();

    const ano =
        hoje.getFullYear();

    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");


    data.min =
        `${ano}-${mes}-${dia}`;

}


// =========================================================
// FORMULÁRIO DE AGENDAMENTO
// =========================================================

if (formulario) {

    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            // -------------------------------------------------
            // NOME
            // -------------------------------------------------

            if (
                !nome ||
                nome.value.trim() === ""
            ) {

                alert("Preencha o nome.");

                nome?.focus();

                return;

            }


            // -------------------------------------------------
            // TELEFONE
            // -------------------------------------------------

            if (
                !telefone ||
                telefone.value.trim() === ""
            ) {

                alert("Preencha o telefone.");

                telefone?.focus();

                return;

            }


            // -------------------------------------------------
            // EMAIL
            // -------------------------------------------------

            if (
                !email ||
                email.value.trim() === ""
            ) {

                alert("Preencha o e-mail.");

                email?.focus();

                return;

            }


            if (!email.checkValidity()) {

                alert(
                    "Introduza um e-mail válido."
                );

                email.focus();

                return;

            }


            // -------------------------------------------------
            // DATA
            // -------------------------------------------------

            if (
                !data ||
                data.value === ""
            ) {

                alert("Escolha uma data.");

                data?.focus();

                return;

            }


            // -------------------------------------------------
            // HORÁRIO
            // -------------------------------------------------

            if (
                !horario ||
                horario.value === ""
            ) {

                alert("Escolha um horário.");

                horario?.focus();

                return;

            }


            // -------------------------------------------------
            // SERVIÇO
            // -------------------------------------------------

            if (
                !selectServico ||
                selectServico.value === ""
            ) {

                alert("Escolha o serviço.");

                selectServico?.focus();

                return;

            }


            // =================================================
            // DADOS
            // =================================================

            const dadosAgendamento = {

                nome:
                    nome.value.trim(),

                telefone:
                    telefone.value.trim(),

                email:
                    email.value.trim(),

                data:
                    data.value,

                horario:
                    horario.value,

                servico:
                    selectServico.value

            };


            // =================================================
            // FORMATA DATA
            // =================================================

            const dataFormatada =
                dadosAgendamento.data
                    .split("-")
                    .reverse()
                    .join("/");


            // =================================================
            // SERVIÇO
            // =================================================

            const servicoFormatado =
                selectServico
                    .options[
                        selectServico.selectedIndex
                    ]
                    .textContent
                    .trim();


            // =================================================
            // MENSAGEM WHATSAPP
            // =================================================

            const mensagem = `
━━━━━━━━━━━━━━━━━━━━
NOVO PEDIDO DE AGENDAMENTO
━━━━━━━━━━━━━━━━━━━━

Nome: ${dadosAgendamento.nome}
Telefone: ${dadosAgendamento.telefone}
Email: ${dadosAgendamento.email}

Data: ${dataFormatada}
Horário: ${dadosAgendamento.horario}
Serviço: ${servicoFormatado}

Obrigado pelo contacto.
Aguardo a confirmação do agendamento.
`;


            // =================================================
            // CODIFICA MENSAGEM
            // =================================================

            const mensagemWhatsApp =
                encodeURIComponent(
                    mensagem
                );


            // =================================================
            // WHATSAPP
            // =================================================

            const numeroWhatsApp =
                "351914308807";


            const urlWhatsApp =
                `https://wa.me/${numeroWhatsApp}?text=${mensagemWhatsApp}`;


            // =================================================
            // ABRE WHATSAPP
            // =================================================

            window.open(
                urlWhatsApp,
                "_blank",
                "noopener,noreferrer"
            );


            // =================================================
            // MENSAGEM NO SITE
            // =================================================

            if (mensagemSucesso) {

                mensagemSucesso.textContent =
                    "Pedido preparado com sucesso. Será aberta uma conversa no WhatsApp.";

            }


            // =================================================
            // LIMPA FORMULÁRIO
            // =================================================

            formulario.reset();

        }
    );

}


// =========================================================
// SISTEMA DE ESTRELAS
// =========================================================

const estrelas =
    document.querySelectorAll(
        "#estrelas i"
    );


let classificacaoSelecionada = 0;


estrelas.forEach(
    function (estrela, indice) {

        estrela.addEventListener(
            "click",
            function () {

                classificacaoSelecionada =
                    indice + 1;


                estrelas.forEach(
                    function (
                        estrelaAtual,
                        indiceAtual
                    ) {

                        if (
                            indiceAtual <
                            classificacaoSelecionada
                        ) {

                            estrelaAtual.classList.remove(
                                "fa-regular"
                            );

                            estrelaAtual.classList.add(
                                "fa-solid"
                            );

                        } else {

                            estrelaAtual.classList.remove(
                                "fa-solid"
                            );

                            estrelaAtual.classList.add(
                                "fa-regular"
                            );

                        }

                    }
                );

            }
        );

    }
);


// =========================================================
// CAMPOS DA AVALIAÇÃO
// =========================================================

const nomeAvaliacao =
    document.querySelector(
        "#nome-avaliacao"
    );

const textoAvaliacao =
    document.querySelector(
        "#texto-avaliacao"
    );

const enviarAvaliacao =
    document.querySelector(
        "#enviar-avaliacao"
    );

const cardsTestemunhos =
    document.querySelector(
        ".cards-testemunhos"
    );


// =========================================================
// ENVIO DA AVALIAÇÃO
// =========================================================

if (
    enviarAvaliacao &&
    nomeAvaliacao &&
    textoAvaliacao &&
    cardsTestemunhos
) {

    enviarAvaliacao.addEventListener(
        "click",
        function () {

            const cliente =
                nomeAvaliacao.value.trim();


            const avaliacao =
                textoAvaliacao.value.trim();


            // -------------------------------------------------
            // VALIDAÇÃO
            // -------------------------------------------------

            if (
                cliente === "" ||
                avaliacao === "" ||
                classificacaoSelecionada === 0
            ) {

                alert(
                    "Preencha o nome, a avaliação e escolha as estrelas."
                );

                return;

            }


            // =================================================
            // NOVO TESTEMUNHO
            // =================================================

            const novoTestemunho =
                document.createElement(
                    "div"
                );


            novoTestemunho.classList.add(
                "testemunho"
            );


            // -------------------------------------------------
            // TEXTO
            // -------------------------------------------------

            const texto =
                document.createElement(
                    "p"
                );


            texto.textContent =
                avaliacao;


            // -------------------------------------------------
            // ESTRELAS
            // -------------------------------------------------

            const estrelasTestemunho =
                document.createElement(
                    "h4"
                );


            estrelasTestemunho.textContent =
                "★".repeat(
                    classificacaoSelecionada
                );


            // -------------------------------------------------
            // NOME
            // -------------------------------------------------

            const nomeCliente =
                document.createElement(
                    "strong"
                );


            nomeCliente.textContent =
                cliente;


            // =================================================
            // MONTA TESTEMUNHO
            // =================================================

            novoTestemunho.appendChild(
                texto
            );

            novoTestemunho.appendChild(
                estrelasTestemunho
            );

            novoTestemunho.appendChild(
                nomeCliente
            );


            // =================================================
            // COLOCA PRIMEIRO
            // =================================================

            cardsTestemunhos.insertBefore(
                novoTestemunho,
                cardsTestemunhos.firstElementChild
            );


            // =================================================
            // MANTÉM 3 TESTEMUNHOS
            // =================================================

            const testemunhos =
                cardsTestemunhos.querySelectorAll(
                    ".testemunho:not(.formulario-avaliacao)"
                );


            if (
                testemunhos.length > 3
            ) {

                testemunhos[
                    testemunhos.length - 1
                ].remove();

            }


            // =================================================
            // LIMPA
            // =================================================

            nomeAvaliacao.value = "";

            textoAvaliacao.value = "";

            classificacaoSelecionada = 0;


            estrelas.forEach(
                function (estrelaAtual) {

                    estrelaAtual.classList.remove(
                        "fa-solid"
                    );

                    estrelaAtual.classList.add(
                        "fa-regular"
                    );

                }
            );

        }
    );

}


// =========================================================
// NAVEGAÇÃO INFERIOR MOBILE
// =========================================================

const linksNavegacao =
    document.querySelectorAll(
        ".navegacao-inferior a"
    );


linksNavegacao.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                linksNavegacao.forEach(
                    function (item) {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );


                link.classList.add(
                    "ativo"
                );

            }
        );

    }
);


// =========================================================
// MENU MOBILE
// =========================================================

const botaoMenuMobile =
    document.querySelector(
        ".menu-mobile"
    );

const menu =
    document.querySelector(
        ".menu"
    );


if (
    botaoMenuMobile &&
    menu
) {


    // -----------------------------------------------------
    // ABRIR / FECHAR
    // -----------------------------------------------------

    botaoMenuMobile.addEventListener(
        "click",
        function () {

            const aberto =
                menu.classList.toggle(
                    "aberto"
                );


            botaoMenuMobile.setAttribute(
                "aria-expanded",
                String(aberto)
            );


            const icone =
                botaoMenuMobile.querySelector(
                    "i"
                );


            if (icone) {

                icone.classList.toggle(
                    "fa-bars",
                    !aberto
                );

                icone.classList.toggle(
                    "fa-xmark",
                    aberto
                );

            }

        }
    );

    
    const linksMenu =
        menu.querySelectorAll(
            "a"
        );


    linksMenu.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    menu.classList.remove(
                        "aberto"
                    );


                    botaoMenuMobile.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icone =
                        botaoMenuMobile.querySelector(
                            "i"
                        );


                    if (icone) {

                        icone.classList.remove(
                            "fa-xmark"
                        );

                        icone.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );

        }
    );

}

// =========================================================
// FIM DO MENU MOBILE
// =========================================================


// =========================================================
// BOTÃO WHATSAPP FLUTUANTE
// O cliente deve preencher primeiro o formulário
// =========================================================

const botaoWhatsApp =
    document.querySelector(".btn-whatsapp");

const formularioAgendamento =
    document.querySelector("#agendamento");


if (
    botaoWhatsApp &&
    formularioAgendamento
) {

    botaoWhatsApp.addEventListener(
        "click",
        function (evento) {

            evento.preventDefault();

            alert(
                "Para entrar em contacto pelo WhatsApp, preencha primeiro o formulário de agendamento."
            );

            formularioAgendamento.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}



// =========================================================
// NAVEGAÇÃO INICIAL
// =========================================================

const inicioNavegacao =
    document.querySelector(
        '.navegacao-inferior a[href="#inicio"]'
    );


if (inicioNavegacao) {

    inicioNavegacao.classList.add(
        "ativo"
    );

}


// =========================================================
// FIM DO JAVASCRIPT //versão a atualizar ... oséas
// =========================================================