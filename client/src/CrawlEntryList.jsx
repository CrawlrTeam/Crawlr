import React from 'react';
import CrawlEntry from './CrawlEntry.jsx';

const CrawlEntryList = props => (
    <div>
      <h2 className="ui header">
        <i aria-hidden="true" className="beer icon"></i>
        <div className="content">Your Crawl</div>
      </h2>
      <h4>Bar List</h4>
      <div className="ui items">
        {props.barAdded.map(function(bar, index) {
        return <CrawlEntry
                removebar={props.removebar}
                key={index}
                index={index}
                bar={bar}
              />
        })}
      </div>
      {props.barAdded.length > 5 &&
      <h5>Max bars reached</h5>}
      {props.barAdded.length > 2 &&
      <button
        className="ui button"
        role="button"
        type="submit"
        onClick={props.createCrawl}
      >
        Map Your Crawl!
      </button>
      }
      {props.barAdded.length < 3 &&
      <button
        className="ui disabled button"
        disabled=""
        role="button"
        type="submit"
      >
        Select at least 3 bars
      </button>
      }
      <h5>Click 'x' to remove</h5>
    </div>
);

export default CrawlEntryList;