var yaw = 0.5,
  pitch = 0.5,
  width = 700,
  height = 400,
  drag = false

function dataFromFormular (func) {
  var output = []
  for (var x = -20; x < 20; x++) {
    var f0 = []
    output.push(f0)
    for (var y = -20; y < 20; y++) {
      f0.push(func(x, y))
    }
  }
  return output
}

var surfaces = [
  {
    name: 'Dataset 2',
    data: dataFromFormular(function (x, y) {
      return Math.cos(x / 15 * Math.PI) * Math.cos(y / 15 * Math.PI) * 60 + Math.cos(x / 8 * Math.PI) * Math.cos(y / 10 * Math.PI) * 40
    })
  }
]
var selected = surfaces[0]

var svg = d3.select('.header')
  .append('svg')
  .attr('height', height)
  .attr('width', width)

var group = svg.append('g')

var md = group.data([surfaces[0].data])
  .surface3D(width, height)
  .surfaceHeight(function (d) {
    return d
  }).surfaceColor(function (d) {
    var c = d3.hsl((d + 100), 0.6, 0.5).rgb()
    return 'rgb(' + parseInt(c.r) + ',' + parseInt(c.g) + ',' + parseInt(c.b) + ')'
  })

svg.on('mousedown', function () {
  drag = [d3.mouse(this), yaw, pitch]
}).on('mouseup', function () {
  drag = false
}).on('mousemove', function () {
  if (drag) {
    var mouse = d3.mouse(this)
    yaw = drag[1] - (mouse[0] - drag[0][0]) / 50
    pitch = drag[2] + (mouse[1] - drag[0][1]) / 50
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch))
    md.turntable(yaw, pitch)
  }
})
