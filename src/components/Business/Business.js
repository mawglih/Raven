import React, { Component } from 'react';
import './Business.css';




class Business extends Component {
    render() {
      var imgStarsrc = `regular_${this.props.business.rating}.png`;
        return(
            <div className="Business">
            <div className="image-container">
              <img src={this.props.business.imageSrc} alt=''/>
            </div>
            <h2>{this.props.business.name}</h2>
            <div className="Business-information">
              <div className  ="Business-address"><b>
                <p>{this.props.business.address}</p>
                <p>{this.props.business.city}</p>
                <p>{this.props.business.state} {this.props.business.zipCode}</p></b>
              </div>
              <div className  ="Business-reviews">
                <h3>{this.props.business.category}</h3>
                <img src={imgStarsrc} alt={this.props.business.rating}/>
                <p>Total reviews: {this.props.business.reviewCount}</p>
              </div>
            </div>
          </div>
        );
    }
}
export default Business;