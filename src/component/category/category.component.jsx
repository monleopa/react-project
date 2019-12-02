import React, { Component } from 'react';
import './category.styles.scss'
import API from '../../API/define-api'
import Axios from 'axios';

class Category extends Component {
  constructor() {
    super();

    this.state = {
      listCategory: [],
    }
  }

  componentDidMount = () => {
    var link = API.category + window.location.pathname;
    var me = this;
    Axios.get(link).then(res => {
      if (res.status === 200) {
        if (res.data.success) {
          me.setState({
            listCategory: res.data.data
          })
        }
      }
    });
  }

  componentDidUpdate = (prevProps) => {
    console.log(prevProps)
    if (this.props.match.location.pathname !== prevProps.match.location.pathname) {
      var link = API.category + window.location.pathname;
      var me = this;
      Axios.get(link).then(res => {
        if (res.status === 200) {
          if (res.data.success) {
            me.setState({
              listCategory: res.data.data
            })
          }
        }
      });
    }
  }

  viewListItem = (id, e) => {
    window.location.href = '/categoryitem/' + id;
  }

  render() {
    return (
      <div>
        {
          this.state.listCategory.length <= 0 ?
            'There is not this category' :
            (
              <div className="container fix-position">
                <div className="row">
                  {
                    this.state.listCategory.map(x => (
                      <div
                        className="menu-item"
                        onClick={this.viewListItem.bind(null, x.categoryID)}
                      >
                        <div
                          className='background-image'
                          style={{
                            backgroundImage: `url(${x.categoryImage})`
                          }}
                        />
                        <div className='content'>
                          <h1 className='title'>{x.categoryName.toUpperCase()}</h1>
                          <span className='subtitle'>SHOP NOW</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    )
  }
}

export default Category;