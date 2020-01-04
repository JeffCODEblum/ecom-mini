var stars = 5;

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
        url: 'https://localhost:443/post-comment',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(payload)
    }).done(function(data) {
        $('#review-form-div').hide();
        $('#review-success-div').show();
    });
});


function postPayment(nonce) {
    fetch('process-payment', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                nonce: nonce
            })
        })
        .catch(err => {
            alert('Network error: ' + err);
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorInfo => Promise.reject(errorInfo));
            }
            return response.text();
        })
        .then(data => {
            console.log(JSON.stringify(data));
            alert('Payment complete successfully!\nCheck browser developer console for more details');
        })
        .catch(err => {
            console.error(err);
            alert('Payment failed to complete!\nCheck browser developer console for more details');
        });
}

const paymentForm = new SqPaymentForm({
    applicationId: "sandbox-sq0idb-E12Nhkfh49gLtlSnpfuODw",
    inputClass: 'sq-input',
    autoBuild: false,
    inputStyles: [{
        fontSize: '16px',
        lineHeight: '24px',
        padding: '16px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
    }],
    cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Card Number'
    },
    cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
    },
    expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
    },
    postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postal'
    },
    callbacks: {
        cardNonceResponseReceived: function (errors, nonce, cardData) {
            if (errors) {
                console.log(errors);
                return;
            }
            else {
                console.log(nonce, cardData);
                postPayment(nonce);
            }
        }
    }
});

function onGetCardNonce(event) {
    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();
    // Request a nonce from the SqPaymentForm object
    paymentForm.requestCardNonce();
}

paymentForm.build();

var total = Config.sellingPrice;
$("#qty-input").on("change", function(e) {
    var qty = e.target.value;
    total = (qty * Config.sellingPrice).toFixed(2);
    $("#total-display").text('' + total);
});