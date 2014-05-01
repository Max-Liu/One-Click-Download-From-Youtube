var url = 'http://localhost:9090';

	function addDownloadDiv () { 
		var downloadDiv = document.createElement("div"); 

		downloadDiv.setAttribute('id',"download_youtube");
		downloadDiv.style.position = "absolute";
		downloadDiv.style.top = "60px";

		var mydiv = document.getElementById("myDiv");
		var aTag = document.createElement('button');
		// aTag.setAttribute('href',"yourlink.htm");
		aTag.innerHTML = "download";
		downloadDiv.appendChild(aTag);
		document.body.appendChild(downloadDiv)
	} 


	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {

		// Check if the XMLHttpRequest object has a "withCredentials" property.
		// "withCredentials" only exists on XMLHTTPRequest2 objects.
		xhr.open(method, url, true);

		} else if (typeof XDomainRequest != "undefined") {

		// Otherwise, check if XDomainRequest.
		// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
		xhr = new XDomainRequest();
		xhr.open(method, url);

		} else {

		// Otherwise, CORS is not supported by the browser.
		xhr = null;

		}
		return xhr;
	}

	function makeCorsRequest() {

		var xhr = createCORSRequest('GET', url+'?url='+location.search);

		if (!xhr) {
		alert('CORS not supported');
		return;
		}
		// Response handlers.
		xhr.onload = function() {
			var text = xhr.responseText;
			console.log(text)
		};

		xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		};

		xhr.send();
	}

	function main(){
		addDownloadDiv();
		console.log(document.getElementById("download_youtube"))
		document.getElementById("download_youtube").onclick=function(){
			makeCorsRequest()
		}
	}
	main();

