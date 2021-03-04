<link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet" />
<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />
<script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<style>
  #toast-container>.toast {
    background-image: none !important;
  }

  #toast-container>.toast:before {
    position: fixed;
    font-family: FontAwesome;
    font-size: 24px;
    line-height: 18px;
    float: left;
    color: #FFF;
    padding-right: 0.5em;
    margin: auto 0.5em auto -1.5em;
  }

  #toast-container>.toast-warning:before {
    content: "\f003";
  }

  #toast-container>.toast-error:before {
    content: "\f001";
  }

  #toast-container>.toast-info:before {
    content: "\f005";
  }

  #toast-container>.toast-success:before {
    content: "\f00c";
  }
</style>

<script src="/assets/js/function.js"></script>