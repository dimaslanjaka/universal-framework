<!-- Footer -->
<footer class="page-footer font-small dynamic-bg pt-4">
    <!--sn-bg-1 -->

    <!-- Footer Text -->
    <div class="container-fluid text-center text-md-left">

        <!-- Grid row -->
        <div class="row">

            <!-- Grid column -->
            <div class="col-md-6 mt-md-0 mt-3">

                <!-- Content -->
                <h5 class="text-uppercase font-weight-bold"><?php echo $title; ?></h5>
                <p><?php echo $desc; ?></p>

            </div>
            <!-- Grid column -->

            <hr class="clearfix w-100 d-md-none pb-3">

            <!-- Grid column -->
            <div class="col-md-6 mb-md-0 mb-3">

                <!-- Content -->
                <h5 class="text-uppercase font-weight-bold">Information</h5>
                <p>
                    By accessing this website, you accept our cookie policies. Recommended using browser <b>chrome</b>
                    with <b>disabled LITE mode</b>.
                <div id="debug-container"></div>
                </p>

            </div>
            <!-- Grid column -->

        </div>
        <!-- Grid row -->

    </div>
    <!-- Footer Text -->

    <!-- Copyright -->
    <div class="footer-copyright text-center py-3">© <?php echo date('Y'); ?> Copyright:
        <a href="<?php echo \MVC\helper::get_canonical(); ?>"> Website Management Indonesia</a>
    </div>
    <!-- Copyright -->

</footer>
<!-- Footer -->