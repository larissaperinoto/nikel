const myModal = new bootstrap.Modal("#register-modal");

let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session");

checkLogin ();

// Logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Conta não encontrada. Verifique o usuário ou a senha.");
        return;
    }

    if(account){
        if(account.password !== password){
            alert("Conta não encontrada. Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }

});


// Criar conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 4) {
        alert ("Preencha um campo com um e-mail válido!");
        return;
    }

    if(password.length < 6) {
        alert("Utilize uma senha com no mínimo 6 dígitos!");
        return;
    }

    saveAcount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");

});

function checkLogin(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session; 
    }

    if (logged){
        saveSession(logged, session); //Executar a função saveSession toda vez que a pessoa marca permanecer logado

        window.location.href = "home.html";
    }
}

function saveAcount (data) {
   localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession (data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data); //Inserimos a sessão no local storage
    } 
    
    sessionStorage.setItem("logged", data); //Inserimos o login na session storage
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account); 
    }

    return "";
}