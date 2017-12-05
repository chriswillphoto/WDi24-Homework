const urls = ["awesome", "bag", "bucket", "bye", "cool", "cup", "everyone", "everything", "horse", "looking", "maybe", "pink", "single", "thanks"]


let content = function ( link, from ) {
  $.ajax({
  	url : `http://www.foaas.com/${link}/${from}`,
    headers: {
      Accept: 'application/json'
    }
  }).done(function( info ) {

    $(".message").text(info.message)
    $(".name").text(info.subtitle)
  })


}


let cover = function (type) {

  $.ajax({
  	url : `https://api.unsplash.com/photos/random?query=${type}&orientation=portrait`,
    headers: {
      Authorization: 'Client-ID ed6afd8273d06b359f7004cda70a9da65722ac9d09f86482c89efc58e2036a50'
    }
  }).done(function(info) {
    $(".cover").css("background-image", `url(${info.urls.regular})`)

  })
}

$("form").on("submit", function(e) {
  let type = ""
  let $radios = $(".radio")

  $radios.each( function(r) {
    if(this.checked){
      type = this.value
    }
  })


  if (type === "Birthday") {
    $(".covermessage").html("Happy <br /> Birthday")
  }else if (type === "Anniversary") {
    $(".covermessage").html("Happy <br /> Anniversary")
  }else if (type === "Celebration") {
    $(".covermessage").html("Congratulations")
  }else{
    $(".covermessage").html("Happy <br /> Wedding")
  }

  $(".covermessage").show()
  content( urls[Math.floor(Math.random()*urls.length)] , $(".from").val() )
  cover(type);
  e.preventDefault();



})

$("label").on("click", function(){
  $(".active").removeClass("active")
  $(this).addClass("active")
})
