const Config = require('./config');
module.exports = function() {
    var page = `
    <div style="width: 100%; display: flex; flex-direction: row; justify-content: center;">
        <div style="width: 100%; max-width: 300px; display: flex; flex-direction: column;">
            <div style="font-size: 1.4em; color: #333; font-weight: bold;">Checkout <i class="fa fa-shopping-cart"></i></div>
            <div style="font-size: 1.4em; color: #333; font-weight: bold;">${Config.productName}</div>
            <div style="font-size: 1.4em; color: #333; font-weight: bold;">Shipping Information</div>
            <input class="form-control" placeholder="Name" />
            <input class="form-control" type="email" placeholder="email" />
            <input class="form-control" type="text" placeholder="street address Line 1" />
            <input class="form-control" type="text" placeholder="street address Line 2" />
            <input class="form-control" type="text" placeholder="apt/unit number" />
            <input class="form-control" type="text" placeholder="city" />
            <input class="form-control" type="text" placeholder="State/Province" />
            <input class="form-control" type="number" placeholder="zip code" />
            <input class="form-control" type="text" placeholder="country" />
            <div style="font-size: 1.4em; color: #333; font-weight: bold;">Payment Information</div>
            <div id="form-container">
                <div id="sq-card-number"></div>
                <div class="third" id="sq-expiration-date"></div>
                <div class="third" id="sq-cvv"></div>
                <div class="third" id="sq-postal-code"></div>
                <button id="sq-creditcard" class="button-credit-card" onclick="onGetCardNonce(event)">Pay</button>
            </div>
            <div style="margin-top: 320px"></div>
        </div>
    </div>
    `;
    return page;
}