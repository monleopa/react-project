import React, { Component } from 'react'
import './item-detail.styles.scss'

class ItemDetail extends Component {
  constructor() {
    super();

    this.state = {
      DetailItemId: -1,
      Size: "",
      Quantity: ""
    }
  }

  componentDidMount() {
    const id = this.props.DetailItemId;
    this.setState({
      DetailItemId: id
    })
  }

  deleteDetail = (e) => {
    this.props.deleteDetailItem(this.props.DetailItem.DetailItemId);
  }

  hanelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

    const hihi = this.state;

    this.props.changeDetailItem(hihi);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          Size<input name="Size" value={this.props.DetailItem.Size} onChange={this.hanelChange}/>
        </div>
        <div className="col-md-3">
          Quantity<input name="Quantity" value={this.props.DetailItem.Quantity } onChange={this.hanelChange}/>
        </div>
        <div className="col-md-3">
          <button onClick={this.deleteDetail}>
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default ItemDetail