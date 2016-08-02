<div class="btn-group pull-right exportablediv">

	<button class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bars"></i> Export Table</button>

	<ul class="dropdown-menu " role="menu">
		<li><a href="#" onClick ="$('#ang_table').tableExport({type:'excel',escape:'false',ignoreColumn:[<?php echo $igcol; ?>]});"> <img src='<?php echo base_url();?>images/imgs/xls.png' width='24px'> XLS</a></li>
		<li class="divider"></li>
		<li><a href="#" onClick ="$('#ang_table').tableExport({type:'pdf',escape:'false',ignoreColumn:[<?php echo $igcol; ?>],pdfpage:'<?php echo $pdfpage; ?>'});"> <img src='<?php echo base_url();?>images/imgs/pdf.png' width='24px'> PDF</a></li>
	</ul>
</div>