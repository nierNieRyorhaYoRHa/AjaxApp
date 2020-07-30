class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked

    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end

end



# order
# orderメソッドは、レコードを並び替えることができるメソッドです。
# .order(id: "DESC")のように記述すると、idをDESC(降順)で並び替えるという意味になります。
# ちなみにDESC（降順）の逆はASC（昇順）です。orderメソッドを使用しないデフォルトでは、ASCになっています。

# post = Post.find(params[:id])
# 先ほど設定したURLパラメーターから、既読したメモのidが渡されるように設定するので、そのidを使用して該当するレコードを取得しています。
# if post.checked then
#   post.update(checked: false)
# else
#   post.update(checked: true)
# end
# if文で、post.checkedという既読したか否かを判定するプロパティを指定し、既読していれば「既読を解除するためにfalseへ変更」し、既読していなければ「既読にするためtrueへ変更」します。
# この時はupdateというActiveRecordのメソッドを使用して更新しています。
# item = Post.find(params[:id])
# render json: { post: item }
# 最後に、更新したレコードをitem = Post.find(params[:id])で取得し直し、render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却しています。

