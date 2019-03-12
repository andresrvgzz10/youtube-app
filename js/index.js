function handleFetch(link, callback) {
	$.ajax({
		url: link,
		method: "GET",
		success: responseJson => callback(responseJson),
		error: error => console.log(error)
	});
		
}

function appendContent(data) {
	$('#videoResults').html(''); //borrar le input
	var items = data.items;
	items.forEach(function (item) {
		//videos found
		$('#videoResults').append(`<a  href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">  <h2> ${item.snippet.title} </h2> <img src="${item.snippet.thumbnails.medium.url}" alt="videoImage" class="center"> </a> <br>`);
	});
	if(data.hasOwnProperty('prevPageToken')) {
		$('#videoResults').append('<button id="btnPreviuos"> Previos Videos </button>');
		$('#btnPreviuos').on('click', (event) => {
			let valPrev = $('#searchVideo').val()
			let apiKey = 'AIzaSyCN8N1QJCC79VpHVDqFDuZLoj9o4mp5ZFE';
			let link = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}` + '&part=snippet&type=video&maxResults=10&pageToken=' + data.prevPageToken + '&q=' + valPrev;
			handleFetch(link, appendContent);
		});

	}
	if(data.hasOwnProperty('nextPageToken')) {
		$('#videoResults').append('<button id="btnNext"> Next 10 Videos </button>');
		$('#btnNext').on('click', (event) => {
			let valNext = $('#searchVideo').val();
			let apiKey = 'AIzaSyCN8N1QJCC79VpHVDqFDuZLoj9o4mp5ZFE';
			let link = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}` + '&part=snippet&type=video&maxResults=10&pageToken=' + data.nextPageToken + '&q=' + valNext;
			handleFetch(link, appendContent);
		});
	}
}

$('.youtubeForm').on('submit', (event) => {
		event.preventDefault();
		let videosSend = $('#searchVideo').val();
		let apiKey = 'AIzaSyCN8N1QJCC79VpHVDqFDuZLoj9o4mp5ZFE';
		let link = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}` + '&part=snippet&type=video&maxResults=10&q=' + videosSend;
		handleFetch(link, appendContent);
}); 
