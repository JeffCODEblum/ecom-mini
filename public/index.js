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

var paymentForm = new SqPaymentForm({
    applicationId: "sq0idp-Hcdz3ZLE8uKBWQJIzzSnvw",
    locationId: "USA",
  
    // Initialize Google Pay button ID
    googlePay: {
      elementId: 'sq-google-pay'
    },
    callbacks: {
        methodsSupported: function (methods, unsupportedReason) {      
            console.log(methods);
            var googlePayBtn = document.getElementById('sq-google-pay');
            // Only show the button if Google Pay on the Web is enabled
            if (methods.googlePay === true) {
                googlePayBtn.style.display = 'inline-block';
            } else {
                console.log(unsupportedReason);
            }
        },
        cardNonceResponseReceived: function() {

        },
        createPaymentRequest: function () {
            var paymentRequestJson = {
                requestShippingAddress: true,
                requestBillingInfo: true,
                shippingContact: {
                    familyName: "CUSTOMER LAST NAME",
                    givenName: "CUSTOMER FIRST NAME",
                    email: "mycustomer@example.com",
                    country: "USA",
                    region: "CA",
                    city: "San Francisco",
                    addressLines: ["1455 Market St #600"],
                    postalCode: "94103",
                    phone:"14255551212"
                },
                currencyCode: "USD",
                countryCode: "US",
                total: {
                    label: "MERCHANT NAME",
                    amount: "85.00",
                    pending: false
                },
                lineItems: [
                    {
                        label: "Subtotal",
                        amount: "60.00",
                        pending: false
                    },
                    {
                        label: "Shipping",
                        amount: "19.50",
                        pending: true
                    },
                    {
                        label: "Tax",
                        amount: "5.50",
                        pending: false
                    }
                ],
                shippingOptions: [
                    {
                        id: "1",
                        label: "SHIPPING LABEL",
                        amount: "SHIPPING COST"
                    }
                ]
            };
            return paymentRequestJson;
        },
    }
  });