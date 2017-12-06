
let _pagelimit = 1


const searchFlickr = function( term, page ) {
  const flickrURL = 'https://api.flickr.com/services/rest/?jsoncallback=?';

  if(term){
    $.getJSON(flickrURL, {
      method: 'flickr.photos.search',
      api_key: '2f5ac274ecfac5a455f38745704ad084',
      text: term,
      format: 'json',
      page: page
    }).done(showImages)
  }
}

const showImages = function(results) {
  console.log(results)
  _pagelimit = results.photos.pages
  _(results.photos.photo).each(function(photo){
    const photoURL = generateURL(photo)
    const $img = $("<img/>").attr('src', photoURL).addClass("thumb")
    $img.appendTo("#images")
  })
}

const generateURL = function (photo) {
  return [
    'http://farm',
    photo.farm,
    '.static.flickr.com/',
    photo.server,
    '/',
    photo.id,
    '_',
    photo.secret,
    '_q.jpg' // change q for different sizes
  ].join("")
}


$(document).ready( function() {

  let pagenum = 1

  $("#search").on("submit", function(e) {
    e.preventDefault();
    $("#images img").remove()
    pagenum = 1
    const query = $("#query").val();

    searchFlickr(query, pagenum)
    pagenum += 1

  })

  $(window).on("scroll", _.debounce(function() {
    const scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop()
    console.log("yes")
    if( pagenum <= _pagelimit ){
      if(scrollBottom > 900) {
        return;
      }
        const query = $("#query").val();
        searchFlickr(query, pagenum)
        pagenum += 1
    }
  }, 800)
  )

  $("#images").on("click", "img", function() {
    bigurl = $(this).attr("src").slice(0, -5) + "b.jpg"
    // id = $(this).attr("src").slice(37, 47)
    // $.ajax('https://api.flickr.com/services/rest/?jsoncallback=?', {
    //   method: "flickr.photos.getInfo",
    //   api_key: "2f5ac274ecfac5a455f38745704ad084",
    //   photo_id: id
    // }).done(function(results){console.log(results)})  // was going to add a link to view on flickr
    $("<img/>").appendTo("#viewer").attr("src", bigurl)
    $("#viewer").fadeIn(700)

  })

  $("#viewer").on("click", function() {
    $("#viewer img").remove();
    $("#viewer").fadeOut(700)
  })
})


//// $(document).height()
//// $(window).height()
//// $(window).scrollTop()
