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
                    $('[data-dropdown-menu]', this).stop(true, false).slideDown(400);
                }, function () {
                    $.data(this, 'timer', setTimeout($.proxy(function () {
                        $('[data-dropdown-menu]', this).stop(true, false).slideUp(400);

                        self.showInfoForActiveDropdownItem.call($("[data-dropdown-menu-new='true']"));

                    }, this), 200));
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
    accordeonBase.setListener(".js-mobile-menu-inner-wrap", false);

    accordeonBase.slideUpOnLoad(".js-faq-top-wrap", false);
    accordeonBase.setListener(".js-faq-top-wrap", false);

    var overleyCheck = false;

    var overlayMain = (function () {



            $("[data-overlay]").on("click", function () {
                if($("[data-overlay]").hasClass("under-all")) {
                    $("[data-overlay]").removeClass("under-all");
                }

                if($("[data-mobile-menu-btn]").hasClass("active") ) {
                    mobileMenu.toggleShow.call($("[data-mobile-menu-btn]"));
                }
                if($("[data-basket-modal]").hasClass("active") ) {
                    $("[data-basket-modal]").removeClass("active");
                    overlayMain.toggleOverlayShowHide();
                }
            });


        return {
            toggleOverlayShowHide: function (underAll) {
                if(typeof underAll !== typeof undefined && underAll) {
                    $("[data-overlay]").toggleClass("under-all");
                }



                $("[data-overlay]").toggleClass("active");
                $("html").toggleClass("overflow-hidden");
                if($("[data-overlay]").hasClass("active")) {
                     overleyCheck = true;

                } else {
                    overleyCheck = false;
                }
            },
        }
    })();

    // Мобильное меню
    var mobileMenu = (function () {
        return {
            addlistenerOnBtn: function () {
                var self = this;
                $("[data-mobile-menu-btn]").on("click", function () {

                    if(overleyCheck == false || $("[data-mobile-menu]").hasClass("active")) {
                        self.toggleShow.call(this);
                    }
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
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            infinite: false,
            responsive: [
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

        // Инициализация слайдера self-made
        $(".js-self-made-wrap").slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        // Инициализация слайдера self-made-advantages
        $(".js-self-made-advantages-list").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });


    }

    // Инициализация слайдера идеальная пара в корзине
    $(".js--more-products-list").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        // responsive: [
        //     {
        //         breakpoint: 767,
        //         settings: {
        //             slidesToShow: 3,
        //         }
        //     },
        //     {
        //         breakpoint: 575,
        //         settings: {
        //             slidesToShow: 1,
        //             centerMode: true,
        //             variableWidth: true,
        //         }
        //     }
        // ]
    });

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

        ChangeOffer(offerId);

    });

    if (typeof offersList !== typeof undefined && offersList) {

        offersList = JSON.parse(offersList);
    }

    // Обработчик смены ТП в деталке товара
    function ChangeOffer(offerId) {
        if (offerId > 0) {
            var currOffer = {};
            for (var i in offersList) {
                if (offersList[i]["data"]['PRODUCT_ID'] == offerId) {
                    currOffer = offersList[i]["data"];

                    break;
                }
            }

            if (currOffer['PRODUCT_ID'] > 0) {

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

                // Показываем скидку в селекте размеров
                var $discountSize = $("[data-choice-size-dropdown-active-item-discount]");
                if (currOffer['DISCOUNT'] > 0) {

                    if ($discountSize.hasClass("hide")) {
                        $discountSize.removeClass("hide");
                    }
                    $discountSize.html("- " + currOffer['DISCOUNT'] + " " + currOffer['DISCOUNT_TYPE']);
                } else {
                    if (!$discountSize.hasClass("hide")) {
                        $discountSize.addClass("hide");
                    }
                }

                // Меняем Размеры
                var $gabarity = $("[data-choice-size-value-size]");
                if (currOffer['GABARITY'] != '') {

                    if ($gabarity.hasClass("hide")) {
                        $gabarity.removeClass("hide")
                    }
                    $gabarity.html(currOffer['GABARITY']);
                } else {
                    if (!$gabarity.hasClass("hide")) {
                        $gabarity.addClass("hide")
                    }
                }

                // Меняем Размеры вес
                var $weight = $("[data-choice-size-value-weight]");
                if (currOffer['GABARITY'] != '') {

                    if ($weight.hasClass("hide")) {
                        $weight.removeClass("hide")
                    }
                    $weight.html(currOffer['WEIGHT']);
                } else {
                    if (!$weight.hasClass("hide")) {
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

    $(".js--card-info-tabs, .js--sets-tabs").on("click", "[data-tabs-toggle]", function (e) {
        tabsStart.call(this, e);
    });

    //Включаем видео при скролле
    function presentation() {

        var presentation_video = document.querySelector("[data-characteristics-video]"),
            videoPlayed = false, // проигралось ли видео
            hintOpen;

        $(window).on('scroll', function (e) {
            var windowHeight = $(window).height(); // высота окна
            var posVideo = presentation_video.getBoundingClientRect().top; //Текущая позиция видео относительно окна
            if (!videoPlayed && (posVideo < windowHeight - 300)) {
                videoPlayed = true;

                setTimeout(function () {
                    if (presentation_video) {
                        presentation_video.play();
                    }
                }, 1000);

            }
        });

    }

    if ($('[data-characteristics-video]').length) {
        presentation();
    }

    // Корзина

    //Показываем модалку корзины
    $("[data-actions-btn-basket]").on("click", function () {
        if(overleyCheck == false || $("[data-basket-modal]").hasClass("active")) {
            overlayMain.toggleOverlayShowHide(true);
            $("[data-basket-modal]").toggleClass("active");
        }

    });

    //Скрываем модалку корзины
    $("[data-basket-modal-close]").on("click", function () {
        overlayMain.toggleOverlayShowHide(true);
        $("[data-basket-modal]").toggleClass("active");
    });


    // Гасим нажатие enter
    $('[data-basket-modal-form]').keydown(function(event){
        if (event.keyCode == 13)
        {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    });











    // Корзина минус кол-во
    $('[data-counter-amount-wrap]').on('click', '[data-counter-amount-btn="minus"]', function(e){
        var $input = $(e.delegateTarget).find('[data-counter-amount-value]');
        var basketId = parseInt($input.data('counter-amount-basket-id'));
        var productId = parseInt($input.data('counter-amount-product-id'));
        var currCount = parseInt($input.val());

        // if (isNaN(basketId) || isNaN(currCount)) return;

        if (currCount > 1)
        {
            currCount -= 1;
            $input.val(currCount);
            // BluesleepBasketUpdate({
            //     action: 'updateQuantity',
            //     basketId: basketId,
            //     productId: productId,
            //     currCount: currCount
            // });
        }
    });

    // Корзина плюс кол-во
    $('[data-counter-amount-wrap]').on('click', '[data-counter-amount-btn="plus"]', function(e){
        var $input = $(e.delegateTarget).find('[data-counter-amount-value]');
        var basketId = parseInt($input.data('counter-amount-basket-id'));
        var productId = parseInt($input.data('counter-amount-product-id'));
        var currCount = parseInt($input.val());
       // if (isNaN(basketId) || isNaN(currCount)) return;

        currCount += 1;
        $input.val(currCount);
        // BluesleepBasketUpdate({
        //     action: 'updateQuantity',
        //     basketId: basketId,
        //     productId: productId,
        //     currCount: currCount
        // });
    });


    // Корзина "изменение руками" кол-во
    $('[data-counter-amount-value]').on('input', function(){
        var $input = $(this);
        var basketId = parseInt($input.data('counter-amount-basket-id'));
        var productId = parseInt($input.data('counter-amount-product-id'));
        var currCount = parseInt($input.val());
       // if (isNaN(basketId) || isNaN(currCount)) return;

        // BluesleepBasketUpdate({
        //     action: 'updateQuantity',
        //     basketId: basketId,
        //     productId: productId,
        //     currCount: currCount
        // });
    });

    $('[data-counter-amount-value]').on("change keyup input click", function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });

    $('[data-counter-amount-value]').on("change", function () {
        this.value = this.value.replace(/^0+/, "");

        if (this.value == "") {
            this.value = 1;
        }
    });


    // Корзина удаление товара
    $('[data-basket-modal-form]').on('click', '[data-basket-modal-remove]', function(){
        var basketId = parseInt($(this).data('counter-amount-basket-id'));
        var productId = parseInt($(this).data('counter-amount-product-id'));
        var parentProductId = parseInt($(this).data('parent-product-id'));
       // if (isNaN(basketId)) return;

        //BX.Sale.OrderAjaxComponent.startLoader();
        $(this).closest('[data-basket-modal-item]').remove();
        // BluesleepBasketUpdate({
        //     action: 'removeItem',
        //     basketId: basketId
        // });

        // VK Pixel
        // EndorphinGtm.VK_Pixel.remove_from_cart({
        //     products: [{id: parentProductId}]
        // });
    });

    // Применить купон
    $('[data-basket-modal-form]').on('click', '#order__promocode_apply', function(){
        var coupon = $('#bluesleep_coupon').val();
        if (coupon == '')
            return;

        BluesleepBasketUpdate({
            action: 'setCoupon',
            coupon: coupon
        });
    });


    //Блок с промо кодом
    $("[data-promo-wrap]").on("click", "[data-promo-top]",  function(e) {
        var $this = $(this);
        $this.removeClass("active");
        $(e.delegateTarget).find("[data-promo-bottom]").addClass("active");
    });

    $("[data-promo-wrap]").on("click", "[data-promo-btn-submit]",  function(e) {
        var inputValue = $(e.delegateTarget).find("[data-promo-input]").val();
        var wrapBottom = $(e.delegateTarget).find("[data-promo-bottom]");
        var promoPart = $(this).closest("[data-promo-outer-wrap]").find("[data-promo-part]");
        if(typeof  inputValue !== typeof undefined && inputValue) {
            wrapBottom.removeClass("active");
            promoPart.addClass("active");
            promoPart.find("[data-promo-part-title]").text(inputValue);
        }

    });

    $("[ data-promo-part]").on("click", "[data-promo-part-btn]", function(e) {
        $(e.delegateTarget).removeClass("active");
        $(this).closest("[data-promo-outer-wrap]").find("[data-promo-top]").addClass("active");
    })

    //Переключаем платежные системы
    $("[data-basket-payment-list]").on("click", "[data-basket-payment-inner-wrap]", function (e) {
        var $this = $(this);
        if(!$this.hasClass("active")) {
            $(e.delegateTarget).find("[data-basket-payment-inner-wrap]").removeClass("active");
            $this.addClass("active");
        }
    });





    /*




        // "Корзина" изменение ТП
        $('#bx-soa-order-form').on('change', '.js-select__control', function(){
            var basketId = parseInt($(this).data('basket-id'));
            var productId = parseInt($(this).val());
            if (isNaN(basketId)) return;

            BX.Sale.OrderAjaxComponent.startLoader();
            BluesleepBasketUpdate({
                action: 'updateProductId',
                basketId: basketId,
                productId: productId
            });
        });







        // "Идеальная пара" изменение ТП
        $('#bx-soa-order-form').on('change', '.js-select-complect__control', function(){
            var productId = parseInt($(this).val());
            if (isNaN(productId)) return;
            BX.Sale.OrderAjaxComponent.startLoader();
            BluesleepBasketUpdate({
                action: 'updateComplectProductId',
                productId: productId
            });
        });

        // "Идеальная пара" добавление ТП в корзину
        $('#bx-soa-order-form').on('click', '.js-add-complect', function(){
            var productId = parseInt($(this).attr('data-productId'));
            var parentProductId = parseInt($(this).attr('data-parent-productId'));
            BX.Sale.OrderAjaxComponent.startLoader();
            BluesleepBasketUpdate({
                action: 'addComplectProduct',
                productId: productId
            });

            // VK Pixel
            EndorphinGtm.VK_Pixel.add_to_cart({
                products: [{id: parentProductId}]
            });
        });

        // При первой загрузке проверяем нужно ли обновить заказ
        if (NEED_UPDATE_PAYMENT == 'Y')
        {
            BluesleepBasketUpdate({
                action: 'changePayment',
                paySystemId: $('[name="PAY_SYSTEM_ID"]:checked').val()
            });
        }








/*

function BluesleepBasketUpdate(data)
{
    if (data == undefined)
        return;

    // var typing = BX.Sale.OrderAjaxComponent.typingTimer || false;
    // if(typing)
    //     clearTimeout(typing);
    //
    // BX.Sale.OrderAjaxComponent.typingTimer = setTimeout(function(){

        var preventAction = data['action'];
        var url = '/local/ajax/basket.php';

        BX.Sale.OrderAjaxComponent.startLoader();
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function(data)
            {
                // Аналитика
                mindbox("async", {
                    operation: "SetCartList40",
                    data: {
                        productList: data['mindboxProductList']
                    },
                    onSuccess: function() {},
                    onError: function(error) {console.log(error)}
                });

                // Если удалили последний товар
                if ($('.order-item__remove').length == 0)
                {
                    window.location.reload();
                    return;
                }

                // Обновляем кол-во товара в шапке
                if (data['countProductInBasket'] > 0)
                    $('.js-order-button__count').html(data['countProductInBasket']);

                // Перезагружаем страницу заказа
                BleesleepReloadOrder(preventAction);
            },
            dataType: 'json'
        });
    // }, 1200);
}

function BleesleepReloadOrder(preventAction)
{
    BX.Sale.OrderAjaxComponent.startLoader();

    var data = {};
    data['AJAX_REQUEST'] = 'Y';
    data['COUPON'] = $('#bluesleep_coupon').val();
    data['PREVENT_ACTION'] = preventAction;
    data['BASKET_COMPLECT_OFFERS'] = [];
    $('[name="BASKET_COMPLECT_OFFERS[]"]').each(function(){
        data['BASKET_COMPLECT_OFFERS'].push($(this).val());
    });

    $.ajax({
        url: window.location.href,
        type: 'POST',
        data: data,
        success: function(data)
        {
            $('#js-order__cart').html(data);
            BX.Sale.OrderAjaxComponent.endLoader();
        },
        dataType: 'html'
    });


}

*/


};


document.addEventListener("DOMContentLoaded", DOMready);