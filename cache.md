## 浏览器缓存机制
本笔记记录浏览器的缓存机制。

#### cache-control
说明当前资源的有效期，让浏览器从本地缓存或者服务器获取资源。

可取的值：
> 1. Public：指示响应可被任何缓存区缓存。
> 2. Private：指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。
> 3. no-cache：指示请求或响应消息不能缓存。
> 4. no-store：用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
> 5. max-age：指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。
> 6. min-fresh：指示客户机可以接收响应时间小于当前时间加上指定时间的响应。
> 7. max-stale：指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

以上几个值，这里重点讲下 max-age  
==max-age 的取值是一个整数，单位为“秒”，标识该资源的过期时间为 x 秒以后。==  

##### max-age 与 last-modified/if-modified-since 以及与 etag/if-none-match 配合使用（图示）
![image](http://7xoyb7.dl1.z0.glb.clouddn.com/cache-flow.png)  
如上图所示，Etag 的优先级是比 Last-Modified 高。  
###### last-modified/if-modified-since
假设浏览器第一次请求 A 资源，响应头为  

```
...
cache-control: max-age=300
last-modified: Sun, 18 Jan 2015 11:59:02 GMT
...
```
该头信息表示，该资源过期时间为 300 秒（5分钟），最后的修改时间为 Sun, 18 Jan 2015 11:59:02 GMT。  
当浏览器在 300 秒以内再次请求该资源，请求头内容为  

```
...
if-modified-since: Sun, 18 Jan 2015 11:59:02 GMT
...
```
这个时候，服务器根据这个修改时间对比该资源是否需要更新，如果需要更新则返回新的资源，否则返回 304，让客户端从缓存中获取该资源。  
###### etag/if-none-match
同理，在 etag 中，etag 是服务器根据资源的目录、修改时间、文件大小等原始数据，通过某种算法转换成的，可以认为这个 etag 是该资源的唯一标识  
当第二次请求该资源，浏览器将缓存中的 etag 一并发给服务器，服务器对比 etag 值，从而返回 304 或者 200。

##### last-modified 与 etag 的区别
- etag 比 last-modified 优先级更高，浏览器会先处理 etag。（从流程图中可看出)
- 从 last-modified 的值中可以看出，精确到秒，如果用户在一秒内请求两次资源，而资源在这一秒内发生了改变，last-modified 是无办法识别该资源是否新的。  

#### 其他缓存
expires, 这个是 http 1.0 的内容，其值是一个到期时间。

#### 用户行为与缓存关系

操作 | Expires/Cache-Control | Last-Modified/Etag
---|---|---
**地址栏回车** | YES | YES
**页面链接跳转** | YES | YES
**新开窗口** | YES | YES
**前进、后退** | YES | YES
**F5刷新** | NO | YES
**Ctrl+F5刷新** | NO | NO





        
remark: 不知道会不会有项目，前端的资源的加载时独立一个服务器？
       研究一段时间，还真有类似的概念[node直出](https://github.com/joeyguo/blog/issues/8)
