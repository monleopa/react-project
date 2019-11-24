import React, {Component} from 'react'
import ItemDetail from '../item-detail/item-detail.component'
import './add-item.styles.scss'

class AddItem extends Component {
  constructor() {
    super();

    this.state = {
      ItemName: null,
      Price: null,
      BranchName: null,
      ListItemDetail: [
      ],
    }
  }

  handleAddNewRow = (e) => {
    const currenList = this.state.ListItemDetail;
    var DetailItem = {
      DetailItemId: currenList.length,
      Size: null,
      Price: null,
    }

    this.setState({
      ListItemDetail: [...currenList, DetailItem]
    })
  }

  changeDetailItem = (detailItem) => {
    const currentList = this.state.ListItemDetail;
    const newList = currentList.map(detail => detail.DetailItemId == detailItem.DetailItemId ? 
      detailItem : detail);

    this.setState({
      DetailItem: newList
    })
  }

  deleteDetailItem = (detailItemId) => {
    const currentList = this.state.ListItemDetail;
    const newList = currentList.map(detail => {
      if (detail.DetailItemId == detailItemId)
        return;
      if (detail.DetailItemId > detailItemId)
        return {
          ...detail,
          DetailItemId: detail.DetailItemId - 1
        };      
      if (detail.DetailItemId < detailItemId)
        return detail;
    });

    this.setState({
      DetailItem: newList
    })
  }

  render() {
    return(
      <div>
        <div className="container">
          <div className="row">
            <input name="Price"/>
          </div>
          <div className="row">
            <input name="ItemName"/>
          </div>
          <div className="row">
            <input name="BranchName"/>
          </div>
          <div><button onClick={this.handleAddNewRow}>Add Item Detail</button></div>
          {
            this.state.ListItemDetail.map(x => <ItemDetail 
              DetailItem={x.DetailItem} 
              deleteDetailItem={this.deleteDetailItem}
              changeDetailItem={this.changeDetailItem}/>)
          }
        </div>
      </div>
    )
  }
}

export default AddItem;