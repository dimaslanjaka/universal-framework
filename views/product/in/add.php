<div class="row">
  <div class="col-md-12">
    <form action="" method="post">
      <div class="form-group">
        <label for="">Incoming Code Item</label>
        <input type="text" name="code" class="form-control" value="-">
        <small class="form-text text-muted">Code item, Shipping code, Invoice number, etc</small>
      </div>

      <div class="form-group">
        <label for="">Select Product</label>
        <select name="product" id="product_select" class="form-control select2-product" required></select>
        <small class="form-text text-danger">Product cannot be empty</small>
      </div>

      <div class="form-group">
        <label for="">Select Producer</label>
        <select name="producer" id="producer_select" class="form-control select2-producer" required></select>
        <small class="form-text text-danger">Producer cannot be empty</small>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="">Quality</label>
            <input type="text" value="normal" readonly name="quality" class="form-control">
            <small class="form-text text-danger">Quality of goods</small>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="">Quantity</label>
            <input type="number" name="quantity" id="" class="form-control" value="0">
            <small class="form-text text-danger" for="">Total incoming units</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="">Expiration date of goods</label>
            <input type="datetime-local" name="expires" step="1" class="form-control" id="expires" no-save>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="">Date of goods incoming</label>
            <input type="datetime-local" name="incoming-date" step="1" class="form-control" id="incoming-date" no-save>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</div>