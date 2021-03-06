(function($){ //will need to detect jQuery
	$(function() {
		$('#hide_profiler').on("click",function(e){
			if($('#hide_profiler').attr("herf") == "#")e.preventDefault();

			if($('#hide_profiler').text().trim()=="Hide"){$('#hide_profiler').html("<i class='fa-eye'></i>Show");}
			else if($('#hide_profiler').text().trim()=="Show"){$('#hide_profiler').html("<i class='fa-eye-slash'></i>Hide");}
			$("#profiler").toggleClass("active");
		});
	});
})(jQuery);


/*
$('hide_profiler').observe('click', function(event) {
	$$('hide_profiler').each(function(element) {
		element.toggleClassName("hidden_profiler");
		if (element.attr("herf") == "#") {event.stop();}
	});
	$$("#profiler").each(function(element) {
		element.toggleClassName("active");
	});
    
});
*/

$$("#profiler .toggle").each(function(element) {
    element.observe("click", function(event) {
        Event.element(event).up("li").toggleClassName("collapsed");
        event.stop();
    })
});
$('expand-all').observe('click', function(event) {
    $$("#profiler .has-children").each(function(element) {
        element.removeClassName("collapsed");
    });
    event.stop();
});
$('collapse-all').observe('click', function(event) {
    $$("#profiler .has-children").each(function(element) {
        element.addClassName("collapsed");
    });
    event.stop();
});
function filterTree(threshold) {
    $$('#treeView li').each(function(element) {
        if (parseInt(element.readAttribute('duration')) < threshold) {
            element.addClassName('filtered');
        } else {
            element.removeClassName('filtered');
        }
    })
}
$('duration-filter-form').observe('submit', function(event) {
    var value = parseInt($('duration-filter').value);
    filterTree(value);
    value = Math.sqrt(value * 1000);
    profilerslider.setValue(value);
    event.stop();
});

var initSliderValue = parseInt($('duration-filter').value);

filterTree(initSliderValue);

function cubicScale(x) {
    return 1/1000 * x * x;
}
function cubicScaleReverse(y) {
    return Math.sqrt(y * 1000);
}

var profilerslider = new Control.Slider($('p-handle'), $('p-track'), {
    axis: 'horizontal',
    range: $R(0,1000),
    alignX: 3,
    sliderValue: cubicScaleReverse(initSliderValue),
    onSlide: function(param) {
        $('duration-filter').value = cubicScale(param).round();
    },
    onChange: function(param) {
        filterTree(cubicScale(param));
    }
});
$$("#profiler .info").each(function(element) {
    element.observe("click", function(event) {
        var liElement = Event.element(event).up("li");
        liElement.toggleClassName("selected");
        $$('#treeView li').each(function(element) {
            if (element != liElement) {
                element.removeClassName('selected');
            }
        });
        event.stop();
    })
});