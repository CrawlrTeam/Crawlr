import React from 'react';

const FindCrawlSingleEntry = props => (
  <div>
    <button
      style={{padding: "15px 32px", textAlign: "center", textDecoration: "none", display: "inlineBlock", fontSize: "16px", margin: "4px 2px"}}
      onClick={props.goBackToEntries}
    >
      Click here to see all entries
    </button>
    <h4 style={{fontSize: "30px", textDecoration: "underline"}}>{props.name}</h4>
    <p>{props.bars[0].name}</p>
    <p>{props.bars[1].name}</p>
    <p>{props.bars[2].name}</p>
    {props.bars[3] && <p>{props.bars[3].name}</p>}
    {props.bars[4] && <p>{props.bars[4].name}</p>}
    {props.bars[5] && <p>{props.bars[5].name}</p>}
  </div>
);

export default FindCrawlSingleEntry;