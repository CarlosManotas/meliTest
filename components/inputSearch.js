import styled from 'styled-components'

const WrapperInput = styled.div`
  display: flex;
  flex: 1;
  background: #fff;
  border: 1px solid #eee;
  margin-left: 15px;
  height: 40px;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  input{
    border: none;
    background: transparent;
    width: 100%;
    padding-left: 20px;
    font-size: 18px;
    &:focus{
      outline: none;
    }
  }
  span{
    position: absolute;
    width: 40px;
    height: 100%;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    cursor: pointer;
  }
`

export default ({ onChangeHandle, onClickHandle, value, onKeyPressHandle }) => (
  <WrapperInput>
    <input type="text" placeholder='Nunca dejes de buscar' onKeyPress={e=>onKeyPressHandle(e)} value={value} onChange={e=>onChangeHandle(e)}/>
    <span onClick={e=>onClickHandle(e)}>
      <img src="/static/ic_Search.png" alt="ic-search"/>
    </span>
  </WrapperInput>
)
