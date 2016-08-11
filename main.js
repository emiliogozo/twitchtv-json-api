$(document).ready(function () {
    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
         "storbeck", "brunofin", "habathcx", "RobotCaleb", "comster404", "noobs2ninjas"];

    fetchStreamInfo();

    function fetchStreamInfo() {
        $.each(streamers, function (i, name) {
            $.ajax({
                url: "https://api.twitch.tv/kraken/streams/" + name + "?callback=?",
                dataType: "jsonp"
            })
                .then(function (data) {
                    $("#media-items").append(getMediaObject(data, name));
                });
        });

    }

    function getMediaObject(data, name) {
        var mediaListItem = $("<li>");

        var imgDiv = $("<div>");
        var img = $("<img>");

        var mediaBody = $("<div>");
        var mediaHeading = $("<h4>");
        var mediaHeadingAnchor = $("<a>")
            .attr("href", "https://www.twitch.tv/" + name)
            .attr("target", "_blank");
        var mediaBodyContent = $("<span>");
        
        imgDiv.append(img);

        mediaHeadingAnchor
            .append(mediaHeading)
            .appendTo(mediaBody);
        mediaBodyContent.appendTo(mediaBody);

        mediaListItem.append(imgDiv).append(mediaBody);

        imgDiv.attr("class", "media-left");
        img.attr("class", "media-object img-circle");

        mediaBody.attr("class", "media-body");
        mediaHeading.attr("class", "media-heading")
            .text(name);
        mediaHeadingAnchor.attr("href", "https://www.twitch.tv/" + name)
            .attr("target", "_blank");
        
        if(data.stream) {
            img.attr("src", data.stream.channel.logo);
            mediaBodyContent.text(data.stream.channel.status);
            mediaListItem.attr("class", "media user-online");
        } else {
            img.attr("src", "https://dummyimage.com/64x64/ecf0e7/5c5457.jpg&text=0x3F");
            mediaBodyContent.text("offline");
            mediaListItem.attr("class", "media user-offline");
        }

        if (data.status===422) {
            img.attr("src", "https://dummyimage.com/64x64/ecf0e7/5c5457.jpg&text=X");
            mediaHeadingAnchor.attr("href", "#");
            mediaBodyContent.text("user does not exist");
            mediaListItem.attr("class", "media user-dne");
        }
            
        return mediaListItem;
    }
});