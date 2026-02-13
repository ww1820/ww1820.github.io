import{_ as n,o as a,c as p,ag as e}from"./chunks/framework.DEqXEGcv.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"5 工具/doxygen 生成.md","filePath":"5 工具/doxygen 生成.md","lastUpdated":1770889489000}'),l={name:"5 工具/doxygen 生成.md"};function i(r,s,c,o,b,d){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>要使用 Doxygen 生成类图，核心是安装 Doxygen 与 Graphviz 工具，并进行正确的配置。以下是基于多个技术博客和问答总结出的详细步骤与关键配置。</p> <h3 id="一、-准备工作-安装必要工具" tabindex="-1">一、 准备工作：安装必要工具 <a class="header-anchor" href="#一、-准备工作-安装必要工具" aria-label="Permalink to &quot;一、 准备工作：安装必要工具&quot;">​</a></h3> <p>首先，你需要在你的操作系统上安装 Doxygen 和 Graphviz。Graphviz 的 <code>dot</code> 工具是 Doxygen 生成高质量UML图所依赖的。</p> <ul><li><strong>Linux (Ubuntu/Debian)</strong>：可以使用包管理器快速安装。</li></ul> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt install graphviz doxygen</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li><strong>其他系统</strong>：可以从 Doxygen 官网和 Graphviz 官网下载安装包，或者通过其他包管理器（如 macOS 的 Homebrew）安装。安装后，请确保 <code>dot</code> 命令可在系统路径中被访问。</li></ul> <h3 id="二、-生成与配置-doxygen-文件" tabindex="-1">二、 生成与配置 Doxygen 文件 <a class="header-anchor" href="#二、-生成与配置-doxygen-文件" aria-label="Permalink to &quot;二、 生成与配置 Doxygen 文件&quot;">​</a></h3> <p>在你的 C++ 项目根目录下，执行以下命令生成默认配置文件：</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>doxygen -g</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这会生成一个名为 <code>Doxyfile</code> 的配置文件。你需要编辑此文件，启用一系列关键选项以生成类图。</p> <p>以下是必须或推荐启用的核心配置项及其作用：</p> <table tabindex="0"><thead><tr><th>配置项</th> <th>建议值</th> <th>作用说明</th></tr></thead> <tbody><tr><td><code>EXTRACT_ALL</code></td> <td><code>YES</code></td> <td>提取所有实体（包括未注释的），确保生成完整的类图。</td></tr> <tr><td><code>HAVE_DOT</code></td> <td><code>YES</code></td> <td><strong>启用 Graphviz <code>dot</code> 工具</strong>，这是生成所有图表的基础。</td></tr> <tr><td><code>UML_LOOK</code></td> <td><code>YES</code></td> <td>使生成的类图具有标准的 UML 风格外观，更专业。</td></tr> <tr><td><code>CLASS_DIAGRAMS</code></td> <td><code>YES</code></td> <td>为有基类或派生类的类生成类图。</td></tr> <tr><td><code>CLASS_GRAPH</code></td> <td><code>YES</code></td> <td>生成类的<strong>继承关系图</strong>（Inheritance Diagram）。</td></tr> <tr><td><code>COLLABORATION_GRAPH</code></td> <td><code>YES</code></td> <td>生成类的<strong>协作关系图</strong>（Collaboration Diagram），展示类之间的使用关系。</td></tr> <tr><td><code>RECURSIVE</code></td> <td><code>YES</code></td> <td>递归处理子目录，扫描整个项目。</td></tr></tbody></table> <h3 id="三、-高级与优化配置-可选" tabindex="-1">三、 高级与优化配置（可选） <a class="header-anchor" href="#三、-高级与优化配置-可选" aria-label="Permalink to &quot;三、 高级与优化配置（可选）&quot;">​</a></h3> <p>为了获得更好效果或控制输出，你还可以调整以下选项：</p> <ol><li><p><strong>控制图表细节与规模</strong>：</p> <ul><li><code>UML_LIMIT_NUM_FIELDS</code>：限制每个类节点中显示的字段和方法数量，防止图表过大（默认10）。</li> <li><code>DOT_UML_DETAILS</code>：设置为 <code>YES</code> 会在UML图中显示成员的类型和参数，<code>NO</code>则只显示名称。</li> <li><code>DOT_GRAPH_MAX_NODES</code> 和 <code>MAX_DOT_GRAPH_DEPTH</code>：控制图的最大节点数和深度，对于大型项目可避免生成过于庞大的图，影响性能与可读性。</li></ul></li> <li><p><strong>提升输出质量</strong>：</p> <ul><li><code>DOT_IMAGE_FORMAT</code>：设置为 <code>svg</code> 可以生成可缩放矢量图，比默认的 <code>png</code> 位图更清晰。</li> <li><code>INTERACTIVE_SVG</code>：设置为 <code>YES</code> 可在支持SVG的浏览器中实现图表的交互式缩放与平移。</li></ul></li></ol> <h3 id="四、-生成文档与查看类图" tabindex="-1">四、 生成文档与查看类图 <a class="header-anchor" href="#四、-生成文档与查看类图" aria-label="Permalink to &quot;四、 生成文档与查看类图&quot;">​</a></h3> <p>配置完成后，在项目根目录运行命令执行生成过程：</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>doxygen</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Doxygen 会解析你的源代码，并在当前目录下生成 <code>html/</code> 和 <code>latex/</code> 两个输出目录。打开 <code>html/index.html</code>，通过导航即可查看生成的类图。类图通常嵌入在各个类的文档页面中。</p> <h3 id="总结与建议" tabindex="-1">总结与建议 <a class="header-anchor" href="#总结与建议" aria-label="Permalink to &quot;总结与建议&quot;">​</a></h3> <p>Doxygen + Graphviz 是生成C++项目类图最常用且成本低廉的方案。其成功的关键在于正确配置 <code>HAVE_DOT=YES</code> 和 <code>UML_LOOK=YES</code> 等核心选项。对于复杂项目，合理使用 <code>DOT_GRAPH_MAX_NODES</code> 等限制性参数可以有效平衡图表的完整性与可读性。</p> <p>提供一份生成类图的Doxyfile 的配置文件</p> <p><img src="https://qbtool.img.qq.com/wupload/xy/qb_tool/w9JuR39k.png" alt="searchModel" loading="lazy"></p> <p>ima</p> <p>引用 6 篇资料作为参考</p> <p>根据您的需求，我为您整理了一份专门用于生成高质量类图的Doxygen配置文件（Doxyfile）模板。该模板综合了多个来源的最佳实践，并针对类图生成进行了优化配置。</p> <h2 id="一、核心配置-启用类图生成功能" tabindex="-1">一、核心配置：启用类图生成功能 <a class="header-anchor" href="#一、核心配置-启用类图生成功能" aria-label="Permalink to &quot;一、核心配置：启用类图生成功能&quot;">​</a></h2> <p>要生成类图，必须正确配置以下关键选项。这些设置是Doxygen与Graphviz协同工作的基础。</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 项目基本信息</span></span>
<span class="line"><span>PROJECT_NAME           = &quot;My Project&quot;</span></span>
<span class="line"><span>PROJECT_BRIEF          = &quot;项目简要描述&quot;</span></span>
<span class="line"><span>PROJECT_NUMBER         = 1.0</span></span>
<span class="line"><span>OUTPUT_DIRECTORY       = ./docs</span></span>
<span class="line"><span>CREATE_SUBDIRS         = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 输入文件设置</span></span>
<span class="line"><span>INPUT                  = .</span></span>
<span class="line"><span>FILE_PATTERNS          = *.cpp *.h *.hpp *.cxx *.hxx</span></span>
<span class="line"><span>RECURSIVE              = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文档提取设置</span></span>
<span class="line"><span>EXTRACT_ALL            = YES</span></span>
<span class="line"><span>EXTRACT_PRIVATE        = YES</span></span>
<span class="line"><span>EXTRACT_STATIC         = YES</span></span>
<span class="line"><span>EXTRACT_LOCAL_CLASSES  = YES</span></span>
<span class="line"><span>HIDE_UNDOC_RELATIONS   = NO</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="二、类图生成专用配置" tabindex="-1">二、类图生成专用配置 <a class="header-anchor" href="#二、类图生成专用配置" aria-label="Permalink to &quot;二、类图生成专用配置&quot;">​</a></h2> <p>以下是专门针对UML类图生成的配置部分，这些设置将确保生成完整的继承和协作关系图。</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># ============================================</span></span>
<span class="line"><span># 类图与图表生成配置</span></span>
<span class="line"><span># ============================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启用Graphviz支持（必需）</span></span>
<span class="line"><span>HAVE_DOT               = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 类图相关设置</span></span>
<span class="line"><span>CLASS_DIAGRAMS         = YES</span></span>
<span class="line"><span>CLASS_GRAPH            = YES</span></span>
<span class="line"><span>COLLABORATION_GRAPH    = YES</span></span>
<span class="line"><span>TEMPLATE_RELATIONS     = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># UML风格设置</span></span>
<span class="line"><span>UML_LOOK               = YES</span></span>
<span class="line"><span>UML_LIMIT_NUM_FIELDS   = 50</span></span>
<span class="line"><span>DOT_UML_DETAILS        = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 图表规模控制</span></span>
<span class="line"><span>DOT_GRAPH_MAX_NODES    = 100</span></span>
<span class="line"><span>MAX_DOT_GRAPH_DEPTH    = 0</span></span>
<span class="line"><span>DOT_IMAGE_FORMAT       = svg</span></span>
<span class="line"><span>INTERACTIVE_SVG        = YES</span></span>
<span class="line"><span>DOT_TRANSPARENT        = YES</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="三、输出格式与优化配置" tabindex="-1">三、输出格式与优化配置 <a class="header-anchor" href="#三、输出格式与优化配置" aria-label="Permalink to &quot;三、输出格式与优化配置&quot;">​</a></h2> <p>为了获得更好的文档体验，建议配置以下输出选项。</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 输出格式设置</span></span>
<span class="line"><span>GENERATE_HTML          = YES</span></span>
<span class="line"><span>GENERATE_LATEX         = NO</span></span>
<span class="line"><span>GENERATE_TREEVIEW      = ALL</span></span>
<span class="line"><span>HTML_DYNAMIC_SECTIONS  = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 源代码浏览</span></span>
<span class="line"><span>SOURCE_BROWSER         = YES</span></span>
<span class="line"><span>INLINE_SOURCES         = NO</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 搜索功能</span></span>
<span class="line"><span>SEARCHENGINE           = YES</span></span>
<span class="line"><span>SERVER_BASED_SEARCH    = NO</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 编码设置</span></span>
<span class="line"><span>DOXYFILE_ENCODING      = UTF-8</span></span>
<span class="line"><span>OUTPUT_LANGUAGE        = Chinese</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="四、graphviz路径配置-windows系统特别注意" tabindex="-1">四、Graphviz路径配置（Windows系统特别注意） <a class="header-anchor" href="#四、graphviz路径配置-windows系统特别注意" aria-label="Permalink to &quot;四、Graphviz路径配置（Windows系统特别注意）&quot;">​</a></h2> <p>如果您在Windows系统上使用，需要正确配置Graphviz的安装路径。</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Windows系统需要设置Graphviz路径</span></span>
<span class="line"><span># DOT_PATH              = &quot;C:/Program Files/Graphviz/bin&quot;</span></span>
<span class="line"><span># 注意：Linux/macOS系统通常不需要此设置</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="五、使用说明与注意事项" tabindex="-1">五、使用说明与注意事项 <a class="header-anchor" href="#五、使用说明与注意事项" aria-label="Permalink to &quot;五、使用说明与注意事项&quot;">​</a></h2> <h3 id="_1-安装依赖" tabindex="-1">1. 安装依赖 <a class="header-anchor" href="#_1-安装依赖" aria-label="Permalink to &quot;1. 安装依赖&quot;">​</a></h3> <p>在使用此配置前，请确保已安装以下软件：</p> <ul><li><strong>Doxygen</strong>：文档生成工具</li> <li><strong>Graphviz</strong>：图表生成引擎（包含<code>dot</code>工具）</li></ul> <p>安装命令示例（Ubuntu）：</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt install doxygen graphviz</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-配置文件生成与使用" tabindex="-1">2. 配置文件生成与使用 <a class="header-anchor" href="#_2-配置文件生成与使用" aria-label="Permalink to &quot;2. 配置文件生成与使用&quot;">​</a></h3> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 生成默认配置文件</span></span>
<span class="line"><span>doxygen -g</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 编辑配置文件（将上述配置复制到Doxyfile中）</span></span>
<span class="line"><span>vim Doxyfile</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 生成文档</span></span>
<span class="line"><span>doxygen Doxyfile</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="_3-关键配置项说明" tabindex="-1">3. 关键配置项说明 <a class="header-anchor" href="#_3-关键配置项说明" aria-label="Permalink to &quot;3. 关键配置项说明&quot;">​</a></h3> <ul><li><strong><code>HAVE_DOT = YES</code></strong>：启用Graphviz支持，这是生成所有图表的前提条件</li> <li><strong><code>UML_LOOK = YES</code></strong>：使生成的类图具有标准的UML风格外观</li> <li><strong><code>CLASS_GRAPH</code>和<code>COLLABORATION_GRAPH</code></strong>：分别控制继承图和协作图的生成</li> <li><strong><code>DOT_IMAGE_FORMAT = svg</code></strong>：生成矢量图，支持无损缩放</li> <li><strong><code>UML_LIMIT_NUM_FIELDS</code></strong>：控制每个类节点中显示的字段数量，防止图表过大</li></ul> <h3 id="_4-性能优化建议" tabindex="-1">4. 性能优化建议 <a class="header-anchor" href="#_4-性能优化建议" aria-label="Permalink to &quot;4. 性能优化建议&quot;">​</a></h3> <p>对于大型项目，您可能需要调整以下参数以避免性能问题：</p> <ul><li>适当降低<code>DOT_GRAPH_MAX_NODES</code>的值</li> <li>设置<code>MAX_DOT_GRAPH_DEPTH</code>限制图表深度</li> <li>调整<code>UML_LIMIT_NUM_FIELDS</code>控制类节点的复杂度</li></ul> <h2 id="六、完整配置文件示例" tabindex="-1">六、完整配置文件示例 <a class="header-anchor" href="#六、完整配置文件示例" aria-label="Permalink to &quot;六、完整配置文件示例&quot;">​</a></h2> <p>您可以将以下配置保存为<code>Doxyfile</code>，然后根据您的项目需求进行微调：</p> <div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Doxyfile 1.9.8 - 类图生成专用配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 项目设置</span></span>
<span class="line"><span>PROJECT_NAME           = &quot;My Project&quot;</span></span>
<span class="line"><span>PROJECT_BRIEF          = &quot;使用Doxygen生成类图示例&quot;</span></span>
<span class="line"><span>PROJECT_NUMBER         = 1.0</span></span>
<span class="line"><span>OUTPUT_DIRECTORY       = ./docs</span></span>
<span class="line"><span>CREATE_SUBDIRS         = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 输入设置</span></span>
<span class="line"><span>INPUT                  = .</span></span>
<span class="line"><span>FILE_PATTERNS          = *.cpp *.h *.hpp *.cxx *.hxx *.cc *.hh</span></span>
<span class="line"><span>RECURSIVE              = YES</span></span>
<span class="line"><span>EXCLUDE_PATTERNS       = */test/* */build/* */cmake-build-*/*</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 提取设置</span></span>
<span class="line"><span>EXTRACT_ALL            = YES</span></span>
<span class="line"><span>EXTRACT_PRIVATE        = YES</span></span>
<span class="line"><span>EXTRACT_STATIC         = YES</span></span>
<span class="line"><span>EXTRACT_LOCAL_CLASSES  = YES</span></span>
<span class="line"><span>EXTRACT_LOCAL_METHODS  = YES</span></span>
<span class="line"><span>HIDE_UNDOC_RELATIONS   = NO</span></span>
<span class="line"><span>HIDE_UNDOC_MEMBERS     = NO</span></span>
<span class="line"><span>HIDE_IN_BODY_DOCS      = NO</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 图表生成（核心配置）</span></span>
<span class="line"><span>HAVE_DOT               = YES</span></span>
<span class="line"><span>CLASS_DIAGRAMS         = YES</span></span>
<span class="line"><span>CLASS_GRAPH            = YES</span></span>
<span class="line"><span>COLLABORATION_GRAPH    = YES</span></span>
<span class="line"><span>TEMPLATE_RELATIONS     = YES</span></span>
<span class="line"><span>UML_LOOK               = YES</span></span>
<span class="line"><span>UML_LIMIT_NUM_FIELDS   = 50</span></span>
<span class="line"><span>DOT_UML_DETAILS        = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 图表优化</span></span>
<span class="line"><span>DOT_GRAPH_MAX_NODES    = 100</span></span>
<span class="line"><span>MAX_DOT_GRAPH_DEPTH    = 0</span></span>
<span class="line"><span>DOT_IMAGE_FORMAT       = svg</span></span>
<span class="line"><span>INTERACTIVE_SVG        = YES</span></span>
<span class="line"><span>DOT_TRANSPARENT        = YES</span></span>
<span class="line"><span>DOT_MULTI_TARGETS      = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 输出格式</span></span>
<span class="line"><span>GENERATE_HTML          = YES</span></span>
<span class="line"><span>GENERATE_LATEX         = NO</span></span>
<span class="line"><span>GENERATE_TREEVIEW      = ALL</span></span>
<span class="line"><span>HTML_DYNAMIC_SECTIONS  = YES</span></span>
<span class="line"><span>SOURCE_BROWSER         = YES</span></span>
<span class="line"><span>INLINE_SOURCES         = NO</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 搜索与引用</span></span>
<span class="line"><span>SEARCHENGINE           = YES</span></span>
<span class="line"><span>SERVER_BASED_SEARCH    = NO</span></span>
<span class="line"><span>REFERENCES_LINK_SOURCE = YES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 编码与语言</span></span>
<span class="line"><span>DOXYFILE_ENCODING      = UTF-8</span></span>
<span class="line"><span>OUTPUT_LANGUAGE        = Chinese</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><h2 id="七、验证与调试" tabindex="-1">七、验证与调试 <a class="header-anchor" href="#七、验证与调试" aria-label="Permalink to &quot;七、验证与调试&quot;">​</a></h2> <p>生成文档后，打开<code>./docs/html/index.html</code>查看结果。如果类图没有正确生成，请检查：</p> <ol><li><strong>Graphviz是否正确安装</strong>：在命令行中运行<code>dot -V</code>验证</li> <li><strong>路径配置</strong>：Windows用户需要正确设置<code>DOT_PATH</code></li> <li><strong>源代码注释</strong>：确保类定义有适当的Doxygen注释</li> <li><strong>配置项冲突</strong>：某些配置项可能有依赖关系，请仔细阅读Doxygen手册</li></ol> <p>这份配置文件模板综合了多个来源的最佳实践，特别针对类图生成进行了优化。您可以根据具体项目需求调整参数值，如项目名称、输入目录、图表规模限制等。使用此配置，您将能够生成专业、清晰的UML类图文档。</p>`,105)])])}const m=n(l,[["render",i]]);export{u as __pageData,m as default};
