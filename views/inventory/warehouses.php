<div class="card flat-border">
    <div class="card-title h4 font-weight-bold text-center pt-2">Add Warehouse</div>
    <div class="card-body">
        <div id="err-message" class="text-center mb-2"></div>
        <form autocomplete="false">
            <div class="form-row">
                <div class="col-sm-12"><label for="name">Name</label> <input id="name" type="text" class="form-control form-control-sm flat-border"> <span class="form-text text-danger"></span></div>
            </div>
            <div class="form-row mt-2">
                <div class="col-sm-12"><label for="street">Street</label> <textarea id="street" class="form-control form-control-sm flat-border"></textarea> <span class="form-text"></span></div>
            </div>
            <div class="form-row mt-2">
                <div class="col-md-6"><label for="city">City</label> <input id="city" type="text" class="form-control form-control-sm flat-border"> <span class="form-text"></span></div>
                <div class="col-md-6"><label for="state">State</label> <input id="state" type="text" class="form-control form-control-sm flat-border"> <span class="form-text"></span></div>
            </div>
            <div class="form-row mt-2">
                <div class="col-md-6"><label for="country">Country</label> <input id="country" type="text" class="form-control form-control-sm flat-border"> <span class="form-text"></span></div>
                <div class="col-md-6"><label for="phone">Phone</label> <input id="phone" type="tel" class="form-control form-control-sm flat-border"> <span class="form-text"></span></div>
            </div>
            <div class="form-row mt-2">
                <div class="col-sm-12"><label for="status">Status</label> <select id="status" class="form-control form-control-sm flat-border">
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
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