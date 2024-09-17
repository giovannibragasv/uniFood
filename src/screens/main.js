document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector(".profile-dropdown");
    const dropdownContent = document.querySelector(".dropdown-content");

    dropdownToggle.addEventListener("click", function() {
        dropdownContent.classList.toggle("show");
    });

    window.addEventListener("click", function(event) {
        if (!dropdownToggle.contains(event.target)) {
            dropdownContent.classList.remove("show");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Carrega os itens do localStorage se já existirem
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const totalDisplay = document.getElementById("cart-total");
    const verCarrinhoButton = document.getElementById("verCarrinho");

    const products = [
        {
            name: "Salgado de Salsicha",
            price: 6,
            img: "https://receitasmondial.com.br/wp-content/uploads/2023/02/enroladinho-de-salsicha-mondial-scaled.jpg",
            category: "salgados"
        },
        {
            name: "Salgado de queijo com presunto",
            price: 6,
            img: "https://i.ytimg.com/vi/ld6IAgPHMPw/maxresdefault.jpg",
            category: "salgados"
        },
        {
            name: "Salgado de frango",
            price: 6,
            img: "https://salgadosdesucesso.com.br/wp-content/uploads/2017/08/melhores-receitas-de-salgados-para-vender.jpg",
            category: "salgados"
        },
        {
            name: "Salgado de Peito de Peru",
            price: 6,
            img: "https://www.massasmeinhaus.com.br/media/produtoimagem/frango-com-peito-de-peru-101.jpg?v=1",
            category: "salgados"
        },
        {
            name: "Empada de Camarão",
            price: 6,
            img: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/07/Empada-de-camarao-freepik.jpg",
            category: "salgados"
        },
        {
            name: "Empada de Frango",
            price: 6,
            img: "https://zayaflour.com/wp-content/uploads/2021/06/209041939_332096688532498_4563438401343223032_n-1024x1024.jpg",
            category: "salgados"
        },
        {
            name: "Tapioca",
            price: 4,
            img: "https://www.oliberal.com/image/contentid/policy:1.698973:1687957213/image.jpg",
            category: "salgados"
        },
        {
            name: "Misto quente",
            price: 4,
            img: "https://img.cybercook.com.br/receitas/538/misto-quente-3.jpeg",
            category: "salgados"
        },
        {
            name: "Coca-Cola Lata",
            price: 6,
            img: "https://images.tcdn.com.br/img/img_prod/858764/refrigerante_coca_cola_lata_350ml_c_12_359_1_20201021152315.jpg",
            category: "bebidas"
        },
        {
            name: "Guarana Lata",
            price: 6,
            img: "https://acdn.mitiendanube.com/stores/001/165/503/products/guarana1-b5047b4aaf1e0c9b6b16192134101772-1024-1024.png",
            category: "bebidas"
        },
        {
            name: "Pepsi",
            price: 6,
            img: "https://mercantilnovaera.vtexassets.com/arquivos/ids/210011/Refrigerante-PEPSI-Cola-Lata-350ml.jpg?v=638289295239130000",
            category: "bebidas"
        },
        {
            name: "Suco de Laranja",
            price: 6,
            img: "https://cardapio.primeirobar.com.br/wp-content/uploads/2022/04/laranja.jpg",
            category: "bebidas"
        },
        {
            name: "Suco de Acerola",
            price: 6,
            img: "https://image.tuasaude.com/media/article/xs/dv/suco-de-acerola_67321_l.jpg",
            category: "bebidas"
        },
        {
            name: "Café",
            price: 6,
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
            category: "bebidas"
        },
        {
            name: "Red Bull",
            price: 6,
            img: "https://mercantilnovaera.vtexassets.com/arquivos/ids/189019-800-450?v=637699210982800000&width=800&height=450&aspect=true",
            category: "bebidas"
        },
        {
            name: "Água",
            price: 4,
            img: "https://io.convertiez.com.br/m/trimais/shop/products/images/3174/medium/agua-mineral-natural-sem-gas-crystal-garrafa-500ml_3146.jpg",
            category: "bebidas"
        }
    ];



    // Função para atualizar o total e a quantidade de itens na tela de cardápio
    function updateCartDisplay() {
        itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalDisplay.textContent = `Total: R$${total.toFixed(2)} / ${itemsCount} item${itemsCount > 1 ? 's' : ''}`;
    }

    // Função para criar um card
    function createCard(product) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-price', product.price);

        // Busca a quantidade do item no carrinho (se existir)
        const existingItem = cart.find(item => item.name === product.name);
        const quantity = existingItem ? existingItem.quantity : 0;

        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name}</p>
            <span>R$${product.price}</span>
            <div class="quantity-controls">
                <button class="decrement">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12Z" fill="black"/>
                    </svg>
                </button>
                <span class="quantity">${quantity}</span> <!-- Atualiza com a quantidade do localStorage -->
                <button class="increment">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H12.75V20.25C12.75 20.4489 12.671 20.6397 12.5303 20.7803C12.3897 20.921 12.1989 21 12 21C11.8011 21 11.6103 20.921 11.4697 20.7803C11.329 20.6397 11.25 20.4489 11.25 20.25V12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H11.25V3.75C11.25 3.55109 11.329 3.36032 11.4697 3.21967C11.6103 3.07902 11.8011 3 12 3C12.1989 3 12.3897 3.07902 12.5303 3.21967C12.671 3.36032 12.75 3.55109 12.75 3.75V11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12Z" fill="black"/>
                    </svg>
                </button>
            </div>
        `;

        const quantityDisplay = card.querySelector('.quantity');
        let currentQuantity = quantity;

        const incrementButton = card.querySelector('.increment');
        const decrementButton = card.querySelector('.decrement');

        incrementButton.addEventListener('click', function() {
            currentQuantity++;
            quantityDisplay.textContent = currentQuantity;

            // Adiciona ou atualiza o item no carrinho
            const existingItem = cart.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity = currentQuantity;
            } else {
                cart.push({ ...product, quantity: currentQuantity });
            }

            // Salva o carrinho no localStorage e atualiza a tela
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });

        decrementButton.addEventListener('click', function() {
            if (currentQuantity > 0) {
                currentQuantity--;
                quantityDisplay.textContent = currentQuantity;

                // Atualiza ou remove o item do carrinho
                if (currentQuantity === 0) {
                    cart = cart.filter(item => item.name !== product.name);
                } else {
                    const existingItem = cart.find(item => item.name === product.name);
                    if (existingItem) {
                        existingItem.quantity = currentQuantity;
                    }
                }

                // Salva o carrinho no localStorage e atualiza a tela
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            }
        });

        return card;
    }

    // Gera os cards para Salgados e Bebidas
    const salgadosContainer = document.getElementById('salgados-container');
    const bebidasContainer = document.getElementById('bebidas-container');

    products.forEach(product => {
        if (product.category === 'salgados') {
            salgadosContainer.appendChild(createCard(product));
        } else if (product.category === 'bebidas') {
            bebidasContainer.appendChild(createCard(product));
        }
    });

    // Redireciona para a página do carrinho
    verCarrinhoButton.addEventListener("click", function() {
        window.location.href = "TelaCarrinho.html"; // Redireciona para a página do carrinho
    });

    // Atualiza o total e a quantidade ao carregar a página
    updateCartDisplay();
});



document.addEventListener("DOMContentLoaded", function() {
    // Recupera os elementos e o carrinho do localStorage
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");
    const verCarrinhoButton = document.getElementById("verCarrinho");
    const comprarButton = document.getElementById("comprar");
    const backToMenuButton = document.getElementById("back-to-menu"); // Botão de voltar para o cardápio

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let itemsCount = 0;

    // Função para exibir os itens no carrinho (para TelaCarrinho.html)
    function renderCartItems() {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = ''; // Limpa o container antes de renderizar os itens
            cart.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <p>${item.name}</p>
                    <span>R$${item.price}</span>
                    <div class="quantity-controls">
                        <button class="decrement">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12Z" fill="black"/>
                            </svg>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increment">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H12.75V20.25C12.75 20.4489 12.671 20.6397 12.5303 20.7803C12.3897 20.921 12.1989 21 12 21C11.8011 21 11.6103 20.921 11.4697 20.7803C11.329 20.6397 11.25 20.4489 11.25 20.25V12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H11.25V3.75C11.25 3.55109 11.329 3.36032 11.4697 3.21967C11.6103 3.07902 11.8011 3 12 3C12.1989 3 12.3897 3.07902 12.5303 3.21967C12.671 3.36032 12.75 3.55109 12.75 3.75V11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                `;

                const quantityDisplay = card.querySelector('.quantity');
                let currentQuantity = item.quantity;

                const incrementButton = card.querySelector('.increment');
                const decrementButton = card.querySelector('.decrement');

                incrementButton.addEventListener('click', function() {
                    currentQuantity++;
                    quantityDisplay.textContent = currentQuantity;

                    const cartItem = cart.find(cartItem => cartItem.name === item.name);
                    cartItem.quantity = currentQuantity;

                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartDisplay();
                });

                decrementButton.addEventListener('click', function() {
                    if (currentQuantity > 0) {
                        currentQuantity--;
                        quantityDisplay.textContent = currentQuantity;

                        const cartItem = cart.find(cartItem => cartItem.name === item.name);
                        if (currentQuantity === 0) {
                            cart.splice(cart.indexOf(cartItem), 1); // Remove o item se a quantidade for 0
                        } else {
                            cartItem.quantity = currentQuantity;
                        }

                        localStorage.setItem("cart", JSON.stringify(cart));
                        updateCartDisplay();
                    }
                });

                cartItemsContainer.appendChild(card);
            });

            // Atualiza o total na barra inferior
            updateCartDisplay();
        }
    }

    // Função para atualizar o total e quantidade de itens
    function updateCartDisplay() {
        total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartTotalDisplay) {
            cartTotalDisplay.textContent = `Total: R$${total.toFixed(2)} / ${itemsCount} item${itemsCount > 1 ? 's' : ''}`;
        }
    }

    // Botão de voltar para o cardápio
    if (backToMenuButton) {
        backToMenuButton.addEventListener("click", function() {
            window.location.href = "TelaCardapio.html"; // Redireciona para a página do cardápio
        });
    }

    // Se estiver na TelaCarrinho, renderiza os itens do carrinho
    if (cartItemsContainer) {
        renderCartItems();
    }

    // Função para o botão de compra (TelaCarrinho)
    if (comprarButton) {
        comprarButton.addEventListener('click', function() {
            if (cart.length === 0) {
                alert("Seu carrinho está vazio. Adicione itens antes de comprar.");
            } else {
                window.location.href = "TelaPagamento.html"; // Redireciona para a página de pagamento
            }
        });
    }

    // Atualiza o total e a quantidade ao carregar a página
    updateCartDisplay();
});


const comprarButton = document.getElementById("comprar-btn");

if (comprarButton) {
    comprarButton.addEventListener("click", function() {
        window.location.href = "TelaPagamento.html"; // Redireciona para a página de pagamento
    });
}

    
    






document.addEventListener("DOMContentLoaded", function() {
    const backToCartButton = document.getElementById("back-to-cart");
    const finalizarCompraButton = document.getElementById("finalizar-compra");
    const alertContainer = document.getElementById("alert-container");
    const loader = document.getElementById("loader");

    // Função para voltar ao carrinho
    backToCartButton.addEventListener("click", function() {
        window.location.href = "TelaCarrinho.html";
    });

    // Acordeons - Garantindo que apenas um acordeon possa ser aberto por vez
    const accordions = document.querySelectorAll(".accordion");
    accordions.forEach(accordion => {
        const header = accordion.querySelector(".accordion-header");
        const inputs = accordion.querySelectorAll("input[type='radio']");

        header.addEventListener("click", function() {
            accordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion) {
                    otherAccordion.classList.remove("open");

                    // Desmarcar as opções do outro acordeon quando ele for fechado
                    const otherInputs = otherAccordion.querySelectorAll("input[type='radio']");
                    otherInputs.forEach(input => {
                        input.checked = false;
                    });
                }
            });

            accordion.classList.toggle("open");

            // Se o acordeon for fechado, desmarcar as opções dentro dele
            if (!accordion.classList.contains("open")) {
                inputs.forEach(input => {
                    input.checked = false;
                });
            }

            // Verificar se algum acordeon está aberto e se alguma opção foi selecionada
            checkIfAnyAccordionIsOpen();
        });
    });

    // Seleção de cartões
    const cartaoRadios = document.querySelectorAll('input[name="cartao"]');
    let cartoes = [
        { numero: '1234 5678 9012 3456', cvv: '123', titular: 'João Silva', validade: '12/23' },
        { numero: '9876 5432 1098 7654', cvv: '456', titular: 'Maria Souza', validade: '05/24' } // Cartão 2 será inválido
    ];

    const adicionarCartaoBtn = document.getElementById("adicionar-cartao");
    adicionarCartaoBtn.addEventListener("click", function() {
        alert('Função de adicionar cartão será implementada.');
    });

    // Verifica se o pagamento foi selecionado e habilita o botão
    function checkIfPaymentIsSelected() {
        let isCartaoSelecionado = false;
        cartaoRadios.forEach(cartaoRadio => {
            if (cartaoRadio.checked) {
                isCartaoSelecionado = true;
            }
        });

        const trocoValorRadio = document.getElementById("troco-valor");
        const semTrocoRadio = document.getElementById("sem-troco");

        if (isCartaoSelecionado || trocoValorRadio.checked || semTrocoRadio.checked) {
            finalizarCompraButton.disabled = false;
        } else {
            finalizarCompraButton.disabled = true;
        }
    }

    cartaoRadios.forEach(cartaoRadio => {
        cartaoRadio.addEventListener("change", function() {
            checkIfPaymentIsSelected();
        });
    });

    // Função para verificar se algum acordeon está aberto
    function checkIfAnyAccordionIsOpen() {
        let anyOpen = false;

        accordions.forEach(accordion => {
            if (accordion.classList.contains("open")) {
                anyOpen = true;
            }
        });

        // Se nenhum acordeon estiver aberto, desativa o botão
        if (!anyOpen) {
            finalizarCompraButton.disabled = true;
        } else {
            checkIfPaymentIsSelected();
        }
    }

    finalizarCompraButton.addEventListener("click", function() {
        const selectedCard = document.querySelector('input[name="cartao"]:checked');

        // Se o cartão 2 foi selecionado, mostra o erro
        if (selectedCard && selectedCard.id === "cartao-2") {
            showLoader(true); // Mostra o "processando"
            
            // Simulando uma espera para o carregamento
            setTimeout(function() {
                showLoader(false); // Esconde o loader
                showErrorMessage("Cartão inválido, tente novamente.");
            }, 2000); // Tempo para simular o processamento
        } else if (selectedCard && selectedCard.id !== "cartao-2") {
            // Simulação de sucesso
            showLoader(true);
            setTimeout(function() {
            showLoader(false); 
            window.location.href = "telaPedido.html";
            }, 2000);
        }
        });

    // Mostra o loader de "processando"
    function showLoader(isLoading) {
        if (isLoading) {
            loader.style.display = "block"; // Mostra o loader
        } else {
            loader.style.display = "none"; // Esconde o loader
        }
    }

    // Função para mostrar a mensagem de erro
    function showErrorMessage(message) {
        const alertElement = document.createElement("div");
        alertElement.classList.add("alert-error");
        alertElement.innerHTML = message + '<span class="close-btn">&times;</span>';
        alertContainer.appendChild(alertElement);

        // Função para fechar a mensagem de erro
        alertElement.querySelector(".close-btn").addEventListener("click", function() {
            alertElement.remove();
        });

        // Remove a mensagem automaticamente após 3 segundos
        setTimeout(function() {
            alertElement.remove();
        }, 3000);
    }

    // Função para mostrar a mensagem de sucesso
    function showSuccessMessage(message) {
        const successElement = document.createElement("div");
        successElement.classList.add("alert-success");
        successElement.innerHTML = message + '<span class="close-btn">&times;</span>';
        alertContainer.appendChild(successElement);

        // Função para fechar a mensagem de sucesso
        successElement.querySelector(".close-btn").addEventListener("click", function() {
            successElement.remove();
        });

        // Remove a mensagem automaticamente após 3 segundos
        setTimeout(function() {
            successElement.remove();
        }, 3000);
    }

    // Inicializar o botão como desativado
    finalizarCompraButton.disabled = true;
});






document.addEventListener("DOMContentLoaded", function() {
    // Recupera o carrinho salvo no localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const pedidoItemsContainer = document.getElementById("pedido-items");
    const pedidoTotalDisplay = document.getElementById("pedido-total");

    // Função para renderizar os itens na telaPedido
    function renderPedidoItems() {
        if (cart.length === 0) {
            pedidoItemsContainer.innerHTML = "<p>Seu pedido está vazio.</p>";
        } else {
            cart.forEach(item => {
                const pedidoItemElement = document.createElement('div');
                pedidoItemElement.classList.add('card'); // Pode reutilizar a classe "card"
                pedidoItemElement.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <p>${item.name}</p>
                    <span>R$${item.price} x ${item.quantity}</span>
                `;
                pedidoItemsContainer.appendChild(pedidoItemElement);
            });
        }
    }

    // Atualiza o total do pedido
    function atualizarTotalPedido() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        pedidoTotalDisplay.textContent = `Total: R$${total.toFixed(2)} / ${cart.length} itens`;
    }

    // Inicializa a tela carregando os itens do pedido
    renderPedidoItems();
    atualizarTotalPedido();
});


document.addEventListener("DOMContentLoaded", function() {
    let currentStep = 1;
    const totalSteps = 4; // Temos 4 passos
    const stepElements = document.querySelectorAll('.progress-step');
    const finalizarPedidoBtn = document.getElementById("finalizar-pedido-btn");
    const solicitarReembolsoBtn = document.getElementById("solicitar-reembolso-btn");

    // Função para avançar os passos
    function avancarPasso() {
        if (currentStep <= totalSteps) {
            stepElements[currentStep - 1].classList.add('completed');
            currentStep++;
        }

        if (currentStep === totalSteps + 1) {
            finalizarPedidoBtn.style.display = 'block'; // Exibe o botão ao chegar no último passo
        }
    }

    // Adicionando animação de tempo para mudar de passo a cada 20 segundos
    function iniciarProgresso() {
        const interval = setInterval(() => {
            avancarPasso();

            if (currentStep > totalSteps) {
                clearInterval(interval); // Para o progresso ao completar todos os passos
            }
        }, 20000); // 20 segundos para cada passo
    }

    // Clique no botão de "Finalizar Pedido" para reiniciar e redirecionar
    finalizarPedidoBtn.addEventListener("click", function() {
        // Reinicia os passos
        currentStep = 1;
        stepElements.forEach(step => step.classList.remove('completed'));
        
        // Oculta o botão novamente
        finalizarPedidoBtn.style.display = 'none';

        // Redireciona para a página de cardápio
        window.location.href = "TelaCardapio.html";
    });

    // Função para o botão "Solicitar Reembolso"
    solicitarReembolsoBtn.addEventListener("click", function() {
        if (currentStep === 1) {
            const confirmarCancelamento = confirm("Você tem certeza que deseja cancelar o pedido?");
            if (confirmarCancelamento) {
                alert("Pedido cancelado.");
            window.location.href = "TelaCardapio.html";
            }
        } else {
            const confirmarReembolso = confirm("Você tem certeza que deseja solicitar o reembolso?");
            if (confirmarReembolso) {
                alert("Reembolso solicitado.");
                window.location.href = "TelaCardapio.html";
            }
        }
    });

    iniciarProgresso();
});
