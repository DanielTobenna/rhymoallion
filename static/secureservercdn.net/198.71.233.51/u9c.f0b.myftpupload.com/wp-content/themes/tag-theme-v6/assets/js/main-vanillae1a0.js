import rallax from './rallax.js'

document.addEventListener('DOMContentLoaded', () => {
	window.onbeforeunload = () => {
		var el = document.querySelector('body');
		el.style['opacity'] = '0';
		window.scrollTo(0, 0)
	}

	//initBackgroundImgParallax ('.parallax-image1','.container-image1')
	//initBackgroundImgParallax ('.parallax-image2','.container-image2')

	/*initBackgroundImgParallax ('.parallax-header-img1','.container-header-img1')
	initBackgroundImgParallax ('.parallax-header-img2','.container-header-img2')
	initBackgroundImgParallax ('.parallax-header-img3','.container-header-img3')
	initBackgroundImgParallax ('.parallax-header-img4','.container-header-img4')*/
})

function initBackgroundImgParallax (imgObj, containerObj)
{
	const image = document.querySelector(imgObj)
	const imageContainer = document.querySelector(containerObj)
	const imageContainerRect = imageContainer.getBoundingClientRect()
	const winHeight = window.innerHeight

	const imageTop = -winHeight
	const imageHeight = imageContainerRect.height + (winHeight * 0.7)

	Object.assign(image.style, {
		position: 'relative',
		top: `${imageTop}px`,
		height: `${imageHeight}px`,
	})

	const imageParallax = rallax(image, {speed: 0.2, mobilePx: 600})
}

lax.addPreset("ubizzFadeInUp", function() {
	return { 
		 "data-lax-opacity": "(vh) 0, (vh*0.7) 1",
		 "data-lax-translate-y": "vh 100, (vh*0.8) 0 | offset=(vh*0.1)",
		 "data-lax-anchor": "self"
	}
})

lax.addPreset("ubizzFadeInUpNoOffset", function() {
	return { 
		 "data-lax-opacity": "(vh) 0, (vh*0.7) 1",
		 "data-lax-translate-y": "vh 100, (vh*0.8) 0",
		 "data-lax-anchor": "self"
	}
})