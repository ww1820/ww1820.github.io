import{_ as a,o as n,c as e,ag as p}from"./chunks/framework.DEqXEGcv.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"2 计算机/开发框架/ROS2/08-ros2 bag 表结构.md","filePath":"2 计算机/开发框架/ROS2/08-ros2 bag 表结构.md","lastUpdated":1770949611000}'),l={name:"2 计算机/开发框架/ROS2/08-ros2 bag 表结构.md"};function i(t,s,r,c,m,o){return n(),e("div",null,[...s[0]||(s[0]=[p(`<div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ sqlite3</span></span>
<span class="line"><span>SQLite version 3.37.2 2022-01-06 13:25:41</span></span>
<span class="line"><span>Enter &quot;.help&quot; for usage hints.</span></span>
<span class="line"><span>Connected to a transient in-memory database.</span></span>
<span class="line"><span>Use &quot;.open FILENAME&quot; to reopen on a persistent database.</span></span>
<span class="line"><span>sqlite&gt; .open  rosbag2_2025_11_13-08_52_36_0.db3</span></span>
<span class="line"><span>sqlite&gt; ANALYZE;</span></span>
<span class="line"><span>sqlite&gt; .tables</span></span>
<span class="line"><span>messages  metadata  schema    topics</span></span>
<span class="line"><span>sqlite&gt; .schema metadata</span></span>
<span class="line"><span>CREATE TABLE metadata(id INTEGER PRIMARY KEY,metadata_version INTEGER NOT NULL,metadata TEXT NOT NULL);</span></span>
<span class="line"><span>sqlite&gt; .schema schema</span></span>
<span class="line"><span>CREATE TABLE schema(schema_version INTEGER PRIMARY KEY,ros_distro TEXT NOT NULL);</span></span>
<span class="line"><span>sqlite&gt; .schema topics</span></span>
<span class="line"><span>CREATE TABLE topics(id INTEGER PRIMARY KEY,name TEXT NOT NULL,type TEXT NOT NULL,serialization_format TEXT NOT NULL,offered_qos_profiles TEXT NOT NULL);</span></span>
<span class="line"><span>sqlite&gt; .schema messages</span></span>
<span class="line"><span>CREATE TABLE messages(id INTEGER PRIMARY KEY,topic_id INTEGER NOT NULL,timestamp INTEGER NOT NULL, data BLOB NOT NULL);</span></span>
<span class="line"><span>CREATE INDEX timestamp_idx ON messages (timestamp ASC);</span></span>
<span class="line"><span>sqlite&gt;</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><img src="https://blog-1312962011.cos.ap-nanjing.myqcloud.com/imgs/20251113103028.png" alt="image.png" loading="lazy"></p>`,2)])])}const E=a(l,[["render",i]]);export{d as __pageData,E as default};
