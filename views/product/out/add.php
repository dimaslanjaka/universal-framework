<div class="row">
  <div class="col-md-12">
    <div class="form-group">
      <label for="">Goods out for ?</label>
      <select name="" id="sender_changer" class="form-control" required>
        <option value="">Select Destination</option>
        <option value="distributor">Distributor</option>
        <option value="consumer">Consumer</option>
      </select>
    </div>

    <div id="destination_wrapper">
      <div id="distributor" class="hide">
        <div class="form-group">
          <label for="">Distributor Selector</label>
          <select name="distributor_id" id="select2-distributor" class="form-control select2-distributor" disabled></select>
        </div>
      </div>

      <div id="consumer" class="hide">
        <div class="form-group">
          <label for="">Consumer Selector</label>
          <select name="consumer_id" id="select2-consumer" class="form-control select2-consumer" disabled></select>
        </div>
      </div>
    </div>

    <div id="fields" class="hide">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="">Quantity of goods</label>
            <input type="number" name="quantity" id="" placeholder="0-999" class="form-control" required>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="">Expiration date of goods</label>
            <input type="datetime-local" name="expires" step="1" class="form-control" id="expires" no-save>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="">Date of goods outcoming</label>
            <input type="datetime-local" name="outcoming-date" step="1" class="form-control" id="outcoming-date" no-save>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </div>
</div>