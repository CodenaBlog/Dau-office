$(function(){

  /**
   * header 탑 배너
   */
  $(window).scroll(function(){
    var curr = $(this).scrollTop();
    var linkBannerHeight = $('.link-banner').outerHeight();
  
    if(curr >= linkBannerHeight){
      $('.header, .gnb-mo').addClass('fixed');
    } else {
      $('.header, .gnb-mo').removeClass('fixed');
    }
  });
  

  /**
   * header 서브 리스트
   */
  // gnb-item에 마우스를 올렸을 때 실행될 함수
  $('.gnb-item').mouseover(function(){
    // 현재 gnb-item의 인덱스를 가져옵니다.
    var index = $(this).index();
    // 해당 인덱스에 맞는 sub-wrap에 클래스를 추가합니다.
    $('.sub-wrap').eq(index).addClass('on');
  });

  // gnb-item에서 마우스가 떠났을 때 실행될 함수
  $('.gnb-item').mouseout(function(){
    // 모든 sub-wrap에서 'on' 클래스를 제거합니다.
    $('.sub-wrap').removeClass('on');
  });


  /**
   * header 그룹웨어 구축
   */
  $('.header .group-wear').hover(function(){
    $(this).find('.sub-wrap').addClass('on');
  },function(){
    $(this).find('.sub-wrap').removeClass('on');
  });

  
  /**
   * header-mo gnb
   */
  $('.header .menu-wrap').click(function(){
    $('.gnb-mo').toggleClass('on');
    $(this).toggleClass('toggle-btn');
  });
  
  $('.gnb-mo .gnb-list').click(function(){
    $('.gnb-mo .gnb-item').stop().slideUp();
    $(this).find('.gnb-item').stop().slideToggle();
  });

  // 스크롤 막는게 안된다..ㅠㅠ



  /**
   * footer
   */
  $(window).scroll(function(){
    if ($(this).scrollTop() > 10){
      $('#scroll-top').addClass('on');
    } else{
      $('#scroll-top').removeClass('on');
    }
  });
  $('#scroll-top').click(function(){
    $('html, body').animate({scrollTop:0},1000);
    return false;
  });



  /**
   * sc-visual 폰
   */
  gsap.to('.sc-visual .group-phone',{
    scrollTrigger: {
      trigger: ".sc-visual .group-phone", //img 기준으로 트리거
      start: "top 40%",
      end: "bottom 100%",
      scrub: 1,
    },
    width:'1%'
  });



  /**
   * sc-service
   */
  $(document).ready( function()
  {
    var bMove = false;
    var startX = 0;
    var scrollLeft = 0;
    var slider = document.querySelector(".service-area");

    slider.addEventListener("mousedown", function(e){
      bMove = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", function(){
      bMove = false;
    });

    slider.addEventListener("mouseup", function(){
      bMove = false;
    });

    slider.addEventListener("mousemove", function(e){
      if( bMove )
      {
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
      }
    });
  } );



  /**
  * sc-feature tab 스와이퍼
  */
  $(document).ready(function() {

    $(".sc-feature .swiper").hide();
    $("#groupware").show();
      groupwareSwiper = new Swiper("#groupware", {
      slidesPerView: 1.2,
      spaceBetween: 30,
      speed: 2500,
      loopFillGroupWithBlank: true,
      loop: true,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 500,
      },
      pagination: {
        el: ".pagination",
        type: 'progressbar',
      },
      navigation: {
        nextEl: ".btn.next",
        prevEl: ".btn.prev",
      },
      breakpoints: {
        600: {
          slidesPerView: 2.2,
          spaceBetween: 30,
        },
      }
    });

    let swiperInstances = {}; // 각 탭에 대한 Swiper 인스턴스를 저장할 객체

    // 각 탭에 대한 Swiper 초기화 함수
    function initSwiper(tabId) {
      return new Swiper(tabId, {
        // Swiper 구성 설정
        slidesPerView: 1.2,
        spaceBetween: 30,
        speed: 2500,
        loopFillGroupWithBlank: true,
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 500,
        },
        pagination: {
          el: ".pagination",
          type: 'progressbar',
        },
        navigation: {
          nextEl: ".btn.next",
          prevEl: ".btn.prev",
        },
        breakpoints: {
          1350: {
            slidesPerView: 3.5,
            spaceBetween: 30,
          },
          1160: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
        }
      });
    }
  
    $(".sc-feature .nav-area > .nav").on("click", function(e) {
      e.preventDefault(); // 링크 클릭 기본 동작 방지
      let tabId = $(this).attr("href"); // 클릭된 요소의 href 값 가져오기
      
      $(".sc-feature .nav-area > .nav").removeClass("active");
      $(".sc-feature .swiper").hide();
      
      $(this).addClass("active");
      $(tabId).show();
  
      if (swiperInstances[tabId] && swiperInstances[tabId] instanceof Swiper) {
        swiperInstances[tabId].destroy(); // 기존 Swiper 인스턴스 파괴
      }

      swiperInstances[tabId] = initSwiper(tabId); // 새로운 Swiper 인스턴스 생성
    });
  });
  

  

  /**
  * sc-brand 스와이퍼
  */
  var brandSlide = new Swiper(".brand-slide", {
    speed:3000,
    spaceBetween: 57,
    loop:true,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });


  /**
  * sc-chat 슬라이드
  */
  const videos = document.querySelectorAll('.col-right video');

  function showVideo(index) {
    videos.forEach((video, i) => {
      if (i === index) {
        video.style.display = 'block';
      } else {
        video.style.display = 'none';
      }
    });
  }
  
  const motion = gsap.timeline({
    scrollTrigger:{
      trigger:".sc-chat",
      start:"top top",
      end:"bottom bottom",
      onUpdate:function(self ){
        guage = Math.round(self.progress*100);
        $('.sc-chat .nav-item').removeClass('on');
        if(guage > 80){
          $('.sc-chat .nav-item:nth-child(5)').addClass('on');
          $('.sc-chat .title-box, .sc-chat .chat-vidio').removeClass('on');
          $('.sc-chat .title-box:nth-child(5), .sc-chat .chat-vidio:nth-child(5)').addClass('on');
          showVideo(4);
        } else if(guage > 60){
          $('.sc-chat .nav-item:nth-child(4)').addClass('on');
          $('.sc-chat .title-box, .sc-chat .chat-vidio').removeClass('on');
          $('.sc-chat .title-box:nth-child(4), sc-chat .chat-vidio:nth-child(4)').addClass('on');
          showVideo(3);
        } else if(guage > 40){
          $('.sc-chat .nav-item:nth-child(3)').addClass('on');
          $('.sc-chat .title-box, .sc-chat .chat-vidio').removeClass('on');
          $('.sc-chat .title-box:nth-child(3), sc-chat .chat-vidio:nth-child(3)').addClass('on');
          showVideo(2);
        } else if(guage > 20){
          $('.sc-chat .nav-item:nth-child(2)').addClass('on');
          $('.sc-chat .title-box, .sc-chat .chat-vidio').removeClass('on');
          $('.sc-chat .title-box:nth-child(2), sc-chat .chat-vidio:nth-child(2)').addClass('on');
          showVideo(1);
        } else {
          $('.sc-chat .nav-item:nth-child(1)').addClass('on');
          $('.sc-chat .title-box, .sc-chat .chat-vidio').removeClass('on');
          $('.sc-chat .title-box:nth-child(1), sc-chat .chat-vidio:nth-child(1)').addClass('on');
          
          showVideo(0);
        }
      }
    }
  });
  
  $('.sc-chat .nav-item').on('click', function() {
    const index = $(this).index();
    $('.sc-chat .nav-item').removeClass('on');
    $(this).addClass('on');
    showVideo(index);
  });



  /**
   * sc-news
   */
  $(document).ready(function() {
    // 윈도우 가로 사이즈 감지 함수
    function checkWindowSize() {
      if ($(window).width() <= 768) {
        // 가로 사이즈가 768 이하인 경우에 실행될 GSAP 애니메이션 코드
        gsap.timeline({
          scrollTrigger: {
            trigger: ".sc-news",
            start: "5% center",
            end: "80% center",
            scrub: 0.5,
          },
        })
        .to('.sc-news .b1', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        })
        .to('.sc-news .b2', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        })
        .to('.sc-news .b3', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        });
        
        gsap.timeline({
          scrollTrigger:{
            trigger:".sc-diffrence",
            start:"3% center",
            end:"80% center",
            scrub: 0.5,
          }
        })
        .to('.sc-diffrence .b1', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        })
        .to('.sc-diffrence .b2', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        })
        .to('.sc-diffrence .b3', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        });

      } else {
        gsap.timeline({
          scrollTrigger: {
            trigger: ".sc-news",
            start: "10% center",
            end: "60% center",
            scrub: 0.5,
          },
        })
        .to('.sc-news .b1, .sc-news .b3', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        })
        .to('.sc-news .b2', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        });

        gsap.timeline({
          scrollTrigger:{
            trigger:".sc-diffrence",
            start:"8% center",
            end:"80% center",
            scrub: 0.5,
          }
        })
        .to('.sc-diffrence .b1, .sc-diffrence .b2', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        })
        .to('.sc-diffrence .b3', {
          y: -50,
          opacity: 1,
          ease: 'Linear.easeNone',
        });
      }
    }
  
    // 페이지 로드 시 및 윈도우 리사이즈 이벤트에 대한 리스너 추가
    checkWindowSize(); // 페이지 로드 시 사이즈 체크
    $(window).resize(checkWindowSize); // 윈도우 리사이즈 시 사이즈 체크
  });
  



  /**
  * sc-customer 스와이퍼
  */
  var cutomerSlide = new Swiper(".cutomer-slide", {
    slidesPerView: 'auto',
    spaceBetween: 40,
    speed:3000,
    loop:true,
    autoplay: {
      delay: 0,
    },
  });




  /**
  * popup 모바일
  */
  $(window).scroll(function(){
    curr = $(this).scrollTop();
    if(curr >= 74){
      $('.popup-mo').addClass('on');
    }else{
      $('.popup-mo').removeClass('on');
    }
    lastScrollTop = curr;
  })


  
  


});