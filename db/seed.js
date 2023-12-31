const {  
    client,
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    createPost,
    updatePost,
    getAllPosts,
    getAllTags,
    getPostsByTagName
  } = require('./index');
  
  async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      // have to make sure to drop in correct order
      await client.query(`
        DROP TABLE IF EXISTS post_tags;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
      `);
  
      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
  }
  
  async function createTables() {
    try {
      console.log("Starting to build tables...");
  
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          location varchar(255) NOT NULL,
          active boolean DEFAULT true
        );
  
        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id),
          title varchar(255) NOT NULL,
          content TEXT NOT NULL,
          active BOOLEAN DEFAULT true
        );
  
        CREATE TABLE tags (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL
        );
  
        CREATE TABLE post_tags (
          "postId" INTEGER REFERENCES posts(id),
          "tagId" INTEGER REFERENCES tags(id),
          UNIQUE ("postId", "tagId")
        );
      `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }
  
  async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
      await createUser({ 
        username: 'LTSoni', 
        password: 'shadowbroker106',
        name: 'Liara T\'Soni',
        location: 'Nos Astra, Illium, Talasale System, Crescent Nebula' 
      });
      await createUser({ 
        username: 'CHalsey', 
        password: 'ONI117',
        name: 'Catherine Elizabeth Halsey',
        location: 'Port Vernon, Endymion'
      });
      await createUser({ 
        username: 'Brainiac5',
        password: 'worldcollector',
        name: 'Vril Dox',
        location: 'Colu'
      });
  
      console.log("Finished creating users!");
    } catch (error) {
      console.error("Error creating users!");
      throw error;
    }
  }
  
  async function createInitialPosts() {
    try {
      const [LTSoni, CHalsey, Braniac1M] = await getAllUsers();
  
      console.log("Starting to create posts...");
      await createPost({
        authorId: LTSoni.id,
        title: "First Post",
        content: "This is my first post. I hope I love writing blogs as much as I love writing them.",
        tags: ["#happy", "#youcandoanything"]
      });
  
      await createPost({
        authorId: CHalsey.id,
        title: "How does this work?",
        content: "Seriously, does this even do anything? This is the human interface? Atrocious.",
        tags: ["#happy", "#worst-day-ever"]
      });
  
      await createPost({
        authorId: Braniac1M.id,
        title: "Colu",
        content: "I am aware. But your planet has also piqued my interest. Its many contradictions are fascinating.",
        tags: ["#happy", "#youcandoanything", "#canmandoeverything"]
      });
      console.log("Finished creating posts!");
    } catch (error) {
      console.log("Error creating posts!");
      throw error;
    }
  }
  
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialPosts();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }
  
  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      console.log("Calling getAllUsers");
      const users = await getAllUsers();
      console.log("Result:", users);
  
      console.log("Calling updateUser on users[0]");
      const updateUserResult = await updateUser(users[0].id, {
        name: "Newname Sogood",
        location: "Lesterville, KY"
      });
      console.log("Result:", updateUserResult);
  
      console.log("Calling getAllPosts");
      const posts = await getAllPosts();
      console.log("Result:", posts);
  
      console.log("Calling updatePost on posts[0]");
      const updatePostResult = await updatePost(posts[0].id, {
        title: "New Title",
        content: "Updated Content"
      });
      console.log("Result:", updatePostResult);
  
      console.log("Calling updatePost on posts[1], only updating tags");
      const updatePostTagsResult = await updatePost(posts[1].id, {
        tags: ["#youcandoanything", "#redfish", "#bluefish"]
      });
      console.log("Result:", updatePostTagsResult);
  
      console.log("Calling getUserById with 1");
      const albert = await getUserById(1);
      console.log("Result:", albert);
  
      console.log("Calling getAllTags");
      const allTags = await getAllTags();
      console.log("Result:", allTags);
  
      console.log("Calling getPostsByTagName with #happy");
      const postsWithHappy = await getPostsByTagName("#happy");
      console.log("Result:", postsWithHappy);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.log("Error during testDB");
      throw error;
    }
  }
  
  
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());