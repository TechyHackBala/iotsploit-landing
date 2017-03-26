/**
 * Created by M1rotvorez on 3/17/17.
 */

$('#select').select2({
		placeholder: "Choose type",
		minimumResultsForSearch: Infinity
});

$('input[name="file"]').change(function(){
		var fileName = $(this).val();
		fileName = fileName.replace('C:\\fakepath\\','');
		$('#file--name').html(fileName);
});

var controller = new ScrollMagic.Controller();
// var tween_projects = TweenMax.to(".why-item", 6, {marginTop: 0, autoAlpha: 1, scale: 1});

var tween_projects = new TimelineLite()
		.add(TweenMax.to("#why-item--1, #why-item--2", 1, {marginTop: 0, autoAlpha: 1, scale: 1, duration: 0}))
		.add(TweenMax.to("#why-item--3, #why-item--4", 1.5, {marginTop: 0, autoAlpha: 1, scale: 1, duration: 1}));

var scene = new ScrollMagic.Scene({
		tweenChanges: true,
		triggerElement: ".why-content",
		triggerHook: "onEnter",
		offset: 120
})
		.setTween(tween_projects)
		.addTo(controller);
