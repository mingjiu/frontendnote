```
  // 利用 canvas 绘制 36*24 的字母头像
  var firstLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  var secondLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  var colors = ['#f35d46', '#ff972a', '#00d096', '#81c92e', '#00adf3', '#8b46f3', '#fd2a8c', '#e14836', '#1377ff', '#416aa6', '#4386f6', '#c752c5',
                '#5a52c7', '#52c3c7', '#68c752', '#e19e3f', '#ff7500', '#1562a3', '#ffdb00']
  var ctx = avatar.getContext("2d")
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "40pt Arial"

  var m = 0
  var i = 0
  var j = 0

  draw()
  function draw(){
    ctx.fillStyle = colors[m % 19];
    ctx.clearRect(0,0,120,120)
    m++
    ctx.fillRect(0,0,120,120)
    ctx.fillStyle = "#fff";
    ctx.fillText(firstLetter[i] + secondLetter[j], 60, 60);
    var imgURI = avatar.toDataURL("image/png")
    var image = document.getElementById(firstLetter[i] + secondLetter[j])
    image.src = imgURI;
    image.onload = function(){
      j = (j + 1) % 36
      if(j === 0){
        i = (i + 1) % 26
        if(i !== 0){
          draw()
        }
      }else{
        draw()
      }
    }
  }
```
