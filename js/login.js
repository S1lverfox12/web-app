$(document).ready(function() {

    function showMessage(message, isValid) {
        if (isValid) {  $('#staticBackdropLabel').text('Успех');
            $('#closeMessage').on('click', function () {
                location.replace('/index.php');
            })
            $('#closeX').on('click', function () {
                location.replace('/index.php');
            })
        }
        else {$('#staticBackdropLabel').text('Ошибка');}

        $('.modal-body').text(message);
        $('#staticBackdrop').modal('show');

    }


    var validEmail = false;
    var validPassword = false;

    var notNull = false;
    function validateEmail(email) {
        var re = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        return re.test(email);
    }

    $('#authorizationForm').keydown(function(e){
        if(e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });

    // Обработчик события onSubmit
    $('#authorizationForm').on("submit",function(e) {
        e.preventDefault();

        var email = $('#Email').val().trim();
        var password = $('#Password').val().trim();

        if (email === '' || password === '') {
            showMessage('Пожалуйста, заполните все поля', notNull);
        }
        else { notNull = true}

        // Проверка введенной почты
        if (!validateEmail(email)) {
            showMessage('Некорректный формат электронной почты', validEmail);

        } else {validEmail = true;}
        if (!(password === '')) {
            validPassword = true;
        }


        if (validPassword && validEmail  && notNull) {

            var data = {
                password: password, email: email
            }
            $.ajax({
                type: 'post',
                url: '/authorization.php',
                data: data,
                datatype: 'json',
                success: function(response) {

                    if (response["success"] === "ok") {
                        console.log(response['tovars']);
                        for(let i = 0; i < response['tovars'].length; i++) {
                            localStorage.setItem(response['tovars'][i], 'inCart');
                        }
                        console.log(localStorage);
                        showMessage('Пользователь успешно авторизован', true);


                    }
                    else if (response["success"] === 'fail password'){
                        showMessage('Неправильный пароль', false);
                    }
                    else {
                        showMessage('Пользователь не зарегистрирован', false);
                    }

                },
                error: function(xhr, status, error) {
                    showMessage('Ошибка при отправке данных', false);
                }


            });
        }

    });
});