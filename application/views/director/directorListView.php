<?php 
$this->load->view('header');
$this->load->view('navbar');
$this->load->view('sidebar');
?>

<script  type="text/javascript">
function confirmDelete() {
      var confirmed = confirm("Are you sure? This will remove this entry forever.");
      return confirmed;
}
</script>

<div id="main-content"> 
	<div class="page-content">
   
		<!-- title -->
   		<div class="row">
        	<div class="col-md-12">
          		<h2><?php echo $title;?></h2>
        	</div>
      	</div>
      
      	<div class="row">
        <div class="col-md-12">
          <div class="block-web">
            
            <div class="header">
              <div class="actions"> </div>
              <h3 class="content-header">
             	<?php echo $subtitle;?>
              </h3>
            </div>
            
            <div class="porlets-content">
              <?php 
              if ($this->session->userdata('error') != null) {
              	echo '<div class="alert alert-danger">'.$this->session->userdata('error').'</div>';
              	$this->session->unset_userdata('error');
              }
              if ($this->session->userdata('success') != null) {
              	echo '<div class="alert alert-success">'.$this->session->userdata('success').'</div>';
              	$this->session->unset_userdata('success');
              }
              ?>
              <form method="get" action="<?php echo base_url();?>director">
              		Search: <input type="text" name="search" />
              		<input type="submit" class="btn btn-primary" value="Search" name="submit"/>
              	</form>
              	<br/>
             	<table class="table table-bordered">
					<thead>
					<tr>
						<th>No.</th>
						<th>Name</th>
						<th>Email</th>
						<th>Director Code</th>
						<th>Last Login</th>
						<th>Created Date</th>
						<th>Action</th>
					</tr>
					</thead>
					<tbody>
					
					<?php
					if (isset($directors) && count($directors) > 0) {
						$page = isset($_GET['p']) && $_GET['p'] != '' ? $_GET['p'] : 1;
						$start = ($page - 1) * $per_page;
							
						for ($i = 0; $i < count($directors); $i++) {
							echo '<tr>';
							echo '<td>'.($start+$i+1).'</td>';
							echo '<td>'.$directors[$i]->{'dr_name'}.'</td>';
							echo '<td>'.$directors[$i]->{'dr_email'}.'</td>';
							echo '<td>'.$directors[$i]->{'dr_code'}.'</td>';
							echo '<td>';
								if ($directors[$i]->{'dr_login_date'} != null)
									echo date('Y-m-d H:i:s', strtotime($directors[$i]->{'dr_login_date'}));
								else
									echo '-';
							echo '</td>';
							echo '<td>'.date('Y-m-d', strtotime($directors[$i]->{'dr_created_date'})).'</td>';
							echo '<td><a href="'.base_url().'director/editDirector/?id='.$directors[$i]->{'dr_id'}.'">Edit</a> | 
								<a href="'.base_url().'director/deleteDirector/?id='.$directors[$i]->{'dr_id'}.'" onClick="return confirmDelete();">Delete</a></td>';
						}
					}
					?>
					</tbody>
				</table>
				<?php echo $this->pagination->create_links(); ?>
		
            </div><!--/porlets-content-->
          </div><!--/block-web--> 
        </div><!--/col-md-12--> 
      </div>
      
		
   
	</div>  <!--/page-content end--> 
</div><!--/main-content end-->
</div><!--/page-container end-->

<?php
$this->load->view('footer.php');