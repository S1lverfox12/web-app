

$(document).ready(function() {
    $(window).on('pageshow', function(event) {
        if (event.originalEvent.persisted) {
            window.location.reload();
        }
    });


    function updateCartCount() {
        $.ajax({
            url: 'counterTovars.php',
            type: 'GET',
            dataType: 'json',
            data: {action: 'updateCounterTovars'},
            success: function (response) {
                if (response.cartItemCount) {
                    $('#shoppingCardIndicator').css('display', 'inline-flex')
                    $('#shoppingCardIndicator').text(response.cartItemCount);
                }
                else {
                    $('#shoppingCardIndicator').css('display', 'none')
                }
            },
            error: function (xhr, status, error) {
                console.error('Ошибка при обновлении счетчика корзины:', error);
            }
        });
    }
    function updateData(){
        if (localStorage.length){
            $('.empty').hide();
            $('#delAllTovars').show()
        }
        else {
            $('.empty').show();
            $('#delAllTovars').hide()
        }

        $('.add-to-Cart').each(function() {
            const btn = $(this);

            // Получаем индекс кнопки
            const id_tovar = btn.attr('data-bs-id');

            // Проверяем, есть ли данные в localStorage для данной кнопки
            if (localStorage.getItem(id_tovar) === 'inCart') {
                btn.text('В корзине');
            }
            else {btn.text('Купить');}
            btn.on('click', function () {

                if (btn.text() === 'Купить') {

                    $.ajax({
                        url: 'counterTovars.php',
                        data: {action: 'addToCart', id_tovar: id_tovar},
                        type: 'POST',
                        datatype: 'json',
                        success: function (response) {
                            btn.text('В корзине')
                            localStorage.setItem(id_tovar, 'inCart');
                            updateCartCount();
                        }
                    })
                }
                else {

                    $.ajax({
                        url: 'counterTovars.php',
                        data: {action: 'delToCart', id_tovar: id_tovar},
                        type: 'POST',
                        datatype: 'json',
                        success: function (response) {
                            btn.text('Купить');
                            localStorage.removeItem(id_tovar);
                            updateCartCount();
                        }
                    })
                }
            })
        });
        $('.btn-delete-item').each(function () {
            const btn = $(this);
            const item = btn.closest('.item');
            const all = btn.closest('.list-tovars-and-btn-del-all')
            const id_tovar = btn.attr('data-bs-id');

            btn.on('click', function () {
                $.ajax({
                    url: 'counterTovars.php',
                    data: {action: 'delToCart', id_tovar: id_tovar},
                    type: 'POST',
                    datatype: 'json',
                    success: function (response) {
                        item.hide();
                        localStorage.removeItem(id_tovar);
                        console.log(localStorage.length);
                        if (!localStorage.length) {
                            all.hide();
                            $('.empty').show();
                        }
                        updateCartCount();
                    }
                })
            })

        })
        $('#delAllTovars').on('click', function () {
            // var tovars = Object.keys(localStorage);
            const list = $(this).closest('.list-tovars-and-btn-del-all')
            $.ajax({
                url: 'counterTovars.php',
                data: {action: 'delAllTovars'},
                type: 'POST',
                datatype: 'json',
                success: function (response) {
                    list.hide();
                    $('.empty').show();
                    localStorage.clear();
                    updateCartCount();
                }
            })
        })
    }
    function updatePage(){
        updateData();
        updateCartCount();
    }

    function updateEveryFive() {
        setInterval(function (){updatePage()}, 5000);
    }
    updatePage();
    updateEveryFive()

});