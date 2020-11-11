document.getElementById('profileSendButton').onclick=function(e){
    let fnameLname = document.getElementById('profileFLname').value,
        age = document.getElementById('profileAge').value,
        email = document.getElementById('profileEmail').value,
        phone = document.getElementById('profilePhone').value,
        userInfo = {"name": fnameLname, "age":age, "email":email, "phone":phone},
        userInfoParsed = JSON.stringify(userInfo);
    
        localStorage.setItem('userInfo', userInfoParsed);

}

let avatarSource = localStorage.getItem('avatarImage');

    if(avatarSource !== null) {
        document.getElementById('avatarImage').src = avatarSource;
    };

    const avatarInput = document.getElementById("avatarInput");
    const avatarImage = document.getElementById("avatarImage");

    avatarInput.onchange = (e) => {
        let avatar = e.target.files[0];
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('avatarImage').src = fr.result;
        }
        fr.readAsDataURL(avatar);
    };

    avatarImage.addEventListener("load", function() {
            var imgCanvas = document.createElement("canvas"),
                imgContext = imgCanvas.getContext("2d");

            //Make sure canvas is as big as the picture
            imgCanvas.width = avatarImage.width;
            imgCanvas.height = avatarImage.height;

            //Draw image into canvas element
            imgContext.drawImage(avatarImage, 0, 0, avatarImage.width,avatarImage.height);

            //Get canvas contents as a data URL
            var imgAsDataURL = imgCanvas.toDataURL("image/png");

            //Save into localStorage
            try {
                localStorage.setItem("avatarImage", imgAsDataURL);
            }
            catch (e){
                console.log("storage failed:" + e);
            }
    }, false);

    document.getElementById('deleteImage').onclick=function(e){
        localStorage.removeItem('avatarImage');
        window.location.reload();
    }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let obj = JSON.parse(localStorage.getItem('userInfo'))

    document.getElementById('profileFLname').value = obj.name
    document.getElementById('profileAge').value = obj.age
    document.getElementById('profileEmail').value = obj.email
    document.getElementById('profilePhone').value = obj.phone
    
});