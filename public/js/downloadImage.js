function getStatisticsTableImage(){
	html2canvas(document.getElementById("statistics-table")).then(function(canvas) {
		downloadImage(canvas.toDataURL());
	})
}

function downloadImage (data) {
	const fileName = "statistics.png"

	document.getElementById("getImage").href = data
	document.getElementById("getImage").download = fileName
	document.getElementById("getImage").click()
}
