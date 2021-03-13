<div class="row">
  <div id="dropZone" class="col-md-7 border">
    dropzone
    <div id="outer-dropzone" class="dropzone">
      #outer-dropzone
    </div>
    <div id="inner-dropzone" class="dropzone">#inner-dropzone</div>
  </div>
  <div id="dropSelect" class="col-md-5 border">
    chooser
    <div id="no-drop" class="drag-drop"> #no-drop </div>

    <div id="yes-drop" class="drag-drop">
      <small class="indicator">Indicator</small>
      <pre style="max-width: 100%;word-wrap:break-word">
      The above won't work with the updated API. I forked a pen of Taye (the author of interact.js) and made it working.

See a possible solution here:https://codepen.io/eljefedelrodeodeljefe/pen/vybegM

if I see this right, one needs to set the target on dragenter, in any case the solution with the new API is, imo, much more verbose from an integrator POV.

event.draggable.draggable({
  snap: {
     targets: [dropCenter]
  }
});
      </pre>
    </div>
  </div>
</div>

<?php
define('dragdrop', 1);
