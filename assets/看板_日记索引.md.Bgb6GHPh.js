import{_ as a,o as n,c as p,a2 as e}from"./chunks/framework.Crpw6aS5.js";const m=JSON.parse('{"title":"📅 日记索引","description":"","frontmatter":{"cssclasses":["compact"]},"headers":[],"relativePath":"看板/日记索引.md","filePath":"看板/日记索引.md","lastUpdated":1786696479000}'),l={name:"看板/日记索引.md"};function t(i,s,r,c,o,u){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="📅-日记索引" tabindex="-1">📅 日记索引 <a class="header-anchor" href="#📅-日记索引" aria-label="Permalink to &quot;📅 日记索引&quot;">​</a></h1> <div class="language-dataviewjs vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dataviewjs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const pages = dv.pages(&#39;&quot;看板/日记&quot;&#39;)</span></span>
<span class="line"><span>  .where(p =&gt; p.file.day &amp;&amp; p.file.name !== &quot;日记索引&quot;)</span></span>
<span class="line"><span>  .sort(p =&gt; p.file.day, &quot;desc&quot;);</span></span>
<span class="line"><span>const groups = new Map();</span></span>
<span class="line"><span>for (const p of pages) {</span></span>
<span class="line"><span>  const m = p.file.day.toFormat(&quot;yyyy年MM月&quot;);</span></span>
<span class="line"><span>  if (!groups.has(m)) groups.set(m, []);</span></span>
<span class="line"><span>  groups.get(m).push(p.file.link);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (const [m, links] of groups) {</span></span>
<span class="line"><span>  dv.header(3, m);</span></span>
<span class="line"><span>  dv.list(links);</span></span>
<span class="line"><span>}</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,3)])])}const b=a(l,[["render",t]]);export{m as __pageData,b as default};
