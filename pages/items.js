import React, { Component } from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import axios from 'axios'
import Router from 'next/router'
const Image = styled.figure`
  width: 180px;
  height: 180px;
  margin: 0 16px 0 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  overflow: hidden;
  img{
    width: 100%;
  }
`
const Prices = styled.p`
  font-size: 24px;
  margin: 0;
  margin-bottom: 32px !important;
`
const Info = styled.div`
  font-size: 18px;
  width: 100%;
  max-width: 400px;
`
const City = styled.div`
  margin-left: auto;
  font-size: 12px;
  padding-right: 50px;
  padding-top: 10px;
`
const Layout = styled.div`
  background-color: white;
  width: 100%;
  max-width: 1200px;
  margin: 16px auto;
  ul{
    padding: 0 16px;
    margin: 0;
    list-style: none;
    li{
      display: flex;
      border-bottom: 1px solid #eee;
      padding: 16px 0;
      cursor: pointer;
      p{
        margin: 0;
        color: #333;
      }
    }
  }
`
class Items extends Component {
  static async getInitialProps ({ req, query }) {
    let url = req && req.headers && req.headers.host ? 'http://'+req.headers.host : window.location.origin
    const go = await axios({
      method:'get',
      url:`/api/items?q=${query.q}`,
      baseURL: url
    })
    const data = await go.data
    return { data, req: req ? 'YES' : 'NO' }
  }
  constructor(props) {
    super(props);
    this.handleDetail = this.handleDetail.bind(this)
  }
  handleDetail(id){
    Router.push({
      pathname: `/items/${id}`
    })
  }
  render(){
    const { data, req } = this.props
    console.log(req);
    return (
      <div style={{background: '#eeeeee', minHeight: '100vh', paddingBottom: '16px'}}>
        <Header />
        { data && data.items && (
          <Layout>
            <ul>
              {data.items.map(item => (
                <li key={item.id} onClick={event => this.handleDetail(item.id)}>
                  <Image>
                    <img src={item.picture} />
                  </Image>
                  <Info>
                    <Prices>$ {item.price.amount.toLocaleString('es-ar', { currency: item.price.currency_id })} {item.free_shipping && <img src="/static/ic_shipping.png"/>}</Prices>
                    <p>{item.title}</p>
                  </Info>
                  <City>
                    <p>{item.city}</p>
                  </City>
                </li>
              ))}
            </ul>
          </Layout>
        ) }
      </div>
    )
  }
}
export default Items;
