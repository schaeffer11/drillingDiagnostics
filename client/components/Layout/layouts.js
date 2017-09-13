const layouts = {
  lg: [ //  breakpoints for responsive design
    { i: 'analysis', x: 0, y: 0, w: 64, h: 0.96, static: true },
    { i: 'options', x: 64, y: 0, w: 15, h: 0.96, static: true },
    { i: 'selector', x: 79, y: 0, w: 21, h: 0.96, static: true },
  ],
  md: [
    { i: 'analysis', x: 0, y: 0, w: 75, h: 0.96, static: true },
    { i: 'selector', x: 80, y: 0, w: 25, h: 0.47, static: true },
    { i: 'options', x: 80, y: 0.50, w: 25, h: 0.46, static: true }
  ],
  sm: [
    { i: 'analysis', x: 0, y: 0, w: 100, h: 0.96, static: true },
    { i: 'options', x: 0, y: 0.96, w: 50, h: 0.96, static: true },
    { i: 'selector', x: 50, y: 0.96, w: 50, h: 0.96, static: true },
  ]
}


export default layouts