/**
 * Created by Jacob on 12/11/2015.
 */

var tweet;

d3.json("./JSON/rise_up_tweets1000.json", function(tweets){
    var nodesByName = {};
    var links = {};

    var count = 0;
    for (var key in tweets) {
        if (count >= 500){
            break;
        }
        if (tweets.hasOwnProperty(key)) {
            tweet = tweets[key];
            tweet['hashtags'].forEach(function(hashtag){
                var id = "" + key + "-" + hashtag;
                links[id] = {
                    "id": id,
                    "source": nodeByName(key, "tweet"),
                    "target": nodeByName(hashtag, "hashtag")
                };
            });
        }
        count++;
    }

    function nodeByName(name, type) {
        return nodesByName[name] || (nodesByName[name] = {id: name, type: type});
    }
});

var vis = d3.select("body")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "svg")
    .attr("pointer-events", "all")
    .attr("viewBox", "0 0 " + w + " " + h)
    .attr("perserveAspectRatio", "xMinYMid")
    .append('svg:g');

var force = d3.layout.force();

var nodes = force.nodes(),
    links = force.links();

var update = function () {
    var link = vis.selectAll("line")
        .data(links, function (d) {
            return d.source.id + "-" + d.target.id;
        });

    link.enter().append("line")
        .attr("id", function (d) {
            return d.source.id + "-" + d.target.id;
        })
        .attr("stroke-width", function (d) {
            return d.value / 10;
        })
        .attr("class", "link");
    link.append("title")
        .text(function (d) {
            return d.value;
        });
    link.exit().remove();

    var node = vis.selectAll("g.node")
        .data(nodes, function (d) {
            return d.id;
        });
};
