document.addEventListener("DOMContentLoaded", function(e){
    const loginForm = document.getElementById("loginForm");

    loginForm.onsubmit = function (e) {
        e.preventDefault();
        let email = document.getElementById("email").value;
//        let password = document.getElementById("password").value;
        localStorage.setItem('email', email);
        window.location.href = "./index.html";
    };
});

//        loginAuth("http://localhost:8080/auth",{
//            user,
//            password
//        })
//    };

//    const loginAuth = function(url, data){
//        fetch(url, {
//            method: 'POST',
//            body: JSON.stringify(data),
//            headers:{
//                'Content-Type': 'application/json'
//            }
//        }).then(res => res.json())
//        .catch(error => {
//            console.error('Error:', error)
//            alert("Usuario o contraseña incorrectos.");
//        })
//        .then(response => {
//            localStorage.setItem('token', response.token);
//            console.log('Success', response.token);
//            window.location.href = "/";
//        });
//    }
//});
