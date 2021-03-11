<main>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-xl-8 mx-auto">
          <!--Ticket Input Box-->
          <h2 class="text-center mt-4"><?= $data['title'] ?></h2>
          <p class="text-center font-italic">Written by: <a href="https://codepen.io/dimaslanjaka/pen/wvoRyQm" target="_blank" rel="noopener noreferrer">L3n4r0x</a></p>
          <div id="ticketBox">
            <div id="ticketBoxCenter">
              <form action="" method="post" id="submit-ticket">
                <label class="mt-3">Issue Title</label>
                <input id="mainIssue" class="form-control" name="subject" required>
                <label class="mt-3">Details</label>
                <textarea id="details" class="form-control" rows="2" name="msg" required></textarea>
                <div class="text-center">
                  <p id="errMsg" class="text-center mt-2"></p>
                  <button id="submitTicket" class="btn btn-secondary text-center mt-2">Submit</button>
                </div>
              </form>
            </div>
          </div>

          <!--Ticket Status-->
          <div id="ticketBoxTwo" class="mt-4">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Sub</th>
                  <th scope="col">Msg</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <?php
                $c = 0;
                foreach ($data['my_tickets'] as $ticket) {
                  $c++;
                  //var_dump($ticket);
                ?>
                  <tr data-location="/public/halaman/ticketview/<?= $ticket['id'] ?>">
                    <th scope="row"><?= $c ?></th>
                    <td><?= $ticket['subjek'] ?></td>
                    <td><?= (strlen($ticket['pesan']) > 20) ? substr($ticket['pesan'], 0, 20) . '...' : $ticket['pesan'] ?></td>
                    <td><?php
                        switch (strtolower($ticket['status'])) {
                          case 'pending':
                            echo '<span class="badge badge-secondary">Pending</span>';
                            break;
                          case 'waiting':
                            echo '<span class="badge badge-warning">Waiting</span>';
                            break;
                          case 'closed':
                            echo '<span class="badge badge-danger">Closed</span>';
                            break;
                          case 'responded':
                            echo '<span class="badge badge-success">Responded</span>';
                            break;
                        }
                        ?></td>
                  </tr>
                <?php
                }
                ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</main>

<style>
  <?php include __DIR__ . '/tickets.css'; ?>
</style>
<script>
  <?php include __DIR__ . '/tickets.js'; ?>
</script>