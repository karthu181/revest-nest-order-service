<h1>🧩 Revest NestJS Product Service</h1>

<p>This is a backend service built with <strong>NestJS</strong> and uses <strong>PostgreSQL</strong> as its database.</p>

<hr />

<h2>📋 Requirements</h2>

<p>Before starting the project, make sure you have the following installed:</p>

<ul>
  <li><strong>Node.js</strong> (v16 or higher)</li>
  <li><strong>npm</strong></li>
  <li><strong>PostgreSQL</strong></li>
</ul>

<hr />

<h2>⚙️ Environment Setup</h2>

<p>Create a <code>.env</code> file in the root of the project with the following content:</p>

<pre>
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=WXuKXTrjLzLc1BP
DB_NAME=postgres
</pre>



<hr />

<h2>📦 Install Dependencies</h2>

<p>Run the following command to install all necessary packages:</p>

<pre><code>npm install</code></pre>

<hr />

<h2>🧱 Run Database Migrations</h2>

<p>To create the database tables, run:</p>

<pre><code>npm run migration:run</code></pre>

<p>This uses TypeORM to run any pending migrations.</p>

<hr />

<h2>🚀 Start the Server</h2>

<p>You can start the server using one of the following commands:</p>

<h3>🔹 Production Mode</h3>

<pre><code>npm run start</code></pre>

<h3>🔸 Development Mode (with live-reloading)</h3>

<pre><code>npm run start:dev</code></pre>

<hr />

<h2>✅ Summary</h2>

<ol>
  <li>Ensure PostgreSQL is running.</li>
  <li>Create a <code>.env</code> file with:
    <pre>
DB_HOST
DB_PORT
DB_USER
DB_PASS
DB_NAME
    </pre>
  </li>
  <li>Run <code>npm install</code></li>
  <li>Run <code>npm run migration:run</code></li>
  <li>Start the server using <code>npm run start</code> or <code>npm run start:dev</code> This runs on port 3001</li>
  <li>In order to get products with in this service, you need to start product service also</li>
  <li>Added postman collection to test apis</li>
</ol>

<hr />

<h2>🧰 Tools & Technologies</h2>

<ul>
  <li><a href="https://nestjs.com/">NestJS</a></li>
  <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  <li><a href="https://typeorm.io/">TypeORM</a></li>
  <li>Node.js</li>
</ul>

<hr />

<h2>📬 Support</h2>

<p>If you encounter any issues or have questions, feel free to open an issue on the repository.</p>
