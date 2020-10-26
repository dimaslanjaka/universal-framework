<div>
  <form action="" method="post" enctype="application/json">
    <input type="hidden" name="comment[submit]">
    <div class="form-group">
      <label for="">Name</label>
      <input type="text" name="name" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="">Email</label>
      <input type="email" name="email" class="form-control" required>
    </div>
    <div class="comment-container">
      <div class="meta">
        <span class="name">Unknown</span>
        <img src="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png" alt="" class="avatar">
      </div>
      <textarea class="form-control" name="messages" id="" required></textarea>
      <span class="placeholder">write a response</span>

      <div class="btns">
        <button class="btn btn-default" type="submit">publish</button>
      </div>
    </div>
  </form>
  <div class="mt-3" id="list_comment">
    <div class="user_comment">

      <div class="user_avatar">
        <img src="https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/73.jpg">
      </div>
      <div class="comment_body">
        <p>Gastropub cardigan jean shorts, kogi Godard PBR&amp;B lo-fi locavore. Organic chillwave vinyl Neutra. Bushwick Helvetica cred freegan, crucifix Godard craft beer deep v mixtape cornhole Truffaut master cleanse pour-over Odd Future beard. Portland polaroid iPhone.</p>
      </div>

      <div class="comment_toolbar">

        <div class="comment_details">
          <ul>
            <li><i class="fa fa-clock"></i>13:94</li>
            <li><i class="fa fa-calendar"></i>04/01/2015</li>
            <li><i class="fa fa-user"></i><span class="user">Sarah Walkman</span></li>
          </ul>
        </div>
        <div class="comment_tools">
          <ul>
            <li><i class="fa fa-reply"></i></li>
            <li><i class="fa fa-heart love"></i></li>
          </ul>
        </div>
      </div>

      <div class="replies_comment">
        <ul>
          <li>
            <div class="user_avatar">
              <img src="https://source.unsplash.com/1600x900/?beach">
            </div>
            <div class="comment_body">
              <p><span class="user">Sarah Walkman:</span> I'm tired, does anybody know a good place to buy extra strength coffee?</p>
            </div>
            <div class="comment_toolbar">

              <div class="comment_details">
                <ul>
                  <li><i class="fa fa-clock"></i>19:23</li>
                  <li><i class="fa fa-calendar"></i>14/01/2015</li>
                  <li><i class="fa fa-pencil"></i><span class="user">Blake Anderson</span></li>
                </ul>
              </div>
              <div class="comment_tools">
                <ul>
                  <li><i class="fa fa-reply"></i></li>
                  <li><i class="fa fa-heart love"><span class="love_amt"> 12</span></i></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>