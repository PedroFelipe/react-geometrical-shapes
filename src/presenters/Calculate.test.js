import Calculate from './Calculate';

const factory = {
  points: [ { x: 192, y: 128 }, { x: 315, y: 142 }, { x: 174, y: 280 } ],
  edges: {
    farest: { x: 315, y: 142 },
    middle: { x: 192, y: 128 },
    nearest: { x: 174, y: 280 }
  },
  center: { x: 244.5, y: 211 },
  fourthPoint: { x: 297, y: 294 },
  area: 18947.999999999996,
  radius: 77.66167473992861
}

it('calculate egdes', () => {
  expect(Calculate.edges(factory.points)).toEqual(factory.edges)
})

it('calculate center', () => {
  expect(Calculate.center(factory.edges)).toEqual(factory.center)
})

it('calculate fourthPoint', () => {
  expect(Calculate.fourthPoint(factory.center, factory.edges.middle)).toEqual(factory.fourthPoint)
})

it('calculate area', () => {
  expect(Calculate.area(factory.edges)).toEqual(factory.area)
})

it('calculate radius', () => {
  expect(Calculate.radius(factory.area)).toEqual(factory.radius)
})
