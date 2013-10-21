﻿$.modalDialog.iframeLoadTimeout = 1000;
$.modalDialog.animationDuration = 100;

describe("jquery.modalDialog", function()
{
    var assert = chai.assert;

    function trigger($el, eventName, props)
    {
        var e = new $.Event(eventName);
        if (props)
        {
            $.extend(e, props);
        }

        $el.trigger(e);
    }

    describe("#_makeDraggable()", function()
    {
        var verifyDragDrop = function(eventType, events)
        {
            it("should make a dialog draggable using " + eventType + " events", function(done)
            {
                var dialog = $.modalDialog.create({ content: "#simpleDialog"});

                var DISTANCE = 200;

                dialog.open()
                    .then(function()
                    {
                        var pos = dialog.$header.offset();

                        trigger(dialog.$header, events[0], { clientX: pos.top, clientY: pos.left });
                        trigger(dialog.$header, events[1],  { clientX: pos.top + DISTANCE, clientY: pos.left + DISTANCE });
                        trigger(dialog.$header, events[2]);

                        var newPos = dialog.$header.offset();

                        if ($.modalDialog.isSmallScreen())
                        {
                            assert.equal(newPos.top, pos.top);
                            assert.equal(newPos.left, pos.left);
                        }
                        else
                        {
                            assert.equal(newPos.top, pos.top + DISTANCE);
                            assert.equal(newPos.left, pos.left + DISTANCE);
                        }
                        return dialog.close();
                    })
                    .then(function()
                    {
                        done();
                    });
            });
        };

        var eventMappings = 
        {
            "mouse": [ "mousedown", "mousemove", "mouseup" ],
            "touch": [ "touchstart", "touchmove", "touchend" ] 
            
            // TODO add pointer event support
            //,
            // "pointer": [ "pointerdown", "pointermove", "pointerup" ]
        };

        for (var eventType in eventMappings)
        {
            var eventMapping = eventMappings[eventType];

            verifyDragDrop(eventType, eventMapping);
        }
    });
});