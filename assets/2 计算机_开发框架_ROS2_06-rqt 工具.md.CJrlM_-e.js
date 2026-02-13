import{_ as n,o as a,c as p,ag as i}from"./chunks/framework.DEqXEGcv.js";const u=JSON.parse('{"title":"rqt 框架架构详解","description":"","frontmatter":{},"headers":[],"relativePath":"2 计算机/开发框架/ROS2/06-rqt 工具.md","filePath":"2 计算机/开发框架/ROS2/06-rqt 工具.md","lastUpdated":1770949611000}'),l={name:"2 计算机/开发框架/ROS2/06-rqt 工具.md"};function e(r,s,t,c,o,h){return a(),p("div",null,[...s[0]||(s[0]=[i(`<p><img src="https://blog-1312962011.cos.ap-nanjing.myqcloud.com/imgs/20251112122206.png" alt="image.png" loading="lazy"></p> <ul><li>Container：容器相关</li> <li>Actions：动作相关, 比如查看动作类型
<ul><li>Action Type Browser：查看 action 对应的消息类型</li></ul></li> <li>Configuration：配置相关
<ul><li>Parameter Reconfigure：配置动态参数</li></ul></li> <li>Intorspection：节点相关,
<ul><li>Node Graph：查看节点图</li></ul></li> <li>Logging：日志相关
<ul><li>bag：数据录制与回放</li> <li>Console：查看日志</li></ul></li> <li>Miscellaneours Tools：杂项
<ul><li>Python console</li> <li>Shell</li></ul></li> <li>Services：服务相关
<ul><li>Service Caller：调用服务</li> <li>Service Type Browser：查看 service 对应的消息类型</li></ul></li> <li>Topics：话题相关
<ul><li>Message Publisher：发布话题</li> <li>Messga Type Browser：查看 action 对应的消息类型</li> <li>Topic Monitor：查看当前可用的 topic 消息</li></ul></li> <li>Visualization 视觉相关
<ul><li>Image View：查看图像</li> <li>Plot：绘制 topic 曲线图</li></ul></li></ul> <h1 id="rqt-框架架构详解" tabindex="-1">rqt 框架架构详解 <a class="header-anchor" href="#rqt-框架架构详解" aria-label="Permalink to &quot;rqt 框架架构详解&quot;">​</a></h1> <h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2> <p><strong>rqt</strong> 是 ROS 2 的一个可视化框架，用于构建图形化工具（GUI plugins）。它采用<strong>插件化架构</strong>，允许用户通过安装不同的 rqt 插件来扩展功能（如 <code>rqt_graph</code>、<code>rqt_topic</code>、<code>rqt_msg</code> 等）。</p> <p>rqt 的核心设计思想：</p> <ol><li><strong>分层架构</strong>：从底层 Qt 框架逐层向上，最终支持 Python 和 C++ 插件。</li> <li><strong>插件发现与加载</strong>：通过包管理系统自动发现和动态加载插件。</li> <li><strong>ROS 集成</strong>：通过 rclpy/roscpp 将 ROS 功能集成到 GUI 中。</li> <li><strong>线程隔离</strong>：使用独立的 spinner 线程驱动 ROS 事件循环，避免阻塞 GUI 主线程。</li></ol> <hr> <div class="language-plantuml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plantuml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@startuml</span></span>
<span class="line"><span>!theme plain</span></span>
<span class="line"><span>skinparam backgroundColor #FEFEFE</span></span>
<span class="line"><span>skinparam classBackgroundColor #F0F0F0</span></span>
<span class="line"><span>skinparam classBorderColor #333333</span></span>
<span class="line"><span>skinparam arrowColor #333333</span></span>
<span class="line"><span></span></span>
<span class="line"><span>title rqt 框架架构图 (ROS 2 Humble)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; ============== 顶层包定义 ==============</span></span>
<span class="line"><span>package &quot;qt_gui (Qt 框架基础层)&quot; {</span></span>
<span class="line"><span>    interface &quot;PluginProvider&quot; as IPluginProvider {</span></span>
<span class="line"><span>        +discover()</span></span>
<span class="line"><span>        +load()</span></span>
<span class="line"><span>        +unload()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    interface &quot;PluginContext&quot; as IPluginContext {</span></span>
<span class="line"><span>        +serial_number()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    interface &quot;Plugin&quot; as IPlugin {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;CompositePluginProvider&quot; as CompositePluginProvider {</span></span>
<span class="line"><span>        -plugin_providers</span></span>
<span class="line"><span>        +discover()</span></span>
<span class="line"><span>        +load()</span></span>
<span class="line"><span>        +unload()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;Main&quot; as QtMain {</span></span>
<span class="line"><span>        +main()</span></span>
<span class="line"><span>        +create_application()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>package &quot;python_qt_binding (Qt Python 绑定)&quot; {</span></span>
<span class="line"><span>    class &quot;QWidget&quot; as QWidget</span></span>
<span class="line"><span>    class &quot;QThread&quot; as QThread</span></span>
<span class="line"><span>    class &quot;QCompleter&quot; as QCompleter</span></span>
<span class="line"><span>    class &quot;QTreeView&quot; as QTreeView</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>package &quot;rclpy (ROS 2 Python 客户端库)&quot; {</span></span>
<span class="line"><span>    class &quot;Node&quot; as RclpyNode {</span></span>
<span class="line"><span>        +create_node()</span></span>
<span class="line"><span>        +destroy_node()</span></span>
<span class="line"><span>        +get_node_names_and_namespaces()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;MultiThreadedExecutor&quot; as MultiThreadedExecutor {</span></span>
<span class="line"><span>        +add_node()</span></span>
<span class="line"><span>        +spin_once()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; ============== rqt_gui 层 ==============</span></span>
<span class="line"><span>package &quot;rqt_gui (rqt GUI 框架主层)&quot; {</span></span>
<span class="line"><span>    class &quot;Main&quot; as RqtMain {</span></span>
<span class="line"><span>        -plugin_providers</span></span>
<span class="line"><span>        +_add_plugin_providers()</span></span>
<span class="line"><span>        +_add_reload_paths()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;RosPluginProvider&quot; as RosPluginProvider {</span></span>
<span class="line"><span>        #_export_tag</span></span>
<span class="line"><span>        #_base_class_type</span></span>
<span class="line"><span>        #_plugin_descriptors</span></span>
<span class="line"><span>        +discover()</span></span>
<span class="line"><span>        +load()</span></span>
<span class="line"><span>        +_find_plugins()</span></span>
<span class="line"><span>        +_parse_plugin_xml()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;RospkgPluginProvider&quot; as RospkgPluginProvider {</span></span>
<span class="line"><span>        +_find_plugins()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;Ros2PluginContext&quot; as Ros2PluginContext {</span></span>
<span class="line"><span>        +node: rclpy.Node</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; ============== rqt_gui_py 层 ==============</span></span>
<span class="line"><span>package &quot;rqt_gui_py (rqt Python 插件支持)&quot; {</span></span>
<span class="line"><span>    class &quot;Plugin&quot; as RqtPlugin {</span></span>
<span class="line"><span>        +shutdown_plugin()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;RosPyPluginProvider&quot; as RosPyPluginProvider {</span></span>
<span class="line"><span>        -_node: rclpy.Node</span></span>
<span class="line"><span>        -_spinner: RclpySpinner</span></span>
<span class="line"><span>        -_node_initialized: bool</span></span>
<span class="line"><span>        +load()</span></span>
<span class="line"><span>        +unload()</span></span>
<span class="line"><span>        +_init_node()</span></span>
<span class="line"><span>        +_destroy_node()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;RclpySpinner&quot; as RclpySpinner {</span></span>
<span class="line"><span>        -_node: rclpy.Node</span></span>
<span class="line"><span>        -_abort: bool</span></span>
<span class="line"><span>        +run()</span></span>
<span class="line"><span>        +quit()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; ============== rqt_py_common 工具层 ==============</span></span>
<span class="line"><span>package &quot;rqt_py_common (rqt Python 工具库)&quot; {</span></span>
<span class="line"><span>    class &quot;RqtRoscommUtil&quot; as RqtRoscommUtil {</span></span>
<span class="line"><span>        +get_node_names()</span></span>
<span class="line"><span>        +get_publisher_names()</span></span>
<span class="line"><span>        +get_subscriber_names()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;MessageTreeWidget&quot; as MessageTreeWidget {</span></span>
<span class="line"><span>        +setModel()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;TreeModelCompleter&quot; as TreeModelCompleter {</span></span>
<span class="line"><span>        +setModel()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;TopicCompleter&quot; as TopicCompleter {</span></span>
<span class="line"><span>        +updateModel()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;PluginContainerWidget&quot; as PluginContainerWidget {</span></span>
<span class="line"><span>        +QWidget child</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;MessageTreeModel&quot; as MessageTreeModel {</span></span>
<span class="line"><span>        +expandAll()</span></span>
<span class="line"><span>        +collapseAll()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;TopicTreeModel&quot; as TopicTreeModel {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;TopicDict&quot; as TopicDict {</span></span>
<span class="line"><span>        +get()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;MessageHelpers&quot; as MessageHelpers {</span></span>
<span class="line"><span>        +get_message_class()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;TopicHelpers&quot; as TopicHelpers {</span></span>
<span class="line"><span>        +get_topic_type()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;IniHelper&quot; as IniHelper {</span></span>
<span class="line"><span>        +write()</span></span>
<span class="line"><span>        +read()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; ============== rqt_gui_cpp 层（可选） ==============</span></span>
<span class="line"><span>package &quot;rqt_gui_cpp (rqt C++ 插件支持，可选)&quot; {</span></span>
<span class="line"><span>    class &quot;NodeletPluginProvider&quot; as NodeletPluginProvider {</span></span>
<span class="line"><span>        +discover()</span></span>
<span class="line"><span>        +load()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class &quot;RoscppPluginProvider&quot; as RoscppPluginProvider {</span></span>
<span class="line"><span>        +discover()</span></span>
<span class="line"><span>        +load()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; ============== rqt meta 包 ==============</span></span>
<span class="line"><span>package &quot;rqt (meta 包，依赖整合)&quot; {</span></span>
<span class="line"><span>    note &quot;依赖以上所有包，提供统一的安装与启动入口&quot; as RqtMetaNote</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; ============== 具体插件示例（虚拟） ==============</span></span>
<span class="line"><span>package &quot;具体插件示例 (rqt_topic, rqt_msg 等)&quot; {</span></span>
<span class="line"><span>    class &quot;TopicPlugin&quot; as TopicPlugin</span></span>
<span class="line"><span>    class &quot;MessagePlugin&quot; as MessagePlugin</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; ============== 依赖和继承关系 ==============</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; qt_gui 基础层关系</span></span>
<span class="line"><span>IPluginProvider &lt;|-- CompositePluginProvider</span></span>
<span class="line"><span>IPluginProvider &lt;|-- RosPluginProvider</span></span>
<span class="line"><span>IPluginContext &lt;|-- Ros2PluginContext</span></span>
<span class="line"><span>IPlugin &lt;|-- RqtPlugin</span></span>
<span class="line"><span>QtMain --&gt; CompositePluginProvider : uses</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; rqt_gui 继承关系</span></span>
<span class="line"><span>RosPluginProvider &lt;|-- RospkgPluginProvider</span></span>
<span class="line"><span>RqtMain --|&gt; QtMain : extends</span></span>
<span class="line"><span>RqtMain --&gt; RosPluginProvider : aggregates</span></span>
<span class="line"><span>RqtMain --&gt; RospkgPluginProvider : registers</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; rqt_gui_py 与 rqt_gui 的关系</span></span>
<span class="line"><span>CompositePluginProvider &lt;|-- RosPyPluginProvider</span></span>
<span class="line"><span>RosPyPluginProvider --&gt; IPluginProvider</span></span>
<span class="line"><span>RosPyPluginProvider --&gt; Ros2PluginContext : creates</span></span>
<span class="line"><span>RosPyPluginProvider --&gt; RospkgPluginProvider : uses</span></span>
<span class="line"><span>RosPyPluginProvider --&gt; RclpySpinner : creates</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; rclpy 集成</span></span>
<span class="line"><span>Ros2PluginContext --&gt; RclpyNode : holds</span></span>
<span class="line"><span>RosPyPluginProvider --&gt; RclpyNode : creates</span></span>
<span class="line"><span>RclpySpinner --&gt; RclpyNode : spins</span></span>
<span class="line"><span>RclpySpinner --|&gt; QThread : extends</span></span>
<span class="line"><span>RclpySpinner --&gt; MultiThreadedExecutor : uses</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; Qt 集成</span></span>
<span class="line"><span>RqtPlugin --|&gt; IPlugin : implements</span></span>
<span class="line"><span>RqtPlugin --&gt; Ros2PluginContext : uses</span></span>
<span class="line"><span>MessageTreeWidget --|&gt; QTreeView : extends</span></span>
<span class="line"><span>TreeModelCompleter --|&gt; QCompleter : extends</span></span>
<span class="line"><span>PluginContainerWidget --|&gt; QWidget : extends</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; rqt_py_common 工具与 rqt_gui_py 的关系</span></span>
<span class="line"><span>RosPyPluginProvider --&gt; RqtRoscommUtil : queries via</span></span>
<span class="line"><span>RqtRoscommUtil --&gt; RclpyNode : queries</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; 消息处理工具链</span></span>
<span class="line"><span>TopicCompleter --|&gt; TreeModelCompleter : extends</span></span>
<span class="line"><span>TopicCompleter --&gt; MessageHelpers : uses</span></span>
<span class="line"><span>MessageHelpers --&gt; TopicHelpers : works with</span></span>
<span class="line"><span>MessageTreeWidget --&gt; MessageTreeModel : uses</span></span>
<span class="line"><span>MessageTreeModel --&gt; TopicTreeModel : may contain</span></span>
<span class="line"><span>TopicDict --&gt; MessageTreeModel : provides data</span></span>
<span class="line"><span>IniHelper --&gt; PluginContainerWidget : persists state</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; 具体插件与框架的关系</span></span>
<span class="line"><span>TopicPlugin --|&gt; RqtPlugin : extends</span></span>
<span class="line"><span>MessagePlugin --|&gt; RqtPlugin : extends</span></span>
<span class="line"><span>TopicPlugin --&gt; RqtRoscommUtil : uses</span></span>
<span class="line"><span>TopicPlugin --&gt; PluginContainerWidget : inherits UI</span></span>
<span class="line"><span>MessagePlugin --&gt; MessageTreeWidget : uses</span></span>
<span class="line"><span>MessagePlugin --&gt; TopicCompleter : uses</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39; C++ 插件支持（可选）</span></span>
<span class="line"><span>NodeletPluginProvider --|&gt; IPluginProvider</span></span>
<span class="line"><span>RoscppPluginProvider --|&gt; IPluginProvider</span></span>
<span class="line"><span></span></span>
<span class="line"><span>note right of RqtMain</span></span>
<span class="line"><span>  应用程序入口</span></span>
<span class="line"><span>  初始化插件提供者</span></span>
<span class="line"><span>  注册 Python/C++ 插件</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span>note right of RosPyPluginProvider</span></span>
<span class="line"><span>  Python 插件生命周期管理</span></span>
<span class="line"><span>  ROS node 创建与销毁</span></span>
<span class="line"><span>  后台 spinner 线程管理</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span>note right of RclpySpinner</span></span>
<span class="line"><span>  在独立 Qt 线程中运行</span></span>
<span class="line"><span>  以多线程 executor 驱动 rclpy node</span></span>
<span class="line"><span>  支持 GUI 与 ROS 并发处理</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span>note right of RqtRoscommUtil</span></span>
<span class="line"><span>  提供图查询接口</span></span>
<span class="line"><span>  查询节点、话题、服务等</span></span>
<span class="line"><span>  通过 rclpy Node 访问</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span>note bottom of &quot;rqt_py_common (rqt Python 工具库)&quot;</span></span>
<span class="line"><span>  通用工具与 UI 组件</span></span>
<span class="line"><span>  支持 topic\\/message\\/parameter 查询</span></span>
<span class="line"><span>  提供自动补全、树形显示等功能</span></span>
<span class="line"><span>end note</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>@enduml</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br></div></div><hr> <h2 id="各模块详解" tabindex="-1">各模块详解 <a class="header-anchor" href="#各模块详解" aria-label="Permalink to &quot;各模块详解&quot;">​</a></h2> <h3 id="_1-qt-gui-qt-框架基础层" tabindex="-1">1. qt_gui (Qt 框架基础层) <a class="header-anchor" href="#_1-qt-gui-qt-框架基础层" aria-label="Permalink to &quot;1. qt_gui (Qt 框架基础层)&quot;">​</a></h3> <p><strong>来源</strong>：独立的 Qt GUI 框架包（非 ROS 特定）</p> <p><strong>核心接口</strong>：</p> <ul><li><code>PluginProvider</code>（虚基类）：负责插件的<strong>发现、加载、卸载</strong>。</li> <li><code>PluginContext</code>：传递给每个插件，提供与框架交互的能力。</li> <li><code>Plugin</code>：插件要实现的基类。</li> <li><code>CompositePluginProvider</code>：可管理多个子 <code>PluginProvider</code> 的复合提供者。</li> <li><code>Main</code>：应用程序入口点，管理主窗口、菜单、工具栏等。</li></ul> <p><strong>职责</strong>：提供通用的 GUI 框架与插件系统，与 ROS 无关。</p> <hr> <h3 id="_2-python-qt-binding-qt-python-绑定层" tabindex="-1">2. python_qt_binding (Qt Python 绑定层) <a class="header-anchor" href="#_2-python-qt-binding-qt-python-绑定层" aria-label="Permalink to &quot;2. python_qt_binding (Qt Python 绑定层)&quot;">​</a></h3> <p><strong>来源</strong>：ROS 官方 Qt Python 绑定包</p> <p><strong>提供</strong>：</p> <ul><li><code>QWidget</code>、<code>QThread</code>、<code>QCompleter</code>、<code>QTreeView</code> 等 Qt 类的 Python 包装。</li> <li>支持在运行时选择 PyQt 5 或 PySide 2（通过环境变量 <code>QT_BINDING</code>）。</li></ul> <p><strong>职责</strong>：统一 Qt 与 Python 的接口，隐藏具体 PyQt/PySide 差异。</p> <hr> <h3 id="_3-rclpy-ros-2-python-客户端库" tabindex="-1">3. rclpy (ROS 2 Python 客户端库) <a class="header-anchor" href="#_3-rclpy-ros-2-python-客户端库" aria-label="Permalink to &quot;3. rclpy (ROS 2 Python 客户端库)&quot;">​</a></h3> <p><strong>来源</strong>：ROS 2 官方 Python 客户端库</p> <p><strong>核心类</strong>：</p> <ul><li><p><code>Node</code>：ROS 节点对象。方法包括：</p> <ul><li><code>get_node_names_and_namespaces()</code>：查询 ROS 图中的所有节点。</li> <li><code>get_publisher_names_and_types_by_node(node_name, namespace)</code>：查询节点的 publisher。</li> <li><code>get_subscriber_names_and_types_by_node(...)</code> 等。</li> <li><code>create_subscription()</code>, <code>create_publisher()</code>, <code>create_client()</code>, <code>create_service()</code> 等。</li></ul></li> <li><p><code>MultiThreadedExecutor</code>：多线程执行器，驱动 node 的回调。</p> <ul><li><code>add_node(node)</code>：注册 node。</li> <li><code>spin_once(timeout_sec)</code>：执行一次迭代（处理回调）。</li></ul></li></ul> <p><strong>职责</strong>：提供 ROS 2 的 Python 客户端 API，供 rqt 查询 ROS 图和访问 ROS 功能。</p> <hr> <h3 id="_4-rqt-gui-rqt-gui-框架主层" tabindex="-1">4. rqt_gui (rqt GUI 框架主层) <a class="header-anchor" href="#_4-rqt-gui-rqt-gui-框架主层" aria-label="Permalink to &quot;4. rqt_gui (rqt GUI 框架主层)&quot;">​</a></h3> <p><strong>位置</strong>：<code>rqt_gui/</code> 目录</p> <p><strong>核心类</strong>：</p> <h4 id="_4-1-main-类" tabindex="-1">4.1 <code>Main</code> 类 <a class="header-anchor" href="#_4-1-main-类" aria-label="Permalink to &quot;4.1 \`Main\` 类&quot;">​</a></h4> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Base</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Base = qt_gui.main.Main</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(argv, standalone, plugin_argument_provider, help_text):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 初始化 Qt 应用</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 注册插件提供者（Python、C++）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 启动主窗口</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>职责</strong>：</p> <ul><li>继承 <code>qt_gui.main.Main</code>，扩展 rqt 特定的初始化逻辑。</li> <li>通过 <code>_add_plugin_providers()</code> 注册 Python 和 C++ 插件提供者。</li> <li>调用 <code>rclpy.utilities.remove_ros_args()</code> 过滤掉 ROS 特有的命令行参数（如 <code>__ns</code>, <code>__node</code>）。</li> <li>设置应用图标、帮助文本等。</li></ul> <p><strong>启动命令示例</strong>：</p> <div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ros2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rqt_gui</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rqt_gui</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="_4-2-rospluginprovider-类-抽象" tabindex="-1">4.2 <code>RosPluginProvider</code> 类 (抽象) <a class="header-anchor" href="#_4-2-rospluginprovider-类-抽象" aria-label="Permalink to &quot;4.2 \`RosPluginProvider\` 类 (抽象)&quot;">​</a></h4> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RosPluginProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PluginProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> discover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(discovery_data):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 查找 plugin.xml 文件</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 解析 XML 提取插件信息（class name, type, icon等）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 返回 PluginDescriptor 列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> load</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(plugin_id, plugin_context):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 动态导入插件模块</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 实例化插件类</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 传入 plugin_context 初始化</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>职责</strong>：</p> <ul><li>基于 ROS 包系统（ament/rospkg）自动发现插件。</li> <li>解析 <code>plugin.xml</code> 清单文件，提取插件元数据（名称、类型、图标等）。</li> <li>动态加载和卸载插件。</li></ul> <p><strong>plugin. xml 示例</strong>：</p> <div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">library</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;lib/python_builtin_plugins&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Topic Publisher&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;rqt_publisher::Publisher&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> base_class_type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;rqt_gui_py::Plugin&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Publishes ROS topics&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qtgui</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">icon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;theme&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;folder&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">icon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Topic Publisher&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">qtgui</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">library</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_4-3-rospkgpluginprovider-类-子类" tabindex="-1">4.3 <code>RospkgPluginProvider</code> 类 (子类) <a class="header-anchor" href="#_4-3-rospkgpluginprovider-类-子类" aria-label="Permalink to &quot;4.3 \`RospkgPluginProvider\` 类 (子类)&quot;">​</a></h4> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RospkgPluginProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">RosPluginProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _find_plugins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(export_tag, discovery_data):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 使用 rospkg/ament 查找所有包中的特定 export tag</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 返回 [(package_name, plugin_xml_path), ...]</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>职责</strong>：实现 <code>_find_plugins()</code> 的包查询部分，通过 rospkg 枚举所有 ROS 包并查找它们的 <code>plugin.xml</code>。</p> <h4 id="_4-4-ros2plugincontext-类" tabindex="-1">4.4 <code>Ros2PluginContext</code> 类 <a class="header-anchor" href="#_4-4-ros2plugincontext-类" aria-label="Permalink to &quot;4.4 \`Ros2PluginContext\` 类&quot;">​</a></h4> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Ros2PluginContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PluginContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handler, node):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">__init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handler)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.node </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ← 暴露给插件的 rclpy.Node 对象</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>职责</strong>：</p> <ul><li>继承 <code>qt_gui.plugin_context.PluginContext</code>。</li> <li><strong>关键</strong>：将 rclpy node 对象传递给插件，使插件能访问 ROS 功能。</li></ul> <hr> <h3 id="_5-rqt-gui-py-rqt-python-插件支持层" tabindex="-1">5. rqt_gui_py (rqt Python 插件支持层) <a class="header-anchor" href="#_5-rqt-gui-py-rqt-python-插件支持层" aria-label="Permalink to &quot;5. rqt_gui_py (rqt Python 插件支持层)&quot;">​</a></h3> <p><strong>位置</strong>：<code>rqt_gui_py/</code> 目录</p> <p><strong>核心类</strong>：</p> <h4 id="_5-1-plugin-基类" tabindex="-1">5.1 <code>Plugin</code> 基类 <a class="header-anchor" href="#_5-1-plugin-基类" aria-label="Permalink to &quot;5.1 \`Plugin\` 基类&quot;">​</a></h4> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Plugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Base</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Base = qt_gui.plugin.Plugin</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">__init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> shutdown_plugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;清理资源：取消订阅、停止定时器等&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        pass</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>职责</strong>：</p> <ul><li>为 Python 插件提供标准接口。</li> <li>提醒用户实现 <code>shutdown_plugin()</code> 以正确清理资源。</li> <li><strong>不调用</strong> <code>rclpy.init()</code>（由框架统一管理）。</li></ul> <p><strong>典型使用</strong>：</p> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rqt_gui_py.plugin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Plugin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyTopicPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Plugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, context):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">__init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.node </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> context.node  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ← 通过 context 获取 rclpy.Node</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 使用 self.node 创建 publisher/subscriber 等</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> shutdown_plugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 清理</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.node.destroy_node()</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="_5-2-rospypluginprovider-类" tabindex="-1">5.2 <code>RosPyPluginProvider</code> 类 <a class="header-anchor" href="#_5-2-rospypluginprovider-类" aria-label="Permalink to &quot;5.2 \`RosPyPluginProvider\` 类&quot;">​</a></h4> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RosPyPluginProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CompositePluginProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 包装 RospkgPluginProvider，寻找 rqt_gui_py::Plugin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 初始化 _node = None, _spinner = None</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> load</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(plugin_id, plugin_context):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._init_node()  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ← 懒初始化</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ros_plugin_context </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Ros2PluginContext(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">handler</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">node</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._node)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 调用父类加载</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().load(plugin_id, ros_plugin_context)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _init_node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> not</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._node_initialized:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;rqt_gui_py_node_</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> %</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> os.getpid()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            rclpy.init()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._node </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rclpy.create_node(name)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._spinner </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RclpySpinner(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._node)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._spinner.start()  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ← 启动后台线程</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._node_initialized </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> True</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>职责</strong>：</p> <ul><li>管理 Python 插件的生命周期。</li> <li><strong>关键</strong>：在第一个 Python 插件加载时创建全局 rclpy node（懒初始化）。</li> <li>启动 <code>RclpySpinner</code> 后台线程驱动 ROS 事件处理。</li> <li>node 名称格式：<code>rqt_gui_py_node_&lt;PID&gt;</code>。</li></ul> <h4 id="_5-3-rclpyspinner-类-qthread-子类" tabindex="-1">5.3 <code>RclpySpinner</code> 类 (QThread 子类) <a class="header-anchor" href="#_5-3-rclpyspinner-类-qthread-子类" aria-label="Permalink to &quot;5.3 \`RclpySpinner\` 类 (QThread 子类)&quot;">​</a></h4> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RclpySpinner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">QThread</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">__init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._node </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._abort </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> False</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;在独立线程中执行&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        executor </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MultiThreadedExecutor()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        executor.add_node(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._node)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rclpy.ok() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> not</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._abort:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            executor.spin_once(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">timeout_sec</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> quit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._abort </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> True</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().quit()</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>职责</strong>：</p> <ul><li><strong>关键设计</strong>：在独立的 Qt 线程中驱动 rclpy node，避免阻塞 GUI 线程。</li> <li>使用 <code>MultiThreadedExecutor</code> 支持 node 的多个回调并发执行。</li> <li><code>spin_once(timeout_sec=1.0)</code> 每次等待最多 1 秒以处理回调。</li> <li>支持优雅关闭（<code>quit()</code> 设置 <code>_abort</code> 标志）。</li></ul> <p><strong>时序图</strong>：</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GUI 主线程                      RclpySpinner 线程</span></span>
<span class="line"><span>┌────────────────┐             ┌──────────────────┐</span></span>
<span class="line"><span>│ Main event loop│             │ run() in QThread │</span></span>
<span class="line"><span>│ - GUI events   │             ├──────────────────┤</span></span>
<span class="line"><span>│ - User input   │◄──────────►│ executor.spin()  │</span></span>
<span class="line"><span>│   ...          │             │ - ROS callbacks  │</span></span>
<span class="line"><span>└────────────────┘             │ - Timers         │</span></span>
<span class="line"><span>                               │ - Subscriptions  │</span></span>
<span class="line"><span>                               └──────────────────┘</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><hr> <h3 id="_6-rqt-gui-cpp-rqt-c-插件支持层-可选" tabindex="-1">6. rqt_gui_cpp (rqt C++ 插件支持层，可选) <a class="header-anchor" href="#_6-rqt-gui-cpp-rqt-c-插件支持层-可选" aria-label="Permalink to &quot;6. rqt_gui_cpp (rqt C++ 插件支持层，可选)&quot;">​</a></h3> <p><strong>位置</strong>：<code>rqt_gui_cpp/</code> 目录</p> <p><strong>核心类</strong>：</p> <h4 id="_6-1-nodeletpluginprovider-类" tabindex="-1">6.1 <code>NodeletPluginProvider</code> 类 <a class="header-anchor" href="#_6-1-nodeletpluginprovider-类" aria-label="Permalink to &quot;6.1 \`NodeletPluginProvider\` 类&quot;">​</a></h4> <ul><li>用于发现和加载基于 <strong>Nodelet</strong> 架构的 C++ 插件。</li> <li>Nodelet：在同一进程中运行多个轻量级&quot;节点&quot;的 ROS C++ 组件加载框架。</li></ul> <h4 id="_6-2-roscpppluginprovider-类" tabindex="-1">6.2 <code>RoscppPluginProvider</code> 类 <a class="header-anchor" href="#_6-2-roscpppluginprovider-类" aria-label="Permalink to &quot;6.2 \`RoscppPluginProvider\` 类&quot;">​</a></h4> <ul><li>用于发现和加载基于 <strong>roscpp</strong>（ROS C++ 客户端库）的 C++ 插件。</li></ul> <p><strong>职责</strong>：为 C++ 插件提供与 Python 等价的插件发现与加载机制（通过 CMake 集成）。</p> <hr> <h3 id="_7-rqt-py-common-rqt-python-工具库" tabindex="-1">7. rqt_py_common (rqt Python 工具库) <a class="header-anchor" href="#_7-rqt-py-common-rqt-python-工具库" aria-label="Permalink to &quot;7. rqt_py_common (rqt Python 工具库)&quot;">​</a></h3> <p><strong>位置</strong>：<code>rqt_py_common/src/rqt_py_common/</code> 目录</p> <p>这是一个<strong>公共工具包</strong>，为各种 rqt 插件提供重用代码。</p> <p><strong>核心模块</strong>：</p> <h4 id="_7-1-rqt-roscomm-util-py-→-rqtroscommutil-类" tabindex="-1">7.1 <code>rqt_roscomm_util.py</code> → <code>RqtRoscommUtil</code> 类 <a class="header-anchor" href="#_7-1-rqt-roscomm-util-py-→-rqtroscommutil-类" aria-label="Permalink to &quot;7.1 \`rqt_roscomm_util.py\` → \`RqtRoscommUtil\` 类&quot;">​</a></h4> <p><strong>功能</strong>：访问 ROS 图信息（通过 rclpy node）。</p> <p><strong>API 示例</strong>：</p> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RqtRoscommUtil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">staticmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_node_names</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 返回图中所有节点名</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">staticmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_publisher_names</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node, remote_node_name):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 返回指定节点的 publisher (name, type) 列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">staticmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_subscriber_names</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node, remote_node_name):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 返回指定节点的 subscriber 列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 类似的还有 get_service_names, get_action_names 等</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>使用场景</strong>：在插件中查询 ROS 图拓扑。</p> <h4 id="_7-2-message-helpers-py-→-messagehelpers-类" tabindex="-1">7.2 <code>message_helpers.py</code> → <code>MessageHelpers</code> 类 <a class="header-anchor" href="#_7-2-message-helpers-py-→-messagehelpers-类" aria-label="Permalink to &quot;7.2 \`message_helpers.py\` → \`MessageHelpers\` 类&quot;">​</a></h4> <p><strong>功能</strong>：ROS 消息类型的反射与加载。</p> <p><strong>API 示例</strong>：</p> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MessageHelpers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">staticmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_message_class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(message_type_name):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;根据字符串名加载消息类</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        示例：&#39;std_msgs/String&#39; → std_msgs.msg.String</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="_7-3-topic-helpers-py-→-topichelpers-类" tabindex="-1">7.3 <code>topic_helpers.py</code> → <code>TopicHelpers</code> 类 <a class="header-anchor" href="#_7-3-topic-helpers-py-→-topichelpers-类" aria-label="Permalink to &quot;7.3 \`topic_helpers.py\` → \`TopicHelpers\` 类&quot;">​</a></h4> <p><strong>功能</strong>：话题类型信息查询与字段遍历。</p> <p><strong>API 示例</strong>：</p> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TopicHelpers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">staticmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_topic_type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node, topic_name):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 返回话题的消息类型名</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">staticmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_type_class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(type_name):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 加载并返回类型的 Python 类</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="_7-4-ui-组件类" tabindex="-1">7.4 UI 组件类 <a class="header-anchor" href="#_7-4-ui-组件类" aria-label="Permalink to &quot;7.4 UI 组件类&quot;">​</a></h4> <p><strong><code>MessageTreeWidget</code></strong>：</p> <ul><li>继承 <code>QTreeView</code>。</li> <li>以树形展示 ROS 消息的字段结构。</li> <li>支持展开/折叠字段。</li></ul> <p><strong><code>MessageTreeModel</code></strong>：</p> <ul><li>为 <code>MessageTreeWidget</code> 提供数据模型。</li> <li>递归构建消息字段树。</li></ul> <p><strong><code>TopicCompleter</code></strong>：</p> <ul><li>继承 <code>TreeModelCompleter</code>（而它继承 <code>QCompleter</code>）。</li> <li>为输入框提供话题名自动补全。</li> <li>实时查询 ROS 图并更新补全列表。</li></ul> <p><strong><code>TreeModelCompleter</code></strong>：</p> <ul><li>基于树形模型的通用补全器。</li></ul> <p><strong><code>PluginContainerWidget</code></strong>：</p> <ul><li>继承 <code>QWidget</code>。</li> <li>为插件 UI 提供容器，包含消息/日志显示区域等。</li></ul> <p><strong><code>TopicDict</code></strong>、<code>TopicTreeModel</code>**：</p> <ul><li>管理话题信息的缓存与更新。</li></ul> <h4 id="_7-5-ini-helper-py-→-inihelper-类" tabindex="-1">7.5 <code>ini_helper.py</code> → <code>IniHelper</code> 类 <a class="header-anchor" href="#_7-5-ini-helper-py-→-inihelper-类" aria-label="Permalink to &quot;7.5 \`ini_helper.py\` → \`IniHelper\` 类&quot;">​</a></h4> <p><strong>功能</strong>：插件配置持久化（INI 文件格式）。</p> <p><strong>API 示例</strong>：</p> <div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IniHelper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">staticmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> write</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(settings, key, value):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 写入配置项</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">staticmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> read</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(settings, key, default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 读取配置项</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>使用场景</strong>：保存用户在插件中的设置（窗口大小、选中的话题等）。</p> <hr> <h2 id="关键设计模式" tabindex="-1">关键设计模式 <a class="header-anchor" href="#关键设计模式" aria-label="Permalink to &quot;关键设计模式&quot;">​</a></h2> <h3 id="_1-插件发现与动态加载-strategy-pattern" tabindex="-1">1. <strong>插件发现与动态加载（Strategy Pattern）</strong> <a class="header-anchor" href="#_1-插件发现与动态加载-strategy-pattern" aria-label="Permalink to &quot;1. **插件发现与动态加载（Strategy Pattern）**&quot;">​</a></h3> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ROS 包系统 </span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>RospkgPluginProvider._find_plugins()</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>遍历所有包，找 plugin.xml 文件</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>RosPluginProvider._parse_plugin_xml()</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>提取 &lt;class type=&quot;...&quot;&gt; 信息，生成 PluginDescriptor</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>用户在 GUI 中点击菜单加载插件</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>RosPluginProvider.load(plugin_id, context)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>__builtin__.__import__() 动态导入模块</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>实例化插件类，传入 context</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>插件开始运行</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="_2-ros-事件循环隔离-thread-pattern" tabindex="-1">2. <strong>ROS 事件循环隔离（Thread Pattern）</strong> <a class="header-anchor" href="#_2-ros-事件循环隔离-thread-pattern" aria-label="Permalink to &quot;2. **ROS 事件循环隔离（Thread Pattern）**&quot;">​</a></h3> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GUI 主线程                    RclpySpinner 线程</span></span>
<span class="line"><span>运行 Qt event loop      ←→    运行 ROS executor loop</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优势：</span></span>
<span class="line"><span>- GUI 响应性不受 ROS 回调阻塞</span></span>
<span class="line"><span>- ROS 回调可以安全地更新 GUI（通过 Qt 信号）</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_3-上下文注入-dependency-injection-pattern" tabindex="-1">3. <strong>上下文注入（Dependency Injection Pattern）</strong> <a class="header-anchor" href="#_3-上下文注入-dependency-injection-pattern" aria-label="Permalink to &quot;3. **上下文注入（Dependency Injection Pattern）**&quot;">​</a></h3> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>RosPyPluginProvider.load()</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>创建 Ros2PluginContext(handler, node=self._node)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>传给插件 Plugin.__init__(context)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>插件通过 context.node 访问 ROS 功能</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>避免全局变量，便于测试与多插件隔离</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_4-工具库共享-utility-pattern" tabindex="-1">4. <strong>工具库共享（Utility Pattern）</strong> <a class="header-anchor" href="#_4-工具库共享-utility-pattern" aria-label="Permalink to &quot;4. **工具库共享（Utility Pattern）**&quot;">​</a></h3> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rqt_py_common 提供：</span></span>
<span class="line"><span>- RqtRoscommUtil：图查询</span></span>
<span class="line"><span>- MessageHelpers/TopicHelpers：类型反射</span></span>
<span class="line"><span>- UI 组件：MessageTreeWidget 等</span></span>
<span class="line"><span></span></span>
<span class="line"><span>多个具体插件重用这些工具</span></span>
<span class="line"><span>示例：</span></span>
<span class="line"><span>  rqt_topic, rqt_publisher, rqt_msg 都使用</span></span>
<span class="line"><span>  MessageTreeWidget 来显示消息字段</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><hr> <h2 id="完整的插件加载流程" tabindex="-1">完整的插件加载流程 <a class="header-anchor" href="#完整的插件加载流程" aria-label="Permalink to &quot;完整的插件加载流程&quot;">​</a></h2> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户启动 rqt：</span></span>
<span class="line"><span>$ ros2 run rqt_gui rqt_gui</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 进入点：rqt_gui/main.py::Main().main()</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>2. 继承链：Main(rqt_gui) → Main(qt_gui)</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>3. qt_gui.main.Main 初始化 Qt 应用、主窗口</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>4. rqt_gui.Main._add_plugin_providers()</span></span>
<span class="line"><span>   - 注册 RospkgPluginProvider(&#39;qt_gui&#39;, &#39;qt_gui_py::Plugin&#39;)</span></span>
<span class="line"><span>   - 注册 RospkgPluginProvider(&#39;rqt_gui&#39;, &#39;rqt_gui_py::PluginProvider&#39;)</span></span>
<span class="line"><span>   - 如果有 C++ 支持，注册 NodeletPluginProvider / RoscppPluginProvider</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>5. 对每个 PluginProvider.discover()</span></span>
<span class="line"><span>   - 遍历 ROS 包，查找对应 export_tag 的 plugin.xml</span></span>
<span class="line"><span>   - 解析并返回 PluginDescriptor 列表</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>6. GUI 显示 Plugins 菜单，列出所有发现的插件</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>7. 用户点击菜单项加载插件 → Main 调用 load(plugin_id, context)</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>8. 首次加载 Python 插件 → RosPyPluginProvider._init_node()</span></span>
<span class="line"><span>   - rclpy.init()</span></span>
<span class="line"><span>   - self._node = rclpy.create_node(&#39;rqt_gui_py_node_&lt;PID&gt;&#39;)</span></span>
<span class="line"><span>   - self._spinner = RclpySpinner(self._node)</span></span>
<span class="line"><span>   - self._spinner.start()  ← 启动后台线程</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>9. RosPyPluginProvider.load(plugin_id, plugin_context)</span></span>
<span class="line"><span>   - 创建 Ros2PluginContext(handler, node)</span></span>
<span class="line"><span>   - 调用父类 load，执行 RosPluginProvider 的加载逻辑</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>10. RosPluginProvider.load()</span></span>
<span class="line"><span>    - 通过 PluginDescriptor 得到模块名、类名</span></span>
<span class="line"><span>    - sys.path.append(library_path)</span></span>
<span class="line"><span>    - module = __builtin__.__import__(module_name, [...])</span></span>
<span class="line"><span>    - class_ref = getattr(module, class_name)</span></span>
<span class="line"><span>    - instance = class_ref(ros_plugin_context)  ← 传入 context</span></span>
<span class="line"><span>    - return instance</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>11. 插件对象现在活跃</span></span>
<span class="line"><span>    - 访问 context.node → 进行 ROS 通信</span></span>
<span class="line"><span>    - 在后台，RclpySpinner 线程驱动 node 的回调执行</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>12. 用户关闭插件 → 调用 unload(plugin_instance)</span></span>
<span class="line"><span>    - 触发 plugin.shutdown_plugin()</span></span>
<span class="line"><span>    - 插件清理资源</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>13. 所有插件关闭 → 应用退出</span></span>
<span class="line"><span>    - RosPyPluginProvider.shutdown()</span></span>
<span class="line"><span>    - self._spinner.quit()  → 停止线程</span></span>
<span class="line"><span>    - self._node.destroy_node()</span></span>
<span class="line"><span>    - rclpy.try_shutdown()</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><hr> <h2 id="常见的具体插件示例" tabindex="-1">常见的具体插件示例 <a class="header-anchor" href="#常见的具体插件示例" aria-label="Permalink to &quot;常见的具体插件示例&quot;">​</a></h2> <h3 id="rqt-graph" tabindex="-1">rqt_graph <a class="header-anchor" href="#rqt-graph" aria-label="Permalink to &quot;rqt_graph&quot;">​</a></h3> <ul><li>显示 ROS 计算图（节点、话题、服务的依赖关系）。</li> <li>使用 <code>rqt_py_common.rqt_ros_graph</code> 模块获取图数据。</li> <li>使用 graphviz 或类似库绘制。</li></ul> <h3 id="rqt-topic" tabindex="-1">rqt_topic <a class="header-anchor" href="#rqt-topic" aria-label="Permalink to &quot;rqt_topic&quot;">​</a></h3> <ul><li>订阅并显示 ROS 话题消息。</li> <li>使用 <code>rqt_py_common.message_tree_widget</code> 显示消息字段。</li> <li>使用 <code>RqtRoscommUtil</code> 列出可用话题。</li></ul> <h3 id="rqt-publisher" tabindex="-1">rqt_publisher <a class="header-anchor" href="#rqt-publisher" aria-label="Permalink to &quot;rqt_publisher&quot;">​</a></h3> <ul><li>发布 ROS 话题。</li> <li>用 <code>rqt_py_common.topic_completer</code> 自动补全话题名。</li> <li>用 <code>rqt_py_common.message_tree_widget</code> 编辑消息字段。</li></ul> <h3 id="rqt-msg-rqt-srv-rqt-action" tabindex="-1">rqt_msg / rqt_srv / rqt_action <a class="header-anchor" href="#rqt-msg-rqt-srv-rqt-action" aria-label="Permalink to &quot;rqt_msg / rqt_srv / rqt_action&quot;">​</a></h3> <ul><li>浏览 ROS 消息/服务/动作定义。</li> <li>使用消息反射工具加载类型定义。</li></ul> <hr> <h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2> <table tabindex="0"><thead><tr><th>模块</th> <th>职责</th> <th>关键类</th></tr></thead> <tbody><tr><td><strong>qt_gui</strong></td> <td>Qt 框架抽象层</td> <td><code>Main</code>, <code>PluginProvider</code>, <code>PluginContext</code>, <code>Plugin</code></td></tr> <tr><td><strong>python_qt_binding</strong></td> <td>Qt 与 Python 绑定</td> <td><code>QWidget</code>, <code>QThread</code>, <code>QCompleter</code>, ...</td></tr> <tr><td><strong>rclpy</strong></td> <td>ROS 2 Python 客户端</td> <td><code>Node</code>, <code>MultiThreadedExecutor</code></td></tr> <tr><td><strong>rqt_gui</strong></td> <td>ROS 框架集成入口</td> <td><code>Main</code>, <code>RosPluginProvider</code>, <code>RospkgPluginProvider</code>, <code>Ros2PluginContext</code></td></tr> <tr><td><strong>rqt_gui_py</strong></td> <td>Python 插件运行时</td> <td><code>Plugin</code>, <code>RosPyPluginProvider</code>, <code>RclpySpinner</code></td></tr> <tr><td><strong>rqt_gui_cpp</strong></td> <td>C++ 插件运行时（可选）</td> <td><code>NodeletPluginProvider</code>, <code>RoscppPluginProvider</code></td></tr> <tr><td><strong>rqt_py_common</strong></td> <td>工具库</td> <td><code>RqtRoscommUtil</code>, <code>MessageHelpers</code>, <code>TopicHelpers</code>, UI 组件</td></tr></tbody></table> <p><strong>核心要点</strong>：</p> <ol><li>插件系统采用<strong>发现、描述、加载、执行</strong> 的标准模式。</li> <li>ROS 事件循环通过 <strong>RclpySpinner 后台线程</strong> 与 Qt GUI 主线程隔离。</li> <li>所有 Python 插件共享一个 <strong>全局 rclpy node</strong>，由 <code>RosPyPluginProvider</code> 管理。</li> <li>插件通过 <strong>Ros 2 PluginContext</strong> 获得 node 对象，进行 ROS 通信。</li> <li><strong>rqt_py_common</strong> 提供高级工具库，使编写插件更简便。</li></ol>`,266)])])}const b=n(l,[["render",e]]);export{u as __pageData,b as default};
