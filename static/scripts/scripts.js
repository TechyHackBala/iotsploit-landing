/**
 * Created by M1rotvorez on 3/17/17.
 */

$('#select').select2({
		placeholder: "Choose type",
		minimumResultsForSearch: Infinity
});

$('input[name="file"]').change(function(){
		var fileName = $(this).val();
		fileName = fileName.replace('C:\\fakepath\\','');
		$('#file--name').html(fileName);
});