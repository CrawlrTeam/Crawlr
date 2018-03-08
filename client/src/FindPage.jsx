import React from 'react';
import { Input } from 'semantic-ui-react';
import FindCrawlList from './FindCrawlList.jsx';
import DirectionsMap from'./DirectionsMap.jsx';
import FindCrawlSingleEntry from './FindCrawlSingleEntry.jsx';

class FindPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      allView: true,
      directionView: false,
      bars: [],
      crawlName: '',
      description: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.entryClick = this.entryClick.bind(this);
    this.goBackToEntries = this.goBackToEntries.bind(this);
  }

  componentDidMount() {
    this.props.getIntialCrawlList();
  }

  handleInputChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  submitClick(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.searchText);
    this.setState({allView: false});
  }

  entryClick(state) {
    this.setState({
      directionView: true,
      bars: state.bars,
      crawlName: state.crawlName,
      description: state.description
    });
  }

  goBackToEntries() {
    this.setState({
      entryView: true,
      directionView: false
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => {this.submitClick(e)}}>
          <Input
            className="input"
            type = "text"
            value={this.state.searchText}
            onChange={this.handleInputChange}
            placeholder="Enter city... "
          />
          <Input
            type="submit"
            icon="search"
            value="Search"
          />
        </form>
        <div style={{display:"flex", flexDirection:"row"}}>
          <div>
            {
            this.state.allView &&
            !this.state.directionView &&
            <h1>Here are all the crawls!</h1>
            }
            {
            !this.state.allView &&
            !this.state.directionView &&
            <h1>Here are the crawls in your city</h1>
            }
            {!this.state.directionView &&
            <FindCrawlList
              crawlList={this.props.crawls}
              entryClick={this.entryClick}
            />}
          </div>
          <div>
            {this.state.directionView &&
              <DirectionsMap crawlBars={this.state.bars} />}
          </div>
          <div style={{paddingLeft: "100px"}}>
            {this.state.directionView &&
            <FindCrawlSingleEntry
              name={this.state.crawlName}
              bars={this.state.bars}
              description={this.state.description}
              goBackToEntries={this.goBackToEntries}
            />}
          </div>
        </div>
      </div>
    );
  }
}

export default FindPage;