const myModal = new bootstrap.Modal("#transiction-modal");

let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session");

let data = {
    transactions: [] // Iniciamos com uma lista vazia de transações
};

document.getElementById("button-logout").addEventListener("click", logout); // Executando a função logout quando o  usuário clica no botão sair

// Encaminhando o botão ver todas para a página de transações
document.getElementById("button-transactions").addEventListener("click", function(){
    window.location.href = "transactions.html"
});

// Adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Capturando os dados inseridos 
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value; // Captura o elemento selecionado

    // Adicionados os dados na lista transactions que foi criada anteriormente
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento adicionado com sucesso!");
});

checkLogin(); 

// Verificar se o usuário está logado, se não então retorna para tela de login

function checkLogin(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session; 
    }

    if (!logged){
        window.location.href = "index.html";
        return;
    }

    const UserData = localStorage.getItem(logged);
    if(UserData){
        data = JSON.parse(UserData); // Transformando os dados em estring novamente
    }

    getCashIn();
    getCashOut();
    getTotal();
}

// Botão sair

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

// Mostrar os lançamentos de entrada realizados pelo usuário
function getCashIn(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1"); // Selecionando os lançamentos do tipo entrada

    // Quantidades de lançamentos que são mostradas na tela
    if(cashIn.length){
        let cashInHTML = ``;
        let limit = 0; // Se não houver lançamentos, não mostra nada

        // Se houver lançamentos, seguem as regras a seguir
        if (cashIn.length > 5){
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        // Adicionando os lançamentos no HTML
        for (let index = 0; index < limit; index++) {
            cashInHTML += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2"> R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHTML
    }
}

// Mostrar os lançamentos de saída realizados pelo usuário
function getCashOut(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "2"); // Selecionando os lançamentos do tipo Saída

    // Quantidades de lançamentos que são mostradas na tela
    if(cashIn.length){
        let cashInHTML = ``;
        let limit = 0; // Se não houver lançamentos, não mostra nada

        // Se houver lançamentos, seguem as regras a seguir
        if (cashIn.length > 5){
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        // Adicionando os lançamentos no HTML
        for (let index = 0; index < limit; index++) {
            cashInHTML += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2"> R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashInHTML
    }
}

// Atualizando o saldo
function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1"){
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

