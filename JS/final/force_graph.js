/**
 * Created by jtgoen on 12/4/15.
 */
var width = 1280,
    height = 800,
    radius = 4.5;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .size([width, height]);

var drag = force.drag()         //TODO may need to take this out if I can't reset the fixedness of nodes
    .on("dragstart", dragstart);//
function dragstart(d) {         //--
    d.fixed = true;
    d3.select(this).classed("fixed", true);
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
        .enter()
        .append("circle")
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

    function mouseover() {
        d3.select(this).style("stroke", "red");
    }

    function mouseout() {
        d3.select(this).style("stroke", "#fff");
    }

    // Start the force layout.
    force
        .nodes(nodes)
        .links(linksyeah)
        .on("tick", tick)
        .start();

    function tick() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x /*= Math.max(radius, Math.min(width - radius, d.x))*/; })
            .attr("cy", function(d) { return d.y /*= Math.max(radius, Math.min(height - radius, d.y))*/; });
        node.attr("r", function(d){
            if (d.type == "tweet") {
                return radius;
            }
            else {
                return radius * (1+Math.log(d.weight));
            }
        });
    }

    function nodeByName(name, type) {
        return nodesByName[name] || (nodesByName[name] = {id: name, type: type});
    }
});