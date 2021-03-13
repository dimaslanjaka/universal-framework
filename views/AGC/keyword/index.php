<div class="row">
  <div class="col-md-3">
    <form action="" method="post" id="formQuery">
      <div class="input-group">
        <input class="form-control py-2" type="search" placeholder="search keyword" value="cara cepat hamil" id="squery">
        <span class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </span>
      </div>
    </form>
    <br>
    <button class="btn btn-block btn-info d-none" id="selectParse" data-type="enable">Start parsing</button>
    <button class="btn btn-block btn-warning d-none" id="selectParse" data-type="disable">Disable parsing</button>
    <div id="dropzone-group">
      <div id="outer-dropzone" class="dropzone">
        <button id="x" class="bg-danger btn-circle d-none"><i class="fas fa-times"></i></button>
        <p>
          <ul>
            <li>Right click on result to add or remove</li>
            <li><span class="border border-success p-1">Item added</span>: item added indicated with <span class="tx-success">green</span> borders</li>
            <li>
              <blockquote>If your keywords not showing results, please contact us at <a href="//web-manajemen.blogspot.com/p/contact.html" target="_blank" rel="bookmark">Here</a></blockquote>
            </li>
          </ul>
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-9">
    <small class="indicator badge-primary badge">Results</small>
    <div id="domR"></div>
  </div>
</div>

<a href="#" class="float-right-bottom d-none" data-toggle="tooltip" title="Process selected items">
  <i class="fas fa-paper-plane fa-float fa-lg text-white"></i>
</a>
<div style="clear: both;"></div>

<div class="dropdown-menu dropdown-menu-sm" id="context-menu">
  <a class="dropdown-item add" id="add-btn" href="#" data-toggle="tooltip" title="add this bordered text from selector">Add <i class="fas fa-plus"></i></a>
  <a class="dropdown-item remove" id="remove-btn" href="#" data-toggle="tooltip" title="remove this bordered text from selector">Remove <i class="fas fa-minus"></i></a>
</div>
<?php
define('toastr', 1);
define('dragdrop', 1);
