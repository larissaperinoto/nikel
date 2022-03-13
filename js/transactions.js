const myModal = new bootstrap.Modal("#transiction-modal");

let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session");

let data = {
    transactions: [] // Iniciamos com uma lista vazia de transações
};

document.getElementById("button-logout").addEventListener("click", logout); // Executando a função logout quando o  usuário clica no botão sair

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

    getTransactions();

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

    getTransactions();
}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

// Adicionando a lista de lançamentos na página transactions
function getTransactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type ==="2"){
                type = "Saída";
            } 

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `
        });
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}