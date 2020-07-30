function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);

      formText.value = "";

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };

    XHR.onerror = function () {
      alert("Request failed");
    };

    e.preventDefault();
  })
}
window.addEventListener("load", memo);




// FormDataとは、フォームで入力された値を取得できるオブジェクトのことです。
// new FormData(フォームの要素);のように、オブジェクトを生成し引数にフォームのオブジェクトを渡すことで、そのフォームに入力された値を使用できます。
// 今回は、メモ投稿のフォームで入力された情報を非同期通信で送信する必要があるため使用します。

// insertAdjacentHTMLは、指定したHTMLなどを、特定の要素に描画できるメソッドです。
// 要素.insertAdjacentHTML("afterend", HTML);のように記述します。第一引数には、要素のどこに描画するのかを指定します。
// 下記の表を見てください。
// 値          内容
// beforebegi  要素の直前に挿入
// afterend    要素の直後に挿入
// afterbegin  内部の最初の子要素の前に挿入
// beforeend   内部の最後の子要素の後に挿入
// この中の値を選択し、第一引数として渡します。
// 第二引数には描画するHTML自体を渡します。あらかじめHTMLなどの変数にHTMLを代入しておき、変数を渡してあげると保守性も上がります。

// itemは、レスポンスとして返却されたメモのレコードデータを取得しています。
// listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています。
// 次にformTextを取得する理由は、「メモの入力フォーム」をリセットするためです。
// この処理が終了した時に「入力フォームの文字は入力されたまま」になってしまうため、リセットする必要があります。
// ここではリセット対象の要素であるcontentという要素を取得しています。