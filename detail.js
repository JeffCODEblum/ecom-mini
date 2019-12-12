module.exports = function() {
    var page = `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Example App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <link rel="stylesheet" href="./style.css"></style>
            </head>
            <body>
                <div id="promo-bar" style="width: 100%; height: 30px; background-color: #000; color: white; display: flex; flex-direction: row; justify-content: center; align-items: center; letter-spacing: 3px; font-size: 0.8em;">
                    25% off your first order
                </div>
                <div id="nav-bar" style="display: flex; flex-direction: row; align-items: center; justify-content: flex-end; border-bottom: 1px solid #ccc; background-color: white; width: 100%; height: 60px;">
                    <div style="padding: 5px; font-size: 2em; color: #333;">
                        <span class="fa fa-bars"></span>
                    </div>
                </div>

                <div style="width: 100%; display: flex; flex-direction: row; justify-content: center;">
                    <div style="width: 100%; max-width: 300px; display: flex; flex-direction: column;">
                        <div style="margin-top: 10px; background-color: #efefef; width: 300px; height: 300px;">
                            <img class="main-img" style="width: 300px; height: 300px;" src='./img1.png' />
                        </div>
                        <div style="margin-top: 10px; display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
                            <div style="margin-right: 10px; background-color: #efefef; width: 65px; height: 65px;">
                                <img class="img-thmb" style="border: 1px solid #ccc; margin-right: 10px; width: 65px; height: 65px;" src="./img1.png" data-src="./img1.png" />
                            </div>
                            <div style="margin-right: 10px; background-color: #efefef; width: 65px; height: 65px;">
                                <img class="img-thmb" style="border: 1px solid #ccc; margin-right: 10px; width: 65px; height: 65px;" src="./img2.png" data-src="./img2.png" />
                            </div>
                        </div>
                        <div style="margin-top: 10px; color: #333;">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star-half checked"></span>
                            <span style="font-size: 0.8em;">(4.5 / 5 based on 2 reviews)</span>
                        </div>
                        <div style="font-size: 1.4em; color: #333; font-weight: bold;">Jeezy's</div>
                        <div style="display: flex; flex-direction: column; margin-top: 20px; justify-content: center;">
                            <div style="text-align: center; color: #333;">
                                <span style="font-size: 1em">
                                    <s>$999.99</s>
                                </span>
                                <span style="font-size: 1.4em;">
                                    <b>$699.99</b>
                                </span>
                            </div>
                            <div style="display: flex; justify-content: center; margin-top: 10px;">
                                <button class="btn btn-default" style="width: 132px; border: 1px solid #333; border-radius: 0px; color: #222;">Buy Now</button>
                            </div>
                        </div>
                        <div style="color: #333; margin-top: 30px; text-align: center">
                            These kicks are the freshest
                        </div>
                        <div style="color: #333; margin-top: 30px; font-weight: bold; font-size: 1.4em;">
                            Customer Reviews
                        </div>
                        <div id="leave-review-div" style="text-align: center; margin-top: 30px;">
                            <button id="leave-review-btn" class="btn btn-default" style="width: 132px; border: 1px solid #333; border-radius: 0px; color: #222;">Leave a Review</button>
                        </div>
                        <div id="review-form-div" style="display: none; margin-top: 30px;">
                            <span id="star-btn-1" class="star-btn fa fa-star checked" data-index="1"></span>
                            <span id="star-btn-2" class="star-btn fa fa-star checked" data-index="2"></span>
                            <span id="star-btn-3" class="star-btn fa fa-star checked" data-index="3"></span>
                            <span id="star-btn-4" class="star-btn fa fa-star checked" data-index="4"></span>
                            <span id="star-btn-5" class="star-btn fa fa-star checked" data-index="5"></span>
                            <div class="form-group" style="margin-top: 10px;">
                                <input id="email-input" class="form-control" maxlength="48" style="border-radius: 0px; border: 1px solid #333;" placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <input id="name-input" class="form-control" maxlength="16" style="border-radius: 0px; border: 1px solid #333;" placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <textarea id="comment-input" maxlength="256" class="form-control" style="border-radius: 0px; border: 1px solid #333;" rows="6" placeholder="Write review here"></textarea>
                            </div>
                            <div class="form-group text-right">
                                <button id="comment-btn" class="btn btn-default" style="border: 1px solid #333; border-radius: 0px; color: #333;">Post</button>
                            </div>
                        </div>
                        <div id="review-success-div" style="display: none; margin-top: 30px;">
                            <div style="display: flex; justify-content: center; align-items: center;">
                                <div style="width: 132px; padding: 10px; background-color: #22a022; color: white; text-align: center; font-weight: bold; font-size: 1.2em">Review Submitted</div>
                            </div>
                        </div>
                        <div style="margin-top: 30px; margin-bottom: 30px;">
                            <hr>
                            <div><span style="color: #333; font-size: 1.2em;">Harry Potter</span> <span style="font-size: 0.8em">on 12/12/2019</span></div>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                            <div style="color: #333;">This is a great product would buy again</div>
                        </div>
                    </div>
                </div>

                <script src="./index.js"></script>
            </body>
        </html>
    `;
    return(page);
};
