//= require jquery
//= require handlebars
//= require ember
//= require ember-data
//= require_self
//= require ./ola_magic

OlaMagic = Ember.Application.create();

if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}

$(document).ready(onPageLoad);


function onPageLoad() {

    $("#ember630").click(function() {
        $("#ember391" ).toggleClass("navigator-visible");
    });

    $("#ember553").click(function() {
        $("#ember554" ).toggleClass("open");
    });
}

