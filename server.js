const express = require('express')
const next = require('next')
const cors = require('cors')
const axios = require('axios')
const port = parseInt(process.env.PORT, 10) || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use(cors())
    server.get('/api/items', (req, res, next) => {
      const { query } = req
      axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query.q}`)
      .then(res => res.data)
      .then(data => {
        const items = [...data.results]
        .filter((item,index) => index < 4)
        .map(item => ({
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: 2
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          city: item.address.state_name
        }))
        const formatJson = {
          autor: {
            name: 'Carlos',
            lastname: 'Manotas'
          },
          items
        }
        res.send(formatJson)
      })
    })
    server.get('/api/items/:id', (req, res, next) => {
      const { params: { id } } = req
      const getDetail = () => axios.get(`https://api.mercadolibre.com/items/${id}`)
      const getDescription = () => axios.get(`https://api.mercadolibre.com/items/${id}/description`)
      axios.all([getDetail(), getDescription()])
        .then(axios.spread((detail, description) => {
          const data1 = detail.data
          const data2 = description.data
          const item = {
            id: data1.id,
            title: data1.title,
            price: {
              currency: data1.currency_id,
              amount: data1.price,
              decimals: 2
            },
            picture: data1.pictures,
            condition: data1.condition,
            free_shipping: data1.shipping.free_shipping,
            sold_quantity: data1.sold_quantity,
            description: data2.plain_text
          }
          const formatJson = {
            autor: {
              name: 'Carlos',
              lastname: 'Manotas'
            },
            item
          }
          return res.send(formatJson)
        }))
    })
    server.get('/items/:id', (req, res) => {
      return app.render(req, res, '/itemId', { id: req.params.id })
    })
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
