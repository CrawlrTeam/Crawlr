import React from 'react';

const CrawlEntry = props => (
  <div
    className="item"
    key={props.bar.id}
  >
    <a
      name={props.index}
      onClick={props.removebar}
    >
      x
    </a>
    {props.bar.name}
  </div>
);

export default CrawlEntry;