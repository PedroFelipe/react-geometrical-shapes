import { difference } from 'ramda'

const edges = (points) => {
  let farest = points[0]
  let nearest = points[0]

  points.forEach(point => {
    if(point.x >= farest.x) {
      farest = point
    }
  })

  points.forEach(point => {
    if(point.x <= nearest.x) {
      nearest = point
    }
  })

  const middle = difference(points, [farest, nearest])[0]

  return { farest, nearest, middle }
}

const center = (edges) => {
  const centerX = (edges.nearest.x + edges.farest.x) / 2
  const centerY = (edges.nearest.y + edges.farest.y) / 2

  return { x: centerX, y: centerY }
}

const fourthPoint = (center, middle) => {
  const y = (center.y * 2) - middle.y
  const x = ((y - middle.y) / (center.y - middle.y)) * (center.x - middle.x) + middle.x

  return { x, y }
}

const area = (edges) => {
  const { nearest, farest, middle } = edges

  const a = distance(nearest, middle)
  const b = distance(nearest, farest)
  const c = distance(farest, middle)

  const semiPerimeter = (a + b + c) / 2

  return 2 * Math.sqrt(semiPerimeter * (semiPerimeter - a) * (semiPerimeter - b) * (semiPerimeter - c))
}

const radius = (area) => {
  return Math.sqrt(area / Math.PI)
}

const distance = (start, end) => {
  return Math.sqrt(Math.pow(start.x - end.x, 2) +  Math.pow(start.y - end.y, 2))
}

export default {
  edges,
  center,
  fourthPoint,
  area,
  radius
}
