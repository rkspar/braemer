(function( $ ) {
  'use strict';

  //
  // Preloader
  $(window).load(function() {
    $('#preloader').delay(350).fadeOut('slow');
  });

  $(document).ready(function() {

    //
    // Smooth page loading
    $('.smooth-loading a, .smooth-loading-link').click(function(e){
      e.preventDefault();
      var t = $(this).attr('href');
      $('#preloader').delay(350).fadeIn('slow',function(){
        window.location.href = t;
      });
    });

    //
    // Fitvids
    $(".vid-responsive").fitVids();

    //
    // Nav Toggle Button
    $(".nav-toggle-btn").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("collapsed");
      $("body").toggleClass("nav-show");
    });

    //
    // Slide Background
    var $vegasSlide = $('.vegas-slide');

    $vegasSlide.vegas({
      slides: [
        { src: "assets/images/slide_img01.jpg" },
        { src: "assets/images/slide_img02.jpg" },
        { src: "assets/images/slide_img03.jpg" }
      ],
      animation: [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ]
    });

    $('a#prev').on('click', function (e) {
      e.preventDefault();
      $vegasSlide.vegas('next');
    });
    $('a#toggle').on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass("pause");
      $(".slide-controller").toggleClass("active");
      $vegasSlide.vegas('toggle');
    });
    $('a#next').on('click', function (e) {
      e.preventDefault();
      $vegasSlide.vegas('previous');
    });

    //
    // Gridrotator
    $( '#ri-grid' ).gridrotator( {
      rows		: 3,
      columns		: 15,
      animType	: 'random',
      animSpeed	: 1000,
      interval	: 600,
      step		: 1,
      w320		: {
        rows	: 3,
        columns	: 4
      },
      w240		: {
        rows	: 3,
        columns	: 4
      }
    } );

    //
    // Load More
    var size_li   = $(".fp-gallery").size(),
              x   = 9,
        loadBtn   = $('#loadMore');

    $('.fp-gallery:lt('+x+')').show();
    loadBtn.click(function (e) {
      e.preventDefault();
      x= (x+3 <= size_li) ? x+3 : size_li;
      $('.fp-gallery:lt('+x+')').show(50);
      if(x == size_li){
        loadBtn.hide(100);
      }
    });

    //
    // Image Popup
    var gallery = $(".gallery-grid");

    gallery.magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc: function(item) {
          return item.el.attr('title');
        }
      },
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 500, // don't foget to change the duration also in CSS
        opener: function(element) {
          return element.find('img');
        }
      }

    });

    //
    // Post Gallery
    $('.post-gallery').owlCarousel({
      loop            : true,
      autoplay        : true,
      autoplayTimeout : 7000,
      items           : 1
    });

    //
    // Clients
    $('.review-area').owlCarousel({
      loop            : true,
      autoplay        : true,
      autoplayTimeout : 5000,
      margin          : 30,
      items           : 1,
      nav             : false,
      navText       : ['<i class="fa fa-chevron-left"><i/>','<i class="fa fa-chevron-right"><i/>']
    });

    //
    // Google Map
    var mapLocation = new google.maps.LatLng(40.712784, -74.005941); //change coordinates here
    var marker;
    var map;

    function initialize() {
      var mapOptions = {
        zoom: 12, //change zoom here
        center: mapLocation,
        scrollwheel: false,
        //styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
        styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]

      };

      map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

      // Replace with your data
      var contentString = '<div class="map-info-box">'
        + '<p class="map-address"><i class="icon ion-ios-location"></i> New York, USA<br><i class="icon ion-ios-telephone"></i> 012-345-6789<br><i class="icon ion-email"></i> <a href="mailto:info@example.com">info@example.com</a></p>'

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var image = 'assets/images/marker.png';
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        title: 'Craft', //change title here
        icon: image,
        animation: google.maps.Animation.DROP,
        position: mapLocation
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

  });

})(window.jQuery);