var HSTimeout	= 0;
var homeSwipper	= '';
var valuesSwipper	= '';
var teamSecondarySwipper	= '';
var testimonialsSwipper	= '';
var propertiesItemsPerPage	= 9;

jQuery(document).ready(function() {

	initFunctions();

	//var rellax = new Rellax('.rellax');
});

jQuery(window).resize(function(){
	initFunctions();
});

//jQuery(window).scroll(function(){
	//initFadeInOnScroll();
	//jQuery('.mouse-tracking').hide();
//});

function initFunctions ()
{
	if (jQuery(window).width() > 1024)
	{
		propertiesItemsPerPage = 9;
	}
	else
	{
		propertiesItemsPerPage = 6;
	}

	initMouseFunctions();
	initVerticalStripesHover();
	initHomeSwipper();
	initPropertiesFilterSwipper();
	initBlogPostsSwipper();
	initValuesSwipper();
	initTeamSecondarySwipper();
	initTestimonialsSwipper();
	initFooterHoverColorChange();
	initHomepageHeaderSlideshow();
	//initFadeInOnScroll();
	initMainMenu();
	initMainMenuHoverLayers();
	initHoverImagesText();
	initClickAndHold();
	closeModalLayer();
	initDarkModeFunctions();
	showMoreTeamMemberDetails();
	initContactForm();
	initPropertiesFilter();
	initPropertySwipper();
	initPropContactForm();
    initFixedHeader();
}

function initMainMenu ()
{
	var menuObj	= jQuery('.navigation-trigger');
	var menuClObj	= jQuery('.navigation-trigger-close');

	menuObj.click(function(){

		jQuery('.menu-container').addClass('still-animating');

		if (menuObj.hasClass('is-animation-active'))
		{
			console.log('MAIN MENU CURRENTLY ANIMATING - OPENING');
		}
		else
		{
			initClipHTML('clip');
			menuObj.addClass('is-clicked is-animation-active');
			jQuery('body').delay(200).fadeIn(100,function(){
				jQuery('.menu-container').addClass('is-active');
				initShowMenuElements('open');
				menuClObj.removeClass('is-active');
				menuObj.addClass('is-active').removeClass('is-clicked is-animation-active');
			});
		}
	});

	menuClObj.click(function(){
		if (menuClObj.hasClass('is-animation-active'))
		{
			console.log('MAIN MENU CURRENTLY ANIMATING - CLOSING');
		}
		else
		{
			initShowMenuElements('close');

			jQuery('body').delay(400).fadeIn(100,function(){
				initClipHTML('unclip');
				jQuery('.menu-container').removeClass('is-active');
				menuClObj.addClass('is-active').removeClass('is-clicked is-animation-active');
				menuObj.removeClass('is-active');
			});

			jQuery('body').delay(400).fadeIn(100,function(){
				jQuery('.menu-container').removeClass('still-animating');
			});
			//menuClObj.addClass('is-clicked is-animation-active');
		}
	});
}

function initShowMenuElements (what)
{
	jQuery('.menu-container .animated').each(function(index, el) {
		var delayT = (500);
		if (index > 0)
		{
			delayT = 0;
		}

		if (what == 'close')
		{
			delayT = 0;
		}

		var elObj = jQuery(this);
		jQuery('body').delay(delayT).fadeIn(function(){
			if (what == 'close')
			{
				elObj.removeClass('fadeIn').addClass('fadeOut');
			}
			else
			{
				elObj.removeClass('fadeOut').addClass('fadeIn');
			}
		});
	});
}

function initMainMenuHoverLayers ()
{
	jQuery('.menu-container-bottom .menu-content .menu-item').hover(
		function () {
			var i = jQuery(this).index();
			jQuery('.menu-container-bottom .menu-item-tag p, .menu-container-bottom .menu-item-image img, .menu-container-bottom .menu-content .menu-item a').removeClass('is-active');
			jQuery('a', this).addClass('is-active');
			jQuery('.menu-container-bottom .menu-item-tag p').eq(i).addClass('is-active');
			jQuery('.menu-container-bottom .menu-item-image img').eq(i).addClass('is-active');
		}, function () {
			jQuery('.menu-container-bottom .menu-item-tag p, .menu-container-bottom .menu-item-image img, .menu-container-bottom .menu-content .menu-item a').removeClass('is-active');
	});
}

function initHomepageHeaderSlideshow ()
{
	if (jQuery('.home-hero-slider').length > 0)
	{
		initHPSgoTo(0);
		initHPSNav();
	}
}
function initHPSgoTo (i)
{
	if (jQuery('.home-hero-slide:visible').length > 0)
	{
		jQuery('.home-hero-navigation > div').removeClass('is-active');
		jQuery('.home-hero-slide:visible').fadeOut(function(){
			jQuery('.home-hero-navigation > div').eq(i).addClass('is-active');
			jQuery('.home-hero-slide').eq(i).fadeIn();
			initHPStimeout();
		});
	}
	else
	{
		jQuery('.home-hero-navigation > div').eq(i).addClass('is-active');
		jQuery('.home-hero-slide').eq(i).fadeIn();
		initHPStimeout();
	}
}
function initHPStimeout ()
{
	clearTimeout(HSTimeout);
	HSTimeout = setTimeout(initNextHPSlide, 5000);
}
function initNextHPSlide ()
{
	var curI	= jQuery('.home-hero-navigation > div.is-active').index();
	var nextI	= 0;

	if ( (curI - (-1)) < jQuery('.home-hero-slide').length )
	{
		nextI = (curI - (-1))
	}

	initHPSgoTo(nextI);
}
function initHPSNav ()
{
	jQuery('.home-hero-navigation > div').click(function(){
		clearTimeout(HSTimeout);
		initHPSgoTo(jQuery(this).index());
	});
}

function initFadeInOnScroll() {
	jQuery('.toAnimate').each( function(i){
		var objPad = jQuery(this).outerHeight();
		if (jQuery(this).outerHeight() > 100) {
			objPad = 100;
		}

		var boObj = jQuery(this).offset().top + objPad;
		var boWin = jQuery(window).scrollTop() + jQuery(window).height();
		if( boWin > boObj ){
			jQuery(this).addClass(jQuery(this).data('classtoadd'));
		}
	});
}

function initVerticalStripesHover ()
{
	jQuery('.stripesHoverMarqee').hover(
		function() {
			jQuery('.ticker-wrap', this).addClass('is-active');
		}, function() {
			jQuery('.ticker-wrap', this).removeClass('is-active');
		}
	);
}

function initScrollerMarkee (obj, what)
{
	if (what == 'show')
	{
		obj.removeClass('is-hidden');
		updateMarqueeAmplitude(jQuery('p', obj));
	}
	if (what == 'hide')
	{
		obj.addClass('is-hidden');
		jQuery('p', obj).removeAttr('style');
	}
}

function initFooterHoverColorChange ()
{
	jQuery('.footerHoverColor').hover(
		function() {
			jQuery(this).parents('footer.footer').toggleClass('is-hovered');
		}
	);
}

function initClickAndHold ()
{
	var tOut = 0;
	jQuery('.button-hold').on('mousedown touchstart', function() {
		jQuery('body').addClass('noselect');
		jQuery('.buttom-hold').removeClass('trigger-mouse-inverted');
		tOut = setTimeout(openClickAndHoldPopup, 2050);
	}).on('mouseup mouseleave touchend', function() {
		jQuery('.buttom-hold').addClass('trigger-mouse-inverted');
		jQuery('body').delay(250).fadeIn(50,function(){
			jQuery('body').removeClass('noselect');
		});
		clearTimeout(tOut);
	});
}

function openClickAndHoldPopup ()
{
	console.log('POPUP LAYER OPENED');
	initClipHTML('clip');
	jQuery('.modal-background').css('top',jQuery(window).scrollTop()+'px').addClass('is-active');
	jQuery('body').delay(400).fadeIn(100,function(){
		jQuery('#home-hold').addClass('is-active');
	});
}

function closeModalLayer ()
{
	jQuery('.modal-trigger-close').click(function(){
		jQuery('.modal, .modal-background').fadeOut(250,function(){
			initClipHTML('unclip');
			jQuery('.modal, .modal-background').removeClass('is-active').removeAttr('style');
		});
	});
}

function initClipHTML (what)
{
	if (what == 'clip')
	{
		jQuery('html').addClass('is-clipped');
	}
	else
	{
		jQuery('html').removeClass('is-clipped');
	}
}

function initHomeSwipper ()
{
	homeSwipper = new Swiper('.home-properties-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			grabCursor: true,
		},
	});
}

function initPropertySwipper ()
{
	homeSwipper = new Swiper('.property-gallery-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		scrollbar: {
			el: '.swiper-scrollbar',
			hide: false,
		},
	});
}

function initPropertiesFilterSwipper ()
{
	propertiesFilterSwipper = new Swiper('.properties-filter-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
}

function initValuesSwipper ()
{
	valuesSwipper = new Swiper('.about-values-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		scrollbar: {
			el: '.swiper-scrollbar-about-values',
			draggable: true,
		},
	});
}

function initTeamSecondarySwipper ()
{
	teamSecondarySwipper = new Swiper('.team-secondary-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		scrollbar: {
			el: '.swiper-scrollbar-team-secondary',
			draggable: true,
		},
	});
}

function initTestimonialsSwipper ()
{
	testimonialsSwipper = new Swiper('.testimonials-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		scrollbar: {
			el: '.swiper-scrollbar-testimonials',
		},
	});
}

function initBlogPostsSwipper ()
{
	blogPostsSwipper = new Swiper('.blog-swiper', {
		slidesPerView: 1,
		spaceBetween: 0,
		pagination: {
			el: '.swiper-blog-pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + '<span class="slider-active"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="8px" height="6px" viewBox="0 0 8 6" enable-background="new 0 0 8 6" xml:space="preserve"><polygon points="4,0 8,6 0,6 "></polygon></svg></span></span>';
			},
		},
	});
}

function initHoverImagesText()
{
	jQuery('.hover-image-trigger > p').hover(
		function() {
			if( !jQuery(this).hasClass('is-active') )
			{
				jQuery('.hover-image-trigged img, .hover-image-trigger > p').removeClass('is-active');
				jQuery(this).addClass('is-active');
				jQuery('.hover-image-trigged img').eq(jQuery(this).index()).addClass('is-active');
			}
		}, function() {
			jQuery('.hover-image-trigged img, .hover-image-trigger > p').removeClass('is-active');
		}
	);
}

function checkIfScreenResolutionIs (what, direction)
{
	if (direction == '>')
	{
		if (window.innerWidth > what)
		{
			return True;
		}
		else
		{
			return False;
		}
	}
	if (direction == '=')
	{
		if (what == window.innerWidth)
		{
			return True;
		}
		else
		{
			return False;
		}
	}
	if (direction == '<')
	{
		if (window.innerWidth < what)
		{
			return True;
		}
		else
		{
			return False;
		}
	}
}

function initDarkModeFunctions ()
{
	jQuery('.dark-mode-button').click(function(){

		if (jQuery('body').hasClass('is-night'))
		{
			setCookie('theme_day', true, 7);
		}
		else
		{
			deleteCookie('theme_day');
		}

		jQuery('body').toggleClass('is-night is-day');
	});
}

function initMouseFunctions ()
{
	jQuery(document).mousemove(function(e){
		jQuery('.mouse-tracking').show();
		jQuery('.mouse-tracking').css({left:e.pageX, top:e.pageY});
	});

	initMouseLayer();

	jQuery(window).scroll(function(e){
		jQuery('.mouse-tracking').show();
		jQuery('.mouse-tracking').css({left:e.pageX, top:e.pageY});
	});
}

function initMouseLayer ()
{
	jQuery('.trigger-mouse-drag').hover(function() {
		jQuery('.mouse-tracking').addClass('mouse-drag');
	}, function() {
		jQuery('.mouse-tracking').removeClass('mouse-drag');
	});

	jQuery('.trigger-mouse-drag-hover').hover(function() {
		jQuery('.mouse-tracking').removeClass('mouse-drag').addClass('mouse-hover');
	}, function() {
		jQuery('.mouse-tracking').removeClass('mouse-hover').addClass('mouse-drag');
	});

	jQuery('.trigger-mouse-hover').hover(function() {
		jQuery('.mouse-tracking').addClass('mouse-hover');
	}, function() {
		jQuery('.mouse-tracking').removeClass('mouse-hover');
	});

	jQuery('.trigger-mouse-inverted').hover(function() {
		jQuery('.mouse-tracking').addClass('mouse-inverted');
	}, function() {
		jQuery('.mouse-tracking').removeClass('mouse-inverted');
	});
}

function setCookie(cName, cVal, expDays) {
	var d = new Date();
	d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
	var exp = "expires="+d.toUTCString();
	document.cookie = cName + "=" + cVal + ";" + exp + ";path=/";
}

function deleteCookie( cName ) {
	document.cookie = cName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function showMoreTeamMemberDetails ()
{
	if ( jQuery('.modalMemberFullDesc').length > 0 )
	{
		var el = document.querySelector('.modalMemberFullDesc');
		SimpleScrollbar.initEl(el);
	}

	jQuery('.showMoreTeamMemberDetailsTrigger').click(function(){

		jQuery('.modalMemberPhoto').parent().removeClass('is-active');

		var mainObj = jQuery(this).parents('.teamMeMberDetails');

		var name		= jQuery('.memberName', mainObj).text();
		var position	= jQuery('.memberPosition', mainObj).text();
		var full_desc	= jQuery('.additionalDetails div:last', mainObj).html();
		var linkedin	= jQuery('.additionalDetails div:first', mainObj).text();

		var photo		= jQuery('img', mainObj).attr('src');
		if (mainObj.data('popupimagesrc') != '')
		{
			photo = mainObj.data('popupimagesrc');
		}

		jQuery('.teamMemberModal .modalMemberName').text(name);
		jQuery('.teamMemberModal .modalMemberPosition').text(position);
		jQuery('.teamMemberModal .ss-content').html('<div class="'+ name +'">'+ full_desc +'</div>');
		jQuery('.teamMemberModal .modalMemberPhoto').attr('src', photo);
		jQuery('.teamMemberModal .modalMemberLinkedin').attr('href', 'https://linkedin.com/in/'+ linkedin);

		initClipHTML('clip');

		jQuery('.modal-background').addClass('is-active');
		jQuery('body').delay(950).fadeIn(50,function(){
			jQuery('.modalMemberPhoto').parent().addClass('is-active');
		});

		jQuery('body').delay(400).fadeIn(100,function(){
			/*var minibarObj = new MiniBar(document.getElementById('miniScrollBarContainer'), {
				onInit: function() {
			    	console.log('INI TMINIBAR');
			    },

			    onUpdate: function() {
			    	console.log('INI TMINIBAR2');
			    },

			    onScroll: function() {
			    	console.log('INIT MINIBAR');
			    },
			});*/

			jQuery('.teamMemberModal').addClass('is-active');
		});

		/*jQuery('body').delay(400).fadeIn(100,function(){
			jQuery('.teamMemberModal').addClass('is-active');

			var swiper = new Swiper('.swiper-container', {
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: true,
				scrollbar: {
				el: '.swiper-scrollbar',
			},
				mousewheel: true,
			});
			swiper.destroy();

			jQuery('body').delay(2000).fadeIn(100,function(){
				console.log('SWIPER UPDATED!!');
				var swiper = new Swiper('.swiper-container', {
					direction: 'vertical',
					slidesPerView: 'auto',
					freeMode: true,
					scrollbar: {
					el: '.swiper-scrollbar',
				},
					mousewheel: true,
				});
			});
		});*/
	});
}

var canSubmit = true;

function initContactForm ()
{
	if (jQuery('form#ubizzForm').length > 0)
	{
		jQuery('.sendForm').hide();
		jQuery('.initFormSubmit').show();
		initFancyCustomSelect();

		jQuery('.fancyLabelD').each(function(){
			if (jQuery(this).val().trim() != '')
			{
				jQuery(this).parents('.control').addClass('fl-active');
			}
		});
		jQuery('.fancyLabelD').focus(function(){
			jQuery(this).parents('.control').addClass('fl-active');
		});
		jQuery('.fancyLabelD').blur(function(){
			if (jQuery(this).val().trim() == '')
			{
				if (jQuery(this).not('.alreadyFilled'))
				{
					jQuery(this).parents('.control').removeClass('fl-active');
				}
			}
		});

		jQuery('.triggerSubmit').click(function(){
			cleanUpFormErrors();
			console.log('processForm CLIKED');
			if (canSubmit)
			{
				canSubmit = false;
				jQuery('.triggerSubmit').addClass('is-loading');
				validateForm();
			}
			else
			{
				console.log('ALREADY SUBMITTING');
			}
		});
	}
}

function resetWebform ()
{
	cleanUpFormErrors();
	cleanFormValues();
	//swapMessageLayer(0);
	canSubmit = true;
}

function validateForm ()
{
	var hasErrors = doFormValidation();
	if (hasErrors.length == 0)
	{
		processWebForm();
	}
	else
	{
		//showButtonError();
		jQuery('.triggerSubmit').removeClass('is-loading');
	}

	canSubmit = true;
}

function processWebForm()
{
	jQuery.post("/process-mail",jQuery("#ubizzForm").serialize())
	.done(function(data){
		if (data == '1')
		{
			swapMessageLayer(1);
			resetWebform();
			jQuery('.triggerSubmit').removeClass('is-loading');
		}
		else
		{
			if (data == '2') { jQuery('.serverErrors').text('Erro ao processar o seu pedido. Tente novamente').fadeIn(400); }
			else if (data == '3') { jQuery('.serverErrors').text('Erro de verificação do seu pedido. Tente novamente').fadeIn(400); }
			else if (data == '4') { jQuery('.serverErrors').text('Campos obrigatórios em falta! Tente novamente').fadeIn(400); }
			else if (data == '5') { jQuery('.serverErrors').text('Email inválido!. Tente novamente').fadeIn(400); }
			else if (data == '6') { jQuery('.serverErrors').text('Pedido não autorizado. Tente novamente').fadeIn(400); }
			else if (data == '7') { jQuery('.serverErrors').text('Erro no servidor. Tente novamente.').fadeIn(400); }
			else { jQuery('.serverErrors').text('Erro desconhecido. Tente novamente.').fadeIn(400); }
			//showButtonError();
		}
	});
}

function doFormValidation()
{
	var errors = [];

	var name = jQuery("input#name");
	if (jQuery.trim(name.val()) == "") {
		name.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">This is a mandatory field</p>');
		errors.push('name');
	}

	/*var company = jQuery("input#company");
	if (jQuery.trim(company.val()) == "") {
		company.addClass('is-error').after('<p class="help is-danger formErrorMsg"><?php echo pll__('Este campo é obrigatório'); ?></p>');
		errors.push('company');
	}*/

	var email = jQuery("input#email");
	if (jQuery.trim(email.val()) == "") {
		email.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">This is a mandatory field</p>');
		errors.push('email');
	} else {
		if (!validateEmail(jQuery.trim(email.val()))) {
			email.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">Invalid email address</p>');
			errors.push('email');
		}
	}

	var message = jQuery("textarea#message");
	if (jQuery.trim(message.val()) == "") {
		message.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">This is a mandatory field</p>');
		errors.push('message');
	}

	var agree = jQuery("input#agree");
	if ( !agree.is(':checked') ) {
		//agree.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">This is a mandatory field</p>');
		agree.parents('.fieldObj').addClass('is-error');
		errors.push('agree');
	}
	return errors;
}

function removeFieldErrorsOnBlur () {
	jQuery('#ubizzForm input, #ubizzForm textarea').blur(function(){
		if ( jQuery.trim(jQuery(this).val()) != '' )
		{
			jQuery(this).parents('.fieldObj').removeClass('is-error');
		}
	});
	jQuery('#ubizzForm input#agree').change(function(){
		if ( jQuery(this).is(':checked') )
		{
			jQuery(this).parents('.fieldObj').removeClass('is-error');
		}
	});
}

function cleanUpFormErrors() {
	jQuery(".fieldObj").removeClass('is-error');
	jQuery('.formErrorMsg').remove();
	jQuery('.serverErrors').hide().text('');
}

function cleanFormValues()
{
	jQuery("#ubizzForm input, #ubizzForm textarea").not('.dnc').val('');
	jQuery("#ubizzForm input#agree, #ubizzForm input#newsLetter").prop('checked',false).removeAttr('checked');
}

function swapMessageLayer(what)
{
	if (what == 1)
	{
		jQuery('.thankYouModalBkg').addClass('is-active');
		jQuery('body').delay(400).fadeIn(100,function(){
			jQuery('.thankYouModal').addClass('is-active');
		});
	}
	else
	{
		jQuery('.thank-you-modal').removeClass('is-active');
	}
}

function showButtonError()
{
	jQuery('.processForm').addClass('is-error');
	jQuery('body').delay(700).fadeIn(10,function(){
		jQuery('.processForm').removeClass('is-error');
	});
}

function validateEmail(sEmail) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(sEmail)) {
		return true;
	}
	else {
		return false;
	}
}

function initFancyCustomSelect ()
{
	jQuery('#iAmA').focus(function(){
		jQuery(this).parents('.fieldObj').addClass('fd-active');
		jQuery('#fancyDropdown').addClass('this-is-open');
	});

	jQuery('#fancyDropdown span').click(function(){
		jQuery('#iAmA').val(jQuery(this).data('optionval')).parents('.fieldObj').removeClass('fd-active');
		jQuery('#iAmA').parents('.control').addClass('fl-active');
	});
}

function initPropertiesFilter ()
{
	initPropertiesListPagination(false);
	showMorePropertiesTrigger ();
	initPropertiesNav('0');
	initShowHideMorePropertiesButton(false);

	jQuery('.propertiesFilterTrigger').click(function() {
		var triggerObj = jQuery(this);

		if ( !triggerObj.hasClass('is-active') )
		{
			initPropertiesNav(triggerObj);

			jQuery('#propFilterType').val(triggerObj.data('filtertype'));
			initPropertiesListPagination(true);
			initShowHideMorePropertiesButton(triggerObj.data('filtertype'));
		}
	});
}

function initPropertiesNav (obj)
{
	if (obj == 0)
	{
		if (jQuery('#propFilterType').val() == 'lease')
		{
			obj = jQuery('.isLeaseProperiesNav');
		}
		else if (jQuery('#propFilterType').val() == 'sale')
		{
			obj = jQuery('.isSaleProperiesNav');
		}
		else
		{
			obj = jQuery('.isAllProperiesNav');
		}
	}

	jQuery('.propertiesFilterTrigger').removeClass('is-active');
	obj.addClass('is-active');
}

function showMorePropertiesTrigger ()
{
	jQuery('.showMorePropertiesDetailsTrigger').click(function(){
		console.log('SHOW ME MORE...');
		jQuery('#currentPage').val( (jQuery('#currentPage').val() - (-1)) );
		initPropertiesListPagination(false);
	});
}

function initPropertiesListPagination (containerAnim)
{
	var curPage = jQuery('#currentPage').val();
	var filterT = jQuery('#propFilterType').val();

	if (containerAnim)
	{
		jQuery('.properiesListContainer').animate({opacity: 0}, 250, function() {
			jQuery('.is-property-list').hide();
			if (filterT == 'all')
			{
				jQuery('.is-property-list').slice(0, (propertiesItemsPerPage * curPage) ).show();
			}

			if (filterT == 'sale')
			{
				jQuery('.is-property-list.is-sale').slice(0, (propertiesItemsPerPage * curPage) ).show();
			}

			if (filterT == 'lease')
			{
				jQuery('.is-property-list.is-lease').slice(0, (propertiesItemsPerPage * curPage) ).show();
			}

			jQuery('.properiesListContainer').delay(100).animate({opacity: 1}, 250, function(){
				initShowHideMorePropertiesButton(filterT);
			});
		});
	}
	else
	{
		if (filterT == 'all')
		{
			jQuery('.is-property-list').slice(0, (propertiesItemsPerPage * curPage) ).fadeIn();
		}

		if (filterT == 'sale')
		{
			jQuery('.is-property-list.is-sale').slice(0, (propertiesItemsPerPage * curPage) ).fadeIn();
		}

		if (filterT == 'lease')
		{
			jQuery('.is-property-list.is-lease').slice(0, (propertiesItemsPerPage * curPage) ).fadeIn();
		}

		jQuery('.properiesListContainer').delay(100).animate({opacity: 1}, 250,function(){
			initShowHideMorePropertiesButton(filterT);
		});
	}
}

function initShowHideMorePropertiesButton (filterT)
{
	var loadMoreButtonHide = false;

	if (!filterT)
	{
		filterT = jQuery('#propFilterType').val();
	}

	console.log('SHOW ONLY - '+ filterT);

	if (filterT == 'all' && jQuery('.is-property-list:hidden').length == 0)
	{
		loadMoreButtonHide = true;
	}

	if (filterT == 'sale' && jQuery('.is-property-list.is-sale:hidden').length == 0)
	{
		loadMoreButtonHide = true;
	}

	if (filterT == 'lease' && jQuery('.is-property-list.is-lease:hidden').length == 0)
	{
		loadMoreButtonHide = true;
	}

	if (loadMoreButtonHide)
	{
		jQuery('.loadMoreProperties').hide();
		console.log('NO MORE ITEMS');
	}
	else
	{
		jQuery('.loadMoreProperties').show();
		console.log('HAVE MORE ITEMS');
	}
}





var canSubmitProp = true;

function initPropContactForm ()
{
	if (jQuery('form#ubizzFormP').length > 0)
	{
		jQuery('.sendForm').hide();
		jQuery('.initFormSubmit').show();

		jQuery('.fancyLabelD').each(function(){
			if (jQuery(this).val().trim() != '')
			{
				jQuery(this).parents('.control').addClass('fl-active');
			}
		});
		jQuery('.fancyLabelD').focus(function(){
			jQuery(this).parents('.control').addClass('fl-active');
		});
		jQuery('.fancyLabelD').blur(function(){
			if (jQuery(this).val().trim() == '')
			{
				if (jQuery(this).not('.alreadyFilled'))
				{
					jQuery(this).parents('.control').removeClass('fl-active');
				}
			}
		});

		jQuery('.triggerSubmit').click(function(){
			cleanUpFormPropErrors();
			console.log('processForm CLIKED');
			if (canSubmitProp)
			{
				canSubmitProp = false;
				jQuery('.triggerSubmit').addClass('is-loading');
				validatePropForm();
			}
			else
			{
				console.log('ALREADY SUBMITTING');
			}
		});
	}
}

function resetPropWebform ()
{
	cleanUpFormPropErrors();
	cleanFormPropValues();
	//swapMessageLayer(0);
	canSubmitProp = true;
}

function validatePropForm ()
{
	var hasErrors = doFormPropValidation();
	if (hasErrors.length == 0)
	{
		processPropWebForm();
	}
	else
	{
		//showButtonError();
		jQuery('.triggerSubmit').removeClass('is-loading');
	}

	canSubmitProp = true;
}

function processPropWebForm()
{
	jQuery.post("/process-mail-prop",jQuery("#ubizzFormP").serialize())
	.done(function(data){
		if (data == '1')
		{
			swapPropMessageLayer(1);
			resetPropWebform();
			jQuery('.triggerSubmit').removeClass('is-loading');
		}
		else
		{
			if (data == '2') { jQuery('.serverErrors').text('Erro ao processar o seu pedido. Tente novamente').fadeIn(400); }
			else if (data == '3') { jQuery('.serverErrors').text('Erro de verificação do seu pedido. Tente novamente').fadeIn(400); }
			else if (data == '4') { jQuery('.serverErrors').text('Campos obrigatórios em falta! Tente novamente').fadeIn(400); }
			else if (data == '5') { jQuery('.serverErrors').text('Email inválido!. Tente novamente').fadeIn(400); }
			else if (data == '6') { jQuery('.serverErrors').text('Pedido não autorizado. Tente novamente').fadeIn(400); }
			else if (data == '7') { jQuery('.serverErrors').text('Erro no servidor. Tente novamente.').fadeIn(400); }
			else { jQuery('.serverErrors').text('Erro desconhecido. Tente novamente.').fadeIn(400); }
			//showButtonError();
		}
	});
}

function doFormPropValidation()
{
	var errors = [];

	var name = jQuery("input#name");
	if (jQuery.trim(name.val()) == "") {
		name.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">This is a mandatory field</p>');
		errors.push('name');
	}

	var email = jQuery("input#email");
	if (jQuery.trim(email.val()) == "") {
		email.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">This is a mandatory field</p>');
		errors.push('email');
	} else {
		if (!validateEmail(jQuery.trim(email.val()))) {
			email.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">Invalid email address</p>');
			errors.push('email');
		}
	}

	var message = jQuery("textarea#message");
	if (jQuery.trim(message.val()) == "") {
		message.parents('.fieldObj').addClass('is-error').append('<p class="help is-danger formErrorMsg">This is a mandatory field</p>');
		errors.push('message');
	}

	return errors;
}

function removeFieldErrorsOnBlurProp () {
	jQuery('#ubizzFormP input, #ubizzFormP textarea').blur(function(){
		if ( jQuery.trim(jQuery(this).val()) != '' )
		{
			jQuery(this).parents('.fieldObj').removeClass('is-error');
		}
	});
}

function cleanUpFormPropErrors() {
	jQuery(".fieldObj").removeClass('is-error');
	jQuery('.formErrorMsg').remove();
	jQuery('.serverErrors').hide().text('');
}

function cleanFormPropValues()
{
	jQuery("#ubizzFormP input, #ubizzFormP textarea").not('.dnc').val('');
}

function swapPropMessageLayer(what)
{
	if (what == 1)
	{
		jQuery('.thankYouModalBkg').addClass('is-active');
		jQuery('body').delay(400).fadeIn(100,function(){
			jQuery('.thankYouModal').addClass('is-active');
		});
	}
	else
	{
		jQuery('.thank-you-modal').removeClass('is-active');
	}
}

function showPropButtonError ()
{
	jQuery('.processForm').addClass('is-error');
	jQuery('body').delay(700).fadeIn(10,function(){
		jQuery('.processForm').removeClass('is-error');
	});
}

function initFixedHeader ()
{
    var lastScrollTop = 0;
    var curYoffset = 0;

    var box = document.querySelector('header');
    var bHeight = box.offsetHeight;

    document.addEventListener("scroll", function() {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        curYoffset = curYoffset - (lastScrollTop - st);
        if (st > lastScrollTop)
        {
            // DOWN
            if (curYoffset > bHeight)
            {
                curYoffset = bHeight;
            }
        }
        else
        {
            // UP
            if (curYoffset < 0)
            {
                curYoffset = 0;
            }
        }

        box.style['transform'] = 'translateY(-'+ curYoffset +'px)';
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
}


















function getStringWidth(str) {

	var span = document.createElement("span");
	span.innerText = str;
	span.style.visibility = "hidden";

	var body = document.getElementsByTagName("body")[0];
	body.appendChild(span);
	var textWidth = span.offsetWidth;
	body.removeChild(span);

	return textWidth;
}

function getAnimationRule(animationName) {
	var KEYFRAME_RULE = window.CSSRule.WEBKIT_KEYFRAMES_RULE ||
		window.CSSRule.MOZ_KEYFRAMES_RULE ||
		window.CSSRule.KEYFRAMES_RULE;

	var stylesheets = document.styleSheets;
	for (var i = 0 ; i < stylesheets.length ; i++) {
		var rules = stylesheets[i].cssRules;
		for (var j = 0 ; j < rules.length ; j++) {
			var rule = rules[j];
			if (rule.type == KEYFRAME_RULE && rule.name == "marquee") {
				return rule;
			}
		}
	}
}

function updateMarqueeAmplitude(element) {

	var animationName = "marquee";
	var marqueeRule = getAnimationRule(animationName);
	if (null == marqueeRule) {
		return;
	}

	// remove the old animation (if any)
	element.style.webkitAnimationName = "none";

	var textWidth = getStringWidth(element.innerText);

	// update the values of our keyframe animation
	marqueeRule.deleteRule("0%");
	marqueeRule.deleteRule("100%");
	marqueeRule.insertRule('0% { text-indent: ' + element.offsetWidth + 'px; }');
	marqueeRule.insertRule('100% { text-indent: ' + -textWidth + 'px; }');

	// re-assign the animation (to make it run)
	element.style.webkitAnimationName = animationName;
}
