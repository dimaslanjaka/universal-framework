<form action="/im3/packages/activate/manual" method="post">
  <div class="md-form mb-2">
    <input autocomplete="off" type="text" name="id" class="form-control" id="idpkg-admin">
    <label for="idpkg-admin">Package ID (optional)</label>
  </div>
  <div class="md-form mb-4 pink-textarea active-pink-textarea">
    <textarea required="true" id="postbody" name="postdata" class="md-textarea form-control" rows="3"></textarea>
    <label for="postbody"><b>Postdata</b></label>
  </div>
  <div class="md-form">
    <button type="submit" class="btn btn-danger btn-block">Activate Package</button>
  </div>
</form>