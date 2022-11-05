


function main() {

  fetch('/api')
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      docs = result
      for( i in docs) {
        divhtml = '<div class="container"><div class="title"><a href="'+docs[i].url+'">'+
        docs[i].title+'</a></div><div class="comment">'+
        docs[i].comments + '</div></div>'

        e = document.createElement('div');
        e.innerHTML = divhtml
        document.body.append(e)
      }
    })
}
