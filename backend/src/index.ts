import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Prisma, PrismaClient } from '@prisma/client/edge';
import { sign } from 'hono/jwt';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

//prima call for the add the user in databse
app.post('/api/v1/signup',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try{
    const user= await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    });
const jwt = await sign({id:user.id},c.env.JWT_SECRET);
return c.json({jwt})
  }catch(e){
    c.status(403)
    return c.json({
      error:"error while signing up"
    })
  }
  
})

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})







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
