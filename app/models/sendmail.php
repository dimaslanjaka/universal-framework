<?php

class Sendmail
{

 public function kirimemail($subject,$email, $msg)
    {

        $mail = new PHPMailer;
        $mail->IsSMTP();
        $mail->SMTPSecure = 'ssl';
        $mail->Host = "mail.m-pedia.my.id"; //host masing2 provider email
        $mail->SMTPDebug = 3;
        $mail->Port = 465;
        $mail->SMTPAuth = true;
        $mail->Username = "support@m-pedia.my.id"; //user email
        $mail->Password = "8Wcqqewsv%Jc"; //password email 
        $mail->SetFrom("support@m-pedia.my.id", "Support@m-pedia.my.id"); //set email pengirim
        $mail->Subject = $subject; //subyek email
        $mail->AddAddress("$email", "");  //tujuan email
        $mail->MsgHTML($msg);
        return $mail->Send();
    }
    public function forgotpassword($namalengkap, $kode, $email)
    {
        $linkreset = BASEURL . 'auth/ubahpassreset/' . $kode;
        $mail = new PHPMailer;
        $mail->IsSMTP();
        $mail->SMTPSecure = 'ssl';
        $mail->Host = "mail.m-pedia.my.id"; //host masing2 provider email
        $mail->SMTPDebug = 3;
        $mail->Port = 465;
        $mail->SMTPAuth = true;
        $mail->Username = "support@m-pedia.my.id"; //user email
        $mail->Password = "8Wcqqewsv%Jc"; //password email 
        $mail->SetFrom("support@m-pedia.my.id", "Support@m-pedia.my.id"); //set email pengirim
        $mail->Subject = "Reset pasword"; //subyek email
        $mail->AddAddress("$email", "");  //tujuan email
        $mail->MsgHTML('<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <title>
        
            </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
        
                .ReadMsgBody {
                    width: 100%;
                }
        
                .ExternalClass {
                    width: 100%;
                }
        
                .ExternalClass * {
                    line-height: 100%;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
        
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
                <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            <!--[if lte mso 11]>
                <style type="text/css">
                  .outlook-group-fix { width:100% !important; }
                </style>
                <![endif]-->
        
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
            </style>
            <!--<![endif]-->
        
        
        
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                    }
                }
            </style>
        
        
            <style type="text/css">
        
        
            </style>
            <style type="text/css">
                .hide_on_mobile {
                    display: none !important;
                }
        
                @media only screen and (min-width: 480px) {
                    .hide_on_mobile {
                        display: block !important;
                    }
                }
        
                .hide_section_on_mobile {
                    display: none !important;
                }
        
                @media only screen and (min-width: 480px) {
                    .hide_section_on_mobile {
                        display: table !important;
                    }
                }
        
                .hide_on_desktop {
                    display: block !important;
                }
        
                @media only screen and (min-width: 480px) {
                    .hide_on_desktop {
                        display: none !important;
                    }
                }
        
                .hide_section_on_desktop {
                    display: table !important;
                }
        
                @media only screen and (min-width: 480px) {
                    .hide_section_on_desktop {
                        display: none !important;
                    }
                }
        
                [owa] .mj-column-per-100 {
                    width: 100% !important;
                }
        
                [owa] .mj-column-per-50 {
                    width: 50% !important;
                }
        
                [owa] .mj-column-per-33 {
                    width: 33.333333333333336% !important;
                }
        
                p {
                    margin: 0px;
                }
        
                @media only print and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                    }
        
                    .mj-column-per-40 {
                        width: 40% !important;
                    }
        
                    .mj-column-per-60 {
                        width: 60% !important;
                    }
        
                    .mj-column-per-50 {
                        width: 50% !important;
                    }
        
                    mj-column-per-33 {
                        width: 33.333333333333336% !important;
                    }
                }
            </style>
        
        </head>
        
        <body style="background-color:#FFFFFF;">
        
        
            <div style="background-color:#FFFFFF;">
        
        
                <!--[if mso | IE]>
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td
                                    style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       class="" style="vertical-align:top;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix"
                                        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
        
                                            <tr>
                                                <td align="left"
                                                    style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
        
                                                    <div
                                                        style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                                        <p><span style="font-size: 36px;"><strong><span
                                                                        style="coletor: #3598db;"> 
                                                                         m-pedia.my.id</span></strong></span></p>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td
                                    style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       class="" style="vertical-align:top;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix"
                                        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
        
                                            <tr>
                                                <td align="left"
                                                    style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
        
                                                    <div
                                                        style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                                        <p><span style="font-size: 14px;">Yth. Bapak/Ibu ' . $namalengkap . ',</span><br><br><span style="font-size: 13px;">Baru-baru
                                                                ini kami menerima permintaan atur ulang kata sandi akun ' . WEB_NAME . '
                                                                Payment Anda. Untuk mengonfirmasi permintaan ini dan mengatur
                                                                ulang kata sandi, klik tautan yang tersedia berikut :</span></p>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td
                                    style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       class="" style="vertical-align:top;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix"
                                        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="border-radius:2px;vertical-align:top;" width="100%">
        
                                            <tr>
                                                <td align="center" vertical-align="middle"
                                                    style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;">
        
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        style="border-collapse:separate;width:100%;line-height:100%;">
                                                        <tr>
                                                            <td align="center" bgcolor="#0043FF" role="presentation"
                                                                style="border:0px solid #000;border-radius:24px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#0043FF;"
                                                                valign="middle">
                                                                <a href="' . $linkreset . '"
                                                                    style="display:inline-block;background:#0043FF;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:9px 26px 9px 26px;mso-padding-alt:0px;border-radius:24px;"
                                                                    target="_blank">
                                                                    Reset Password
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td
                                    style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       class="" style="vertical-align:top;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix"
                                        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
        
                                            <tr>
                                                <td align="left"
                                                    style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
        
                                                    <div
                                                        style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                                        <p>Tautan ini dapat digunakan Hanya 1 hari dari sekarang
                                                            WIB<br><br>Penting! Jika Anda tidak mengenali permintaan ini harap
                                                            abaikan email ini dan jangan memberikan tautan tersebut kepada pihak
                                                            lain termasuk yang mengaku staff atau karyawan ' . WEB_NAME . '
                                                            Payment<br><br><br>Salam Hangat,<br> ' . WEB_NAME . ' Payment<br><br> <br>Email
                                                            : admin@m-pedia.net<br>Telp : +6282298859671<br>Website :.' . BASEURL . '</p>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
        
        
            </div>
        
        </body>
        
        </html>');
        return $mail->send();
    }
    public function verif_akun($namalengkap, $kode, $email, $username)
    {
        $linkverif = BASEURL . 'auth/verifakun/' . $username . '/' . $kode;
        $mail = new PHPMailer;
        $mail->IsSMTP();
        $mail->SMTPSecure = 'ssl';
        $mail->Host = "mail.m-pedia.my.id"; //host masing2 provider email
        $mail->SMTPDebug = 3;
        $mail->Port = 465;
        $mail->SMTPAuth = true;
        $mail->Username = "support@m-pedia.my.id"; //user email
        $mail->Password = "8Wcqqewsv%Jc"; //password email 
        $mail->SetFrom("support@m-pedia.my.id", "Support@m-Pedia.my.id"); //set email pengirim
        $mail->Subject = "Verifikasi Akun"; //subyek email
        $mail->AddAddress("$email", "");  //tujuan email
        $mail->MsgHTML('<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <title>
        
            </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
        
                .ReadMsgBody {
                    width: 100%;
                }
        
                .ExternalClass {
                    width: 100%;
                }
        
                .ExternalClass * {
                    line-height: 100%;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
        
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
                <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            <!--[if lte mso 11]>
                <style type="text/css">
                  .outlook-group-fix { width:100% !important; }
                </style>
                <![endif]-->
        
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
            </style>
            <!--<![endif]-->
        
        
        
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                    }
                }
            </style>
        
        
            <style type="text/css">
        
        
            </style>
            <style type="text/css">
                .hide_on_mobile {
                    display: none !important;
                }
        
                @media only screen and (min-width: 480px) {
                    .hide_on_mobile {
                        display: block !important;
                    }
                }
        
                .hide_section_on_mobile {
                    display: none !important;
                }
        
                @media only screen and (min-width: 480px) {
                    .hide_section_on_mobile {
                        display: table !important;
                    }
                }
        
                .hide_on_desktop {
                    display: block !important;
                }
        
                @media only screen and (min-width: 480px) {
                    .hide_on_desktop {
                        display: none !important;
                    }
                }
        
                .hide_section_on_desktop {
                    display: table !important;
                }
        
                @media only screen and (min-width: 480px) {
                    .hide_section_on_desktop {
                        display: none !important;
                    }
                }
        
                [owa] .mj-column-per-100 {
                    width: 100% !important;
                }
        
                [owa] .mj-column-per-50 {
                    width: 50% !important;
                }
        
                [owa] .mj-column-per-33 {
                    width: 33.333333333333336% !important;
                }
        
                p {
                    margin: 0px;
                }
        
                @media only print and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                    }
        
                    .mj-column-per-40 {
                        width: 40% !important;
                    }
        
                    .mj-column-per-60 {
                        width: 60% !important;
                    }
        
                    .mj-column-per-50 {
                        width: 50% !important;
                    }
        
                    mj-column-per-33 {
                        width: 33.333333333333336% !important;
                    }
                }
            </style>
        
        </head>
        
        <body style="background-color:#FFFFFF;">
        
        
            <div style="background-color:#FFFFFF;">
        
        
                <!--[if mso | IE]>
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td
                                    style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       class="" style="vertical-align:top;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix"
                                        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
        
                                            <tr>
                                                <td align="left"
                                                    style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
        
                                                    <div
                                                        style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                                        <p><span style="font-size: 36px;"><strong><span
                                                                        style="color: #3598db;"> 
                                                                         ' . WEB_NAME . '</span></strong></span></p>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td
                                    style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       class="" style="vertical-align:top;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix"
                                        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
        
                                            <tr>
                                                <td align="left"
                                                    style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
        
                                                    <div
                                                        style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                                        <p><span style="font-size: 14px;">Yth. Bapak/Ibu ' . $namalengkap . ',</span><br><br><span style="font-size: 13px;">Baru-baru
                                                                Hallo ,Selamat datang di  ' . WEB_NAME . ' , Untuk memverifikasi akunmu, silahkan klik tautan yang tersedia berikut :</span></p>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td
                                    style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       class="" style="vertical-align:top;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix"
                                        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="border-radius:2px;vertical-align:top;" width="100%">
        
                                            <tr>
                                                <td align="center" vertical-align="middle"
                                                    style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;">
        
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        style="border-collapse:separate;width:100%;line-height:100%;">
                                                        <tr>
                                                            <td align="center" bgcolor="#0043FF" role="presentation"
                                                                style="border:0px solid #000;border-radius:24px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#0043FF;"
                                                                valign="middle">
                                                                <a href="' . $linkverif . '"
                                                                    style="display:inline-block;background:#0043FF;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:9px 26px 9px 26px;mso-padding-alt:0px;border-radius:24px;"
                                                                    target="_blank">
                                                                   Verifikasi Akun
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td
                                    style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       class="" style="vertical-align:top;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix"
                                        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                            style="vertical-align:top;" width="100%">
        
                                            <tr>
                                                <td align="left"
                                                    style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
        
                                                    <div
                                                        style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                                        <p>Pesan ini adalah robot  ' . WEB_NAME . ' Jangan membalas pesan ini, jika ada keluhan atau pertanyaan lain , bisa hubungi kami dengan mengirim pesan ke kontak dibawah.
                                                          
                                                            Payment<br><br><br>Salam Hangat,<br> ' . WEB_NAME . 'Payment<br><br> <br>Email
                                                            : admin@m-pedia.my.id<br>Telp : +6282298859671<br>Website :.' . BASEURL . '</p>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
        
        
            </div>
        
        </body>
        
        </html>');
        return $mail->send();
    }
}
