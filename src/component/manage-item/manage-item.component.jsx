import React, { Component } from 'react'
import './manage-item.styles.scss'
import AddItem from '../add-item/add-item.component';

class ManageItem extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false
    };
  }

  addNewItem = () => {
    this.setState({
      isShow: true
    })
  }

  render() {
    return (
      <div>

        <button onClick={this.addNewItem}>thêm mới</button>
        {this.state.isShow ? <AddItem/> : <span></span>}
      </div>
    )
  }
}

export default ManageItem;