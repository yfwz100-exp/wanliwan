在这个项目中，我们将会使用git来管理我们的源码，并依靠[github.com](http://github.com/)来托管我们的代码。我们的开发在各地进行，服务器进行本地构建。有关服务器方面的信息，请移步 [Node 服务器配置](wiki/server)。

这个文档作为一个初始文档，仅提供一些快速入门的信息。更详细的关于git的使用，请移步[gitref.com](http://gitref.org/)，或者参阅man手册和 `git help` 命令。注意，这里我们假定平台为 Linux，当然，由于 UNIX 基本相同的特性，所以以下步骤在 Mac OS X 中基本相同。但在 Mac OS X 中还可以使用 github.com 提供的[github for mac](http://mac.github.com/)。Mac OS X 和 Windows 下的相关说明有待补充。

# 初始化环境

设置用户相关信息，以及设置SSH以方便进行开发，请移步 github.com 的官方教程：[https://help.github.com/](https://help.github.com/)。其中比较重要的[设置git](https://help.github.com/articles/set-up-git) 。

# 工作流程以及代码说明

如果对 `git` 的使用已经有一定基础，可以直接看 [git-flow，即git的一般工作流程](http://scottchacon.com/2011/08/31/github-flow.html)。下面的内容主要针对 `git` 命令还不熟悉的朋友。以下内容很多思想来自上面的文章。

## 项目获取和修改

一般来说，我们是首先在github.com上创建项目的，所以一般来说，项目都已经创建完毕了。需要的仅仅是 `clone` 到本地

```bash
git clone git@github.com:yfwz100/wanliwan.git
```

来复制代码到本地机器上。然后，我们在本地编写代码、测试，然后发布到我们的平台上。每修改一个文件，就可以通过

```bash
git add MODIFIED_FILES
```

来添加到修改记录中。

（执行下一条之前请注意，[设置git](https://help.github.com/articles/set-up-git)，确保你已经设置了自己的信息，不然会报不认识你的错误。）

然后

```bash
git commit -m "Modify MODIFIED_FILES in order to modify file"
```

在 `-m` 参数后面的就是关于这个 commit 的说明。之所以要每修改一个文件就形成一次 commit ，就是为了使这条 commit 消息明确起来。但这不是绝对的。如果修改涉及到不止一个文件，那么，所有相关文件都应该修改后才进行 commit 。这样，__保证__每次 commit 都是可用的。

## 项目的上传

项目协作不可能不考虑上传的问题，而多人同时工作于同一个目录，很可能造成修改的冲突。为了不让别人的工作打乱我们自己的工作，项目的每个成员应该创建自己的 branch 然后修改自己的 branch 的代码。在觉得 branch 里的代码足够成熟了（这里和其他人所说可能有差异，这里的说法交保守，确保项目的可用）。而项目的组长则作为代码审查者，负责 master 分支上的代码可用性。

而 master 分支上的代码总是__可用__的。

首先，在本地创建一个分支（branch）：

```bash
git branch view-master
```

然后使用

```bash
git checkout view-master
```

来切换主分支为 view-master 。如果要合并其他分支的源码，可以

```bash
git merge master
```
//上面这句代码的意思是 master合并到view-master，其实有点master覆盖掉view-master的意思
即可把分支 master 的代码合并到当前的分支上。

删除分支，你觉得这个分支混乱不堪，想要回到之前的状态，那么，假设是view-master混乱不堪，则先checkout到master分之下运行下面这句

```bash
git branch -d view-master
```
即可删除分支view-master

本来，作为协作者（非fork），都有权限修改 master 分支的代码，但是，我们还是应该规范化这个项目的协作流程。而是通过 pull-request 来处理合并到 master 分支的请求。这个过程可以通过在 [github.com](http://github.com) 上进行。选择 pull-request 即可。分支的名称最好有意义，有所指。

## 冲突解决

同时对某一个文件进行改写是常见的事，但是我们应该尽可能避免。每个模块之间进行良好的隔离。但一旦冲突，git也有很好的解决方法。

最常见的应该是非冲突合并，这时，在调用 `git pull` 的时候，git会尝试进行非冲突合并。而在合并过程中有冲突的时候， git 会把修改记录直接保存在文件中，让开发者判断文件如何解决合并。


