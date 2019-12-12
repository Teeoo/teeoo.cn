<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-card flat class="markdown">
        <v-list-item>
          <v-list-item-avatar>
            <img src="http://q1.qlogo.cn/g?b=qq&nk=1982890538&s=640" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">lee</v-list-item-title>
            <v-list-item-subtitle>2019.06.06</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn icon>
            <v-icon>class</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>share</v-icon>
          </v-btn>
        </v-list-item>
        <v-card-text>
          <h2><a id="smile_0"></a>新博客，自豪的采用自己开发的博客！😄</h2>
          <ul>
            <li>记录一下开发博客过程中到目前为止用到的一些技术</li>
          </ul>
          <h2><a id="_4"></a>项目简介</h2>
          <ul>
            <li>
              前后端分离，服务端渲染的个人博客，基于 Nodejs、 Vue、
              Nuxt、Nestjs、PostgreSQL、Apollo
            </li>
          </ul>
          <h2><a id="_8"></a>页面展示</h2>
          <p>
            <img
              src="https://api.teeoo.cn/usr/837888a4282357996e73c0481a6da94d.png"
              alt="QQ20190801173620.png"
            />
          </p>
          <p>
            <img
              src="https://api.teeoo.cn/usr/45a42a2c8153759cdace503956e28661.png"
              alt="QQ20190801173643.png"
            />
          </p>
          <p>
            <img
              src="https://api.teeoo.cn/usr/e0246595ddba7189811437782321296f.png"
              alt="QQ20191108092527.png"
            />
          </p>
          <p>
            <img
              src="https://api.teeoo.cn/usr/bc2fb517bf53aefe05b33197a2608773.png"
              alt="QQ20191108092553.png"
            />
          </p>
          <p>
            <img
              src="https://api.teeoo.cn/usr/34bab11497e062562477cf03664be41a.png"
              alt="QQ20191108092623.png"
            />
          </p>
          <p>
            <img
              src="https://api.teeoo.cn/usr/c81610b2ed6530dbf2b0d0b0af6f9676.png"
              alt="QQ20191108092701.png"
            />
          </p>
          <p>
            <img
              src="https://api.teeoo.cn/usr/7391e0ca74ce4f8be17485a240c203bf.png"
              alt="QQ20191108092715.png"
            />
          </p>
          <p>
            <img
              src="https://api.teeoo.cn/usr/ce8d10058ca1cb48e74791fd0c04dbd3.png"
              alt="QQ20191108092727.png"
            />
          </p>
          <p>
            <img
              src="https://api.teeoo.cn/usr/cce246a364106d8b4c34518cd06be123.png"
              alt="QQ20191108092750.png"
            />
          </p>
          <h2><a id="_26"></a>待办任务</h2>
          <ol>
            <li>优化加载速度</li>
            <li>阅读进度展示/记录及自动滚动</li>
            <li>生成文章海报</li>
            <li>分享</li>
          </ol>
          <h2><a id="_32"></a>后端</h2>
          <ul>
            <li>环境:Caddy + PM2 + PostgreSQL + webhook</li>
            <li>使用框架:Nestjs</li>
            <li>缓存系统:Redis</li>
            <li>文件存储系统:<s>七牛云存储</s></li>
            <li>依赖管理:yarn</li>
            <li>版本控制:GIT</li>
          </ul>
          <h2><a id="_41"></a>前台</h2>
          <h2><a id="_43"></a>后台</h2>
          <h2><a id="_45"></a>日志</h2>
          <h3><a id="20191106_47"></a>2019-11-06</h3>
          <ol>
            <li>友情链接</li>
            <li>sitemap</li>
          </ol>
          <h3><a id="20191105_50"></a>2019-11-05</h3>
          <ol>
            <li>后台更新到线上</li>
            <li>更新<code>graphql</code>上传</li>
            <li>新增单页面&amp;评论(评论样式待处理)</li>
            <li>客户端加载优化</li>
          </ol>
          <h3><a id="20191030_55"></a>2019-10-30</h3>
          <ol>
            <li>更新部分页面和样式</li>
          </ol>
          <h3><a id="20191027_57"></a>2019-10-27</h3>
          <ol>
            <li>新增彩蛋</li>
            <li>Live2D</li>
            <li>删除一些不必要的东西</li>
          </ol>
          <h3><a id="20191026_61"></a>2019-10-26</h3>
          <ol>
            <li>显示文章详情</li>
            <li>详情页skeleton</li>
            <li>加载图片</li>
          </ol>
          <h3><a id="20191025_65"></a>2019-10-25</h3>
          <ol>
            <li>新增toc</li>
            <li>处理一些小细节</li>
          </ol>
          <h3><a id="20191024_68"></a>2019-10-24</h3>
          <ol>
            <li>处理loading问题</li>
            <li>新增分类和标签页</li>
            <li>新增分类和标签页</li>
            <li>文章详情页面</li>
            <li>一些小细节</li>
          </ol>
          <h3><a id="20191023_74"></a>2019-10-23</h3>
          <ol>
            <li>更换服务器</li>
            <li>更新后台上传文件</li>
          </ol>
        </v-card-text>
        <v-card-subtitle class="text-center">
          <blockquote>
            <p>
              <strong>
                本文链接：
                <a>url</a>
              </strong>
              <br />
              <strong>
                本文采用
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh"
                  target="_blank"
                  rel="noopener"
                  >CC BY-NC-SA 3.0 Unported</a
                >
                协议进行许可
              </strong>
            </p>
          </blockquote>
          <v-btn icon>
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import '@/assets/markdown.styl'
export default {}
</script>
