<div class="fixed-content-box" data-hide=true>
    <div class="head-name">
        <div class="d-flex align-items-center user_avatar">
            <div class="avatar text-center">
                <img id='profile-image' src="<?php echo base_url(); ?>/images/avatar/1.png" class="d-block mx-auto" onerror="this.onerror=null;this.src='https://source.unsplash.com/random/200x200?sig=incrementingIdentifier';" rel="noreferrer noopenner" referrerpolicy="no-referrer">
            </div>
            <div class="detail font-nunito">
                <p class="name" id="profile-name">Gprmnp_</p>
                <p class="type" id="profile-role">ADMIN</p>
            </div>
        </div>
    </div>
    <div class="fixed-content-body dz-scroll" id="DZ_W_Fixed_Contant">
        <div class="tab-content" id="menu">
            <div class="tab-pane fade 
                <?php if ((strpos($_SERVER['REQUEST_URI'], '/user/dashboard') !== false
                    || strpos($_SERVER['REQUEST_URI'], '/admin/dashboard') !== false
                    || $_SERVER['REQUEST_URI'] === "/") && (strpos($_SERVER['REQUEST_URI'], '/webgis') === false))
                    echo ("active show")
                ?>" id="management-user">
                <?php if (strpos($_SERVER['REQUEST_URI'], '/user/dashboard') !== false) : ?>
                    <ul class="font-nunito">
                        <li>
                            <a href="<?php echo base_url(); ?>/user/dashboard/package" class="nav-sidebar d-flex align-items-center">
                                <div class="menu-icon">
                                    <img src="<?php echo base_url(); ?>/images/dashboard/nav-dashboard-3.png" alt="">
                                </div>
                                <?php if ($_SERVER['REQUEST_URI'] == '/user/dashboard/package') : ?>
                                    <span style="color: #014dea;">Package</span>
                                <?php else : ?>
                                    <span>Package</span>
                                <?php endif ?>
                            </a>
                        </li>
                        <!-- <li>
                            <a href="<?php echo base_url(); ?>/user/dashboard/poi" class="nav-sidebar d-flex align-items-center">
                                <div class="menu-icon">
                                    <img src="<?php echo base_url(); ?>/images/dashboard/nav-dashboard-4.png" alt="">
                                </div>
                                <?php if ($_SERVER['REQUEST_URI'] == '/user/dashboard/poi') : ?>
                                    <span style="color: #014dea;">POI</span>
                                <?php else : ?>
                                    <span>POI</span>
                                <?php endif ?>
                            </a>
                        </li> -->
                        <li>
                            <a href="<?php echo base_url(); ?>/user/dashboard/shp" class="nav-sidebar d-flex align-items-center">
                                <div class="menu-icon">
                                    <img src="<?php echo base_url(); ?>/images/dashboard/nav-dashboard-5.png" alt="">
                                </div>
                                <?php if ($_SERVER['REQUEST_URI'] == '/user/dashboard/shp') : ?>
                                    <span style="color: #014dea;">SHP</span>
                                <?php else : ?>
                                    <span>SHP</span>
                                <?php endif ?>
                            </a>
                        </li>
                    </ul>
                <?php else : ?>
                    <ul class="font-nunito">
                        <li>
                            <a href="<?php echo base_url(); ?>/admin/dashboard/management-user" class="nav-sidebar d-flex align-items-center">
                                <div class="menu-icon">
                                    <img src="<?php echo base_url(); ?>/images/dashboard/nav-dashboard-2.png" alt="">
                                </div>
                                <?php if ($_SERVER['REQUEST_URI'] == '/admin/dashboard/management-user') : ?>
                                    <span style="color: #014dea;">User Management</span>
                                <?php else : ?>
                                    <span>User Management</span>
                                <?php endif ?>
                            </a>
                        </li>
                        <li>
                            <a href="<?php echo base_url(); ?>/admin/dashboard/package-setting" class="nav-sidebar d-flex align-items-center">
                                <div class="menu-icon">
                                    <img src="<?php echo base_url(); ?>/images/dashboard/nav-dashboard-3.png" alt="">
                                </div>
                                <?php if ($_SERVER['REQUEST_URI'] == '/admin/dashboard/package-setting') : ?>
                                    <span style="color: #014dea;">Package Setting</span>
                                <?php else : ?>
                                    <span>Package Setting</span>
                                <?php endif ?>
                            </a>
                        </li>
                        <!-- <li>
                            <a href="<?php echo base_url(); ?>/admin/dashboard/poi" class="nav-sidebar d-flex align-items-center">
                                <div class="menu-icon">
                                    <img src="<?php echo base_url(); ?>/images/dashboard/nav-dashboard-4.png" alt="">
                                </div>
                                <?php if ($_SERVER['REQUEST_URI'] == '/admin/dashboard/poi') : ?>
                                    <span style="color: #014dea;">POI</span>
                                <?php else : ?>
                                    <span>POI</span>
                                <?php endif ?>
                            </a>
                        </li> -->
                        <li>
                            <a href="<?php echo base_url(); ?>/admin/dashboard/shp" class="nav-sidebar d-flex align-items-center">
                                <div class="menu-icon">
                                    <img src="<?php echo base_url(); ?>/images/dashboard/nav-dashboard-5.png" alt="">
                                </div>
                                <?php if ($_SERVER['REQUEST_URI'] == '/admin/dashboard/shp') : ?>
                                    <span style="color: #014dea;">SHP</span>
                                <?php else : ?>
                                    <span>SHP</span>
                                <?php endif ?>
                            </a>
                        </li>
                    </ul>
                <?php endif ?>
            </div>
            <div class="tab-pane <?php if (strpos($_SERVER['REQUEST_URI'], '/webgis') !== false) echo ("show active") ?>" id="webgis">
                <ul class="metismenu tab-nav-menu">
                    <li class="nav-label">LAYERS</li>
                    <!-- List Items -->
                    <li>
                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24" />
                                    <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
                                    <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
                                </g>
                            </svg>
                            POI
                        </a>
                        <ul aria-expanded="false">
                            <?php for ($i = 0; $i < 10; $i++) { ?>
                                <?= view("webgis/components/list_item", [
                                    "id" => "poi-" . $i,
                                    "name" => $i,
                                    "checked" => rand(0, 1) == 1,
                                    "brightness" => rand(0, 100),
                                ]) ?>
                            <?php } ?>
                        </ul>
                    </li>
                    <li>
                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24" />
                                    <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
                                    <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
                                </g>
                            </svg>
                            SARAH
                        </a>
                        <ul aria-expanded="false">
                            <?= view("webgis/components/list_item", [
                                "id" => "sarah-" . $i,
                                "name" => "sarah " . $i,
                                "checked" => rand(0, 1) == 1,
                                "brightness" => rand(0, 100),
                            ]) ?>
                        </ul>
                    </li>
                    <!-- End List Items -->
                </ul>
            </div>
            <div class="tab-pane <?php if (strpos($_SERVER['REQUEST_URI'], '/survey') !== false) echo ("show active") ?>" id="survey">
                <ul class="metismenu tab-nav-menu">
                    <li class="nav-label">LAYERS</li>
                    <!-- List Items -->
                    <li>
                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24" />
                                    <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
                                    <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
                                </g>
                            </svg>
                            Survey Dummy
                        </a>
                        <ul aria-expanded="false">
                            <?php for ($i = 0; $i < 10; $i++) { ?>
                                <?= view("webgis/components/list_item", [
                                    "id" => "poi-" . $i,
                                    "name" => $i,
                                    "checked" => rand(0, 1) == 1,
                                    "brightness" => rand(0, 100),
                                ]) ?>
                            <?php } ?>
                        </ul>
                    </li>
                    <!-- End List Items -->
                </ul>
            </div>
        </div>
    </div>
    <?= view('webgis/components/panel_analysis'); ?>
</div>