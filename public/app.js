var $animation_elements = $(".animation-element");
var $window = $(window);
function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = window_top_position + window_height;

    $.each($animation_elements, function () {
        var $element = $(this);
        var element_height = $element.outerHeight();

        var element_top_position = $element.offset().top;
        var element_bottom_position = element_top_position + element_height;

        //check to see if this current container is within viewport
        if (
            element_bottom_position >= window_top_position &&
            element_top_position <= window_bottom_position
        ) {
            $element.addClass("in-view");
        } else {
            $element.removeClass("in-view");
        }
    });

    if (
        $("a.sign-up").offset().top + $("a.sign-up").outerHeight() >=
        window_top_position
    ) {
        $(".sign-in-button").css({ display: "none" });
        
    } else {
        $(".sign-in-button").fadeIn()
    }
}

$window.on("scroll resize", function () {
    check_if_in_view();
});
$window.trigger("scroll");
$(document).ready(function () {
    $.get(
        "https://api.edgeboost.io/api/v2/states/whitelist",
        function (data, status) {
            if (status) {
                var state_codes = [];
                var state_data = data || [];
                for (var i = 0; i < state_data.length; i++) {
                    state_codes.push(data[i].code); // Changed from .name to .code
                }
                $("#whitelist_sections").html(state_codes.join(", ") + ".");
            }
        }
    );
});