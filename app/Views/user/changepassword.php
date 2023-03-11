<?= $this->extend('template/default_template') ?>
<?= $this->section('style') ?>
<style>
  .password {
    margin-top: 8rem;
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

<div class="d-flex justify-content-center align-items-center password ">
  <div class="card w-100 ">
    <div class="card-header d-flex justify-content-start gap-3 bg-primary">
      <a href="<?php echo base_url(); ?>/user/user-information" class="arrows"><i class="fas fa-long-arrow-alt-left text-white fa-lg"></i></a>
      <p class="mb-0 text-white mb-0 fs-5 ">Change Password</p>
    </div>
    <div class="card-body">
      <div class="row p-5">
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Password</label>
              <input type="password" placeholder="Password" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label>Password Confirmation</label>
              <input type="password" placeholder="Password Confirmation" class="form-control" />
            </div>
          </div>
          <button class="btn btn-primary mt-2" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
<?= $this->endSection() ?>