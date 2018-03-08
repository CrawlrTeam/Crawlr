import React from 'react';

const CrawlCreateForm = props => (
    <div>
      <h2 className="ui header">
        <i aria-hidden="true" className="beer icon"></i>
        <div className="content">Your Crawl</div>
        <button className="ui mini black button" onClick={props.cancelcrawl}>Back</button>
      </h2>
      <h4>Crawl Name</h4>
      <div className="ui input">
        <input type="text" id="crawl-name" placeholder="Crawl name"></input>
      </div>
      <h4>Bar List</h4>
      <div className="ui items">
        {props.barAdded.map(function(bar, index) {
        return (<div key={bar.id}>
                  <li>{bar.name}</li>
                Arrival time: <input id={"bar"+index} type="time"/>
                </div>)
        })}
      </div>
      <h4>Crawl Description</h4>
      <div className="ui input">
        <input type="text" id="crawl-description" placeholder="Write desciption here" />
      </div>
      <button
        className="ui button"
        role="button"
        type="submit"
        onClick={props.savecrawl}
      >
        Upload Your Crawl!
      </button>
    </div>
);

export default CrawlCreateForm;