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
  font-size: 46px;
  margin: 32px 0  !important;
`
const Condition = styled.p`
  font-size: 14px;
  margin: 32px 0 16px 0 !important;
`
const TitleProduct = styled.p`
  font-size: 24px;
  margin: 0;
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
const InfoBuy = styled.div`
  padding: 0 16px;
  @media (min-width: 1024px) {
    padding-right: 32px;
    margin-left: auto;
    width: 30%;
  }
`
const Description = styled.div`
  padding: 16px;
  h2{
    margin: 0 0 32px 0;
    font-size: 28px;
  }
  p{
    font-size: 16px;
    margin: 0;
  }
  @media (min-width: 1024px) {
    padding-left: 32px;
    padding-bottom: 32px;
    width: 100%;
    max-width: 680px;
  }
`
const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  figure{
    width: 100%;
    max-width: 680px;
    margin: 0;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
    }
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`
const Layout = styled.div`
  background-color: white;
  width: 100%;
  max-width: 1200px;
  margin: 16px auto;
  button{
    background: #3483fa;
    color: white;
    width: 100%;
    padding: 15px;
    border-radius: 4px;
    font-size: 25px;
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    button{
      max-width: 280px;
    }
  }
`
class Items extends Component {
  static async getInitialProps ({ req, asPath }) {
    let url = req && req.headers && req.headers.host ? 'http://'+req.headers.host : window.location.origin
    const go = await axios({
      method:'get',
      url:`/api/items${asPath.replace('/items','')}`,
      baseURL: url
    })
    const data = await go.data
    return { data, req: req ? 'YES' : 'NO' }
  }
  componentDidMount() {
    const arr = 78
    const other = '00:01:07,400-234-090\n00:05:01,701-080-080\n00:05:00,400-234-090'
    const test = [1,3,6,4,1,2]

    const funcArr = arreglo => {
      const final = arreglo.split('\n')
      let otherstuff = [...final].map(item => ({ number: item.split(',')[1], time: item.split(',')[0] }))
      otherstuff = [...otherstuff].reduce((acc, item)=>{
        let last = acc[item.time];
        acc[item.number] = ({ number: item.number, time: [...last, item.time] })
        return acc
      },{})
      return otherstuff
    }
    console.log(funcArr(other))
  }
  render(){
    const { data, req } = this.props
    console.log(req);
    return (
      <div style={{background: '#eeeeee', minHeight: '100vh', paddingBottom: '16px'}}>
        <Header />
        { data && data.item && (
          <Layout>
            <DetailItem>
              <figure>
                <img src={data.item.picture[0].url} alt="productImage"/>
              </figure>
              <InfoBuy>
                <Condition>{data.item.condition} - {data.item.sold_quantity} vendidos</Condition>
                <TitleProduct>{data.item.title}</TitleProduct>
                <Prices>
                  $ {data.item.price.amount.toLocaleString('es-ar', { currency: data.item.price.currency_id })}
                </Prices>
                <button>Comprar</button>
              </InfoBuy>
            </DetailItem>
            <Description>
              <h2>Descripción del producto</h2>
              <p>{ data.item.description }</p>
            </Description>
          </Layout>
        ) }
      </div>
    )
  }
}
export default Items;
