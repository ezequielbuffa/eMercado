document.addEventListener("DOMContentLoaded", function(e){
    var loginForm = document.getElementById("loginForm");

    loginForm.onsubmit = function (e){
        e.preventDefault();
        var user = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        localStorage.setItem('email', user);

        loginAuth("http://localhost:8080/auth",{
            user,
            password
        })
    };

    var loginAuth = function(url, data){
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {
            console.error('Error:', error)
            alert("Usuario o contraseña incorrectos.");
        })
        .then(response => {
            localStorage.setItem('token', response.token);
            console.log('Success', response.token);
            window.location.href = "/";
        });
    }
});
