function ambillayananpulsa(operator) {
    $.ajax({
        url: url.concat('home/orderpulsa'),
        type: 'post',
        dataType: 'html',
        data: {
            operator: operator,
        },
        ajaxStart: function () {
            $('.layanan').html(`
               <img src="loader/ajax-loader.gif">
            `);
        },
        success: function (result) {

            $('.loaderajax').html('');

            $('.layanan').html(result)

        }
    }
    )
}
function ambillayanandata(operator) {
    $.ajax({
        url: url.concat('home/orderdata'),
        type: 'post',
        dataType: 'html',
        data: {
            operator: operator,
        },
        ajaxStart: function () {
            $('.layanan').html(`
               <img src="loader/ajax-loader.gif">
            `);
        },
        success: function (result) {

            $('.loaderajax').html('');

            $('.layanan').html(result)

        }
    }
    )
}


function tipekartu(kode) {
    if (kode == 0814 || kode == 0815 || kode == 0816 || kode == 0855 || kode == 0856 || kode == 0857 || kode == 0858) {
        $('.layanan').html('')
        return 'indosat'
    } else if (kode == 0811 || kode == 0812 || kode == 0813 || kode == 0821 || kode == 0822 || kode == 0852 || kode == 0853 || kode == 0823 || kode == 0851) {
        return 'Telkomsel'
    } else if (kode == 0817 || kode == 0818 || kode == 0819 || kode == 0859 || kode == 0877 || kode == 0878) {
        return 'XL'
    } else if (kode == 0838 || kode == 0831 || kode == 0832 || kode == 0833) {
        return "Axis"
    } else if (kode == 0895 || kode == 0896 || kode == 0897 || kode == 0898 || kode == 0899) {
        return "tri"
    } else if (kode == 0881 || kode == 0882 || kode == 0883 || kode == 0884 || kode == 0885 || kode == 0886 || kode == 0887 || kode == 0888 || kode == 0889) {
        return "Smartfreen"
    } else {

        return 'error'
    }


}

var $keyupnohp = $('#nohp')
var $layanan = $('.layanan');
$('.pesan-pulsa').on('click', function () {
    $keyupnohp.keyup(function () {
        var digit = $(this).val().length
        if (digit == 0) {
            $layanan.html('');
        } else if (digit < 4) {
            $layanan.html(`
            <img src="loader/ajax-loader.gif">`)
        }
        else {
            var opr = $(this).val();
            var kode = opr.substring(0, 4)

            var kartu = tipekartu(kode)
            if (kartu == 'error') {
                $layanan.html(`
               <p>Operator Tidak dikenali</p>
            `);
            } else

                setTimeout(() => {
                    ambillayananpulsa(kartu)
                }, 700);
        }
    })
})
$('.pesan-paket').on('click', function () {
    $('#labelmodalpulsa').html('Paket internet')
    $keyupnohp.keyup(function () {
        var digit = $(this).val().length
        if (digit == 0) {
            $layanan.html('');
        } else if (digit < 4) {
            $layanan.html(`
            <img src="loader/ajax-loader.gif">`)
        }
        else {
            var opr = $(this).val();
            var kode = opr.substring(0, 4)

            var kartu = tipekartu(kode)
            if (kartu == 'error') {
                $layanan.html(`
               <p>Operator Tidak dikenali</p>
            `);
            } else

                setTimeout(() => {
                    ambillayanandata(kartu)
                }, 700);
        }
    })
})
$('.tutupmodalpulsa').on('click', function () {
    $keyupnohp.val('');
    $layanan.html('');
})


var $tujuanppob = $('#tujuanppob')
var $kategorippob = $('.kategorippob')
var $optionkategori = $('.optionkategorippob')
var $optionlayanan = $('.optionlayananppob')
var $layananppob = $('.layananppob')
var $deskripsippob = $('.deskripsippob')

// emoney
$('.pesan-emoney').on('click', function () {
    $tujuanppob.keyup(function () {
        var tujuan = $(this).val();
        var tdigit = tujuan.length
        if (tdigit > 2) {
            $kategorippob.fadeIn()

            setTimeout(() => {
                $.ajax({
                    url: url.concat('home/pesanppob'),
                    type: 'post',
                    data: {
                        aksi: 'kategori',
                        kategori: 'E-Money'
                    },
                    dataType: 'html',
                    success: function (result) {
                        $optionkategori.html(result)

                    }
                })
            }, 700);
        }
    })



    $kategorippob.change(function () {
        var kategorinya = $optionkategori.val();
        $layananppob.fadeIn()

        $.ajax({
            url: url.concat('home/pesanppob'),
            type: 'post',
            data: {
                aksi: 'layanan',
                kategori: kategorinya,
                tipe: 'E-Money'
            },
            dataType: 'html',
            success: function (result) {
                console.log(result)
                $('.optionlayananppob').html(result)


            }
        })
    })

    $layananppob.change(function () {
        $deskripsippob.fadeIn()
        var idlayanan = $('.optionlayananppob').val();
        $.ajax({
            url: url.concat('home/deskripsippob'),
            type: 'post',
            data: {
                id: idlayanan
            },
            dataType: 'json',
            success: function (result) {
                // console.log(idlayanan)
                result.forEach(data => {

                    $deskripsippob.html(`
                    Layanan : `+ data.layanan + ` <br>
                    Keterangan : `+ data.deskripsi + `<br>
                    Harga : `+ data.harga + ``)
                });
            }
        })
    })

})

// voucher digital
$('.pesan-voucherdigital').on('click', function () {
    $tujuanppob.keyup(function () {
        var tujuan = $(this).val();
        var tdigit = tujuan.length
        if (tdigit > 2) {
            $kategorippob.fadeIn()

            setTimeout(() => {
                $.ajax({
                    url: url.concat('home/pesanppob'),
                    type: 'post',
                    data: {
                        aksi: 'kategori',
                        kategori: 'Voucher'
                    },
                    dataType: 'html',
                    success: function (result) {
                        $optionkategori.html(result)

                    }
                })
            }, 700);
        }
    })



    $kategorippob.change(function () {
        var kategorinya = $optionkategori.val();
        $layananppob.fadeIn()

        $.ajax({
            url: url.concat('home/pesanppob'),
            type: 'post',
            data: {
                aksi: 'layanan',
                kategori: kategorinya,
                tipe: 'Voucher'
            },
            dataType: 'html',
            success: function (result) {
                console.log(kategorinya)
                $('.optionlayananppob').html(result)


            }
        })
    })

    $layananppob.change(function () {
        $deskripsippob.fadeIn()
        var idlayanan = $('.optionlayananppob').val();
        $.ajax({
            url: url.concat('home/deskripsippob'),
            type: 'post',
            data: {
                id: idlayanan
            },
            dataType: 'json',
            success: function (result) {
                // console.log(idlayanan)
                result.forEach(data => {

                    $deskripsippob.html(`
                    Layanan : `+ data.layanan + ` <br>
                    Keterangan : `+ data.deskripsi + `<br>
                    Harga : `+ data.harga + ``)
                });
            }
        })
    })

})

$('.pesan-game').on('click', function () {
    $tujuanppob.keyup(function () {
        var tujuan = $(this).val();
        var tdigit = tujuan.length
        if (tdigit > 2) {
            $kategorippob.fadeIn()

            setTimeout(() => {
                $.ajax({
                    url: url.concat('home/pesanppob'),
                    type: 'post',
                    data: {
                        aksi: 'kategori',
                        kategori: 'Games'
                    },
                    dataType: 'html',
                    success: function (result) {
                        $optionkategori.html(result)

                    }
                })
            }, 700);
        }
    })



    $kategorippob.change(function () {
        var kategorinya = $optionkategori.val();
        $layananppob.fadeIn()

        $.ajax({
            url: url.concat('home/pesanppob'),
            type: 'post',
            data: {
                aksi: 'layanan',
                kategori: kategorinya,
                tipe: 'Games'
            },
            dataType: 'html',
            success: function (result) {
                console.log(kategorinya)
                $('.optionlayananppob').html(result)


            }
        })
    })

    $layananppob.change(function () {
        $deskripsippob.fadeIn()
        var idlayanan = $('.optionlayananppob').val();
        $.ajax({
            url: url.concat('home/deskripsippob'),
            type: 'post',
            data: {
                id: idlayanan
            },
            dataType: 'json',
            success: function (result) {
                // console.log(idlayanan)
                result.forEach(data => {

                    $deskripsippob.html(`
                    Layanan : `+ data.layanan + ` <br>
                    Keterangan : `+ data.deskripsi + `<br>
                    Harga : `+ data.harga + ``)
                });
            }
        })
    })

})

// close
$('.tutupmodalPpob').on('click', function () {

    $tujuanppob.val('');
    $optionkategori.html('<option value="0">Pilih kategori</option>')
    $kategorippob.fadeOut();
    $optionlayanan.html('<option value="0">Pilih kategori</option>')
    $layananppob.fadeOut();
    $deskripsippob.html('');
    $deskripsippob.fadeOut()
})





