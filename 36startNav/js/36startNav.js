var keys = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["z","x","c","v","b","n","m"]
]
var hash = {
    q: 'qq.com',
    w: 'webo.com',
    e: 'ele.me',
    r: 'renren.com',
    t: 'tianya.com',
    y: 'yongyou.com',
    u: 'uc.com',
    i: '111.com',
    m: "maidanglao.com"
}

//取出localstorage中的zzz对应的hash
var newhash = JSON.parse(localStorage.getItem('website') || 'null');
if(newhash){
    hash = newhash;
    console.log(hash);
}
for(var i = 0; i < keys.length; i++){
    var div1 = document.createElement('div');
    main.appendChild(div1); 
    for(var j = 0; j <keys[i].length; j++){
        var kbd = document.createElement('kbd')
        kbd.textContent = keys[i][j];
        var ebutton = document.createElement('button');
        ebutton.textContent = "E";
        ebutton.id = keys[i][j];
        kbd.appendChild(ebutton);
        div1.appendChild(kbd);
        ebutton.onclick = function(event){
            // console.log(event.target.id);
            var website = prompt("给我一个网址吧");
            // console.log(website);
            if(website!=null){
                hash[event.target.id] = website;
            }
            localStorage.setItem('website',JSON.stringify(hash));
            // console.log(hash);
            
        }   
    }
};
document.onkeypress = function(event){
    key = event.key;
    var website = hash[key];
    console.log(website);
    window.open("http://"+website,"_blank");
}
