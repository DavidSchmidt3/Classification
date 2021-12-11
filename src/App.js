import React from 'react';
import Plot from 'react-plotly.js';
import Settings from './Settings';

let points = [
  { x: -4500, y: -4400, color: 'red' },
  { x: 2500, y: -3400, color: 'green' },
  { x: -4100, y: 3000, color: 'blue' },
  { x: -4100, y: -3000, color: 'red' },
  { x: 4500, y: -4400, color: 'green' },
  { x: -1800, y: -2400, color: 'red' },
  { x: -2500, y: -3400, color: 'red' },
  { x: 2000, y: -1400, color: 'green' },
  { x: 4100, y: -3000, color: 'green' },
  { x: -2000, y: -1400, color: 'red' },
  { x: -2500, y: 3400, color: 'blue' },
  { x: -4500, y: 4400, color: 'blue' },
  { x: 1800, y: -2400, color: 'green' },
  { x: 4100, y: 3000, color: 'purple' },
  { x: 4500, y: 4400, color: 'purple' },
  { x: -1800, y: 2400, color: 'blue' },
  { x: 2500, y: 3400, color: 'purple' },
  { x: 1800, y: 2400, color: 'purple' },
  { x: -2000, y: 1400, color: 'blue' },
  { x: 2000, y: 1400, color: 'purple' }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      successRates: [0, 0, 0, 0],
      pointsCount: 1000,
      ks: [1, 3, 7, 15],
      plotPointsX: [[], [], [], []],
      plotPointsY: [[], [], [], []],
      markerStyles: [],
      plotColors: [{ color: [] }, { color: [] }, { color: [] }, { color: [] }]
    }

    this.points = this.copyPoints(points);
    this.classifiedPoints = [this.copyPoints(this.points), this.copyPoints(this.points), this.copyPoints(this.points), this.copyPoints(this.points)];
  }

  handleSlider = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  copyKs = ks => {
    return ks.map(k => k);
  }

  changeK = e => {
    let index = Number(e.target.name);
    let ks = this.copyKs(this.state.ks);
    ks[index] = Number(e.target.value);

    this.setState({ ks });
  }

  copyPoints = points => {
    return points.map(point => {
      return { x: point.x, y: point.y, color: point.color };
    });
  }

  getColor = (x, y) => {
    if (x < 500 && y < 500)
      return 'red';
    if (x > -500 && y < 500)
      return 'green';
    if (x < 500 && y > -500)
      return 'blue';
    else
      return 'purple';
  }

  randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  classify = (x, y, k, currentPoints) => {
    let closestPoints = [];

    for (let i = 0; i < k; i++) {
      let distance = Math.sqrt(Math.pow(currentPoints[i].x - x, 2) + Math.pow(currentPoints[i].y - y, 2));
      closestPoints.push({ index: i, distance, color: currentPoints[i].color });
    }

    closestPoints.sort((a, b) => {
      let x = a.distance < b.distance ? -1 : 1;
      return x;
    });

    for (let i = k; i < currentPoints.length; i++) {
      let distance = Math.sqrt(Math.pow(currentPoints[i].x - x, 2) + Math.pow(currentPoints[i].y - y, 2))
      for (let j = 0; j < k; j++) {
        if (distance < closestPoints[j].distance) {
          for (let z = k - 1; z > j; z--) {
            closestPoints[z] = closestPoints[z - 1]
          }
          closestPoints[j] = { index: i, distance, color: currentPoints[i].color }
          break;
        }
      }
    }

    let occurances = [0, 0, 0, 0];
    let color;
    for (let i = 0; i < k; i++) {
      color = closestPoints[i]['color']
      switch (color) {
        case 'red':
          occurances[0] += 1;
          break;
        case 'green':
          occurances[1] += 1;
          break;
        case 'blue':
          occurances[2] += 1;
          break;
        default:
          occurances[3] += 1;
          break;
      }
    }

    let colors = ['red', 'green', 'blue', 'purple'];
    let colorIndex = occurances.indexOf(Math.max(...occurances));

    return { 'x': x, 'y': y, 'color': colors[colorIndex] }
  }

  getColor = color => {
    switch (color) {
      case 'red':
        return 'rgb(255, 0, 0)';
      case 'green':
        return 'rgb(0, 255, 0)';
      case 'blue':
        return 'rgb(0, 0, 255)';
      default:
        return 'rgb(112, 41, 99)';
    }
  }

  startClassification = async () => {
    this.points = this.copyPoints(points);
    this.classifiedPoints = [this.copyPoints(this.points), this.copyPoints(this.points), this.copyPoints(this.points), this.copyPoints(this.points)];

    let count = this.state.pointsCount;
    let ks = this.state.ks;
    let classificationsArray = [0, 0, 0, 0];
    let plotPointsX = [[], [], [], []];
    let plotPointsY = [[], [], [], []];
    let plotColors = [{ color: [] }, { color: [] }, { color: [] }, { color: [] }];

    for (let i = 0; i < count; i++) {
      let x, y, color;
      let number = this.randomInt(1, 100);
      if (number === 100) {
        x = this.randomInt(-5000, 5000);
        y = this.randomInt(-5000, 5000);
        color = this.getColor(x, y);
      }
      else {
        switch (i % 4) {
          case 0:
            x = this.randomInt(-5000, 499);
            y = this.randomInt(-5000, 499);
            color = 'red';
            break;
          case 1:
            x = this.randomInt(-499, 5000);
            y = this.randomInt(-5000, 499);
            color = 'green';
            break;
          case 2:
            x = this.randomInt(-5000, 499);
            y = this.randomInt(-499, 5000);
            color = 'blue'
            break;
          case 3:
            x = this.randomInt(-499, 5000);
            y = this.randomInt(-499, 5000);
            color = 'purple';
            break;
          default:
            throw new Error("Error");
        }
      }

      let newPoint = { x, y, color };
      this.points.push(newPoint);

      for (let j = 0; j < 4; j++) {
        let k = ks[j]
        let classifiedPoint = this.classify(newPoint.x, newPoint.y, k, this.classifiedPoints[j])
        this.classifiedPoints[j].push(classifiedPoint);


        if (classifiedPoint['color'] === this.points[i]['color'])
          classificationsArray[j] += 1
      }
    }

    let successRates = [0, 0, 0, 0];

    for (let i = 0; i < classificationsArray.length; i++) {
      successRates[i] = ((classificationsArray[i] / count) * 100).toFixed(2);
    }

    for (let i = 0; i < 4; i++) {
      this.classifiedPoints[i].forEach(point => {
        plotPointsX[i].push(point.x);
        plotPointsY[i].push(point.y);
        plotColors[i].color.push(point.color);
      })
    }

    this.setState({ plotPointsX, plotPointsY, plotColors, successRates });
  }


  mapPlots = () => {
    let plots = []
    for (let i = 0; i < 4; i++) {
      plots.push(<Plot
        key={i}
        data={[
          {
            x: this.state.plotPointsX[i],
            y: this.state.plotPointsY[i],
            mode: 'markers',
            type: 'scatter',
            marker: this.state.plotColors[i],
          }
        ]}
        layout={{ width: 1600, height: 800, title: `K = ${this.state.ks[i]}, Success rate = ${this.state.successRates[i]} %` }}
      />)
    }

    return plots;
  }


  render() {
    return (
      <>
        <Settings
          handleSlider={this.handleSlider}
          startClassification={this.startClassification}
          pointsCount={this.state.pointsCount}
          ks={this.state.ks}
          changeK={this.changeK}
        />
        <div className='center'>
          {this.mapPlots()}
        </div>
      </>
    );
  }
}

