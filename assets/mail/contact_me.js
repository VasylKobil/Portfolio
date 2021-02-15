$('#contactForm').submit(function(e) {
    e.preventDefault();
    const $submit = document.querySelector('#sendMessageButton');

    $.ajax({
        url: 'https://formspree.io/f/xbjpedbr',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        beforeSend: function() {
            $submit.innerHTML = 'Sending message…';
        },
        success: function(data) {
            setTimeout(function() {
                $submit.innerHTML = 'Message sent!';
            }, 1000);
        },
        error: function(err) {
            setTimeout(function() {
                $submit.innerHTML = 'Please, fill form!';
            }, 1000);
        }
    });
});
