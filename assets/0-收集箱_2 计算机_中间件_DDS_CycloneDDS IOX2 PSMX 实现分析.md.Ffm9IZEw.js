import{_ as n,o as a,c as p,a2 as e}from"./chunks/framework.Crpw6aS5.js";const _=JSON.parse('{"title":"CycloneDDS IOX2 PSMX 实现分析","description":"","frontmatter":{},"headers":[],"relativePath":"0-收集箱/2 计算机/中间件/DDS/CycloneDDS IOX2 PSMX 实现分析.md","filePath":"0-收集箱/2 计算机/中间件/DDS/CycloneDDS IOX2 PSMX 实现分析.md","lastUpdated":1786948858000}'),l={name:"0-收集箱/2 计算机/中间件/DDS/CycloneDDS IOX2 PSMX 实现分析.md"};function i(r,s,t,c,d,o){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="cyclonedds-iox2-psmx-实现分析" tabindex="-1">CycloneDDS IOX2 PSMX 实现分析 <a class="header-anchor" href="#cyclonedds-iox2-psmx-实现分析" aria-label="Permalink to &quot;CycloneDDS IOX2 PSMX 实现分析&quot;">​</a></h1> <h2 id="_1-架构总览" tabindex="-1">1. 架构总览 <a class="header-anchor" href="#_1-架构总览" aria-label="Permalink to &quot;1. 架构总览&quot;">​</a></h2> <p>CycloneDDS 通过 PSMX（Publish-Subscribe Messaging eXtension）接口集成 iceoryx2（iox2），
实现基于共享内存的零拷贝数据传输。核心实现位于：</p> <ul><li><code>src/psmx_iox/src/psmx_iox2_impl.c</code> — IOX2 PSMX 插件实现</li> <li><code>src/core/ddsc/src/dds_write.c</code> — DDS 写入路径（含序列化逻辑）</li> <li><code>src/core/ddsc/src/dds_writer.c</code> — Writer loan 管理</li></ul> <h3 id="_1-1-数据结构层次" tabindex="-1">1.1 数据结构层次 <a class="header-anchor" href="#_1-1-数据结构层次" aria-label="Permalink to &quot;1.1 数据结构层次&quot;">​</a></h3> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>skinparam classAttributeIconSize 0</span></span>
<span class="line"><span>skinparam classFontSize 12</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class psmx_iox2_t {</span></span>
<span class="line"><span>  dds_psmx_t base</span></span>
<span class="line"><span>  bool support_keyed_topics</span></span>
<span class="line"><span>  bool allow_nondisc_wr</span></span>
<span class="line"><span>  dds_psmx_node_identifier_t node_id</span></span>
<span class="line"><span>  iox2_node_h node_handle</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class psmx_iox2_topic_t {</span></span>
<span class="line"><span>  dds_psmx_topic_t base</span></span>
<span class="line"><span>  psmx_iox2_t* parent</span></span>
<span class="line"><span>  uint32_t type_size</span></span>
<span class="line"><span>  const char* topic_name</span></span>
<span class="line"><span>  const char* type_name</span></span>
<span class="line"><span>  **iox2_type_variant_e type_variant**</span></span>
<span class="line"><span>  ddsrt_avl_tree_t partitions</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class psmx_iox2_partition_topic_t {</span></span>
<span class="line"><span>  uint32_t refc</span></span>
<span class="line"><span>  char* iox2_topic_name</span></span>
<span class="line"><span>  iox2_port_factory_pub_sub_h service_handle</span></span>
<span class="line"><span>  iox2_port_factory_event_h factory_event_handle</span></span>
<span class="line"><span>  iox2_notifier_h notifier</span></span>
<span class="line"><span>  psmx_iox2_endpoint_t** readers</span></span>
<span class="line"><span>  ddsrt_thread_t listener_thread</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class psmx_iox2_endpoint_t {</span></span>
<span class="line"><span>  dds_psmx_endpoint_t base</span></span>
<span class="line"><span>  psmx_iox2_partition_topic_t* part_topic</span></span>
<span class="line"><span>  union { iox2_publisher_h wr; iox2_subscriber_h rd; }</span></span>
<span class="line"><span>  dds_entity_t cdds_endpoint</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class psmx_iox2_loaned_sample_t {</span></span>
<span class="line"><span>  dds_loaned_sample_t base</span></span>
<span class="line"><span>  union { iox2_sample_mut_h mut; iox2_sample_h cnst; }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>psmx_iox2_t &quot;1&quot; *-- &quot;N&quot; psmx_iox2_topic_t : parent</span></span>
<span class="line"><span>psmx_iox2_topic_t &quot;1&quot; *-- &quot;N&quot; psmx_iox2_partition_topic_t : partitions (AVL树)</span></span>
<span class="line"><span>psmx_iox2_partition_topic_t &quot;1&quot; *-- &quot;N&quot; psmx_iox2_endpoint_t : readers/writers</span></span>
<span class="line"><span>psmx_iox2_endpoint_t ..&gt; psmx_iox2_loaned_sample_t : 借用/接收</span></span>
<span class="line"><span>@enduml</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><hr> <h2 id="_2-动态类型-string-sequence-处理" tabindex="-1">2. 动态类型（String/Sequence）处理 <a class="header-anchor" href="#_2-动态类型-string-sequence-处理" aria-label="Permalink to &quot;2. 动态类型（String/Sequence）处理&quot;">​</a></h2> <h3 id="_2-1-类型判定" tabindex="-1">2.1 类型判定 <a class="header-anchor" href="#_2-1-类型判定" aria-label="Permalink to &quot;2.1 类型判定&quot;">​</a></h3> <p>创建主题时，通过 <code>DDS_DATA_TYPE_IS_MEMCPY_SAFE</code> 标志位判断类型是&quot;固定大小&quot;还是&quot;动态&quot;：</p> <blockquote><p>源码位置: <code>psmx_iox2_impl.c</code> 第 942–945 行</p></blockquote> <div class="language-c vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">topic</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type_variant </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ((data_type_props </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DDS_DATA_TYPE_IS_MEMCPY_SAFE) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                       DDS_DATA_TYPE_IS_MEMCPY_SAFE)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                          ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> iox2_type_variant_e_FIXED_SIZE</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                          :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> iox2_type_variant_e_DYNAMIC;</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><table tabindex="0"><thead><tr><th>类型分类</th> <th>含义</th> <th>举例</th></tr></thead> <tbody><tr><td><code>FIXED_SIZE</code> (memcpy-safe)</td> <td>纯 POD 类型，无指针/动态成员</td> <td><code>struct { int32_t x; double y; }</code></td></tr> <tr><td><code>DYNAMIC</code> (非 memcpy-safe)</td> <td>含指针或变长成员</td> <td>含 <code>string</code>、<code>sequence</code>、<code>optional</code> 的类型</td></tr></tbody></table> <h3 id="_2-2-两种类型在各环节的差异" tabindex="-1">2.2 两种类型在各环节的差异 <a class="header-anchor" href="#_2-2-两种类型在各环节的差异" aria-label="Permalink to &quot;2.2 两种类型在各环节的差异&quot;">​</a></h3> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>skinparam ActivityFontSize 12</span></span>
<span class="line"><span></span></span>
<span class="line"><span>start</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:创建主题 (create_topic_w_type);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (DDS_DATA_TYPE_IS_MEMCPY_SAFE?) then (是)</span></span>
<span class="line"><span>  :type_variant = **FIXED_SIZE**;</span></span>
<span class="line"><span>else (否: 含 string/sequence 等)</span></span>
<span class="line"><span>  :type_variant = **DYNAMIC**;</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>partition &quot;创建 IOX2 服务 (get_part_topic)&quot; {</span></span>
<span class="line"><span>  :iox2_service_builder_pub_sub_set_payload_type_details(</span></span>
<span class="line"><span>    type_variant, type_name, type_size, alignment);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>partition &quot;初始化 Writer (psmx_iox2_init_writer)&quot; {</span></span>
<span class="line"><span>  if (type_variant?) then (FIXED_SIZE)</span></span>
<span class="line"><span>    :分配策略 = **STATIC**</span></span>
<span class="line"><span>    (预分配固定大小内存池);</span></span>
<span class="line"><span>  else (DYNAMIC)</span></span>
<span class="line"><span>    :分配策略 = **BEST_FIT**</span></span>
<span class="line"><span>    (按需动态分配最优匹配块);</span></span>
<span class="line"><span>  endif</span></span>
<span class="line"><span>  :set_initial_max_slice_len(type_size);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>partition &quot;请求 Loan (psmx_iox2_req_loan)&quot; {</span></span>
<span class="line"><span>  if (type_variant?) then (FIXED_SIZE)</span></span>
<span class="line"><span>    :size_requested = **1**</span></span>
<span class="line"><span>    (一个固定结构体大小);</span></span>
<span class="line"><span>  else (DYNAMIC)</span></span>
<span class="line"><span>    :size_requested = **调用者传入的序列化后字节数**;</span></span>
<span class="line"><span>  endif</span></span>
<span class="line"><span>  :iox2_publisher_loan_slice_uninit(size_requested);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stop</span></span>
<span class="line"><span>@enduml</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h3 id="_2-3-写入路径中的序列化" tabindex="-1">2.3 写入路径中的序列化 <a class="header-anchor" href="#_2-3-写入路径中的序列化" aria-label="Permalink to &quot;2.3 写入路径中的序列化&quot;">​</a></h3> <p>序列化发生在 DDS 核心层（<code>dds_write.c</code> / <code>dds_writer.c</code>），而非 IOX2 插件内部。
核心函数 <code>dds_write_impl_psmxloan_serdata</code> 根据类型选择不同路径：</p> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>skinparam ActivityFontSize 11</span></span>
<span class="line"><span></span></span>
<span class="line"><span>start</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:dds_write_impl(wr, data, timestamp, action);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:dds_write_impl_psmxloan_serdata();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (用户提供了 PSMX loan?) then (是)</span></span>
<span class="line"><span>  :assert(is_memcpy_safe)</span></span>
<span class="line"><span>  数据已在共享内存中</span></span>
<span class="line"><span>  **无需序列化**;</span></span>
<span class="line"><span>  :psmx_loan = 用户的 loan;</span></span>
<span class="line"><span>elseif (is_memcpy_safe?) then (是)</span></span>
<span class="line"><span>  :**路径 A: memcpy 直传**</span></span>
<span class="line"><span>  dds_writer_psmx_loan_raw();</span></span>
<span class="line"><span>  note right</span></span>
<span class="line"><span>    1. request_psmx_loan(sizeof_type)</span></span>
<span class="line"><span>    2. memcpy(loan-&gt;sample_ptr, data, sizeof_type)</span></span>
<span class="line"><span>    3. sample_state = RAW_DATA</span></span>
<span class="line"><span>  end note</span></span>
<span class="line"><span>else (否: 含 string/sequence 等动态类型)</span></span>
<span class="line"><span>  if (仅 PSMX &amp;&amp; 支持 get_serialized_size?) then (是)</span></span>
<span class="line"><span>    :**路径 B: 直接序列化到 loan**</span></span>
<span class="line"><span>    dds_write_impl_serialize_into_loan();</span></span>
<span class="line"><span>    note right</span></span>
<span class="line"><span>      1. ddsi_sertype_get_serialized_size() → 获取大小</span></span>
<span class="line"><span>      2. request_psmx_loan(padded_size)</span></span>
<span class="line"><span>      3. ddsi_sertype_serialize_into(loan-&gt;sample_ptr)</span></span>
<span class="line"><span>      4. sample_state = SERIALIZED_DATA</span></span>
<span class="line"><span>    end note</span></span>
<span class="line"><span>  else (否)</span></span>
<span class="line"><span>    :**路径 C: 先构建 serdata，再拷贝到 loan**</span></span>
<span class="line"><span>    dds_writer_psmx_loan_from_serdata();</span></span>
<span class="line"><span>    note right</span></span>
<span class="line"><span>      1. ddsi_serdata_from_sample() → 构建 serdata</span></span>
<span class="line"><span>      2. loan_size = serdata_size - 4 (去掉CDR头)</span></span>
<span class="line"><span>      3. request_psmx_loan(loan_size)</span></span>
<span class="line"><span>      4. ddsi_serdata_to_ser(serdata → loan-&gt;sample_ptr)</span></span>
<span class="line"><span>      5. sample_state = SERIALIZED_DATA</span></span>
<span class="line"><span>    end note</span></span>
<span class="line"><span>  endif</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:dds_write_impl_deliver_via_psmx()</span></span>
<span class="line"><span>通过 iox2 共享内存发送;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stop</span></span>
<span class="line"><span>@enduml</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h4 id="关键序列化函数对照" tabindex="-1">关键序列化函数对照 <a class="header-anchor" href="#关键序列化函数对照" aria-label="Permalink to &quot;关键序列化函数对照&quot;">​</a></h4> <table tabindex="0"><thead><tr><th>函数</th> <th>源文件</th> <th>行号</th> <th>用途</th></tr></thead> <tbody><tr><td><code>dds_writer_psmx_loan_raw</code></td> <td><code>dds_writer.c</code></td> <td>616–631</td> <td>memcpy-safe 类型：直接 memcpy 到共享内存</td></tr> <tr><td><code>dds_write_impl_serialize_into_loan</code></td> <td><code>dds_write.c</code></td> <td>639–657</td> <td>动态类型快速路径：直接序列化到 loan</td></tr> <tr><td><code>dds_writer_psmx_loan_from_serdata</code></td> <td><code>dds_writer.c</code></td> <td>633–650</td> <td>动态类型通用路径：从 serdata 拷贝 CDR 到 loan</td></tr> <tr><td><code>dds_writecdr_impl_ensureloan</code></td> <td><code>dds_write.c</code></td> <td>435–458</td> <td>writecdr 路径：从已有 serdata 提取到 loan</td></tr></tbody></table> <h3 id="_2-4-loan-中的-sample-state" tabindex="-1">2.4 Loan 中的 sample_state <a class="header-anchor" href="#_2-4-loan-中的-sample-state" aria-label="Permalink to &quot;2.4 Loan 中的 sample_state&quot;">​</a></h3> <table tabindex="0"><thead><tr><th>sample_state</th> <th>含义</th> <th>何时设置</th></tr></thead> <tbody><tr><td><code>RAW_DATA</code> / <code>RAW_KEY</code></td> <td>原始内存布局（memcpy-safe 类型）</td> <td><code>dds_writer_psmx_loan_raw</code></td></tr> <tr><td><code>SERIALIZED_DATA</code> / <code>SERIALIZED_KEY</code></td> <td>CDR 序列化数据（动态类型）</td> <td><code>serialize_into_loan</code> / <code>loan_from_serdata</code></td></tr> <tr><td><code>UNITIALIZED</code></td> <td>初始状态（用户尚未填充）</td> <td><code>request_loan</code></td></tr></tbody></table> <hr> <h2 id="_3-qos-实现情况" tabindex="-1">3. QoS 实现情况 <a class="header-anchor" href="#_3-qos-实现情况" aria-label="Permalink to &quot;3. QoS 实现情况&quot;">​</a></h2> <h3 id="_3-1-qos-兼容性检查-psmx-iox2-type-qos-supported" tabindex="-1">3.1 QoS 兼容性检查 (<code>psmx_iox2_type_qos_supported</code>) <a class="header-anchor" href="#_3-1-qos-兼容性检查-psmx-iox2-type-qos-supported" aria-label="Permalink to &quot;3.1 QoS 兼容性检查 (\`psmx_iox2_type_qos_supported\`)&quot;">​</a></h3> <blockquote><p>源码位置: <code>psmx_iox2_impl.c</code> 第 868–911 行</p></blockquote> <p>此函数在创建端点前检查 QoS 是否与 IOX2 兼容，不兼容则回退到网络传输。</p> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>skinparam ActivityFontSize 11</span></span>
<span class="line"><span></span></span>
<span class="line"><span>start</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:psmx_iox2_type_qos_supported(data_type, qos);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (含 KEY 且 !support_keyed_topics?) then (不支持)</span></span>
<span class="line"><span>  :return **false**;</span></span>
<span class="line"><span>  stop</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (endpoint_type == UNSET?) then (是: 仅主题级检查)</span></span>
<span class="line"><span>  :return **true**;</span></span>
<span class="line"><span>  stop</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (分区数 &gt; 1 或含通配符?) then (是)</span></span>
<span class="line"><span>  :return **false**;</span></span>
<span class="line"><span>  stop</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (Durability ∉ {VOLATILE, TRANSIENT_LOCAL}?) then (是)</span></span>
<span class="line"><span>  :return **false**;</span></span>
<span class="line"><span>  stop</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (Liveliness ≠ AUTOMATIC?) then (是)</span></span>
<span class="line"><span>  :return **false**;</span></span>
<span class="line"><span>  stop</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (Deadline ≠ INFINITY?) then (是)</span></span>
<span class="line"><span>  :return **false**;</span></span>
<span class="line"><span>  stop</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (IgnoreLocal ≠ NONE?) then (是)</span></span>
<span class="line"><span>  :return **false**;</span></span>
<span class="line"><span>  stop</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:return **true**;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stop</span></span>
<span class="line"><span>@enduml</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><h3 id="_3-2-已实现的-qos-映射" tabindex="-1">3.2 已实现的 QoS 映射 <a class="header-anchor" href="#_3-2-已实现的-qos-映射" aria-label="Permalink to &quot;3.2 已实现的 QoS 映射&quot;">​</a></h3> <table tabindex="0"><thead><tr><th>DDS QoS</th> <th>IOX2 实现</th> <th>源码位置</th> <th>说明</th></tr></thead> <tbody><tr><td><strong>Reliability</strong></td> <td><strong>已实现</strong></td> <td><code>psmx_iox2_init_writer</code> 第 1036–1044 行</td> <td><code>BEST_EFFORT</code> → <code>DISCARD_SAMPLE</code>；<code>RELIABLE</code> → <code>BLOCK</code></td></tr> <tr><td><strong>Partition</strong></td> <td><strong>已实现</strong></td> <td><code>create_iox2_topic_name</code> 第 636–663 行</td> <td>主题名+分区名哈希 → 唯一 IOX2 服务名</td></tr> <tr><td><strong>Durability</strong></td> <td><strong>部分支持</strong></td> <td>QoS 检查第 893–897 行</td> <td>仅允许 <code>VOLATILE</code> 和 <code>TRANSIENT_LOCAL</code>，不支持 <code>PERSISTENT</code> / <code>TRANSIENT</code></td></tr> <tr><td><strong>Liveliness</strong></td> <td><strong>仅默认值</strong></td> <td>QoS 检查第 898–901 行</td> <td>仅允许 <code>AUTOMATIC</code>，不支持 <code>MANUAL_BY_*</code></td></tr> <tr><td><strong>Deadline</strong></td> <td><strong>未实现</strong></td> <td>QoS 检查第 902–905 行</td> <td>仅允许 <code>INFINITY</code>（即无 deadline）</td></tr> <tr><td><strong>IgnoreLocal</strong></td> <td><strong>仅默认值</strong></td> <td>QoS 检查第 906–909 行</td> <td>仅允许 <code>NONE</code></td></tr> <tr><td><strong>Keyed Topics</strong></td> <td><strong>可配置</strong></td> <td>QoS 检查第 874–876 行</td> <td>通过配置 <code>KEYED_TOPICS=true/false</code> 启用/禁用</td></tr></tbody></table> <h3 id="_3-3-被注释-未实现的-qos" tabindex="-1">3.3 被注释/未实现的 QoS <a class="header-anchor" href="#_3-3-被注释-未实现的-qos" aria-label="Permalink to &quot;3.3 被注释/未实现的 QoS&quot;">​</a></h3> <p>以下 QoS 在代码中有注释标注但<strong>尚未实现</strong>：</p> <table tabindex="0"><thead><tr><th>QoS/特性</th> <th>代码注释</th> <th>位置</th></tr></thead> <tbody><tr><td><strong>History</strong></td> <td><code>iox2_service_builder_pub_sub_set_history_size</code> — 被注释掉，原因是&quot;导致乱序接收&quot;</td> <td>第 743–753 行</td></tr> <tr><td><strong>Safe Overflow</strong></td> <td><code>iox2_service_builder_pub_sub_set_enable_safe_overflow</code> — 被注释掉，原因是&quot;导致写阻塞&quot;</td> <td>第 751–753 行</td></tr> <tr><td><strong>Resource Limits</strong></td> <td><code>iox2_port_factory_publisher_builder_set_max_loaned_samples</code> — 标注 <code>qos-&gt;resource_limits?</code> 待实现</td> <td>第 1023–1025 行</td></tr> <tr><td><strong>Subscriber Buffer</strong></td> <td><code>iox2_service_builder_pub_sub_set_subscriber_max_buffer_size</code> — 标注 <code>???</code></td> <td>第 754 行</td></tr> <tr><td><strong>Event Deadline</strong></td> <td><code>iox2_service_builder_event_set_deadline</code> 等 — 标注与 deadline QoS 相关</td> <td>第 777–792 行</td></tr> <tr><td><strong>静态拓扑</strong></td> <td><code>set_max_nodes</code>, <code>set_max_publishers</code>, <code>set_max_subscribers</code>, <code>set_max_listeners</code> 等 — 标注&quot;仅静态拓扑&quot;</td> <td>多处</td></tr> <tr><td><strong>write_with_key</strong></td> <td><code>psmx_ep_ops.write_with_key = NULL</code> — 标注 <code>!!!TODO!!! check whether this can be implemented in IOX2</code></td> <td>第 182–184 行</td></tr></tbody></table> <h3 id="_3-4-qos-总览图" tabindex="-1">3.4 QoS 总览图 <a class="header-anchor" href="#_3-4-qos-总览图" aria-label="Permalink to &quot;3.4 QoS 总览图&quot;">​</a></h3> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>skinparam defaultFontSize 12</span></span>
<span class="line"><span>left to right direction</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rectangle &quot;DDS QoS&quot; {</span></span>
<span class="line"><span>  rectangle &quot;**已实现**&quot; #LightGreen {</span></span>
<span class="line"><span>    (Reliability) as R</span></span>
<span class="line"><span>    (Partition) as P</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  rectangle &quot;**部分支持\\n(仅允许特定值)**&quot; #Khaki {</span></span>
<span class="line"><span>    (Durability\\nVOLATILE/TRANSIENT_LOCAL) as D</span></span>
<span class="line"><span>    (Liveliness\\n仅 AUTOMATIC) as L</span></span>
<span class="line"><span>    (Deadline\\n仅 INFINITY) as DL</span></span>
<span class="line"><span>    (IgnoreLocal\\n仅 NONE) as IL</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  rectangle &quot;**未实现\\n(代码中已注释)**&quot; #LightCoral {</span></span>
<span class="line"><span>    (History) as H</span></span>
<span class="line"><span>    (Resource Limits) as RL</span></span>
<span class="line"><span>    (Safe Overflow) as SO</span></span>
<span class="line"><span>    (write_with_key) as WK</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rectangle &quot;IOX2 映射&quot; {</span></span>
<span class="line"><span>  (unable_to_deliver_strategy) as UDS</span></span>
<span class="line"><span>  (service name hash) as SNH</span></span>
<span class="line"><span>  (QoS检查拒绝 → 回退网络) as REJECT</span></span>
<span class="line"><span>  (被注释/TODO) as TODO</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>R --&gt; UDS : BEST_EFFORT→DISCARD\\nRELIABLE→BLOCK</span></span>
<span class="line"><span>P --&gt; SNH : topic_name + partition → hash</span></span>
<span class="line"><span>D --&gt; REJECT</span></span>
<span class="line"><span>L --&gt; REJECT</span></span>
<span class="line"><span>DL --&gt; REJECT</span></span>
<span class="line"><span>IL --&gt; REJECT</span></span>
<span class="line"><span>H --&gt; TODO</span></span>
<span class="line"><span>RL --&gt; TODO</span></span>
<span class="line"><span>SO --&gt; TODO</span></span>
<span class="line"><span>WK --&gt; TODO</span></span>
<span class="line"><span>@enduml</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><hr> <h2 id="_4-完整写入流程" tabindex="-1">4. 完整写入流程 <a class="header-anchor" href="#_4-完整写入流程" aria-label="Permalink to &quot;4. 完整写入流程&quot;">​</a></h2> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>skinparam sequenceFontSize 11</span></span>
<span class="line"><span></span></span>
<span class="line"><span>participant &quot;用户代码&quot; as User</span></span>
<span class="line"><span>participant &quot;dds_write_impl\\n(dds_write.c)&quot; as Write</span></span>
<span class="line"><span>participant &quot;dds_writer.c\\nloan管理&quot; as Writer</span></span>
<span class="line"><span>participant &quot;psmx_iox2_impl.c\\nIOX2 插件&quot; as IOX2</span></span>
<span class="line"><span>participant &quot;iceoryx2\\n共享内存&quot; as SHM</span></span>
<span class="line"><span>participant &quot;监听器线程&quot; as Listener</span></span>
<span class="line"><span>participant &quot;订阅者端&quot; as Sub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>== 写入固定大小类型 (memcpy-safe) ==</span></span>
<span class="line"><span></span></span>
<span class="line"><span>User -&gt; Write: dds_write(writer, &amp;data)</span></span>
<span class="line"><span>Write -&gt; Writer: dds_writer_psmx_loan_raw()</span></span>
<span class="line"><span>Writer -&gt; IOX2: psmx_iox2_req_loan(sizeof_type)</span></span>
<span class="line"><span>note right: size_requested = 1</span></span>
<span class="line"><span>IOX2 -&gt; SHM: iox2_publisher_loan_slice_uninit()</span></span>
<span class="line"><span>SHM --&gt; IOX2: sample_mut (共享内存指针)</span></span>
<span class="line"><span>IOX2 --&gt; Writer: loaned_sample</span></span>
<span class="line"><span>Writer -&gt; Writer: **memcpy**(loan-&gt;sample_ptr, data, sizeof_type)</span></span>
<span class="line"><span>Writer --&gt; Write: psmx_loan</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Write -&gt; IOX2: psmx_iox2_write(loan)</span></span>
<span class="line"><span>IOX2 -&gt; SHM: iox2_sample_mut_send()</span></span>
<span class="line"><span>IOX2 -&gt; SHM: iox2_notifier_notify()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>== 写入动态类型 (含 string/sequence) ==</span></span>
<span class="line"><span></span></span>
<span class="line"><span>User -&gt; Write: dds_write(writer, &amp;data)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>alt 快速路径: 仅PSMX且支持get_serialized_size</span></span>
<span class="line"><span>  Write -&gt; Write: dds_write_impl_serialize_into_loan()</span></span>
<span class="line"><span>  Write -&gt; Write: ddsi_sertype_get_serialized_size() → size</span></span>
<span class="line"><span>  Write -&gt; Writer: dds_writer_request_psmx_loan(padded_size)</span></span>
<span class="line"><span>  Writer -&gt; IOX2: psmx_iox2_req_loan(padded_size)</span></span>
<span class="line"><span>  note right: size_requested = 序列化后字节数</span></span>
<span class="line"><span>  IOX2 -&gt; SHM: iox2_publisher_loan_slice_uninit()</span></span>
<span class="line"><span>  SHM --&gt; IOX2: sample_mut</span></span>
<span class="line"><span>  IOX2 --&gt; Writer: loaned_sample</span></span>
<span class="line"><span>  Writer --&gt; Write: loan</span></span>
<span class="line"><span>  Write -&gt; Write: **ddsi_sertype_serialize_into**(\\n  data → loan-&gt;sample_ptr)</span></span>
<span class="line"><span>else 通用路径: 需要 serdata</span></span>
<span class="line"><span>  Write -&gt; Write: ddsi_serdata_from_sample() → serdata</span></span>
<span class="line"><span>  Write -&gt; Writer: dds_writer_psmx_loan_from_serdata()</span></span>
<span class="line"><span>  Writer -&gt; IOX2: psmx_iox2_req_loan(serdata_size - 4)</span></span>
<span class="line"><span>  IOX2 -&gt; SHM: iox2_publisher_loan_slice_uninit()</span></span>
<span class="line"><span>  SHM --&gt; IOX2: sample_mut</span></span>
<span class="line"><span>  IOX2 --&gt; Writer: loaned_sample</span></span>
<span class="line"><span>  Writer -&gt; Writer: **ddsi_serdata_to_ser**(\\n  serdata → loan-&gt;sample_ptr)</span></span>
<span class="line"><span>  Writer --&gt; Write: psmx_loan</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Write -&gt; IOX2: psmx_iox2_write(loan)</span></span>
<span class="line"><span>IOX2 -&gt; SHM: iox2_sample_mut_send()</span></span>
<span class="line"><span>IOX2 -&gt; SHM: iox2_notifier_notify()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>== 接收端 ==</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SHM -&gt; Listener: waitset 事件触发</span></span>
<span class="line"><span>Listener -&gt; IOX2: psmx_iox2_take_locked()</span></span>
<span class="line"><span>IOX2 -&gt; SHM: iox2_subscriber_receive()</span></span>
<span class="line"><span>SHM --&gt; IOX2: sample (只读共享内存指针)</span></span>
<span class="line"><span>IOX2 --&gt; Listener: loaned_sample</span></span>
<span class="line"><span>Listener -&gt; Sub: dds_reader_store_loaned_sample()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@enduml</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br></div></div><hr> <h2 id="_5-配置参数" tabindex="-1">5. 配置参数 <a class="header-anchor" href="#_5-配置参数" aria-label="Permalink to &quot;5. 配置参数&quot;">​</a></h2> <p>IOX2 PSMX 插件通过 <code>iox2_create_psmx</code> 初始化，支持以下配置：</p> <table tabindex="0"><thead><tr><th>参数</th> <th>默认值</th> <th>说明</th></tr></thead> <tbody><tr><td><code>INSTANCE_NAME</code></td> <td>(必填)</td> <td>IOX2 域名，作为所有资源的前缀隔离不同域</td></tr> <tr><td><code>LOCATOR</code></td> <td>机器 ID</td> <td>节点唯一标识符（32字节十六进制）</td></tr> <tr><td><code>LOGLEVEL</code></td> <td><code>fatal</code></td> <td>日志级别：off/fatal/error/warn/info/debug/trace</td></tr> <tr><td><code>KEYED_TOPICS</code></td> <td><code>true</code></td> <td>是否支持带 key 的主题</td></tr> <tr><td><code>ALLOW_NONDISCOVERED_WRITERS</code></td> <td><code>false</code></td> <td>是否接受未发现的写者的数据</td></tr></tbody></table> <p>支持的 PSMX 特性标记：<code>DDS_PSMX_FEATURE_SHARED_MEMORY | DDS_PSMX_FEATURE_ZERO_COPY</code></p> <hr> <h2 id="_6-关键设计要点总结" tabindex="-1">6. 关键设计要点总结 <a class="header-anchor" href="#_6-关键设计要点总结" aria-label="Permalink to &quot;6. 关键设计要点总结&quot;">​</a></h2> <ol><li><p><strong>类型区分的核心标志</strong>：唯一起作用的是 <code>DDS_DATA_TYPE_IS_MEMCPY_SAFE</code>（bit 63）。
<code>DDS_DATA_TYPE_CONTAINS_STRING</code> 等标志已全部定义为 <code>0</code>（废弃）。</p></li> <li><p><strong>动态类型无法零拷贝用户数据</strong>：含 string/sequence 的类型因为内存不连续，
必须先序列化为 CDR 字节流再写入共享内存。接收端也需要反序列化。</p></li> <li><p><strong>固定类型真正零拷贝</strong>：memcpy-safe 类型可以直接将结构体 memcpy 到共享内存，
接收端也直接读取内存中的原始结构体，无需序列化/反序列化。</p></li> <li><p><strong>QoS 不兼容时自动回退</strong>：当 QoS 不被 IOX2 支持时，<code>type_qos_supported</code> 返回 false，
DDS 自动回退到网络传输路径，对用户透明。</p></li> <li><p><strong>History QoS 有已知问题</strong>：代码中 history 的映射被注释掉，
注释提到会导致&quot;乱序接收&quot;和&quot;写阻塞&quot;问题。</p></li></ol>`,84)])])}const u=n(l,[["render",i]]);export{_ as __pageData,u as default};
