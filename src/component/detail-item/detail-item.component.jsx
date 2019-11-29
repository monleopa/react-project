import React, { Component } from 'react'
import API from '../../API/define-api'
import Axios from 'axios'
import './detail-item.styles.scss'

class DetailItem extends Component {
  constructor() {
    super();

    this.state = {
      itemID: null,
      itemName: null,
      itemCode: null,
      price: null,
      description: null,
      itemImage: null,
      categoryCode: null,
      categoryName: null,
      categoryGroup: null,
      supplierCode: null,
      supplierName: null,
      listItemDetail: [],
      listComment: [],
      itemDetail: null,
      DetailItemID: '',
      Quantity: 1,
      CommentContent: '',
    }
  }

  componentDidMount() {
    var me = this;
    var location = window.location.pathname.split('/');
    if (location.length > 2) {
      var link = API.detailitem + location[2];
      Axios.get(link).then(res => {
        if (res.status) {
          if (res.data.success) {
            var data = res.data.data;
            me.setState({
              ...data,
              DetailItemID: data.listItemDetail[0].detailItemID,
            });
          }
        }
      });
    }
    else {
      window.location.href = "/";
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  PostComment = (e) => {
    var me = this;
    var data = {
      ItemID: this.state.itemID,
      CommentContent: this.state.CommentContent,
      AccountID: this.savedata.accountID,
    }

    var dataUser = this.savedata;

    Axios.post(API.comment, data).then(res => {
      console.log(res)
      if (res.status) {
        if (res.data.success) {
          var comment = {
            itemID: data.ItemID,
            commentContent: data.CommentContent,
            accountID: data.AccountID,
            firstName: dataUser.firstName,
            lastName: dataUser.lastName,
            commentID: res.data.data
          }
          var listComment = me.state.listComment;
          listComment.push(comment);
          me.setState({
            listComment: listComment,
            CommentContent: '',
          })
        } else {
          console.log(res.data);
        }
      }
    })

  }

  OrderItem = (e) => {
    if (this.savedata) {
      this.props.orderItem(this.state.DetailItemID, this.state.Quantity);
    } else {
      window.location.href = "/signin"
    }
  }

  render() {
    this.savedata = this.props.user;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-6">
                <img src={this.state.itemImage} alt={this.state.itemName} className="item-image" />
              </div>
              <div className="col-md-6">
                <div className="item-name left">
                  {this.state.itemName}
                </div>

                <div className="item-detail-code left">
                  {this.state.itemCode}
                </div>

                <hr className="line" />

                <div className="row">
                  <div className="col-md-6 left d-flex">
                    <div className="label">Quantity</div>
                    <input name="Quantity" className="form-control quantity" onChange={this.handleChange} value={this.state.Quantity} />
                  </div>
                  <div className="col-md-6 left d-flex">
                    <div className="label">Size</div>
                    <select className="form-control size" name="DetailItemID" onChange={this.handleChange}>
                      {
                        this.state.listItemDetail ?
                      this.state.listItemDetail.map(x => (<option key={x.detailItemID} label={x.size}>{x.detailItemID}</option>)) :
                          null
                      }
                    </select>
                  </div>
                </div>

                <hr className="line" />

                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-danger form-control" onClick={this.OrderItem}>ORDER</button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 left detail-description">
                    {this.state.description}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div>Rates:</div>
              <div className="star-vote">
                <i className="fas fa-star start1 right"></i>
                <i className="fas fa-star start2 right"></i>
                <i className="fas fa-star start3 right"></i>
                <i className="fas fa-star start4 right"></i>
                <i className="fas fa-star start5 right"></i>
              </div>
            </div>

            <div>
              <div className="row">
                <div className="label">Comment:</div>
                <div className="col-md-8">
                  <input className="form-control comment-content" placeholder="Leave comment for this item..."
                    name="CommentContent" value={this.state.CommentContent} onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary btn-post" onClick={this.PostComment}>Post</button>
              </div>

              {
                this.state.listComment.length > 0 ?
                  (this.state.listComment.map(x =>
                    (<div key={x.CommentID} className="row row-comment">
                      <div className="col-md-2 left">
                        <b>{x.firstName + x.lastName}</b>
                      </div>
                      <div className="col-md-9 left content-comment">{x.commentContent}</div>
                    </div>
                    )))
                  :
                  <div className="row row-comment">This item does not have comment</div>
              }
            </div>

          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    )
  }
}

export default DetailItem;