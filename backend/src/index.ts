import { Hono } from 'hono'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.post(' /api/v1/user/signup',(c)=>{
  return c.text("signup route")
})

app.post('/api/v1/user/signin',(c)=>{
  return c.text('signin route')
})

app.post(' /api/v1/blog',(c)=>{
  return c.text('blog site post')
})

app.put('/api/v1/blog/:id',(c)=>{
  const id = c.req.param('id')
 	console.log(id);
  return c.text('blog put')
})

app.put('/api/v1/blog/:id',(c)=>{
  return c.text('blog of a specific person')
})

app.get(' /api/v1/blog/bulk',(c)=>{
  return c.text('last route')
})

export default app
