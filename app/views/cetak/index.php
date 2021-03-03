<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="description" content="Cetak Struk" />

    <title>Cetak Struk</title>

    <style>
        body {
            background-color: #e0e0e0;
            font-size: 12px
        }

        .receipt {
            border: 1px solid #000;
            max-width: 10cm;
            margin: auto;
            background-color: #fff
        }

        .header {
            font-weight: bold;
            text-align: center
        }

        .date {
            margin-top: 5px;
            text-align: center
        }

        .title {
            margin-top: 15px;
            font-weight: bold;
            text-align: center
        }

        .cart {
            margin-top: 10px
        }

        .info {
            text-align: center
        }

        table tr td {
            vertical-align: top
        }

        .thanks {
            margin-top: 15px;
            margin-bottom: 15px;
            text-align: center
        }

        @media print {
            .printOption {
                display: none
            }

            .receipt {
                max-width: unset
            }
        }
    </style>
</head>

<body>

    <br />
    <br />
    <div class="receipt">
        <div class="header" contenteditable="true">
            <br />
            ** <?= $data['nama']; ?> **
        </div>
        <div class="date" contenteditable="true">
            2020-12-15 15:57:15 </div>

        <div class="title" contenteditable="true">
            STRUK PEMBELIAN
        </div>
        <div class="cart">
            <table>
                <tr>
                    <td>ID TRANSAKSI</td>
                    <td>: <?= $data['id']; ?></td>
                </tr>
                <tr>
                    <td>PRODUK</td>
                    <td>: <?= $data['layanan']; ?></td>
                </tr>
                <tr>
                    <td>TUJUAN</td>
                    <td>: <?= $data['target']; ?></td>
                </tr>
                <tr>
                    <td>HARGA</td>
                    <td contenteditable="true">: Masukan Harga disini.</td>
                </tr>
                <tr>
                    <td>STATUS</td>
                    <td>: <?= $data['status']; ?></td>
                </tr>
                <tr>
                    <td>KETERANGAN</td>
                    <td>: <b><?= $data['keterangan']; ?></b></td>
                </tr>
            </table>
        </div>

        <div class="thanks" contenteditable="true">
            TERIMA KASIH <br />
            STRUK INI MERUPAKAN BUKTI
            PEMBAYARAN YANG SAH
        </div>
    </div>
    <br />
    <center class="printOption">
        <button onClick="window.print()">Cetak</button>
    </center>


    <script>
        alert('struk ini bisa di edit! silahkan edit harga atau lainnya sesuai kemauan sebelum di print')
    </script>
</body>

</html>