

function Exit() {
    $.ajax({
        url: 'exit.php',
        type: 'get',
        success: function () {
            localStorage.clear();
            if (document.title === "Корзина") {
                location.replace("/index.php");
            }
            else {location.reload();}
        }
    })
}
