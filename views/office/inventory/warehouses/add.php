<div class="card flat-border">
    <div class="card-title h4 font-weight-bold text-center pt-2">Add Warehouse</div>
    <div class="card-body">
        <div id="err-message" class="text-center mb-2"></div>
        <form autocomplete="false" enctype="application/json" action="warehouses" method="POST">
            <input required="true" type="hidden" name="warehouses[add]">
            <div class="form-row">
                <div class="col-sm-12"><label for="name">Name</label>
                    <input required="true" id="name" type="text" class="form-control form-control-sm flat-border" name="warehouses[name]"> <span class="form-text text-danger"></span>
                </div>
            </div>
            <div class="form-row mt-2">
                <div class="col-sm-12"><label for="street">Street</label> <textarea required="true" id="street" class="form-control form-control-sm flat-border" name="warehouses[address]"></textarea> <span class="form-text"></span>
                </div>
            </div>
            <div class="form-row mt-2">
                <div class="col-md-6"><label for="city">City</label> <input required="true" id="city" type="text" class="form-control form-control-sm flat-border" name="warehouses[city]"> <span class="form-text"></span></div>
                <div class="col-md-6"><label for="state">State</label> <input required="true" id="state" type="text" class="form-control form-control-sm flat-border" name="warehouses[state]"> <span class="form-text"></span></div>
            </div>
            <div class="form-row mt-2">
                <div class="col-md-6"><label for="country">Country</label> <input required="true" id="country" type="text" class="form-control form-control-sm flat-border" name="warehouses[country]"> <span class="form-text"></span></div>
                <div class="col-md-6"><label for="phone">Phone</label> <input required="true" id="phone" type="tel" class="form-control form-control-sm flat-border" name="warehouses[phone]"> <span class="form-text"></span></div>
            </div>
            <div class="form-row mt-2">
                <div class="col-sm-12"><label for="status">Status</label> <select id="status" class="form-control form-control-sm flat-border">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select> <span class="form-text"></span></div>
            </div>
            <div class="form-row mt-2">
                <div class="col-sm-12"><button class="btn btn-block app-btn flat-border">
                        Add
                    </button> <button class="btn btn-block app-alt-btn flat-border" style="display: none;">Update</button> <button class="btn btn-block btn-danger flat-border" style="display: none;">Cancel</button></div>
            </div>
        </form>
    </div>
</div>