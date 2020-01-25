const Config = require('./config');
module.exports = function() {
    var page = `
    <div style="width: 100%; display: flex; flex-direction: row; justify-content: center;">
        <div style="width: 100%; max-width: 300px; display: flex; flex-direction: column;">
            <div style="font-size: 1.4em; color: #333; font-weight: bold; margin-top: 30px; display: flex; flex-direction: row; justify-content: space-between;">
                <div>Checkout</div>
                <div><i class="fa fa-shopping-cart"></i></div>
            </div>
            <div style="margin-top: 10px; color: #333; display: flex; justify-content: space-between; align-items: center;">
                <img class="img-thmb" style="border: 1px solid #ccc; margin-right: 10px; width: 65px; height: 65px;" src="./img1.png" data-src="./img1.png" />
                <div>${Config.productName}</div>
                <div>${Config.sellingPrice}</div>
                <div style="width: 100px;">qty: <input id="qty-input" type="number" value="1" min="1" max="999" class="form-control" /></div>
            </div>
            <div style="margin-top: 10px color: #333; display: flex; justify-content: flex-end; flex-direction: row;">
                <b>Total: $<span id="total-display" style="font-size: 1.2em">${Config.sellingPrice}</span></b>
            </div>

            <div style="margin-top: 30px; font-size: 1.4em; color: #333; font-weight: bold;">Shipping Information</div>
            <div style="margin-top: 10px;">
                <input id="name-input" class="form-control infoPlaceholder shipping-input" placeholder="Full name"  />
                <input id="email-input" type="email" class="form-control infoPlaceholder shipping-input" placeholder="Email Address" />
                <input id="address1-input" class="form-control infoPlaceholder shipping-input" type="text" placeholder="Address Line 1" />
                <input id="address2-input" class="form-control infoPlaceholder shipping-input" type="text" placeholder="Address Line 2" />
                <input id="city-input" class="form-control infoPlaceholder shipping-input" type="text" placeholder="city" />
                <input id="state-input" class="form-control infoPlaceholder shipping-input" type="text" placeholder="State/Province/Region" />
                <input id="zip-input" class="form-control infoPlaceholder shipping-input" type="number" placeholder="ZIP/Postal Code" />
                <input id="country-input" class="form-control infoPlaceholder shipping-input" type="text" placeholder="country" />
            </div>

            <div style="margin-top: 30px; font-size: 1.4em; color: #333; font-weight: bold;">Payment Information</div>
            <div id="form-container" style="margin-top: 10px;">
                <div id="sq-card-number"></div>
                <div class="third" id="sq-expiration-date"></div>
                <div class="third" id="sq-cvv"></div>
                <div class="third" id="sq-postal-code"></div>
                <button id="sq-creditcard" class="button-credit-card" style="margin-bottom: 10px; background-color: #white; color: black; border: 1px solid #000; height: 40px;" onclick="onGetCardNonce(event)">Purchase</button>
                <button id="sq-google-pay" class="button-google-pay"></button>
            </div>
            <div style="font-size: 2em; color: #333; margin-top: 30px; display: flex; flex-direction: row; justify-content: center; align-items:center;">
                <div style="padding: 15px;"><i class="fab fa-cc-visa"></i></div>
                <div style="padding: 15px;"><i class="fab fa-cc-mastercard"></i></div>
                <div style="padding: 15px;"><i class="fab fa-cc-discover"></i></div>
                <div style="padding: 15px;"><i class="fab fa-cc-amex"></i></div>
            </div>
            <div style="margin-top: 220px"></div>
        </div>
    </div>
    `;
    return page;
}