/**
 * Created by jtgoen on 12/4/15.
 */
var width = window.innerWidth*.75,
    height = window.innerHeight,
    radius = 4.5;

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom)
    .on("dblclick.zoom", null);

var force = d3.layout.force()
    .size([width, height])
    .gravity(0.15);

var drag = force.drag()
    .on("dragstart", dragstart)
    .on("dragend", dragend);//
function dragstart(d) {         //--
    console.log(d);
    d.fixed = true;
    d3.select(this).classed("fixed", true);
}

function dragend(d){
    var self = this;
    console.log("made it here");
    document.getElementById("fixationbutton").addEventListener("click", function(){
        d.fixed = false;
        d3.select(self).classed("fixed", false);
    })
}

function zoomed() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

d3.json("./JSON/rise_up_tweets1000.json", function(tweets){
    var nodesByName = {};
    var links = {};

    var count = 0;
    for (var key in tweets) {
        if (count >= 500){
            break;
        }
        if (tweets.hasOwnProperty(key)) {
            var tweet = tweets[key];
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

    // Extract the array of nodes from the map by name.
    var nodes = d3.values(nodesByName);
    var linksyeah = d3.values(links);

    // Create the link lines.
    var link = svg.selectAll(".link")
        .data(linksyeah)
        .enter().append("line")
        .attr("class", "link");

    // Create the node circles.
    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append('g')
        .attr("class", function(d){
            if (d.type == "tweet") {
                return "tweet";
            }
            else {
                return "hashtag";
            }
        })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .call(force.drag);

    node.append("circle");

    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.id })
        .style("fill", "Black")
        .style("visibility", "hidden");

    var timeout = null;
    function mouseover() {
        var self = this;
        d3.select(self).style("stroke", "red");
        d3.select(self).moveToFront();
        if (d3.select(self).datum().type == "hashtag"){
            d3.select(self).style("stroke", "red");
            console.log("here");
            d3.select(self).select("text").style("visibility", "visible");
        }
        else {
            timeout = setTimeout(function(){
                var tweetview = document.getElementById("sidebar");
                tweetview.removeChild(tweetview.lastChild);
                twttr.widgets.createTweet(
                    d3.select(self).datum().id,
                    document.getElementById('sidebar'),
                    {
                        theme: 'dark'
                    }
                );
            }, 500);

        }
    }

    function mouseout() {
        d3.select(this).style("stroke", "#fff");
        d3.select(this).select("text").style("visibility", "hidden");
        clearTimeout(timeout);
    }

    // Start the force layout.
    force
        .nodes(nodes)
        .links(linksyeah)
        .on("tick", tick)
        .start();

    window.onresize = function() {
        tick();
    };

    function tick() {
        width = window.innerWidth*.75;
        height = window.innerHeight;
        svg
            .attr("width", width)
            .attr("height", height);

        force.size([width, height]);

        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        node.select("circle").attr("r", function(d){
            if (d.type == "tweet") {
                return radius;
            }
            else {
                return radius * (1+Math.log(d.weight));
            }
        });
    }

    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };

    function nodeByName(name, type) {
        return nodesByName[name] || (nodesByName[name] = {id: name, type: type});
    }
});