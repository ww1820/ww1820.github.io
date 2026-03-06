import{_ as n,o as a,c as p,ag as l}from"./chunks/framework.DEqXEGcv.js";const m=JSON.parse('{"title":"Prometheus Client Library for Modern C++","description":"","frontmatter":{},"headers":[],"relativePath":"2 计算机/项目/Prometheus/Prometheus Client Library for Modern C++.md","filePath":"2 计算机/项目/Prometheus/Prometheus Client Library for Modern C++.md","lastUpdated":1770889489000}'),e={name:"2 计算机/项目/Prometheus/Prometheus Client Library for Modern C++.md"};function i(r,s,t,c,u,b){return a(),p("div",null,[...s[0]||(s[0]=[l(`<h1 id="prometheus-client-library-for-modern-c" tabindex="-1">Prometheus Client Library for Modern C++ <a class="header-anchor" href="#prometheus-client-library-for-modern-c" aria-label="Permalink to &quot;Prometheus Client Library for Modern C++&quot;">​</a></h1> <p>#Prometheus</p> <p>项目链接：<a href="https://github.com/jupp0r/prometheus-cpp" target="_blank" rel="noreferrer">jupp0r/prometheus-cpp: Prometheus Client Library for Modern C++ (github.com)</a></p> <h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2> <p>适用于现代 C++ 的 Prometheus 客户端库旨在实现 C++ 服务的Metric驱动开发。它实现了Promethues数据模型（Prometheus Data Model），可用于收集和暴露度量指标。</p> <h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;Requirements&quot;">​</a></h2> <p>兼容 C++11 的编译器。</p> <h2 id="building" tabindex="-1">Building <a class="header-anchor" href="#building" aria-label="Permalink to &quot;Building&quot;">​</a></h2> <p><code>prometheus-cpp</code> 支持 CMake 和 bazel 两种构建方式，CMake 是使用 <code>prometheus-cpp</code> 是首选方式，因为三个 prometheus-cpp 库之间的所有依赖关系都能得到正确处理。</p> <p>cmake/project-import 目录包含一个示例项目和最小 CMakeLists.txt。</p> <div class="language-SHELL vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">SHELL</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># fetch third-party dependencies</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> submodule</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> submodule</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> _build</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> _build</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># run cmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ..</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -DBUILD_SHARED_LIBS=ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -DENABLE_PUSH=OFF</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -DENABLE_COMPRESSION=OFF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cmake</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --parallel</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># run tests</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ctest</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -V</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>^084657</p> <p>运行三个 test：</p> <ol><li>prometheus_core_test</li> <li>prometheus_pull_internal_test</li> <li>prometheus_pull_test</li></ol> <h2 id="exposer-设计实现" tabindex="-1">Exposer 设计实现 <a class="header-anchor" href="#exposer-设计实现" aria-label="Permalink to &quot;Exposer 设计实现&quot;">​</a></h2> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Exposer</span></span>
<span class="line"><span>class CivetServer</span></span>
<span class="line"><span>class Endpoint</span></span>
<span class="line"><span>class Registry</span></span>
<span class="line"><span>class MetricsHandler</span></span>
<span class="line"><span>class CivetHandler</span></span>
<span class="line"><span>interface Collectable</span></span>
<span class="line"><span>class &quot;Famliy&lt;T&gt;&quot; &lt;&lt; template &gt;&gt;</span></span>
<span class="line"><span>class &quot;Famliy&lt;Counter&gt;&quot;</span></span>
<span class="line"><span>class &quot;Famliy&lt;Gauge&gt;&quot;</span></span>
<span class="line"><span>class &quot;Famliy&lt;Summary&gt;&quot;</span></span>
<span class="line"><span>class &quot;Famliy&lt;Histogram&gt;&quot;</span></span>
<span class="line"><span>struct MetricFamily</span></span>
<span class="line"><span>struct ClientMetric</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Counter</span></span>
<span class="line"><span>class Gauge</span></span>
<span class="line"><span>class Summary</span></span>
<span class="line"><span>class Histogram</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Exposer &quot;1&quot; o-- &quot;1&quot; CivetServer</span></span>
<span class="line"><span>Exposer &quot;1&quot; *-- &quot;n&quot; Endpoint</span></span>
<span class="line"><span>Endpoint &quot;1&quot; o-- &quot;1&quot; Registry</span></span>
<span class="line"><span>Endpoint &quot;1&quot; *-- &quot;1&quot; MetricsHandler</span></span>
<span class="line"><span>Collectable &lt;|.. Registry</span></span>
<span class="line"><span>Collectable &lt;|.. &quot;Famliy&lt;T&gt;&quot;</span></span>
<span class="line"><span>CivetHandler &lt;|-- MetricsHandler</span></span>
<span class="line"><span>MetricsHandler &quot;1&quot; o-- &quot;n&quot; Collectable</span></span>
<span class="line"><span>CivetHandler &lt;.. CivetServer</span></span>
<span class="line"><span>CivetServer &quot;1&quot; --o &quot;n&quot; Endpoint</span></span>
<span class="line"><span>Registry &quot;1&quot; o-- &quot;n&quot; &quot;Famliy&lt;Counter&gt;&quot;</span></span>
<span class="line"><span>Registry &quot;1&quot; o-- &quot;n&quot; &quot;Famliy&lt;Gauge&gt;&quot;</span></span>
<span class="line"><span>Registry &quot;1&quot; o-- &quot;n&quot; &quot;Famliy&lt;Summary&gt;&quot;</span></span>
<span class="line"><span>Registry &quot;1&quot; o-- &quot;n&quot; &quot;Famliy&lt;Histogram&gt;&quot;</span></span>
<span class="line"><span>MetricFamily &lt;.. Collectable</span></span>
<span class="line"><span>ClientMetric &lt;.. MetricFamily</span></span>
<span class="line"><span>&quot;Famliy&lt;T&gt;&quot; &lt;.. &quot;Famliy&lt;Counter&gt;&quot;</span></span>
<span class="line"><span>&quot;Famliy&lt;T&gt;&quot; &lt;.. &quot;Famliy&lt;Gauge&gt;&quot;</span></span>
<span class="line"><span>&quot;Famliy&lt;T&gt;&quot; &lt;.. &quot;Famliy&lt;Summary&gt;&quot;</span></span>
<span class="line"><span>&quot;Famliy&lt;T&gt;&quot; &lt;.. &quot;Famliy&lt;Histogram&gt;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Counter &lt;.. &quot;Famliy&lt;Counter&gt;&quot;</span></span>
<span class="line"><span>Gauge &lt;.. &quot;Famliy&lt;Gauge&gt;&quot;</span></span>
<span class="line"><span>Summary &lt;.. &quot;Famliy&lt;Summary&gt;&quot;</span></span>
<span class="line"><span>Histogram &lt;.. &quot;Famliy&lt;Histogram&gt;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface Collectable</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    + {abstract} vector&lt;MetricFamily&gt; Collect() const = 0</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Exposer </span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    + void RegisterCollectable(const weak_ptr&lt;Collectable&gt;&amp;, cosnt string)</span></span>
<span class="line"><span>    + void RemoveCollectable(const weak_ptr&lt;Collectable&gt;&amp;, cosnt string)</span></span>
<span class="line"><span>    + vector&lt;int&gt; GetListeningPorts() const</span></span>
<span class="line"><span>    - Endpoint&amp; GetEndpointForUri(cosnt string)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    - unique_ptr&lt;CivetServer&gt; server_</span></span>
<span class="line"><span>    - vector&lt;unique_ptr&lt;Endpoint&gt;&gt; endpoints_</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class CivetServer</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    + void addHandler(string &amp;uri, CivetHandler *handler)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>class Endpoint </span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    + void RegisterCollectable(const std::weak_ptr&lt;Collectable&gt;&amp;)</span></span>
<span class="line"><span>    + void RemoveCollectable(const std::weak_ptr&lt;Collectable&gt;&amp;)</span></span>
<span class="line"><span>    + string&amp; GetURI() const</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    - CivetServer&amp; server_</span></span>
<span class="line"><span>    - const string uri_;</span></span>
<span class="line"><span>    - shared_ptr&lt;Registry&gt; endpoint_registry_</span></span>
<span class="line"><span>    - unique_ptr&lt;MetricsHandler&gt; metrics_handler_</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MetricsHandler</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    + void RegisterCollectable(const std::weak_ptr&lt;Collectable&gt;&amp;)</span></span>
<span class="line"><span>    + void RemoveCollectable(const std::weak_ptr&lt;Collectable&gt;&amp;)</span></span>
<span class="line"><span>    + bool handleGet(CivetServer*, mg_connection*)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    - vector&lt;weak_ptr&lt;Collectable&gt;&gt; collectables_</span></span>
<span class="line"><span>    - Family&lt;Counter&gt;&amp; bytes_transferred_family_</span></span>
<span class="line"><span>    - Counter&amp; bytes_transferred_</span></span>
<span class="line"><span>    - Family&lt;Counter&gt;&amp; num_scrapes_family_</span></span>
<span class="line"><span>    - Counter&amp; num_scrapes_</span></span>
<span class="line"><span>    - Family&lt;Summary&gt;&amp; request_latencies_family_</span></span>
<span class="line"><span>    - Summary&amp; request_latencies_</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>note left of MetricsHandler::handleGet</span></span>
<span class="line"><span>  Callback method for </span></span>
<span class="line"><span>  http GET request.</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span>note left of MetricsHandler::RegisterCollectable</span></span>
<span class="line"><span>  pushback</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span>note left of &quot;Famliy&lt;T&gt;&quot;</span></span>
<span class="line"><span>  combine values with the</span></span>
<span class="line"><span>  same name, but distinct </span></span>
<span class="line"><span>  label dimensions</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Registry</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    - const InsertBehavior insert_behavior_</span></span>
<span class="line"><span>    - vector&lt;unique_ptr&lt;Family&lt;Counter&gt;&gt;&gt; counters_</span></span>
<span class="line"><span>    - vector&lt;unique_ptr&lt;Family&lt;Gauge&gt;&gt;&gt; gauges_</span></span>
<span class="line"><span>    - vector&lt;unique_ptr&lt;Family&lt;Histogram&gt;&gt;&gt; histograms_</span></span>
<span class="line"><span>    - vector&lt;unique_ptr&lt;Family&lt;Summary&gt;&gt;&gt; summaries_</span></span>
<span class="line"><span>    - mutable mutex mutex_</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class &quot;Famliy&lt;T&gt;&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    - unordered_map&lt;size_t, unique_ptr&lt;T&gt;&gt; metrics_</span></span>
<span class="line"><span>    - unordered_map&lt;size_t, map&lt;string, string&gt;&gt; labels_</span></span>
<span class="line"><span>    - unordered_map&lt;T*, std::size_t&gt; labels_reverse_lookup_</span></span>
<span class="line"><span>    - const string name_</span></span>
<span class="line"><span>    - const string help_</span></span>
<span class="line"><span>    - const map&lt;string, string&gt; constant_labels_</span></span>
<span class="line"><span>    - mutable mutex mutex_;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct MetricFamily</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    + string name</span></span>
<span class="line"><span>    + string help</span></span>
<span class="line"><span>    + MetricType type</span></span>
<span class="line"><span>    + vector&lt;ClientMetric&gt; metric</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct ClientMetric</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    + struct Label</span></span>
<span class="line"><span>    + struct Counter</span></span>
<span class="line"><span>    + struct Gauge</span></span>
<span class="line"><span>    + struct Summary</span></span>
<span class="line"><span>    + struct Histogram</span></span>
<span class="line"><span>    + vector&lt;Label&gt; label</span></span>
<span class="line"><span>    + Counter counter</span></span>
<span class="line"><span>    + Gauge gauge</span></span>
<span class="line"><span>    + Summary summary</span></span>
<span class="line"><span>    + Histogram histogram</span></span>
<span class="line"><span>}</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br></div></div><ol><li>Exposer
<ul><li>包含一个负责监听promethues server拉取请求的webserver和一组uri的Endpoint</li> <li>Client需要通过 <code>RegisterCollectable</code> 注册需要暴露的指标，Exposer将这些指标的地址添加到对应的MetricsHandler的收集列表中。</li></ul></li> <li>CivetServer
<ul><li>嵌入式Web服务器</li> <li>可通过 <code>addHandler</code> 添加uri请求对应的Handler（CivetHandler接口的实现）</li></ul></li> <li>Endpoint
<ul><li>包含Exposer中server的引用和一个MetricsHandler指针</li> <li>构造 Endpoint 时通过 <code>addHandler</code> 向 server 添加 uri 的 MetricsHandler</li></ul></li> <li>MetricsHandler
<ul><li>包含 Collectable 的指针数组，保存所有需要监控的指标族的地址</li> <li>重写 GET 请求的回调函数，在回调函数中遍历数组，收集所有指标样本，序列化后写入到响应体中</li></ul></li> <li>MetricFamily
<ul><li>保存收集到的指标数据的结构体，一个 MetricFamily 对象对应一系列同名指标</li> <li>MetricFamily 包含一个 ClientMetric 数组</li> <li>每个 ClientMetric 是 MetricFamily 的一个指标（根据Label区分的同名指标）</li></ul></li> <li>Collectable
<ul><li>所有可被收集的类都需要实现的接口</li></ul></li> <li>Family&lt;T&gt;
<ul><li>一系列 T 类型同名指标的集合，包含如下成员：
<ul><li>metrics_：哈希表，指标指针字典，索引为 该指标的标签集 生成的 hash</li> <li>labels_：标签集字典，索引为 hash</li> <li>labels_reverse_lookup_：反向查找表，用于移除指标时删除对应的标签集</li></ul></li></ul></li> <li>Registry
<ul><li>保存所有通过该 Registry 注册暴露的各类指标族指针</li></ul></li></ol> <h2 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h2> <p>exposer 工作流程</p> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>participant &quot;promethues server&quot; as PSer</span></span>
<span class="line"><span>participant client</span></span>
<span class="line"><span>participant exposer</span></span>
<span class="line"><span>collections endpoints</span></span>
<span class="line"><span>participant endpoint</span></span>
<span class="line"><span>participant metrics_handler</span></span>
<span class="line"><span></span></span>
<span class="line"><span>client -&gt; exposer : create an http server,\\n bind_address</span></span>
<span class="line"><span>|||</span></span>
<span class="line"><span>client -&gt; exposer : create a metrics registry,\\n ask the exposer to scrape\\n the registry on incoming\\n HTTP requests</span></span>
<span class="line"><span>exposer -&gt; endpoints : GetEndpointForUri</span></span>
<span class="line"><span>group not found</span></span>
<span class="line"><span>    endpoints -&gt; endpoint : Endpoint(*server_, uri)</span></span>
<span class="line"><span>    endpoint -&gt; metrics_handler : MetricsHandler()</span></span>
<span class="line"><span>    endpoint --&gt; exposer : addHandler(uri, handler)</span></span>
<span class="line"><span>    endpoint -&gt; endpoints : pushback</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>endpoints -&gt; exposer : return endpoint</span></span>
<span class="line"><span>exposer -&gt; endpoint : RegisterCollectable</span></span>
<span class="line"><span>endpoint -&gt; metrics_handler : RegisterCollectable</span></span>
<span class="line"><span>note over metrics_handler: pushback</span></span>
<span class="line"><span>|||</span></span>
<span class="line"><span>PSer -&gt; exposer : Http GET Request</span></span>
<span class="line"><span>exposer -&gt; metrics_handler : (uri, handler)</span></span>
<span class="line"><span>note over metrics_handler: CollectMetrics\\n Serialize</span></span>
<span class="line"><span>metrics_handler -&gt; PSer : Http Response</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div>`,37)])])}const d=n(e,[["render",i]]);export{m as __pageData,d as default};
