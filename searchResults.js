// retrieve search term from local storage
var searchString = localStorage.getItem("search");
// get the section element
var section = document.getElementById("section");

// call onClientLoad after window has loaded
window.onload = onClientLoad;

// Load the API
function onClientLoad() {
  gapi.client.load("youtube", "v3", setAttributes);
}

// set API key and run the execute function
function setAttributes() {
  gapi.client.setApiKey("AIzaSyCgb9r5hCelbgXB-nTQd69mlqqXNbhaWJ4");
  execute();
}

// get the results from youtube or error if something went wrong
function execute() {
  gapi.client.youtube.search
    .list({
      part: ["snippet"],
      maxResults: 25,
      // set up the search term
      q: searchString,
    })
    .then(
      function (response) {
        // pass the response to onSearchResponse function
        onSearchResponse(response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

function onSearchResponse(response) {
  // Clear the section if it has any previous elements
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  // Store results in an array
  let results = response.result.items;

  // loop through the array for each returned video
  for (var i = 0; i < results.length; i++) {
    displayVideo(results[i], i);
  }
}

function displayVideo(result, i) {
  // Create a div with a unique ID for each video, and append it to the <section>
  // The YouTube Iframe Player API will replace each one with
  // an <iframe> containing the corresponding video
  var vid = document.createElement("div");
  vidId = "vid" + i;
  vid.id = vidId;
  section.appendChild(vid);
  var player = new YT.Player(vidId, {
    height: "360",
    width: "480",
    videoId: result.id.videoId,
    events: {
      onReady: onPlayerReady,
    },
  });

  // If the duration of video is 0, the video can't be played, so we just delete it
  function onPlayerReady(e) {
    var duration = e.target.getDuration();
    if (duration == 0) {
      section.removeChild(e.target.a);
    }
  }
}

// Special thanks to code at mdn docs that helped me get through the YouTube's complicated API

// https://github.com/mdn/learning-area/tree/master/javascript/apis/third-party-apis/youtube