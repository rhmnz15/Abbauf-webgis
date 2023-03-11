<?= $this->extend('template/default_template') ?>
<?= $this->section('content') ?>

<script src="/assets/js/jquery-3.6.1.min.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/user.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/management-user.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/list-user.js"></script>

<div class="content-container">
  <div class="row">
    <!-- User Classification -->
    <div class="col-xl-6">
      <!-- Side Card All User Registration -->
      <div class="small-card-admin">
        <div
          class="row d-flex align-items-center justify-content-center pt-3 pb-3"
        >
          <img
            src="<?php echo base_url() ?>/icons/dashboard/user-register.svg"
            alt="wallet"
            class="d-block mr-1"
          />
          <h6 class="m-0 font-inter">Admin Count</h6>
          <h2 class="m-0 font-inter ml-3" id="admin-count">-</h2>
        </div>
      </div>
      <!-- End Of Side Card All User Registration -->
    </div>

    <div class="col-xl-6">
      <!-- Side Card All User Premium -->
      <div class="small-card-admin">
        <div
          class="row d-flex align-items-center justify-content-center pt-3 pb-3"
        >
          <img
            src="<?php echo base_url() ?>/icons/dashboard/user-premium.svg"
            alt="wallet"
            class="d-block mr-1"
          />
          <h6 class="m-0 font-inter">User Count</h6>
          <h2 class="m-0 font-inter ml-3" id="user-count">-</h2>
        </div>
      </div>
      <!-- End Of Side Card All User Premium -->
    </div>
    <!-- End Of User Classification -->
  </div>

  <div class="user-admin-management">
    <h3 class="font-kanit text-white pt-3 text-center">
      User & Admin Management
    </h3>

    <!-- Table List Admin-->
    <div class="div card">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h4 class="font-kanit" style="margin: 0">List Admin</h4>

        <div class="d-flex">
          <button class="dashboard-button plus-button" id="add-admin-btn">
            <img
              src="<?php echo base_url(); ?>/icons/dashboard/plus-icon.svg"
              alt=""
              class="plus-icon"
              id="plus-icon"
            />
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="table-container">
          <!-- Bootstrap Table -->
          <table class="table text-left" id="table-admin">
            <thead class="font-kanit">
              <tr class="header-table">
                <th scope="col" class="text-center" style="min-width: 60px">
                  #
                </th>
                <th scope="col" class="text-center" style="min-width: 200px">
                  Name
                </th>
                <th scope="col" class="text-center" style="min-width: 180px">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <img
                    src="<?php echo base_url() ?>/icons/dashboard/user.svg"
                    alt="user"
                    style="display: block; width: fit-content"
                  />
                </th>
                <td class="font-kanit text-primary">Gilang Permana</td>
                <td class="text-center">gilangpermana@gmail.com</td>
              </tr>
            </tbody>
          </table>
          <!-- End Of Bootstrap Table -->
        </div>
      </div>
    </div>
    <!-- End Of List Admin-->

    <!-- Table List User-->
    <div class="div card">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h4 class="font-kanit" style="margin: 0">List User</h4>
      </div>
      <div class="card-body">
        <div class="table-container">
          <!-- Bootstrap Table -->
          <table class="table text-left" id="table-user">
            <thead class="font-kanit">
              <tr class="header-table">
                <th scope="col" class="text-center" style="min-width: 60px">
                  #
                </th>
                <th scope="col" class="text-center" style="min-width: 200px">
                  Name
                </th>
                <th scope="col" class="text-center" style="min-width: 180px">
                  Email
                </th>
                <th scope="col" class="text-center" style="min-width: 180px">
                  Registration Date
                </th>
                <th scope="col" class="text-center" style="min-width: 180px">
                  Company
                </th>
                <th scope="col" class="text-center" style="min-width: 180px">
                  Status
                </th>
                <th scope="col" class="text-center" style="min-width: 180px">
                  Action
                </th>
              </tr>
            </thead>
            <tbody id="list-user">
              <!-- Data at list-user.js -->
            </tbody>
          </table>
          <!-- End Of Bootstrap Table -->
        </div>
      </div>
    </div>
    <!-- End Of List User-->
  </div>
</div>

<!-- ======== modal add admin ======== -->
<div
  class="modal fade"
  id="myModal-add-admin"
  tabindex="-1"
  aria-labelledby="myModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title font-kanit" id="myModalLabel">Add Admin</h5>
        <button
          type="button"
          class="close close-add-admin"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form action="" method="post" id="addAdmin">
        <div class="modal-body font-nunito">
          <div class="row">
            <div class="col-md-4">
              <div class="modal-input-field">
                <label for="exampleFormControlFile1">Profile Picture</label>
                <div class="d-flex justify-content-center">
                  <div class="dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      class="profile-pict"
                      id="profile-pict-admin"
                    />
                    <img
                      src="<?php echo base_url() ?>/icons/dashboard/camera.png"
                      alt=""
                      class="preview"
                      id="preview-admin"
                    />
                    <!-- Script on management-user.js -->
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="modal-input-field">
                <label for="name">Name</label>
                <input
                  id="admin-name"
                  type="text"
                  class="form-control"
                  placeholder="Name"
                />
              </div>
              <div class="modal-input-field">
                <label for="email">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  class="form-control"
                  placeholder="example@mail.com"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="dashboard-button-blue dashboard-button-sm color-white"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ======== modal edit user ======== -->
<div
  class="modal fade"
  id="myModal-edit-user"
  tabindex="-1"
  aria-labelledby="myModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title font-kanit" id="myModalLabel">Edit User</h5>
        <button
          type="button"
          class="close close-edit-user"
          data-dismiss="modal"
          aria-label="Close"
          onclick="closeX()"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form action="" method="post" id="edit_user">
        <div class="modal-body font-nunito">
          <div class="row">
            <div class="col-md-4">
              <div class="modal-input-field">
                <label for="exampleFormControlFile1">Profile Picture</label>
                <div class="d-flex justify-content-center">
                  <div class="dropzone">
                    <img
                      src="<?php echo base_url() ?>/icons/dashboard/camera.png"
                      alt=""
                      class="preview"
                      id="profile-user-picture"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="modal-input-field">
                <label for="name">Name</label>
                <input
                  id="name-user"
                  type="text"
                  class="form-control"
                  placeholder="Name"
                />
              </div>
              <div class="modal-input-field">
                <label for="email">Email</label>
                <input
                  id="email-user"
                  type="email"
                  class="form-control"
                  placeholder="example@mail.com"
                />
              </div>
              <div class="modal-input-field">
                <label for="company">Company</label>
                <input
                  id="company-user"
                  type="text"
                  class="form-control"
                  placeholder="PT Abbauf Mulia Konsultan Teknologi"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="dashboard-button-blue dashboard-button-sm color-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<?= $this->endSection() ?>
