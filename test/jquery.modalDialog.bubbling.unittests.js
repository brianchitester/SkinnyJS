$.modalDialog.iframeLoadTimeout = 1000;
$.modalDialog.animationDuration = 100;

describe("jquery.modalDialog", function () {
    var assert = chai.assert;

    describe("#create()", function () {
        it("should allow bubbling when preventEventBubbling is false", function (done) {
            
            var bodyClicked = false;
            $("body").on("click", function () {
                bodyClicked = true;
            });

            var dialog = $.modalDialog.create({
                content: "#simpleDialog",
                preventEventBubbling: false
            });

            dialog
                .open()
                .then(function () {

                    dialog.$bg.trigger("click");

                    assert.isTrue(bodyClicked);

                    return dialog.close();
                })
                .then(function () {
                    assert.ok(true);
                    done();
                });
        });

        it("should prevent bubbling when preventEventBubbling is true", function (done) {
            
            var bodyClicked = false;
            $("body").on("click", function () {
                bodyClicked = true;
            });

            var dialog = $.modalDialog.create({
                content: "#simpleDialog",
                preventEventBubbling: true
            });

            dialog
                .open()
                .then(function () {

                    dialog.$bg.trigger("click");

                    assert.isFalse(bodyClicked);

                    return dialog.close();
                })
                .then(function () {
                    assert.ok(true);
                    done();
                });
        });
    });

});
