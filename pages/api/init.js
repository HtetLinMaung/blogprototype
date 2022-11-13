// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Post from "../../models/Post";
import User from "../../models/User";
import connectMongo from "../../utils/connect-mongo";

export default async function handler(req, res) {
  await connectMongo();
  // await User.findOneAndDelete({ userid: "admin" });
  let user = await User.findOne({ userid: "admin", deletedAt: null });
  if (!user) {
    user = new User({
      name: "Admin",
      userid: "admin",
      password: "User@123",
      role: "admin",
    });
  }
  user.profileimage = "/images/me.jpg";
  await user.save();
  let post = await Post.findOne({
    ref: "how-to-use-mongoose-with-nextjs-for-mongodb",
    deletedAt: null,
  });
  if (!post) {
    post = new Post({
      ref: "how-to-use-mongoose-with-nextjs-for-mongodb",
      coverimage: "/images/2wzY_Fd6f.webp",
      title: "How to use Mongoose with Next.js for MongoDB?",
      author: user._id,
    });
  }
  post.status = "published";
  post.content = `<div id="post-content-wrapper" class="prose css-zbr6us"><h1 id="heading-hey-all" style="scroll-margin-top: 110px;">Hey all 👋!</h1>
  <p>Next.js is an amazing full-stack framework and MongoDB is a great NoSQL database. Using them together will make an app super fast and awesome! In this post, we'll go ahead and set up the Mongoose ODM inside our Next.js app to make use of MongoDB!</p>
  <p>So let's see how you can set up Mongoose in a Next.js app to connect and interact with your MongoDB database!</p>
  <h2 id="heading-setting-up-mongoose-and-the-connection-string" style="scroll-margin-top: 110px;">Setting up mongoose and the connection string</h2>
  <p>In your Next.js project, to set up mongoose you simply have to install it as a dependency just as you do with Node.js.</p>
  <div style="position:relative;"><div><button class="css-1vwx61"><span class="css-2305pr"><span class="css-qqykjf">Copy</span><svg viewBox="0 0 384 512" class="css-1se2ttb"><path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg></span></button></div><pre><code><span class="hljs-built_in">npm</span> i mongoose
  </code></pre></div><p>After installing <code>mongoose</code>, we'll create a folder called <code>utils</code> in our root and create a new file named <code>connectMongo.js</code> file.</p>
  <p>In this file, we will export a function that connects us to MongoDB.</p>
  <p><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1650178314792/H0ZTJa7ma.png?auto=compress,format&amp;format=webp" alt="image.png"></p>
  <div style="position:relative;"><div><button class="css-1vwx61"><span class="css-2305pr"><span class="css-qqykjf">Copy</span><svg viewBox="0 0 384 512" class="css-1se2ttb"><path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg></span></button></div><pre><code class="lang-js"><span class="hljs-keyword">import</span> mongoose <span class="hljs-keyword">from</span> <span class="hljs-string">'mongoose'</span>;
  
  <span class="hljs-keyword">const</span> connectMongo = <span class="hljs-keyword">async</span> () =&gt; mongoose.connect(process.env.MONGO_URI);
  
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connectMongo;
  </code></pre></div>
  <p>Also create a file named <code>.env.local</code> in the root of your project to store the connection URI in your environment variable and hide it from the main code.</p>
  <div style="position:relative;"><div><button class="css-1vwx61"><span class="css-2305pr"><span class="css-qqykjf">Copy</span><svg viewBox="0 0 384 512" class="css-1se2ttb"><path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg></span></button></div><pre><code class="lang-py"><span class="hljs-comment"># I am using MongoDB locally but you can use MongoDB Atlas also if you want</span>
  MONGO_URI=<span class="hljs-string">"mongodb://localhost:27017/mongoose_nextjs_demo"</span>
  </code></pre></div>
  <h2 id="heading-create-a-basic-mongoose-model" style="scroll-margin-top: 110px;">Create a basic mongoose model</h2>
  <p>Now that <code>mongoose</code> is set up successfully in our Next.js project, the rest of the work is quite similar to a Node.js app. I personally like to create a folder called <code>models</code> in the root of my project and create my model files there, just like a normal node.js app.</p>
  <p><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1650178623079/FI6HSWVCK.png?auto=compress,format&amp;format=webp" alt="image.png"></p>
  <p>So now we'll create a file named <code>testModel.js</code> in our <code>models</code> folder where we'll create our mongoose model.</p>
  <div style="position:relative;"><div><button class="css-1vwx61"><span class="css-2305pr"><span class="css-qqykjf">Copy</span><svg viewBox="0 0 384 512" class="css-1se2ttb"><path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg></span></button></div><pre><code class="lang-js"><span class="hljs-keyword">import</span> { Schema, model, models } <span class="hljs-keyword">from</span> <span class="hljs-string">'mongoose'</span>;
  
  <span class="hljs-keyword">const</span> testSchema = <span class="hljs-keyword">new</span> Schema({
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">String</span>,
    <span class="hljs-attr">email</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">unique</span>: <span class="hljs-literal">true</span>,
    },
  });
  
  <span class="hljs-keyword">const</span> Test = models.Test || model(<span class="hljs-string">'Test'</span>, testSchema);
  
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Test;
  </code></pre></div>
  <blockquote>
  <p>IMPORTANT: Notice how we use <code>models.Test</code> and then the logical OR operator and then use the <code>model</code> function by mongoose. We do that because we don't want to create a new model every single time we hit an API route in Next.js. If you don't do that and just go with <code>model('Test', testSchema)</code>, you might face an error that would prevent creating/updating etc.</p>
  </blockquote>
  <h2 id="heading-using-mongoose-in-api-routes" style="scroll-margin-top: 110px;">Using mongoose in API routes</h2>
  <p>Now that we have our model created, we can use it to see it in action!</p>
  <p>Next.js is a full-stack framework, and so it also provides a node environment where we can run Node.js back-end code easily and integrate that with the frontend.</p>
  <p>In the <code>pages/api</code> folder, we can create a file or folder that will ultimately create an API route and we can write back-end code in that file and call it as a REST API.</p>
  <p><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1650183014182/dxFl9KmIN.png?auto=compress,format&amp;format=webp" alt="image.png"></p>
  <p>For this demo, I created a folder <code>test</code> and a file <code>add.js</code> inside of it which gives the path <code>/api/test/add</code>.</p>
  <div style="position:relative;"><div><button class="css-1vwx61"><span class="css-2305pr"><span class="css-qqykjf">Copy</span><svg viewBox="0 0 384 512" class="css-1se2ttb"><path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg></span></button></div><pre><code class="lang-js"><span class="hljs-keyword">import</span> connectMongo <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../utils/connectMongo'</span>;
  <span class="hljs-keyword">import</span> Test <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../models/testModel'</span>;
  
  <span class="hljs-comment">/**
   * @param {import('next').NextApiRequest} req
   * @param {import('next').NextApiResponse} res
   */</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addTest</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">try</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'CONNECTING TO MONGO'</span>);
      <span class="hljs-keyword">await</span> connectMongo();
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'CONNECTED TO MONGO'</span>);
  
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'CREATING DOCUMENT'</span>);
      <span class="hljs-keyword">const</span> test = <span class="hljs-keyword">await</span> Test.create(req.body);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'CREATED DOCUMENT'</span>);
  
      res.json({ test });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-built_in">console</span>.log(error);
      res.json({ error });
    }
  }
  </code></pre></div>
  <p>Here, we import the <code>connectMongo</code> function and our <code>Test</code> model that we created from the respective files. And the big comment I have at the top is <a target="_blank" href="https://jsdoc.app/">JSDoc</a> which can be used to provide autocomplete and typing in the IDE. You can omit it if you want.</p>
  <p>Finally, the code is simple and straightforward, you can use the normal <code>mongoose</code> style code to create a new document. By getting the data from <code>req.body</code>.</p>
  <p>You can test it from the <a target="_blank" href="https://www.thunderclient.com/">Thunder Client</a> extension in VS Code, <a target="_blank" href="https://www.postman.com/">Postman</a> or <a target="_blank" href="https://insomnia.rest/download">Insomnia</a>. Whatever you wish! I like to use Thunder Client.</p>
  <p><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1650183454458/zEdrw_Mvy.png?auto=compress,format&amp;format=webp" alt="image.png"></p>
  <h2 id="heading-create-new-document-from-front-end" style="scroll-margin-top: 110px;">Create new document from front-end</h2>
  <p>Now that we have our back-end API created and we have verified that it's working, we can quickly write some front-end code to make it usable in our app.</p>
  <p>On the homepage inside the <code>index.js</code> file, I changed the file so that when we click the button, a new document will get added to the database.</p>
  <div style="position:relative;"><div><button class="css-1vwx61"><span class="css-2305pr"><span class="css-qqykjf">Copy</span><svg viewBox="0 0 384 512" class="css-1se2ttb"><path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg></span></button></div><pre><code class="lang-jsx"><span class="hljs-keyword">import</span> Head <span class="hljs-keyword">from</span> <span class="hljs-string">'next/head'</span>;
  <span class="hljs-keyword">import</span> Image <span class="hljs-keyword">from</span> <span class="hljs-string">'next/image'</span>;
  <span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'../styles/Home.module.css'</span>;
  
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Home</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> createTest = <span class="hljs-keyword">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> randomNum = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1000</span>);
      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/api/test/add'</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
        <span class="hljs-attr">headers</span>: {
          <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>,
        },
        <span class="hljs-attr">body</span>: <span class="hljs-built_in">JSON</span>.stringify({
          <span class="hljs-attr">name</span>: <span class="hljs-string">\`Test <span class="hljs-subst">\${randomNum}</span>\`</span>,
          <span class="hljs-attr">email</span>: <span class="hljs-string">\`test<span class="hljs-subst">\${randomNum}</span>@test.com\`</span>,
        }),
      });
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.json();
      <span class="hljs-built_in">console</span>.log(data);
    };
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Head</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Create Next App<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'description'</span> <span class="hljs-attr">content</span>=<span class="hljs-string">'Generated by create next app'</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'icon'</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'/favicon.ico'</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Head</span>&gt;</span>
  
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.main}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{createTest}</span>&gt;</span>Create Test<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.title}</span>&gt;</span>
            Welcome to <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://nextjs.org'</span>&gt;</span>Next.js!<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.description}</span>&gt;</span>
            Get started by editing{' '}
            <span class="hljs-tag">&lt;<span class="hljs-name">code</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.code}</span>&gt;</span>pages/index.js<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.grid}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.footer}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
            <span class="hljs-attr">href</span>=<span class="hljs-string">'https://vercel.com?utm_source=create-next-app&amp;utm_medium=default-template&amp;utm_campaign=create-next-app'</span>
            <span class="hljs-attr">target</span>=<span class="hljs-string">'_blank'</span>
            <span class="hljs-attr">rel</span>=<span class="hljs-string">'noopener noreferrer'</span>
          &gt;</span>
            Powered by{' '}
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.logo}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">Image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'/vercel.svg'</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">'Vercel Logo'</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{72}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{16}</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
  </code></pre></div>
  <h2 id="heading-fetch-and-display-documents" style="scroll-margin-top: 110px;">Fetch and display documents</h2>
  <p>Now it's time to use Next.js's biggest feature! Server-Side Rendering. We can use SSR in Next.js to easily run back-end Node.js code as we want and the data can be easily accessible through the <code>props</code> to the page.</p>
  <p>In the <code>index.js</code> file itself, we'll import the <code>connectMongo</code> and <code>Test</code> again and use them inside the <code>getServerSideProps</code> function that we have to export like this 👇</p>
  <div style="position:relative;"><div><button class="css-1vwx61"><span class="css-2305pr"><span class="css-qqykjf">Copy</span><svg viewBox="0 0 384 512" class="css-1se2ttb"><path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg></span></button></div><pre><code class="lang-js"><span class="hljs-keyword">import</span> connectMongo <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils/connectMongo'</span>;
  <span class="hljs-keyword">import</span> Test <span class="hljs-keyword">from</span> <span class="hljs-string">'../models/testModel'</span>;
  
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getServerSideProps = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'CONNECTING TO MONGO'</span>);
      <span class="hljs-keyword">await</span> connectMongo();
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'CONNECTED TO MONGO'</span>);
  
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'FETCHING DOCUMENTS'</span>);
      <span class="hljs-keyword">const</span> tests = <span class="hljs-keyword">await</span> Test.find();
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'FETCHED DOCUMENTS'</span>);
  
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">props</span>: {
          <span class="hljs-attr">tests</span>: <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(tests)),
        },
      };
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-built_in">console</span>.log(error);
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">notFound</span>: <span class="hljs-literal">true</span>,
      };
    }
  };
  </code></pre></div>
  <p>In this function, we can easily fetch any data we want and it will be done on the server and then we have to <strong>return</strong> it as <code>props</code>. That will be accessible to the page. You can read about <a target="_blank" href="https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props"><code>getServerSideProps</code> on the Next.js docs</a></p>
  <blockquote>
  <p>IMPORTANT: Make sure to sanitize the <code>tests</code> variable with <code>JSON.parse(JSON.stringify(tests))</code> because it contains <code>ObjectID</code> from MongoDB instead of a normal string. This trick converts it into a string that can be passed in the <code>return</code> object.</p>
  </blockquote>
  <p>That's it! After we're done fetching the data we can easily display it by accessing it through the props on our page and we can use it however we want. In this case we'll map over that data to output every document like so</p>
  <div style="position:relative;"><div><button class="css-1vwx61"><span class="css-2305pr"><span class="css-qqykjf">Copy</span><svg viewBox="0 0 384 512" class="css-1se2ttb"><path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg></span></button></div><pre><code class="lang-jsx"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Home</span>(<span class="hljs-params">{ tests }</span>) </span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> (
      <span class="hljs-comment">//   ...</span>
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.grid}</span>&gt;</span>
        {tests.map((test) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
            <span class="hljs-attr">href</span>=<span class="hljs-string">"https://nextjs.org/docs"</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{test._id}</span>
            <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.card}</span>
          &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{test.name} <span class="hljs-symbol">&amp;rarr;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{test.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      <span class="hljs-comment">// ...</span>
    );
  }
  </code></pre></div>
  <p>Finally, this is what our page looks like:</p>
  <p><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1650184603173/bbdiBR1rw.png?auto=compress,format&amp;format=webp" alt="image.png"></p>
  <p>I have explained everything deeply in the YouTube tutorial below 👇👇</p>
  <div class="embed-wrapper"><div class="webembed-wrapper" style="position: relative;overflow: hidden; padding-top: 56.17977528089888%;"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/cM0pA50R20M?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="How to use Mongoose with Next.js for MongoDB | Explained with simple project" style="position: absolute; top: 0; left: 0; border: 0;" class="webembed-iframe"></div></iframe></div></div>
  <p>I hope this post helped you successfully set up Mongoose in your Next.js app. If it did, please leave a like!</p>
  <p>Comment down your thoughts! There is always room for improvement so let me know your suggestions on this project!</p>
  <p><strong>Connect with me on my <a target="_blank" href="https://youtube.com/MaxProgramming">YouTube channel</a> and my  <a target="_blank" href="https://twitter.com/maxprogramming1">Twitter</a> 😉</strong></p>
  <p>Thanks for reading ✌</p>
  </div>`;
  await post.save();
  res.status(200).json({
    code: 200,
    message: "Success",
  });
}
