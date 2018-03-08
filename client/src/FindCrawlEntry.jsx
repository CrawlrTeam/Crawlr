import React from 'react';

class FindCrawlEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: this.props.crawl.bars,
      crawlName: this.props.crawl.name,
      description: this.props.crawl.description
    }
  }

  //You'll probably want to move client side API keys like the one on line 22 to an untracked config file.
  render() {
    return (
      <div
        style={{border: "solid", overflow: "hidden", padding: "10px"}}
        onClick={() => {this.props.entryClick(this.state)}}
      >
        <figure style={{width: "175px", height: "100%", float: "left"}}>
          <img
            src={'https://maps.googleapis.com/maps/api/place/photo?photoreference=' + this.props.crawl.bars[0].photo + '&sensor=false&maxheight=200&maxwidth=200&key=AIzaSyBP-TMT17pPoumM2HHp1pRUie8DhaalyOw'}
          />
          <figcaption><em>{this.props.crawl.bars[0].name}</em></figcaption>
        </figure>
        <h4 style={{textAlign: "center", fontSize: "30px"}}>{this.props.crawl.name}</h4>
        <ul style={{textAlign: "right", listStyleType: "none"}}>
          <li>{this.props.crawl.bars[0].name}</li>
          <li>{this.props.crawl.bars[1].name}</li>
          <li>{this.props.crawl.bars[2].name}</li>
          {this.props.crawl.bars[3] && <li>{this.props.crawl.bars[3].name}</li>}
          {this.props.crawl.bars[4] && <li>{this.props.crawl.bars[4].name}</li>}
          {this.props.crawl.bars[5] && <li>{this.props.crawl.bars[5].name}</li>}
        </ul>
        <p style={{verticalAlign: "bottom", textAlign: "right"}}>{this.props.crawl.description}</p>
        <br/>
      </div>
    );
  }
}

export default FindCrawlEntry;