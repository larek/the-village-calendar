import React from 'react';
import Days from './data.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      currentDay: {},
    }
  }

  componentDidMount() {
    this.getDayServer();
  }

  getDayServer() {
    fetch("https://worldtimeapi.org/api/timezone/Europe/Moscow").then(r => {
      return r.json();
    }).then(r => {
      this.setState({ currentDay: new Date(r.datetime) });
    });
  }

  redirect(url) {
    window.location = url;
  }

  change(e) {
    let clickDay = e.currentTarget;
    if (clickDay.dataset.display === "visible" && clickDay.dataset.status === "close") {
      //Change status of block
      clickDay.dataset.status = 'open';

      //Recored to localStorage
      if (window.localStorage) {
        localStorage.setItem(clickDay.dataset.day, 'open');
      }

      // Replace children in block
      let children = clickDay.children;
      children[0].classList.toggle('transparent');
      children[1].classList.toggle('transparent');
    }
  }

  render() {
    return (
      <div>
        {
          Days.map((item, key) => {
            let itemDate = new Date(item.date);
            return (
              <div className="col-4" key={key}>
                <div id='cf2' onClick={this.change.bind(this)} data-display={itemDate > this.state.currentDay ? 'lock' : 'visible'} data-status={window.localStorage && localStorage[item.day] ? 'open' : 'close'} data-day={item.day}>
                  {itemDate > this.state.currentDay ? <img src="https://the-village-calendar.larek.pro/images/lock.svg" className="lock" alt="" /> : ''}
                  <img id="front" src={item.front} className={window.localStorage && localStorage[item.day] ? 'transparent' : ''} />
                  <img id="back" onClick={this.redirect.bind(this, item.link)} src={item.back} className={window.localStorage && localStorage[item.day] ? '' : 'transparent'} />
                  {
                    itemDate === this.state.currentDay ? <img src="https://the-village-calendar.larek.pro/images/rays.svg" style={{ width: '100%', position: 'absolute', margin: '-30px 0px', zIndex: '-1' }} className='rays' alt="" /> : ''
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    )
  }
}

let ww = window.innerWidth;
let k = ww < 1280 ? ww < 1040 ? 17 : 13 : 12;
let backgroundMargin = ww / k;
document.body.style.backgroundPosition = "0px " + " " + -backgroundMargin + "px";

export default App;
