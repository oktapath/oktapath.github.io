jQuery(function(e){jQuery("#mu-search-icon").on("click",function(o){o.preventDefault(),e("#mu-search").addClass("mu-search-open"),e('#mu-search form input[type="search"]').focus()}),jQuery(".mu-search-close").on("click",function(o){e("#mu-search").removeClass("mu-search-open")}),jQuery("#mu-abtus-video").on("click",function(o){o.preventDefault(),e("body").append("<div id='about-video-popup'><span id='mu-video-close' class='fa fa-close'></span><iframe id='mutube-video' name='mutube-video' frameborder='0' allowfullscreen></iframe></div>"),e("#mutube-video").attr("src",e(this).attr("href"))}),e(document).on("click","#mu-video-close",function(o){e(this).parent("div").fadeOut(1e3)}),e(document).on("click","#about-video-popup",function(o){e(this).remove()}),jQuery("#mu-slider").slick({dots:!1,infinite:!0,arrows:!0,speed:500,autoplay:!0,cssEase:"linear"}),jQuery("#mu-testimonial-slide").slick({dots:!0,infinite:!0,arrows:!1,speed:500,autoplay:!0,cssEase:"linear"}),jQuery("#mu-latest-course-slide").slick({dots:!0,arrows:!1,infinite:!0,speed:300,slidesToShow:3,slidesToScroll:2,autoplay:!0,autoplaySpeed:2500,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}),jQuery(".mu-testimonial-slider").slick({dots:!0,infinite:!0,arrows:!1,autoplay:!0,speed:500,cssEase:"linear"}),jQuery(".counter").counterUp({delay:10,time:1e3}),jQuery("#mu-related-item-slide").slick({dots:!1,arrows:!0,infinite:!0,speed:300,slidesToShow:2,slidesToScroll:1,autoplay:!0,autoplaySpeed:2500,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1,infinite:!0,dots:!1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}),jQuery(function(){}),jQuery(document).ready(function(){jQuery(".fancybox").fancybox()}),jQuery("ul.nav li.dropdown").hover(function(){jQuery(this).find(".dropdown-menu").stop(!0,!0).delay(200).fadeIn(200)},function(){jQuery(this).find(".dropdown-menu").stop(!0,!0).delay(200).fadeOut(200)}),jQuery(window).scroll(function(){jQuery(this).scrollTop()>300?jQuery(".scrollToTop").fadeIn():jQuery(".scrollToTop").fadeOut()}),jQuery(".scrollToTop").click(function(){return jQuery("html, body").animate({scrollTop:0},800),!1})});