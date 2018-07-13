import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import InputSearch from './inputSearch'
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffe600;
`
const HeaderStyled = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  @media (min-width: 1240px) {
    padding: 0;
  }
`
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.onChangeHandle = this.onChangeHandle.bind(this)
    this.onClickHandle = this.onClickHandle.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleKeyPress(event){
    if (event.key === 'Enter') {
      this.onClickHandle(event)
    }
  }
  onChangeHandle(event){
    const value = event.target.value;
    this.setState({ value })
  }
  onClickHandle(event){
    event.preventDefault()
    const { value } = this.state
    if (value === '') return false
    this.setState({value: ''})
    Router.push({
    pathname: '/items',
      query: { q: value }
    })
  }
  render(){
    const { value } = this.state
    return (
      <Wrapper>
        <HeaderStyled>
          <Link href="/">
            <a>
              <img src='/static/Logo_ML.png'/>
            </a>
          </Link>
          <InputSearch
            onChangeHandle={this.onChangeHandle}
            value={value}
            onClickHandle={this.onClickHandle}
            onKeyPressHandle={this.handleKeyPress}
          />
        </HeaderStyled>
      </Wrapper>
    )
  }
}
