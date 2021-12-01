import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
// import PropTypes from 'prop-types'


class News extends Component {
    // static defaultProps = {
    //     country: 'in',
    //     pageSize: 6,
    //     category: 'general', 
    // }

    // static PropTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string,
    // }

    capitalizeFirstLetter = (String) => {
        return String.charAt(0).toUpperCase() + String.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("hello, i am constructor from the news component");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `Gully News - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();

    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page +1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                
                    <h1 className="text-center" style={{ margin: "60px 0px" }}>Gully News - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
                    {this.state.loading && <Spinner />}



                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                           <div className="row mb-3">
                            {this.state.articles.map((element) => {
                                console.log("element")
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""}
                                        decription={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage}
                                        url={element.url} author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name} />
                                </div>

                            })}
                        </div>
                        </div>
                    </InfiniteScroll>

                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &#8592; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &#8594; </button>
                    </div> */}
            </>
        )
    }
}

export default News;
