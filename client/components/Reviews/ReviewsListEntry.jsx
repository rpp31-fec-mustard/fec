import React from 'react';
import axios from 'axios';
import Thumbnail from './ReviewThumbnail.jsx';
import ImgModal from './ImgModal.jsx';
import Stars from '../Global/Stars.jsx';


class ReviewsListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      helpful: 0,
      body: '',
      addShowButton: false,
      showMore: false,
      img: ''
    };
  }

  wouldRecommend() {
    if (this.props.review.recommend) {
      return (
        <section>
          <i className="fas fa-check"></i> I would recommend this item!
        </section>);
    }
  }

  convertDate(date) {
    var date = new Date(date).toDateString();
    var dateArr = date.split(' ');
    dateArr.shift();
    dateArr[1] = dateArr[1] + ', ';
    return dateArr.join(' ');
  }

  response(res) {
    if (res) {
      return 'Response from seller ' + res;
    }
  }

  showModal(e) {
    this.setState({
      modal: true,
      img: e.target.src
    });
  }

  closeModal() {
    this.setState({
      modal: false
    });
  }

  renderStars() {
    if (this.props.rating) {
      return <Stars rating={this.props.rating} />;
    }
  }

  showMore(e) {
    e.preventDefault();
    this.setState({
      body: this.props.review.body,
      showMore: true
    });
  }

  showLess(e) {
    if (e) {
      e.preventDefault();
    }
    let newBody = this.props.review.body.substring(0, 250);
    this.setState({
      body: newBody,
      addShowButton: true,
      showMore: false
    });
  }

  reviewListBody(body) {
    if (body.length > 250) {
      this.showLess();
    } else {
      this.setState({
        body: body
      });
    }
  }

  displayButton() {
    if (!this.state.showMore) {
      return (
        <a href='/' onClick={this.showMore.bind(this)}> show more </a>
      );
    } else {
      return (
        <a href='/' onClick={this.showLess.bind(this)}> show less </a>
      );
    }
  }

  componentDidMount() {
    this.reviewListBody(this.props.review.body);
    this.setState({
      rating: this.props.review.rating,
      helpful: this.props.review.helpfulness
    });
  }

  componentDidUpdate() {
    if ((this.state.rating !== this.props.review.rating) || (this.state.helpful !== this.props.review.helpfulness)) {
      this.reviewListBody(this.props.review.body);
      this.setState({
        rating: this.props.review.rating,
        helpful: this.props.review.helpfulness
      });
    }
  }


  render() {
    console.log()
    return (
      <div className='entry'>
        <section className='starRating'> {this.renderStars()} </section>
        <section className='username'> {this.props.review.reviewer_name} </section>
        <section className='date'> {this.convertDate(this.props.review.date)} </section>
        <section className='rating'>Rating: {this.props.review.rating}</section>
        <section className='reviewSummary'> {this.props.review.summary} </section>
        <section className='recommend'>
          {this.wouldRecommend()}
        </section>
        <section className='reviewBody'>
          {this.state.body}
          <section className='bodyDisplayButton'>
            {this.state.addShowButton ? this.displayButton() : null}
          </section>
          <section className='reviewThumbnailContainer'>
            {this.props.review.photos.map((photo, i) => {
              return (
                <Thumbnail key={i} photo={photo} close={this.closeModal.bind(this)} show={this.state.modal} onClick={this.showModal.bind(this)} />
              );
            })}
            <ImgModal show={this.state.modal} close={this.closeModal.bind(this)} url={this.state.img} />
          </section>
        </section>
        <section className='response'> {this.response(this.props.review.response)} </section>
        <section className='helpful'>
          Helpful?
          <a href=''>
            Yes({this.state.helpful})
          </a>
        </section>
      </div>
    );
  }
}

export default ReviewsListEntry;