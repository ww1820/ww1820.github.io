import{_ as s,o as a,c as p,ag as e}from"./chunks/framework.DEqXEGcv.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"5 工具/plantuml.md","filePath":"5 工具/plantuml.md","lastUpdated":1770949611000}'),l={name:"5 工具/plantuml.md"};function r(t,n,i,c,b,m){return a(),p("div",null,[...n[0]||(n[0]=[e(`<p>plantuml 中文字体</p> <div class="language-plaintext vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>skinparam defaultFontName Noto Serif CJK HK</span></span>
<span class="line"><span>TPU -&gt; gateway : 创建工程{名称、属性、描述}</span></span>
<span class="line"><span>gateway -&gt; TenonServer : 创建工程</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>note right of TenonServer</span></span>
<span class="line"><span>检查路径合法性</span></span>
<span class="line"><span>文件操作（创建）</span></span>
<span class="line"><span>&#39;</span><span> //3. 保存工程属性（ConfigServer/本地配置文件）//</span></span>
<span class="line"><span>更新文件属性、描述</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span>TenonServer -&gt; gateway : 成功/失败</span></span>
<span class="line"><span>gateway -&gt;TPU : 成功/失败</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@enduml</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,3)])])}const d=s(l,[["render",r]]);export{u as __pageData,d as default};
