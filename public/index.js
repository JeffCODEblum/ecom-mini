var stars;

$(".img-thmb").click(function(e) {
    e.preventDefault();
    $(".main-img").attr("src", $(e.target).data("src"));
});

$("#leave-review-btn").click(function(e) {
    e.preventDefault();
    $("#leave-review-div").hide();
    $("#review-form-div").show();
});

$(".star-btn").click(function(e) {
    e.preventDefault();
    var index = $(e.target).data('index');
    stars = index;
    for (var i = 1; i < 6; i++) {
        $("#star-btn-" + i).removeClass("checked");
    }
    for (var i = 1; i <= index; i++) {
        $("#star-btn-" + i).addClass("checked");
    }
});

$("#comment-btn").click(function(e) {
    var name = $("#name-input").val();
    var email = $("#email-input").val();
    var comment = $("#comment-input").val();

    if (!(name && email && comment)) {
        return;
    }
    var payload = {
        name: name,
        email: email,
        stars: stars,
        comment: comment
    };

    $.ajax({
        type: 'POST',
        url: 'https://localhost:3000/post-comment',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(payload)
    }).done(function(data) {
        $('#review-form-div').hide();
        $('#review-success-div').show();
    });
});