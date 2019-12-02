import React, { Component } from 'react';
import './category-item.styles.scss'
import API from '../../API/define-api'
import Axios from 'axios';
import Item from '../item/item.component';

class CategoryItem extends Component {
  constructor() {
    super();
    this.state = {
      listItem: [],
    }
  }
  componentDidMount() {
    var me = this;
    var link = API.listitem + this.props.match.location.pathname;
    Axios.get(link).then(res=> {
      if(res.status === 200) {
        if(res.data.success) {
          me.setState({
            listItem: res.data.data
          });
        }
      }
    })
  }

  render() {
    return(
      <div className='collection-preview'>
        <div className="container">
          <div className="row">
            {
              this.state.listItem ?
              (this.state.listItem.map(item => (
                  <Item key={item.itemID} item={item}/>
                ))) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryItem;