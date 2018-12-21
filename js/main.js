d3.csv("data/sunrise_export.csv", function(data){


function execute () {

    console.log("EECTUINT ")
    d3.selectAll("svg").remove();
    const parseTime =  d3.timeParse("%H:%M:%S");

    console.log(parseTime(data[1].sunriseTime))
    




    data.forEach(function(d) {
        d.srTime = parseTime(d.sunriseTime);
        d.ssTime = parseTime(d.sunsetTime);
        d.length = d.ssTime-d.srTime;
      });


// const dataS = data.sort((a,b)=> a.srTime - b.srTime)
const dataS = data.sort((a,b)=> b.srTime - a.srTime)


      console.log(data)
      console.log(dataS)


const margin = {
top: 20,
left: 40,
bottom:20,
right: 40

}



// const exRise = d3.extent(data, function(d) { return d.sunriseTime; })
// const exSet =d3.extent(data, function(d) { return d.sunsetTime; })

const exRise = d3.extent(data, function(d) { return d.srTime; })
const exSet =d3.extent(data, function(d) { return d.ssTime; })


console.log(exRise)

console.log(exSet)

const width=  window.innerWidth;
// const height = window.innerHeight;
const height= 400;

// const dataSorted = data.sort()

// const scaleX= d3.scaleTime().domain(["1899-12-31T08:10:00Z", "1899-12-31T19:14:00Z"]).range([0,1000])
    //   console.log("da data" +data[1])
// const scaleX = d3.scaleLinear().domain([parseTime("08:07:00"), parseTime("15:07:00")]).range([0,1000])
const scaleX = d3.scaleTime().domain([exRise[0], exSet[1]]).range([0,1000])

console.log("scaleC"+scaleX)
console.log("SCALING" + scaleX(data[2].ssTime))



//making a parser


// var parseTime = d3.timeParse("%B %d, %Y");
// parseTime("June 30, 2015"); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)


const svg =d3.select('#main').append('svg').attr("width", width-margin.left -margin.right).attr("height", height- margin.top - margin.bottom)
const rects = svg.selectAll("rect").data(dataS).enter().append('rect');

rects.attr("x", (d,i) => scaleX(d.srTime)).attr("y", (d,i)=> (i*18))
rects.attr("height", 15).attr("width", 0)
// rects.attr("fill", "rgba(0,0,0,.7")
rects.attr("fill", "rgba(255,255,255,.8")
rects.attr("class", "rects")
// rects.attr("rx", ".1px")

rects.transition()


.duration((d,i)=> (scaleX(d.ssTime)-scaleX(d.srTime))*10)
.delay((d,i)=>scaleX(d.srTime)*10)
.attr('width', (d,i)=> (scaleX(d.ssTime)-scaleX(d.srTime)))
.attr("height", 15)

.ease(d3.easeLinear)


svg.append('line').attr("x1", scaleX(parseTime('09:00:00'))).attr("x2", scaleX( parseTime('09:00:00'))).attr('y1', 0).attr('y2', 400).attr("stroke", "rgba(0,0,0,.4").attr('stroke-dasharray', 4)

svg.append('line').attr("x1", scaleX(parseTime('12:00:00'))).attr("x2", scaleX( parseTime('12:00:00'))).attr('y1', 0).attr('y2', 400).attr("stroke", "rgba(0,0,0,.4").attr('stroke-dasharray', 4)

svg.append('line').attr("x1", scaleX(parseTime('15:00:00'))).attr("x2", scaleX( parseTime('15:00:00'))).attr('y1', 0).attr('y2', 400).attr("stroke", "rgba(0,0,0,.4").attr('stroke-dasharray', 4)
svg.append('line').attr("x1", scaleX(parseTime('18:00:00'))).attr("x2", scaleX( parseTime('18:00:00'))).attr('y1', 0).attr('y2', 400).attr("stroke", "rgba(0,0,0,.4").attr('stroke-dasharray', 4)












const cityText = svg.selectAll("text").data(dataS).enter().append('text');
cityText.attr("x", (d,i) => scaleX(d.srTime)+7).attr("y", (d,i)=> (i*18)+11).text( d=> `${d.city}`)
cityText.attr("opacity", 0)
cityText.attr("class", "cityLabel")

cityText.transition()
.duration(300)
.delay((d,i)=>scaleX(d.srTime)*10)
.attr("opacity", 1)



svg.append('text').attr("x", scaleX(parseTime('09:10:00'))).attr("y", 400).text("9:00 a.m.").attr("class", "axisLabel")

svg.append('text').attr("x", scaleX(parseTime('12:10:00'))).attr("y", 400).text("noon").attr("class", "axisLabel")
svg.append('text').attr("x", scaleX(parseTime('15:10:00'))).attr("y", 400).text("3:00 p.m.").attr("class", "axisLabel")
svg.append('text').attr("x", scaleX(parseTime('18:10:00'))).attr("y", 400).text("6:00 p.m.").attr("class", "axisLabel")




svg.append('text').attr("x", scaleX(parseTime('09:10:00'))).attr("y", 10).text("9:00 a.m.").attr("class", "axisLabel")

svg.append('text').attr("x", scaleX(parseTime('12:10:00'))).attr("y", 10).text("noon").attr("class", "axisLabel")
svg.append('text').attr("x", scaleX(parseTime('15:10:00'))).attr("y", 10).text("3:00 p.m.").attr("class", "axisLabel")
svg.append('text').attr("x", scaleX(parseTime('18:10:00'))).attr("y", 10).text("6:00 p.m.").attr("class", "axisLabel")







// const cityEmo = svg.selectAll("text").data(dataS).enter().append('text');
// cityEmo.attr("x", (d,i) => scaleX(d.srTime)).attr("y", (d,i)=> (i*18)+10).text( d=> `☀️${d.srTime}`)
// cityEmo.attr("opacity", 0)
// cityEmo.attr("class", "cityLabel")

// cityEmo.transition()
// .duration(300)
// .delay((d,i)=>scaleX(d.srTime)*10)
// .attr("opacity", 1)
// .transition()
// .duration(300)
// .attr("opacity", 0)







} //ex

execute()
document.querySelector('#replay').addEventListener("click", execute)
})


