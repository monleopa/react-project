import React, { Component } from 'react'
import API from '../../API/define-api'
import Axios from 'axios'
import Item from '../item/item.component';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./home-list.styles.scss"

class HomeList extends Component {
  constructor() {
    super();

    this.state = {
      hotitem: [],
      newitem: [],
    }
  }

  componentDidMount = () => {
    var me = this;
    Axios.get(API.hotitem).then(res => {
      if (res.status === 200) {
        if (res.data.success) {
          me.setState({
            hotitem: res.data.data,
          })
        }
      }
    });

    Axios.get(API.newitem).then(res => {
      if (res.status === 200) {
        if (res.data.success) {
          me.setState({
            newitem: res.data.data,
          })
        }
      }
    });
  }

  render() {
    const responsiveSlider = {
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        partialVisibilityGutter: 40,
        items: 1
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        partialVisibilityGutter: 40,
        items: 1
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        partialVisibilityGutter: 40,
        items: 1
      }
    };
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    return (
      <div className="home-list">
        <div className="home-slider">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={1000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsiveSlider}
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            <img
              src="https://theme.hstatic.net/1000341789/1000531229/14/slideshow_2.jpg?v=27"
              className="style-img-slider"
              alt="slider"
            />
            <img
              src="https://theme.hstatic.net/1000341789/1000531229/14/slideshow_3.jpg?v=27"
              className="style-img-slider"
              alt="slider"
            />
            <img
              src="https://theme.hstatic.net/1000341789/1000531229/14/slideshow_4.jpg?v=27"
              className="style-img-slider"
              alt="slider"
            />
            <img
              src="https://theme.hstatic.net/1000341789/1000531229/14/slideshow_1.jpg?v=27"
              className="style-img-slider"
              alt="slider"
            />
            <img
              src="https://d2ls16jjuwnppu.cloudfront.net/wp-content/uploads/dolce-and-gabbana-christmas-take-over-2019-top-banner-01.jpg"
              className="style-img-slider"
              alt="slider"
            />
          </Carousel>
        </div>
        <div className="padding-top-30">
          <div className="title-type">New items</div>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}>
            {

              this.state.newitem ?
                (this.state.newitem.map(item => (
                  <Item key={item.itemID} item={item} addClass="list-home" />
                ))) : null

            }
          </Carousel>
        </div>
        <div className="padding-top-30">
          <div className="title-type">Hot items</div>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}>
            {

              this.state.hotitem ?
                (this.state.hotitem.map(item => (
                  <Item key={item.itemID} item={item} addClass="list-home" />
                ))) : null

            }
          </Carousel>
        </div>
      </div>
    );
  }
}

export default HomeList;