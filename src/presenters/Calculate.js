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

const fourthPoint = (points, center, middle) => {
  const y = (center.y * 2) - middle.y
  const x = ((y - middle.y) / (center.y - middle.y)) * (center.x - middle.x) + middle.x

  return [...points.slice(), { x, y }]
}

const area = (edges) => {
  const { nearest, farest, middle } = edges

  return (
    Math.sqrt(
      Math.pow(nearest.x - middle.x, 2) +  Math.pow(nearest.y - middle.y, 2)
    )
    *
    Math.sqrt(
      Math.pow(middle.x - farest.x, 2) +  Math.pow(middle.y - farest.y, 2)
    )
  )
}

const radius = (area) => {
  return (
    Math.sqrt(area / Math.PI)
  )
}

export default {
  edges,
  center,
  fourthPoint,
  area,
  radius
}
