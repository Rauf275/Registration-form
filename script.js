// =======================
// GET USERS FROM STORAGE
// =======================

function getUsers() {

    let users = JSON.parse(localStorage.getItem("users"));

    if (!Array.isArray(users)) {
        users = [];
    }

    return users;
}


// =======================
// SAVE USERS
// =======================

function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}


// =======================
// 🔐 REGISTER
// =======================

function register() {

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim().toLowerCase();

    const password =
        document.getElementById("password").value;


    // только буквы
    const usernameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,}(?:[ -][a-zA-Zа-яА-ЯёЁ]{2,})*$/;

    if (!usernameRegex.test(username)) {

        alert("Имя может содержать только буквы");
        return;
    }


    // gmail или mail.ru

    const emailRegex =
     /^[a-zA-Z0-9._%+-]{3,}@(gmail\.com|mail\.ru)$/;

    if (!emailRegex.test(email)) {

        alert("Разрешены только gmail.com или mail.ru");
        return;
    }


    if (password.length < 6) {

        alert("Пароль минимум 6 символов");
        return;
    }


    let users = getUsers();


    const exists = users.find(
        user =>
        user.username === username ||
        user.email === email
    );


    if (exists) {

        alert("Пользователь уже существует");
        return;
    }


    const newUser = {

        username,
        email,
        password,

        createdAt:
        new Date().toISOString()

    };


    users.push(newUser);

    saveUsers(users);


    alert("Аккаунт создан!");


    window.location.href =
    "index.html";
}



// =======================
// 🔑 LOGIN
// =======================

function login() {


    const username =
        document.getElementById("loginUsername").value.trim();


    const password =
        document.getElementById("loginPassword").value;


    const remember =
        document.getElementById("rememberMe")?.checked;



    let users = getUsers();



    const user = users.find(

        u =>
        u.username === username &&
        u.password === password

    );



    if (!user) {

        alert("Неверное имя или пароль");
        return;

    }



    if (remember) {


        localStorage.setItem(

            "currentUser",

            JSON.stringify(user)

        );


    } else {


        sessionStorage.setItem(

            "currentUser",

            JSON.stringify(user)

        );

    }



    window.location.href =
    "dashboard.html";

}



// =======================
// 🚪 LOGOUT
// =======================

function logout() {


    localStorage.removeItem(
        "currentUser"
    );


    sessionStorage.removeItem(
        "currentUser"
    );


    window.location.href =
    "index.html";

}



// =======================
// 👤 DASHBOARD
// =======================

document.addEventListener(
"DOMContentLoaded",
()=>{


const welcome =
document.getElementById("welcome");


const profile =
document.getElementById("profile");



let currentUser =

JSON.parse(
localStorage.getItem("currentUser")
)

||

JSON.parse(
sessionStorage.getItem("currentUser")
);



if(!currentUser){


    if(
    window.location.pathname.includes("dashboard")
    ){

        window.location.href =
        "login.html";

    }


    return;

}



if(welcome){


welcome.textContent =
`Добро пожаловать, ${currentUser.username}`;


}



if(profile){


profile.innerHTML = `

<p>
<b>Имя:</b>
${currentUser.username}
</p>


<p>
<b>Email:</b>
${currentUser.email}
</p>


<p>
<b>Дата регистрации:</b>
${new Date(currentUser.createdAt)
.toLocaleString()}
</p>

`;

}


});




// =======================
// 🔁 FORGOT PASSWORD
// =======================

function resetPassword(){



const email =
prompt("Введите ваш email:")
.trim()
.toLowerCase();



let users = getUsers();



const user =
users.find(
u =>
u.email === email
);



if(!user){


alert("Email не найден");

return;

}



const newPassword =
prompt(
"Введите новый пароль"
);



if(
!newPassword ||
newPassword.length < 6
){


alert(
"Пароль минимум 6 символов"
);

return;

}



user.password =
newPassword;



saveUsers(users);



alert(
"Пароль успешно изменён"
);


}
