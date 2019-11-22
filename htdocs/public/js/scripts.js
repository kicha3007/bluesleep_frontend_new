;
"use strict";

function DOMready() {

    // Глобальные настройки
    var globParam = (function () {
        var sizes = {
            DESKTOP: "1199",
            LAPTOP: "991",
            TABLETS: "767",
            PHONES: "575"
        };

        return {
            getMediaSize: function () {
                return sizes;
            },
            windowWidth: function () {
                return $(window).width();
            }
        }

    })();

    // Показать телефон в мобильное версии
    var phoneMobile = (function () {
        return {
            setlistenerOnBtn: function () {
                $("[data-h-phone-btn]").on("click", function () {
                    $("[data-h-mobile-contacts]").toggleClass("active");
                });
            }
        }

    })();
    phoneMobile.setlistenerOnBtn();

    // Главное меню
    var mainMenu = (function () {

        $("[data-main-menu]").mouseenter(function () {
            var $this = $(this),
                activeItem = $this.find("[data-main-menu-item].active");
            activeItem.addClass("hide-active");

        }).mouseleave(function () {
            var $this = $(this),
                activeItem = $this.find("[data-main-menu-item].hide-active");
            activeItem.removeClass("hide-active");
        });

        $("[data-dropdown-menu-id]").mouseenter(function () {
            mainMenu.showInfoForActiveDropdownItem.call(this);
        });

        return {
            toggleVisible: function () {
                var self = this;

                $('[data-main-menu-item]').hover(function () {
                    clearTimeout($.data(this, 'timer'));
                    $('[data-dropdown-menu]', this).stop(true, true).slideDown(200);
                }, function () {
                    $.data(this, 'timer', setTimeout($.proxy(function () {
                        $('[data-dropdown-menu]', this).stop(true, true).slideUp(200);

                        self.showInfoForActiveDropdownItem.call($("[data-dropdown-menu-new='true']"));

                    }, this), 100));
                });
            },
            showInfoForActiveDropdownItem: function () {
                var $this = $(this),
                    id = $this.data("dropdown-menu-id"),
                    wrap = $this.closest("[data-dropdown-menu-wrap]"),
                    items = wrap.find("[data-dropdown-menu-inner-item]"),
                    item = wrap.find("#" + id);
                items.removeClass("active");
                item.addClass("active");
            },
            showNewOnLoadInDropdown: function () {
                var self = this;
                self.showInfoForActiveDropdownItem.call($("[data-dropdown-menu-new='true']"));
            }
        };

    })();
    mainMenu.toggleVisible();

    // Аккордеон
    var accordeonBase = (function () {

        return {
            start: function (e, showItem, callback) {
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
                if (typeof (callback) !== "undefined" && callback) {
                    callback.call(this)
                }
            },
            setListener: function (wrap, showItem, callback) {
                var self = this;

                $(wrap).on("click", "[data-accord-toggle]", function (e) {
                    self.start.call(this, e, showItem, callback);
                });
            },
            slideUpOnLoad: function (wrap, showActive) {
                $(wrap + " [data-accord-item]" + (showActive ? ":not(.active)" : "")).find("[data-accord-content]").slideUp();
                if (!showActive) {
                    $(wrap + " [data-accord-item]").removeClass("active");
                }
            }
        }
    })();
    accordeonBase.slideUpOnLoad(".js-mobile-menu-inner-wrap", false);
    accordeonBase.setListener(".js-mobile-menu-inner-wrap", true);

    accordeonBase.slideUpOnLoad(".js-faq-top-wrap", false);
    accordeonBase.setListener(".js-faq-top-wrap", true);

    var overlayMain = (function () {

        $("[data-overlay]").on("click", function () {
            mobileMenu.toggleShow.call($("[data-mobile-menu-btn]"));
        });

        return {
            toggleOverlayShowHide: function () {
                $("[data-overlay]").toggleClass("active");
                $("html").toggleClass("overflow-hidden");
            },
        }
    })();

    // Мобильное меню
    var mobileMenu = (function () {
        return {
            addlistenerOnBtn: function () {
                var self = this;
                $("[data-mobile-menu-btn]").on("click", function () {

                    self.toggleShow.call(this);
                });
            },
            toggleShow: function () {
                $(this).toggleClass("active");
                $("[data-mobile-menu]").toggleClass("active");

                overlayMain.toggleOverlayShowHide();
            }

        };
    })();
    mobileMenu.addlistenerOnBtn();

    // Показ всех пукнктов в аккордеоне faq
    var faqAccord = (function () {
        $("[data-faq-btn]").on("click", function () {
            var items = $("[data-faq-bottom-wrap]").find("[data-accord-item]");
            items.appendTo("[data-faq-top-wrap]");
            $(this).remove();
        });
    })();

    if (globParam.windowWidth() < globParam.getMediaSize().LAPTOP) {
        // Инициализация слайдера advantages
        $(".js-advantages-wrap").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        variableWidth: true,
                    }
                }
            ]
        });

    }

    if (globParam.windowWidth() < globParam.getMediaSize().LAPTOP) {
        // Инициализация слайдера advantages-detail
        $(".js-advantages-detail-wrap").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        variableWidth: true,
                    }
                }
            ]
        });

    }

    // Инициализация слайдера blogers
    $(".js-blogers-wrap").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: false,

        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                }
            }
        ]
    });

    // Подключаем детальный слайдер
    if ($('.js--slider-detail-for').length > 0) {

        var sliderDetail = (function () {
            var wrap = $('.js--slider-detail-for');
            var navItem = $("[data-slide-detail-nav]");

            return {
                initFirstActiveSlide: function () {
                    wrap.on("init reinit", function (event, slick) {
                        $("[data-slide-detail-nav=" + (slick.currentSlide + 1) + "]").addClass("active");
                    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                        navItem.removeClass("active");
                        $("[data-slide-detail-nav=" + (nextSlide + 1) + "]").addClass("active");
                    });
                    this.init();
                },
                init: function () {
                    wrap.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        fade: true,
                        infinite: false,
                        lazyLoad: 'ondemand',
                        adaptiveHeight: true,
                        responsive: [
                            {
                                breakpoint: 980,
                                settings: {
                                    dots: true
                                }
                            }
                        ]
                    });
                    this.tiuUpTwoSliders();
                },
                tiuUpTwoSliders: function () {
                    navItem.on("click", function () {
                        var $this = $(this),
                            activeSliderItem = $this.data("slide-detail-nav") - 1;
                        wrap.slick("slickGoTo", activeSliderItem);
                    })
                }
            }
        })();
        sliderDetail.initFirstActiveSlide();
    }

    $("[data-choice-size-dropdown-wrap]").on("click", "[data-choice-size-dropdown-active-item]", function (e) {
        $(e.delegateTarget).find("[data-choice-size-dropdown-inner-wrap]").toggleClass("active");
    });

    $("[data-choice-size-dropdown-wrap]").on("click", "[data-choice-size-dropdown-item]", function (e) {
        var $this = $(e.currentTarget);
        var wrap = $this.closest("[data-choice-size-dropdown-inner-wrap]");
        var item = wrap.find("[data-choice-size-dropdown-item]");

        wrap.removeClass("active");
        item.removeClass("active");
        $this.addClass("active");
        $(e.delegateTarget).find("[data-choice-size-dropdown-active-item-text]").text($this.text());

        var offerId = $this.data("choice-size-dropdown-item");
        console.log("idd", offerId);

        ChangeOffer(offerId);

    });



    offersList = JSON.parse(offersList);

    // Обработчик смены ТП в деталке товара
    function ChangeOffer(offerId) {
        if (offerId > 0) {
            var currOffer = {};
            for (var i in offersList) {
                if (offersList[i]['ID'] == offerId) {
                    currOffer = offersList[i];

                    break;
                }
            }

            if (currOffer['ID'] > 0) {

                // меняем цены
                $("[data-card-info-price-new]").html(currOffer['BASE_PRICE']);
                $("[data-card-info-price-old]").html(currOffer['OLD_PRICE']);

                //Скидка (может придти как процент, так и число, так и вообще не придти)
                var $label = $("[data-label]");
                // Показываем скидку
                if (currOffer['DISCOUNT'] > 0) {

                    if ($label.hasClass("hide")) {
                        $label.removeClass("hide");
                    }
                    $("[data-label-numeric]").html(currOffer['DISCOUNT']);
                    $("[data-label-format]").html(currOffer['DISCOUNT_TYPE']);
                    $("[data-label-date]").html(currOffer['DISCOUNT_PERCENT_TIME']);
                } else {
                    if (!$label.hasClass("hide")) {
                        $label.addClass("hide");
                    }
                }

                // Меняем Размеры
                var $gabarity = $("[data-choice-size-value-size]");
                if (currOffer['GABARITY'] != '') {

                    if($gabarity.hasClass("hide")) {
                        $gabarity.removeClass("hide")
                    }
                    $gabarity.html(currOffer['GABARITY']);
                } else {
                    if(!$gabarity.hasClass("hide")) {
                        $gabarity.addClass("hide")
                    }
                }

                // Меняем Размеры вес
                var $weight = $("[data-choice-size-value-weight]");
                if (currOffer['GABARITY'] != '') {

                    if($weight.hasClass("hide")) {
                        $weight.removeClass("hide")
                    }
                    $weight.html(currOffer['WEIGHT']);
                } else {
                    if(!$weight.hasClass("hide")) {
                        $weight.addClass("hide")
                    }
                }


                //скрываем/показываем блок зачеркнутой цены
            var $oldPrice = $("[ data-card-info-price-old]");
            if (currOffer['OLD_PRICE'] == '' && $oldPrice.hasClass('hide') == false)
                $oldPrice.removeClass('hide');
            else if (currOffer['OLD_PRICE'] != '' && $oldPrice.hasClass('hide') == true)
                $oldPrice.addClass('hide');
            }

            // скрываем/показываем блок "В рассрочку"
            var $credit = $("[data-card-info-price-other]");
            var $creditBtn = $("[data-card-info-btn-credit]");

            if (currOffer['CREDIT_RENT_IS_SHOW'] == "TRUE") {
                if ($credit.hasClass('hide') == true) {
                    $credit.removeClass('hide');
                    $creditBtn.removeClass('hide');
                }
            } else {
                if (!$credit.hasClass('hide') == true)
                    $credit.addClass('hide');
                    $creditBtn.addClass('hide');
            }

        }
    }






    // Табы
    function tabsStart(e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this),
            target = $this.attr('href');

        $this.closest("[data-tabs-nav-list]").find("[data-tabs-nav-item].active").removeClass("active");
        $this.closest("[data-tabs-nav-item]").addClass("active");

        $(e.delegateTarget).find("[data-tabs-tab].active").removeClass("active");
        $(e.delegateTarget).find(target).addClass("active");
    }


    $(".js--card-info-tabs").on("click", "[data-tabs-toggle]", function (e) {
        tabsStart.call(this, e);
    });



    // Обработчик смены ТП в деталке товара
    // function ChangeOffer(offerId) {
    //     if (offerId > 0) {
    //         var currOffer = {};
    //         for (var i in offersList) {
    //             if (offersList[i]['ID'] == offerId) {
    //                 currOffer = offersList[i];
    //                 break;
    //             }
    //         }
    //
    //
    //
    //         if (currOffer['ID'] > 0)   {
    //             // запоминаем текущий офферИД
    //             $(main + '[name="CURRENT_SIZE_ID"]').val(currOffer['ID']);
    //
    //
    //             // меняем цены
    //             $(main + '.js-product__price .js-price__value').html(currOffer['DISCOUNT_PRICE_FORMATTED']);
    //             $(main + '.js-product__price-old .js-price__value-old').html(currOffer['OLD_PRICE_FORMATTED']);
    //
    //             // Скидка (может придти как процент, так и число, так и вообще не придти)
    //             if (currOffer['DISCOUNT_EXIST'])
    //             {
    //                 // Показываем скидку
    //                 if (currOffer['DISCOUNT_TYPE'] == 'P')
    //                 {
    //                     $(main + '.js-product__price__discount').html(currOffer['DISCOUNT_PERCENT_FORMATTED']);
    //                     $(main + '.js-product__price__discount').addClass('product__price__discount-percent');
    //                     $(main + '.js-product__price__discount').removeClass('product__price__discount-number');
    //                 }
    //                 else
    //                 {
    //                     $(main + '.js-product__price__discount').html(currOffer['DISCOUNT_NUMBER_FORMATTED']);
    //                     $(main + '.js-product__price__discount').addClass('product__price__discount-number');
    //                     $(main + '.js-product__price__discount').removeClass('product__price__discount-percent');
    //                 }
    //                 $(main + '.js-product__price__discount').removeClass('hidden');
    //                 $(main + '.js-product__price__discount-onlinePayment').addClass('hidden');
    //             }
    //             else
    //             {
    //                 // Показываем скидку на онлайн-оплату
    //                 $(main + '.js-product__price__discount').addClass('hidden');
    //                 $(main + '.js-product__price__discount-onlinePayment').removeClass('hidden');
    //             }
    //
    //
    //             if (currOffer['DISCOUNT_PERCENT'] > 0 || currOffer['DISCOUNT_NUMBER'] > 0)
    //                 $(main + '.js-product__price__discount').removeClass('hidden');
    //             else
    //                 $(main + '.js-product__price__discount').addClass('hidden');
    //
    //             // скрываем/показываем блок зачеркнутой цены
    //             if (currOffer['OLD_PRICE_CSS'] == '' && $(main + '.js-product__price-old').hasClass('hidden') == true)
    //                 $(main + '.js-product__price-old').removeClass('hidden');
    //             else if (currOffer['OLD_PRICE_CSS'] != '' && $(main + '.js-product__price-old').hasClass('hidden') == false)
    //                 $(main + '.js-product__price-old').addClass('hidden');
    //
    //             // наличие товара
    //             $(main + '.js-can-buy-title').html(currOffer['CAN_BUY_TITLE']);
    //
    //             // ссылки "Купить" и "Предзаказ"
    //             $(main + '.js-buy-button-link').attr('href', currOffer['BUY_LINK']);
    //             $(main + '.js-preorder-button-link').attr('href', currOffer['PREORDER_LINK']);
    //
    //             // скрываем/показываем блок "Заказать сейчас"
    //             if (currOffer['BUY_BUTTON_CSS'] == '' && $(main + '.js-buy-button-block').hasClass('hidden') == true)
    //                 $('.js-buy-button-block').removeClass('hidden');
    //             else if (currOffer['BUY_BUTTON_CSS'] != '' && $(main + '.js-buy-button-block').hasClass('hidden') == false)
    //                 $('.js-buy-button-block').addClass('hidden');
    //
    //             // скрываем/показываем блок "Оформить предзаказ"
    //             if (currOffer['PREORDER_BUTTON_CSS'] == '' && $(main + '.js-preorder-block').hasClass('hidden') == true)
    //                 $(main + '.js-preorder-block').removeClass('hidden');
    //             else if (currOffer['PREORDER_BUTTON_CSS'] != '' && $(main + '.js-preorder-block').hasClass('hidden') == false)
    //                 $(main + '.js-preorder-block').addClass('hidden');
    //
    //             // скрываем/показываем блок "В рассрочку"
    //             if ($(main + '.js-credit-form-block').length)
    //             {
    //                 if (currOffer['BUY_BUTTON_CSS'] == '' && $(main + '.js-credit-form-block').hasClass('hidden') == true)
    //                     $(main + '.js-credit-form-block').removeClass('hidden');
    //                 else if (currOffer['BUY_BUTTON_CSS'] != '' && $(main + '.js-credit-form-block').hasClass('hidden') == false)
    //                     $(main + '.js-credit-form-block').addClass('hidden');
    //             }
    //
    //             // Меняем Размеры и Вес
    //             $(main + '.js-product__subtitle__dimensions').html(currOffer['DIMENSIONS_LABEL']);
    //             $(main + '.js-product__weight_place').html(currOffer['WEIGHT_PLACE']);
    //             if (currOffer['WEIGHT_PLACE'] != '')
    //                 $(main + '.js-product__weight_place').removeClass('hidden');
    //             else
    //                 $(main + '.js-product__weight_place').addClass('hidden');
    //
    //             // Габариты
    //             $(main + '.js-product__gabarity').html(currOffer['GABARITY']);
    //             if (currOffer['GABARITY'] != '')
    //                 $(main + '.js-product__gabarity').removeClass('hidden');
    //             else
    //                 $(main + '.js-product__gabarity').addClass('hidden');
    //
    //             // Меняем описание комплекта белья
    //             if ($(main + '.js-select_cpb__item__description').length)
    //             {
    //                 $(main + '.js-select_cpb__item__description').html(currOffer['PREVIEW_TEXT']);
    //             }
    //
    //             // Сбербанк-кредит
    //             $('.js-product-sberbank__rent').html(currOffer['CREDIT_SBERBANK_RENT']);
    //             if (currOffer['CREDIT_SBERBANK_IS_SHOW'])
    //                 $('.js-product-sberbank').removeClass('hidden');
    //             else
    //                 $('.js-product-sberbank').addClass('hidden');
    //
    //             // GTM-событие изменение размера
    //             EndorphinGtm.changeSize({
    //                 'productCategory': currOffer['GTM_CATEGORY'],
    //                 'size': currOffer['VALUE'],
    //                 'productValue': currOffer['DISCOUNT_PRICE_GMT_FORMATTED'],
    //             });
    //             // Amplitude-событие изменение размера
    //             amplitude.getInstance().logEvent('size', {
    //                 'size': currOffer['VALUE'],
    //             });
    //         }
    //     }
    // };
    //

}

document.addEventListener("DOMContentLoaded", DOMready);