<div class="form-body">
    <div class="website-logo">
        <a href="index.html">
            <div class="logo">
                <img class="logo-size" src="images/logo-light.svg" alt="">
            </div>
        </a>
    </div>
    <div class="row">
        <div class="img-holder">
            <div class="bg"></div>
            <div class="info-holder">
                <img src="images/graphic1.svg" alt="">
            </div>
        </div>
        <div class="form-holder">
            <div class="form-content">
                <div class="form-items">
                    <h3>Password Reset</h3>
                    <p>Untuk reset password, Masukan Email M Pediamu</p>
                    <form>
                        <input class="form-control" id="email" type="text" name="username" placeholder="E-mail Address" required>
                        <small class="notifikasi"></small>
                        <div class="form-button full-width">
                            <button onclick="cekemail()" type="button" class="ibtn btn-forgett">Send Reset Link</button>
                        </div>
                    </form>
                </div>
                <div class="form-sent">
                    <div class="tick-holder">
                        <div class="tick-icon"></div>
                    </div>
                    <h3>Link reset password terkirim</h3>
                    <p>Silahkan cek inbox/spam di emailmu</p>
                    <div class="info-holder">
                        <span>Butuh bantuan lain?</span> <a href="#">We can help</a>.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    var url = '<?= BASEURL; ?>'

    function cekemail() {
        var email = $('#email').val()
        if (email.length == 0) {
            $('.notifikasi').addClass('text-danger')
            $('.notifikasi').html('Harus diisi')
        }
        $.ajax({
            url: url.concat('auth/cekemail'),
            type: 'post',
            dataType: 'html',
            data: {
                email: email
            },
            beforeSend: function() {
                $('.notifikasi').addClass('text-info')
                $('.notifikasi').html('Mohon tunggu...')
            },
            success: function(result) {
                console.log(result);
                if (result == 'false') {
                    $('.notifikasi').addClass('text-danger')
                    $('.notifikasi').html('Email tidak di temukan')
                } else if (result == 'true') {
                    $('.form-items', '.form-content').addClass('hide-it');
                    $('.form-sent', '.form-content').addClass('show-it');
                } else {
                    $('.notifikasi').addClass('text-danger')
                    $('.notifikasi').html('Kesalahan system')
                }
            }

        })
    }

    // e.preventDefault();
    // $('.form-items', '.form-content').addClass('hide-it');
    // $('.form-sent', '.form-content').addClass('show-it');
</script>