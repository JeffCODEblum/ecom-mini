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
                <b>Total: $<span id="total-display">${Config.sellingPrice}</span></b>
            </div>

            <div style="margin-top: 30px; font-size: 1.4em; color: #333; font-weight: bold;">Shipping Information</div>
            <div style="margin-top: 10px;>
                <input class="form-control infoPlaceholder shipping-input" placeholder="Full name"  />
                <input class="form-control infoPlaceholder shipping-input" type="text" placeholder="Address Line 1" />
                <input class="form-control infoPlaceholder shipping-input" type="text" placeholder="Address Line 2" />
                <input class="form-control infoPlaceholder shipping-input" type="text" placeholder="city" />
                <input class="form-control infoPlaceholder shipping-input" type="text" placeholder="State/Province/Region" />
                <input class="form-control infoPlaceholder shipping-input" type="number" placeholder="ZIP/Postal Code" />
                <input class="form-control infoPlaceholder shipping-input" type="text" placeholder="country" />
            </div>

            <div style="margin-top: 30px; font-size: 1.4em; color: #333; font-weight: bold;">Payment Information</div>
            <div id="form-container" style="margin-top: 10px;">
                <div id="sq-card-number"></div>
                <div class="third" id="sq-expiration-date"></div>
                <div class="third" id="sq-cvv"></div>
                <div class="third" id="sq-postal-code"></div>
                <button id="sq-creditcard" class="button-credit-card" onclick="onGetCardNonce(event)">Purchase</button>
            </div>
            <div style="margin-top: 320px"></div>
        </div>
    </div>
    `;
    return page;
}