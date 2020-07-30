function check() {
  // 投稿のDOMを取得している
  const posts = document.getElementsByClassName("post");

  // 取得したDOMを配列に変換している
  postsA = Array.from(posts);

  postsA.forEach(function (post) {
      if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // 投稿をクリックした場合に実行する処理を定義している
    post.addEventListener("click", (e) => {
      // どの投稿をクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");

      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();

      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);

      // レスポンスのタイプを指定する
      XHR.responseType = "json";

      // sendでリクエストを送信する
      XHR.send();

      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }

        if (XHR.status != 200) {
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`); // e.g. 404: Not Found
        } else {
          return null;
        }
      };
      // リクエストが送信できなかった時
      XHR.onerror = () => {
        alert("Request failed");
      };

      // イベントをキャンセルして、処理が重複しないようにしている
      e.preventDefault();
    });
  });
}

setInterval(check, 1000);










// checkという名前で関数を定義しましょう。
// DOMの取得からエンドポイントへのリクエストなどは、すべてこのcheck関数へ記述することにします。
// window.addEventListener("load", check);で、window（ページ）をload（読み込んだ時）に実行するようにします。

// Array.fromとは、引数で渡したオブジェクトを配列に変換して返すJavaScriptのメソッドです。

// openとは、XMLHttpRequestで定義されているメソッドで、リクエストを初期化できます。
// 初期化という表現をしましたが、どのようなリクエストをするのかを指定するメソッドという認識で問題ありません。
// XHR.open("GET",/posts/${postId}, true);のように指定し、第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをbooleanで記述します。
// 記述場所	目的	以降で使用する際の記述
// 第一引数	HTTPメソッドの指定	GET
// 第二引数	パスの指定	/posts/${postId}
// 第三引数	非同期通信のON/OFF	true

// responseTypeとは、XMLHttpRequestで定義されているメソッドで、レスポンスの形式を指定するメソッドのことです。
// リクエストを送る際にあらかじめ、レスポンスとして欲しい情報の形式を指定する必要があります。
// 今回のレスポンスはデータで、形式はJSONです。その場合はXHR.responseType = "json";のように指定します。

// sendとは、XMLHttpRequestで定義されているメソッドで、リクエストを送信することができるメソッドのことです。
// openメソッドで非同期通信をtrueにしている場合は、すぐにレスポンスが返却されます。

// onerrorとは、XMLHttpRequestで定義されているプロパティで、リクエストが失敗した場合に呼び出されるイベントハンドラーのことです。

// setIntervalとは、一定の間隔（時間）ごとに指定した関数などを実行できるメソッドです。
// setInterval(check, 1000);のように、第一引数に実行する関数を指定し、第二引数に時間（ミリ秒）を指定します。

// setIntervalを使用し、check関数が1秒に1度実行されるように記述しましょう。
// e.preventDefault();を使用してイベントハンドラーが実行し終わったら今回のイベントをキャンセルする記述を追記してください。

// addEventListenerとは、イベント発火の際に実行する関数を定義するためのメソッドです。addEventListenerメソッドは以下のようにして実行します。
// 要素.addEventListener('イベント名', 関数);