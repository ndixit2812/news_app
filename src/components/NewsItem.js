// import { getByTitle } from '@testing-library/dom';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class NewsItem extends Component {

    render() {
        const { title, description, imageUrl, url, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <div style={
                       { display : 'flex',
                       justifyContent: 'flex-end',
                       position : 'absolute',
                       right : '0'
                       }
                     }>
                        <span className="badge rounded-pill bg-danger">{source}
                        </span>
                    </div>
                    <img src={!imageUrl ? "https://st1.bgr.in/wp-content/uploads/2021/08/Apple-iPhone-12.jpg" : imageUrl} className="card-img-top" alt="interview" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}Read more...</p>
                        <p className="card-text"><small className="text-muted">by {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <Link href="noreferrer" to={url} target="_blank" className="btn btn-sm btn-dark">Know More</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;
