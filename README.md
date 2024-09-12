<h1><b>YelpCamp</b></h1>

<p><b>YelpCamp</b> is a full-stack web application that allows users to create, browse, and review campgrounds. Built with Node.js, Express, MongoDB, and other modern web technologies, it features user authentication, profile pages, image uploads, and review functionality.</p>

<h2><b>Table of Contents</b></h2>
<ul>
  <li><a href="#features">Features</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#project-structure">Project Structure</a></li>
  <li><a href="#screenshots">Screenshots</a></li>
  <li><a href="#future-improvements">Future Improvements</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
</ul>

<h2 id="features"><b>Features</b></h2>
<ul>
  <li><b>User Authentication:</b> Register, login, and manage profile pages.</li>
  <li><b>Campground Management:</b> Users can create, edit, and delete campgrounds.</li>
  <li><b>Review System:</b> Users can add reviews to campgrounds and rate them.</li>
  <li><b>Image Uploads:</b> Upload and display campground images using Cloudinary.</li>
  <li><b>Responsive Design:</b> Fully responsive for desktop and mobile views.</li>
  <li><b>Search Functionality:</b> Search for campgrounds by name or location.</li>
</ul>

<h2 id="installation"><b>Installation</b></h2>
<p>To run this project locally, follow these steps:</p>

<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/MohitSharma66/yelp-camp.git</code></pre>
  </li>
  <li>Navigate to the project directory:
    <pre><code>cd yelp-camp</code></pre>
  </li>
  <li>Install the required dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Set up environment variables:
    <p>Create a <code>.env</code> file in the root directory with the following variables:</p>
    <pre><code>
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
MONGO_URI=your-mongodb-uri
SESSION_SECRET=your-secret
    </code></pre>
  </li>
  <li>Start the application:
    <pre><code>npm start</code></pre>
  </li>
  <li>Visit the app in your browser at <a href="http://localhost:3000">http://localhost:3000</a>.</li>
</ol>

<h2 id="usage"><b>Usage</b></h2>
<ul>
  <li><b>Campgrounds:</b> Browse campgrounds, view details, and add your own campgrounds.</li>
  <li><b>User Profiles:</b> Click on usernames to view user profiles with campgrounds and reviews.</li>
  <li><b>Reviews:</b> Leave reviews on campgrounds, and edit or delete your own reviews.</li>
</ul>

<h2 id="technologies"><b>Technologies</b></h2>
<ul>
  <li><b>Frontend:</b> EJS, Bootstrap, JavaScript</li>
  <li><b>Backend:</b> Node.js, Express.js</li>
  <li><b>Database:</b> MongoDB, Mongoose</li>
  <li><b>Authentication:</b> Passport.js</li>
  <li><b>File Uploads:</b> Cloudinary for image storage</li>
  <li><b>Deployment:</b> Render (or Heroku)</li>
</ul>

<h2 id="project-structure"><b>Project Structure</b></h2>
<pre><code>
yelp-camp/
│
├── models/          # Mongoose models for Users, Campgrounds, Reviews
├── routes/          # Express routes for handling requests
├── views/           # EJS templates for rendering pages
├── public/          # Static files (CSS, JS, images)
├── controllers/     # Business logic for campgrounds, reviews, users
├── middleware/      # Custom middleware functions
├── app.js           # Main application file
└── package.json     # Project metadata and dependencies
</code></pre>

<h2 id="screenshots"><b>Screenshots</b></h2>
<p><b>Home Page</b></p>
![image](https://github.com/user-attachments/assets/7b9ae544-554a-4eab-9858-c8b87701577e)

<p><b>Campground Details</b></p>
![image](https://github.com/user-attachments/assets/250f2c6c-b9a8-4050-a594-6e8adc41ab57)

<p><b>User Profile</b></p>
![image](https://github.com/user-attachments/assets/8f296f1c-ec97-430b-b210-2698729e23d0)


<h2 id="future-improvements"><b>Future Improvements</b></h2>
<ul>
  <li><b>Notifications:</b> Implement real-time notifications for campground updates or new reviews.</li>
  <li><b>Admin Panel:</b> Create an admin panel to manage campgrounds and users.</li>
</ul>

<h2 id="contributing"><b>Contributing</b></h2>
<p>Feel free to fork this project and submit a pull request. Contributions and suggestions are always welcome!</p>

<ol>
  <li>Fork the project.</li>
  <li>Create a feature branch (<code>git checkout -b feature/AmazingFeature</code>).</li>
  <li>Commit your changes (<code>git commit -m 'Add some AmazingFeature'</code>).</li>
  <li>Push to the branch (<code>git push origin feature/AmazingFeature</code>).</li>
  <li>Open a pull request.</li>
</ol>

<h2 id="license"><b>License</b></h2>
<p>This project is licensed under the <b>MIT License</b>.</p>
