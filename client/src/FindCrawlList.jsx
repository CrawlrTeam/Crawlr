import React from 'react';
import FindCrawlEntry from './FindCrawlEntry.jsx';

const FindCrawlList = props => (
    <div>
      <h4>Click on one to see a map</h4>
      <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "10px", gridAutoRows: "minMax(200px, auto)", width: "1100px"}} >
        {props.crawlList.map((crawl, i) => {
          return <FindCrawlEntry crawl={crawl} key={i} entryClick={props.entryClick} />
        })}
      </div>
    </div>
);

export default FindCrawlList;