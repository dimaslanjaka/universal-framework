// ini untuk setting pesan pulsa dan paket data
// function pesan pulsa dan paketdata

function ajaxPulsa(operator) {

    $.ajax({
        url: url.concat('home/orderpulsa'),
        type: 'post',
        dataType: 'json',
        data: {
            operator: operator,
        },
        success: function (result) {

            $('.loaderajax').html('');
            result.forEach(data => {
                $('.layanan').append(` <div class="alert-secondary p-2 m-2 col-5">
                <input type="radio" value="`+ data.provider_id + `" name="layananpulsa"  style="margin-right:10px; margin-top:3px;" required>` + data.layanan + `<br>
                <p style="margin-left:23px; margin-bottom:0;">Harga : RP. `+ data.harga + ` </p>
                <p class="text-danger small " style="margin-left:10px; margin-top:0px;">*`+ data.deskripsi + `</p>
            </div>`)
            });
        }
    })

}
function ajaxData(operator) {

    $.ajax({
        url: url.concat('home/orderdata'),
        type: 'post',
        dataType: 'json',
        data: {
            operator: operator,
        },
        success: function (result) {

            $('.loaderajax').html('');
            result.forEach(data => {
                $('.layanan').append(` <div class="alert-secondary p-2 m-2 col-5">
                <input type="radio" value="`+ data.provider_id + `" name="layananpulsa"  style="margin-right:10px; margin-top:3px;" required>` + data.layanan + `<br>
                <p style="margin-left:23px; margin-bottom:0;">Harga : RP. `+ data.harga + ` </p>
                <p class="text-danger small " style="margin-left:10px; margin-top:0px;">*`+ data.deskripsi + `</p>
            </div>`)
            });
        }
    })

}


// pesan pulsa

$('.pesan-pulsa').on('click', function () {
    $('.judul-pesanpulsa').html('Pesan Pulsa');
    $('#nomorhp').keyup(function () {
        var value = $('#nomorhp').val();
        var kode = value.slice(0, 4);
        var digit = value.length

        if (digit == 0) {
            $('.loaderajax').html('');
            $('.layanan').html('');
        } else {

            if (digit < 4) {
                $('.layanan').html('')

                $('.loaderajax').html('<div class="text-center"><img src="loader/bar-loader.gif"></div>')
            }
            else if (kode == 0814 || kode == 0815 || kode == 0816 || kode == 0855 || kode == 0856 || kode == 0857 || kode == 0858) {

                var operator = "Indosat"
                ajaxPulsa(operator)
            } else if (kode == 0811 || kode == 0812 || kode == 0813 || kode == 0821 || kode == 0822 || kode == 0852 || kode == 0853 || kode == 0823 || kode == 0851) {

                var operator = "TELKOMSEL"
                ajaxPulsa(operator)
            } else if (kode == 0817 || kode == 0818 || kode == 0819 || kode == 0859 || kode == 0877 || kode == 0878) {

                var operator = "XL"
                ajaxPulsa(operator)
            } else if (kode == 0838 || kode == 0831 || kode == 0832 || kode == 0833) {

                var operator = "Axis"
                ajaxPulsa(operator)
            } else if (kode == 0895 || kode == 0896 || kode == 0897 || kode == 0898 || kode == 0899) {

                var operator = "Three"
                ajaxPulsa(operator)
            } else if (kode == 0881 || kode == 0882 || kode == 0883 || kode == 0884 || kode == 0885 || kode == 0886 || kode == 0887 || kode == 0888 || kode == 0889) {

                var operator = "Smartfreen"
                ajaxPulsa(operator)
            } else {
                $('.loaderajax').html('<div class="text-center text-error"><p>operator tidak dikenali</p></div>');
            }


        }

    })
})
//


$('.pesan-paket').on('click', function () {
    $('.judul-pesanpulsa').html('Pesan Paket Data');
    $('#nomorhp').keyup(function () {
        var value = $('#nomorhp').val();
        var kode = value.slice(0, 4);
        var digit = value.length

        if (digit == 0) {
            $('.loaderajax').html('');
            $('.layanan').html('');
        } else {

            if (digit < 4) {
                $('.layanan').html('')

                $('.loaderajax').html('<div class="text-center"><img src="loader/bar-loader.gif"></div>')
            }
            else if (kode == 0814 || kode == 0815 || kode == 0816 || kode == 0855 || kode == 0856 || kode == 0857 || kode == 0858) {

                var operator = "Indosat"
                ajaxData(operator)
            } else if (kode == 0811 || kode == 0812 || kode == 0813 || kode == 0821 || kode == 0822 || kode == 0852 || kode == 0853 || kode == 0823 || kode == 0851) {

                var operator = "TELKOMSEL"
                ajaxData(operator)
            } else if (kode == 0817 || kode == 0818 || kode == 0819 || kode == 0859 || kode == 0877 || kode == 0878) {

                var operator = "XL"
                ajaxData(operator)
            } else if (kode == 0838 || kode == 0831 || kode == 0832 || kode == 0833) {

                var operator = "Axis"
                ajaxData(operator)
            } else if (kode == 0895 || kode == 0896 || kode == 0897 || kode == 0898 || kode == 0899) {

                var operator = "Three"
                ajaxData(operator)
            } else if (kode == 0881 || kode == 0882 || kode == 0883 || kode == 0884 || kode == 0885 || kode == 0886 || kode == 0887 || kode == 0888 || kode == 0889) {

                var operator = "Smartfreen"
                ajaxData(operator)
            } else {
                $('.loaderajax').html('<div class="text-center text-error"><p>operator tidak dikenali</p></div>');
            }


        }

    })
})
//

$('.close-modalpulsa').on('click', function () {

    $('.ajaxloader').html('');
    $('.layanan').html('');
    $('.judul-pesanpulsa').html('');
    $('#nomorhp').val('');

})
// sampai sini okk pesanan pulsa dan paket datanya


// dan ini untuk layanan ppob lainnya

function pesanppob(aksi, kategori, tipe = '') {

    if (aksi == 'kategori') {
        $.ajax({
            url: url.concat('home/pesanppob'),
            type: 'post',
            data: {
                aksi: aksi,
                kategori: kategori
            },
            dataType: 'json',
            success: function (result) {

                result.forEach(data => {

                    $('.kategorippob').fadeIn()
                    $('.optionkategorippob').append(`
                <option value="`+ data.kode + `">` + data.nama + `</option>`)
                });
            }
        })
    } else if (aksi == 'layanan') {
        $.ajax({
            url: url.concat('home/pesanppob'),
            type: 'post',
            data: {
                aksi: 'layanan',
                kategori: kategori,
                tipe: tipe,
            },
            dataType: 'json',
            success: function (result) {

                result.forEach(data => {

                    $('.layananppob').fadeIn()
                    $('.optionlayananppob').append(`
                <option value="`+ data.id + `">` + data.layanan + `</option>`)
                });

            }
        })
    }
}

$('.pesan-emoney').on('click', function () {
    $('.judul-pesanppob').html('Pesan Emoney')
    var tipe = 'E-Money'
    $('#nomorhpppob').keyup(function () {
        var val = $('#nomorhpppob').val();
        var digitnya = val.length;

        if (digitnya == 0) {
            $('.kategorippob').fadeOut()
            $('.layananppob').fadeOut()
            $('.deskripsippob').fadeOut()
        } else {

            if (digitnya == 1) {

                pesanppob('kategori', tipe);


                $('.kategorippob').change(function () {
                    $('.deskripsilayanan').fadeOut()
                    $('.optionlayananppob').html(`<option label="&nbsp;">&nbsp;</option>`)
                    var kategorippob = $('.optionkategorippob').val()
                    pesanppob('layanan', kategorippob, tipe);

                })

                $('.layananppob').change(function () {
                    var idlayanan = $('.optionlayananppob').val()
                    $('.deskripsilayanan').fadeIn()

                    $.ajax({
                        url: url.concat('home/deskripsippob'),
                        type: 'post',
                        data: {
                            id: idlayanan
                        },
                        dataType: 'json',
                        success: function (result) {

                            result.forEach(data => {

                                $('.deskripsilayanan').html(`
                                Layanan : `+ data.layanan + ` <br>
                                Keterangan : `+ data.deskripsi + `<br>
                                Harga : `+ data.harga + ``)
                            });
                        }
                    })

                })

            }

        }
    })
})


// pesan vouucher digital
$('.pesan-voucherdigital').on('click', function () {
    $('.judul-pesanppob').html('Voucher Digital')
    var tipe = 'Voucher'
    $('#nomorhpppob').keyup(function () {
        var val = $('#nomorhpppob').val();
        var digitnya = val.length;

        if (digitnya == 0) {
            $('.kategorippob').fadeOut()
            $('.layananppob').fadeOut()
            $('.deskripsippob').fadeOut()
        } else if (digitnya == 1) {



            pesanppob('kategori', tipe);


            $('.kategorippob').change(function () {
                $('.deskripsilayanan').fadeOut()
                $('.optionlayananppob').html(`<option label="&nbsp;">&nbsp;</option>`)
                var kategorippob = $('.optionkategorippob').val()
                pesanppob('layanan', kategorippob, tipe);

            })

            $('.layananppob').change(function () {
                var idlayanan = $('.optionlayananppob').val()
                $('.deskripsilayanan').fadeIn()

                $.ajax({
                    url: url.concat('home/deskripsippob'),
                    type: 'post',
                    data: {
                        id: idlayanan
                    },
                    dataType: 'json',
                    success: function (result) {

                        result.forEach(data => {

                            $('.deskripsilayanan').html(`
                                Layanan : `+ data.layanan + ` <br>
                                Keterangan : `+ data.deskripsi + `<br>
                                Harga : `+ data.harga + ``)
                        });
                    }
                })

            })



        }
    })
})


// end voucher digital

// pesan PLN
$('.pesan-pln').on('click', function () {
    $('.judul-pesanppob').html('Token PLN')
    var tipe = 'PLN'
    $('#nomorhpppob').keyup(function () {
        var val = $('#nomorhpppob').val();
        var digitnya = val.length;

        if (digitnya == 0) {
            $('.kategorippob').fadeOut()
            $('.layananppob').fadeOut()
            $('.deskripsippob').fadeOut()
        } else {

            if (digitnya == 1) {

                pesanppob('kategori', tipe);


                $('.kategorippob').change(function () {
                    $('.deskripsilayanan').fadeOut()
                    $('.optionlayananppob').html(`<option label="&nbsp;">&nbsp;</option>`)
                    var kategorippob = $('.optionkategorippob').val()
                    pesanppob('layanan', kategorippob, tipe);

                })

                $('.layananppob').change(function () {
                    var idlayanan = $('.optionlayananppob').val()
                    $('.deskripsilayanan').fadeIn()

                    $.ajax({
                        url: url.concat('home/deskripsippob'),
                        type: 'post',
                        data: {
                            id: idlayanan
                        },
                        dataType: 'json',
                        success: function (result) {

                            result.forEach(data => {

                                $('.deskripsilayanan').html(`
                                Layanan : `+ data.layanan + ` <br>
                                Keterangan : `+ data.deskripsi + `<br>
                                Harga : `+ data.harga + ``)
                            });
                        }
                    })

                })

            }

        }
    })
})


// end pesan pLN



$('.pesan-game').on('click', function () {
    $('.judul-pesanppob').html('Pesan Voucher Game')
    var tipe = 'Games'
    $('#nomorhpppob').keyup(function () {
        var val = $('#nomorhpppob').val();
        var digitnya = val.length;

        if (digitnya == 0) {
            $('.kategorippob').fadeOut()
            $('.layananppob').fadeOut()
            $('.deskripsippob').fadeOut()
        } else {

            if (digitnya == 1) {

                pesanppob('kategori', tipe);


                $('.kategorippob').change(function () {
                    $('.deskripsilayanan').fadeOut()
                    $('.optionlayananppob').html(`<option label="&nbsp;">&nbsp;</option>`)
                    var kategorippob = $('.optionkategorippob').val()
                    pesanppob('layanan', kategorippob, tipe);

                })

                $('.layananppob').change(function () {
                    var idlayanan = $('.optionlayananppob').val()
                    $('.deskripsilayanan').fadeIn()

                    $.ajax({
                        url: url.concat('home/deskripsippob'),
                        type: 'post',
                        data: {
                            id: idlayanan
                        },
                        dataType: 'json',
                        success: function (result) {

                            result.forEach(data => {

                                $('.deskripsilayanan').html(`
                                Layanan : `+ data.layanan + ` <br>
                                Keterangan : `+ data.deskripsi + `<br>
                                Harga : `+ data.harga + ``)
                            });
                        }
                    })

                })

            }

        }
    })
})









function pesansosmed(aksi, kategori, tipe = '') {

    if (aksi == 'kategori') {
        $.ajax({
            url: url.concat('home/pesansosmed'),
            type: 'post',
            data: {
                aksi: aksi,
                kategori: kategori
            },
            dataType: 'json',
            success: function (result) {

                result.forEach(data => {

                    $('.kategorisosmed').fadeIn()
                    $('.optionkategorisosmed').append(`
                <option value="`+ data.kode + `">` + data.nama + `</option>`)
                });
            }
        })
    } else if (aksi == 'layanan') {
        $.ajax({
            url: url.concat('home/pesansosmed'),
            type: 'post',
            data: {
                aksi: 'layanan',
                kategori: kategori,
                tipe: tipe,
            },
            dataType: 'json',
            success: function (result) {

                result.forEach(data => {

                    $('.layanansosmed').fadeIn()
                    $('.optionlayanansosmed').append(`
                <option value="`+ data.service_id + `">` + data.layanan + `</option>`)
                });

            }
        })
    }
}

// pesan sosmed
$('.pesan-sosmed').on('click', function () {

    var tipe = 'Sosial Media'
    $('#username').keyup(function () {
        var val = $('#username').val();
        var digitnya = val.length;

        if (digitnya == 0) {
            $('.kategorisosmed').fadeOut()
            $('.layanansosmed').fadeOut()
            $('.deskripsilayanansosmed').fadeOut()
        } else {

            if (digitnya == 1) {

                pesansosmed('kategori', tipe);


                $('.kategorisosmed').change(function () {
                    $('.deskripsilayanansosmed').fadeOut()
                    $('.optionlayanansosmed').html(`<option label="&nbsp;">&nbsp;</option>`)
                    var kategorisosmed = $('.optionkategorisosmed').val()
                    pesansosmed('layanan', kategorisosmed, tipe);

                })

                $('.layanansosmed').change(function () {
                    var idlayanan = $('.optionlayanansosmed').val()
                    $('.deskripsilayanansosmed').fadeIn()

                    $.ajax({
                        url: url.concat('home/deskripsisosmed'),
                        type: 'post',
                        data: {
                            id: idlayanan
                        },
                        dataType: 'json',
                        success: function (result) {

                            result.forEach(data => {

                                $('.deskripsilayanansosmed').html(`
                                Layanan : `+ data.layanan + ` <br>
                                Keterangan : `+ data.catatan + `<br>
                                Harga : `+ data.harga + ``)
                            });
                        }

                    })
                    $.ajax({
                        url: url.concat('home/ratesosmed'),
                        type: 'post',
                        data: {
                            id: idlayanan
                        },
                        dataType: 'json',
                        success: function (result) {

                            result.forEach(data => {

                                $('.deskripsilayanansosmed').html(`
                                Layanan : `+ data.layanan + ` <br>
                                Keterangan : `+ data.catatan + `<br>
                                Harga : `+ data.harga + ``)
                            });
                        }

                    })

                })

            }

        }
    })



    var id = $('.optionlayanansosmed').val()
    console.log(id);


})


// akhir pesan sosmed

$('.close-modalppob').on('click', function () {


    //pemesanan voucher digital

    // end pesan voucher digital
    $('.kategorippob').fadeOut()
    $('.layananppob').fadeOut()
    $('.deskripsippob').fadeOut()
    $('#nomorhpppob').val('')
})