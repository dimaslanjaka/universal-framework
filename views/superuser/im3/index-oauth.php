<form action="/im3/oauth/" method="post" data-success="oauthGen">
  <div class="md-form">
    <input type="text" placeholder="tokenid" name="tokenid" class="form-control">
  </div>
  <div class="md-form">
    <textarea name="postdata" cols="30" rows="10" class="form-control" placeholder="postdata {'eventname':'xxx'} or anything"></textarea>
  </div>
  <div class="md-form">
    <button type="submit" class="btn btn-info">Generate OAUTH</button>
  </div>
</form>

<div class="md-form input-group">
  <input id="oauth-res" cols="30" rows="10" class="form-control" aria-label="Result oauth" aria-describedby="material-addon2" placeholder="Result oauth" name="oauth"></input>
  <div class="input-group-append">
    <span class="input-group-text md-addon" id="material-addon1">
      <button class="btn btn-copy" data-toggle="tooltip" title="copy to clipboard" data-source="oauth-res">
        <i class="fad fa-clipboard"></i>
      </button>
    </span>
  </div>
</div>