;
"use strict";

function DOMready() {

	var globParam = {
		sizes: {
			DESKTOP: "1200",
			LAPTOP: "980",
			TABLETS: "768",
			PHONES: "576"
		},
	};


	$("[data-h-phone-btn]").on("click", function () {
		console.log("work");
		$("[data-h-mobile-contacts]").toggleClass("active");
	});

	$('[data-main-menu-item]').hover(function () {
		clearTimeout($.data(this,'timer'));
		$('[data-dropdown-menu]',this).stop(true,true).slideDown(200);
	}, function () {
		$.data(this,'timer', setTimeout($.proxy(function() {
			$('[data-dropdown-menu]',this).stop(true,true).slideUp(200);
		}, this), 100));
	});



	
	accordSlideUp(".js-mobile-menu-inner-wrap", false);
	addAccordListener(".js-mobile-menu-inner-wrap", true);

	// Аккордеон
	function accordStart(e, showItem, callback) {
		e.preventDefault();
		var $this = $(this),
			accordItems = $(e.delegateTarget).find("[data-accord-item]"),
			$thisItem = $this.closest("[data-accord-item]");
		accordItems.not($thisItem).removeClass("active");
		accordItems.find("[data-accord-toggle]").not($this).siblings("[data-accord-content]").slideUp();

		$this.addClass("active");
		accordItems.find("[data-accord-toggle]").not($this).removeClass("active");

		if (showItem) {
			$thisItem.addClass("active");
			$this.siblings("[data-accord-content]").slideDown();
		} else {
			$thisItem.toggleClass("active");
			$this.siblings("[data-accord-content]").slideToggle();
		}
		if (typeof(callback) !== "undefined" && callback) {
			callback.call(this)
		}

	}

	// Закрытие вкладок аккордеона при загрузке
	function accordSlideUp(wrap, showActive) {
		$(wrap + " [data-accord-item]" + (showActive ? ":not(.active)" : "")).find("[data-accord-content]").slideUp();
		if (!showActive) {
			$(wrap + " [data-accord-item]").removeClass("active");
		}
	}

	//Добавляем слушатель для аккордеона
	function addAccordListener(wrap, showItem, callback) {

		$(wrap).on("click", "[data-accord-toggle]", function (e) {
			accordStart.call(this, e, showItem, callback);
		});
	}


	// Мобильное меню
	$("[data-mobile-menu-btn]").on("click", function () {
		$(this).toggleClass("active");
		$("[data-mobile-menu]").toggleClass("active");

		$("[data-voerlay]").toggleClass("active");
		$("html").toggleClass("overflow-hidden");

	});


	/*
        //dropdown
        $('body').on('click', '.js--dropdown', function (e) {
            e.preventDefault();
            var $_this = $(this);
            $_this.parents('.dropdown').addClass('dropdown_open');
            $_this.parents('.dropdown').width(($_this.parents('.dropdown__list').width()));
            $(document).mouseup(function (e) { //  событие клика по веб-документу
                var div = $_this.parents('.dropdown'); // тут указываем ID элемента
                if (!div.is(e.target) // если клик был не по нашему блоку
                    &&
                    div.has(e.target).length === 0) { // и не по его дочерним элементам
                    div.removeClass('dropdown_open');
                    div.css('width', 'auto');
                    console.log("12");
                }
            });
        });

        // todo удалить если не понадобитсья

        /!*	$(".js--dropdown").on("click", ".js--dropdown-item", function (e) {
                var thatWRap = $(e.delegateTarget);

                if (!thatWRap.hasClass("dropdown_open")) {

                    dropdownSelectOpen.call(this, e);
                } else {
                    checkClickOnDocument.call(this, e);
                }
                //
                // $(document).on("click", checkClickOnDocument.call(this, e, thatWRap));

            })*!/

        function dropdownSelectOpen(e) {
            e.preventDefault();

            var $this = $(this),
                dropdownWrap = $this.closest("[data-dropdown-select]");

            dropdownWrap.addClass("dropdown_open");
            dropdownWrap.width(($this.closest('[data-dropdown-select-list]').width()));
        }

        function dropdownSelectClose(e) {
            e.preventDefault();

            var $this = $(this),
                dropdownWrap = $this.closest("[data-dropdown-select]");

            dropdownWrap.removeClass("dropdown_open");
            dropdownWrap.css('width', 'auto')
        }

        function checkClickOnDocument(e, wrap) {
            console.log(e.target);
            if (!wrap.is(e.target) // если клик был не по нашему блоку
                &&
                wrap.has(e.target).length === 0) { // и не по его дочерним элементам
                wrap.removeClass('dropdown_open');
                wrap.css('width', 'auto');
            }
        }

        //dropdown второй тип
        $('body').on('click', '.js--open-dropdown', function (e) {
            e.preventDefault();
            var $_this = $(this);
            $_this.parents('.dropdown-mob').addClass('dropdown-mob_open');
            $(document).mouseup(function (e) { // событие клика по веб-документу
                var div = $_this.parents('.dropdown-mob'); // тут указываем ID элемента
                if (!div.is(e.target) // если клик был не по нашему блоку
                    &&
                    div.has(e.target).length === 0) { // и не по его дочерним элементам
                    div.removeClass('dropdown-mob_open');
                }
            });
        });

        // открытие закрытие спойлера
        $('body').on('click', '.js--spoiler-click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).siblings('.spoiler').toggleClass('spoiler_opened');
            $(this).siblings('.js--spoiler-content').slideToggle();
        });

        // открытие закрытие подменю каталога в десктопе

        var catalogMenuCheck = true;
        if (window.innerWidth > globParam.sizes.LAPTOP) {

            $('.catalog-menu__item_has-child').hover(function () {
                if (catalogMenuCheck) {
                    catalogMenuCheck = false
                    $('.catalog-menu__sub-menu', this).slideDown(400, function () {

                        //скрываем слайдер при отрытии подменю
                        if ($(" .header_color .catalog-menu__sub-menu").length) {
                            if (!bannerList.hasClass("opacity")) {
                                bannerList.addClass("opacity");
                                bannerList.slick("slickPause");

                            }
                        }
                        catalogMenuCheck = true
                    });
                }
            }, function () {
                $('.catalog-menu__sub-menu', this).slideUp(400, function () {
                    if (catalogMenuCheck) {
                        catalogMenuCheck = false

                        //показываем слайдер при скрытие подменю
                        if ($(".header_color .catalog-menu__sub-menu").length) {
                            if (bannerList.hasClass("opacity")) {
                                bannerList.removeClass("opacity");
                                if (bannerAutoplayStarting) {
                                    bannerList.slick("play");
                                }
                            }

                        }

                        catalogMenuCheck = true
                    }
                });
            });
        }

        // сворачивание/разворачивание меню в футере на таблете и мобилке
        $('.js--footer-menu').on('click', '.js--open-footer-menu', function (e) {
            if (windowWidth < globParam.sizes.LAPTOP) {
                $(this).siblings('.footer-column__content').slideToggle();
                $(this).toggleClass('footer__title_open');
            }
        });

        //открыть меню и поиск на таблете и ниже
        $('body').on('click', '.js--open-menu', function (e) {
            $('.js--show-when-menu-open').toggle();
            $('html').toggleClass('menu-is-open overflow-hidden');

            //скрываем слайдер при отрытии подменю
            if ($(" .header_color .catalog-menu__sub-menu").length > 0) {
                banner.toggleClass("hide");
            }
        });

        // сворачивание разворачивание фильтра в адаптиве
        $('body').on('click', '.js--toggle-filter', function (e) {
            $('.filter').toggleClass('filter_active-adaptive');
            $('html').toggleClass('filter-active overlay-active overflow-hidden');
            // если клик не по элементу
            $(document).mouseup(function (e) {
                if ($('html').hasClass('filter-active')) {
                    var div = $(".filter");
                    if (!div.is(e.target) && div.has(e.target).length === 0) {
                        $('.filter').removeClass('filter_active-adaptive');
                        $('html').removeClass('filter-active overlay-active overflow-hidden');
                    }

                }

            });
        });

        // Слайдер диапозонов
        function sliderRange(data) {
            var from = data.from,
                to = data.to,
                $slider = $(data.slider).siblings('.range-slider__input-wrapper');
            $slider.find('.js--range-from').val(from);
            $slider.find('.js--range-to').val(to);
        }

        $('body').on('input keyup', '.js--range-to, .js--range-from', function (e) {
            var slider = $(this).parent().siblings(".js--range-slider").data("ionRangeSlider");
            slider.update({
                from: $(this).parent().find('.js--range-from').val(),
                to: $(this).parent().find('.js--range-to').val(),
            });
        });

        $(".js--range-slider").ionRangeSlider({
            type: "double",
            min: $(this).data('min'),
            max: $(this).data('max'),
            to: $(this).data('to'),
            from: $(this).data('from'),
            hide_min_max: true,
            hide_from_to: true,
            onStart: function (data) {
                sliderRange(data);
            },
            onChange: function (data) {
                sliderRange(data);
            },
            onFinish: function (data) {
                var $slider = $(data.slider).siblings('.range-slider__input-wrapper');
                $slider.find('.js--range-from').keyup();
            }
        });

        // Табы
        function tabsStart(e) {
            e.preventDefault();
            e.stopPropagation();

            var $this = $(this),
                target = $this.attr('href');

            $this.closest(".js--tabs-list").find(".js--tabs-item.active").removeClass("active");
            $this.closest(".js--tabs-item").addClass("active");

            $(e.delegateTarget).find(".js--tabs-tab.active").removeClass("active");
            $(e.delegateTarget).find(target).addClass("active");
        }

        $(".js--tabs-wrap").on("click", ".js--tabs-toggle", function (e) {
            tabsStart.call(this, e);
        });

        $(".js--wheel-tabs").on("click", ".js--tabs-toggle", function (e) {
            tabsStart.call(this, e);
        });

        // Добавляем слайдер  при ресайзе
        var sliderStart = false;
        $(window).on('resize load', function () {
            if (windowWidth < globParam.sizes.LAPTOP) {
                if (!sliderStart) {
                    //Для табов
                    addAccordListener(".js--tabs-wrap")
                    accordSlideUp(".js--tabs-wrap")

                    //Для калькулятора
                    addAccordListener(".js--calc-wrap")
                    accordSlideUp(".js--calc-wrap")

                }
                sliderStart = true;
            } else {
                sliderStart = false;
                $(".js--tabs-wrap").off("click", ".js--accord-toggle");
                $(".js--calc-wrap").off("click", ".js--accord-toggle");
                $(".js--tabs-wrap .js--accord-content").removeAttr("style");
                $(".js--calc-wrap .js--accord-content").removeAttr("style");
            }
        });



        //Создаем яндекс карты
        function init() {

            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map").
            myMap = new ymaps.Map('map', {
                // При инициализации карты обязательно нужно указать
                // её центр и коэффициент масштабирования.
                center: coordsMap, // Москва
                zoom: 18,
                controls: []
            });

            // Создание геообъекта с типом точка (метка).

            myGeoObject = new ymaps.Placemark(coordsMap, {balloonContent: "текстт"}, {preset: "islands#blueDotIcon"});
            myMap.behaviors.disable('scrollZoom');
            // Размещение геообъекта на карте.
            myMap.geoObjects.add(myGeoObject);
        }

        if (typeof contactsList !== "undefined") {
            //Открытие карты
            if (typeof contactsList == "string") {
                contactsList = JSON.parse(contactsList)
            }

            var myMap,
                myGeoObject,
                coordsMap = contactsList[0].items[0].coords,
                locationText = contactsList[0].items[0].location;

            // Дождёмся загрузки API и готовности DOM.
            ymaps.ready(init);

            $(".js--map-wrapper").on("click", ".js--accord-toggle", function () {
                var $this = $(this),
                    coordsForMap = $this.attr("id");
                var arCoordsForMap = coordsForMap.split("_");
                coordsMap = contactsList[arCoordsForMap[0] - 1].items[arCoordsForMap[1] - 1].coords,
                    locationText = contactsList[arCoordsForMap[0] - 1].items[arCoordsForMap[1] - 1].location

                //Перемещаем центр карты
                myMap.panTo(coordsMap, {
                    duration: 1400,
                    flying: 1
                });

                //Закрываем балун
                myMap.balloon.close();
                //Перемещаем координаты метки
                myGeoObject.geometry.setCoordinates(coordsMap);
                //Меняем текст в балуне
                myGeoObject.properties.set('balloonContent', locationText);
            });

            //Открываем модалку с картой
            if ($(".js--open-map-modal").length) {
                $('.js--open-map-modal').on("click", openMapModal);

                $(window).on('resize', function () {
                    overlayRemove();
                })
            }

            $('body').on("click", ".overley-second", function () {
                $('.overley-second').remove();
                $(".modal-active").removeClass("modal-active");
            });
        }

        function openMapModal(e) {
            e.preventDefault();
            var $this = $(this),
                modalId = $this.attr("href"),
                activeModal = $(modalId);
            activeModal.addClass("modal-active");

            if (!$('.overley-second').length) {
                $('<div>').appendTo('body').addClass("overley-second");
            }
        }

        // Удаляем оверлей от модалки
        function overlayRemove() {
            if (windowWidth > globParam.sizes.TABLETS && $('.overley-second').length) {
                $('.overley-second').remove();
                $(".modal-active").removeClass("modal-active");
            }
        }

            // получаем данные userAgent
        function get_name_browser() {

            var userAgent = navigator.userAgent;
            // с помощью регулярок проверяем наличие текста,
            // соответствующие тому или иному браузеру
            if (userAgent.search(/Chrome/) > 0) return 'google_chrome';
            if (userAgent.search(/Safari/) > 0) return 'safari';
            if (userAgent.search(/Firefox/) > 0) return 'firefox';
            if (userAgent.search(/MSIE/) > 0) return 'internet_explorer';
            // условий может быть и больше.
            // сейчас сделаны проверки только
            // для популярных браузеров
            return 'Не определен';
        }



        if ($("[data-decor-item]").length) {
            var decor =  $(".js--decor");

            // пример использования

            if(get_name_browser() === "safari") {
                decor.addClass("decor_position_safari");

            }
            if(get_name_browser() === "firefox") {
                decor.addClass("decor_position_firefox");
                console.log("firefox");
            }



            // Подключаем паралакс
            decor.enllax();

            // Меняем blur для paralax

            var itemsDecor = $("[data-decor-item]");

            $(window).on("scroll load", function () {

                itemsDecor.each(function (indx, item) {

                    var itemDecorThis = $(item),
                        // windowHeight = $(window).outerHeight(true),
                        lampTop = item.getBoundingClientRect().top,
                        itemImgBlur = itemDecorThis.find("[data-decor-item-img-blur]"),
                        decorCalc;

                    // if (itemDecorThis.css("z-index") >= 9) {
                    decorCalc = 100 / lampTop;

                    // } else {
                    // decorCalc = (lampTop - 300) / windowHeight;

                    // decorCalc = (lampTop * 100) / windowHeight;
                    // }

                    decorCalc = Math.round(decorCalc * 100) / 100;

                    if (decorCalc > 0) {
                        itemImgBlur.css(
                            {
                                "opacity": decorCalc,
                                "-moz-opacity": decorCalc,
                                "-webkit-opacity": decorCalc
                            }
                        );
                        itemImgBlur.siblings().css({opacity: 1.8 - decorCalc});
                    }
                });
            });
        }

        // Настройки баннера-слайдера
        var header = $(".js--header"),
            banner = $(".js--main-banner"),
            bannerBg = $(".js--main-banner-bg"),
            bannerBgWrap = $(".js--main-banner-bg-wrap"),
            bannerList = $(".js--main-banner-list"),
            bannerItem = $(".js--main-banner-item"),
            bannerInnerItem = $("[data-main-banner-inner-item]"),
            checkbanner = true,
            slideActive = 0,
            sliderLength,
            bannerBgPos = 0,
            bannerBgPosStep = 50,
            slideNext,
            slideHeight = $(window).outerHeight(true) - header.outerHeight(true);





        if (bannerList.length > 0) {

            // Инициализация slick баннера-слайдера
            bannerList.slick({
                vertical: true,
                verticalSwiping: true,
                dots: true,
                speed: 1300,
                infinite: false,
                autoplay: true,
                autoplaySpeed: 4000,
                pauseOnFocus: true,
                pauseOnHover: true,
            }).slick("slickPause");

            //Центрируем слайды
            $(bannerItem).height(slideHeight);

            //Позиционирум точки отсносительно верхнего отступа
            var bannerDots = $(".js--main-banner .slick-dots");
            bannerDots.css("top", bannerItem.css("padding-top"));

            //Позиционирум стрелку под точками при изменениии количества слайдов
            var arrowNextOffsetTop = 220,
                bannerDotsPositionTop = bannerDots.offset().top - bannerItem.offset().top;
            bannerDotsHeight = bannerDots.outerHeight(true);
            $(".js--main-banner .slick-next").css("top", bannerDotsPositionTop + bannerDotsHeight);
        }
        // Устанавливаем задержку перед началом автовоспроизведения слайдов
        var initialAutoplay = 12000,
            // Определяем запущен ли автоплей на банер слайдере
            bannerAutoplayStarting = false;

        function autoplayStart() {
            setTimeout(function () {
                bannerList.slick("play");
                bannerAutoplayStarting = true;
            }, initialAutoplay)
        }

        autoplayStart();

        // Костыль, чтоб при перезагрузке скролл возвращался в начало страницы
        // И при этом работал паралакс
        if ($(".header_color").length) {
            $('body').css("height", "100%");
            $('body').addClass("overflow-hidden");
            $('body, html').scrollTop(0);
        }

        // Уничтажаем баннер-слайдер
        function bannerDestroy() {
            bannerBg.css({
                "top": -3000,
            });
            setTimeout(function () {
                banner.css({
                    position: "absolute",
                    top: -3000,
                    left: 0
                });
                header.removeClass("header_color");
                // Продолжение костыля, чтоб при перезагрузке скролл возвращался в начало страницы
                $('body').removeClass("overflow-hidden");
                $('body').removeAttr("style");
            }, 1700)
        }

        // Вешаем переключения слайдов на скрлолл
        bannerList.on('wheel', (function (e) {
            e.preventDefault();
            if (checkbanner) {
                if (e.originalEvent.deltaY < 0) {
                    $(this).slick('slickPrev');
                } else {
                    $(this).slick('slickNext');
                    if (slideActive == sliderLength) {
                        bannerDestroy()
                    }
                }
            }
            checkbanner = false;
        }));

        // Пересчет перехода по слайдам для создания эффекта паралакса
        bannerList.on('swipe ', (function (e) {
            e.preventDefault();
            if (slideActive == sliderLength && slideNext != slideActive - 1) {
                bannerDestroy()
            }

        })).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            sliderLength = slick.slideCount - 1;
            slideNext = nextSlide;

            var distances = Math.abs(slideActive - nextSlide);

            if (nextSlide > slideActive) {
                bannerBgPos += -bannerBgPosStep * distances;

                var transformString = "translate3d(0," + bannerBgPos + "px, 0)"
                bannerBgWrap.css("transform", transformString);
            }

            if (nextSlide < slideActive) {
                bannerBgPos += bannerBgPosStep * distances;

                var transformString = "translate3d(0," + bannerBgPos + "px, 0)"
                bannerBgWrap.css("transform", transformString);
            }

            var decorItem = $(this).find(".js--main-banner-item-decor");

            if (!decorItem.hasClass("opacity-decor")) {
                decorItem.addClass("opacity-decor");
            }

        }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
            checkbanner = true;
            slideActive = currentSlide;
        });

        $(".slick-next").on("click", function () {
            if (slideActive == sliderLength) {
                bannerDestroy();
            }
        })

    // Стилизуем select-tabs

        function selectTabsChangeTab() {
            var $this = $(this),
                selectTabsWrap = $this.closest(".js--select-tabs"),
                target = $this.find("option:selected").data("select_tabs_href");
            selectTabsWrap.find("[data-select-tabs-item].active").removeClass("active");
            selectTabsWrap.find(target).addClass("active");
            console.log($this);
        }

        $(".main-banner select").selectric({
            onOpen: function () {
                var selectTabsWrap = $(this).closest(".js--select-tabs");
                selectTabsWrap.find("[data-select-tabs-item-wrap]").addClass("opacity");
            },
            onChange: function () {
                selectTabsChangeTab.call(this);
            },
            onRefresh: function () {
                selectTabsChangeTab.call(this);
            },
            onBeforeClose: function () {
                $(this).closest(".js--select-tabs").find("[data-select-tabs-item-wrap]").removeClass("opacity");
            }
        });

        // Липкий хедер
        var headerBottomLine = $('.js--header-desktop-affix'),
            headerAffixOffset = $(".js--header-affix-offset"),
            headerBottomOffset = $('.js--affix-offset');

        $(window).on('resize load', function () {

            $(window).on("scroll", function () {
                if (windowWidth > globParam.sizes.LAPTOP) {
                    var $this = $(this);

                    if ($this.scrollTop() >= headerBottomOffset.offset().top && !headerBottomLine.hasClass("affix")) {
                        headerBottomLine.addClass("affix");
                    } else if ($this.scrollTop() < headerBottomOffset.offset().top && headerBottomLine.hasClass("affix")) {
                        headerBottomLine.removeClass("affix");
                    }

                    if ($this.scrollTop() >= headerBottomOffset.offset().top) {

                        headerBottomLine.on("mouseenter", function () {
                            headerBottomLine.removeClass("affix");
                            header.addClass("affix header_affix_animation");
                            headerAffixOffset.addClass("offset-height");

                        })

                    } else {
                        headerBottomLine.off("mouseenter");
                        header.off("mouseleave");
                        header.removeClass("affix");
                        headerAffixOffset.removeClass("offset-height");
                    }
                }
            });
        });

    // Подключаем детальный слайдер
        var sliderDetail = {
            wrap: $('.js--slider-detail-for'),
            navItem: $("[data-slide-detail-nav]"),
        }

        if (sliderDetail.wrap != undefined) {

            sliderDetail.wrap.on("init reinit", function (event, slick) {
                $("[data-slide-detail-nav=" + (slick.currentSlide + 1) + "]").addClass("active");
            }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                sliderDetail.navItem.removeClass("active");
                $("[data-slide-detail-nav=" + (nextSlide + 1) + "]").addClass("active");
            });

            sliderDetail.wrap.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 980,
                        settings: {
                            dots: true
                        }
                    }
                ]
            })

            sliderDetail.navItem.on("click", function () {
                var $this = $(this),
                    activeSliderItem = $this.data("slide-detail-nav") - 1;
                sliderDetail.wrap.slick("slickGoTo", activeSliderItem);
            })
        }

        // Показать тень при наведении на стрелку слайдера
        // var sliderDetailArrows = $('.js--slider-detail-for ')

        sliderDetail.wrap.on({
            mouseenter: function (e) {
                var $thisWrap = $(e.delegateTarget);
                if ($(e.target).hasClass("slick-next")) {
                    $thisWrap.addClass("slider-detail__inner-wrap_shadow_left");
                } else {
                    $thisWrap.addClass("slider-detail__inner-wrap_shadow_right");
                }
            },
            mouseleave: function (e) {
                var $thisWrap = $(e.delegateTarget);
                $thisWrap.removeClass("slider-detail__inner-wrap_shadow_left");
                $thisWrap.removeClass("slider-detail__inner-wrap_shadow_right");
            }
        }, ".slick-arrow")

        // Показать все / скрыть
        function toggleVisibilityBtn(textDefault, innerTextDefault, status) {
            var $this = $(this),
                showAllInnerText = innerTextDefault || $this.data("show-all"),
                showAllTextWrap = $this.find("[data-show-all-text]"),
                showAllText = textDefault || showAllTextWrap.text(),
                showAllBlock = $this.data("show-all-block");

            switch (status) {
                case true:
                    $this.addClass("active");
                    $("#" + showAllBlock).removeClass("block-cut");
                    break;
                case false:
                    $this.removeClass("active");
                    $("#" + showAllBlock).addClass("block-cut");
                    break;
                default:
                    $this.toggleClass("active");
                    $("#" + showAllBlock).toggleClass("block-cut");
            }

            showAllTextWrap.text(showAllInnerText);
            $this.data("show-all", showAllText);
        }

        var showAllBtn = $(".js--parameter-show-all");

        if (showAllBtn.length) {
            showAllBtn.on("click", function () {
                var $this = $(this);
                toggleVisibilityBtn.apply($this);
                if (windowWidth > globParam.sizes.LAPTOP) {
                    if (!$this.hasClass("active")) {
                        parameterWrap.css("max-height", heightFinal);
                    } else {
                        parameterWrap.css("max-height", "inherit");
                    }
                }
            });
        }

        // Скрываем часть блока характеристик если высота больше чем n
        var parameter = $(".js--parameter"),
            parameterWrap = parameter.find(".js--parameter-wrap"),
            parameterShowBtn = parameter.find("[data-show-all]"),
            modifications = $(".js--modifications"),
            documentation = $(".js--documentation"),
            order = $(".js--order"),
            sliderFeatures = $(".js--slider-features");

        var heightForHide,
            heightForMatching,
            heightHide,
            heightFinal;

        // Высчитываем высоту
        if (parameter.length) {

            var widthPatameterCheck = true;
            $(window).on('resize load', function () {
                if (windowWidth > globParam.sizes.LAPTOP) {

                    // Откуда отрезаем
                    heightForHide = modifications.outerHeight(true) + parameter.outerHeight(true);
                    // C каким блоком сравниваем
                    heightForMatching = order.outerHeight(true) + sliderFeatures.outerHeight(true) + documentation.outerHeight(true);
                    //Сколько нужно отрезать
                    heightHide = heightForHide - heightForMatching,
                        //Итоговая высота, после обрезки
                        heightFinal = parameterWrap.outerHeight(true) - heightHide;
                    if (heightFinal <= 0) {
                        heightFinal = 0;
                    }
                    checkHeight();
                    widthPatameterCheck = true;

                } else {
                    if (widthPatameterCheck) {
                        parameterShowBtn.removeClass("hide");
                        parameterWrap.removeAttr("style");
                        toggleVisibilityBtn.call(showAllBtn, "Свернуть", "Смотреть все", false);
                    }
                    widthPatameterCheck = false;
                }
            });
        }

        function checkHeight() {
            if (heightForHide > heightForMatching || (heightForHide + heightHide) > heightForMatching) {
                parameterShowBtn.removeClass("hide");
                parameterWrap.css("max-height", heightFinal);
                toggleVisibilityBtn.call(showAllBtn, "Свернуть", "Смотреть все", false);
                ;
            }
            else if (heightForHide < heightForMatching) {
                parameterShowBtn.addClass("hide");
                parameterWrap.css("max-height", "inherit");
                toggleVisibilityBtn.call(showAllBtn, "Свернуть", "Смотреть все", true);
            }
        }

        // Подключаем слайдер для блока related-product
        var relProductWrap = $(".js--related-product-list");

        var relProductSetting = {
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            autoplay: 2000,
            responsive: [
                {
                    breakpoint: 980,
                    settings: {
                        arrows: false,
                    }
                }
            ]
        }

        $(window).on('resize load', function () {
            if (windowWidth < globParam.sizes.TABLETS) {
                if (relProductWrap.hasClass('slick-initialized')) {
                    relProductWrap.slick('unslick');
                }

            } else {
                if (!relProductWrap.hasClass('slick-initialized')) {
                    relProductWrap.slick(relProductSetting);
                }
            }
        });

        // Подключаем слайдер для блока slider-features
        var sliderFeaturesWrap = $(".js--slider-features-wrap");
        var sliderFeaturesSetting = {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            initialSlide: 0

        }

        $(window).on('resize load', function () {
            if (windowWidth < globParam.sizes.LAPTOP) {
                if (sliderFeaturesWrap.hasClass('slick-initialized')) {
                    sliderFeaturesWrap.slick('unslick');
                }
            } else {
                if (!sliderFeaturesWrap.hasClass('slick-initialized')) {
                    sliderFeaturesWrap.slick(sliderFeaturesSetting);
                }
            }
        });

        // Устанавливаем тень по бокам при переключении слайдов
        sliderFeaturesWrap.on('init reinit', function (event, slick, currentSlide, nextSlide) {
            var $this = $(this);
            if ((slick.options.slidesToShow + slick.currentSlide) !== slick.slideCount) {
                $this.addClass("show-right-shadow");
            } else {
                $this.removeClass("show-right-shadow");
            }
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var $this = $(this);
            if (nextSlide > 0) {
                $this.addClass("show-left-shadow");
            } else {
                $this.removeClass("show-left-shadow");
            }
            if ((slick.options.slidesToShow + nextSlide) !== slick.slideCount) {
                $this.addClass("show-right-shadow");
            } else {
                $this.removeClass("show-right-shadow");
            }
        });

        // Скрываем текст на мобилках в desctiotion
        $(".js--description-show-all").on("click", function () {
            toggleVisibilityBtn.apply($(this));
        })

        // Закрываем акции
        $(".js--stock").on("click", ".js--stock-close", function (e) {
            $(e.delegateTarget).addClass("hide");
        })

        // Уменьшаем  число
        function counterMinus(wrapValue) {
            var wrapValue = $(wrapValue);
            if (wrapValue.val() > 1) {
                wrapValue.val(+wrapValue.val() - 1);
            }
        }

        // Увеличиваем число
        function counterPlus(wrapValue) {
            var wrapValue = $(wrapValue);
            wrapValue.val(+wrapValue.val() + 1);
        }

        // Меняем количество в инпуте
        $(".js--counter-amount").on("click", "[data-counter-amount-btn]", function (e) {
            e.stopPropagation();
            var $this = $(this),
                valueWrapper = $(e.delegateTarget).find(".js--counter-amount-value");
            if ($this.data("counter-amount-btn") == "minus") {
                counterMinus(valueWrapper);
            }
            if ($this.data("counter-amount-btn") == "plus") {
                counterPlus(valueWrapper);
            }
        })

        $('.js--counter-amount-value').on("change keyup input click", function () {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });

        $('.js--counter-amount-value').on("change", function () {
            this.value = this.value.replace(/^0+/, "");

            if (this.value == "" || +this.value == 0) {
                this.value = 1;
            }
        })

        // Скрываем часть иконок при клике на поиск (для авторизованных пользователей)

        var mainSearchInput = $(".js--main-search-input");

        mainSearchInput.on("click", function () {
            var $this = $(this);
            $this.closest("[data-header-middle-right]").addClass("header__middle-right-area_search-open");
        })

        mainSearchInput.on("focusout", function () {
            var $this = $(this);
            $this.closest("[data-header-middle-right]").removeClass("header__middle-right-area_search-open");
        })

        // Стилизуем wheel-tabs

        $(".js--wheel-tabs-list").on("mouseenter", ".js--wheel-tabs-item", function (e) {
            var $this = $(this);
            $(e.delegateTarget).find(".js--wheel-tabs-item").removeClass("pre-active");
            $this.prev(".js--wheel-tabs-item").addClass("pre-active");
        });

        // Подчеркивание для меню
        var activeItem = $(".js--main-menu").find("[data-main-menu-item].active").find("[data-main-menu-link]"),
            mainMenuLine = $("[data-main-menu-line]"),
            mainMenuActiveItemWidth = activeItem.innerWidth(),
            mainMenuActiveItemPos = activeItem.offset().left;
        mainMenuLine.css({
            "left": mainMenuActiveItemPos,
            "width": mainMenuActiveItemWidth
        });

        function itemGetWidthAndPos(wrap, item) {
            return wrap.find(item).innerWidth();
        }

        $(".js--main-menu").on("mouseenter", "[data-main-menu-item]", function () {
            var item = $(this).find("[data-main-menu-link]"),
                offsetItem = item.offset().left,
                itemWidth = item.innerWidth();
            mainMenuLine.css({
                "left": offsetItem,
                "width": itemWidth
            });
        });

        $(".js--main-menu").on("mouseleave", "[data-main-menu-item]", function () {
            mainMenuLine.css({
                "left": mainMenuActiveItemPos,
                "width": mainMenuActiveItemWidth
            });
        })*/

}

document.addEventListener("DOMContentLoaded", DOMready);