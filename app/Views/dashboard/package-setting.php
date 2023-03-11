<?= $this->extend('template/default_template') ?>
<?= $this->section('content') ?>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/assets/js/jquery-3.6.1.min.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/package-setting.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/features.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/features-request.js"></script>
<script src="<?php echo base_url(); ?>/js/dashboard/user.js"></script>


<div class="content-container">
   <!-- Table list package -->
   <div class="div card">
      <div class="card-header d-flex justify-content-between align-items-center">
         <h4 class="font-kanit">List Package</h4>
         <button class="dashboard-button" id="add-package-btn" onclick="add_package()">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect x="10.1113" width="1.55556" height="21" rx="0.777778" fill="white" />
               <rect x="21" y="8.55566" width="1.55556" height="21" rx="0.777778" transform="rotate(90 21 8.55566)" fill="white" />
            </svg>
         </button>
      </div>
      <div class="card-body">

         <div class="table-container">
            <!-- Bootstrap Table -->
            <table class="table text-left" id="packages-list">
               <thead class="font-kanit">
                  <tr class="header-table">
                     <th scope="col" class="text-center" style="min-width: 150px">Package Name</th>
                     <th scope="col" class="text-center" style="min-width: 150px">Price</th>
                     <th scope="col" class="text-center text-white" style="min-width: 150px">Status</th>
                     <th scope="col" class="text-center" style="min-width: 150px">Number of Users</th>
                     <th scope="col" class="text-center" style="min-width: 150px">Action</th>
                  </tr>
               </thead>
               <tbody>

               </tbody>
            </table>
            <!-- End Of Bootstrap Table -->
         </div>
      </div>
   </div>
   <!-- End Of table list package -->

   <!-- Table list Features -->
   <div class="div card">
      <div class="card-header d-flex justify-content-between align-items-center">
         <h4 class=" font-kanit">List Features</h4>
         <button class="dashboard-button" id="add-feature-btn">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect x="10.1113" width="1.55556" height="21" rx="0.777778" fill="white" />
               <rect x="21" y="8.55566" width="1.55556" height="21" rx="0.777778" transform="rotate(90 21 8.55566)" fill="white" />
            </svg>
         </button>
      </div>
      <div class="card-body">
         <div class="table-container">
            <!-- Bootstrap Table -->
            <table class="table text-left" id="features-list-table">
               <thead class="font-kanit">
                  <tr class="header-table">
                     <th scope="col" class="text-center" style="min-width: 150px">Features Name</th>
                     <th scope="col" class="text-center" style="min-width: 150px">Action</th>
                  </tr>
               </thead>
               <tbody id="features-list">

               </tbody>
            </table>
            <!-- End Of Bootstrap Table -->
         </div>
      </div>
   </div>
   <!-- End Of table list Features -->

   <!-- User's request Features -->
   <div class="div card">
      <div class="card-header d-flex justify-content-between align-items-center">
         <h4 class="font-kanit">User's Request Features</h4>
      </div>
      <div class="card-body">
         <div class="table-container">
            <!-- Bootstrap Table -->
            <table class="table text-left" id="request-feature">
               <thead class="font-kanit">
                  <tr class="header-table">
                     <th scope="col" style="min-width: 150px">User ID</th>
                     <th scope="col" style="min-width: 150px">Features Requested</th>
                     <th scope="col" class="text-center" style="min-width: 150px">Action</th>
                  </tr>
               </thead>
               <tbody id="request-table"></tbody>
            </table>
            <!-- End Of Bootstrap Table -->
         </div>
      </div>
   </div>
   <!-- End Of User's request Features -->
</div>

<!-- ======== modal add package ======== -->
<div class="modal fade" id="myModal-add-package" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title font-kanit" id="myModalLabel">Add Package</h5>
            <button type="button" class="close close-add-package" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <form action="" method="post" id="addPackages" class="modal-body font-nunito">
            <div>
               <div class="modal-input-field">
                  <label for="package-name">Package Name</label>
                  <input id="packageAddname" type="text" class="form-control" placeholder="Package name">
               </div>
               <div class="row">
                  <div class="col-6 modal-input-field">
                     <label for="package-price">Package Price</label>
                     <input id="packageAddprice" type="number" class="form-control" placeholder="200000">
                  </div>
                  <div class="col-6 modal-input-field">
                     <label for="package-status">Package Status</label>
                     <!-- <input id="package-status" type="text" class="form-control" placeholder="Active"> -->
                     <div class="list-dropdown" id="package-status">
                     <select name="form-control" id="package-status">
                        <option value="active" selected>Active</option>
                        <option value="not-active" >Not Active</option>
                     </select>
                     </div>
                  </div>
               </div>
               <div class="modal-input-field">
                  <label>Select features</label>
                  <div id="features-select">
                     
                  </div>
               </div>
            </div>
            <div id="features-select">
               </div>
            <div class="modal-footer">
               <button type="submit" id="add_package_button" class="dashboard-button-blue dashboard-button-sm color-white">Save</button>
            </div>
         </form>


      </div>
   </div>
</div>

<!-- ======== modal edit package ======== -->
<div class="modal fade" id="myModal-edit-package" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title font-kanit" id="myModalLabel">Edit Package</h5>
            <button type="button" class="close close-edit-package" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <form action="" method="post" id="editpackages" class="modal-body font-nunito">
            <div>
               <div class="modal-input-field">
                  <label for="package-name">Package Name</label>
                  <input id="package_name" type="text" class="form-control" placeholder="Package name">
               </div>
               <div class="row">
                  <div class="col-6 modal-input-field">
                     <label for="package-price">Package Price</label>
                     <input id="edit-package-price" type="number" class="form-control" placeholder="200000">
                  </div>
                   <div class="col-6 modal-input-field">
                     <label for="edit-package-status">Package Status</label>
                     <div class="list-dropdown" id="package-status">
                       
                     </div>
                  </div>
               </div>
               <div id="edit-features-select">
               </div>
               <div class="modal-footer">
                  <button type="submit" id="edit-package-button" class="dashboard-button-blue dashboard-button-sm color-white">Save</button>
               </div>
            </div>
         </form>


      </div>
   </div>
</div>

<!-- ======== modal confirmation delete package ======== -->
<div class="modal fade" id="modal-delete-confirmation" tabindex="-1" aria-labelledby="modalDeleteConfirmationLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title font-kanit" id="modalDeleteConfirmationLabel">Delete Package</h5>
            <button type="button" class="close close-delete-confirmation" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body font-nunito">
            <h5 class="text-center">Are you sure you'd like to delete this package?</h5>
         </div>
         <div class="modal-footer">
            <button type="button" id="button-cancel-delete-package" class="dashboard-button-gray dashboard-button-sm color-white">Cancel</button>
            <button type="button" id="delete-package-button" class="dashboard-button-red dashboard-button-sm color-white">Delete</button>
         </div>
      </div>
   </div>
</div>

<!-- ======== modal add features ======== -->
<div class="modal fade" id="myModalFeature" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title font-kanit" id="myModalLabel">Add Feature</h5>
            <button id="add-button-close" type="button" class="close close-add-feature" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body font-nunito">
            <!-- <div class="modal-input-field">
               <label for="package-name">Feature Name</label>
               <input id="package-name" type="text" class="form-control" placeholder="Feature Name">
            </div> -->
            <div class="modal-input-field">
               <label for="package-price">Feature Name</label>
               <textarea class="form-control" placeholder="Detail Feature" id="add-feature-name"></textarea>
            </div>
         </div>
         <div class="modal-footer">
            <button type="button" id="add-button-submit" class="dashboard-button-blue dashboard-button-sm color-white">Add</button>
         </div>
      </div>
   </div>
</div>

<!-- modal edit Feature -->
<div class="modal fade" id="myModal-edit-Feature" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title font-kanit" id="myModalLabel">Edit Feature</h5>
            <button type="button" class="close close-edit-feature" id="edit-button-close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body font-nunito">
            <!-- <div class="modal-input-field">
               <label for="package-name">Feature Name</label>
               <input id="package-name" type="text" class="form-control" placeholder="Feature Name">
            </div> -->
            <div class="modal-input-field">
               <label for="package-price">Feature Name</label>
               <textarea class="form-control" id="edit-feature-name" placeholder="Detail Feature"></textarea>
            </div>
         </div>
         <div class="modal-footer">
            <button type="button" id="edit-button-submit" class="dashboard-button-blue dashboard-button-sm color-white">Save</button>
         </div>
      </div>
   </div>
</div>

<!-- ======== modal confirmation delete feature ======== -->
<div class="modal fade" id="modal-delete-confirmation-feature" tabindex="-1" aria-labelledby="modalDeleteConfirmationLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title font-kanit" id="modalDeleteConfirmationLabel">Delete Feature</h5>
            <button type="button" class="close close-delete-confirmation-feature" data-dismiss="modal" aria-label="Close" id="close-delete-confirmation-feature">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body font-nunito">
            <h5 class="text-center">Are you sure you'd like to delete this feature?</h5>
         </div>
         <div class="modal-footer">
            <button type="button" id="button-cancel-delete-feature" class="dashboard-button-gray dashboard-button-sm color-white" id="">Cancel</button>
            <button type="button" id="delete-button-submit" class="dashboard-button-red dashboard-button-sm color-white">Delete</button>
         </div>
      </div>
   </div>
</div>

<!-- ======== modal confirmation approve features ======== -->
<div class="modal fade" id="modal-approve-confirmation-feature" tabindex="-1" aria-labelledby="modalApproveConfirmationLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title font-kanit" id="modalApproveConfirmationLabel">Approve Request</h5>
            <button type="button" class="close close-approve-confirmation-feature" data-dismiss="modal" aria-label="Close" id="close-approve-confirmation-feature">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body font-nunito">
            <h5 class="text-center">Are you sure you'd like to approve this request?</h5>
         </div>
         <div class="modal-footer">
            <button type="button" class="dashboard-button-blue dashboard-button-sm color-white">Approve</button>
         </div>
      </div>
   </div>
</div>

<!-- ======== modal confirmation decline features ======== -->
<div class="modal fade" id="modal-decline-confirmation-feature" tabindex="-1" aria-labelledby="modalApproveConfirmationLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title font-kanit" id="modalApproveConfirmationLabel">Decline Request</h5>
            <button type="button" class="close close-decline-confirmation-feature" data-dismiss="modal" aria-label="Close" id="close-decline-confirmation-feature">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body font-nunito">
            <h5 class="text-center">Are you sure you'd like to decline this request?</h5>
         </div>
         <div class="modal-footer">
            <button type="button" class="dashboard-button-red dashboard-button-sm color-white">Decline</button>
         </div>
      </div>
   </div>
</div>
<?= $this->endSection() ?>