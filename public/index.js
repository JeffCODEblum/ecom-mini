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


function postPayment(nonce, formData) {

    $.dialog({
        content: function() {
            var self = this;
            self.setContent('Processing...');
            return $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: 'process-payment',
                contentType: 'application/json',
                data: JSON.stringify({
                    nonce: nonce,
                    formData: formData
                }),
                method: 'post'
            }).done(function(res) {
                self.setTitle('<div style="padding: 5px; color: #333"><b>Thank You</b></div>');
                self.setContent(`
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div><i class="fas fa-check-circle" style="color: #0b0; font-size: 4em; padding: 5px;"></i></div>
                    <div style="color: #333; text-align: center; padding: 5px;">Your order has been placed.</div>
                </div>
                `);
            }).fail(function() {
                self.setTitle('Uh oh...');
                self.setContent('Your order could not be processed. Please check the payment information and try again.');
            });
        }
    })
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
            var formData = {};
            formData.name = $('#name-input').val();
            formData.email = $('#email-input').val();
            formData.address1 = $('#address1-input').val();
            formData.address2 = $('#address2-input').val();
            formData.city = $('#city-input').val();
            formData.state = $('#state-input').val();
            formData.zip = $('#zip-input').val();
            formData.country = $('#country-input').val();
            formData.qty = $('#qty-input').val();

            var valid = true;
            formData.name || $('#name-input').addClass('error') && (valid = false);
            formData.email || $('#email-input').addClass('error') && (valid = false);
            formData.address1 || $('#address1-input').addClass('error') && (valid = false);
            formData.city || $('#city-input').addClass('error') && (valid = false);
            formData.state || $('#state-input').addClass('error') && (valid = false);
            formData.zip || $('#zip-input').addClass('error') && (valid = false);
            formData.country || $('#country-input').addClass('error') && (valid = false);
            formData.qty || $('#qty-input').addClass('error') && (valid = false);

            if (!valid) {
                $.alert({title: 'Uh oh...', content: 'Please fill all the required fields.'});
                return;
            }
            console.log("card nonce response recieved");
            if (errors) {
                console.log(errors);
                $.alert({title: 'Error', content: 'Your payment could not be processed. Please try again.'});
                return;
            }
            else {
                postPayment(nonce, formData);
            }
        }
    }
});

function onGetCardNonce(event) {
    console.log("on get card nonce fired");
    event.preventDefault();
    paymentForm.requestCardNonce();
}

paymentForm.build();

var total = Config.sellingPrice;
$("#qty-input").on("change", function(e) {
    e.preventDefault();
    console.log("change fired");
    var qty = e.target.value;
    if (qty <= 0) {
        qty = 1;
        $(e.target).val(1);
    }
    total = (qty * Config.sellingPrice).toFixed(2);
    $("#total-display").text('' + total);
    $(e.target).removeClass('error');
});

$(".shipping-input").on("change", function(e) {
    console.log("change fired");
    $(e.target).removeClass('error');
});
