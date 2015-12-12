/**
 * Created by Jacob on 12/11/2015.
 */

d3.json("./JSON/rise_up_tweets1000.json", function(tweets){
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

var filter1 = function() {
    var e = document.getElementById("ddl1");
    var strUser = e.options[e.selectedIndex].value;

    if(strUser == "none"){
        //reset filter
        //update force graph
    }
    else if(strUser == "blm1"){
        //parse nodesByName array
        //filter out everything but BlackLivesMatter hashtags
        //update force graph
    }
    else if(strUser == "blm2"){
        //blm2 tweets
    }
    else if(strUser == "blm3"){
        //blm3 tweets
    }
    else if(strUser == "alm"){
        //alm tweets
    }
    else if(strUser == "ruo"){
        //ruo tweets
    }
};

var filter2 = function() {
    var e = document.getElementById("ddl2");
    var strUser = e.options[e.selectedIndex].value;

    if(strUser == "none"){
        //reset filter
    }
    else if(strUser == "top1"){
        //filter everything but BlackLivesMatter tweets
    }
    else if(strUser == "top5"){
        //blm2 tweets
    }
    else if(strUser == "top10"){
        //blm3 tweets
    }
    else if(strUser == "top20"){
        //alm tweets
    }
};
