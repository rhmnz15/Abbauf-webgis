<?= $this->extend('template/default_template') ?>
<?= $this->section('style') ?>
<style>
  .editprofile {
    margin-top: 3.5rem;
  }

  .arrows {
    transition: all 0.8s;
  }

  .arrows:hover {
    transform: translateX(-3px);
  }
</style>
<?= $this->endSection() ?>
<?= $this->section('content') ?>

<div class="d-flex justify-content-center align-items-center editprofile">
  <div class="card  w-100">
    <div class="card-header d-flex justify-content-start gap-3 bg-primary">
      <a href="<?php echo base_url(); ?>/user/user-information" class="arrows"><i class="fas fa-long-arrow-alt-left text-white fa-lg"></i></a>
      <p class="mb-0 text-white mb-0 fs-5 ">Edit Profile</p>
    </div>
    <div class="card-body">
      <div class="row p-5">
        <div class="">
          <div class="settings-form">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>Name</label>
                  <input type="text" placeholder="Lord Rangga" class="form-control" />
                </div>
                <div class="form-group col-md-6">
                  <label>Company</label>
                  <input type="text" placeholder="PT. Abauf Mulia Konsultan Teknologi" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="lordrangga666@gmail.com" class="form-control" />
              </div>
              <div class="form-group">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="gridCheck" />
                  <label class="custom-control-label" for="gridCheck">
                    Check me out</label>
                </div>
              </div>
              <button class="btn btn-primary" type="submit">
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<?= $this->endSection() ?>