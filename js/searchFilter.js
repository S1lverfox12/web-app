$(document).ready(function() {
    $('#searchButton').click(function() {
        var searchTerm = $('#searchLineTitle').val();

        $('.item').each(function() {
            var title = $(this).find('h4').text();
            if (title.indexOf(searchTerm) != -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});