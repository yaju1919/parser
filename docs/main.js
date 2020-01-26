(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    function addBtn(title, func){
        return $("<button>",{text: title}).appendTo(h).click(func);
    }
    $("<h1>",{text:"ChromeのNetworkのRequest HeadersをJSの連想配列に変換"}).appendTo(h);
    var input = yaju1919.addInputText(h,{
        textarea: true,
        width: "50%",
        placeholder: "xxx: yyy",
    });
    function main(){
        var str = input().split('\n').map(function(v){
            var m = v.match(/: /);
            if(!m) return '';
            var key = v.slice(0, m.index);
            var value = v.slice(m.index + 2);
            return '"' + key + '": "' + value + '",';
        }).join('\n');
        str = 'var obj = {\n' + str + '};\n';
        result = str;
        result_elm.text(str);
    };
    addBtn("変換", main);
    addBtn("コピー", function(){
        if(result) yaju1919.copy(result);
    });
    var result;
    var result_elm = $("<div>").appendTo(h);
})();
