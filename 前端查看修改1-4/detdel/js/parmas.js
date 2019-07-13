define(function() {
    var obj = {};
    var id = location.search.slice(1);
    id.split('&').map(function(v, i) {
        var arr = v.split('=')[0];
        obj[arr] = v.split('=')[1];
    })

    return obj;
})